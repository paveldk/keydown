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
    var app = param.app;

    if (!app)
        return;
    this.app = app;

    this.robot = param.robot;
    this.troll = param.troll;
    this.fieldSize = param.fieldSize;
    this.fieldMatrix = new Array(this.fieldSize);

    this.initialFieldSum = 0;
    this.initialCustomField = new Array(this.fieldSize);

    this.currentRockCount = 0;

    this.fieldRockColumnMatrix = new Array(this.fieldSize);
    for (var i = 0; i < this.fieldSize; i++) {
        this.fieldRockColumnMatrix[i] = new Array(this.fieldSize);
    }

    var fieldAreaGroup = new THREE.Object3D;
    this.fieldAreaGroup = fieldAreaGroup;
    this.setObject3D(fieldAreaGroup);

    if (param.generateRandomField) {
        this.generateRandomField();
    }
    else {
        this.setGameField(this.app.param.customField);
    }

    this.createGameField();

    this.addRobot();
    this.addTroll();

    this.fieldAreaGroup.rotation.y = Math.PI / 5;
    this.fieldAreaGroup.position.y = GameArea.FIELD_HEIGHT / 2 + GameOfTrolls.GROUND_Y;

}

//GameArea.prototype.initRockMaterialGeometry = function () {

//    var texture = THREE.ImageUtils.loadTexture('images/redstone.jpg');
//    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
//    texture.repeat.set(1, 1);

//    var smooth = new THREE.CubeGeometry(this.rockSize, this.rockHeight, this.rockSize);
//    var modifier = new THREE.SubdivisionModifier(2);
//    modifier.modify(smooth);
//    var material = new THREE.MeshPhongMaterial({ map: texture });

//    this.smooth = smooth;
//    this.material = material;
//}

GameArea.prototype.createGameField = function () {

    texture = null;

    texture = THREE.ImageUtils.loadTexture('images/stone.jpg');
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(1, 1);

    var platform = new THREE.Mesh(new THREE.CubeGeometry(GameArea.FIELD_LENGTH, GameArea.FIELD_HEIGHT, GameArea.FIELD_LENGTH),
                        new THREE.MeshPhongMaterial({ map: texture }));
    platform.castShadow = true;
    platform.receiveShadow = true;
    this.platform = platform;
    this.fieldAreaGroup.add(platform);
    this.generateRockColumns();
}

GameArea.prototype.addRobot = function () {
    var daer, skin;
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('models/robot_cartoon_02.dae', this.loadFuncRobot.bind(this));
}

GameArea.prototype.addTroll = function () {
    var dae, skin;
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('models/Monster.dae', this.loadFuncTroll.bind(this));
}

GameArea.prototype.loadFuncRobot = function (collada) {
    daer = collada.scene;
    skin = collada.skins[0];
    daer.scale.x = daer.scale.y = daer.scale.z = 0.05;
    // dae.rotation.x = -Math.PI / 2;
    daer.position.z = GameArea.FIELD_LENGTH / 2 + 25;
    daer.rotation.y = -Math.PI / 2;
    daer.position.y = -1;
    var daemeshr = daer.children[0].children[0].children[1];
    daemeshr.castShadow = true;
    daemeshr.receiveShadow = true;

    daer.castShadow = true;
    daer.receiveShadow = true;
    daer.updateMatrix();
   // this.object3D.add(dae);
    this.fieldAreaGroup.add(daer);
} 

GameArea.prototype.loadFuncTroll = function (collada) {
    dae = collada.scene;
    skin = collada.skins[0];
    dae.scale.x = dae.scale.y = dae.scale.z = 1.5;
    dae.rotation.x = -Math.PI / 2;
    dae.position.y = 18;
    dae.position.z = -GameArea.FIELD_LENGTH / 2 - 25;

    var daemesh = dae.children[0];
    daemesh.castShadow = true;
    daemesh.receiveShadow = true;

    dae.castShadow = true;
    dae.receiveShadow = true;
    dae.updateMatrix();
    this.fieldAreaGroup.add(dae);
}

GameArea.prototype.generateRockColumns = function () {
    for (var i = 0; i < this.fieldSize; i++) {
        for (var j = 0; j < this.fieldSize; j++) {
            var rockColumn = new RockColumn();
            rockColumn.init({ app: this.app, columnHeight: this.fieldMatrix[i][j], positionX: i, positionZ: j });
            this.fieldAreaGroup.add(rockColumn);
            this.addChild(rockColumn);
            this.app.addToIntersected(rockColumn.columnGroup);
            this.fieldRockColumnMatrix[i][j] = rockColumn;
        }
    }
}

GameArea.prototype.generateRandomField = function () {
    var rnd;
    for (var i = 0; i < this.fieldSize; i++) {
        this.fieldMatrix[i] = new Array(this.fieldSize);
        this.initialCustomField[i] = new Array(this.fieldSize);
        for (var j = 0; j < this.fieldSize; j++) {

            rnd = Math.floor((Math.random() * this.app.columnMaxHeight) + 0);
            while (!this.isValidNumber(i, j, rnd)) {
                rnd = Math.floor((Math.random() * this.app.columnMaxHeight) + 0);
            }
            this.fieldMatrix[i][j] = rnd;
            this.initialCustomField[i][j] = rnd;
            this.currentRockCount += rnd;
        }
    }
    this.initialFieldSum = this.currentRockCount;
}

GameArea.prototype.setGameField = function (tmp) {
    for (var i = 0; i < this.fieldSize; i++) {
        this.fieldMatrix[i] = new Array(this.fieldSize);
        for (var j = 0; j < this.fieldSize; j++) {
            this.fieldMatrix[i][j] = tmp[i][j];
        }
    }
}

GameArea.prototype.isValidNumber = function (x, y, num) {
    if (this.isInField(x - 1, y) && this.fieldMatrix[x - 1][y] == num) {
        return false;
    }

    if (this.isInField(x, y - 1) && this.fieldMatrix[x][y - 1] == num) {
        return false;
    }
    return true;
}
GameArea.prototype.isInField = function (x, y) {
    if (x < 0 || x > this.fieldSize - 1 || y < 0 || y > this.fieldSize - 1) {
        return false;
    }
    return true;
}

GameArea.FIELD_HEIGHT = 2;
GameArea.FIELD_LENGTH = 100;
