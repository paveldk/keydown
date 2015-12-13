var MainAlgo = function () {};

MainAlgo.availableTurns = 0;
MainAlgo.gameFieldSize = 0;
MainAlgo.initialFieldSum = 0;
MainAlgo.result = null;
MainAlgo.score = 0;

MainAlgo.get_AvailableTurns = function () 
{
	return MainAlgo.availableTurns;
}
MainAlgo.set_AvailableTurns = function (value)
{
	MainAlgo.availableTurns = value;
}

MainAlgo.get_GameFieldSize = function () 
{
	return MainAlgo.gameFieldSize;
}
MainAlgo.set_GameFieldSize = function (value)
{
	MainAlgo.gameFieldSize = value;
}

MainAlgo.init = function (param) {
    if (param.random) {
        MainAlgo.generateInput(param.turns, param.height, param.size);
    }
    else {
        MainAlgo.readInput(param.turns, param.size, param.field);
    }

    var blocksLeftAlgoMaxBlocks = 0;
    var blocksLeftAlgoMaxTowers = 0;

    if (MainAlgo.gameFieldSize <= 100) {

        MaxBlocksPerTurnAlgo.init();
        MaxTowersPerTurnAlgo.init();

        blocksLeftAlgoMaxBlocks = MaxBlocksPerTurnAlgo.get_RemovedBlocksCount();
        blocksLeftAlgoMaxTowers = MaxTowersPerTurnAlgo.get_RemovedBlocksCount();
        console.log("blocks left: " + blocksLeftAlgoMaxBlocks);
        console.log("towers left: " + blocksLeftAlgoMaxTowers);
        if (blocksLeftAlgoMaxBlocks <= blocksLeftAlgoMaxTowers) {
            MainAlgo.result = MaxBlocksPerTurnAlgo.get_Output();
            MainAlgo.score = blocksLeftAlgoMaxBlocks;
        }
        else {
            MainAlgo.result = MaxTowersPerTurnAlgo.get_Output();
            MainAlgo.score = blocksLeftAlgoMaxTowers;
        }
    }
    else {
        MaxBlocksPerTurnAlgo.init();
        MainAlgo.result = MaxBlocksPerTurnAlgo.get_Output();
    }
};



MainAlgo.generateInput = function (turns, height, size) {
    MainAlgo.set_AvailableTurns(turns);
    MainAlgo.set_GameFieldSize(size);

    var availableTurns = turns;
    var gameFieldSize = size;

    MaxBlocksPerTurnAlgo.initArrays();
    MaxTowersPerTurnAlgo.initArrays();

    var rnd = 0;

    var maxTowerHeight = height;

    for (var i = 0; i < gameFieldSize; i++) {
        for (var j = 0; j < gameFieldSize; j++) {
            rnd = Math.floor((Math.random() * height) + 0);
            while (
					(!MainAlgo.isTowerOutOfRange(i + 1, j, gameFieldSize) && rnd == MaxBlocksPerTurnAlgo.get_GameField()[i + 1][j]) ||
				    (!MainAlgo.isTowerOutOfRange(i - 1, j, gameFieldSize) && rnd == MaxBlocksPerTurnAlgo.get_GameField()[i - 1][j]) ||
				    (!MainAlgo.isTowerOutOfRange(i, j - 1, gameFieldSize) && rnd == MaxBlocksPerTurnAlgo.get_GameField()[i][j - 1])
				 ) {
                rnd = Math.floor((Math.random() * height) + 0);
            }
            MaxBlocksPerTurnAlgo.get_GameField()[i][j] = rnd;
            MaxTowersPerTurnAlgo.get_GameField()[i][j] = rnd;

            MainAlgo.initialFieldSum += rnd;
        }
    }
}

MainAlgo.isTowerOutOfRange = function (x, y, gameFieldSize) {
    if (x < 0 || x >= gameFieldSize || y < 0 || y >= gameFieldSize)
        return true;
    else
        return false;
};

MainAlgo.readInput = function (turns, size, field) {
    MainAlgo.set_AvailableTurns(turns);
    MainAlgo.set_GameFieldSize(size);

    var availableTurns = turns;
    var gameFieldSize = size;

    MaxBlocksPerTurnAlgo.initArrays();
    MaxTowersPerTurnAlgo.initArrays();



    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            MainAlgo.initialFieldSum += field[i][j];
            MaxBlocksPerTurnAlgo.get_GameField()[i][j] = field[i][j];
            MaxTowersPerTurnAlgo.get_GameField()[i][j] = field[i][j];
        }
    }
};

