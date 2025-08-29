"use strict";

var positions = [];
var numPositions = 5000;

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
	var u = add(vertices[0], vertices[1]);
	var v = add(vertices[0], vertices[2]);
	var p = mult(0.25, add(u, v));

	// And, add our initial positions into our array of points

	positions.push(p);

	// step 4
	// generate the sierpinski gasket
	for (var i = 0; positions.length < numPositions; ++i) {
		var triangle_index = Math.floor(3 * Math.random());

		p = add(positions[i], vertices[triangle_index]);
		p = mult(0.5, p);
		positions.push(p);
	}

	LoadDataToGPU(positions);
	render();
}
