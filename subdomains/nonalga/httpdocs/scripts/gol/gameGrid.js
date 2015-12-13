//var CELL_SIZE = 35,
//w = 4,
//h = 5,
//W = w * CELL_SIZE,
//H = h * CELL_SIZE;

//var make_grid = function(layer) {
//var back = new Kinetic.Rect({
//    x: 0,
//    y: 0,
//    width: W,
//    height: H,
//    fill: "yellow"
//});
//layer.add(back);
//for (i = 0; i < w + 1; i++) {
//    var I = i * CELL_SIZE;
//    var l = new Kinetic.Line({
//        stroke: "black",
//        points: [I, 0, I, H]
//    });
//    layer.add(l);
//}

//for (j = 0; j < h + 1; j++) {
//    var J = j * CELL_SIZE;
//    var l2 = new Kinetic.Line({
//        stroke: "black",
//        points: [0, J, W, J]
//    });
//    layer.add(l2);
//}
//    return back; //to attach mouseover listener
//};

//var cursor_bind = function(layer, grid_rect, rect) {

//grid_rect.on('mouseover', function(e) {
//    var rx = Math.floor(e.layerX / CELL_SIZE);
//    var ry = Math.floor(e.layerY / CELL_SIZE);
//    rect.setPosition(rx * CELL_SIZE, ry * CELL_SIZE);
//    layer.draw();
//});
//};

//var stage = new Kinetic.Stage({
//container: "kinetic",
//width: 800,
//height: 600,
//draggable: true
//});

//var layer = new Kinetic.Layer();

//var rect = new Kinetic.Rect({
//x: 0,
//y: 0,
//width: CELL_SIZE,
//height: CELL_SIZE,
//fill: "#00D2FF",
//stroke: "black",
//strokeWidth: 4
//});

//var gr = make_grid(layer);
//cursor_bind(layer, gr, rect);

//// add the shape to the layer
//layer.add(rect);

//// add the layer to the stage
//stage.add(layer);​