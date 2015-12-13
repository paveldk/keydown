TextObject = function () {
    Sim.Object.call(this);
}

TextObject.prototype = new Sim.Object();

TextObject.prototype.init = function (str) {
    // Create a group to contain text
    var textGroup = new THREE.Object3D();

    // Tell the framework about our object
   // this.setObject3D(textGroup);

    this.str = str;
    this.createTextMesh();
}

TextObject.prototype.createTextMesh = function () {
    var textMesh, textGeo, faceMaterial, textMaterialFront, textMaterialSide;

    var text = this.str;
    var height = 2; // depth means height here
    var size = 10;

    var font = "droid sans";
    var weight = "bold";
    var style = "normal";

    var faceMaterial = new THREE.MeshFaceMaterial();

    var textMaterialFront = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading });
    
    var textGeometry = new THREE.TextGeometry(text,	{ size: size, height: height, font: font, weight: weight, style: style, material: 0, extrudeMaterial: 0 });
    textGeometry.materials = [textMaterialFront];

    textGeometry.computeBoundingBox();
    textGeometry.computeVertexNormals();

    textMesh = new THREE.Mesh(textGeometry, faceMaterial);
//    var centerOffset = -0.5 * (textGeometry.boundingBox.x[1] -
	//		textGeometry.boundingBox.x[0]);
    //  textMesh.position.x = centerOffset;
    // this.object3D.add(textMesh);
    this.mesh = textMesh;
}


TextObject.TEXT_DEPTH = 2;
TextObject.TEXT_SIZE = 10;
TextObject.HOVER = 1;