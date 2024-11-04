export function clicktoChangeColor(canvas: HTMLCanvasElement, gl: WebGLRenderingContext) {
    let colorToggle = 0;

    canvas.addEventListener('click', () => {
        colorToggle++;
        if(colorToggle % 2) {
            changeColor(gl, 0.0, 0.0, 0.0);
        } else {
            changeColor(gl, 0.2, 0.2, 0.2);
            colorToggle = 0;
        }

        console.log(colorToggle);
    });
}

function changeColor(gl: WebGLRenderingContext, r: number, g: number, b: number) {
    gl.clearColor(r, g, b, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

