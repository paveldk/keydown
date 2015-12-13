Robot = function () {
    Sim.Object.call(this);
}

Robot.prototype = new Sim.Object();

Robot.prototype.init = function () {
    // Create a group to hold the robot
    var bodygroup = new THREE.Object3D;
    // Tell the framework about our object
    this.setObject3D(bodygroup);

    var that = this;
    // GREAT cartoon robot model - http://www.turbosquid.com/FullPreview/Index.cfm/ID/475463
    // Licensed
    var url = 'models/robot_cartoon_02.dae';
    var loader = new Sim.ColladaLoader;
    loader.load(url, function (data) {
        that.handleLoaded(data)
    });
}

Robot.prototype.handleLoaded = function (data) {
    if (data) {
        var model = data.scene;
        // This model in cm, we're working in meters, scale down
        model.scale.set(.01, .01, .01);

        this.object3D.add(model);

        // Walk through model looking for known named parts
        var that = this;
        THREE.SceneUtils.traverseHierarchy(model, function (n) { that.traverseCallback(n); });
    }
}

Robot.prototype.traverseCallback = function (n) {
    // Function to find the parts we need to animate. C'est facile!
    switch (n.name) {
        case 'jambe_G':
            this.left_leg = n;
            break;
        case 'jambe_D':
            this.right_leg = n;
            break;
        case 'head_container':
            this.head = n;
            break;
        case 'clef':
            this.key = n;
            break;
        default:
            break;
    }
}
