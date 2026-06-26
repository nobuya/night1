//
// (autopilot.js)
//

class VSController {
    constructor (p) {
        this.plane = p;
    }

    update(targetVSpeed, // (feet/min)
           currentVSpeed, // (feet/min)
           fps) {
        const lookAhead = 5.0;
        const predictedVSpeed = targetVSpeed;
        const dt = 1 / fps;
        const k = 1.017;
        
        const vsError = targetVSpeed * k - currentVSpeed;
        const delta = vsError;
        //this.auto_vspeed_integral = Math.max(-5000, Math.min(5000, delta));
        
        const Kp = 0.25;
        const Kd = 0.0002;

        let targetPitch = -(Kp * vsError + Kd * vsError);
        targetPitch = Math.max(-10, Math.min(15, targetPitch));

        return targetPitch;
    }
} // class VSController

class PitchController {
    constructorp(p) {
        this.plane = p;
    }

    update(targetPitch,
           currentPitch,
           pitchRate,
           fps) {
        const dt = 1 / fps;
        const pitchError = targetPitch - currentPitch;

        const elevator = pitchError * 0.3;
        return elevator;
    }
} // class PitchController

class ThrottleController {
    constructorp(p) {
        this.plane = p;
    }

    update(targetSpeed,  // (knot)
           currentSpeed, // (knot)
           currentAccel, // (m/sec)
           throttle,     // 0 - 100
           fps) {
        const lookAhead = 5.0;
        const predictedSpeed =
              currentSpeed + (currentAccel * 3600 / 1852) * 100 * lookAhead;
        const dt = 1 / fps;
        //const speedError = targetSpeed - currentSpeed;
        const speedError = targetSpeed - predictedSpeed;

        // 外側ループ
        let targetAccel = speedError * 0.05;

        targetAccel = Math.max(-1, Math.min(1, targetAccel));

        // 内側ループ
        const accelError = targetAccel - currentAccel;

        const throttleRate = accelError * 15.0;

        throttle += throttleRate * dt;

        //this.thr = Math.max(1, Math.min(100, throttle));
        throttle = Math.max(1, Math.min(100, throttle));

        return throttle;
    } // updateAutoThrottle
    
} // class ThrottleController

class RollController {
    constructorp(p) {
        this.plane = p;
    }

    update(targetBank,   // deg
           currentBank,  // deg
           rollRate      // deg/sec
          ) {
        const bankError = targetBank - currentBank;

        const Kp = 0.9;
        const Kd = 0.002;
        let aileron = (Kp * bankError - Kd * rollRate) * 6;

        //return Math.max(-1, Math.min(1, aileron));
        return Math.max(-25, Math.min(25, aileron));
    }
} // class RollController

// End of file (autopilot.js) 

