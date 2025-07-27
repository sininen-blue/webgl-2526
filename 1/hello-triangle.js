function helloTriangle() {
	// setup
	const canvas = document.getElementById("demo-canvas");
	const gl = canvas.getContext('webgl2');
	if (!gl) {
		console.error("web gl is not supported")
	}

	gl.clearColor(0.5, 0.8, 0.5, 1); // set actual background color

	// webgl has multiple buffers
	// the image, the thing you're drawing into
	// the depth buffer, which stores depth information
	// the stencil buffer, for some special effects
	// we need to clear the image and depth
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT);


	// triangle verts in clipspace
	const triangleVerts = [
		0.0, 0.5,
		-0.5, -0.5,
		0.5, -0.5
	];
	// convert into a float32 array since js default is 64bit
	const triangleVertsCpuBuffer = new Float32Array(triangleVerts); // cpu visible buffer that needs to be sent to the gpu

	const triangleGpuBuffer = gl.createBuffer(); // 1s and 0s of triangle verts
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleGpuBuffer); // first attach the buffer to a webgl attachmentpoint
	gl.bufferData(gl.ARRAY_BUFFER, triangleVertsCpuBuffer, gl.STATIC_DRAW); // static draw hints at webgl on how webgl handles data
	// array buffer specifies that we're using it for vertex data
	// static draw specifies that we don't intend to update the data very often

	// GLSL for fragment shader and vertex shader
	// first line is the version of the opengl shading language
	// next line is how precise the gpu handles the floating point, medium point is default and is fairly fast
	// it takes variables in attributes
	// in means input, vec2 means 2 floats, vertexPosition is the name
	// gl_Position is the output, the location of the vector
	// it's a vec4, x, y, z buffer, w the xyz gets divided by w
	//
	// the job of a vertex shader is to figure out where the vertex (math points) should show up on screen in clipspace
	const vertexShaderSource = `#version 300 es
	precision mediump float;

	in vec2 vertexPosition;

	void main() {
		gl_Position = vec4(vertexPosition, 0.0, 1.0);
	}`;

	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderSource);
	gl.compileShader(vertexShader);

	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		const compileError = gl.getShaderInfoLog(vertexShader);
		console.error("vertex compile error", compileError);
		return;
	};


	// fragment shader is the shader for the color of each pixel
	const fragmentShaderSource = `#version 300 es
	precision mediump float;

	out vec4 outputColor;

	void main() {
	outputColor = vec4(0.02, 0.0, 0.8, 1.0);
	}`;
	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderSource);
	gl.compileShader(fragmentShader);

	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		const compileError = gl.getShaderInfoLog(fragmentShader);
		console.error("fragment compile error", compileError);
		return;
	};

	// create program and attach shaders
	const triangleShaderProgram = gl.createProgram();
	gl.attachShader(triangleShaderProgram, vertexShader);
	gl.attachShader(triangleShaderProgram, fragmentShader);
	gl.linkProgram(triangleShaderProgram); // link to see if compatible

	if (!gl.getProgramParameter(triangleShaderProgram, gl.LINK_STATUS)) {
		const linkError = gl.getProgramInfoLog(triangleShaderProgram);
		console.error("link error", linkError);
		return;
	}

	// next we need to get the location of the vertexPosition variable that's already in the gpu memory
	// that's called an attribute locaiton, which is an index
	// in our case it's 0, why
	const vertexPositionAttributeLocation = gl.getAttribLocation(triangleShaderProgram, 'vertexPosition');
	if (vertexPositionAttributeLocation < 0) {
		console.error("couldn't find location");
		return;
	}


	// this would all be in a loading srceen
	// once everything is on the gpu
	// we can reuse them way easier and much more efficiently

	// now let's make the gpu pipeline so we can draw the triangle
	// input assembler - how to read vertices from our GPU to triangle buffer
	// vertex shader - how to place those vertices in clip space
	// primitive assembly - how to make triangles from those vertices
	// rasterizer - which pixels are part of the triangle
	// fragment shader - what color shoudl a pixel be
	// output merger - how to merge the shaded pixel with the existing output image


	// primitive assembly - how to make triangles from those vertices
	// requires the laest input, we just need to specify how the verts are grouped as part of the draw call
	// order for the first 5 doesn't exactly matter, performance is the main consideration
	// changing states take time, so batch the calls in a way that minimizes those changes
	// generally first is output merger, then rasterizer, then is vertex and fragment shader, then input assembler


	// output merger
	canvas.width = canvas.clientWidth; // can be any number
	canvas.height = canvas.clientWidth;
	gl.clearColor(0.08, 0.08, 0.08, 1.0); // changing sizes programmatically generates a new image, reset the clear color
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


	// rasterizer
	// position, then width and height
	gl.viewport(0, 0, canvas.width, canvas.height);

	// set gpu program (vertex and fragment);
	gl.useProgram(triangleShaderProgram);
	gl.enableVertexAttribArray(vertexPositionAttributeLocation);

	// input assembler
	// for each vertex shader input, which buffer to read from, and how
	// the gpu doesn't know what type you have, it only has 1s and 0s
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleGpuBuffer); // rebind to make sure you don't forget
	gl.vertexAttribPointer(
		vertexPositionAttributeLocation, // index
		2, // size, how many components per attribute
		gl.FLOAT, // type, specifically what is the type in the gpu were reading from
		false, // how to convert ints to floats in gpu, usually false unless you have a very specific need
		2 * Float32Array.BYTES_PER_ELEMENT, // stride, how many bytes to get to the next vertex, 0 just means auto
		0, // offset, how many bytes forward should the input assmebler read before it starts reading attribute data
	);

	// how to organize, first index, how many vertices
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

helloTriangle();
