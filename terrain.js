//
// (terrain.js)
//

function makeTerrainPoints(points) {
    //
    let color = "#00AAAA";
    
    for (let x = -3000; x <= 3000; x += 1000) {
	for (let y = -6000; y <= 6000; y += 1000) {
	    if (x == 0 && (0 <= y && y <= 3000)) {
	    } else {
		points.push(new Light(x, y, 0, color, 1));
	    }
	}
    }

    for (let x = -6000; x <= 6000; x += 1000) {
	let y = 10000;
	points.push(new Light(x, y, 0, color, 1));
    }
    for (let x = -9000; x <= 9000; x += 2000) {
	let y = 15000;
	points.push(new Light(x, y, 0, color, 1));
    }
    for (let x = -9000; x <= 9000; x += 2000) {
	let y = 20000;
	points.push(new Light(x, y, 0, color, 1));
    }
    
} // function makeTerrainPoints(points)

// End of file (terrain.js)
