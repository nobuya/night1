//
// (airplane.js)
//
const PI = Math.PI;

class Airplane {

    constructor(pos, vel, thr) {
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
	this.velocity = vel; // (m/sec)
	//this.thr = 60; // throttle
	this.thr = thr; // throttle
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
	this.dv = 0;
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
	this.thrust_max  = 10000 * 2 * G;
	this.thrust_idle = this.thrust_max * 0.1;
	this.thrust = this.thrust_max * this.thr / 100;
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
	
	this.Lift = [ 65,   80,  90, 105, 120, 135];
	this.Drag = [ 150, 250, 350, 450, 550, 650];
	this.select = 0;
	this.select_max = 5;
	this.ground = (this.z == 0) ? true : false;
	this.brake  = 0; // air brake
	this.brake_max  = 40;
	this.auto_brake = false;
	this.fcount = 0;
	this.sideslip_angle = 0;
	this.dssa = 0;
	this.idelcount = 0;
	this.gear_down = this.ground ? 3 : 0; // up 0 / down 3
	this.gear_status = this.ground ? 180 : 0; // 
	this.wbrake = 0; // wheel brake
	
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
	//let cf_x = this.mass * v_x * v_y;
	//let cf_x = 0;
	//let cf_x = this.mass * v_x * Math.abs(v_x);
	let cf_x = this.mass * v0 * v0 * this.vhangle * 0.002;
	
	let d_thrust = ((this.thrust_max / 100 * this.thr) < this.thrust) ? -300 : 200;

	if (this.thr >= 0) {
	    this.thrust = this.thrust + d_thrust;
	} else {
	    this.thrust = -this.thrust_max * 0.2;
	}

	let drag0 = this.Drag[this.select];
	drag0 = drag0 * (200 + this.brake) / 200 + this.gear_status * 0.2;
	//this.drag     = v0 * v0 * CD * 700;    //
	let drag1 = v0 * v0 * CD * drag0;
	
	this.drag = drag1;

	let lift0 = this.Lift[this.select];
	lift0 = lift0 * (200 - this.brake) / 200;
	//this.lift   = v0 * v0 * CL * 105;  // 
	this.lift   = v0 * v0 * CL * lift0;

	let cl2 = this.elev * 0.1;
	this.lift2 = v0 * v0 * cl2 * 20;

	this.ptc_mo = v0 * v0 * Cm * 2;
    
	let gravity = this.mass * G;       // mass = 10,000 ==> 98,000
	this.weight = gravity;

	let sp = Math.sin(Math.PI * this.ptc / 180);
	let cp = Math.cos(Math.PI * this.ptc / 180);

	let fx1 =  0;
	let fy1 =  this.thrust * cp + this.lift * sp - this.drag * cp;
	let fz1 = -this.thrust * sp + this.lift * cp + this.drag * sp;

	let sb = Math.sin(Math.PI * this.bnk / 180);
	let cb = Math.cos(Math.PI * this.bnk / 180);

	let fx2 = fz1 * sb - cf_x;
	let fy2 = fy1;
	let fz20 = fz1 * cb - gravity;

	let fz2 = (this.ground && fz20 <= 0) ? 0 : fz20;

	if (this.ground) {
	    if (this.gear_down == 3 && this.wbrake > 0) {
		fy2 = fy2 - v0 * this.wbrake * 30.0;
	    }
	    if (Math.abs(fy2) > this.mass * 0.01) {
		fy2 = fy2 - this.mass * 0.01;
	    }
	    //if (fy2 < 0) fy2 = 0;
	}

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

	if (this.ground) {
	    if (this.velz < 0) this.velz = 0;
	    if (this.accz < 0) this.accz = 0;
	}

	let velo = Math.sqrt(this.velx * this.velx + this.vely * this.vely + this.velz * this.velz);
	this.velocity = Math.floor(velo * 10000) / 10000;
	this.dv = this.velocity - v0;
    
	let dh = (this.vely > 0) ? Math.atan(this.velx / this.vely) / Math.PI * 180 : 0;
	if (this.ground) {
	    this.dhdg = dh * 0.25;
	    this.accx = 0;
	    this.velx = 0;
	} else {
	    this.dhdg = Math.abs(dh) < 0.002 ? 0.0 : dh * 0.5;
	}
	
	this.dbnk = 0.20 * this.aileron * dt;

	let dp = 0.10 * dt * this.elevator;
	if (velo < 65) {
	    if (this.ptc < 0) dp = 0.10 * dt * 3;
	    else dp = 0;
	}
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

	hdg = (this.hdg + this.dhdg + 360) % 360;
	bnk += this.dbnk;
	ptc += this.dptc;

	this.hdg = Math.floor(hdg * 1000) / 1000;
	this.bnk = Math.floor(bnk * 1000) / 1000;
	this.ptc = Math.floor(ptc * 1000) / 1000;

	if (this.ground) {
	    if (this.bnk != 0) this.bnk = 0;
	    if (this.ptc > 0) this.ptc = 0;
	    else if (this.ptc < 0 && this.velocity < 50) {
		this.ptc += 3 / 60;
	    }
	}

	let vangle0  = (dy1 > 0) ? Math.atan(-dz1 / dy1) / Math.PI * 180 : 0;
	let vangle1  = Math.floor(vangle0 * 100000) / 100000;
	let vangle2 = vangle1 - this.ptc;
	this.vangle  = Math.floor(vangle2 * 10000) / 10000;

	this.sideslip_angle = this.rudder * 0.05 - this.dssa;
	this.dssa = this.sideslip_angle > 0 ? - 0.2 : (this.sideslip_angle < 0 ? 0.2 : 0);

	this.vhangle = (dy1 > 0) ? Math.atan(dx1 / dy1) / Math.PI * 180 - this.sideslip_angle : 0;
	

	this.counter += 1;
	if (this.counter == 10) {
	    if (this.aileron > 0) this.aileron -= 1;
	    else if (this.aileron < 0) this.aileron += 1;
	    if (this.elevator > 0) this.elevator -= 1;
	    else if (this.elevator < 0) this.elevator += 1;
	    this.counter = 0;
	}
	if (this.counter % 2 == 0) {
	    if (this.rudder > 0) this.rudder -= 1;
	    else if (this.rudder < 0) this.rudder += 1;
	}
	//ptc += (elev < ptc) ? -0.005 : (elev > ptc) ? 0.005 : 0;
    } // attitude()
    
    update1() {
	this.fcount++;
	this.idelcount++;
	this.model();
	this.attitude();
	if (this.gear_down == 1) {
	    this.gear_status++;
	    if (this.gear_status >= 180) {
		this.gear_down = 3; // gear down
		this.gear_status = 180;
	    }
	} else if (this.gear_down == 2) {
	    this.gear_status--;
	    if (this.gear_status <= 0) {
		this.gear_down = 0; // gear up
		this.gear_status = 0;
	    }
	}
    } // update1()

    update() {
	// move
	this.x += this.dx;
	this.y += this.dy;
	this.z += this.dz;
	if (this.z <= 4) {
	    if (this.dz < 0 && this.auto_brake) {
		this.brake = this.brake_max;
	    }
	    this.z = 4;
	    this.dz = 0;
	    this.ground = true;
	} else {
	    this.ground = false;
	}
    } // update()

    draw() {
    } // draw()

    printDebugInfo() {
	ctx.font = "20px Impact";
	ctx.fillStyle = "#eeeeee";
	//ctx.fillText("FPS: " + fps, 10, 40);
	ctx.fillText("v: " + Math.ceil(this.velocity), 10, 60);
	ctx.fillText("x: " + Math.ceil(this.x), 10, 80);
	ctx.fillText("y: " + Math.ceil(this.y), 10, 100);
	ctx.fillText("z: " + Math.ceil(this.z), 10, 120);
	ctx.fillText("dx " + this.dx, 10, 140);
	ctx.fillText("dy " + this.dy, 10, 160);
	ctx.fillText("dz " + this.dz, 10, 180);
	ctx.fillText("hdg: " + Math.ceil(this.hdg), 10, 200);
	ctx.fillText("bnk: " + Math.ceil(this.bnk), 10, 220);
	ctx.fillText("ptc: " + Math.ceil(this.ptc), 10, 240);
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

	ctx.fillText("lift: " + Math.ceil(this.lift), 500, 40);
	ctx.fillText("drag: " + Math.ceil(this.drag), 500, 60);
	ctx.fillText("thrust: " + Math.ceil(this.thrust), 500, 80);
	ctx.fillText("elev: " + this.elev, 500, 100);
	ctx.fillText("lift2: " + Math.ceil(this.lift2), 500, 120);
	ctx.fillText("CL: " + this.cl, 500, 140);
	ctx.fillText("CD: " + this.cd, 500, 160);
	ctx.fillText("Cm: " + this.cm, 500, 180);
	ctx.fillText("pm: " + this.ptc_mo, 500, 200);
	ctx.fillText("select: " + this.select, 500, 220);
	ctx.fillText("Lift: " + Math.ceil(this.Lift[this.select]), 500, 240);
	ctx.fillText("Drag: " + Math.ceil(this.Drag[this.select]), 500, 260);
	ctx.fillText("brake: " + this.brake + " " + this.wbrake, 500, 280);
	ctx.fillText("gear: " + this.gear_down + " " + this.gear_status, 500, 300);
    } // printDebugInfo()
    
} // class airplane

// End of file (airplane.js) 
