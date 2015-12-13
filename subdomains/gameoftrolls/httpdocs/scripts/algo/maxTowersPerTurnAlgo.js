var MaxTowersPerTurnAlgo = function () { };

MaxTowersPerTurnAlgo.availableTurns = 0;
MaxTowersPerTurnAlgo.gameFieldSize = 0;
MaxTowersPerTurnAlgo.gameField = null;

MaxTowersPerTurnAlgo.relatedTowersBase = null;
MaxTowersPerTurnAlgo.relatedTowersSums = null;
MaxTowersPerTurnAlgo.relatedTowersTurnsCounts = null;
MaxTowersPerTurnAlgo.relatedTowersScores = null;

MaxTowersPerTurnAlgo.mMaxScoreTowerI = 0;
MaxTowersPerTurnAlgo.mMaxScoreTowerJ = 0;

MaxTowersPerTurnAlgo.mSecondMaxTowerValue = -3;
MaxTowersPerTurnAlgo.mSecondMaxTowerI = 0;
MaxTowersPerTurnAlgo.mSecondMaxTowerJ = 0;

MaxTowersPerTurnAlgo.mThirdMaxTowerValue = -4;
MaxTowersPerTurnAlgo.mThirdMaxTowerI = 0;
MaxTowersPerTurnAlgo.mThirdMaxTowerJ = 0;

MaxTowersPerTurnAlgo.mFourthMaxTowerValue = -5;
MaxTowersPerTurnAlgo.mFourthMaxTowerI = 0;
MaxTowersPerTurnAlgo.mFourthMaxTowerJ = 0;

MaxTowersPerTurnAlgo.removedBlocksCount = 0;

MaxTowersPerTurnAlgo.output = null;


MaxTowersPerTurnAlgo.get_GameField = function () {
    return MaxTowersPerTurnAlgo.gameField;
}
MaxTowersPerTurnAlgo.set_GameField = function (value) {
    MaxTowersPerTurnAlgo.gameField = value;
}
MaxTowersPerTurnAlgo.get_Output = function () {
    return MaxTowersPerTurnAlgo.output;
}
MaxTowersPerTurnAlgo.set_Output = function (value) {
    MaxTowersPerTurnAlgo.output = value;
}
MaxTowersPerTurnAlgo.get_RemovedBlocksCount = function () {
    return MaxTowersPerTurnAlgo.removedBlocksCount;
}
MaxTowersPerTurnAlgo.set_RemovedBlocksCount = function (value) {
    MaxTowersPerTurnAlgo.removedBlocksCount = value;
}

MaxTowersPerTurnAlgo.init = function () {
    if (MaxTowersPerTurnAlgo.gameFieldSize > 1) {

        MaxTowersPerTurnAlgo.evaluateGameField();

        if (MaxTowersPerTurnAlgo.gameFieldSize > 250) {

            while (MaxTowersPerTurnAlgo.availableTurns > 10 && (function () {
                MaxTowersPerTurnAlgo.mMaxScoreTowerI = { Value: MaxTowersPerTurnAlgo.mMaxScoreTowerI };
                MaxTowersPerTurnAlgo.mMaxScoreTowerJ = { Value: MaxTowersPerTurnAlgo.mMaxScoreTowerJ };
                var $res = MaxTowersPerTurnAlgo.getRelativeMaxTowerScore(MaxTowersPerTurnAlgo.relatedTowersScores, MaxTowersPerTurnAlgo.mMaxScoreTowerI, MaxTowersPerTurnAlgo.mMaxScoreTowerJ);
                MaxTowersPerTurnAlgo.mMaxScoreTowerI = MaxTowersPerTurnAlgo.mMaxScoreTowerI.Value;
                MaxTowersPerTurnAlgo.mMaxScoreTowerJ = MaxTowersPerTurnAlgo.mMaxScoreTowerJ.Value;
                return $res;
            })() > 1) {
                MaxTowersPerTurnAlgo.makeTurnSet();

                MaxTowersPerTurnAlgo.evaluateGameField();
            }
        }
        while (MaxTowersPerTurnAlgo.availableTurns > 0 && (function () {
            MaxTowersPerTurnAlgo.mMaxScoreTowerI = { Value: MaxTowersPerTurnAlgo.mMaxScoreTowerI };
            MaxTowersPerTurnAlgo.mMaxScoreTowerJ = { Value: MaxTowersPerTurnAlgo.mMaxScoreTowerJ };
            var $res = MaxTowersPerTurnAlgo.getExactMaxTowerScore(MaxTowersPerTurnAlgo.relatedTowersScores, MaxTowersPerTurnAlgo.mMaxScoreTowerI, MaxTowersPerTurnAlgo.mMaxScoreTowerJ);
            MaxTowersPerTurnAlgo.mMaxScoreTowerI = MaxTowersPerTurnAlgo.mMaxScoreTowerI.Value;
            MaxTowersPerTurnAlgo.mMaxScoreTowerJ = MaxTowersPerTurnAlgo.mMaxScoreTowerJ.Value;
            return $res;
        })() > 1 ) {
            MaxTowersPerTurnAlgo.makeTurnSet();

            MaxTowersPerTurnAlgo.evaluateGameField();
        }
    }
    if (MaxTowersPerTurnAlgo.availableTurns > 0) {
        MaxTowersPerTurnAlgo.makeSimpleTurn();

        MaxTowersPerTurnAlgo.evaluateGameField();
    }
    var endSum = MaxTowersPerTurnAlgo.getEndSum();
    MaxTowersPerTurnAlgo.set_RemovedBlocksCount(MainAlgo.initialFieldSum - endSum);
};


MaxTowersPerTurnAlgo.initArrays = function () {
    MaxTowersPerTurnAlgo.availableTurns = MainAlgo.get_AvailableTurns();
    MaxTowersPerTurnAlgo.gameFieldSize = MainAlgo.get_GameFieldSize();
    MaxTowersPerTurnAlgo.gameField = [];
    MaxTowersPerTurnAlgo.relatedTowersSums = [];
    MaxTowersPerTurnAlgo.relatedTowersTurnsCounts = [];
    MaxTowersPerTurnAlgo.relatedTowersScores = [];
    MaxTowersPerTurnAlgo.relatedTowersBase = [];
    MaxTowersPerTurnAlgo.output = [];
    for (var i = 0; i < MaxTowersPerTurnAlgo.gameFieldSize; i++) {
        MaxTowersPerTurnAlgo.gameField[i] = [];
        MaxTowersPerTurnAlgo.relatedTowersSums[i] = [];
        MaxTowersPerTurnAlgo.relatedTowersTurnsCounts[i] = [];
        MaxTowersPerTurnAlgo.relatedTowersScores[i] = [];
        MaxTowersPerTurnAlgo.relatedTowersBase[i] = [];
    }
    for (var i = 0; i < MaxTowersPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxTowersPerTurnAlgo.gameFieldSize; j++) {
            MaxTowersPerTurnAlgo.relatedTowersScores[i][j] = 0;
        }
    }
};

MaxTowersPerTurnAlgo.getEndSum = function () {
    var endSum = 0;
    for (var i = 0; i < MaxTowersPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxTowersPerTurnAlgo.gameFieldSize; j++) {
            endSum += MaxTowersPerTurnAlgo.gameField[i][j];
        }
    }
    return endSum;
};

MaxTowersPerTurnAlgo.evaluateGameField = function () {
    for (var i = 0; i < MaxTowersPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxTowersPerTurnAlgo.gameFieldSize; j++) {
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(i, j);
        }
    }
};

MaxTowersPerTurnAlgo.evaluateRelatedTowers = function (centralTowerX, centralTowerY) {
    var towerPositionType = MaxTowersPerTurnAlgo.getTowerPositionType(centralTowerX, centralTowerY, MaxTowersPerTurnAlgo.gameFieldSize);
    var baseTowerHeight;
    switch (towerPositionType) {
        case 0:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1]);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1]);
            break;
        case 11:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            break;
        case 12:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            break;
        case 13:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0);
            break;
        case 14:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            break;
        case 213:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0, 0);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0, 0);
            break;
        case 214:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0, 0);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0, 0);
            break;
        case 223:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0, 0);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0, 0);
            break;
        case 224:
            baseTowerHeight = MaxTowersPerTurnAlgo.getBase(MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0, 0);
            MaxTowersPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxTowersPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0, 0);
            break;
        default:
            baseTowerHeight = -1;
            break;
    }
    MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerX][centralTowerY] = baseTowerHeight;
};

MaxTowersPerTurnAlgo.getBase = function (centralTower, relatedTower1, relatedTower2, relatedTower3, relatedTower4) {
    var relatedTowers = [];
    var baseValue;
    relatedTowers.push(centralTower);
    if (relatedTower1 != 0)
        relatedTowers.push(relatedTower1);
    if (relatedTower2 != 0)
        relatedTowers.push(relatedTower2);
    if (relatedTower3 != 0)
        relatedTowers.push(relatedTower3);
    if (relatedTower4 != 0)
        relatedTowers.push(relatedTower4);
    if (relatedTowers.length == 1) {
        baseValue = 0;
    }
    else {
        relatedTowers.sort(function (a, b) { return a - b })
        var mid = Math.floor((relatedTowers.length - 1) / 2);
        baseValue = relatedTowers[mid];
        if (baseValue == centralTower && relatedTowers.length > 2)
            baseValue = relatedTowers[mid + 1];
    }
    return baseValue;
};

MaxTowersPerTurnAlgo.updateRelatedTowersScore = function (centralTowerX, centralTowerY, baseTowerHeight, centralTower, relatedTower1, relatedTower2, relatedTower3, relatedTower4) {
    var relatedTowersSum;
    var relatedTowersTurnsCount;
    var relatedTowersScore;
    if (MaxTowersPerTurnAlgo.relatedTowersScores[centralTowerX][centralTowerY] > -1) {
        if (baseTowerHeight > centralTower) {
            relatedTowersSum = centralTower;
            relatedTowersTurnsCount = baseTowerHeight - centralTower;
            if (relatedTower1 > centralTower) {
                relatedTowersSum += relatedTower1;
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower1);
            }
            if (relatedTower2 > centralTower) {
                relatedTowersSum += relatedTower2;
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower2);
            }
            if (relatedTower3 > centralTower) {
                relatedTowersSum += relatedTower3;
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower3);
            }
            if (relatedTower4 > centralTower) {
                relatedTowersSum += relatedTower4;
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower4);
            }
        }
        else if (baseTowerHeight < centralTower) {
            relatedTowersSum = centralTower;
            relatedTowersTurnsCount = centralTower - baseTowerHeight;
            if (relatedTower1 < centralTower && relatedTower1 > 0) {
                relatedTowersSum += relatedTower1;
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower1);
            }
            if (relatedTower2 < centralTower && relatedTower2 > 0) {
                relatedTowersSum += relatedTower2;
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower2);
            }
            if (relatedTower3 < centralTower && relatedTower3 > 0) {
                relatedTowersSum += relatedTower3;
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower3);
            }
            if (relatedTower4 < centralTower && relatedTower4 > 0) {
                relatedTowersSum += relatedTower4;
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower4);
            }
        }
        else {
            relatedTowersSum = centralTower + relatedTower1 + relatedTower2 + relatedTower3 + relatedTower4;
            relatedTowersTurnsCount = 0;
            if (relatedTower1 > 0) {
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower1);
            }
            if (relatedTower2 > 0) {
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower2);
            }
            if (relatedTower3 > 0) {
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower3);
            }
            if (relatedTower4 > 0) {
                relatedTowersTurnsCount += Math.abs(baseTowerHeight - relatedTower4);
            }
        }
        MaxTowersPerTurnAlgo.relatedTowersSums[centralTowerX][centralTowerY] = relatedTowersSum;
        MaxTowersPerTurnAlgo.relatedTowersTurnsCounts[centralTowerX][centralTowerY] = relatedTowersTurnsCount;
        if (relatedTowersTurnsCount <= MaxTowersPerTurnAlgo.availableTurns) {
            relatedTowersScore = relatedTowersSum / relatedTowersTurnsCount;
            if (!isNaN(relatedTowersScore)) {
                MaxTowersPerTurnAlgo.relatedTowersScores[centralTowerX][centralTowerY] = relatedTowersScore;
            }
            else {
                MaxTowersPerTurnAlgo.relatedTowersScores[centralTowerX][centralTowerY] = -2;
            }
        }
        else {
            MaxTowersPerTurnAlgo.relatedTowersScores[centralTowerX][centralTowerY] = -1;
        }
    }
};

MaxTowersPerTurnAlgo.getTowerPositionType = function (x, y, squareMatrixSize) {
    if (x > 0 && x < squareMatrixSize - 1 && y > 0 && y < squareMatrixSize - 1) {
        return 0;
    }
    else if (x == 0 && y > 0 && y < squareMatrixSize - 1) {
        return 11;
    }
    else if (x == squareMatrixSize - 1 && y > 0 && y < squareMatrixSize - 1) {
        return 12;
    }
    else if (x > 0 && x < squareMatrixSize - 1 && y == 0) {
        return 13;
    }
    else if (x > 0 && x < squareMatrixSize - 1 && y == squareMatrixSize - 1) {
        return 14;
    }
    else if (x == 0 && y == 0) {
        return 213;
    }
    else if (x == 0 && y == squareMatrixSize - 1) {
        return 214;
    }
    else if (x == squareMatrixSize - 1 && y == 0) {
        return 223;
    }
    else if (x == squareMatrixSize - 1 && y == squareMatrixSize - 1) {
        return 224;
    }
    else
        return 3;
};

MaxTowersPerTurnAlgo.makeTurnSet = function () {
    var maxScoreTowerI = MaxTowersPerTurnAlgo.mMaxScoreTowerI;
    var maxScoreTowerJ = MaxTowersPerTurnAlgo.mMaxScoreTowerJ;
    if (MaxTowersPerTurnAlgo.relatedTowersTurnsCounts[maxScoreTowerI][maxScoreTowerJ] <= MaxTowersPerTurnAlgo.availableTurns) {
        var towerPositionType = MaxTowersPerTurnAlgo.getTowerPositionType(maxScoreTowerI, maxScoreTowerJ, MaxTowersPerTurnAlgo.gameFieldSize);
        switch (towerPositionType) {
            case 0:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 11:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 12:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 13:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 14:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 213:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 214:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 223:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 224:
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxTowersPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxTowersPerTurnAlgo.resetTowerTwoParam(maxScoreTowerI, maxScoreTowerJ);
                break;
            default:
                break;
        }
        MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI + 1, maxScoreTowerJ, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI + 1, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI - 1, maxScoreTowerJ, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI - 1, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI, maxScoreTowerJ + 1, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ + 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI, maxScoreTowerJ - 1, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ - 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI - 2, maxScoreTowerJ, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI - 2, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI - 1, maxScoreTowerJ + 1, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI - 1, maxScoreTowerJ + 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI, maxScoreTowerJ + 2, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ + 2);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI + 1, maxScoreTowerJ + 1, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI + 1, maxScoreTowerJ + 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI + 2, maxScoreTowerJ, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI + 2, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI + 1, maxScoreTowerJ - 1, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI + 1, maxScoreTowerJ - 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI, maxScoreTowerJ - 2, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ - 2);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI - 1, maxScoreTowerJ - 1, MaxTowersPerTurnAlgo.gameFieldSize))
            MaxTowersPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI - 1, maxScoreTowerJ - 1);
    }
    else {
        MaxTowersPerTurnAlgo.relatedTowersScores[maxScoreTowerI][maxScoreTowerJ] = -1;
    }
};

MaxTowersPerTurnAlgo.makeSimpleTurn = function () {
    for (var i = 0; i < MaxTowersPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxTowersPerTurnAlgo.gameFieldSize; j++) {
            while (MaxTowersPerTurnAlgo.availableTurns > 0 && MaxTowersPerTurnAlgo.gameField[i][j] > 0 ) {
                MaxTowersPerTurnAlgo.output.push(['t',i,j]);
                MaxTowersPerTurnAlgo.gameField[i][j]--;
                MaxTowersPerTurnAlgo.availableTurns--;
            }
        }
    }
};

MaxTowersPerTurnAlgo.resetTower = function (centralTowerI, centralTowerJ, towerI, towerJ) {
    var loopBound = 0;
    if (MaxTowersPerTurnAlgo.gameField[centralTowerI][centralTowerJ] > MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) {
        if (MaxTowersPerTurnAlgo.gameField[centralTowerI][centralTowerJ] > MaxTowersPerTurnAlgo.gameField[towerI][towerJ]) {
            if (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] > MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) {
                loopBound = (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] - MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) - MaxTowersPerTurnAlgo.GetProblematicSurroundingTowersDifference(centralTowerI, centralTowerJ, towerI, towerJ);
                for (var i = 0; i < loopBound; i++) {
                    MaxTowersPerTurnAlgo.output.push(['t', towerI, towerJ]);
                    MaxTowersPerTurnAlgo.availableTurns--;
                }
            }
            else if (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] < MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ] && MaxTowersPerTurnAlgo.gameField[towerI][towerJ] > 0) {
                loopBound = (MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ] - MaxTowersPerTurnAlgo.gameField[towerI][towerJ]) - MaxTowersPerTurnAlgo.getProblematicSurroundingTowersDifference(centralTowerI, centralTowerJ, towerI, towerJ);
                for (var i = 0; i < loopBound; i++) {
                    MaxTowersPerTurnAlgo.output.push(['p', towerI, towerJ]);
                    MaxTowersPerTurnAlgo.availableTurns--;
                }
            }
            MaxTowersPerTurnAlgo.gameField[towerI][towerJ] = 0;
        }
    }
    else if (MaxTowersPerTurnAlgo.gameField[centralTowerI][centralTowerJ] < MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) {
        if (MaxTowersPerTurnAlgo.gameField[centralTowerI][centralTowerJ] < MaxTowersPerTurnAlgo.gameField[towerI][towerJ]) {
            if (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] > MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) {
                loopBound = (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] - MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) - MaxTowersPerTurnAlgo.getProblematicSurroundingTowersDifference(centralTowerI, centralTowerJ, towerI, towerJ);
                for (var i = 0; i < loopBound; i++) {
                    MaxTowersPerTurnAlgo.output.push(['t', towerI, towerJ]);
                    MaxTowersPerTurnAlgo.availableTurns--;
                }
            }
            else if (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] < MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) {
                loopBound = (MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ] - MaxTowersPerTurnAlgo.gameField[towerI][towerJ]) - MaxTowersPerTurnAlgo.getProblematicSurroundingTowersDifference(centralTowerI, centralTowerJ, towerI, towerJ);
                for (var i = 0; i < loopBound; i++) {
                    MaxTowersPerTurnAlgo.output.push(['p', towerI, towerJ]);
                    MaxTowersPerTurnAlgo.availableTurns--;
                }
            }
            MaxTowersPerTurnAlgo.gameField[towerI][towerJ] = 0;
        }
    }
    else {
        if (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] > MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) {
            loopBound = (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] - MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ]) - MaxTowersPerTurnAlgo.getProblematicSurroundingTowersDifference(centralTowerI, centralTowerJ, towerI, towerJ);
            for (var i = 0; i < loopBound; i++) {
                MaxTowersPerTurnAlgo.output.push(['t', towerI, towerJ]);
                MaxTowersPerTurnAlgo.availableTurns--;
            }
        }
        else if (MaxTowersPerTurnAlgo.gameField[towerI][towerJ] < MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ] && MaxTowersPerTurnAlgo.gameField[towerI][towerJ] > 0) {
            loopBound = (MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ] - MaxTowersPerTurnAlgo.gameField[towerI][towerJ]) - MaxTowersPerTurnAlgo.getProblematicSurroundingTowersDifference(centralTowerI, centralTowerJ, towerI, towerJ);
            for (var i = 0; i < loopBound; i++) {
                MaxTowersPerTurnAlgo.output.push(['p', towerI, towerJ]);
                MaxTowersPerTurnAlgo.availableTurns--;
            }
        }
        MaxTowersPerTurnAlgo.gameField[towerI][towerJ] = 0;
    }
};

MaxTowersPerTurnAlgo.getProblematicSurroundingTowersDifference = function (centralTowerI, centralTowerJ, towerI, towerJ) {
    var towerPositionType = MaxTowersPerTurnAlgo.getTowerPositionType(towerI, towerJ, MaxTowersPerTurnAlgo.gameFieldSize);
    var baseTower = MaxTowersPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ];
    var relatedTower = MaxTowersPerTurnAlgo.gameField[towerI][towerJ];
    var turnsSavedLeft = -1;
    var turnsSavedRight = -1;
    var turnsSavedUp = -1;
    var turnsSavedDown = -1;
    var maxTurnsSaved = -1;
    switch (towerPositionType) {
        case 0:
            if (centralTowerI != towerI + 1)
                (function () {
                    turnsSavedDown = { Value: turnsSavedDown };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI + 1, towerJ, turnsSavedDown);
                    turnsSavedDown = turnsSavedDown.Value;
                    return $res;
                })();
            if (centralTowerI != towerI - 1)
                (function () {
                    turnsSavedUp = { Value: turnsSavedUp };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI - 1, towerJ, turnsSavedUp);
                    turnsSavedUp = turnsSavedUp.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ + 1)
                (function () {
                    turnsSavedRight = { Value: turnsSavedRight };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ + 1, turnsSavedRight);
                    turnsSavedRight = turnsSavedRight.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ - 1)
                (function () {
                    turnsSavedLeft = { Value: turnsSavedLeft };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ - 1, turnsSavedLeft);
                    turnsSavedLeft = turnsSavedLeft.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedDown, turnsSavedUp, turnsSavedRight, turnsSavedLeft);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedDown)
                    MaxTowersPerTurnAlgo.gameField[towerI + 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedUp)
                    MaxTowersPerTurnAlgo.gameField[towerI - 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedRight)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ + 1] = 0;
                if (maxTurnsSaved == turnsSavedLeft)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ - 1] = 0;
            }
            break;
        case 11:
            if (centralTowerI != towerI + 1)
                (function () {
                    turnsSavedDown = { Value: turnsSavedDown };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI + 1, towerJ, turnsSavedDown);
                    turnsSavedDown = turnsSavedDown.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ + 1)
                (function () {
                    turnsSavedRight = { Value: turnsSavedRight };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ + 1, turnsSavedRight);
                    turnsSavedRight = turnsSavedRight.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ - 1)
                (function () {
                    turnsSavedLeft = { Value: turnsSavedLeft };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ - 1, turnsSavedLeft);
                    turnsSavedLeft = turnsSavedLeft.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedDown, turnsSavedRight, turnsSavedLeft, -1);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedDown)
                    MaxTowersPerTurnAlgo.gameField[towerI + 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedRight)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ + 1] = 0;
                if (maxTurnsSaved == turnsSavedLeft)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ - 1] = 0;
            }
            break;
        case 12:
            if (centralTowerI != towerI - 1)
                (function () {
                    turnsSavedUp = { Value: turnsSavedUp };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI - 1, towerJ, turnsSavedUp);
                    turnsSavedUp = turnsSavedUp.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ + 1)
                (function () {
                    turnsSavedRight = { Value: turnsSavedRight };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ + 1, turnsSavedRight);
                    turnsSavedRight = turnsSavedRight.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ - 1)
                (function () {
                    turnsSavedLeft = { Value: turnsSavedLeft };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ - 1, turnsSavedLeft);
                    turnsSavedLeft = turnsSavedLeft.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedUp, turnsSavedRight, turnsSavedLeft, -1);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedUp)
                    MaxTowersPerTurnAlgo.gameField[towerI - 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedRight)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ + 1] = 0;
                if (maxTurnsSaved == turnsSavedLeft)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ - 1] = 0;
            }
            break;
        case 13:
            if (centralTowerI != towerI + 1)
                (function () {
                    turnsSavedDown = { Value: turnsSavedDown };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI + 1, towerJ, turnsSavedDown);
                    turnsSavedDown = turnsSavedDown.Value;
                    return $res;
                })();
            if (centralTowerI != towerI - 1)
                (function () {
                    turnsSavedUp = { Value: turnsSavedUp };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI - 1, towerJ, turnsSavedUp);
                    turnsSavedUp = turnsSavedUp.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ + 1)
                (function () {
                    turnsSavedRight = { Value: turnsSavedRight };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ + 1, turnsSavedRight);
                    turnsSavedRight = turnsSavedRight.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedDown, turnsSavedUp, turnsSavedRight, -1);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedDown)
                    MaxTowersPerTurnAlgo.gameField[towerI + 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedUp)
                    MaxTowersPerTurnAlgo.gameField[towerI - 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedRight)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ + 1] = 0;
            }
            break;
        case 14:
            if (centralTowerI != towerI + 1)
                (function () {
                    turnsSavedDown = { Value: turnsSavedDown };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI + 1, towerJ, turnsSavedDown);
                    turnsSavedDown = turnsSavedDown.Value;
                    return $res;
                })();
            if (centralTowerI != towerI - 1)
                (function () {
                    turnsSavedUp = { Value: turnsSavedUp };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI - 1, towerJ, turnsSavedUp);
                    turnsSavedUp = turnsSavedUp.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ - 1)
                (function () {
                    turnsSavedLeft = { Value: turnsSavedLeft };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ - 1, turnsSavedLeft);
                    turnsSavedLeft = turnsSavedLeft.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedDown, turnsSavedUp, turnsSavedLeft, -1);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedDown)
                    MaxTowersPerTurnAlgo.gameField[towerI + 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedUp)
                    MaxTowersPerTurnAlgo.gameField[towerI - 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedLeft)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ - 1] = 0;
            }
            break;
        case 213:
            if (centralTowerI != towerI + 1)
                (function () {
                    turnsSavedDown = { Value: turnsSavedDown };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI + 1, towerJ, turnsSavedDown);
                    turnsSavedDown = turnsSavedDown.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ + 1)
                (function () {
                    turnsSavedRight = { Value: turnsSavedRight };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ + 1, turnsSavedRight);
                    turnsSavedRight = turnsSavedRight.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedDown, turnsSavedRight, -1, -1);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedDown)
                    MaxTowersPerTurnAlgo.gameField[towerI + 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedRight)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ + 1] = 0;
            }
            break;
        case 214:
            if (centralTowerI != towerI + 1)
                (function () {
                    turnsSavedDown = { Value: turnsSavedDown };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI + 1, towerJ, turnsSavedDown);
                    turnsSavedDown = turnsSavedDown.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ - 1)
                (function () {
                    turnsSavedLeft = { Value: turnsSavedLeft };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ - 1, turnsSavedLeft);
                    turnsSavedLeft = turnsSavedLeft.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedDown, turnsSavedLeft, -1, -1);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedDown)
                    MaxTowersPerTurnAlgo.gameField[towerI + 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedLeft)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ - 1] = 0;
            }
            break;
        case 223:
            if (centralTowerI != towerI - 1)
                (function () {
                    turnsSavedUp = { Value: turnsSavedUp };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI - 1, towerJ, turnsSavedUp);
                    turnsSavedUp = turnsSavedUp.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ + 1)
                (function () {
                    turnsSavedRight = { Value: turnsSavedRight };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ + 1, turnsSavedRight);
                    turnsSavedRight = turnsSavedRight.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedUp, turnsSavedRight, -1, -1);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedUp)
                    MaxTowersPerTurnAlgo.gameField[towerI - 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedRight)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ + 1] = 0;
            }
            break;
        case 224:
            if (centralTowerI != towerI - 1)
                (function () {
                    turnsSavedUp = { Value: turnsSavedUp };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI - 1, towerJ, turnsSavedUp);
                    turnsSavedUp = turnsSavedUp.Value;
                    return $res;
                })();
            if (centralTowerJ != towerJ - 1)
                (function () {
                    turnsSavedLeft = { Value: turnsSavedLeft };
                    var $res = MaxTowersPerTurnAlgo.checkSurroundingTowerHeight(relatedTower, baseTower, towerI, towerJ - 1, turnsSavedLeft);
                    turnsSavedLeft = turnsSavedLeft.Value;
                    return $res;
                })();
            maxTurnsSaved = MaxTowersPerTurnAlgo.getMaxTurnsSaved(turnsSavedUp, turnsSavedLeft, -1, -1);
            if (maxTurnsSaved >= 0) {
                if (maxTurnsSaved == turnsSavedUp)
                    MaxTowersPerTurnAlgo.gameField[towerI - 1][towerJ] = 0;
                if (maxTurnsSaved == turnsSavedLeft)
                    MaxTowersPerTurnAlgo.gameField[towerI][towerJ - 1] = 0;
            }
            break;
        default:
            break;
    }
    return (maxTurnsSaved < 0) ? 0 : maxTurnsSaved;
};

MaxTowersPerTurnAlgo.checkSurroundingTowerHeight = function (relatedTower, baseTower, surroundingTowerI, surroundingTowerJ, turnsSaved) {
    turnsSaved.Value = -1;
    if (relatedTower > baseTower) {
        if (MaxTowersPerTurnAlgo.gameField[surroundingTowerI][surroundingTowerJ] < relatedTower && MaxTowersPerTurnAlgo.gameField[surroundingTowerI][surroundingTowerJ] >= baseTower) {
            turnsSaved.Value = MaxTowersPerTurnAlgo.gameField[surroundingTowerI][surroundingTowerJ] - baseTower;
        }
    }
    else if (relatedTower < baseTower) {
        if (MaxTowersPerTurnAlgo.gameField[surroundingTowerI][surroundingTowerJ] > relatedTower && MaxTowersPerTurnAlgo.gameField[surroundingTowerI][surroundingTowerJ] <= baseTower) {
            turnsSaved.Value = baseTower - MaxTowersPerTurnAlgo.gameField[surroundingTowerI][surroundingTowerJ];
        }
    }
};

MaxTowersPerTurnAlgo.getMaxTurnsSaved = function (turns1, turns2, turns3, turns4) {
    var turnsSavedArray = [turns1, turns2, turns3, turns4];
    var maxTurnsSaved = -1;
    for (var i = 0; i < turnsSavedArray.length; i++) {
        if (maxTurnsSaved < turnsSavedArray[i])
            maxTurnsSaved = turnsSavedArray[i];
    }
    return maxTurnsSaved;
};

MaxTowersPerTurnAlgo.resetTowerTwoParam = function (maxTowerI, maxTowerJ) {
    if (MaxTowersPerTurnAlgo.gameField[maxTowerI][maxTowerJ] > MaxTowersPerTurnAlgo.relatedTowersBase[maxTowerI][maxTowerJ]) {
        for (var i = 0; i < MaxTowersPerTurnAlgo.gameField[maxTowerI][maxTowerJ] - MaxTowersPerTurnAlgo.relatedTowersBase[maxTowerI][maxTowerJ]; i++) {
            MaxTowersPerTurnAlgo.output.push(['t', maxTowerI, maxTowerJ]);
            MaxTowersPerTurnAlgo.availableTurns--;
        }
        MaxTowersPerTurnAlgo.gameField[maxTowerI][maxTowerJ] = 0;
    }
    else if (MaxTowersPerTurnAlgo.gameField[maxTowerI][maxTowerJ] < MaxTowersPerTurnAlgo.relatedTowersBase[maxTowerI][maxTowerJ]) {
        for (var i = 0; i < MaxTowersPerTurnAlgo.relatedTowersBase[maxTowerI][maxTowerJ] - MaxTowersPerTurnAlgo.gameField[maxTowerI][maxTowerJ]; i++) {
            MaxTowersPerTurnAlgo.output.push(['p', maxTowerI, maxTowerJ]);
            MaxTowersPerTurnAlgo.availableTurns--;
        }
        MaxTowersPerTurnAlgo.gameField[maxTowerI][maxTowerJ] = 0;
    }
    else {
        MaxTowersPerTurnAlgo.gameField[maxTowerI][maxTowerJ] = 0;
    }
};

MaxTowersPerTurnAlgo.getRelativeMaxTowerScore = function (relatedTowersScores, maxTowerI, maxTowerJ) {
    if (MaxTowersPerTurnAlgo.mSecondMaxTowerValue == relatedTowersScores[MaxTowersPerTurnAlgo.mSecondMaxTowerI][MaxTowersPerTurnAlgo.mSecondMaxTowerJ]) {
        maxTowerI.Value = MaxTowersPerTurnAlgo.mSecondMaxTowerI;
        maxTowerJ.Value = MaxTowersPerTurnAlgo.mSecondMaxTowerJ;
        return MaxTowersPerTurnAlgo.mSecondMaxTowerValue;
    }
    if (MaxTowersPerTurnAlgo.mThirdMaxTowerValue == relatedTowersScores[MaxTowersPerTurnAlgo.mThirdMaxTowerI][MaxTowersPerTurnAlgo.mThirdMaxTowerJ]) {
        maxTowerI.Value = MaxTowersPerTurnAlgo.mThirdMaxTowerI;
        maxTowerJ.Value = MaxTowersPerTurnAlgo.mThirdMaxTowerJ;
        return MaxTowersPerTurnAlgo.mThirdMaxTowerValue;
    }
    if (MaxTowersPerTurnAlgo.mFourthMaxTowerValue == relatedTowersScores[MaxTowersPerTurnAlgo.mFourthMaxTowerI][MaxTowersPerTurnAlgo.mFourthMaxTowerJ]) {
        maxTowerI.Value = MaxTowersPerTurnAlgo.mFourthMaxTowerI;
        maxTowerJ.Value = MaxTowersPerTurnAlgo.mFourthMaxTowerJ;
        return MaxTowersPerTurnAlgo.mFourthMaxTowerValue;
    }
    var maxValue = -2;
    maxTowerI.Value = 0;
    maxTowerJ.Value = 0;
    var secondMaxTowerValue = -3;
    var secondMaxTowerI = 0;
    var secondMaxTowerJ = 0;
    var thirdMaxTowerValue = -4;
    var thirdMaxTowerI = 0;
    var thirdMaxTowerJ = 0;
    var fourthMaxTowerValue = -5;
    var fourthMaxTowerI = 0;
    var fourthMaxTowerJ = 0;
    for (var i = 0; i < MaxTowersPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxTowersPerTurnAlgo.gameFieldSize; j++) {
            if (maxValue <= relatedTowersScores[i][j] && (MaxTowersPerTurnAlgo.relatedTowersTurnsCounts[i][j] <= MaxTowersPerTurnAlgo.availableTurns)) {
                fourthMaxTowerValue = thirdMaxTowerValue;
                fourthMaxTowerI = thirdMaxTowerI;
                fourthMaxTowerJ = thirdMaxTowerJ;
                thirdMaxTowerValue = secondMaxTowerValue;
                thirdMaxTowerI = secondMaxTowerI;
                thirdMaxTowerJ = secondMaxTowerJ;
                secondMaxTowerValue = maxValue;
                secondMaxTowerI = maxTowerI.Value;
                secondMaxTowerJ = maxTowerJ.Value;
                maxValue = relatedTowersScores[i][j];
                maxTowerI.Value = i;
                maxTowerJ.Value = j;
            }
        }
    }
    MaxTowersPerTurnAlgo.mSecondMaxTowerValue = secondMaxTowerValue;
    MaxTowersPerTurnAlgo.mSecondMaxTowerI = secondMaxTowerI;
    MaxTowersPerTurnAlgo.mSecondMaxTowerJ = secondMaxTowerJ;
    MaxTowersPerTurnAlgo.mThirdMaxTowerValue = thirdMaxTowerValue;
    MaxTowersPerTurnAlgo.mThirdMaxTowerI = thirdMaxTowerI;
    MaxTowersPerTurnAlgo.mThirdMaxTowerJ = thirdMaxTowerJ;
    MaxTowersPerTurnAlgo.mFourthMaxTowerValue = fourthMaxTowerValue;
    MaxTowersPerTurnAlgo.mFourthMaxTowerI = fourthMaxTowerI;
    MaxTowersPerTurnAlgo.mFourthMaxTowerJ = fourthMaxTowerJ;
    return maxValue;
};

MaxTowersPerTurnAlgo.printCurrentState = function (state, matrix) {
    console.log(state);
    for (var i = 0; i < MaxTowersPerTurnAlgo.gameFieldSize; i++) {
        var a = ""
        for (var j = 0; j < MaxTowersPerTurnAlgo.gameFieldSize; j++) {
            a += " " + matrix[i][j];
        }
        console.log(a);
    }
    console.log();
}

MaxTowersPerTurnAlgo.getExactMaxTowerScore = function (relatedTowersScores, maxTowerI, maxTowerJ) {
    var maxValue = -2;
    maxTowerI.Value = 0;
    maxTowerJ.Value = 0;
    for (var i = 0; i < MaxTowersPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxTowersPerTurnAlgo.gameFieldSize; j++) {
            if (maxValue < relatedTowersScores[i][j] && (MaxTowersPerTurnAlgo.relatedTowersTurnsCounts[i][j] <= MaxTowersPerTurnAlgo.availableTurns)) {
                maxValue = relatedTowersScores[i][j];
                maxTowerI.Value = i;
                maxTowerJ.Value = j;
            }
        }
    }
    return maxValue;
};

