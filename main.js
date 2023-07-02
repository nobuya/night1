//
// JavaScript codes (main.js)
//

// debug
const DEBUG = true;
let debugMode = DEBUG;

let pauseMode = true;
let stop = true;

const G = 9.8

let drawCount = 0;
let drawCount2 = 0;
let fps = 0;
let lastTime = Date.now(); // (ms)

// smoothing
const SMOOTHING = false;

// game speed (ms)
const GAME_SPEED = 1000 / 60; // 60 FPS (16.67 ms)

// screen size
const SCREEN_WIDTH  = 640;
const SCREEN_HEIGHT = 480;

// canvas size
const CANVAS_WIDTH  = SCREEN_WIDTH;
const CANVAS_HEIGHT = SCREEN_HEIGHT;

// get canvas and context
const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");  // context

// set canvas size
canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.mozimageSmoothingEnabled    = SMOOTHING;
ctx.webkitimageSmoothingEnabled = SMOOTHING;
ctx.msimageSmoothingEnabled     = SMOOTHING;
ctx.imageSmoothingEnabled       = SMOOTHING;
ctx.font = "20px 'Impact'";


// button (key) state
let keyboard = {};
let score = 0;
let lives = 0;

let gameCount = 0;

let points0 = [
    [-3500, 10000, 0, "#00AAAA", 1],
    [-1500, 10000, 0, "#00AAAA", 1],
    [ -500, 10000, 0, "#00AAAA", 1],
    [  500, 10000, 0, "#00AAAA", 1],
    [ 1500, 10000, 0, "#00AAAA", 1],
    [ 3500, 10000, 0, "#00AAAA", 1],
    //
    [-3000, 15000, 0, "#00AAAA", 1],
    [-1000, 15000, 0, "#00AAAA", 1],
    [ 1000, 15000, 0, "#00AAAA", 1],
    [ 3000, 15000, 0, "#00AAAA", 1],
    //
    [-5000, 20000, 0, "#00AAAA", 1],
    [-2500, 20000, 0, "#00AAAA", 1],
    [ 2500, 20000, 0, "#00AAAA", 1],
    [ 5000, 20000, 0, "#00AAAA", 1],
    //
    [-2000,  3000, 0, "#00AAAA", 1],
    [-1000,  3000, 0, "#00AAAA", 1],
//    [    0,  3000, 0, "#00AAAA", 1],
    [ 1000,  3000, 0, "#00AAAA", 1],
    [ 2000,  3000, 0, "#00AAAA", 1],
    //
    [-2000,  2000, 0, "#00AAAA", 1],
    [-1000,  2000, 0, "#00AAAA", 1],
//    [    0,  2000, 0, "#00AAAA", 1],
    [ 1000,  2000, 0, "#00AAAA", 1],
    [ 2000,  2000, 0, "#00AAAA", 1],
    //
    [-2000,  1000, 0, "#00AAAA", 1],
    [-1000,  1000, 0, "#00AAAA", 1],
//    [    0,  1000, 0, "#00AAAA", 1],
    [ 1000,  1000, 0, "#00AAAA", 1],
    [ 2000,  1000, 0, "#00AAAA", 1],
    //
    [-2000,     0, 0, "#00AAAA", 1],
    [-1000,     0, 0, "#00AAAA", 1],
//    [    0,     0, 0, "#00AAAA", 1],
    [ 1000,     0, 0, "#00AAAA", 1],
    [ 2000,     0, 0, "#00AAAA", 1],
    //
    [-2000, -1000, 0, "#00AAAA", 1],
    [-1000, -1000, 0, "#00AAAA", 1],
    [    0, -1000, 0, "#00AAAA", 1],
    [ 1000, -1000, 0, "#00AAAA", 1],
    [ 2000, -1000, 0, "#00AAAA", 1],
    //
    [-2000, -2000, 0, "#00AAAA", 1],
    [-1000, -2000, 0, "#00AAAA", 1],
    [    0, -2000, 0, "#00AAAA", 1],
    [ 1000, -2000, 0, "#00AAAA", 1],
    [ 2000, -2000, 0, "#00AAAA", 1],
    //
    [-2000, -3000, 0, "#00AAAA", 1],
    [-1000, -3000, 0, "#00AAAA", 1],
    [    0, -3000, 0, "#00AAAA", 1],
    [ 1000, -3000, 0, "#00AAAA", 1],
    [ 2000, -3000, 0, "#00AAAA", 1],
    //
    [-2000, -4000, 0, "#00AAAA", 1],
    [-1000, -4000, 0, "#00AAAA", 1],
    [    0, -4000, 0, "#00AAAA", 1],
    [ 1000, -4000, 0, "#00AAAA", 1],
    [ 2000, -4000, 0, "#00AAAA", 1],
    //
    [-2000, -5000, 0, "#00AAAA", 1],
    [-1000, -5000, 0, "#00AAAA", 1],
    [    0, -5000, 0, "#00AAAA", 1],
    [ 1000, -5000, 0, "#00AAAA", 1],
    [ 2000, -5000, 0, "#00AAAA", 1],
    //
    [-2000, -6000, 0, "#00AAAA", 1],
    [-1000, -6000, 0, "#00AAAA", 1],
    [    0, -6000, 0, "#00AAAA", 1],
    [ 2000, -6000, 0, "#00AAAA", 1],
    [ 1000, -6000, 0, "#00AAAA", 1],
    //
    [-2000, -9000, 0, "#00AAAA", 1],
    [-1000, -9000, 0, "#00AAAA", 1],
    [    0, -9000, 0, "#00AAAA", 1],
    [ 1000, -9000, 0, "#00AAAA", 1],
    [ 2000, -9000, 0, "#00AAAA", 1],

];

let points = makePoints();
for (i = 0; i < points0.length; i++) {
    points.push(points0[i]);
}

// screen points
let s_points = [];
let pos0 = [0,    100, 0];
let pos1 = [0,  -2000, 120];
let pos2 = [0, -10000, 500];
let pos3 = [0, -20000, 1000];

//let plane = new Airplane(pos0, /* vel */0, /* thr */ 10);
let plane = new Airplane(pos2, /* vel */80, /* thr */ 50);
//let plane = new Airplane(pos3, /* vel */90, /* thr */ 40);


function calc(p) {
    let x = p.x;
    let y = p.y;
    let z = p.z;
    let hdg = p.hdg + p.sideslip_angle;
    let ptc = p.ptc;
    let bnk = p.bnk;
    
    s_points.splice(0); // clear
    for (let i = 0; i < points.length; i++) {
	let pt = points[i];
	let x1 = pt[0] - x;
	let y1 = pt[1] - y;
	let z1 = pt[2] - z;
	// heading
	let sh = Math.sin(Math.PI * hdg / 180);
	let ch = Math.cos(Math.PI * hdg / 180);
	let x2 = x1 * ch - y1 * sh;
	let y2 = y1 * ch + x1 * sh;
	let z2 = z1;
	// banking
	let sb = Math.sin(Math.PI * bnk / 180);
	let cb = Math.cos(Math.PI * bnk / 180);
	let x3 = x2 * cb - z2 * sb;
	let y3 = y2;
	let z3 = z2 * cb + x2 * sb;
	// pitching
	let sp = Math.sin(Math.PI * ptc / 180);
	let cp = Math.cos(Math.PI * ptc / 180);
	let x4 = x3;
	let y4 = y3 * cp - z3 * sp;
	let z4 = z3 * cp + y3 * sp;

	let cx = CANVAS_WIDTH / 2;
	//let cy = CANVAS_HEIGHT / 2;
	let cy = CANVAS_HEIGHT / 2 - 50;
	
	if (y4 > 0) {
	    let k = 1000;
	    let sx = x4 / y4 * 0.5 * k + cx;
	    let sy = -z4 / y4 * 0.5 * k + cy;
	    let style = pt[3];
	    let type = pt[4];
	    s_points.push([sx, sy, y4, style, type]);
	}
    }
} // function calc(p)


function controle(p) {
    if (keyboard.Shift) {
	if (keyboard.B) {
	    if (p.brake > 0) {
		p.brake -= 1;
	    } 
	}
	if (keyboard.V) {
	    p.brake = 0;
	    p.auto_brake = true;
	}
	if (keyboard.Right2) {
	    if (p.wbrake > 0) p.wbrake -= 1;
	}
	if (keyboard.F) if (p.select > 0 && p.fcount > 120) {
	    p.select -= 1;
	    p.fcount = 0;
	}
	if (keyboard.A) {
	    if (p.thr > 10) {
		p.thr = 10;
		p.idelcount = 0;
	    } else if (p.thr == 10 && p.idelcount >= 30) {
		p.thr = 0;
		p.idelcount = 0;
	    } else if (p.thr == 0 && p.idelcount >= 30) {
		p.thr = 10;
		p.idelcount = 0;
	    } else if (p.thr < 0 && p.idelcount >= 30) {
		p.thr = 0;
		p.idelcount = 0;
	    }
	}
	if (keyboard.Q) {
	    if (p.thr < 0) {
		p.thr = 0;
	    }
	}
//	if (keyboard.G && p.gear_down == 0) {
//	    p.gear_down = 1;
//	    p.gear_status = 0;
//	}
    } else {
	if (keyboard.B) {
	    if (p.brake < 40) {
		p.brake += 1;
		p.auto_brake = false;
	    }
	}
	if (keyboard.V) {
	    p.auto_brake = false;
	    p.brake = 0;
	}
	if (keyboard.Right2) {
	    if (p.wbrake < 100) p.wbrake += 1;
	}
	if (keyboard.F) if (p.select < p.select_max && p.fcount > 120) {
	    p.select += 1;
	    p.fcount = 0;
	}
	if (keyboard.Q) {
	    if (p.thr < 0) {
		p.thr = 0;
	    } else {
		p.thr = (p.thr < 100) ? p.thr + 0.5 : p.thr;
	    }
	}
	if (keyboard.A) {
	    if (p.thr <= 0) {
		p.thr = (p.thr > -20) ?  p.thr - 0.5 : p.thr;
	    } else {
		p.thr = (p.thr > 10) ?  p.thr - 0.5 : p.thr;
	    }
	}
//	if (keyboard.G && p.gear_down == 3) {
//	    p.gear_down = 2;
//	    p.gear_status = 180;
//	}
    }
    if (keyboard.Left)  if (p.aileron > -25) p.aileron -= 1;
    if (keyboard.Right) if (p.aileron < 25)  p.aileron += 1;
    if (keyboard.Z)     if (p.rudder > -25)  p.rudder  -= 1;
    if (keyboard.X)     if (p.rudder < 25)   p.rudder  += 1;
//    if (keyboard.Up)    ptc = (ptc + 0.1) % 360;
//    if (keyboard.Down)  ptc = (ptc - 0.1 + 360) % 360;
    if (keyboard.Up)    if (p.elevator < 25)  p.elevator += 1;
    if (keyboard.Down)  if (p.elevator > -25) p.elevator -= 1;
    if (keyboard.G) {
	if (p.gear_down == 0) { // gear up
	    p.gear_down = 1; // start gear down
	    p.gear_status = 0;
	} else if (p.gear_down == 3) { // gear down
	    p.gear_down = 2; // start gear up
	    p.gear_status = 180;
	}
    }
    if (keyboard.S) {
	stop = stop ? false : true;
    }
    if (keyboard.P) {
	if (drawCount % 30 == 0) {
	    pauseMode = true;
	}
    }
    if (DEBUG) {
	if (keyboard.D) {
	    debugMode = debugMode ? false : true;
	}
    }
} // function controle(p)

function controle__(p) {
    if (keyboard.Left)  p.bnk = (p.bnk - 0.2 + 360) % 360;
    if (keyboard.Right) p.bnk = (p.bnk + 0.2) % 360;
    if (keyboard.Z)     p.hdg = (p.hdg - 0.1 + 360) % 360;
    if (keyboard.X)     p.hdg = (p.hdg + 0.1) % 360;
//    if (keyboard.Up)    ptc = (ptc + 0.1) % 360;
//    if (keyboard.Down)  ptc = (ptc - 0.1 + 360) % 360;
    if (keyboard.Up)    p.elev = p.elev + 0.0025;
    if (keyboard.Down)  p.elev = p.elev - 0.0025;
    if (keyboard.Q)     p.thr = (p.thr < 100) ? p.thr + 0.1 : p.thr;
    if (keyboard.A)     p.thr = (p.thr > 0) ?   p.thr - 0.1 : p.thr;
    if (keyboard.S) {
	stop = stop ? false : true;
    }
    if (keyboard.P) {
	if (drawCount % 30 == 0) {
	    pauseMode = true;
	}
    }
    if (DEBUG) {
	if (keyboard.D) {
	    debugMode = debugMode ? false : true;
	}
    }
} // function controle(p)

function controlePauseMode(p) {
    if (keyboard.Shift) {
	if (keyboard.Left)  p.dx -= 0.1;
	if (keyboard.Right) p.dx += 0.1;
	if (keyboard.Up)    p.dy += 0.1;
	if (keyboard.Down)  p.dy -= 0.1;
    } else {
	if (keyboard.Left) p.bnk = p.bnk - 0.2;
	if (keyboard.Right) p.bnk = p.bnk + 0.2;
	//if (keyboard.Up)    p.ptc = (p.ptc + 0.1) % 360;
	//if (keyboard.Down)  p.ptc = (p.ptc - 0.1 + 360) % 360;
	if (keyboard.Up)    p.ptc += 0.1;
	if (keyboard.Down)  p.ptc -= 0.1;
    }
    if (keyboard.Z)     p.hdg = (p.hdg - 0.5 + 360) % 360;
    if (keyboard.X)     p.hdg = (p.hdg + 0.5) % 360;
//    if (keyboard.Up)    elev = elev + 0.0025;
//    if (keyboard.Down)  elev = elev - 0.0025;
    if (keyboard.Left2)  p.dx -= 0.1;
    if (keyboard.Right2) p.dx += 0.1;
    if (keyboard.Q)      p.dy += 0.1;
    if (keyboard.A)      p.dy -= 0.1;
    if (keyboard.K)      p.dz -= 0.1;
    if (keyboard.L)      p.dz += 0.1;
    if (keyboard.F)      p.select = (p.select + 1) % 4;
    if (keyboard.S) {
	//stop = stop ? false : true;
	p.dx = 0;
	p.dy = 0;
	p.dz = 0;
    }
    if (keyboard.P) {
	if (drawCount % 30 == 0) {
	    pauseMode = false;
	    stop = false;
	}
    }
    if (DEBUG) {
	if (keyboard.D) {
	    debugMode = debugMode ? false : true;
	}
    }
} // function controlePauseMode(p)


function move() {
    //x += dx;
    //y += dy;
    //z += dz;
	 
    //hdg += dhdg;
//    if (z <= 4) {
//	z = 4;
//	dz = 0;
//    }
} // function move()

function updateAll() {
    controle(plane);
    //attitude();
    //model();
    plane.update1();

    if (!stop) {
	//move();
	plane.update();
    }

    calc(plane);
} // function updateAll()

//let n = 0;

function updateAllPauseMode() {
    controlePauseMode(plane);
    //plane.attitude();
//    if (n == 0) {
//	plane.model();
//	n++;
//    }
    plane.update();  
    //plane.update1();
    //calc(plane.x, plane.y, plane.z, plane.hdg, plane.ptc, plane.bnk);
    calc(plane);
    //plane.update();
    //move();
} // function updateAllPauseMode()

let todai = [ "#DDDD22", "#44EE22", "#222222" ];

function drawPoints(p) {
    let x = p.x;
    let y = p.y;
    let z = p.z;
    
    for (let i = 0; i < s_points.length; i++) {
	let xx    = s_points[i][0];
	let yy    = s_points[i][1];
	let zz    = s_points[i][2];
	let style = s_points[i][3];
	let type  = s_points[i][4];
	let sz = zz > 1000 ? 1 : (zz > 100 ? 2 : 3);
	//ctx.fillStyle = "#00AA00";
	//ctx.fillStyle = points[i][3];
	if (type == 1) {
	    //let sz = zz > 1000 ? 1 : (zz > 500 ? 2 : 3);
	    ctx.fillStyle = style;
	    ctx.beginPath();
	    ctx.rect(xx, yy, sz, sz);
	    ctx.fill();
	    ctx.closePath();
	} else if (type == 2) {
	    if (drawCount < 45) {
		let ii = drawCount2 % 2;
		ctx.fillStyle = todai[ii];
	    } else {
		ctx.fillStyle = todai[2];
	    }
	    ctx.beginPath();
	    ctx.rect(xx, yy, 3, 3);
	    ctx.fill();
	    ctx.closePath();
	} else if (type >= 100) {
	    let c = drawCount % 20;
	    let sz2 = sz < 2 ? 2 : sz;
	    if (c == (type - 140)) {
		ctx.fillStyle = style;
		ctx.beginPath();
		ctx.rect(xx, yy, sz2, sz2);
		ctx.fill();
		ctx.closePath();
	    }
	} else if (type >= 10) {
	    let angle = Math.atan(z / (150 - y)) / Math.PI * 180;
	    if (type == 10) {
		ctx.fillStyle = (angle >= 2.5) ? "#EEEEEE" : "#AA1111";
	    } else if (type == 11) {
		ctx.fillStyle = (angle >= 2.83) ? "#EEEEEE" : "#AA1111";
	    } else if (type == 12) {
		ctx.fillStyle = (angle >= 3.17) ? "#EEEEEE" : "#AA1111";
	    } else if (type == 13) {
		ctx.fillStyle = (angle >= 3.50) ? "#EEEEEE" : "#AA1111";
	    }
	    let sz2 = sz < 2 ? 2 : sz;
	    //ctx.fillStyle = style;
	    ctx.beginPath();
	    ctx.rect(xx, yy, sz2, sz2);
	    ctx.fill();
	    ctx.closePath();
	}


	//ctx.font = "20px Impact";
	//ctx.fillStyle = "#eeeeee";
	//ctx.fillText("(" + xx + ", " + yy + ")", 10, 80 + i * 20);
    }
} // function drawPoints(p)

function drawLine(begin, end, style) {
    let st = (style == undefined) ? "#DDDDDD" : style;
    ctx.strokeStyle = st;
    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.closePath();
    ctx.stroke();
} // function drawLine(begin, end, style)
/*
function drawLine(begin, end) {
    ctx.strokeStyle = "#DDDDDD";
    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}
*/

function drawLines() {
    let cx = 320;
    //let cy = 240;
    let cy = 240 - 50; // 190
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

/*
function drawOne() {
    ctx.fillStyle = "#888888";
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.lineTo(200, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 100);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
*/

// draw score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0000DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
} // function drawScore()

// draw lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0000DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
} // function drawLives()

function drawHeading(p) {
    let cx = 320;
    let cy = 420;
    let heading = Math.ceil(p.hdg);
    let white = "#DDDDDD";
    ctx.font = "14px Arial";
    ctx.fillStyle = white;

    if (heading == 0) heading = 360;
    ctx.fillText(`${heading}`, cx - 12, cy);
    
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
    let h = 40;
    let w2 = w / 2;
    let h2 = h / 2;
    let y2 = cy + w2 + 10;
    let blue = "#0000DD";

    drawLine([cx - w2, cy], [cx + w2, cy], blue);
    drawLine([cx, cy - h2], [cx, cy + h2], blue);
    drawLine([cx - w2, y2], [cx + w2, y2], blue);
    drawLine([cx, y2 - 5], [cx, y2 + 5], blue);

    let yellow = "#CCCC00";
    let yy1 = -p.elevator * 1 + cy;
    let xx1 =  p.aileron * 1  + cx;
    drawLine([cx - w2, yy1], [cx + w2, yy1], yellow);
    drawLine([xx1, cy - h2], [xx1, cy + h2], yellow);

    let xx2 =  p.rudder * 1 + cx;
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
    let cx = CANVAS_WIDTH / 2;
    //let cy = CANVAS_HEIGHT / 2;
    let cy = CANVAS_HEIGHT / 2 - 50;
    let vangle  = p.vangle;
    let vhangle = p.vhangle;
    let k = 1000;
    let va = vangle;
    let vh = vhangle;
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

function drawAll() {
    drawCount++;
    if (lastTime + 1000 <= Date.now()) {
	fps = drawCount;
	drawCount = 0;
	lastTime = Date.now();
	drawCount2++;
	if (drawCount2 >= 10) drawCount2 = 0;
    }

    // clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawLines();
    
    drawPoints(plane);

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
    drawCL(plane);
    drawCD(plane);

    drawSpeed(plane);
    drawAltitude(plane);
    drawHeading(plane);
    
    // draw score
    //drawScore();
    // draw lives
    //drawLives();

    plane.draw();

} // function drawAll()

function printInfo() {
    if (pauseMode) {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#DD0000";
	ctx.fillText(`PAUSE MODE`, canvas.width / 2 - 65, 20);
    }

    if (debugMode) printDebugInfo();
} // function printInfo()

function printDebugInfo() {
    ctx.font = "20px Impact";
    ctx.fillStyle = "#eeeeee";
    ctx.fillText("FPS: " + fps, 10, 40);
    plane.printDebugInfo();
} // function printDebugInfo()

function gameLoop() {
    gameCount++;
    updateAll();
    drawAll();
    printInfo();
    if (pauseMode) {
	requestAnimationFrame(gameLoopPauseMode);
    } else {
	requestAnimationFrame(gameLoop);
    }
} // function gameLoop()

function gameLoopPauseMode() {
    gameCount++;
    updateAllPauseMode();
    drawAll();
    printInfo();
    if (pauseMode) {
	requestAnimationFrame(gameLoopPauseMode);
    } else {
	requestAnimationFrame(gameLoop);
    }
}

// event listener (keybord)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// event listener (mouse)
document.addEventListener("mousemove", mouseMoveHandler, false);

// keyboard operation handler (down)
function keyDownHandler(e) {
    if (e.shiftKey)       keyboard.Shift  = true; // SHIFT
    if (e.keyCode == 38)  keyboard.Up     = true; // (up)
    if (e.keyCode == 40)  keyboard.Down   = true; // (down)
    if (e.keyCode == 37)  keyboard.Left   = true; // <-
    if (e.keyCode == 39)  keyboard.Right  = true; // ->
    if (e.keyCode == 188) keyboard.Left2  = true; // , <
    if (e.keyCode == 190) keyboard.Right2 = true; // . >
    if (e.keyCode == 65)  keyboard.A      = true; // A
    if (e.keyCode == 66)  keyboard.B      = true; // B
    if (e.keyCode == 68)  keyboard.D      = true; // D
    if (e.keyCode == 70)  keyboard.F      = true; // F
    if (e.keyCode == 71)  keyboard.G      = true; // G
    if (e.keyCode == 75)  keyboard.K      = true; // K
    if (e.keyCode == 76)  keyboard.L      = true; // L
    if (e.keyCode == 80)  keyboard.P      = true; // P
    if (e.keyCode == 81)  keyboard.Q      = true; // Q
    if (e.keyCode == 82)  keyboard.R      = true; // R
    if (e.keyCode == 83)  keyboard.S      = true; // S
    if (e.keyCode == 86)  keyboard.V      = true; // V
    if (e.keyCode == 88)  keyboard.X      = true; // X
    if (e.keyCode == 90)  keyboard.Z      = true; // Z
} // function keyDownHandler(e)

// keyboard operation handler (up)
function keyUpHandler(e) {
    if (e.shiftKey)       keyboard.Shift  = false; // SHIFT
    if (e.keyCode == 38)  keyboard.Up     = false; // (up)
    if (e.keyCode == 40)  keyboard.Down   = false; // (down)
    if (e.keyCode == 37)  keyboard.Left   = false; // <-
    if (e.keyCode == 39)  keyboard.Right  = false; // ->
    if (e.keyCode == 188) keyboard.Left2  = false; // , <
    if (e.keyCode == 190) keyboard.Right2 = false; // . >
    if (e.keyCode == 65)  keyboard.A      = false; // A
    if (e.keyCode == 66)  keyboard.B      = false; // B
    if (e.keyCode == 68)  keyboard.D      = false; // D
    if (e.keyCode == 70)  keyboard.F      = false; // F
    if (e.keyCode == 71)  keyboard.G      = false; // G
    if (e.keyCode == 75)  keyboard.K      = false; // K
    if (e.keyCode == 76)  keyboard.L      = false; // L
    if (e.keyCode == 80)  keyboard.P      = false; // P
    if (e.keyCode == 81)  keyboard.Q      = false; // Q
    if (e.keyCode == 82)  keyboard.R      = false; // R
    if (e.keyCode == 83)  keyboard.S      = false; // S
    if (e.keyCode == 86)  keyboard.V      = false; // V
    if (e.keyCode == 88)  keyboard.X      = false; // X
    if (e.keyCode == 90)  keyboard.Z      = false; // Z
} // function keyUpHandler(e)

// mouse move operation handler
function mouseMoveHandler(e) {
/*    
    if (!gameOver && !gameClear) {
	const relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
	    paddle.x = relativeX - paddle.width / 2;
	}
    } */
} // function mouseMoveHandler(e)

//initBricks();

function initializeGame() {
    //initBricks();
} // function initializeGame()

// game start when onload
window.onload = function() {
    initializeGame();
    //gameLoop();
    if (pauseMode) {
	gameLoopPauseMode();
    } else {
	gameLoop();
    }
}

// End of file (main.js) 
