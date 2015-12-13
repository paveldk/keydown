// Constructor
Environment = function () {
    Sim.Object.call(this);
}

// Subclass Sim.App
Environment.prototype = new Sim.Object();

// Our custom initializer
Environment.prototype.init = function (param) {

    param = param || {};

    var app = param.app;
    if (!app)
        return;

    this.textureSky = param.textureSky;
    this.textureGround = param.textureGround;

    this.camera = param.camera;

    this.app = app;
    //  this.createSky();
    this.createGround();
    this.addLights();
    this.curTime = Date.now();
}

Environment.prototype.addLights = function () {
    // Create a headlight to show off the model
    this.app.scene.add(new THREE.AmbientLight(0x666666));

    light = new THREE.DirectionalLight(0xffffff, 1.75);
    light.color.setHSV(0.6, 0.125, 1);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.1);

    light.castShadow = true;
    //see the shadows
   // light.shadowCameraVisible = true;

    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;

    var d = 300;

    light.shadowCameraLeft = -d;
    light.shadowCameraRight = d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;

    light.shadowCameraFar = 700;
    light.shadowDarkness = 0.5;

    app.scene.add(light);

    light = new THREE.DirectionalLight(0xffffff, 0.35);
    light.color.setHSV(0.3, 0.95, 1);
    light.position.set(0, -1, 0);

    this.app.scene.add(light);
}

Environment.prototype.createSky = function () {

    var texture = null;

    // Clouds by moodflow
    // http://www.turbosquid.com/Search/Artists/moodflow
    // http://www.turbosquid.com/FullPreview/Index.cfm/ID/433395		

    if (this.textureSky) {
        texture = THREE.ImageUtils.loadTexture('images/clouds1273.jpg');
        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
        texture.repeat.set(1, 1);
    }
    else {
        texture = null;
    }

    var sky = new THREE.Mesh(new THREE.PlaneGeometry(Environment.SKY_WIDTH, Environment.SKY_HEIGHT),
                        new THREE.MeshBasicMaterial(
                                    { color: this.textureSKy ? 0xffffff : 0x3fafdd, map: texture }));

    sky.position.y = 100 + Environment.GROUND_Y;
    sky.position.z = -Environment.GROUND_LENGTH / 2;
    this.app.scene.add(sky);
    this.sky = sky;
}

Environment.prototype.createGround = function () {
    // set initial color below
    var initColor = new THREE.Color(0x00ff00);
    initColor.setHSV(0.25, 0.85, 0.5);
    var initTexture = THREE.ImageUtils.generateDataTexture(1, 1, initColor);

    var groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, map: initTexture });

    // load the texture
    var groundTexture = THREE.ImageUtils.loadTexture("images/grasslight-big.jpg", undefined, function () { groundMaterial.map = groundTexture });
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;

    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(Environment.GROUND_WIDTH, Environment.GROUND_LENGTH), groundMaterial);
    mesh.position.y = -250;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.app.scene.add(mesh);
    this.ground = mesh;
}

Environment.SKY_WIDTH = 3000;
Environment.SKY_HEIGHT = 200;
Environment.GROUND_Y = 250;
Environment.GROUND_WIDTH = 1200;
Environment.GROUND_LENGTH = 1200;