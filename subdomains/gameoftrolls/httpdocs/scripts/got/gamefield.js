// Game Field custom class

// Constructor
GameField = function () {
    Sim.Object.call(this);
}

// Subclass Sim.App
GameField.prototype = new Sim.Object();

// Our customer initializer

GameField.prototype.init = function (param) {

    //Sim.Object.prototype.init.call(this, param);

    param = param || {};
    this.param = param;
    this.app = param.app;


    if (!app)
        return;

    this.fieldSize = 5;
    var fieldGroup = param.fieldGroup;
    this.fieldGroup = fieldGroup;
    // var gameFieldGroup = new THREE.Object3D();
    // this.setObject3D(gameFieldGroup);

    this.createPlatform();
}

GameField.prototype.createPlatform = function () {

    texture = null;

    texture = THREE.ImageUtils.loadTexture('images/clouds1273.jpg');
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(1, 1);

    var platform = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
                        new THREE.MeshPhongMaterial({ map: texture }));
   // platform.rotation.x = Math.PI / 5;
    platform.rotation.y = Math.PI / 5;

    // this.app.addObject(platform);
    // this.object3D.add(platform);
    //   this.root.add(platform)
    this.fieldGroup.add(platform);
    this.platform = platform;
}
