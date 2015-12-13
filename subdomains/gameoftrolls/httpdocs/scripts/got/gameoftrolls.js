// Game Of Trolls base app class
var controls;
// Constructor
GameOfTrolls = function () {
    Sim.App.call(this);
}

// Subclass Sim.App
GameOfTrolls.prototype = new Sim.App();

// Our custom initializer
GameOfTrolls.prototype.init = function (param) {

    // Call superclass init code to set up scene, renderer, default camera
    Sim.App.prototype.init.call(this, param);

    param = param || {};

    this.param = param;
    this.addTool = true;
    this.fieldSize = param.fieldSize;
    this.rockSize = GameArea.FIELD_LENGTH / param.fieldSize;
    var rockHeightCoef = localStorage.getItem('rochHeightCoef') || 5;
    this.rockHeight = this.rockSize / rockHeightCoef;
    this.columnMaxHeight = param.columnMaxHeight;

    this.initRockMaterialGeometry();
    this.createEnvironment();
    this.loadGameArea();
    this.createCameraControls();

    this.trollScore = 0;
    this.robotScore = 0;
    this.trollTurn = true;

    this.currentTurn = 0;

    if (this.param.trollPlaying) {
        this.addTool = false;
        this.storedTurnsArray = new Array(this.param.turnsLeft);
        this.setAnimation();
    }

    if (this.param.vsTrollGame) {
        this.turnsLeft = param.turnsLeft;
        this.initialTurns = param.turnsLeft;
        MainAlgo.init({ random: false, turns: this.param.turnsLeft, size: this.fieldSize, field: this.gameArea.fieldMatrix });
        this.trollFinalScore = MainAlgo.score;
    }
}
GameOfTrolls.prototype.createEnvironment = function () {
    this.environment = new Environment();
    this.environment.init({
        app: this,
        textureSky: true,
        textureGround: true,
        camera: camera
    });
    this.addObject(this.environment);
}
GameOfTrolls.prototype.loadGameArea = function () {
    this.gameArea = new GameArea();
    this.gameArea.init({
        app: this,
        robot: true,
        troll: true,
        fieldSize: this.param.fieldSize,
        generateRandomField: this.param.generateRandomField
    });
    this.addObject(this.gameArea);
    this.gameArea.platform.add(camera);
}

GameOfTrolls.prototype.initRockMaterialGeometry = function () {

    var textureid = localStorage.getItem('rockTexture') || 1;
    var textureURL = 'images/stone1' + textureid + '.jpg';

    var texture = THREE.ImageUtils.loadTexture(textureURL);
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(1, 1);

    var smooth = new THREE.CubeGeometry(this.rockSize, this.rockHeight, this.rockSize);
    var modifier = new THREE.SubdivisionModifier(2);
    modifier.modify(smooth);
    var material = new THREE.MeshPhongMaterial({ map: texture });

    this.smooth = smooth;
    this.material = material;
}

GameOfTrolls.prototype.addTempRock = function (x, y) {

    if (this.addTool && !this.gameArea.fieldRockColumnMatrix[x][y].maxCap) {
        var mesh = new THREE.Mesh(this.smooth, new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.5, transparent: false, wireframe: true }));
        mesh.position.y = this.gameArea.fieldRockColumnMatrix[x][y].currentHeight;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.add(mesh);
        this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh = mesh;
        this.gameArea.fieldRockColumnMatrix[x][y].currentHeight += this.rockHeight;
        this.addedTemp = true;
    }

    else if (!this.addTool && !this.gameArea.fieldRockColumnMatrix[x][y].minCap) {
        var mesh = new THREE.Mesh(this.smooth, new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 0.9, transparent: false, wireframe: true }));
        mesh.position.y = this.gameArea.fieldRockColumnMatrix[x][y].currentHeight - this.rockHeight / 2;
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.add(mesh);
        this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh = mesh;
        this.gameArea.fieldRockColumnMatrix[x][y].currentHeight -= this.rockHeight / 2;
        this.addedTemp = false;
    }

}

GameOfTrolls.prototype.mouseOutOfRock = function (x, y) {
    this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh);
    if (this.addedTemp && !this.gameArea.fieldRockColumnMatrix[x][y].maxCap) {
        this.gameArea.fieldRockColumnMatrix[x][y].currentHeight -= this.rockHeight;
    }
    else if (!this.addedTemp && !this.gameArea.fieldRockColumnMatrix[x][y].minCap) {
        this.gameArea.fieldRockColumnMatrix[x][y].currentHeight += this.rockHeight / 2;
    }
}

GameOfTrolls.prototype.addNonInteractiveRock = function (x, y) {
    var mesh = new THREE.Mesh(this.smooth, this.material);
    mesh.position.y = this.gameArea.fieldRockColumnMatrix[x][y].currentHeight;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.add(mesh);
    this.gameArea.fieldRockColumnMatrix[x][y].currentHeight += this.rockHeight / 2;
    this.gameArea.fieldMatrix[x][y]++;
    this.gameArea.fieldRockColumnMatrix[x][y].lastMesh = mesh;
    if (!this.inPrvMove) {
        this.checkEqualNeighbour(x, y);
    }
}

GameOfTrolls.prototype.addNonInteractiveTempRock = function (x, y, adding) {
    if (adding) {
        var mesh = new THREE.Mesh(this.smooth, new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.5, transparent: false, wireframe: true }));
        mesh.position.y = this.gameArea.fieldRockColumnMatrix[x][y].currentHeight;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.add(mesh);
        this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh = mesh;
        this.addedTemp = true;
    }
    else {
        var mesh = new THREE.Mesh(this.smooth, new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 0.9, transparent: false, wireframe: true }));
        mesh.position.y = this.gameArea.fieldRockColumnMatrix[x][y].currentHeight - this.rockHeight / 2;
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.add(mesh);
        this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh = mesh;
        this.addedTemp = false;
    }
}

GameOfTrolls.prototype.addRock = function (x, y) {
    var mesh = new THREE.Mesh(this.smooth, this.material);
    mesh.position.y = this.gameArea.fieldRockColumnMatrix[x][y].currentHeight - this.rockHeight;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.add(mesh);
    this.gameArea.fieldRockColumnMatrix[x][y].currentHeight += this.rockHeight / 2;
    this.gameArea.fieldMatrix[x][y]++;
    this.gameArea.fieldRockColumnMatrix[x][y].lastMesh = mesh;

    if (this.gameArea.fieldMatrix[x][y] == this.columnMaxHeight) {
        this.gameArea.fieldRockColumnMatrix[x][y].maxCap = true;
        this.gameArea.fieldRockColumnMatrix[x][y].currentHeight -= this.rockHeight;
        this.mouseOutOfRock(x, y);
    }
    else if (this.gameArea.fieldRockColumnMatrix[x][y].minCap) {
        this.gameArea.fieldRockColumnMatrix[x][y].minCap = false;
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh);
        this.gameArea.fieldRockColumnMatrix[x][y].currentHeight -= this.rockHeight;
        this.addTempRock(x, y);
    }
    else {
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh);
        this.gameArea.fieldRockColumnMatrix[x][y].currentHeight -= this.rockHeight;
        this.addTempRock(x, y);
    }

    this.gameArea.currentRockCount++;

    this.checkEqualNeighbour(x, y);
    this.trollTurn = !this.trollTurn;
    if (this.param.multi) {
        this.updateScores();
        this.updateTurn();
    }

    if (this.param.vsTrollGame) {
        this.turnsLeft--;
        $('#turnsLeft').text(this.turnsLeft);
    }

    this.checkEndGame();
}

GameOfTrolls.prototype.removeNonInteractiveRock = function (x, y) {
    var indexLastMesh = this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.children.indexOf(this.gameArea.fieldRockColumnMatrix[x][y].lastMesh);
    this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].lastMesh);
    this.gameArea.fieldRockColumnMatrix[x][y].lastMesh = this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.children[indexLastMesh - 1];
    this.gameArea.fieldMatrix[x][y]--;
    this.gameArea.fieldRockColumnMatrix[x][y].currentHeight -= this.rockHeight / 2;
    if (!this.inPrvMove) {
        this.checkEqualNeighbour(x, y);
    }
}

GameOfTrolls.prototype.removeNonInteractiveTempRock = function (x, y, adding) {
    this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh);
} 

GameOfTrolls.prototype.removeRock = function (x, y) {
    var indexLastMesh = this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.children.indexOf(this.gameArea.fieldRockColumnMatrix[x][y].lastMesh);
    this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].lastMesh);
    this.gameArea.fieldRockColumnMatrix[x][y].lastMesh = this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.children[indexLastMesh - 1];
    this.gameArea.fieldMatrix[x][y]--;

    if (this.gameArea.fieldMatrix[x][y] == 0) {
        this.gameArea.fieldRockColumnMatrix[x][y].minCap = true;
        this.gameArea.fieldRockColumnMatrix[x][y].addEmptyBlock();
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh);
        this.gameArea.fieldRockColumnMatrix[x][y].currentHeight -= this.rockHeight / 2;
    }
    else if (this.gameArea.fieldRockColumnMatrix[x][y].maxCap) {
        this.gameArea.fieldRockColumnMatrix[x][y].maxCap = false;
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh);
        this.addTempRock(x, y);
    }
    else {
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh);
        this.addTempRock(x, y);
    }
    if (this.param.multi) {
        if (this.trollTurn) {
            this.trollScore++;
        }
        else {
            this.robotScore++;
        }
    }
    this.gameArea.currentRockCount--;

    this.checkEqualNeighbour(x, y);
    this.trollTurn = !this.trollTurn;
    if (this.param.multi) {
        this.updateScores();
        this.updateTurn();
    }

    if (this.param.vsTrollGame) {
        this.turnsLeft--;
        $('#turnsLeft').text(this.turnsLeft);
    }

    this.checkEndGame();
}

GameOfTrolls.prototype.checkEndGame = function () {
    if (this.param.multi) {
        if (this.gameArea.currentRockCount == 0) {
            this.finalResult();
        }
    }
    else {
        if (this.turnsLeft == 0) {
            this.finalResult();
        }
    }
}

GameOfTrolls.prototype.finalResult = function () {
    if (this.param.multi) {
        if (this.trollScore > this.robotScore) {
            var resultsModal = "<div id='finalResults'><h2>Final Score</h2><h3>The Troll won with a final score " + this.trollScore + "</h3><h4>The Robot finished with " + this.robotScore + "</h4><img width='128' height='128' src='images/goldcup.png' /></div>";
        }
        else if (this.trollScore < this.robotScore) {
            var resultsModal = "<div id='finalResults'><h2>Final Score</h2><h3>The Robot won with a final score " + this.robotScore + "</h3><h4>The Troll finished with " + this.trollScore + "</h4><img width='128' height='128' src='images/goldcup.png' /></div>";
        }
        else {
            var resultsModal = "<div id='finalResults'><h2>Final Score</h2><h3>What a nice draw this is with both Robot and Troll scoring " + this.robotScore + "</h3><img width='128' height='128' src='images/goldcup.png' /></div>";
        }
        $('body').append(resultsModal);
        $('#finalResults').modal({ onOpen: function (dialog) {
            dialog.overlay.fadeIn('slow', function () {
                dialog.data.hide();
                dialog.container.fadeIn('slow', function () {
                    dialog.data.slideDown('slow');
                });
            });
        },
            onClose: function (dialog) {
                dialog.data.fadeOut('slow', function () {
                    dialog.container.hide('slow', function () {
                        dialog.overlay.slideUp('slow', function () {
                            $.modal.close();
                            window.location = "/";
                        });
                    });
                });
            }
        });
    }
    else {
        this.currentFieldSum = 0;
        for (var i = 0; i < this.fieldSize; i++) {
            for (var j = 0; j < this.fieldSize; j++) {
                this.currentFieldSum += this.gameArea.fieldMatrix[i][j];
            }
        }
        this.finalScore = this.currentFieldSum;
        this.trollFinalScore = this.gameArea.initialFieldSum - this.trollFinalScore;


        var resultsModal = "<div id='finalResults'><h2>Final Score</h2><h3>You left " + this.finalScore + " rocks on the field.</h3><h3>The Troll left " + this.trollFinalScore + " rocks.</h3><img width='128' height='128' src='images/goldcup.png' /><br /><a id='watchTrollCT' href='#' class='smallButton'>See the Troll's moves</a></div>";
        $('body').append(resultsModal);


        $('#finalResults').modal({ onOpen: function (dialog) {
            dialog.overlay.fadeIn('slow', function () {
                dialog.data.hide();
                dialog.container.fadeIn('slow', function () {
                    dialog.data.slideDown('slow');
                });
            });
        },
            onClose: function (dialog) {
                dialog.data.fadeOut('slow', function () {
                    dialog.container.hide('slow', function () {
                        dialog.overlay.slideUp('slow', function () {
                            $.modal.close();
                        });
                    });
                });
            }
        });
        $('#watchTrollCT').on('click', this.watchTrollPlaying.bind(this));
    }
}

GameOfTrolls.prototype.watchTrollPlaying = function (evt) {
    evt.preventDefault();

    $.modal.close();

    var customField = [];

    MainAlgo.init({ random: false, turns: this.initialTurns, size: this.fieldSize, field: this.gameArea.initialCustomField });

    $('body').empty();
    $('body').append(challangeTrollDOM);

    var container = document.getElementById("gameContex");
    var turnLeft = document.getElementById("turnsLeft");
    Sim.WebGLDetector.detectWebGL();
    app = new GameOfTrolls();
    app.init({ container: container,
        fieldSize: this.fieldSize,
        columnMaxHeight: this.param.columnMaxHeight,
        turns: this.initialTurns,
        generateRandomField: false,
        multi: false,
        enableInteraction: false,
        trollPlaying: true,
        turnsLeft: turnLeft,
        customField: this.gameArea.initialCustomField,
        vsTrollGame: false,
        turnsToPlay: MainAlgo.result
    });
    app.focus();
    app.run();

    $('#turnsLeft').text(app.param.turns);

    $('#prvButton').hide();
    $('#nxtButton').on('click', function () {
        app.playNextMove();
    });
    $('#prvButton').on('click', function () {
        app.playPreviousMove();
    });
    var pl = true;
    $('#autoplayButton').bind('click', function () {
        if (pl) {
            $('#autoplayButton').addClass('pause').text('pause');
            si = setInterval(app.playNextMove.bind(app), 2000);
            pl = !pl;
        }
        else {
            $('#autoplayButton').removeClass('pause').text('autoplay');
            clearInterval(si);
            pl = !pl;
        }
    });
}

GameOfTrolls.prototype.checkEqualNeighbour = function (x, y) {
    var curColHeight = this.gameArea.fieldMatrix[x][y];
    var removeMe = false;
    if (this.isInField(x + 1, y) && this.gameArea.fieldMatrix[x + 1][y] == curColHeight) {
        removeMe = true;
        this.removeColumn(x + 1, y);
    }
    if (this.isInField(x - 1, y) && this.gameArea.fieldMatrix[x - 1][y] == curColHeight) {
        removeMe = true;
        this.removeColumn(x - 1, y);
    }
    if (this.isInField(x, y + 1) && this.gameArea.fieldMatrix[x][y + 1] == curColHeight) {
        removeMe = true;
        this.removeColumn(x, y + 1);
    }

    if (this.isInField(x, y - 1) && this.gameArea.fieldMatrix[x][y - 1] == curColHeight) {
        removeMe = true;
        this.removeColumn(x, y - 1);
    }
    if (removeMe) {
        this.removeColumn(x, y);
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].currentHoverMesh);
        if (this.addTool) {
            this.gameArea.fieldRockColumnMatrix[x][y].currentHeight = GameArea.FIELD_HEIGHT + this.rockHeight;
        }
        else {
            this.gameArea.fieldRockColumnMatrix[x][y].currentHeight = GameArea.FIELD_HEIGHT;
        }
    }
}

GameOfTrolls.prototype.removeColumn = function (x, y) {
    var rocksToRemove = this.gameArea.fieldMatrix[x][y];
    for (var i = 0; i < rocksToRemove; i++) {
        var indexLastMesh = this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.children.indexOf(this.gameArea.fieldRockColumnMatrix[x][y].lastMesh);
        this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.remove(this.gameArea.fieldRockColumnMatrix[x][y].lastMesh);
        this.gameArea.fieldRockColumnMatrix[x][y].lastMesh = this.gameArea.fieldRockColumnMatrix[x][y].columnGroup.children[indexLastMesh - 1];
        this.gameArea.fieldMatrix[x][y]--;
        if (this.param.trollPlaying) {
            this.storedTurnsArray[this.currentTurn].push(['t', x, y]);
        }
    }
    this.gameArea.fieldRockColumnMatrix[x][y].minCap = true;
    this.gameArea.fieldRockColumnMatrix[x][y].addEmptyBlock();
    this.gameArea.fieldMatrix[x][y] = 0;

    if (this.param.multi) {
        if (this.trollTurn) {
            this.trollScore += rocksToRemove;
        }
        else {
            this.robotScore += rocksToRemove;
        }
    }
    this.gameArea.currentRockCount -= rocksToRemove;
}

GameOfTrolls.prototype.isInField = function (x, y) {
    if (x < 0 || x > this.fieldSize - 1 || y < 0 || y > this.fieldSize - 1) {
        return false;
    }
    return true;
}
GameOfTrolls.prototype.setAnimation = function () {
    var i = 0;
    this.playTurns = [];
    for (var i = 0; i < this.param.turnsToPlay.length; i++) {
        this.playTurns[i] = new Array(3);
        for (var j = 0; j < 3; j++) {
            this.playTurns[i][j] = this.param.turnsToPlay[i][j];
        }
    }
   // this.animationInterval = setInterval(this.animateMoves.bind(this), 2000);
}

GameOfTrolls.prototype.animateMoves = function () {
    if (this.currentTurn >= this.playTurns.length) {
        clearInterval(this.animationInterval);
    }
    else {
        if (this.playTurns[this.currentTurn][0] == 'p') {
            this.addRock(this.playTurns[this.currentTurn][1], this.playTurns[this.currentTurn][2]);
        }
        else if (this.playTurns[this.currentTurn][0] == 't') {
            this.removeRock(this.playTurns[this.currentTurn][1], this.playTurns[this.currentTurn][2]);
        }
        this.currentTurn++;
    }
}

GameOfTrolls.prototype.initNav = function () {
}

GameOfTrolls.prototype.playNextMove = function () {
    if (this.currentTurn < this.playTurns.length) {
        var x = this.playTurns[this.currentTurn][1];
        var y = this.playTurns[this.currentTurn][2];
        var that = this;
        if (this.playTurns[this.currentTurn][0] == 'p') {
            this.storedTurnsArray[this.currentTurn] = new Array();
            this.storedTurnsArray[this.currentTurn].push(['p', this.playTurns[this.currentTurn][1], this.playTurns[this.currentTurn][2]]);
            setTimeout(function () { that.addNonInteractiveTempRock(x, y, true) }, 800);
            setTimeout(function () { that.removeNonInteractiveTempRock(x, y, true) }, 1400);
            setTimeout(function () {
                that.addNonInteractiveRock(x, y);
                that.currentTurn++;
            }, 1500);
        }
        else if (this.playTurns[this.currentTurn][0] == 't') {
            this.storedTurnsArray[this.currentTurn] = new Array();
            this.storedTurnsArray[this.currentTurn].push(['t', this.playTurns[this.currentTurn][1], this.playTurns[this.currentTurn][2]]);
            setTimeout(function () { that.addNonInteractiveTempRock(x, y, false) }, 700);
            setTimeout(function () { that.removeNonInteractiveTempRock(x, y, false) }, 1400);
            setTimeout(function () {
                that.removeNonInteractiveRock(x, y);
                that.currentTurn++;
            }, 1900);
        }
        //    this.mouseOutOfRock(this.playTurns[this.currentTurn][1], this.playTurns[this.currentTurn][2]);
    }
    else {
        //this.currentTurn = this.playTurns.length - 1;
        clearInterval(si);
    }
    this.currentTurn++;
    if (this.currentTurn == this.playTurns.length) {
        $('#nxtButton').hide('slow');
    }
    else if (!$("#nxtButton").is(':visible')) {
        $('#nxtButton').show('slow');
    }
    if (this.currentTurn == 0) {
        $('#prvButton').hide('slow');
    }
    else if (!$("#prvButton").is(':visible')) {
        $('#prvButton').show('slow');
    }
    this.param.turnsLeft.innerHTML = this.param.turns - this.currentTurn;
    this.currentTurn--;
}

GameOfTrolls.prototype.playPreviousMove = function () {
    this.currentTurn--;
    this.inPrvMove = true;
    if (this.currentTurn >= 0) {
        for (var i = this.storedTurnsArray[this.currentTurn].length-1; i >= 0; i--) {
            if (this.storedTurnsArray[this.currentTurn][i][0] == 'p') {
                this.removeNonInteractiveRock(this.storedTurnsArray[this.currentTurn][i][1], this.storedTurnsArray[this.currentTurn][i][2]);

            }
            else if (this.storedTurnsArray[this.currentTurn][i][0] == 't') {
                this.addNonInteractiveRock(this.storedTurnsArray[this.currentTurn][i][1], this.storedTurnsArray[this.currentTurn][i][2]);
            }
        }
    }
    else {
        this.currentTurn = 0;
    }
    if (this.currentTurn == this.playTurns.length) {
        $('#nxtButton').hide('slow');
        $('#autoplayButton').trigger('click');
    }
    else if (!$("#nxtButton").is(':visible')) {
        $('#nxtButton').show('slow');
    }
    if (this.currentTurn == 0) {
        $('#prvButton').hide('slow');
    }
    else if (!$("#prvButton").is(':visible')) {
        $('#prvButton').show('slow');
    }
    // $('#turnsLeft').text(this.param.turns - this.currentTurn);
    this.param.turnsLeft.innerHTML = this.param.turns - this.currentTurn;
    //  console.log('after prv move:' + this.gameArea.fieldRockColumnMatrix[tmpx][tmpy].currentHeight);
    this.inPrvMove = false;
}

GameOfTrolls.prototype.updateScores = function () {
    this.param.robotScoreContainer.innerHTML = this.robotScore;
    this.param.trollScoreContainer.innerHTML = this.trollScore;
}

GameOfTrolls.prototype.updateTurn = function () {
    if (this.trollTurn) {
        this.param.turnContainer.innerHTML = "Troll";
    }
    else this.param.turnContainer.innerHTML = "Robot";
}
GameOfTrolls.prototype.update = function () {
    controls.update();
    Sim.App.prototype.update.call(this);
}

GameOfTrolls.prototype.createCameraControls = function () {
    controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls = controls;
}

GameOfTrolls.FIELD_SIZE = 2;
GameOfTrolls.GROUND_Y = -250;