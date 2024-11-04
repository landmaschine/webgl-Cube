import * as test from './playground'
import * as webGL from './webgl'

async function main() {
    const canvas = document.getElementById('glCanvas') as HTMLCanvasElement;
    if(canvas === null) throw new Error("Could not find canvas element");
    const gl = canvas.getContext('webgl');
    if(gl === null) throw new Error("Could not get Webgl context");

    await webGL.initWebGL(canvas.width, canvas.height);
    test.clicktoChangeColor(canvas, gl);
}

main();