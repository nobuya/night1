//
// (airplane.js)
//
const PI = Math.PI;

class Airplane {

    constructor(pos) {
	//this.x = 0;
	//this.y = -2000;
	//this.z = 120;
	this.x = pos[0];
	this.y = pos[1];
	this.z = pos[2];

	this.hdg = 0;
	this.ptc = 0;
	this.bnk = 0;

	this.dx = 0.0;
	//this.dy = 4.0;
	this.dy = 0.0;
	this.dz = -0.12;
	this.dz = 0.0;
	this.velocity = 75; // (m/sec)
	this.thr = 50; // throttle
	this.mass = 50000;
	this.fx = 0;
	this.fy = 0;
	this.fz = 0;
	this.accx = 0;
	this.accy = 0;
	this.accz = 0;
	this.velx = 0;
	this.vely =this.velocity;
	this.velz = 0;
	this.dp = 0;
	this.dhdg = 0;
	this.dptc = 0;
	this.dbnk = 0;
	this.vangle = 0;
	this.vhangle = 0;
	this.elev = 0;
	this.lift = 0;
	this.drag = 0;
	this.weight = 0;
	this.lift2 = 0;
	this.thrust_max = 10000 * 2 * G;
	this.thrust = 10000 * G;
	this.cl = 0;
	this.cd = 0;
	this.cm = 0;
	this.ptc_mo = 0;
	//
	this.aileron  = 0;
	this.elevator = 0;
	this.rudder   = 0;
	//
	this.counter  = 0;
	
	this.Lift = [ 105, 95,   85,  75 ];
	this.Drag = [ 700, 600, 500, 400 ];
	this.select = 0;
	this.ground = false;
    } // constructor(pos)

    model() {
	let v0 = this.velocity; // (m/sec)
	let v_y = this.vely;
	let v_z = this.velz;
	let v_x = this.velx;

	let CL = calcCL(this.vangle);
	let CD = calcCD(this.vangle);
	let Cm = calcCm(this.vangle);

	this.cl = CL
	this.cd = CD
	this.cm = Cm
    
	// centrifugal force
	let cf_x = this.mass * v_x * v_y;
	let d_thrust = ((this.thrust_max / 100 * this.thr) < this.thrust) ? -100 : 50;
	this.thrust = this.thrust + d_thrust;
	//this.drag     = v0 * v0 * CD * 700;    // 
	this.drag     = v0 * v0 * CD * this.Drag[this.select];

	//this.lift   = v0 * v0 * CL * 105;  // 
	this.lift   = v0 * v0 * CL * this.Lift[this.select];  // 

	let cl2 = this.elev * 0.1;
	this.lift2 = v0 * v0 * cl2 * 20;

	this.ptc_mo = v0 * v0 * Cm * 2;
    
	let gravity = this.mass * G;       // mass = 10,000 ==> 98,000
	this.weight = gravity;

	let sp = Math.sin(Math.PI * this.ptc / 180);
	let cp = Math.cos(Math.PI * this.ptc / 180);

	let fx1 = 0;
	let fy1 =  this.thrust * cp + this.lift * sp - this.drag * cp;
	let fz1 = -this.thrust * sp + this.lift * cp + this.drag * sp;

	let sb = Math.sin(Math.PI * this.bnk / 180);
	let cb = Math.cos(Math.PI * this.bnk / 180);

	let fx2 = fz1 * sb - cf_x;
	let fy2 = fy1;
	let fz20 = fz1 * cb - gravity;

	let fz2 = (this.ground) ? fz20 - fz20 : fz20;

	this.fx = Math.floor(fx2 * 100000) / 100000;
	this.fy = Math.floor(fy2 * 100000) / 100000;
	this.fz = Math.floor(fz2 * 100000) / 100000;
	let ax = this.fx / this.mass;
	let ay = this.fy / this.mass;
	let az = this.fz / this.mass;

	this.accx = Math.floor(ax * 10000) / 10000;
	this.accy = Math.floor(ay * 10000) / 10000;
	this.accz = Math.floor(az * 10000) / 10000;

	const dt = 1 / 60;
	let vx = this.velx + this.accx * dt;
	let vy = this.vely + this.accy * dt;
	let vz = this.velz + this.accz * dt;
	
	this.velx = Math.floor(vx * 10000) / 10000;
	this.vely = Math.floor(vy * 10000) / 10000;
	this.velz = Math.floor(vz * 10000) / 10000;

	let velo = Math.sqrt(this.velx * this.velx + this.vely * this.vely + this.velz * this.velz);
	this.velocity = Math.floor(velo * 10000) / 10000;
    
	let dh = Math.atan(this.velx / this.vely) / Math.PI * 180;
    
	this.dhdg = Math.abs(dh) < 0.002 ? 0.0 : dh * 0.5;
	this.dbnk = 0.20 * this.aileron * dt;

	let dp = 0.10 * dt * this.elevator;
	this.dptc = dp;
    } // model()
    
    attitude() {
	let dx1 = this.velx;
	let dy1 = this.vely;
	let dz1 = this.velz;
	let hdg = this.hdg;
	let bnk = this.bnk;
	let ptc = this.ptc;
    
	//
	let sh1 = Math.sin(Math.PI * hdg / 180);
	let ch1 = Math.cos(Math.PI * hdg / 180);
	let dx5 = dx1 * ch1 + dy1 * sh1;
	let dy5 = dy1 * ch1 - dx1 * sh1;
	let dz5 = dz1;
    
	this.dx = dx5 / 60;
	this.dy = dy5 / 60;
	this.dz = dz5 / 60;

	this.hdg = (this.hdg + this.dhdg + 360) % 360;
	this.bnk += this.dbnk;
	this.ptc += this.dptc;

	if (this.ground && this.ptc > 0) this.ptc = 0;

	let vangle0  = Math.atan(-dz1 / dy1) / Math.PI * 180;
	let vangle1  = Math.floor(vangle0 * 100000) / 100000;
	let vangle2 = vangle1 - this.ptc;
	this.vangle  = Math.floor(vangle2 * 10000) / 10000;
	this.vhangle = Math.atan(dx1 / dy1) / Math.PI * 180;
	

	this.counter += 1;
	if (this.counter == 10) {
	    if (this.aileron > 0) this.aileron -= 1;
	    else if (this.aileron < 0) this.aileron += 1;
	    if (this.elevator > 0) this.elevator -= 1;
	    else if (this.elevator < 0) this.elevator += 1;
	    this.counter = 0;
	}
	//ptc += (elev < ptc) ? -0.005 : (elev > ptc) ? 0.005 : 0;
    } // attitude()
    
    update1() {
	this.model();
	this.attitude();
    } // update1()

    update() {
	// move
	this.x += this.dx;
	this.y += this.dy;
	this.z += this.dz;
	if (this.z <= 4) {
	    this.z = 4;
	    this.dz = 0;
	    this.ground = true;
	}
    } // update()

    draw() {
    } // draw()

    printDebugInfo() {
	ctx.font = "20px Impact";
	ctx.fillStyle = "#eeeeee";
	//ctx.fillText("FPS: " + fps, 10, 40);
	ctx.fillText("v: " + this.velocity, 10, 60);
	ctx.fillText("x: " + this.x, 10, 80);
	ctx.fillText("y: " + this.y, 10, 100);
	ctx.fillText("z: " + this.z, 10, 120);
	ctx.fillText("dx " + this.dx, 10, 140);
	ctx.fillText("dy " + this.dy, 10, 160);
	ctx.fillText("dz " + this.dz, 10, 180);
	ctx.fillText("hdg: " + this.hdg, 10, 200);
	ctx.fillText("bnk: " + this.bnk, 10, 220);
	ctx.fillText("ptc: " + this.ptc, 10, 240);
	ctx.fillText("thr: " + this.thr, 10, 260);
	ctx.fillText("fx: " + this.fx, 10, 280);
	ctx.fillText("fy: " + this.fy, 10, 300);
	ctx.fillText("fz: " + this.fz, 10, 320);
	ctx.fillText("accx: " + this.accx, 10, 340);
	ctx.fillText("accy: " + this.accy, 10, 360);
	ctx.fillText("accz: " + this.accz, 10, 380);
	ctx.fillText("velx: " + this.velx, 10, 400);
	ctx.fillText("vely: " + this.vely, 10, 420);
	ctx.fillText("velz: " + this.velz, 10, 440);
	//ctx.fillText("dhdg: " + this.dhdg, 10, 460);
	ctx.fillText("vangle: " + this.vangle, 10, 460);

	ctx.fillText("lift: " + this.lift, 500, 40);
	ctx.fillText("drag: " + this.drag, 500, 60);
	ctx.fillText("thrust: " + this.thrust, 500, 80);
	ctx.fillText("elev: " + this.elev, 500, 100);
	ctx.fillText("lift2: " + this.lift2, 500, 120);
	ctx.fillText("CL: " + this.cl, 500, 140);
	ctx.fillText("CD: " + this.cd, 500, 160);
	ctx.fillText("Cm: " + this.cm, 500, 180);
	ctx.fillText("pm: " + this.ptc_mo, 500, 200);
	ctx.fillText("select: " + this.select, 500, 220);
	ctx.fillText("Lift: " + this.Lift[this.select], 500, 240);
	ctx.fillText("Drag: " + this.Drag[this.select], 500, 260);
    } // printDebugInfo()
    
} // class airplane

// End of file (airplane.js) 
