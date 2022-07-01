var svgCanvas = document.getElementById("canvas");
var viewPort = document.getElementById("layer");

var drag = false;
var offset = { x: 0, y: 0 };
var factor = .1;
var matrix = new DOMMatrix();

svgCanvas.addEventListener('pointerdown', function (event) {
    drag = true;
    offset = { x: event.offsetX, y: event.offsetY };
});

svgCanvas.addEventListener('pointermove', function (event) {
    if (drag) {
        var tx = event.offsetX - offset.x;
        var ty = event.offsetY - offset.y;
        offset = {
            x: event.offsetX,
            y: event.offsetY
        };
        matrix.preMultiplySelf(new DOMMatrix()
            .translateSelf(tx, ty));
        viewPort.style.transform = matrix.toString();
    }
});

svgCanvas.addEventListener('pointerup', function (event) {
    drag = false;
});

svgCanvas.addEventListener('wheel', function (event) {
    var zoom = event.deltaY > 0 ? -1 : 1;
    var scale = 1 + factor * zoom;
    offset = {
        x: event.offsetX,
        y: event.offsetY
    };
    matrix.preMultiplySelf(new DOMMatrix()
        .translateSelf(offset.x, offset.y)
        .scaleSelf(scale, scale)
        .translateSelf(-offset.x, -offset.y));
    viewPort.style.transform = matrix.toString();
});
