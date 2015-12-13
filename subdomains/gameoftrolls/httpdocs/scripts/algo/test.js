var MaxBlocksPerTurnAlgo = function () { };

MaxBlocksPerTurnAlgo.availableTurns = 0;
MaxBlocksPerTurnAlgo.gameFieldSize = 0;
MaxBlocksPerTurnAlgo.gameField = null;

MaxBlocksPerTurnAlgo.relatedTowersBase = null;
MaxBlocksPerTurnAlgo.relatedTowersSums = null;
MaxBlocksPerTurnAlgo.relatedTowersTurnsCounts = null;
MaxBlocksPerTurnAlgo.relatedTowersScores = null;

MaxBlocksPerTurnAlgo.mMaxScoreTowerI = 0;
MaxBlocksPerTurnAlgo.mMaxScoreTowerJ = 0;

MaxBlocksPerTurnAlgo.mSecondMaxTowerValue = -3;
MaxBlocksPerTurnAlgo.mSecondMaxTowerI = 0;
MaxBlocksPerTurnAlgo.mSecondMaxTowerJ = 0;

MaxBlocksPerTurnAlgo.mThirdMaxTowerValue = -4;
MaxBlocksPerTurnAlgo.mThirdMaxTowerI = 0;
MaxBlocksPerTurnAlgo.mThirdMaxTowerJ = 0;

MaxBlocksPerTurnAlgo.mFourthMaxTowerValue = -5;
MaxBlocksPerTurnAlgo.mFourthMaxTowerI = 0;
MaxBlocksPerTurnAlgo.mFourthMaxTowerJ = 0;

MaxBlocksPerTurnAlgo.removedBlocksCount = 0;

MaxBlocksPerTurnAlgo.output = null;


MaxBlocksPerTurnAlgo.get_GameField = function () {
    return MaxBlocksPerTurnAlgo.gameField;
}
MaxBlocksPerTurnAlgo.set_GameField = function (value) {
    MaxBlocksPerTurnAlgo.gameField = value;
}

MaxBlocksPerTurnAlgo.get_Output = function () {
    return MaxBlocksPerTurnAlgo.output;
}
MaxBlocksPerTurnAlgo.set_Output = function (value) {
    MaxBlocksPerTurnAlgo.output = value;
}

MaxBlocksPerTurnAlgo.get_RemovedBlocksCount = function () {
    return MaxBlocksPerTurnAlgo.removedBlocksCount;
}
MaxBlocksPerTurnAlgo.set_RemovedBlocksCount = function (value) {
    MaxBlocksPerTurnAlgo.removedBlocksCount = value;
}

MaxBlocksPerTurnAlgo.init = function () {
    if (MaxBlocksPerTurnAlgo.gameFieldSize > 1) {

        MaxBlocksPerTurnAlgo.evaluateGameField();

        if (MaxBlocksPerTurnAlgo.gameFieldSize > 250) {
            while (MaxBlocksPerTurnAlgo.availableTurns > 10 && (function () {
                MaxBlocksPerTurnAlgo.mMaxScoreTowerI = { Value: MaxBlocksPerTurnAlgo.mMaxScoreTowerI };
                MaxBlocksPerTurnAlgo.mMaxScoreTowerJ = { Value: MaxBlocksPerTurnAlgo.mMaxScoreTowerJ };
                var $res = MaxBlocksPerTurnAlgo.getRelativeMaxTowerScore(MaxBlocksPerTurnAlgo.relatedTowersScores, MaxBlocksPerTurnAlgo.mMaxScoreTowerI, MaxBlocksPerTurnAlgo.mMaxScoreTowerJ);
                MaxBlocksPerTurnAlgo.mMaxScoreTowerI = MaxBlocksPerTurnAlgo.mMaxScoreTowerI.Value;
                MaxBlocksPerTurnAlgo.mMaxScoreTowerJ = MaxBlocksPerTurnAlgo.mMaxScoreTowerJ.Value;
                return $res;
            })() > 1) {
                MaxBlocksPerTurnAlgo.makeTurnSet();
            }
        }
        console.log((function () {
            MaxBlocksPerTurnAlgo.mMaxScoreTowerI = { Value: MaxBlocksPerTurnAlgo.mMaxScoreTowerI };
            MaxBlocksPerTurnAlgo.mMaxScoreTowerJ = { Value: MaxBlocksPerTurnAlgo.mMaxScoreTowerJ };
            var $res = MaxBlocksPerTurnAlgo.getExactMaxTowerScore(MaxBlocksPerTurnAlgo.relatedTowersScores, MaxBlocksPerTurnAlgo.mMaxScoreTowerI, MaxBlocksPerTurnAlgo.mMaxScoreTowerJ);
            MaxBlocksPerTurnAlgo.mMaxScoreTowerI = MaxBlocksPerTurnAlgo.mMaxScoreTowerI.Value;
            MaxBlocksPerTurnAlgo.mMaxScoreTowerJ = MaxBlocksPerTurnAlgo.mMaxScoreTowerJ.Value;
            console.log($res);
            return $res;
        })() > 1);


        console.log('in max');
        for (var i = 0; i < 10; i++) {
            var a = ""
            for (var j = 0; j < 10; j++) {
                a += " " + MaxBlocksPerTurnAlgo.get_GameField()[i][j];
            }
            console.log(a);
        }

        while (MaxBlocksPerTurnAlgo.availableTurns > 0 && (function () {
            MaxBlocksPerTurnAlgo.mMaxScoreTowerI = { Value: MaxBlocksPerTurnAlgo.mMaxScoreTowerI };
            MaxBlocksPerTurnAlgo.mMaxScoreTowerJ = { Value: MaxBlocksPerTurnAlgo.mMaxScoreTowerJ };
            var $res = MaxBlocksPerTurnAlgo.getExactMaxTowerScore(MaxBlocksPerTurnAlgo.relatedTowersScores, MaxBlocksPerTurnAlgo.mMaxScoreTowerI, MaxBlocksPerTurnAlgo.mMaxScoreTowerJ);
            MaxBlocksPerTurnAlgo.mMaxScoreTowerI = MaxBlocksPerTurnAlgo.mMaxScoreTowerI.Value;
            MaxBlocksPerTurnAlgo.mMaxScoreTowerJ = MaxBlocksPerTurnAlgo.mMaxScoreTowerJ.Value;
            return $res;
        })() > 1) {
            MaxBlocksPerTurnAlgo.makeTurnSet();
        }

        if (MaxBlocksPerTurnAlgo.availableTurns > 0) {
            MaxBlocksPerTurnAlgo.makeSimpleTurn();
        }

        var endSum = MaxBlocksPerTurnAlgo.getEndSum();
        MaxBlocksPerTurnAlgo.set_RemovedBlocksCount(MainAlgo.initialFieldSum - endSum);
    }


}

MaxBlocksPerTurnAlgo.initArrays = function () {
    MaxBlocksPerTurnAlgo.availableTurns = MainAlgo.get_AvailableTurns();
    MaxBlocksPerTurnAlgo.gameFieldSize = MainAlgo.get_GameFieldSize();
    MaxBlocksPerTurnAlgo.gameField = [];
    MaxBlocksPerTurnAlgo.relatedTowersSums = [];
    MaxBlocksPerTurnAlgo.relatedTowersTurnsCounts = [];
    MaxBlocksPerTurnAlgo.relatedTowersScores = [];
    MaxBlocksPerTurnAlgo.relatedTowersBase = [];
    MaxBlocksPerTurnAlgo.output = [];
    for (var i = 0; i < MaxBlocksPerTurnAlgo.gameFieldSize; i++) {
        MaxBlocksPerTurnAlgo.gameField[i] = [];
        MaxBlocksPerTurnAlgo.relatedTowersSums[i] = [];
        MaxBlocksPerTurnAlgo.relatedTowersTurnsCounts[i] = [];
        MaxBlocksPerTurnAlgo.relatedTowersScores[i] = [];
        MaxBlocksPerTurnAlgo.relatedTowersBase[i] = [];
        MaxBlocksPerTurnAlgo.output[i] = [];
    }
}

MaxBlocksPerTurnAlgo.getEndSum = function () {
    var endSum = 0;
    for (var i = 0; i < MaxBlocksPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxBlocksPerTurnAlgo.gameFieldSize; j++) {
            endSum += MaxBlocksPerTurnAlgo.gameField[i][j];
        }
    }
    return endSum;
}

MaxBlocksPerTurnAlgo.evaluateGameField = function () {
    for (var i = 0; i < MaxBlocksPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxBlocksPerTurnAlgo.gameFieldSize; j++) {
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(i, j);
        }
    }
}

MaxBlocksPerTurnAlgo.evaluateRelatedTowers = function (centralTowerX, centralTowerY) {
    var towerPositionType = MaxBlocksPerTurnAlgo.getTowerPositionType(centralTowerX, centralTowerY, MaxBlocksPerTurnAlgo.gameFieldSize);
    var baseTowerHeight;
    switch (towerPositionType) {
        case 0:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1]);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1]);
            break;
        case 11:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            break;
        case 12:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            break;
        case 13:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0);
            break;
        case 14:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0);
            break;
        case 213:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0, 0);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0, 0);
            break;
        case 214:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0, 0);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX + 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0, 0);
            break;
        case 223:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0, 0);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY + 1], 0, 0);
            break;
        case 224:
            baseTowerHeight = MaxBlocksPerTurnAlgo.getBase(MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0, 0);
            MaxBlocksPerTurnAlgo.updateRelatedTowersScore(centralTowerX, centralTowerY, baseTowerHeight, MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX - 1][centralTowerY], MaxBlocksPerTurnAlgo.gameField[centralTowerX][centralTowerY - 1], 0, 0);
            break;
        default:
            baseTowerHeight = -1;
            break;
    }
    MaxBlocksPerTurnAlgo.relatedTowersBase[centralTowerX][centralTowerY] = baseTowerHeight;
}

MaxBlocksPerTurnAlgo.getTowerPositionType = function (x, y, squareMatrixSize) {
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

MaxBlocksPerTurnAlgo.getBase = function (centralTower, relatedTower1, relatedTower2, relatedTower3, relatedTower4) {
    var baseValue;
    var towersCount = 1;
    var relatedTowersArray = [];
    relatedTowersArray[0] = centralTower;
    relatedTowersArray[1] = relatedTower1;
    relatedTowersArray[2] = relatedTower2;
    relatedTowersArray[3] = relatedTower3;
    relatedTowersArray[4] = relatedTower4;
    if (relatedTower1 > 0)
        towersCount++;
    if (relatedTower2 > 0)
        towersCount++;
    if (relatedTower3 > 0)
        towersCount++;
    if (relatedTower4 > 0)
        towersCount++;
    if (towersCount == 1) {
        baseValue = 0;
    }
    else {
        var minDifference = 1000;
        var currentDifference;
        for (var i = 1; i < relatedTowersArray.length; i++) {
            if (relatedTowersArray[i] == 0)
                continue;
            currentDifference = relatedTowersArray[0] - relatedTowersArray[i];
            if (Math.abs(currentDifference) < Math.abs(minDifference)) {
                minDifference = currentDifference;
            }
            else if (Math.abs(currentDifference) == Math.abs(minDifference) && currentDifference < 0) {
                minDifference = currentDifference;
            }
        }
        baseValue = relatedTowersArray[0] - minDifference;
    }
    return baseValue;
};

MaxBlocksPerTurnAlgo.updateRelatedTowersScore = function (centralTowerX, centralTowerY, baseTowerHeight, centralTower, relatedTower1, relatedTower2, relatedTower3, relatedTower4) {
    var relatedTowersSum;
    var relatedTowersTurnsCount;
    var relatedTowersScore;
    if (MaxBlocksPerTurnAlgo.relatedTowersScores[centralTowerX][centralTowerY] > -1) {
        if (baseTowerHeight > centralTower) {
            relatedTowersSum = centralTower;
            relatedTowersTurnsCount = baseTowerHeight - centralTower;
            if (relatedTower1 == baseTowerHeight) {
                relatedTowersSum += relatedTower1;
            }
            if (relatedTower2 == baseTowerHeight) {
                relatedTowersSum += relatedTower2;
            }
            if (relatedTower3 == baseTowerHeight) {
                relatedTowersSum += relatedTower3;
            }
            if (relatedTower4 == baseTowerHeight) {
                relatedTowersSum += relatedTower4;
            }
        }
        else if (baseTowerHeight < centralTower) {
            relatedTowersSum = centralTower;
            relatedTowersTurnsCount = centralTower - baseTowerHeight;
            if (relatedTower1 == baseTowerHeight) {
                relatedTowersSum += relatedTower1;
            }
            if (relatedTower2 == baseTowerHeight) {
                relatedTowersSum += relatedTower2;
            }
            if (relatedTower3 == baseTowerHeight) {
                relatedTowersSum += relatedTower3;
            }
            if (relatedTower4 == baseTowerHeight) {
                relatedTowersSum += relatedTower4;
            }
        }
        else {
            relatedTowersSum = 0;
            relatedTowersTurnsCount = 0;
        }
        MaxBlocksPerTurnAlgo.relatedTowersSums[centralTowerX][centralTowerY] = relatedTowersSum;
        MaxBlocksPerTurnAlgo.relatedTowersTurnsCounts[centralTowerX][centralTowerY] = relatedTowersTurnsCount;
        if (relatedTowersTurnsCount <= MaxBlocksPerTurnAlgo.availableTurns) {
            relatedTowersScore = relatedTowersSum / relatedTowersTurnsCount;
            if (!System.Single.IsNaN(relatedTowersScore)) {
                MaxBlocksPerTurnAlgo.relatedTowersScores[centralTowerX][centralTowerY] = relatedTowersScore;
            }
            else {
                MaxBlocksPerTurnAlgo.relatedTowersScores[centralTowerX][centralTowerY] = -2;
            }
        }
        else {
            MaxBlocksPerTurnAlgo.relatedTowersScores[centralTowerX][centralTowerY] = -1;
        }
    }
};

MaxBlocksPerTurnAlgo.getRelativeMaxTowerScore = function (relatedTowersScores, maxTowerI, maxTowerJ) {
    if (MaxBlocksPerTurnAlgo.mSecondMaxTowerValue == relatedTowersScores[MaxBlocksPerTurnAlgo.mSecondMaxTowerI][MaxBlocksPerTurnAlgo.mSecondMaxTowerJ]) {
        maxTowerI.Value = MaxBlocksPerTurnAlgo.mSecondMaxTowerI;
        maxTowerJ.Value = MaxBlocksPerTurnAlgo.mSecondMaxTowerJ;
        return MaxBlocksPerTurnAlgo.mSecondMaxTowerValue;
    }
    if (MaxBlocksPerTurnAlgo.mThirdMaxTowerValue == relatedTowersScores[MaxBlocksPerTurnAlgo.mThirdMaxTowerI][MaxBlocksPerTurnAlgo.mThirdMaxTowerJ]) {
        maxTowerI.Value = MaxBlocksPerTurnAlgo.mThirdMaxTowerI;
        maxTowerJ.Value = MaxBlocksPerTurnAlgo.mThirdMaxTowerJ;
        return MaxBlocksPerTurnAlgo.mThirdMaxTowerValue;
    }
    if (MaxBlocksPerTurnAlgo.mFourthMaxTowerValue == relatedTowersScores[MaxBlocksPerTurnAlgo.mFourthMaxTowerI][MaxBlocksPerTurnAlgo.mFourthMaxTowerJ]) {
        maxTowerI.Value = MaxBlocksPerTurnAlgo.mFourthMaxTowerI;
        maxTowerJ.Value = MaxBlocksPerTurnAlgo.mFourthMaxTowerJ;
        return MaxBlocksPerTurnAlgo.mFourthMaxTowerValue;
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
    for (var i = 0; i < MaxBlocksPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxBlocksPerTurnAlgo.gameFieldSize; j++) {
            if (maxValue <= relatedTowersScores[i][j] && (MaxBlocksPerTurnAlgo.relatedTowersTurnsCounts[i][j] <= MaxBlocksPerTurnAlgo.availableTurns)) {
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
    MaxBlocksPerTurnAlgo.mSecondMaxTowerValue = secondMaxTowerValue;
    MaxBlocksPerTurnAlgo.mSecondMaxTowerI = secondMaxTowerI;
    MaxBlocksPerTurnAlgo.mSecondMaxTowerJ = secondMaxTowerJ;

    MaxBlocksPerTurnAlgo.mThirdMaxTowerValue = thirdMaxTowerValue;
    MaxBlocksPerTurnAlgo.mThirdMaxTowerI = thirdMaxTowerI;
    MaxBlocksPerTurnAlgo.mThirdMaxTowerJ = thirdMaxTowerJ;

    MaxBlocksPerTurnAlgo.mFourthMaxTowerValue = fourthMaxTowerValue;
    MaxBlocksPerTurnAlgo.mFourthMaxTowerI = fourthMaxTowerI;
    MaxBlocksPerTurnAlgo.mFourthMaxTowerJ = fourthMaxTowerJ;

    return maxValue;
};
MaxBlocksPerTurnAlgo.makeTurnSet = function () {
    var maxScoreTowerI = MaxBlocksPerTurnAlgo.mMaxScoreTowerI;
    var maxScoreTowerJ = MaxBlocksPerTurnAlgo.mMaxScoreTowerJ;
    if (MaxBlocksPerTurnAlgo.relatedTowersTurnsCounts[maxScoreTowerI][maxScoreTowerJ] <= MaxBlocksPerTurnAlgo.availableTurns) {
        var towerPositionType = MaxBlocksPerTurnAlgo.getTowerPositionType(maxScoreTowerI, maxScoreTowerJ, MaxBlocksPerTurnAlgo.gameFieldSize);
        switch (towerPositionType) {
            case 0:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 11:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 12:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 13:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 14:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 213:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 214:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI + 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 223:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ + 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            case 224:
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI - 1, maxScoreTowerJ);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ, maxScoreTowerI, maxScoreTowerJ - 1);
                MaxBlocksPerTurnAlgo.resetTower(maxScoreTowerI, maxScoreTowerJ);
                break;
            default:
                break;
        }
        MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI + 1, maxScoreTowerJ, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI + 1, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI - 1, maxScoreTowerJ, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI - 1, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI, maxScoreTowerJ + 1, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ + 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI, maxScoreTowerJ - 1, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ - 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI - 2, maxScoreTowerJ, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI - 2, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI - 1, maxScoreTowerJ + 1, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI - 1, maxScoreTowerJ + 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI, maxScoreTowerJ + 2, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ + 2);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI + 1, maxScoreTowerJ + 1, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI + 1, maxScoreTowerJ + 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI + 2, maxScoreTowerJ, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI + 2, maxScoreTowerJ);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI + 1, maxScoreTowerJ - 1, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI + 1, maxScoreTowerJ - 1);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI, maxScoreTowerJ - 2, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI, maxScoreTowerJ - 2);
        if (!MainAlgo.isTowerOutOfRange(maxScoreTowerI - 1, maxScoreTowerJ - 1, MaxBlocksPerTurnAlgo.gameFieldSize))
            MaxBlocksPerTurnAlgo.evaluateRelatedTowers(maxScoreTowerI - 1, maxScoreTowerJ - 1);
    }
    else {
        MaxBlocksPerTurnAlgo.relatedTowersScores[maxScoreTowerI][maxScoreTowerJ] = -1;
    }
};

MaxBlocksPerTurnAlgo.ResetTower = function (centralTowerI, centralTowerJ, towerI, towerJ) {
    if (MaxBlocksPerTurnAlgo.gameField[towerI][towerJ] == MaxBlocksPerTurnAlgo.relatedTowersBase[centralTowerI][centralTowerJ])
        MaxBlocksPerTurnAlgo.gameField[towerI][towerJ] = 0;
};

MaxBlocksPerTurnAlgo.ResetTower = function (maxTowerI, maxTowerJ) {
    if (MaxBlocksPerTurnAlgo.gameField[maxTowerI][maxTowerJ] > MaxBlocksPerTurnAlgo.relatedTowersBase[maxTowerI][maxTowerJ]) {
        for (var i = 0; i < MaxBlocksPerTurnAlgo.gameField[maxTowerI][maxTowerJ] - MaxBlocksPerTurnAlgo.relatedTowersBase[maxTowerI][maxTowerJ]; i++) {
            MaxBlocksPerTurnAlgo.output.push(['t', maxTowerI, maxTowerJ]);
            MaxBlocksPerTurnAlgo.availableTurns--;
        }
        MaxBlocksPerTurnAlgo.gameField[maxTowerI][maxTowerJ] = 0;
    }

    else if (MaxBlocksPerTurnAlgo.gameField[maxTowerI][maxTowerJ] < MaxBlocksPerTurnAlgo.relatedTowersBase[maxTowerI][maxTowerJ]) {
        for (var i = 0; i < MaxBlocksPerTurnAlgo.relatedTowersBase[maxTowerI][maxTowerJ] - MaxBlocksPerTurnAlgo.gameField[maxTowerI][maxTowerJ]; i++) {
            MaxBlocksPerTurnAlgo.output.push(['p', maxTowerI, maxTowerJ]);
            MaxBlocksPerTurnAlgo.availableTurns--;
        }
        MaxBlocksPerTurnAlgo.gameField[maxTowerI][maxTowerJ] = 0;
    }
};

MaxBlocksPerTurnAlgo.getExactMaxTowerScore = function (relatedTowersScores, maxTowerI, maxTowerJ) {
    var maxValue = -2;
    maxTowerI.Value = 0;
    maxTowerJ.Value = 0;
    for (var i = 0; i < MaxBlocksPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxBlocksPerTurnAlgo.gameFieldSize; j++) {
            if (maxValue < relatedTowersScores[i][j] && (MaxBlocksPerTurnAlgo.relatedTowersTurnsCounts[i][j] <= MaxBlocksPerTurnAlgo.availableTurns)) {
                maxValue = relatedTowersScores[i][j];
                maxTowerI.Value = i;
                maxTowerJ.Value = j;
            }
        }
    }
    return maxValue;
};

MaxBlocksPerTurnAlgo.makeSimpleTurn = function () {
    for (var i = 0; i < MaxBlocksPerTurnAlgo.gameFieldSize; i++) {
        for (var j = 0; j < MaxBlocksPerTurnAlgo.gameFieldSize; j++) {
            while (MaxBlocksPerTurnAlgo.availableTurns > 0 && MaxBlocksPerTurnAlgo.gameField[i][j] > 0) {
                MaxBlocksPerTurnAlgo.output.push(['t', i, j]);
                MaxBlocksPerTurnAlgo.gameField[i][j]--;
                MaxBlocksPerTurnAlgo.availableTurns--;
            }
        }
    }
};