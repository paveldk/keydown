(function () {

    var l, m;
    GameOfLife = function (param) {
        this.n = param.n || 20;
        this.size = param.size || GameField.CELL_HD_WIDTH;
        this.fieldWidth = param.n * param.size;

        this.foodPercentage = param.foodPercentage || 20;

        this.stage = new Kinetic.Stage({
            container: param.container,
            width: this.fieldWidth,
            height: this.fieldWidth
        });


        this.txtPlacedFood = param.txtPlacedFood;
        this.algoResult = [[[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1]], [[1, 0, 1], [0, 0, 2], [1, 1, 1], [1, 3, 1], [1, 0, 1]]];
    };

    GameOfLife.prototype = {
        init: function () {
            var that = this;

            that.mainLayer = new Kinetic.Layer();

            that.generateField();

            that.stage.add(that.mainLayer);
        },

        generateField: function () {
            var gameField = new GameField({
                n: this.n,
                size: this.size,
                fieldWidth: this.fieldWidth,
                mainLayer: this.mainLayer,
                foodPercentage: this.foodPercentage,
                txtPlacedFood: this.txtPlacedFood
            });
            gameField.init();
            this.stage.add(gameField.mainLayer);
            this.gameField = gameField;
        },

        updateGame: function (n) {

            var that = this;
            that.mainLayer.clear();
            if (n <= GameOfLife.MAX_HD) {
                that.fieldWidth = n * that.size;
                that.stage.setHeight(that.fieldWidth);
                that.stage.setWidth(that.fieldWidth);

                that.gameField.updateField(n);
            }
            else {
                that.fieldWidth = GameOfLife.MAX_WIDTH;
                that.stage.setHeight(that.fieldWidth);
                that.stage.setWidth(that.fieldWidth);

                that.gameField.updateField(n);
            }
        },

        playGame: function (a, b, c) {
            var that = this;
            console.log(that.gameField.fieldMatrix);

            res = AlgaeMainExperiment.init(a, b, c, that.gameField.fieldMatrix);
            console.log('result: ');
            console.log(res);
            that.updateGame(c);
            for (var i = 0; i < c; i++) {
                for (var j = 0; j < c; j++) {
                    if (res[i][j] != '0') {
                        if (res[i][j] == '+') {
                            that.gameField.addNonalga(j, i);
                        }
                        else {
                            that.gameField.addFood(j, i);
                        }
                    }
                }
            }
            that.gameField.mainLayer.add(that.gameField.foodGroup);
            that.gameField.mainLayer.draw();

            //            this.currentMove = 0;
            //            this.gameTimer = setInterval(function () {
            //                for (var i = 0; i < that.algoResult[that.currentMove].length; i++) {

            //                    l = that.algoResult[that.currentMove][i][0];
            //                    m = that.algoResult[that.currentMove][i][1];

            //                    if (that.gameField.fieldMatrix[l][m] != '0') {
            //                        that.gameField.fieldObjects[l][m].destroy();
            //                        that.gameField.fieldMatrix[l][m] = '0';
            //                        
            //                    }

            //                    if (that.algoResult[that.currentMove][i][2] == 1) {
            //                        that.gameField.addNonalga(m, l);
            //                    }
            //                }
            //                that.currentMove++;
            //                if (that.currentMove == that.algoResult.length) {
            //                    clearInterval(that.gameTimer);
            //                }
            //            }, 1000);
        },

        playAction: function (a) {
            var that = this;
            console.log('in playaction')
            console.log(res);
            this.algoResult = AlgaeExperiment.RunPavelRun(parseInt(a), res);
            console.log('run pavel')
            console.log(this.algoResult);
            this.currentMove = 0;
            this.gameTimer = setInterval(function () {
                for (var i = 0; i < that.algoResult[that.currentMove].length; i++) {

                    l = that.algoResult[that.currentMove][i][0];
                    m = that.algoResult[that.currentMove][i][1];

                    if (that.gameField.fieldMatrix[l][m] != '0') {
                        that.gameField.fieldObjects[l][m].destroy();
                        that.gameField.fieldMatrix[l][m] = '0';

                    }

                    if (that.algoResult[that.currentMove][i][2] == 1) {
                        that.gameField.addNonalga(m, l);
                    }
                }
                that.currentMove++;
                if (that.currentMove == that.algoResult.length) {
                    clearInterval(that.gameTimer);
                }
            }, 1000);
        }

    }
    GameOfLife.MAX_WIDTH = 375;
    GameOfLife.MAX_HD = 15;
    GameOfLife.MIN_FIELD_N = 3;
    GameOfLife.MAX_FIELD_N = 100;
})(jQuery);