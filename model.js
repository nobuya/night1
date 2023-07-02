//
//  (model.js)
//

/*

    aoa  
  -------+------------
    -1   | 0.0
    -0.5 | 0.025
     0   | 0.05   (cl0)
     9   | 0.725 
    18   | 1.45   (cl_max - cl0)
    19   | 1.5    (cl_max)
    20   | 1.5    (cl_max)
    21   | 1.1       
    22   | 0.7       
    23   | 0.3
    24   | 0.0

*/
function calcCL__(aoa) {
    const cl_max = 1.5;
    const cl0    = 0.05;
    let cl = 0;
    
    if (aoa > 20) {
	let a = aoa - 20;
	let cl1 = cl_max - a * 0.4;
	cl = cl1 > 0 ? cl1 : 0.0;
    } else if (aoa > 18) {
	cl = cl_max;
    } else if (aoa > 0) {
	cl = aoa * (cl_max - cl0) / 18;
    } else if (aoa > -1) {
	cl = cl0 * (aoa + 1)
    } else {
	cl = 0.0;
    }
    return Math.floor(cl * 10000) / 10000;
}

function calcCL(aoa) {
    // 揚力傾斜 (2 x PI)
    const dc = 2 * Math.PI * Math.PI / 180; // 0.10955
    const b = 0.9;
    const dc2 = dc * b;
    const stall_a0 = -8;
    const a15      =  15;
    const stall_a1 =  18;
    const stall_a2 =  20;
    const cl_a0    =  -0.6;
    const cl_a1    = 1.50;
    const cl_max   = 2.00;
    const cl0      = 0.05;
    const cl8  = dc2 * (15 - stall_a0) + cl_a0;
    const cl15 = dc2 * 0.8 * (15 - 10) + cl8;
    let cl = 0;
    
    if (aoa > stall_a2) { // 20
	let a = aoa - stall_a2;
	let cl1 = cl_max - a * 0.30;
	cl = cl1;
    } else if (aoa > stall_a1) { // 18
	let a = aoa - stall_a1;
	cl = cl_max;
    } else if (aoa > a15) { // 15
	let a = aoa - a15;
	let bb = (cl_max - cl15) / (stall_a1 - a15);
	let cl1 = bb * a + cl15;
	cl = cl1;
    } else if (aoa > 10) {
	let a = aoa - 10;
	let cl8 = dc2 * (aoa - stall_a0) + cl_a0;
	let cl1 = dc2 * 0.8 * a + cl8;
	cl = cl1 > cl_max ? cl_max : cl1;
    } else if (aoa > stall_a0) {
	let a = aoa - stall_a0;
	cl = dc2 * a + cl_a0;
    } else {
	cl = cl_a0;
    }
    return Math.floor(cl * 10000) / 10000;
} // function calcCL(aoa) 

function calcCL1(aoa) {
    // 揚力傾斜 (2 x PI)
    const dc = 2 * Math.PI * Math.PI / 180; // 0.10955
    const stall_a0 = -12;
    const stall_a1 =  20;
    const cl_a0    =  -0.9;
    const cl_max   = 2.00;
    const cl0      = 0.05;
    let cl = 0;
    
    if (aoa > stall_a1) { // 20
	let a = aoa - stall_a1;
	let cl1 = cl_max - a * 0.20;
	cl = cl1 > 0 ? cl1 : 0.0;
    } else if (aoa > 10) {
	let a = aoa - 10;
	let cl8 = dc * (aoa - stall_a0) + cl_a0;
	let cl1 = dc * 0.8 * a + cl8;
	cl = cl1 > cl_max ? cl_max : cl1;
    } else if (aoa > stall_a0) {
	let a = aoa - stall_a0;
	cl = dc * a + cl_a0;
    } else {
	cl = cl_a0;
    }
    return Math.floor(cl * 10000) / 10000;
} // function calcCL1(aoa) 

function calcCD___(aoa) {
    const cd_15 = 0.10;
    const cd_6  = 0.04;
    const cd_2  = 0.02;
    let cd = 0;
    
    if (aoa > 15) {
	let a = aoa - 15;
	let cd1 = cd_15 - 0.04 * a;
	cd = cd1;
    } else if (aoa > 6) {
	let a = aoa - 6;
	let cd1 = (cd_15 - cd_6) / (15 - 6) * a + cd_6;
	cd = cd1;
    } else if (aoa > 2) {
	let a = aoa - 2;
	let cd1 = (cd_6 - cd_2) / (6 - 2) * a + cd_2;
	cd = cd1;
    } else {
	cd = cd_2;
    }
    return cd;
}

function calcCD(aoa) {
    const stall_a0  = -12;
    const stall_a1  =  20;
    const cd_min    = 0.01;
    const cd_stall0 = 0.04;
    const min_a1    = -0.5;
    const min_a0    = -2.0;
    const cd_20     = 0.15;
    const cd_10     = 0.05;
    const cd_2      = 0.02;
    const cd_m20    = 0.30;
    let cd = 0;
    
    if (aoa > stall_a1) { // 20
	let a = aoa - stall_a1;
	let cd1 = cd_20 + 0.05 * a;
	cd = cd1;
    } else if (aoa > 10) {
	let a = aoa - 10;
	let cd1 = (cd_20 - cd_10) / (20 - 10) * a + cd_10;
	cd = cd1;
    } else if (aoa > min_a1) {
	let a = aoa - min_a1;
	let cd1 = (cd_10 - cd_min) / (10 - min_a1) * a + cd_min;
	cd = cd1;
    } else if (aoa > min_a0) {
	cd = cd_min;
    } else if (aoa > stall_a0) {
	let a = aoa - stall_a0;
	let cd1 = (cd_min - cd_stall0) / (min_a0 - stall_a0) * a + cd_stall0;
	cd = cd1
    } else {
	let a = aoa - (-20);
	let cd1 = (cd_stall0 - cd_m20) / (stall_a0 - (-20)) * a + cd_m20;
	cd = cd1;
    }
    return Math.floor(cd * 10000) / 10000;
} // function calcCD(aoa)

function drawCL(p) {
    let aoa = p.vangle;
    drawLine([300 - 75, 100], [300 + 125, 100], "#0000DD");
    drawLine([300, 150], [300, 30], "#0000DD");
    let i = 0;
    for (let a = -15; a <= 25; a += 0.1) {
	let cl = calcCL(a);
	let x = 300 + a * 5;
	let y = 100 - cl * 20;
	ctx.fillStyle = "#888888";
	ctx.beginPath();
	ctx.rect(x, y, 2, 2);
	ctx.fill();
	ctx.closePath();
	if (i % 10 == 0) {
	    drawLine([x, 100], [x, 103], "#0000DD");
	}
	if (i % 50 == 0) {
	    drawLine([x, 100], [x, 106], "#0000DD");
	}
	i++;
    }
    let cl = p.cl;
    let x = 300 + aoa * 5;
    let y = 100 - cl * 20;
    drawLine([x - 10, y], [x + 10, y], "#AAAA00");
    drawLine([x, y - 10], [x, y + 10], "#AAAA00");
} // function drawCL(p)

function drawCD(p) {
    let aoa = p.vangle;
//    drawLine([300 - 75, 100], [300 + 125, 100], "#0000DD");
//    drawLine([300, 150], [300, 30], "#0000DD");
    ctx.fillStyle = "#888888";
    for (let a = -15; a <= 25; a += 0.1) {
	let cd = calcCD(a);
	let x = 300 + a * 5;
	let y = 100 - cd * 200;
	ctx.beginPath();
	ctx.rect(x, y, 2, 2);
	ctx.fill();
	ctx.closePath();
    }
    let cd = p.cd;
    let x = 300 + aoa * 5;
    let y = 100 - cd * 200;
    drawLine([x - 10, y], [x + 10, y], "#AAAA00");
    drawLine([x, y - 10], [x, y + 10], "#AAAA00"); // yellow
} // function drawCD(p) 

function calcCm(aoa) { // aoa - angle of attack
    let a0 = 0.3;
    let cm = 0.01;

    if (aoa > a0) {
	cm = -0.001 * (aoa - a0);
    } else {
	cm = -0.001 * (aoa - a0);
    }
    return Math.floor(cm * 10000) / 10000;
}

// End of file (model.js)
