//
// (runway.js)
//

//
// 3,000 m x 60 m
// 
function makePoints() {
    let points = [];

    // runway threshold end 
    for (let x = -30; x <= 30; x+=10) {
	let pt = [ x, 3000, 0, "#AA0000", 1 ]; // red
	points.push(pt);
    }

    // runway threshold end
    for (let x = -30; x <= 30; x+=10) {
	let pt = [ x, 0, 0, "#00AA00", 1 ]; // green
	points.push(pt);
    }

    for (let y = 15; y < 2400; y+=15) {
	let pt1 = [ -30, y, 0, "#AAAA88", 1 ]; // white
	let pt2 = [   0, y, 0, "#AAAA88", 1 ]; // white
	let pt3 = [  30, y, 0, "#AAAA88", 1 ]; // white
	points.push(pt2); // center
	if (y % 60 == 0) {
	    points.push(pt1); // edge (left)
	    points.push(pt3); // edge (right)
	}
    }

    for (let y = 2400; y < 3000; y+=15) {
	let pt1 = [ -30, y, 0, "#AAAA22", 1 ]; // yello
	let pt2 = [   0, y, 0, "#AA0000", 1 ]; // red
	let pt3 = [  30, y, 0, "#AAAA22", 1 ]; // yello
	points.push(pt2); // center
	if (y % 60 == 0) {
	    points.push(pt1); // edge (left)
	    points.push(pt3); // edge (right)
	}
    }

    // approaching light
    for (let y = -30; y >= -450; y-= 30) {
	for (let x = -2.25; x <= 2.25; x += 1.5) {
	    let pt = [ x, y, 1, "#DDDDDD", 1 ]; // white
	    points.push(pt);
	}
    }

    for (let x = 0; x <= 4.5; x += 1.5) {
	let pt1 = [ x - 12.75, -300, 1, "#DDDDDD", 1 ]; // white
	let pt2 = [ x +  8.25, -300, 1, "#DDDDDD", 1 ]; // white
	points.push(pt1);
	points.push(pt2);
    }

    // approacing light
    let n = 0;
    for (let y = -450; y >= -750; y -= 15) {
	let pt = [0, y, 2, "#EEEEEE", 160 - n];
	points.push(pt);
	n = (n + 1) % 20;
    }

    // PAPI
    points.push([-75, 450, 1, "#FFFFFF", 10]); // PAPI 0
    points.push([-65, 450, 1, "#FFFFFF", 11]); // PAPI 1
    points.push([-55, 450, 1, "#FFFFFF", 12]); // PAPI 2
    points.push([-45, 450, 1, "#FFFFFF", 13]); // PAPI 3

    points.push([-390, 1300, 20, "#FFFFFF", 2]); // todai
    points.push([-390, 1300, 15, "#888888", 1]);
    points.push([-390, 1300, 10, "#888888", 1]);
    points.push([-390, 1300,  5, "#888888", 1]);

    // taxi
    for (let x = -150; x <= -45; x += 15) {
	points.push([x,  0, 0, "#0000DD", 1]); // blue
	points.push([x, 30, 0, "#0000DD", 1]); // blue
	//
	points.push([x, 495, 0, "#0000DD", 1]); // blue
	points.push([x, 525, 0, "#0000DD", 1]); // blue
	//
	points.push([x,  990, 0, "#0000DD", 1]); // blue
	points.push([x, 1010, 0, "#0000DD", 1]); // blue
	//
	points.push([x, 1485, 0, "#0000DD", 1]); // blue
	points.push([x, 1515, 0, "#0000DD", 1]); // blue
	//
	points.push([x, 1980, 0, "#0000DD", 1]); // blue
	points.push([x, 2010, 0, "#0000DD", 1]); // blue
	//
	points.push([x, 2475, 0, "#0000DD", 1]); // blue
	points.push([x, 2505, 0, "#0000DD", 1]); // blue
	//
	points.push([x, 2970, 0, "#0000DD", 1]); // blue
	points.push([x, 3000, 0, "#0000DD", 1]); // blue
    }
    for (let y = 15; y <= 450; y += 15) {
	points.push([-165, 30 + y, 0, "#0000DD", 1]); // blue
	points.push([-165, 525 + y, 0, "#0000DD", 1]); // blue
	points.push([-165, 1010 + y, 0, "#0000DD", 1]); // blue
	points.push([-165, 1515 + y, 0, "#0000DD", 1]); // blue
	points.push([-165, 2010 + y, 0, "#0000DD", 1]); // blue
	points.push([-165, 2505 + y, 0, "#0000DD", 1]); // blue
    }
    for (let y = 15; y < 1200; y += 15) {
	points.push([-195, y, 0, "#0000DD", 1]); // blue
	points.push([-195, 3000 - y, 0, "#0000DD", 1]); // blue
    }
    for (let x = -360; x < -195; x += 15) {
	points.push([x, 1200, 0, "#0000DD", 1]);
	points.push([x, 1800, 0, "#0000DD", 1]);
    }
    for (let y = 1215; y < 1800; y += 15) {
	points.push([-360, y, 0, "#0000DD", 1]);
    }

    return points;
} // function makePoints()

// End of file (runway.js)
