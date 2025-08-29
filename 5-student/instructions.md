# Sierpinski Gasket v2
With written instructions this time

---
layout: center
---

0. Prep
- download the starter files from 
ishortn.ink/gasket
<img src="/images/gitQr" alt="QR code to the GitHub repo" width="150"/>
- ignore the `NOTES:` comments in the code for now

---
layout: center
---

1. Add a canvas element to the *top* of your body in your `gasket.html` HTML file with the specified id and dimensions.

```html
<canvas id="gl-canvas" width="512" height="512"></canvas>
```

Notes:
- The id must be exactly `gl-canvas` for the JavaScript code to work.
- The width and height can be changed, but the JavaScript code assumes a square canvas.
- try using a non square canvas and see what happens

---
layout: center
---

2. Copy the contents of the shader files (.glsl files) in the `shader/` folder to the designated spots in your html file.

---
layout: center
---

3. Write the JavaScript code in the `gasket.js` file to do the following:

1. set up the vertices of the triangle, 3 points in clip space
- use `vec2(x, y)`
- note that clip space starts at (-1, -1) in the bottom left and goes to (1, 1) in the top right
2. add a point to `positions[]` of where you want the first point to be in
- `positions.push(chosen point here)`

---
layout: center
---

4. Calculate the points for the Sierpinski Gasket, where 

- start a loop that starts at `0` and goes to `positions.length < numPoints`
    - the syntax for a for loop in js is `for (var i = 0; i < numPoints; i++) { ... }`
- you pick a random vertex from the triangle `0, 1, or 2`
    - `var triangle_index = get a random value from 0-2;`
    - you can get a random number in js by `Math.floor(Math.random() * 3);`
- find the midpoint between the last point in `positions[]` (your *latest* point), and the chosen vertex (the *triangle_index*)
    - do this by adding the two vertices `newPoint = add(positions[i], vertices[triangle_index])`
    - then divide it by 2, or scale it by 0.5 `newPoint = scale(0.5, p);`
    - add the new point to positions[] `positions.push(newPoint);`

---
layout: center
---

5. Run the WebGL code to render the points (open the html file in your browser)

---
layout: center
---

6. Experiment with different 
- starting points,
- number of points,
- canvas sizes,
- point sizes (in the vertex shader, `gl_PointSize = ...`),
- colors (in the fragment shader, `gl_FragColor = ...`),
- background color

---
layout: center
---

7. Complete the `NOTES:` comments in your code to explain what each part does
