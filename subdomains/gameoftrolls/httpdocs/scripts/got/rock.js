// Rock custom class

// Constructor
Rock = function () {
    Sim.Object.call(this);
}

// Subclass Sim.App
Rock.prototype = new Sim.Object();

// Our customer initializer

Rock.prototype.init = function (param) {
    //Sim.Object.prototype.init.call(this, param);
    this.positionX = param.positionX;
    this.positionY = param.positionY;
    this.positionZ = param.positionZ;
    this.rockSize = param.rockSize;
    this.rockHeight = param.rockHeight;
    this.addRock();

}
Rock.prototype.addRock = function () {
    var texture = THREE.ImageUtils.loadTexture('images/rock-texture.jpg');
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(1, 1);

    var smooth = new THREE.CubeGeometry(this.rockSize, this.rockHeight, this.rockSize);
    var modifier = new THREE.SubdivisionModifier(2);
    modifier.modify(smooth);
    var material = new THREE.MeshPhongMaterial({ map: texture });
 
    var mesh = new THREE.Mesh(smooth, material);
    mesh.position.y = this.positionY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.mesh = mesh;
}