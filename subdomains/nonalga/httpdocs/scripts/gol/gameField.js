(function () {
    var rnd, num, k , m;
    GameField = function (param) {
        this.size = param.size || GameField.CELL_HD_WIDTH;
        this.n = param.n || 20;

        this.foodPercentage = param.foodPercentage || 20;
        this.foodCount = 0;

        this.fieldWidth = param.fieldWidth;

        this.fieldMatrix = new Array(this.n);
        this.fieldObjects = new Array(this.n);

        this.mainLayer = param.mainLayer;

        this.foodGroup = new Kinetic.Group();
        this.gridGroup = new Kinetic.Group();

        this.back = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this.fieldWidth,
            height: this.fieldWidth,
            fill: "rgba(100, 100, 200, 0.2)"
        });

        this.images = {};
        this.animations = { holdPosition: [] };
        this.sources = { nonalga: 'images/nonalga.png', food: 'images/food.png' };
        this.nonalga = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this.size,
            height: this.size,
            fill: "#f00",
            stroke: "black",
            strokeWidth: 4
        });
        this.nonalgaBig = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this.size,
            height: this.size,
            fill: "#00f",
        });
        this.animNonalga = new Kinetic.Sprite();
        this.food = new Kinetic.Image();
        this.foodBig = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this.size,
            height: this.size,
            fill: "#0f0",
        });

        this.enableInteraction = false;
        this.flag = false;
        this.txtPlacedFood = param.txtPlacedFood;
    };

    GameField.prototype = {

        init: function () {

            var that = this;

            that.loadImages(that.sources);
            that.generateGrid();

            that.initMatrix();
            that.generateFood();

            that.generateNonalgaAnimationFrames();

            that.addInteraction(that.mainLayer, that.back);

        },

        generateGrid: function () {

            var that = this;

            that.gridGroup.removeChildren();
            that.mainLayer.removeChildren();
            that.mainLayer.clear();

            that.gridGroup.add(that.back);
            console.log(that.n);
            if(that.n <= GameField.MAX_NO_GRID ){
                for (i = 0; i < that.n + 1; i++) {
                    var I = i * that.size;
                    var l = new Kinetic.Line({
                        stroke: "#000",
                        points: [I, 0, I, that.fieldWidth]
                    });
                    that.gridGroup.add(l);
                }

                for (j = 0; j < that.n + 1; j++) {
                    var J = j * that.size;
                    var l2 = new Kinetic.Line({
                        stroke: "#000",
                        points: [0, J, that.fieldWidth, J]
                    });
                    that.gridGroup.add(l2);
                }
            }

            that.mainLayer.add(that.gridGroup);
            that.mainLayer.draw();
        },

        initMatrix: function () {

            this.fieldMatrix = new Array(this.n);
            this.fieldObjects = new Array(this.n)

            for (var i = 0; i < this.n; i++) {
                this.fieldMatrix[i] = new Array(this.n);
                this.fieldObjects[i] = new Array(this.n);
                for (var j = 0; j < this.n; j++) {
                    this.fieldMatrix[i][j] = '0';
                    this.fieldObjects[i][j] = '0';
                }
            }
        },

        generateFood: function () {

            this.initMatrix();
            this.foodGroup.removeChildren();

            var maxFood = parseInt(this.foodPercentage * 0.01 * this.n * this.n)
            this.foodCount = 0;

            this.generateGrid();

//            while(this.foodCount < maxFood)
//            {
//                for (var i = 0; i < this.n; i++) {
//                    for (var j = 0; j < this.n; j++) {

//                        if(this.fieldMatrix != 'F') {
//                            rnd = Math.floor((Math.random() * 100) + 0);

//                            if (rnd <= this.foodPercentage) {
//                                this.addFood(i, j);
//                                this.foodCount++;
//                            }
//                            if(this.foodCount == maxFood)
//                            {
//                                this.mainLayer.add(this.foodGroup);
//                                this.mainLayer.draw();
//                                return;
//                            }
//                        }
//                    }
//                }
//            }

            var tmpArray = new Array(this.n*this.n);
            for (var i = 0; i < tmpArray.length; i++) {
                tmpArray[i] = i;
            }
            
            tmpArray = this.shuffle(tmpArray);
            for (var i = 0; i < maxFood; i++) {
                num = tmpArray[i];
                k = parseInt(num / this.n);
                m = num % this.n;
                this.addFood(k,m);
            }
            this.mainLayer.add(this.foodGroup);
            this.mainLayer.draw();

        },

        shuffle: function(o){
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },

        generateNonalgaAnimationFrames: function () {
            for (var i = 0; i < 48; i++) {
                this.animations.holdPosition.push({
                    x: i * 25,
                    y: 0,
                    width: 25,
                    height: 25
                });
            }
        },

        loadImages: function (sources) {
            var that = this;
            var loadedImages = 0;
            var numImages = 0;
            for (var src in sources) {
                numImages++;
            }
            for (var src in sources) {
                that.images[src] = new Image();
                if (++loadedImages >= numImages) {

                    that.nonalga = new Image();
                    that.nonalga.src = that.sources.nonalga;

                    that.animNonalga = new Kinetic.Sprite({
                        x: 0,
                        y: 0,
                        image: that.nonalga,
                        animation: 'holdPosition',
                        animations: that.animations,
                        frameRate: 40
                    });

                    that.food = new Kinetic.Image({
                        x: 0,
                        y: 0,
                        image: that.images.food,
                        width: that.size,
                        height: that.size
                    });
                }
                that.images[src].src = sources[src];
            }
        },

        addInteraction: function (layer, grid_rect) {
            var that = this;


            grid_rect.off('mousedown');

            
            grid_rect.on('mousedown', function (e) {
                if(that.enableInteraction)
                {
                    var rx = Math.floor(e.layerX / that.size);
                    var ry = Math.floor(e.layerY / that.size);
                    that.addFood(rx, ry);
                    if(that.flag)
                    {
                        that.mainLayer.add(that.foodGroup);
                        that.flag = !that.flag;
                    }
                    that.mainLayer.draw();
                    var v = parseInt(that.txtPlacedFood.val());
                    that.txtPlacedFood.val(parseInt(v+1));
                }
            });
        },

        addNonalga: function (rx, ry) {
            var that = this;
            if(that.n <= GameOfLife.MAX_HD) {
                var r = that.animNonalga.clone({ x: rx * that.size,
                    y: ry * that.size,
                    width: that.size,
                    height: that.size
                });
            }
            else {
                var r = new Kinetic.Rect({ 
                    x: rx * that.size,
                    y: ry * that.size,
                    width: that.size,
                    height: that.size,
                    fill: '#00f'
                });
            }
            that.fieldMatrix[ry][rx] = '+';
            that.fieldObjects[ry][rx] = r;
            that.mainLayer.add(r);
            if(r.shapeType=='Rect')
            {
                that.mainLayer.draw();
            }
            else
            {
                r.start();
            }
        },

        addFood: function (rx, ry) {
            var that = this;
            if(that.n<=GameOfLife.MAX_HD){
                var r = that.food.clone({
                    x: rx * that.size,
                    y: ry * that.size,
                    width: that.size,
                    height: that.size
                });
            }
            else {
                var r = new Kinetic.Rect({
                    x: rx * that.size,
                    y: ry * that.size,
                    width: that.size,
                    height: that.size,
                    fill: "#0f0"
                });
            }

            that.fieldMatrix[ry][rx] = 'F';
            that.fieldObjects[ry][rx] = r;
            that.foodGroup.add(r);
        },

        updateField: function (n) {

            var that = this;
            that.n = n;

            if (n <= GameOfLife.MAX_HD) {
                that.size = GameField.CELL_HD_WIDTH;
                that.fieldWidth = n * that.size;
                that.size = GameField.CELL_HD_WIDTH;
            }
            else {
                that.fieldWidth = GameOfLife.MAX_WIDTH;
                that.size = that.fieldWidth / n;
            }

            that.back = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: that.fieldWidth,
                height: that.fieldWidth,
                fill: "rgba(100, 100, 200, 0.2)"
            });
            that.foodGroup.removeChildren();
            that.initMatrix();
            that.generateGrid();

            that.addInteraction(that.mainLayer, that.back);
        }
    }
    GameField.MAX_NO_GRID = 99;
    GameField.CELL_HD_WIDTH = 25;
})(jQuery);