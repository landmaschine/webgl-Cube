
export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement | OffscreenCanvas) {
if (canvas instanceof HTMLCanvasElement) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needResize;
}
return false;
}