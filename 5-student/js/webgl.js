"use strict";

var gl, program;

function initGL() {
	var canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl2');
	if (!gl) alert("WebGL 2.0 isn't available");

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
}

function LoadDataToGPU(data) {
	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW);

	// Associate out shader variables with our data buffer
	var positionLoc = gl.getAttribLocation(program, "aPosition");
	gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionLoc);
};

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.POINTS, 0, positions.length);
}
