import * as utils from './utils'

let pos = [
    0, 0,
    0, 0.5,
    0.7, 0,
];

export async function initWebGL(width: number, height: number) {
    const canvas = document.getElementById('glCanvas') as HTMLCanvasElement;
    if(canvas === null) throw new Error("Could not find canvas element");
    const gl = canvas.getContext('webgl');
    if(gl === null) throw new Error("Could not get Webgl context");

    const vertexShaderSource = await loadShader('./shaders/vShader.glsl');
    const fragmentShaderSource = await loadShader('./shaders/fShader.glsl');

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if(!vertexShader || !fragmentShader) {
        throw new Error("Failed to compile shaders");
    }

    const program = createProgram(gl, vertexShader!, fragmentShader!);
    if(!program) {
        throw new Error("Failed to create Program");
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
}

async function loadShader(url: string): Promise<string> {
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error(`Failed to load shader: ${response.statusText}`);
    }
    return response.text();
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if(shader === null) {
        throw new Error("Failed to create Shader.\n"); 
    } else {
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
    }

    const succes = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(!succes) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        throw new Error("shader compilation failed");
    }

    return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null{
    const program = gl.createProgram();
    if(program === null) {
        throw new Error("Faile to create Shader Program!\n");
    } 

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const succes = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(!succes) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

export function drawScene(gl: WebGLRenderingContext) {
    utils.resizeCanvasToDisplaySize(gl.canvas);
}