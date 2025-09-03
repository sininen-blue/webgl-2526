"use strict";

var positions;
var colors;
var vertices;
var numPositions = 5000;

window.onload = function() {
	initGL();
	updateVertices();   // generate initial vertices + gasket
	render();

	// 🔄 Run every second
	setInterval(function() {
		// change the vertices slightly
		for (let i = 0; i < vertices.length; i++) {
			vertices[i][0] += (Math.random() - 0.5) * 0.05; // jitter x
			vertices[i][1] += (Math.random() - 0.5) * 0.05; // jitter y
			vertices[i][2] += (Math.random() - 0.5) * 0.05; // jitter z
		}
		updateGasket();
		render();
	}, 10); // 1000 ms = 1 second
}


function updateVertices() {
	vertices = [
		vec3(-0.5, -0.5, -0.5), // left down back
		vec3(0.5, -0.5, -0.5), // right down back
		vec3(0.0, 0.5, 0.0), // center up center
		vec3(0.0, -0.8, 0.5), // center down front
	];
	updateGasket();
}

function updateGasket() {
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
}
