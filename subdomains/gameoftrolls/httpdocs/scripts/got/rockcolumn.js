// Rock custom class

// Constructor
RockColumn = function () {
    Sim.Object.call(this);
}

// Subclass Sim.App
RockColumn.prototype = new Sim.Object();

// Our customer initializer

RockColumn.prototype.init = function (param) {
    //  Sim.Object.prototype.init.call(this, param);
    var columnGroup = new THREE.Object3D;
    this.columnGroup = columnGroup;
    this.setObject3D(columnGroup);

    app = param.app;
    this.app = app;

    this.rockHeight = this.app.rockHeight / 2;
    this.columnHeight = param.columnHeight;

    this.positionX = -GameArea.FIELD_LENGTH / 2 + this.app.rockSize / 2 + param.positionX * this.app.rockSize;
    this.positionZ = -GameArea.FIELD_LENGTH / 2 + this.app.rockSize / 2 + param.positionZ * this.app.rockSize;
    this.columnGroup.position.x = this.positionX;
    this.columnGroup.position.z = this.positionZ;

    this.x = param.positionX;
    this.y = param.positionZ;

    this.maxCap = false;
    this.minCap = false;

    this.generateRocks();

}

RockColumn.prototype.generateRocks = function () {
    // add rocks to column
    if (this.columnHeight == 0) {
        this.addEmptyBlock();
        this.minCap = true;
    }

    for (var i = 0; i < this.columnHeight; i++) {
        positionY = GameArea.FIELD_HEIGHT + i * (this.rockHeight);
        var mesh = new THREE.Mesh(this.app.smooth, this.app.material);
        mesh.position.y = positionY;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.columnGroup.add(mesh);
        this.currentHeight = positionY + this.rockHeight;
        this.lastMesh = mesh;
    }

    if (this.columnHeight == this.app.columnMaxHeight) {
        this.maxCap = true;
    }
}

RockColumn.prototype.addEmptyBlock = function () {
    var mesh = new THREE.Mesh(new THREE.CubeGeometry(this.app.rockSize, this.app.rockHeight, this.app.rockSize), new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0.0 }));
    mesh.position.y = GameArea.FIELD_HEIGHT;
    this.columnGroup.add(mesh);
    this.currentHeight = GameArea.FIELD_HEIGHT;
    this.lastMesh = mesh;
}

RockColumn.prototype.handleMouseOver = function (x, y) {
    if (this.app.param.enableInteraction) {
        this.app.addTempRock(this.x, this.y);
    }
}

RockColumn.prototype.handleMouseOut = function (x, y) {
    if (this.app.param.enableInteraction) {
        this.app.mouseOutOfRock(this.x, this.y);
    }
}

RockColumn.prototype.handleMouseDown = function (x, y, hitPoint, normal) {
    // this.app.removeRock(this.x, this.y);
    if (this.app.param.enableInteraction) {
        if (this.app.addTool) {
            if (!this.maxCap) {
                this.app.addRock(this.x, this.y);
            }
        }
        else {
            if (!this.minCap) {
                this.app.removeRock(this.x, this.y);
            }
        }
    }
}

RockColumn.prototype.handleMouseUp = function (x, y, hitPoint, normal) {
    
}

RockColumn.prototype.handleMouseMove = function (x, y) {
}

RockColumn.prototype.update = function () {
  //  Sim.Object.prototype.update.call(this);
}
