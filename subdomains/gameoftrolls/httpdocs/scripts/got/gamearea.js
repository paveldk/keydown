// Game area custom class - generating game field & robot & troll

// Constructor
GameArea = function () {
    Sim.Object.call(this);
}

// Subclass Sim.App
GameArea.prototype = new Sim.Object();

// Our customer initializer

GameArea.prototype.init = function (param) {

    //  Sim.Object.prototype.init.call(this, param);

    param = param || {};
    this.param = param;
    this.camera = param.camera;
    var app = param.app;

    if (!app)
        return;

    this.robot = param.robot;
    this.troll = param.troll;
    this.fieldSize = param.size;


    var fieldAreaGroup = new THREE.Object3D();
    this.setObject3D(fieldAreaGroup);
    this.fieldAreaGroup = fieldAreaGroup;

    this.app = app;
    this.createGameField();
    this.addRobot();
    this.addTroll();
}

GameArea.prototype.createGameField = function () {
    texture = null;

    texture = THREE.ImageUtils.loadTexture('images/stone.jpg');
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(1, 1);

    var platform = new THREE.Mesh(new THREE.CubeGeometry(10, 0.2, 10),
                        new THREE.MeshPhongMaterial({ map: texture }));
    this.platform = platform;
    // platform.rotation.x = Math.PI / 15;
  //  platform.rotation.y = Math.PI / 5;

    this.addBoxes();

    this.fieldAreaGroup.add(platform);
    this.fieldAreaGroup.rotation.y = Math.PI / 5;
}

GameArea.prototype.addRobot = function () {
}

GameArea.prototype.addTroll = function () {
}

GameArea.prototype.addBoxes = function () {
    var geometry = new THREE.CubeGeometry(1, 0.2, 1, 1, 1, 1);

    //this.ballmaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, ambient: 0x222222,
     //   transparent: true
   // });
    texture = THREE.ImageUtils.loadTexture('images/stone1.jpg');
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(1, 1);

    //var platform = new THREE.Mesh(new THREE.CubeGeometry(10, 0.2, 10),
      //                  new THREE.MeshPhongMaterial({ map: texture }));

    var smooth = THREE.GeometryUtils.clone(geometry);
    var modifier = new THREE.SubdivisionModifier(2);
    modifier.modify(smooth);

    var ball = new THREE.Mesh(smooth, new THREE.MeshPhongMaterial({map: texture}));
    ball.position.set(-4.5, 0.2, 4.5);

    this.fieldAreaGroup.add(ball);
}

GameArea.prototype.updateCamera = function () {
    var camerapos = new THREE.Vector3(GameArea.CAMERA_OFFSET_X,
			GameArea.CAMERA_OFFSET_Y, GameArea.CAMERA_OFFSET_Z);
    camerapos.addSelf(this.object3D.position);
    this.camera.position.copy(camerapos);
    this.camera.lookAt(this.object3D.position);
}
GameArea.prototype.update = function () {
    this.updateCamera();
    Sim.Object.prototype.update.call(this);
}


GameArea.MAX_SPEED = 250 * 1000 / 3600;
GameArea.MAX_ACCELERATION = 3;
GameArea.MAX_RPM = 5000;

GameArea.CAMERA_OFFSET_X = 0; 	// meters
GameArea.CAMERA_OFFSET_Y = 2.333;
GameArea.CAMERA_OFFSET_Z = 15;

GameArea.REV_LONG_THRESHOLD = 500; // ms