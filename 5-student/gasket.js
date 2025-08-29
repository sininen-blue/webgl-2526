"use strict";

var positions = [];
var numPositions = 5000;

window.onload = function() {
	initGL();

	// step 3.1
	// set up the triangle
	var vertices = [
	];

	// step 3.2
	// Pick an initial point inside the triangle

	// step 4
	// generate the sierpinski gasket

	LoadDataToGPU(positions);
	// NOTE: in a high level, what are we doing here step by step?
	// the code for this is located at the js/MV.js file, the loadDataTOGPU function

	render();
	// NOTE: What type of rendering are we doing here? Justify your answer (immediate or retained mode or modern)
}
