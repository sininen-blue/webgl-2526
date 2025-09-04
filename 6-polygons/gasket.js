"use strict";

var positions = [];
var numPositions = 10;

window.onload = function() {
	initGL();

	// step 3.1
	// set up the triangle
	var vertices = [
		vec2(-1, -1),
		vec2(0, 1),
		vec2(1, -1)
	];

	// step 3.2
	// Pick an initial point inside the triangle

	// step 4
	// generate the sierpinski gasket
	divideTriangle(vertices[0], vertices[1], vertices[2], numPositions);

	LoadDataToGPU(positions);
	// NOTE: what is this function doing?
	// the code for this is located at the js/webgl.js file, in the loadDataTOGPU() function
	// describe the code in a high level, step by step

	render();
	// NOTE: What type of rendering are we doing here? Justify your answer (immediate or retained mode or modern)
}

function divideTriangle(a, b, c, count) {
	if (count == 0) {
		triangle(a, b, c)
	} else {
		var ab = mix(a, b, 0.5);
		var ac = mix(a, c, 0.5);
		var bc = mix(b, c, 0.5);

		count--;

		divideTriangle(a, ab, ac, count);
		divideTriangle(c, ac, bc, count);
		divideTriangle(b, bc, ab, count);
	}
}

function triangle(a, b, c) {
	positions.push(a)
	positions.push(b)
	positions.push(c)
}
