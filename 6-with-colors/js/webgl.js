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

function LoadDataToGPU(data, colors) {
	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW);

	// Associate out shader variables with our data buffer
	var positionLoc = gl.getAttribLocation(program, "aPosition");
	gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionLoc);

	var cBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

	var colorLoc = gl.getAttribLocation(program, "aColor");
	gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(colorLoc);
};

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.POINTS, 0, positions.length);
}
