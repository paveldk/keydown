// Constructor
Environment = function () {
    Sim.Object.call(this);
}

// Subclass Sim.App
Environment.prototype = new Sim.Object();

// Our custom initializer
Environment.prototype.init = function (param) {
    // Call superclass init code to set up scene, renderer, default camera
    Sim.Object.prototype.init.call(this, param);

    param = param || {};

    var app = param.app;
    if (!app)
        return;

    this.textureSky = param.textureSky;
    this.textureGround = param.textureGround;

    // Create a headlight to show off the model
    this.headlight = new THREE.DirectionalLight(0xffffff, 1);
    this.headlight.position.set(0, 0, 1);
    app.scene.add(this.headlight);

    this.toplight = new THREE.DirectionalLight(0xffffff, 1);
    this.toplight.position.set(0, 1, 0);
    app.scene.add(this.toplight);

    this.ambient = new THREE.AmbientLight(0xffffff, 1);
    app.scene.add(this.ambient);

    this.app = app;
    this.createSky();
    this.createGround();
    this.curTime = Date.now();
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
    var texture = null;

    // Sand texture
    if (this.textureGround) {
        texture = THREE.ImageUtils.loadTexture('images/Sand_002.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(100, 100);
    }
    else {
        texture = null;
    }

    var ground = new THREE.Mesh(new THREE.PlaneGeometry(Environment.GROUND_WIDTH, Environment.GROUND_LENGTH),
                                new THREE.MeshBasicMaterial({ color: this.textureGround ? 0xffffff : 0xaaaaaa, ambient: 0x333333, map: texture }));
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -.02 + Environment.GROUND_Y;
    this.app.scene.add(ground);
    this.ground = ground;
}

Environment.prototype.update = function () {
   // console.log('aa');
    if (this.textureSky) {
        this.sky.material.map.offset.x += 0.00005;
    }
    Sim.Object.prototype.update.call(this);
}

Environment.SKY_WIDTH = 3000;
Environment.SKY_HEIGHT = 200;
Environment.GROUND_Y = -10;
Environment.GROUND_WIDTH = 2000;
Environment.GROUND_LENGTH = 2000;