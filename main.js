//
// JavaScript codes (main.js)
//

// debug
const DEBUG = true;
let debugMode = false;

let pauseMode = true;
let landingMode = false;
let landingModePosition = 0;
let takeoffMode = true;
let stop = true;
let soundMute = false;

// gravitational acceleration
const G = 9.8

let drawCount = 0;
let drawCount2 = 0;

// frames per seconds
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

const audio_ctx = new AudioContext(); // audio context
const engine = new EngineSound(audio_ctx);
const tire = new TireSkidSound(audio_ctx);
const landing_sound = new LandingSoundSystem(audio_ctx);
const gear_sound = new LandingGearSound(audio_ctx, engine.master);
const flap_sound = new FlapSound(audio_ctx, engine.master);
const wind_sound = new WindSound(audio_ctx, engine.master);
const tail_strike_sound = new TailStrikeSound(audio_ctx, engine.master);

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

// terrain
/*
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
*/

let points = makePoints();
//for (i = 0; i < points0.length; i++) {
    //points.push(points0[i]);
//    points.push(new Light(points0[i][0], points0[i][1], points0[i][2],
//                        points0[i][3], points0[i][4]));
//}
makeTerrainPoints(points);

// screen points
let s_points = [];
let pos0 = [0,    100, 0];
let pos1 = [0,  -2000, 120];
let pos2 = [0, -10000, 500];
let pos3 = [0, -20000, 1000];
let pos4 = [0, -60000, 10000];

let plane = new Airplane(pos0, /* vel */0, /* thr */ 10);
//let plane = new Airplane(pos2, /* vel */80, /* thr */ 50);
//let plane = new Airplane(pos3, /* vel */90, /* thr */ 40);
//let plane = new Airplane(pos4, /* vel */100, /* thr */ 40);

//let view_angle = 0;


function calc(p) {
    const cx = CANVAS_WIDTH / 2;
    //const cy = CANVAS_HEIGHT / 2;
    const cy = CANVAS_HEIGHT / 2 - 100;
    let x = p.x;
    let y = p.y;
    //let z = p.z;
    let z = p.z + p.view_z_offset;
    let hdg = p.hdg + p.yaw;
    //let v_hdg = hdg + p.view_h_angle;
    let v_hdg = p.view_h_angle;
    let ptc = p.ptc;
    let bnk = p.bnk;
        
    
    s_points.splice(0); // clear

    // heading
    let sh = Math.sin(Math.PI * hdg / 180);
    let ch = Math.cos(Math.PI * hdg / 180);
    //let sh = Math.sin(Math.PI * v_hdg / 180);
    //let ch = Math.cos(Math.PI * v_hdg / 180);

    // banking
    let sb = Math.sin(Math.PI * bnk / 180);
    let cb = Math.cos(Math.PI * bnk / 180);

    // pitching
    let sp = Math.sin(Math.PI * ptc / 180);
    let cp = Math.cos(Math.PI * ptc / 180);

    // view direction
    let sd = Math.sin(Math.PI * v_hdg / 180);
    let cd = Math.cos(Math.PI * v_hdg / 180);
    
    for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        //let x1 = pt[0] - x;
        //let y1 = pt[1] - y;
        //let z1 = pt[2] - z;
        let x1 = pt.x - x;
        let y1 = pt.y - y;
        let z1 = pt.z - z;
//        let sh = Math.sin(Math.PI * v_hdg / 180);
//        let ch = Math.cos(Math.PI * v_hdg / 180);
	// heading
	let x2 = x1 * ch - y1 * sh;
        let y2 = y1 * ch + x1 * sh;
        let z2 = z1;
        // banking
        //let sb = Math.sin(Math.PI * bnk / 180);
        //let cb = Math.cos(Math.PI * bnk / 180);
        let x3 = x2 * cb - z2 * sb;
        let y3 = y2;
        let z3 = z2 * cb + x2 * sb;
        // pitching
        //let sp = Math.sin(Math.PI * ptc / 180);
        //let cp = Math.cos(Math.PI * ptc / 180);
        let x4 = x3;
        let y4 = y3 * cp - z3 * sp;
        let z4 = z3 * cp + y3 * sp;

	// view direction
	let x5 = x4 * cd - y4 * sd
	let y5 = y4 * cd + x4 * sd;
	let z5 = z4;
	
        if (y5 > 0) {
            let k = 1000;
            let sx = x5 / y5 * 0.5 * k + cx;
            let sy = -z5 / y5 * 0.5 * k + cy;
            //let style = pt[3];
            //let type = pt[4];
            let style = pt.style;
            let type = pt.type;
            s_points.push([sx, sy, y5, style, type]);
        }
    }
} // function calc(p)


function controle(p) {
    if (keyboard.Shift) {
        if (keyboard.B) { // reduce brake
            if (p.brake > 0) {
                p.brake -= 1;
            } 
        }
        if (keyboard.V) { // auto brake on (spoiler)
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
        if (keyboard.A) { // throttle idle
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
        if (keyboard.Q) { // throttle 0
            if (p.thr < 0) {
                p.thr = 0;
            }
        }
//      if (keyboard.G && p.gear_down == 0) {
//          p.gear_down = 1;
//          p.gear_status = 0;
//      }
    } else { // !keyword.Shift
        if (keyboard.W) {
            p.view_h_angle -= 1;
            if (p.view_h_angle < -180) {
                p.view_h_angle += 360;
            }
        }
        if (keyboard.E) {
            p.view_h_angle = 0;
        }
        if (keyboard.R) {
            p.view_h_angle += 1;
            if (p.view_h_angle > 180) {
                p.view_h_angle -= 360;
            }
        }
        if (keyboard.B) { // apply brake
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
//      if (keyboard.G && p.gear_down == 3) {
//          p.gear_down = 2;
//          p.gear_status = 180;
//      }
    }
    if (keyboard.Left)  if (p.aileron > -25) p.aileron -= 1;
    if (keyboard.Right) if (p.aileron < 25)  p.aileron += 1;
    if (keyboard.Z)     if (p.rudder > -20)  p.rudder  -= 1;
    if (keyboard.X)     if (p.rudder < 20)   p.rudder  += 1;
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
    if (keyboard.M && (drawCount % 20 == 0)) {
	if (soundMute) {
	    soundMute = false;
	} else {
	    soundMute = true;
	}
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
    if (keyboard.J)      p.dz -= 0.1;
    if (keyboard.K)      p.dz += 0.1;
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
            landingMode = false;
            lnadingModePosition = 0;
        }
    }
    if (keyboard.L) { // landing mode
        if (drawCount % 30 == 0) {
            if (landingMode == true) {
                if (landingModePosition == 5) {
                    landingModePosition = 0;
                } else {
                    landingModePosition += 1;
                }
            }
            landingMode = true;
            takeoffMode = false;
            if (landingModePosition == 0) {
                p.x = 0;
                p.y = -6000;
                p.z = 300;
            } else if (landingModePosition == 1) {
                p.x = 0;
                p.y = -3000;
                p.z = 200;
            } else if (landingModePosition == 2) {
                p.x = 0;
                p.y = -1500;
                p.z = 110;
            } else if (landingModePosition == 3) {
                p.x = 0;
                p.y = -1000;
                p.z = 80;
            } else if (landingModePosition == 4) {
                p.x = 0;
                p.y = -500;
                p.z = 50;
            } else if (landingModePosition == 5) {
                p.x = 0;
                p.y = -15000;
                p.z = 1000;
            } else {
                p.x = 0;
                p.y = -6000;
                p.z = 300;
            }
                
            p.dx = 0;
            p.dy = 0;
            p.dz = 0;
            p.velx = 0;
            p.vely = 85;
            p.velz = -2;
            p.velocity = 85;
            p.select = 3;
            p.thr = 50;
            p.auto_brake = true;
            p.gear_down = 0; // gear up
            p.gear_status = 0;
        }
    }
    if (keyboard.T) { // takeoff mode
        if (drawCount % 30 == 0) {
            landingMode = false;
            takeoffMode = true;
            p.x = 0;
            p.y = 100;
            p.z = 0;
            p.dx = 0;
            p.dy = 0;
            p.dz = 0;
            p.velx = 0;
            p.vely = 0;
            p.velz = 0;
            p.velocity = 0;
            p.select = 0;
            p.thr = 0;
            p.auto_brake = false;
            p.gear_down = 1; // gear down
            p.gear_status = 3;
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
//      z = 4;
//      dz = 0;
//    }
} // function move()

function calcILS(plane) {
    let ILS_dir = plane.ILS_dir; // degree
    let ILS_slope = plane.ILS_slope; // degree
    let loc_pos = plane.ILS_loc_pos;
    let gs_pos = plane.ILS_gs_pos;
    let loc_x = loc_pos[0];
    let loc_y = loc_pos[1];
    let loc_z = loc_pos[2];
    let gs_x  = gs_pos[0];
    let gs_y  = gs_pos[1];
    let gs_z  = gs_pos[2];

    let lx = plane.x - loc_x;
    let ly = plane.y - loc_y;
    let lz = plane.z - loc_z;
    let gx = plane.x - gs_x;
    let gy = plane.y - gs_y;
    let gz = plane.z - gs_z;

    let sd = Math.sin(Math.PI * ILS_dir / 180.0);
    let cd = Math.cos(Math.PI * ILS_dir / 180.0);
    let lx1 = lx * cd - ly * sd;
    let ly1 = ly * cd + lx * sd;
    let lz1 = lz;
    let gx1 = gx * cd - gy * sd;
    let gy1 = gy * cd + gx * sd;
    let gz1 = gz;

    let w1 = ly1 * Math.tan(Math.PI * 2.5 / 180.0);
    let loc1 = Math.max(Math.min(lx1 / w1, 1.0), -1.0);
    let loc_active = false;
    //if (ly1 < 18500 && ly1 > 0) {
    if (ly1 < 40000 && ly1 > 0) {
	loc_active = true;
    }
    plane.ILS_loc = loc1;
    plane.ILS_loc_active = loc_active

    let sg = Math.sin(Math.PI * -ILS_slope / 180.0);
    let cg = Math.cos(Math.PI * -ILS_slope / 180.0);
    let gx2 = gx1;
    let gy2 = gy1 * cg - gz1 * sg;
    let gz2 = gz1 * cg + gy1 * sg;

    let h1 = gy2 * Math.tan(Math.PI * 0.5 / 180.0);
    let gs1 = Math.max(Math.min(gz2 / h1, 1.0), -1.0);
    let gs_active = false;
    //if (gy2 < 18500 && gy2 > 0) {
    if (gy2 < 40000 && gy2 > 0) {
	gs_active = true;
    }
    plane.ILS_gs = gs1;
    plane.ILS_gs_active = gs_active;
    
} // function calcILS(plane)

const DA = 227; // FT
const DA100 = DA + 100; // FT

//let called500 = false;
let prevAltitude = 0;
let prevGearState = 0;
let prevFlap = 0;
let prevTailStrike = false;

function updateAll() {
    controle(plane);
    //attitude();
    //model();
    plane.update1(fps);

    //let alt = plane.z / 0.3048;
    //let alt = Math.ceil(plane.z * 3.28084); // feet
    let alt = plane.z * 3.28084; // in feet
    let call = null;
    if (prevAltitude > 2500 && alt < 2500) {
        call = "call2500";
    } else if (prevAltitude > 1000 && alt < 1000) {
        call = "call1000";
    } else if (prevAltitude > 500 && alt < 500) {
        call = "call500";
    } else if (prevAltitude > DA100 && alt < DA100) {
	call = "ap_minimum";
    } else if (prevAltitude > DA && alt < DA) {
	call = "minimum";
    } else if (prevAltitude > 100 && alt < 100) {
        call = "call100";
    } else if (prevAltitude > 50 && alt < 50) {
        call = "call50";
    } else if (prevAltitude > 40 && alt < 40) {
        call = "call40";
    } else if (prevAltitude > 30 && alt < 30) {
        call = "call30";
    } else if (prevAltitude > 20 && alt < 20) {
        call = "call20";
    } else if (prevAltitude > 10 && alt < 10) {
        call = "call10";
    }
    if (call != null) {
        document.getElementById(call).play();
    }
    prevAltitude = alt;

    if (plane.ground && !plane.wasOnGround) {
	//let vertical_speed = plane.velz * 60 * 3.28084; // in feet
	let vertical_speed = plane.touchDownVerticalSpeed; // in feet/min
	let ground_speed = plane.velocity * 3600 / 1852; // in knot
	console.log(ground_speed);
	console.log(vertical_speed);
	tire.play(/* vertical speed (feet/min) */ vertical_speed,
	          /* ground speed (knot) */ ground_speed);
//	landing_sound.playLanding(-500, 135);
//	landing_sound.playSpoiler();
    }
//    if (plane.brake == plane.brake_max && plane.prev_brake == 0) {
//	landing_sound.playSpoiler();
//    }

    if (prevGearState == 0 && plane.gear_down == 1) {
	gear_sound.gearDown();
	wind_sound.setGearDown(true);
    }
    if (prevGearState == 3 && plane.gear_down == 2) {
	gear_sound.gearUp();
	wind_sound.setGearDown(false);
    }
    prevGearState = plane.gear_down;

    let airspeed = plane.velocity * 3600 / 1852; // in knot
    wind_sound.setAirspeed(airspeed);
    wind_sound.setFlaps(plane.flap);
    wind_sound.update();

    if (prevFlap != plane.flap) {
	flap_sound.moveFlaps(/* from */prevFlap, /* to */plane.flap);
	prevFlap = plane.flap;
    }
    flap_sound.update(airspeed, plane.flap);

    if (prevTailStrike == false && plane.tailStrike == true) {
	console.log("tail strike");
	tail_strike_sound.play(Math.min(1.0, plane.tailStrikePitch / 8.0));
    }
    prevTailStrike = plane.tailStrike;

    // ILS (LOC, G/S)
    if (plane.enableILS) {
	calcILS(plane);
    }

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
//      plane.model();
//      n++;
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
            //let c = drawCount % 20;
	    let c0 = Math.ceil(drawCount * 60 / fps);
            let c = c0 % 20;
            let sz2 = sz < 2 ? 2 : sz;
            if (c == (type - 140)) {
                ctx.fillStyle = style;
                ctx.beginPath();
                ctx.rect(xx, yy, sz2, sz2);
                ctx.fill();
                ctx.closePath();
            }
        } else if (type >= 10) { // PAPI
            let angle = Math.atan(z / (450 - y)) / Math.PI * 180;
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

    
    drawPoints(plane);

    drawInstruments(plane); // draw.js
    // draw score
    //drawScore();
    // draw lives
    //drawLives();

    plane.draw();

} // function drawAll()

function printInfo() {
    let roh = calcAirDensity(plane.z);
    ctx.font = "16px Impact";
    ctx.fillStyle = "#eeeeee";
    ctx.fillText("roh: " + roh, 10, 20);
    ctx.fillText("FPS: " + fps, 550, 460);
    ctx.fillText("points: " + s_points.length + "/" + points.length, 500, 475);
    
    if (pauseMode) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#DD0000";
        ctx.fillText(`PAUSE MODE`, canvas.width / 2 - 65, 20);
        if (landingMode) {
            ctx.fillText(`LANDING MODE`, canvas.width / 2 - 75, 40);
        }
    }

    if (debugMode) printDebugInfo();
} // function printInfo()

function printDebugInfo() {
    ctx.font = "20px Impact";
    ctx.fillStyle = "#eeeeee";
    ctx.fillText("FPS: " + fps, 10, 40);
    plane.printDebugInfo();
} // function printDebugInfo()

//let lastTime = performance.now();

function gameLoop() {
    gameCount++;
    updateAll();
    drawAll();
    printInfo();
    if (engine) {
        engine.setThrottle(plane.thr / 100.0);
	if (soundMute != prevSoundMute) {
	    engine.mute(soundMute);
	}
	prevSoundMute = soundMute;    
        engine.update();
        console.log(engine.ctx.state);
    }
    if (pauseMode) {
        requestAnimationFrame(gameLoopPauseMode);
    } else {
        requestAnimationFrame(gameLoop);
    }
} // function gameLoop()

let prevSoundMute;

function gameLoopPauseMode() {
    gameCount++;
    updateAllPauseMode();
    drawAll();
    printInfo();
    if (engine) {
        engine.setThrottle(plane.thr / 100.0);
	if (soundMute != prevSoundMute) {
	    engine.mute(soundMute);
	}
	prevSoundMute = soundMute;    
        engine.update();
    }
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
    if (e.keyCode == 69)  keyboard.E      = true; // E
    if (e.keyCode == 70)  keyboard.F      = true; // F
    if (e.keyCode == 71)  keyboard.G      = true; // G
    if (e.keyCode == 74)  keyboard.J      = true; // J
    if (e.keyCode == 75)  keyboard.K      = true; // K
    if (e.keyCode == 76)  keyboard.L      = true; // L
    if (e.keyCode == 77)  keyboard.M      = true; // M
    if (e.keyCode == 80)  keyboard.P      = true; // P
    if (e.keyCode == 81)  keyboard.Q      = true; // Q
    if (e.keyCode == 82)  keyboard.R      = true; // R
    if (e.keyCode == 83)  keyboard.S      = true; // S
    if (e.keyCode == 84)  keyboard.T      = true; // T
    if (e.keyCode == 86)  keyboard.V      = true; // V
    if (e.keyCode == 87)  keyboard.W      = true; // W
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
    if (e.keyCode == 69)  keyboard.E      = false; // E
    if (e.keyCode == 70)  keyboard.F      = false; // F
    if (e.keyCode == 71)  keyboard.G      = false; // G
    if (e.keyCode == 74)  keyboard.J      = false; // J
    if (e.keyCode == 75)  keyboard.K      = false; // K
    if (e.keyCode == 76)  keyboard.L      = false; // L
    if (e.keyCode == 77)  keyboard.M      = false; // M
    if (e.keyCode == 80)  keyboard.P      = false; // P
    if (e.keyCode == 81)  keyboard.Q      = false; // Q
    if (e.keyCode == 82)  keyboard.R      = false; // R
    if (e.keyCode == 83)  keyboard.S      = false; // S
    if (e.keyCode == 84)  keyboard.T      = false; // T
    if (e.keyCode == 86)  keyboard.V      = false; // V
    if (e.keyCode == 87)  keyboard.W      = false; // W
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
//    engine.setThrottle(p.thr / 10);
    //gameLoop();
    if (pauseMode) {
        gameLoopPauseMode();
    } else {
        gameLoop();
    }
}

// End of file (main.js) 
