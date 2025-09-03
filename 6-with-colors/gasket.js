"use strict";

var positions;
var colors;
var numPositions = 5000;

window.onload = function() {
	initGL();

	// step 3.1
	// set up the triangle
	var vertices = [
		vec3(-0.5, -0.5, -0.5),
		vec3(0.5, -0.5, -0.5),
		vec3(0.0, 0.5, 0.0),
		vec3(0.0, -0.5, 0.5),
	];

	// step 3.2
	// Pick an initial point inside the triangle
	positions = [vec3(0.0, 0.0, 0.0)]; // initial point inside the tetrahedron
	colors = [vec4(0.5, 0.5, 0.5, 1.0)]; // initial color

	// step 4
	// generate the sierpinski gasket
	for (var i = 0; positions.length < numPositions; i++) {
		var j = Math.floor(Math.random() * 4);

		var newPosition = mix(positions[i], vertices[j], 0.5);
		positions.push(newPosition);
		colors.push(vec4(
			1.0 + newPosition[0] / 2.0,
			1.0 + newPosition[1] / 2.0,
			1.0 + newPosition[2] / 2.0,
			1.0
		))
	}

	LoadDataToGPU(positions, colors);
	// NOTE: what is this function doing?
	// the code for this is located at the js/webgl.js file, in the loadDataTOGPU() function
	// describe the code in a high level, step by step

	render();
	// NOTE: What type of rendering are we doing here? Justify your answer (immediate or retained mode or modern)
}
