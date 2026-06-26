//
// (engine.js)
//

class Engine {
    constructor() {
        this.throttle = 0;  // 0 - 100 (%)
        this.n1 = 20;       // (%)
        this.n2 = 60;       // (%)
        this.egt = 350;     // Exhoust gas temp
        this.fuel_flow = 0; // fuel_flow (kg/h)
        this.thrust = 0;
    }

    setThrottle(thr) {
        if (thr < 0) { // reverse
            this.throttle = -thr * 4;
        } else {
            this.throttle = thr;
        }
    }

    //   N2    C
    // ------------
    //   60   440
    //   80   570
    //  100   700
    // ------------
    egtFromN2(n2) {
        return 50 + n2 * 6.5;
    }

    getISAOAT(alt_ft) {
        if (alt_ft < 36089) {
            return 15 - alt_ft * 0.0019812;
        }
        return -56.5; // C
    }

    computeFuelFlow(throttle,  // 0 - 100
                    n2,
                    sigma) {
        const throttleTerm = 400 + 4500 * Math.pow(throttle / 100, 2);
        const coreTerm = Math.max(0, n2 - 60) * 40;
        return (throttleTerm + coreTerm) * Math.pow(sigma, 0.8);
    }

    computeTargetEGT(n2,
                     fuelFlow,
                     oat,
                     alt_ft,
                     isaTemp) {
        //  FF (kg/h)    寄与
        // ----------- --------
        //    500        +20 C
        //   2000        +80 C
        //   5000       +200 C
        // ----------- --------
        const ffContribution = fuelFlow * 0.04;

        const oatContribution = (oat - isaTemp) * 0.5;
        const altitudeContribution = -alt_ft * 0.0015;
        
        
        const n2Term = 50 + n2 * 6.5;
        //const ffTerm = fuelFlow * 0.04;
        //const oatTerm = (oat - isaTermp) * 0.5;
        //const altTerm = -alt_ft * 0.0015;

        return (n2Term +
                ffContribution +
                oatContribution +
                altitudeContribution);
        
    } // computeTargetEGT

    /*
     ----------+---------- ----------
       Throttle   targetN2  targetN1
     ----------+---------- ----------
             0      60         20
            50      80         55
           100     100         90
     ----------+---------- ----------
    */
    
    update(dt, alt_m) {
        // under 11 km (36,089 ft)
        const alt_ft = alt_m * 3.28084;
        const temp = 288.15 - 0.0065 * alt_m;
        const pressure = 101325 * Math.pow(temp / 288.15, 5.256);
        const density = pressure / (287.05 * temp);
        const rho0 = 1.225;           // 海面上密度
        const sigma = density / rho0; // 密度比

        //  Altitude   sigma  推力係数
        // ----------------------------
        //       0 ft  1.00     1.00
        //  10,000 ft  0.74     0.81
        //  20,000 ft  0.53     0.64
        //  35,000 ft  0.31     0.44
        // ----------------------------
        const thrustFactor = Math.pow(sigma, 0.7);
        
        const targetN2 = 60 + this.throttle * 0.4;

        this.n2 += (targetN2 - this.n2) * dt / 3.0;

        let targetN1 = 20 + (this.n2 - 60) * 1.75;
        // 高高度になるとN1が上がりにくくなる
        targetN1 = targetN1 * (0.9 + 0.1 * sigma);
        
        this.n1 += (targetN1 - this.n1) * dt / 5.0;

        let thrust = Math.pow((this.n1 - 20) / 70, 1.5);
        this.thrust = thrust * thrustFactor;

        const targetFF = 400 + Math.pow((targetN2 - 60), 1.4) * 18;
        const fuelFlow = targetFF;
        this.fuel_flow = fuelFlow;

        // EGT
        //const targetEGT = 350 + this.throttle * 3.5;
        //this.egt += (targetEGT - this.egt) * dt / 2.0;
        const isaTemp = 15 - alt_ft * 0.0019812; // C
        const oat = this.getISAOAT(alt_ft);
        const targetEGT = this.computeTargetEGT(this.n2,
                                                fuelFlow,
                                                oat,
                                                alt_ft,
                                                isaTemp);
        this.egt += (targetEGT - this.egt) * dt / 1.5;
        this.egt = Math.max(0, Math.min(this.egt, 1200));
        
    }
    
} // class Engine

// End of file (engine.js)
