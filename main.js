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
let pos1 = [0,  -2000, 120];
let pos2 = [0, -10000, 500];

let plane = new Airplane(pos2);


function calc(p) {
    let x = p.x;
    let y = p.y;
    let z = p.z;
    let hdg = p.hdg;
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

	if (y4 > 0) {
	    let k = 1000;
	    let sx = x4 / y4 * 0.5 * k + CANVAS_WIDTH / 2;
	    let sy = -z4 / y4 * 0.5 * k + CANVAS_HEIGHT / 2;
	    let style = pt[3];
	    let type = pt[4];
	    s_points.push([sx, sy, y4, style, type]);
	}
    }
} // function calc(p)


function controle(p) {
    if (keyboard.Left)  if (p.aileron > -25) p.aileron -= 1;
    if (keyboard.Right) if (p.aileron < 25)  p.aileron += 1;
    if (keyboard.Z)     p.rudder  -= 1;
    if (keyboard.X)     p.rudder  += 1;
//    if (keyboard.Up)    ptc = (ptc + 0.1) % 360;
//    if (keyboard.Down)  ptc = (ptc - 0.1 + 360) % 360;
    if (keyboard.Up)    if (p.elevator < 25)  p.elevator += 1;
    if (keyboard.Down)  if (p.elevator > -25) p.elevator -= 1;
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
    if (keyboard.Left)  p.bnk = (p.bnk - 0.2 + 360) % 360;
    if (keyboard.Right) p.bnk = (p.bnk + 0.2) % 360;
    if (keyboard.Z)     p.hdg = (p.hdg - 0.1 + 360) % 360;
    if (keyboard.X)     p.hdg = (p.hdg + 0.1) % 360;
    if (keyboard.Up)    p.ptc = (p.ptc + 0.1) % 360;
    if (keyboard.Down)  p.ptc = (p.ptc - 0.1 + 360) % 360;
//    if (keyboard.Up)    elev = elev + 0.0025;
//    if (keyboard.Down)  elev = elev - 0.0025;
    if (keyboard.Left2)  p.dx -= 0.1;
    if (keyboard.Right2) p.dx += 0.1;
    if (keyboard.Q)      p.dy += 0.1;
    if (keyboard.A)      p.dy -= 0.1;
    if (keyboard.K)      p.dz -= 0.1;
    if (keyboard.L)      p.dz += 0.1;
    if (keyboard.S) {
	//stop = stop ? false : true;
	p.dx = 0;
	p.dy = 0;
	p.dz = 0;
    }
    if (keyboard.P) {
	if (drawCount % 30 == 0) {
	    pauseMode = false;
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
    plane.model();
    //calc(plane.x, plane.y, plane.z, plane.hdg, plane.ptc, plane.bnk);
    calc(plane);
    //plane.update1();
    plane.update();
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
    ctx.stroke();
    ctx.closePath();
}
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
    let cy = 240;
    
    //drawLine([250, cy], [290, cy], "#DDDDDD");
    drawLine([250, cy], [290, cy], "#3333DD");
    drawLine([350, cy], [390, cy], "#3333DD");
    drawLine([cx, 180], [cx, 210], "#3333DD");
    drawLine([cx, 270], [cx, 300], "#3333DD");
} // function drawLines()

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

function drawForce(p) {
    let fx    = p.fx;
    let fy    = p.fy;
    let fz    = p.fz;
    let lift  = p.lift;
    let drag  = p.drag;
    let lift2 = p.lift2;
    
    let cx  = 530;
    let cy  = 400;
    let cx2 = 580;
    let cx3 = 570;
    let cx4 = 565
    let blue = "#0000DD";
    
    drawLine([500, 400], [560, 400], blue);
    drawLine([530, 370], [530, 430], blue);
    drawLine([cx2, 370], [cx2, 430], blue);
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

function drawController(p) {
    let cx = 450;
    let cy = 400;
    let w  = 50;
    let h = 50;
    let w2 = w / 2;
    let h2 = h / 2;
    let y2 = cy + w2 + 10;
    let blue = "#3333DD";

    drawLine([cx - w2, cy], [cx + w2, cy], blue);
    drawLine([cx, cy - h2], [cx, cy + h2], blue);
    drawLine([cx - w2, y2], [cx + w2, y2], blue);
    drawLine([cx, y2 - 4], [cx, y2 + 4], blue);

    let yellow = "#CCCC00";
    let yy1 = -p.elevator * 1 + cy;
    let xx1 =  p.aileron * 1  + cx;
    drawLine([cx - w2, yy1], [cx + w2, yy1], yellow);
    drawLine([xx1, cy - h2], [xx1, cy + h2], yellow);
    
} // drawController(p)

function drawThrottle(p) {
    let x0 = 600
    let y0 = 300
    let w = 10;
    let h = 150;
    let x1 = x0 + w;
    let y1 = y0 + h;
    let thr = p.thr;
    let thrust_max = p.thrust_max;
    let blue = "#3333DD";
    
    ctx.strokeStyle = blue;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x0, y1);
    ctx.closePath();
    ctx.stroke();
    drawLine([x1 + 2,  y0], [x1 + 8, y0], blue); // 100
    drawLine([x1 + 2,  y0 + h / 2], [x1 + 8, y0 + h / 2], blue); // 50
    drawLine([x1 + 2,  y1], [x1 + 8, y1], blue); // 0
    for (let i = 1; i <= 9; i++) {
	let y = y1 - (i / 10) * h;
	drawLine([x1 + 2,  y], [x1 + 6, y], blue);
    }
	 
    let yellow = "#CCCC00";
    let y = y1 - (thr / 100 * h);
    drawLine([x0 + 2, y], [x1 - 2, y], yellow);

    let y2 = y1 - (plane.thrust / plane.thrust_max * h) 
    drawLine([x0 + w / 2, y2], [x0 + w / 2, y1], yellow);

} // function drawThrottle(p)

function drawVangle(p) {
    let vangle  = p.vangle;
    let vhangle = p.vhangle;
    let k = 1000;
    let va = vangle;
    let vh = vhangle;
    let y =  Math.tan(Math.PI * va / 180) * 0.5 * k + CANVAS_HEIGHT / 2;
    let x =  Math.tan(Math.PI * vh / 180) * 0.5 * k + CANVAS_WIDTH / 2;
    let r = 5;
    ctx.beginPath();
    ctx.strokeStyle = "#EE00EE";
    ctx.lineWidth = 1;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
} // function drawVangle(p)

function drawVec(p) { 
    let vx = p.velx;
    let vy = -p.velz;
    
    drawLine([320 + vx - 20, 240 + vy], [320 + vx + 20, 240 + vy], "#EE00EE");
    drawLine([320 + vx, 240 + vy - 20], [320 + vx, 240 + vy + 20], "#EE00EE");
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

    drawVec(plane);
    drawVangle(plane);
    
    drawController(plane);
    drawThrottle(plane);
    drawForce(plane);
    drawCL(plane);
    drawCD(plane);

    // draw score
    drawScore();
    // draw lives
    drawLives();

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
    if (e.keyCode == 38)  keyboard.Up     = true; // (up)
    if (e.keyCode == 40)  keyboard.Down   = true; // (down)
    if (e.keyCode == 37)  keyboard.Left   = true; // <-
    if (e.keyCode == 39)  keyboard.Right  = true; // ->
    if (e.keyCode == 188) keyboard.Left2  = true; // , <
    if (e.keyCode == 190) keyboard.Right2 = true; // . >
    if (e.keyCode == 65)  keyboard.A      = true; // A
    if (e.keyCode == 66)  keyboard.B      = true; // B
    if (e.keyCode == 68)  keyboard.D      = true; // D
    if (e.keyCode == 75)  keyboard.K      = true; // K
    if (e.keyCode == 76)  keyboard.L      = true; // L
    if (e.keyCode == 80)  keyboard.P      = true; // P
    if (e.keyCode == 81)  keyboard.Q      = true; // Q
    if (e.keyCode == 82)  keyboard.R      = true; // R
    if (e.keyCode == 83)  keyboard.S      = true; // S
    if (e.keyCode == 90)  keyboard.Z      = true; // Z
    if (e.keyCode == 88)  keyboard.X      = true; // X
    if (e.keyCode == 70)  keyboard.F      = true; // F
} // function keyDownHandler(e)

// keyboard operation handler (up)
function keyUpHandler(e) {
    if (e.keyCode == 38)  keyboard.Up     = false; // (up)
    if (e.keyCode == 40)  keyboard.Down   = false; // (down)
    if (e.keyCode == 37)  keyboard.Left   = false; // <-
    if (e.keyCode == 39)  keyboard.Right  = false; // ->
    if (e.keyCode == 188) keyboard.Left2  = false; // , <
    if (e.keyCode == 190) keyboard.Right2 = false; // . >
    if (e.keyCode == 65)  keyboard.A      = false; // A
    if (e.keyCode == 66)  keyboard.B      = false; // B
    if (e.keyCode == 68)  keyboard.D      = false; // D
    if (e.keyCode == 75)  keyboard.K      = false; // K
    if (e.keyCode == 76)  keyboard.L      = false; // L
    if (e.keyCode == 80)  keyboard.P      = false; // P
    if (e.keyCode == 81)  keyboard.Q      = false; // Q
    if (e.keyCode == 82)  keyboard.R      = false; // R
    if (e.keyCode == 83)  keyboard.S      = false; // S
    if (e.keyCode == 90)  keyboard.Z      = false; // Z
    if (e.keyCode == 88)  keyboard.X      = false; // X
    if (e.keyCode == 70)  keyboard.F      = false; // F
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
