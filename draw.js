//
// (draw.js)
//

function drawLines() {
    const cx = 320;
    //const cy = 240;
    const cy = 240 - 100; // 140
    let w0 = 70;
    let w1 = 30;
    let h0 = 60;
    let h1 = 30;
    let blue = "#0000DD";
    
    //drawLine([250, cy], [290, cy], "#DDDDDD");
    drawLine([cx - w0, cy], [cx - w1, cy], blue);
    drawLine([cx + w1, cy], [cx + w0, cy], blue);
    drawLine([cx, cy - h0], [cx, cy - h1], blue);
    drawLine([cx, cy + h1], [cx, cy + h0], blue);
} // function drawLines()

function drawHeading(p) {
    let cx = 320;
    let cy = 420;
    let heading = (Math.ceil(p.hdg + p.yaw) + 360) % 360;
    let rate  = Math.ceil(p.dhdg * 60 * 60);
    let white = "#DDDDDD";
    
    ctx.font = "14px Arial";
    ctx.fillStyle = white;

    if (heading == 0) heading = 360;
    ctx.fillText(`${heading}`, cx - 12, cy);
    //ctx.fillText(`${p.yaw}`, cx - 12, cy + 20);
    ctx.fillText(`${rate}`, cx - 12, cy + 40);
} // function drawHeading(p)

function drawSpeed(p) {
    let v0 = p.velocity;
    let speed = Math.ceil(v0 * 3600 / 1852); // knot
    let white = "#DDDDDD";
    ctx.font = "16px Arial";
    ctx.fillStyle = white;
    ctx.fillText(`${speed}`, 200, 350);
    
    let s0 = Math.floor(speed / 10) * 10;
    let y0 = 350 - 5;
    ctx.font = "14px Arial";
    ctx.fillStyle = white;
    drawLine([230, y0], [234, y0], white);
    for (let s1 = s0 + 40; s1 > s0 - 40 && s1 >= 0; s1 -= 10) {
	let y = y0 - (s1 - speed) * 2;
	drawLine([235, y], [240, y], white);
	if (s1 >= (speed + 10) || s1 <= (speed - 10)) {
	    ctx.fillText(`${s1}`, 204, y + 3);
	}
    }

    let y1 = y0 - (p.dv * 1500);
    let green = "#00DD00";
    drawLine([235, y0], [235, y1], green);

    // Mach
    let mach = Math.floor(p.mach * 100) / 100;
    ctx.font = "12px Arial";
    ctx.fillText(`M ${mach}`, 200, 450);
} // function drawSpeed(p)

function drawAltitude(p) {
    let x0 = 400;
    let z0 = p.z;
    let dz = p.velz;
    let vs = Math.ceil(dz * 60 * 3.28084); // feet/min
    //let alt = z0 / 0.3048; // feet
    let alt = Math.ceil(z0 * 3.28084); // feet
    let white = "#DDDDDD";
    ctx.font = "14px Arial";
    ctx.fillStyle = white;
    ctx.fillText(`${alt}`, x0 + 15, 350);

    let a0 = Math.floor(alt / 100) * 100;
    let yy = 350 - 5;
    ctx.font = "12px Arial";
    ctx.fillStyle = white;
    drawLine([x0 + 6, yy], [x0 + 10, yy], white);
    for (let a1 = a0 + 200; a1 > a0 - 200 && a1 >= 0; a1 -= 100) {
	let y = yy - (a1 - alt) * 0.4;
	drawLine([x0, y], [x0 + 5, y], white);
	if (a1 >= (alt + 50) || a1 <= (alt - 50)) {
	    ctx.fillText(`${a1}`, x0 + 15, y + 3);
	}
	if (a1 == 0) {
	    drawLine([x0, y], [x0 + 30, y], white);
	    drawLine([x0, y + 2], [x0 + 20, y + 2], white);
	    drawLine([x0, y + 4], [x0 + 20, y + 4], white);
	    drawLine([x0, y + 6], [x0 + 20, y + 6], white);
	}
    }

    let y1 = yy - (p.velz * 5);
    let green = "#00DD00";
    drawLine([x0, yy], [x0, y1], green);

    // virtical speed
    ctx.font = "10px Arial";
    ctx.fillStyle = white;
    ctx.fillText(`${vs}`, x0 + 50, 350 - 70);
    drawLine([x0 + 50, yy], [x0 + 53, yy], white); // 0
    let w0 = 500 * 0.02;
    drawLine([x0 + 52, yy - w0], [x0 + 53, yy - w0], white);
    drawLine([x0 + 52, yy + w0], [x0 + 53, yy + w0], white);
    let w1 = 1000 * 0.02;
    drawLine([x0 + 51, yy - w1], [x0 + 53, yy - w1], white);
    drawLine([x0 + 51, yy + w1], [x0 + 53, yy + w1], white);
    let w2 = 1500 * 0.02;
    drawLine([x0 + 52, yy - w2], [x0 + 53, yy - w2], white);
    drawLine([x0 + 52, yy + w2], [x0 + 53, yy + w2], white);
    let w3 = 2000 * 0.02;
    drawLine([x0 + 51, yy - w3], [x0 + 53, yy - w3], white);
    drawLine([x0 + 51, yy + w3], [x0 + 53, yy + w3], white);
    
    let y2 = yy - (vs * 0.02);
    if (vs >= 4000) {
	y2 = yy - 3000 * 0.02;
    } else if (vs > 2000) {
	y2 = yy - 2000 * 0.02 - (vs - 2000) * 0.01;
    } else if (vs < -4000) {
	y2 = yy + 3000 * 0.02;
    } else if (vs < -2000) {
	y2 = yy + 2000 * 0.02 - (vs + 2000) * 0.01;
    }
    drawLine([x0 + 70, yy], [x0 + 55, y2], white);
    
} // function drawAltitude(p) 

function drawHorizontalIndicator(p) {
    let cx = 320;
    let cy = 330;
    let w  = 120;
    let h  = 120;
    let r  = 60
    let w2 = w / 2;
    let h2 = w / 2;
    let blue = "#0000DD";
    drawLine([cx - w2, cy], [cx + w2, cy], blue);
    drawLine([cx, cy - h2], [cx, cy + h2], blue);

    let white = "#BBBBBB";
    let bnk = p.bnk;
    let ptc = p.ptc;

    for (let b = -30; b <= 30; b += 5) {
	let r1 = b % 10 == 0 ? r - 1 : r - 3;
	let x1 = Math.sin(Math.PI / 180 * b) * r1;
	let y1 = Math.cos(Math.PI / 180 * b) * r1;
	let r2 = r - 5;
	let x2 = Math.sin(Math.PI / 180 * b) * r2;
	let y2 = Math.cos(Math.PI / 180 * b) * r2;
	//drawLine([cx - x1, cy - y1], [cx - x2, cy - y2], blue);
	drawLine([cx - x1, cy - y1], [cx - x2, cy - y2], white);
    }
    let sb  = Math.sin(Math.PI / 180 * bnk);
    let cb  = Math.cos(Math.PI / 180 * bnk);
    let r3 = r - 5;
    let x3 = sb * r3;
    let y3 = cb * r3;
    let r4 = r - 10;
    let x4 = sb * r4;
    let y4 = cb * r4;
    drawLine([cx - x3, cy - y3], [cx - x4, cy - y4], white);

    let sp  = Math.sin(Math.PI / 180 * ptc);
    let cp  = Math.cos(Math.PI / 180 * ptc);

    //let y5 = Math.sin(Math.PI / 180 * ptc) * r;
    let r6 = w2 - 8;
    let r7 = w2 - 12;
    let r8 = w2 - 15;
    //let y5 = ptc * 2;
    let y5 = ptc * cb * 2;
    let x6 = cb * r6;
    let y6 = sb * r6;
    let x7 = cb * r7;
    let y7 = sb * r7;
    let x8 = cb * r8;
    let y8 = sb * r8;
    
    drawLine([cx - x6, cy + y6], [cx - x7, cy + y7], white);
    drawLine([cx + x6, cy - y6], [cx + x7, cy - y7], white);

    let k = 2;
    let cx0 = -ptc * sb * k;
    let cy0 = -ptc * cb * k;
    // horizontal
    drawLine([cx + cx0 - x8, cy + cy0 + y8], [cx + cx0 + x8, cy + cy0 - y8], white);

    let cy10 = cb * 5 * k;
    let cx10 = sb * 5 * k;

    // V
    //drawLine([cx + cx0, cy + cy0], [cx + cx0 - cx10, cy + cy0 - cy10], white);
    let x10 = -cx10 - cb * 5;
    let y10 = -cy10 + sb * 5;
    let x11 = -cx10 + cb * 5;
    let y11 = -cy10 - sb * 5;
    // 5
    drawLine([cx + cx0 + x10, cy + cy0 + y10], [cx + cx0 + x11, cy + cy0 + y11], white);
    let x12 =  cx10 + cb * 5;
    let y12 =  cy10 - sb * 5;
    let x13 =  cx10 - cb * 5;
    let y13 =  cy10 + sb * 5;
    // -5
    drawLine([cx + cx0 + x12, cy + cy0 + y12], [cx + cx0 + x13, cy + cy0 + y13], white);

    let cy20 = cb * 10 * k;
    let cx20 = sb * 10 * k;
    let x14 = -cx20 - cb * 10;
    let y14 = -cy20 + sb * 10;
    let x15 = -cx20 + cb * 10;
    let y15 = -cy20 - sb * 10;
    // 10
    drawLine([cx + cx0 + x14, cy + cy0 + y14], [cx + cx0 + x15, cy + cy0 + y15], white);
    let x16 =  cx20 + cb * 10;
    let y16 =  cy20 - sb * 10;
    let x17 =  cx20 - cb * 10;
    let y17 =  cy20 + sb * 10;
    // -10
    drawLine([cx + cx0 + x16, cy + cy0 + y16], [cx + cx0 + x17, cy + cy0 + y17], white);

    let cy30 = cb * 15 * k;
    let cx30 = sb * 15 * k;
    let x31 = -cx30 - cb * 5;
    let y31 = -cy30 + sb * 5;
    let x32 = -cx30 + cb * 5;
    let y32 = -cy30 - sb * 5;
    // 15
    drawLine([cx + cx0 + x31, cy + cy0 + y31], [cx + cx0 + x32, cy + cy0 + y32], white);
    let x33 =  cx30 + cb * 5;
    let y33 =  cy30 - sb * 5;
    let x34 =  cx30 - cb * 5;
    let y34 =  cy30 + sb * 5;
    // -15
    drawLine([cx + cx0 + x33, cy + cy0 + y33], [cx + cx0 + x34, cy + cy0 + y34], white);

    let cy40 = cb * 20 * k;
    let cx40 = sb * 20 * k;
    let x41 = -cx40 - cb * 10;
    let y41 = -cy40 + sb * 10;
    let x42 = -cx40 + cb * 10;
    let y42 = -cy40 - sb * 10;
    // 20
    drawLine([cx + cx0 + x41, cy + cy0 + y41], [cx + cx0 + x42, cy + cy0 + y42], white);
    let x43 =  cx40 + cb * 10;
    let y43 =  cy40 - sb * 10;
    let x44 =  cx40 - cb * 10;
    let y44 =  cy40 + sb * 10;
    // -20
    drawLine([cx + cx0 + x43, cy + cy0 + y43], [cx + cx0 + x44, cy + cy0 + y44], white);

    // mark
    let red = "#DD0000";
    drawLine([cx - 20, cy],       [cx - 8, cy], red);
    drawLine([cx - 8,  cy + 10],  [cx - 8, cy], red);
    drawLine([cx + 20, cy],       [cx + 8, cy], red);
    drawLine([cx + 8,  cy + 10],  [cx + 8, cy], red);
    
    
/*
    drawLine([cx - 1, cy - y5 + 10],  [cx + 1, cy - y5 + 10], white);
    drawLine([cx - 1, cy - y5 - 10],  [cx + 1, cy - y5 - 10], white);
    if (ptc < -10) {
	drawLine([cx - 1, cy - y5 - 50], [cx + 1, cy - y5 - 50], white);
    } else {
	drawLine([cx - 2, cy - y5 + 20], [cx + 2, cy - y5 + 20], white);
    }
    if (ptc < - 5) {
	drawLine([cx - 2, cy - y5 - 40], [cx + 2, cy - y5 - 40], white);
    } else {
	drawLine([cx - 1, cy - y5 + 30], [cx + 1, cy - y5 + 30], white);
    }
    if (ptc > 10) {
	drawLine([cx - 1, cy - y5 + 50], [cx + 1, cy - y5 + 50], white);
    } else {
	drawLine([cx - 2, cy - y5 - 20], [cx + 2, cy - y5 - 20], white);
    }
    if (ptc > 5) {
	drawLine([cx - 2, cy - y5 + 40], [cx + 2, cy - y5 + 40], white);
    } else {
	drawLine([cx - 1, cy - y5 - 30], [cx + 1, cy - y5 - 30], white);
    }
*/
} // function drawHorizontalIndicator(p)

function drawForce(p) {
    let fx    = p.fx;
    let fy    = p.fy;
    let fz    = p.fz;
    let lift  = p.lift;
    let drag  = p.drag;
    let lift2 = p.lift2;
    
    let cx  = 540;
    let cy  = 400;
    let w2  = 30;
    let h2  = 30;
    let cx2 = 590;
    let cx3 = 580;
    let cx4 = 575
    let blue = "#0000DD";
    
    drawLine([cx - w2, cy], [cx + w2, 400], blue);
    drawLine([cx, cy - h2], [cx, cy + h2], blue);
    drawLine([cx2, cy - h2], [cx2, cy + h2], blue);
    let yy  = -fz / 1000 + cy;
    let xx  =  fx / 1000 + cx;
    let yy2 = -fy / 1000 + cy;
    let yy3 = -lift / 10000 + cy; // 
    let yy4 = drag / 10000 + cy;
    let yy5 = -lift2 / 40 + cy; 

    let yellow = "#CCCC00";
    drawLine([cx, yy], [cx, cy], yellow);
    drawLine([xx, cy], [cx, cy], yellow);
    drawLine([cx2,yy2], [cx2, cy], yellow);

    drawLine([cx3, yy3], [cx3, cy], yellow); // lift
    drawLine([cx3, yy4], [cx3, cy], yellow); // drag
    drawLine([cx4, yy5], [cx4, cy], yellow); // lift2
} // function drawForce(p)

function drawForce2(p) {
    let cx = 480;
    let cy = 400;
    let w  = 50;
    let h = 50;
    let w2 = w / 2;
    let h2 = h / 2;
    let y2 = cy + w2 + 10;
    let blue = "#0000DD";

    drawLine([cx - w2, cy], [cx + w2, cy], blue);
    drawLine([cx, cy - h2], [cx, cy + h2], blue);

    let sp = Math.sin(Math.PI * p.ptc / 180);
    let cp = Math.cos(Math.PI * p.ptc / 180);
    let t_y =   p.thrust * cp;
    let t_z =  -p.thrust * sp;
    let d_y =   p.drag * cp;
    let d_z =   p.drag * sp;
    let l_y =   p.lift * sp;
    let l_z =   p.lift * cp;
    let fy1 =  t_y  + p.lift * sp - p.drag * cp;
    let fz1 =  t_z  + p.lift * cp + p.drag * sp;
    
    let yellow = "#CCCC00";
    let green  = "#00CC00";
    let x1 = -t_y / 10000 + cx;
    let y1 = -t_z / 10000 + cy;
    let xx2 = -fy1 / 10000 + cx;
    let yy2 = -fz1 / 10000 + cy;
    let yy3 = p.weight / 10000 + cy;
    let xx4 = d_y / 10000 + cx;
    let yy4 = -d_z / 10000 + cy;
    let xx5 = -l_y / 10000 + cx;
    let yy5 = -l_z / 10000 + cy;
    drawLine([cx, cy], [x1, y1], yellow);
    drawLine([cx, cy], [xx2, yy2], green);
    drawLine([cx, cy], [cx, yy3], yellow);
    drawLine([cx, cy], [xx4, yy4], yellow);
    drawLine([cx, cy], [xx5, yy5], yellow);
} // function drawForce2(p)

function drawWheelBrake(p) {
    let x0 = 130;
    let y0 = 335;
    let w = 7;
    let h = 30;
    let white = "#DDDDDD";
    let brake = p.wbrake;
    
    drawLine([x0, y0], [x0 + w, y0], white);
    drawLine([x0 + w, y0], [x0 + w, y0 + h], white);
    drawLine([x0 + w, y0 + h], [x0, y0 + h], white);
    drawLine([x0, y0 + h], [x0, y0], white);

    let yellow = "#DDDD00";
    let x1 = x0 + w / 2;
    let y1 = y0 + 1 + (h - 2) / 100 * brake;
    drawLine([x1, y0 + 1], [x1, y1], yellow);
    
} // function drawWheelBrake(p)

function drawGearStatus(p) {
    let cx = 160;
    let cy = 350;
    let gear_down = p.gear_down;
    let cnt = p.gear_status;

    if (gear_down == 0) {
	ctx.fillStyle = "#AA0000"; // red
    } else if (gear_down == 3) { // gear down
	ctx.fillStyle = "#00AA00"; // green
    } else { // up/down opeartion
	if (cnt < 90) {
	    ctx.fillStyle = "#F58220"; // orange
	} else {
	    ctx.fillStyle = "#AAAA00"; // yellow
	}
    }

    ctx.beginPath();
    ctx.rect(cx - 3, cy - 12, 6, 6);
    ctx.rect(cx - 12, cy, 6, 6);
    ctx.rect(cx + 6, cy, 6, 6);
    ctx.fill();
    ctx.closePath();
} // function drawGear(p)

function drawController(p) {
    let cx = 160;
    let cy = 400;
    let w  = 40;
    let h  = 40;
    let w2 = w / 2;
    let h2 = h / 2;
    let y2 = cy + w2 + 10;
    let blue = "#0000DD";

    drawLine([cx - w2, cy], [cx + w2, cy], blue);
    drawLine([cx, cy - h2], [cx, cy + h2], blue);
    drawLine([cx - w2, y2], [cx + w2, y2], blue);
    drawLine([cx, y2 - 5], [cx, y2 + 5], blue);

    let yellow = "#CCCC00";
    let yy1 = -(p.elevator / 25) * h2 + cy;
    let xx1 =  (p.aileron / 25) * w2 + cx;
    drawLine([cx - w2, yy1], [cx + w2, yy1], yellow);
    drawLine([xx1, cy - h2], [xx1, cy + h2], yellow);

    let xx2 =  (p.rudder / 20) * w2 + cx;
    drawLine([xx2, y2 - 3], [xx2, y2 + 3], yellow);
    
} // drawController(p)

function drawSpoiler(p) {
    let x0 = 620
    let y0 = 335
    let w = 8
    let h = 40;
    let h2 = h - 10;
    let x1 = x0 + w;
    let y1 = y0 + h;
    let y2 = y0 + 10;
    //let blue = "#0000DD";
    let white = "#DDDDDD";

    ctx.strokeStyle = white;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x0, y1);
    ctx.closePath();
    ctx.stroke();

    let yellow = "#CCCC00";
    let y = p.brake / p.brake_max * (h2 - 4) + y2 + 1;
    if (p.auto_brake) {
	drawLine([x0 + w / 2, y2], [x0 + w /2, y0 + 2], yellow);
    } 
    drawLine([x0 + w / 2, y2 + 1], [x0 + w / 2, y], yellow);
    
} // function drawSpoiler(p)

function drawFlap(p) {
    let x0 = 620
    let y0 = 380
    let w = 8
    let h = 60;
    let x1 = x0 + w;
    let y1 = y0 + h;
    //let blue = "#0000DD";
    let white = "#DDDDDD";

    ctx.strokeStyle = white;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x0, y1);
    ctx.closePath();
    ctx.stroke();

    let yellow = "#CCCC00";
    let y = p.select / p.select_max * (h - 4) + y0 + 2;
    drawLine([x0 + w / 2, y0 + 2], [x0 + w / 2, y], yellow);
    
} // function drawFlap(p)

function drawThrottle(p) {
    let x0 = 600
    let y0 = 300
    let w = 10;
    let h = 100;
    let x1 = x0 + w;
    let y1 = y0 + h;
    let y2 = y0 + (h / 12) * 5;
    let y3 = y0 + (h / 12) * 10;
    let thr = p.thr;
    let thrust_max = p.thrust_max;
    //let blue = "#0000DD";
    let white = "#DDDDDD";
    
    ctx.strokeStyle = white;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x0, y1);
    ctx.closePath();
    ctx.stroke();
    drawLine([x1 + 2,  y0], [x1 + 8, y0], white); // 100
    drawLine([x1 + 2,  y2], [x1 + 6, y2], white); // 50
    drawLine([x1 + 2,  y3], [x1 + 8, y3], white); // 0
    drawLine([x1 + 2,  y1], [x1 + 6, y1], white); // rev
    for (let i = 3; i <= 11; i++) {
	let y = y1 - (i / 12) * h;
	drawLine([x1 + 2,  y], [x1 + 3, y], white);
    }
	 
    let yellow = "#CCCC00";
    let y = y3 - (thr / 100) * (y3 - y0);
    drawLine([x0 + 2, y], [x1 - 2, y], yellow);

    let y20 = y3 - (plane.thrust / plane.thrust_max * (y3 - y0));
    drawLine([x0 + w / 2, y20], [x0 + w / 2, y3], yellow);

} // function drawThrottle(p)

function drawVangle(p) {
    const cx = CANVAS_WIDTH / 2;
    //const cy = CANVAS_HEIGHT / 2;
    const cy = CANVAS_HEIGHT / 2 - 100;
    let vangle  = p.vangle;
    let vhangle = p.vhangle;
    let k = 1000;
    let va = vangle;
    let vh = vhangle - p.yaw;
    let y =  Math.tan(Math.PI * va / 180) * 0.5 * k + cy;
    let x =  Math.tan(Math.PI * vh / 180) * 0.5 * k + cx;
    let r = 5;
    ctx.beginPath();
    ctx.strokeStyle = "#EE00EE";
    ctx.lineWidth = 1;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
} // function drawVangle(p)

function drawVec(p) {
    let cx = 320;
    //let cy = 240;
    let cy = 240 - 50;
    let vx =  p.velx;
    let vy = -p.velz;
    
    drawLine([cx + vx - 20, cy + vy], [cx + vx + 20, cy + vy], "#EE00EE");
    drawLine([cx + vx, cy + vy - 20], [cx + vx, cy + vy + 20], "#EE00EE");
} // function drawVec(p)

function drawInstruments(p) {
    drawLines();

    //drawVec(plane);
    drawVangle(plane);
    
    drawHorizontalIndicator(plane);
    drawWheelBrake(plane);
    drawGearStatus(plane);
    drawController(plane);
    drawSpoiler(plane);
    drawFlap(plane);
    drawThrottle(plane);
    drawForce2(plane);
    drawForce(plane);
    drawCL(plane); // model.js
    drawCD(plane); // model.js

    drawSpeed(plane);
    drawAltitude(plane);
    drawHeading(plane);
    
} // function drawInstruments(p)

// End of file (draw.js)
