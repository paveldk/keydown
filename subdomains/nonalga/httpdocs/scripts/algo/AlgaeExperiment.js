var AlgaeExperiment = function () { };
var i, j, k, l, t;
AlgaeExperiment.generationsCount = 0;
AlgaeExperiment.algaeCount = 0;
AlgaeExperiment.mudSize = 0;
AlgaeExperiment.result = 0;
AlgaeExperiment.foodCount = 0;
AlgaeExperiment.mudInputFood = new Array();
AlgaeExperiment.mudOutputNoFood = new Array();
AlgaeExperiment.mudOutputTempCopy = new Array();
AlgaeExperiment.mudOutputWithFood = new Array();

AlgaeExperiment.startingArray = new Array();

AlgaeExperiment.ReadInput = function (a, b, c, d) {
    AlgaeExperiment.generationsCount = a;
    AlgaeExperiment.algaeCount = b;
    AlgaeExperiment.mudSize = c;

    AlgaeExperiment.mudInputFood = new Array(AlgaeExperiment.mudSize);
    AlgaeExperiment.mudOutputNoFood = new Array(AlgaeExperiment.mudSize);
    AlgaeExperiment.mudOutputTempCopy = new Array(AlgaeExperiment.mudSize);
    AlgaeExperiment.mudOutputWithFood = new Array(AlgaeExperiment.mudSize);

    for (i = 0; i < AlgaeExperiment.mudSize; i++) {
        AlgaeExperiment.mudInputFood[i] = new Array(AlgaeExperiment.mudSize);
        AlgaeExperiment.mudOutputNoFood[i] = new Array(AlgaeExperiment.mudSize);
        AlgaeExperiment.mudOutputTempCopy[i] = new Array(AlgaeExperiment.mudSize);
        AlgaeExperiment.mudOutputWithFood[i] = new Array(AlgaeExperiment.mudSize);

        for (j = 0; j < AlgaeExperiment.mudSize; j++) {
            if (d[i][j] == 'F') {
                AlgaeExperiment.mudInputFood[i][j] = 1;
                AlgaeExperiment.mudOutputWithFood[i][j] = 'F';
                AlgaeExperiment.foodCount++;
            }
            else {
                AlgaeExperiment.mudInputFood[i][j] = 0;
                AlgaeExperiment.mudOutputWithFood[i][j] = '0';
            }
        }
    }
}	
AlgaeExperiment.InsertBlocks = function () 
{
	var algaeUsedCount = 0;

	for (i = 0; i < AlgaeExperiment.mudSize; i += 4)
	{
		for (j = 0; j < AlgaeExperiment.mudSize; j += 4)
		{
			if (algaeUsedCount < AlgaeExperiment.algaeCount - 2)
			{
				if (AlgaeExperiment.IsValidCell(1 + i, 1 + j, AlgaeExperiment.mudSize))
                {
                    AlgaeExperiment.mudOutputNoFood[0 + i][0 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][0 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[1 + i][0 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[1 + i][0 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[0 + i][1 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][1 + j] = 1;

                    algaeUsedCount += 3;
                }
			}
			else
			{
				return;
			}
		}
	}
}
AlgaeExperiment.InsertBlocksSymmetric = function () 	
{
    var algaeUsedCount = 0;
    var fillLimit = 3 * parseInt(Math.sqrt(parseInt(AlgaeExperiment.algaeCount / 3)));

    if (fillLimit > AlgaeExperiment.mudSize)
        fillLimit = AlgaeExperiment.mudSize;

    for (i = 0; i < fillLimit; i += 3)
    {
        for (j = 0; j < fillLimit; j += 3)
        {
            if (algaeUsedCount < AlgaeExperiment.algaeCount - 2)
            {
                if (i % 2 == 0 && j % 2 == 0)
                   {
                        if (AlgaeExperiment.IsValidCell(1 + i, 1 + j, AlgaeExperiment.mudSize))
                        {
                            AlgaeExperiment.mudOutputNoFood[0 + i][0 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[0 + i][0 + j] = 1;

                            AlgaeExperiment.mudOutputNoFood[1 + i][0 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[1 + i][0 + j] = 1;

                            AlgaeExperiment.mudOutputNoFood[0 + i][1 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[0 + i][1 + j] = 1;

                            algaeUsedCount += 3;
                        }
                   }
                else if (i % 2 == 0 && j % 2 == 1)
                    {
                        if (AlgaeExperiment.IsValidCell(1 + i, 1 + j, AlgaeExperiment.mudSize))
                        {
                            AlgaeExperiment.mudOutputNoFood[0 + i][0 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[0 + i][0 + j] = 1;

                            AlgaeExperiment.mudOutputNoFood[1 + i][1 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[1 + i][1 + j] = 1;

                            AlgaeExperiment.mudOutputNoFood[0 + i][1 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[0 + i][1 + j] = 1;

                            algaeUsedCount += 3;
                        }
                    }
                else if (i % 2 == 1 && j % 2 == 0)
                    {
                        if (AlgaeExperiment.IsValidCell(1 + i, 1 + j, AlgaeExperiment.mudSize))
                        {
                            AlgaeExperiment.mudOutputNoFood[0 + i][0 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[0 + i][0 + j] = 1;

                            AlgaeExperiment.mudOutputNoFood[1 + i][0 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[1 + i][0 + j] = 1;

                            AlgaeExperiment.mudOutputNoFood[1 + i][1 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[1 + i][1 + j] = 1;

                            algaeUsedCount += 3;
                        }
                    }
                else if (i % 2 == 1 && j % 2 == 1)
                    {
                        if (AlgaeExperiment.IsValidCell(1 + i, 1 + j, AlgaeExperiment.mudSize))
                        {
                            AlgaeExperiment.mudOutputNoFood[1 + i][1 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[1 + i][1 + j] = 1;

                            AlgaeExperiment.mudOutputNoFood[1 + i][0 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[1 + i][0 + j] = 1;

                            AlgaeExperiment.mudOutputNoFood[0 + i][1 + j] = 1;
                            AlgaeExperiment.mudOutputTempCopy[0 + i][1 + j] = 1;

                            algaeUsedCount += 3;
                        }
                    }
            }
            else
            {
                return;
            }
        }
    }
}
AlgaeExperiment.InsertPulsars = function() 
{
    var algaeUsedCount = 0;

    var pulsarsSqrt = parseInt(AlgaeExperiment.mudSize / 16);
    var sectorFoodSum = 0;
    var sectorFoodSums = new Array(pulsarsSqrt);
    for (i = 0; i < sectorFoodSums.length; i++) {
        sectorFoodSums[i] = new Array(pulsarsSqrt);
    }

    var sectorFoodSumsKeys = new Array(pulsarsSqrt * pulsarsSqrt);
    var sectorFoodPosValues = new Array(pulsarsSqrt * pulsarsSqrt);

    for (i = 0; i < pulsarsSqrt * 16; i += 16)
    {
        for (j = 0; j < pulsarsSqrt * 16; j += 16)
        {
            for (k = i + 1; k < i + 14; k++)
            {
                for (l = j + 1; l < j + 14; l++)
                {
                    sectorFoodSum += AlgaeExperiment.mudInputFood[k][l];
                }
            }

            sectorFoodSums[parseInt(i / 16)][parseInt(j / 16)] = sectorFoodSum;
            sectorFoodSum = 0;
        }
    }

    for (i = 0; i < pulsarsSqrt; i++)
    {
        for (j = 0; j < pulsarsSqrt; j++)
        {
            sectorFoodSumsKeys[i * pulsarsSqrt + j] = sectorFoodSums[i][j];
            sectorFoodPosValues[i * pulsarsSqrt + j] = i * pulsarsSqrt + j;
        }
    }

    bubbleSort(sectorFoodSumsKeys, sectorFoodPosValues);

    for (i = sectorFoodPosValues.Length - 1; i >= 0; i--)
    {
        if (algaeUsedCount < AlgaeExperiment.algaeCount - 7)
        {
            var lm = (parseInt(sectorFoodPosValues[i] / pulsarsSqrt)) * 16;
            var lk = (sectorFoodPosValues[i] % pulsarsSqrt) * 16;

            AlgaeExperiment.mudOutputNoFood[6 + lm][4 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[6 + lm][4 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[7 + lm][4 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[7 + lm][4 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[8 + lm][4 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[8 + lm][4 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[7 + lm][5 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[7 + lm][5 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[6 + lm][10 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[6 + lm][10 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[7 + lm][10 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[7 + lm][10 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[8 + lm][10 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[8 + lm][10 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[7 + lm][9 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[7 + lm][9 + lk] = 1;

            algaeUsedCount += 8;
        }
        else
        {
            return;
        }
    }
}
AlgaeExperiment.InsertHs = function() 
{
    var algaeUsedCount = 0;

    var hSqrt = parseInt(AlgaeExperiment.mudSize / 80);
    var sectorFoodSum = 0;
    var sectorFoodSums = new Array(hSqrt);
    for (i = 0; i < sectorFoodSums.length; i++) {
        sectorFoodSums[i] = new Array(hSqrt);
    }
    var sectorFoodSumsKeys = new Array(hSqrt * hSqrt);
    var sectorFoodPosValues = new Array(hSqrt * hSqrt);

    for (i = 0; i < hSqrt * 80; i += 80)
    {
        for (j = 0; j < hSqrt * 80; j += 80)
        {
            for (k = i + 1; k < i + 78; k++)
            {
                for (l = j + 1; l < j + 78; l++)
                {
                    sectorFoodSum += AlgaeExperiment.mudInputFood[k][l];
                }
            }

            sectorFoodSums[parseInt(i / 80)][parseInt(j / 80)] = sectorFoodSum;
            sectorFoodSum = 0;
        }
    }

    for (i = 0; i < hSqrt; i++)
    {
        for (j = 0; j < hSqrt; j++)
        {
            sectorFoodSumsKeys[i * hSqrt + j] = sectorFoodSums[i][j];
            sectorFoodPosValues[i * hSqrt + j] = i * hSqrt + j;
        }
    }

    bubbleSort(sectorFoodSumsKeys, sectorFoodPosValues);

    for (i = sectorFoodPosValues.Length - 1; i >= 0; i--)
    {
        if (algaeUsedCount < AlgaeExperiment.algaeCount - 9)
        {
            var lm = (parseInt(sectorFoodPosValues[i] / hSqrt)) * 80;
            var lk = (sectorFoodPosValues[i] % hSqrt) * 80;

            AlgaeExperiment.mudOutputNoFood[38 + lm][37 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[38 + lm][37 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[39 + lm][37 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[39 + lm][37 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[40 + lm][37 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[40 + lm][37 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[39 + lm][38 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[39 + lm][38 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[39 + lm][39 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[39 + lm][39 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[39 + lm][40 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[39 + lm][40 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[39 + lm][41 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[39 + lm][41 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[39 + lm][42 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[39 + lm][42 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[38 + lm][42 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[38 + lm][42 + lk] = 1;

            AlgaeExperiment.mudOutputNoFood[40 + lm][42 + lk] = 1;
            AlgaeExperiment.mudOutputTempCopy[40 + lm][42 + lk] = 1;

            algaeUsedCount += 10;
        }
        else
        {
            return;
        }
    }
}
AlgaeExperiment.InsertMax = function() 
{
    if (AlgaeExperiment.mudSize >= 27 && AlgaeExperiment.algaeCount >= 187)
    {
        var offset = parseInt((AlgaeExperiment.mudSize - 27) / 2);
        AlgaeExperiment.mudOutputNoFood[0 + offset][18 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[1 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[1 + offset][18 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[1 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[2 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[2 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[2 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[2 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[2 + offset][20 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[3 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[3 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[3 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[3 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[3 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[3 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[3 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[4 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[4 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[4 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[4 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[4 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[5 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[5 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[5 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[5 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[5 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[5 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[5 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[6 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[6 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[6 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[6 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[6 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][20 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[7 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[8 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[9 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[9 + offset][6 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[9 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[9 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[10 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[10 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[10 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[10 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[10 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[10 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[10 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[10 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[11 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[12 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][6 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][20 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[13 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[14 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[15 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[16 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[16 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[16 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[16 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[16 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[16 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[16 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[16 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[17 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[17 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[17 + offset][20 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[17 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[18 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][6 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[19 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[20 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[20 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[20 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[20 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[20 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[21 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[21 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[21 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[21 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[21 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[21 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[21 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[22 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[22 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[22 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[22 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[22 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[23 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[23 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[23 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[23 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[23 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[23 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[23 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[24 + offset][6 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[24 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[24 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[24 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[24 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[25 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[25 + offset][8 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[25 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputNoFood[26 + offset][8 + offset] = 1;

        AlgaeExperiment.mudOutputTempCopy[0 + offset][18 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[1 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[1 + offset][18 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[1 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[2 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[2 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[2 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[2 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[2 + offset][20 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[3 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[3 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[3 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[3 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[3 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[3 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[3 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[4 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[4 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[4 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[4 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[4 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[5 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[5 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[5 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[5 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[5 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[5 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[5 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[6 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[6 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[6 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[6 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[6 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][20 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[7 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[8 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[9 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[9 + offset][6 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[9 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[9 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[10 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[10 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[10 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[10 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[10 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[10 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[10 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[10 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[11 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[12 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][6 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][20 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[13 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[14 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][0 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[15 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[16 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[16 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[16 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[16 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[16 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[16 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[16 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[16 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[17 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[17 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[17 + offset][20 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[17 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][1 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][19 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][21 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][22 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[18 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][6 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][17 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][23 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][24 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][25 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[19 + offset][26 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[20 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[20 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[20 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[20 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[20 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[21 + offset][2 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[21 + offset][3 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[21 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[21 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[21 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[21 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[21 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[22 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[22 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[22 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[22 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[22 + offset][16 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[23 + offset][4 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[23 + offset][5 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[23 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[23 + offset][10 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[23 + offset][11 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[23 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[23 + offset][15 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[24 + offset][6 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[24 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[24 + offset][12 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[24 + offset][13 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[24 + offset][14 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[25 + offset][7 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[25 + offset][8 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[25 + offset][9 + offset] = 1;
        AlgaeExperiment.mudOutputTempCopy[26 + offset][8 + offset] = 1;
    }
}
AlgaeExperiment.InsertSinglePuffers = function() 
{
    var algaeUsedCount = 0;

    var puffersCount = parseInt(AlgaeExperiment.mudSize / 24);
    var sectorFoodSum = 0;
    var sectorFoodSumsKeys = new Array(puffersCount);
    var sectorFoodPosValues = new Array(puffersCount);

    for (j = 0; j < puffersCount * 24; j += 24)
    {
        for (k = 0; k < AlgaeExperiment.mudSize; k++)
        {
            for (l = j; l < j + 24; l++)
            {
                sectorFoodSum += AlgaeExperiment.mudInputFood[k][l];
            }
        }

        sectorFoodSumsKeys[parseInt(j / 24)] = sectorFoodSum;
        sectorFoodSum = 0;
    }

    for (i = 0; i < puffersCount; i++)
    {
            sectorFoodPosValues[i] = i;
    }

    bubbleSort(sectorFoodSumsKeys, sectorFoodPosValues);

    for (j = sectorFoodPosValues.Length - 1; j >= 0; j--)
    {
        if (algaeUsedCount < AlgaeExperiment.algaeCount - 53)
        {
            var lf = sectorFoodPosValues[j] * 24;

            AlgaeExperiment.mudOutputNoFood[0][2 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[0][3 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[0][19 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[0][20 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[1][2 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[1][3 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[1][4 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[1][18 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[1][19 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[1][20 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[2][2 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[2][3 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[2][4 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[2][18 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[2][19 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[2][20 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[3][2 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[3][3 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[3][4 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[3][7 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[3][15 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[3][18 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[3][19 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[3][20 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[4][1 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[4][3 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[4][4 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[4][7 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[4][15 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[4][18 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[4][19 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[4][21 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[5][1 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[5][2 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[5][3 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[5][7 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[5][15 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[5][19 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[5][20 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[5][21 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[6][2 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[6][7 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[6][15 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[6][20 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[7][7 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[7][10 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[7][12 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[7][15 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[8][7 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[8][8 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[8][9 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[8][13 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[8][14 + lf] = 1;
            AlgaeExperiment.mudOutputNoFood[8][15 + lf] = 1;

            AlgaeExperiment.mudOutputTempCopy[0][2 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[0][3 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[0][19 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[0][20 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[1][2 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[1][3 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[1][4 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[1][18 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[1][19 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[1][20 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[2][2 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[2][3 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[2][4 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[2][18 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[2][19 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[2][20 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[3][2 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[3][3 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[3][4 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[3][7 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[3][15 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[3][18 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[3][19 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[3][20 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[4][1 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[4][3 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[4][4 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[4][7 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[4][15 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[4][18 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[4][19 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[4][21 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[5][1 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[5][2 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[5][3 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[5][7 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[5][15 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[5][19 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[5][20 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[5][21 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[6][2 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[6][7 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[6][15 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[6][20 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[7][7 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[7][10 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[7][12 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[7][15 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[8][7 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[8][8 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[8][9 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[8][13 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[8][14 + lf] = 1;
            AlgaeExperiment.mudOutputTempCopy[8][15 + lf] = 1;

            algaeUsedCount += 54;
        }
        else
        {
            return;
        }
    }
}
AlgaeExperiment.InsertDoublePuffers = function() 
{
        var algaeUsedCount = 0;

        var puffersCount = parseInt(AlgaeExperiment.mudSize / 24);
        var sectorFoodSum = 0;
        var sectorFoodSumsKeys = new Array(puffersCount);
        var sectorFoodPosValues = new Array(puffersCount);

        for (j = 0; j < puffersCount * 24; j += 24)
        {
            for (k = 0; k < AlgaeExperiment.mudSize; k++)
            {
                for (l = j; l < j + 24; l++)
                {
                    sectorFoodSum += AlgaeExperiment.mudInputFood[k][l];
                }
            }

            sectorFoodSumsKeys[parseInt(j / 24)] = sectorFoodSum;
            sectorFoodSum = 0;
        }

        for (i = 0; i < puffersCount; i++)
        {
            sectorFoodPosValues[i] = i;
        }

        bubbleSort(sectorFoodSumsKeys, sectorFoodPosValues);

        for (j = sectorFoodPosValues.Length - 1; j >= 0; j--)
        {
            if (algaeUsedCount < AlgaeExperiment.algaeCount - 107)
            {
                var li = parseInt((AlgaeExperiment.mudSize - 19) / 2);
                var lo = sectorFoodPosValues[j] * 24;

                AlgaeExperiment.mudOutputNoFood[0 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[0 + li][8 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[0 + li][9 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[0 + li][13 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[0 + li][14 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[0 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[1 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[1 + li][10 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[1 + li][12 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[1 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[2 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[2 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[2 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[2 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[3 + li][1 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[3 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[3 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[3 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[3 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[3 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[3 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[3 + li][21 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[4 + li][1 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[4 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[4 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[4 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[4 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[4 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[4 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[4 + li][21 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[5 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[5 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[5 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[5 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[5 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[5 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[5 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[5 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[6 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[6 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[6 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[6 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[6 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[6 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[7 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[7 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[7 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[7 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[7 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[7 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[8 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[8 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[8 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[8 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[10 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[10 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[10 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[10 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[11 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[11 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[11 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[11 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[11 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[11 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[12 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[12 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[12 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[12 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[12 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[12 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[13 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[13 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[13 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[13 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[13 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[13 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[13 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[13 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[14 + li][1 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[14 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[14 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[14 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[14 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[14 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[14 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[14 + li][21 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[15 + li][1 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[15 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[15 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[15 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[15 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[15 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[15 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[15 + li][21 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[16 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[16 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[16 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[16 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[17 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[17 + li][10 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[17 + li][12 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[17 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[18 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[18 + li][8 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[18 + li][9 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[18 + li][13 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[18 + li][14 + lo] = 1;
                AlgaeExperiment.mudOutputNoFood[18 + li][15 + lo] = 1;

                AlgaeExperiment.mudOutputTempCopy[0 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[0 + li][8 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[0 + li][9 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[0 + li][13 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[0 + li][14 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[0 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[1 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[1 + li][10 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[1 + li][12 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[1 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[2 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[2 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[2 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[2 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + li][1 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + li][21 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[4 + li][1 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[4 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[4 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[4 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[4 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[4 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[4 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[4 + li][21 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[5 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[5 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[5 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[5 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[5 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[5 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[5 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[5 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[6 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[6 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[6 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[6 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[6 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[6 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[7 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[7 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[7 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[7 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[7 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[7 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[8 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[8 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[8 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[8 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[10 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[10 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[10 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[10 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[11 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[11 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[11 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[11 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[11 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[11 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[12 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[12 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[12 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[12 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[12 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[12 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[13 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[13 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[13 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[13 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[13 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[13 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[13 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[13 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[14 + li][1 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[14 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[14 + li][4 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[14 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[14 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[14 + li][18 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[14 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[14 + li][21 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[15 + li][1 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[15 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[15 + li][3 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[15 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[15 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[15 + li][19 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[15 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[15 + li][21 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[16 + li][2 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[16 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[16 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[16 + li][20 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[17 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[17 + li][10 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[17 + li][12 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[17 + li][15 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[18 + li][7 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[18 + li][8 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[18 + li][9 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[18 + li][13 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[18 + li][14 + lo] = 1;
                AlgaeExperiment.mudOutputTempCopy[18 + li][15 + lo] = 1;

                algaeUsedCount += 108;  
            }
            else
            {
                return;
            }
        }                           
}
AlgaeExperiment.InsertRiskySetup = function() 
{
    var algaeUsedCount = 0;

    for (i = 0; i < AlgaeExperiment.mudSize; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            if (algaeUsedCount <= AlgaeExperiment.algaeCount + 5)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }

    if (AlgaeExperiment.IsValidCell(0, 0, AlgaeExperiment.mudSize))
    {
        AlgaeExperiment.mudOutputNoFood[0][0] = 0;
        AlgaeExperiment.mudOutputTempCopy[0][0] = 0;
    }
    if (AlgaeExperiment.IsValidCell(0, 1, AlgaeExperiment.mudSize))
    {
        AlgaeExperiment.mudOutputNoFood[0][1] = 0;
        AlgaeExperiment.mudOutputTempCopy[0][1] = 0;
    }
    if (AlgaeExperiment.IsValidCell(0, 2, AlgaeExperiment.mudSize))
    {
        AlgaeExperiment.mudOutputNoFood[0][2] = 0;
        AlgaeExperiment.mudOutputTempCopy[0][2] = 0;
    }
    if (AlgaeExperiment.IsValidCell(0, 3, AlgaeExperiment.mudSize))
    {
        AlgaeExperiment.mudOutputNoFood[0][3] = 0;
        AlgaeExperiment.mudOutputTempCopy[0][3] = 0;
    }
    if (AlgaeExperiment.IsValidCell(0, 4, AlgaeExperiment.mudSize))
    {
        AlgaeExperiment.mudOutputNoFood[0][4] = 0;
        AlgaeExperiment.mudOutputTempCopy[0][4] = 0;
    }

    algaeUsedCount -= 5;    
}
AlgaeExperiment.InsertFoodBased = function() 
{
    var algaeUsedCount = 0;

    for (i = 0; i < AlgaeExperiment.mudSize; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            if (AlgaeExperiment.mudInputFood[i][j] == 1 && algaeUsedCount < AlgaeExperiment.algaeCount)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }

    for (i = 0; i < AlgaeExperiment.mudSize; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            if (AlgaeExperiment.mudOutputNoFood[i][j] != 1 && algaeUsedCount < AlgaeExperiment.algaeCount)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }   
}
AlgaeExperiment.InsertFoodBasedBlocks = function() 
{
    var algaeUsedCount = 0;
    var algaeInserted = algaeUsedCount;
    var IsBlockInserted = false;

    for (i = 0; i < AlgaeExperiment.mudSize; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            if (AlgaeExperiment.mudInputFood[i][j] == 1 && algaeUsedCount < AlgaeExperiment.algaeCount - 2)
            {
                algaeInserted = algaeUsedCount;
                if (AlgaeExperiment.IsValidCell(1 + i, 1 + j, AlgaeExperiment.mudSize))
                {
                    AlgaeExperiment.mudOutputNoFood[0 + i][0 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][0 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[1 + i][0 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[1 + i][0 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[0 + i][1 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][1 + j] = 1;

                    algaeUsedCount += 3;
                }
                if (algaeUsedCount > algaeInserted)
                {
                    IsBlockInserted = true;
                    j += 3;
                }
            }
        }

        if (IsBlockInserted)
        {
            i += 3;
            IsBlockInserted = false;
        }
    }

    for (i = AlgaeExperiment.mudSize - 1; i >= 0; i--)
    {
        for (j = AlgaeExperiment.mudSize - 1; j >= 0; j--)
        {
            if (AlgaeExperiment.mudInputFood[i][j] == 1 && algaeUsedCount < AlgaeExperiment.algaeCount && AlgaeExperiment.mudOutputNoFood[i][j] != 1)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }

    for (i = AlgaeExperiment.mudSize - 1; i >= 0; i--)
    {
        for (j = AlgaeExperiment.mudSize - 1; j >= 0; j--)
        {
            if (AlgaeExperiment.mudOutputNoFood[i][j] != 1 && algaeUsedCount < AlgaeExperiment.algaeCount)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }      
}
AlgaeExperiment.InsertFoodBasedSixLines = function()
{
    var algaeUsedCount = 0;
    var algaeInserted = algaeUsedCount;
    var IsLineInserted = false;

    for (i = 1; i < AlgaeExperiment.mudSize - 1; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            if (AlgaeExperiment.mudInputFood[i][j] == 1 && algaeUsedCount < AlgaeExperiment.algaeCount - 5)
            {
                algaeInserted = algaeUsedCount;
                if (AlgaeExperiment.IsValidCell(0 + i, 5 + j, AlgaeExperiment.mudSize))
                {
                    AlgaeExperiment.mudOutputNoFood[0 + i][0 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][0 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[0 + i][1 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][1 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[0 + i][2 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][2 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[0 + i][3 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][3 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[0 + i][4 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][4 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[0 + i][5 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][5 + j] = 1;

                    algaeUsedCount += 6;
                }

                if (algaeUsedCount > algaeInserted)
                {
                    IsLineInserted = true;
                    j += 8;
                }
            }
        }

        if (IsLineInserted)
        {
            i += 3;
            IsLineInserted = false;
        }
    }

    for (i = AlgaeExperiment.mudSize - 1; i >= 0; i--)
    {
        for (j = AlgaeExperiment.mudSize - 1; j >= 0; j--)
        {
            if (AlgaeExperiment.mudInputFood[i][j] == 1 && algaeUsedCount < AlgaeExperiment.algaeCount && AlgaeExperiment.mudOutputNoFood[i][j] != 1)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }

    for (i = AlgaeExperiment.mudSize - 1; i >= 0; i--)
    {
        for (j = AlgaeExperiment.mudSize - 1; j >= 0; j--)
        {
            if (AlgaeExperiment.mudOutputNoFood[i][j] != 1 && algaeUsedCount < AlgaeExperiment.algaeCount)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }   
}
AlgaeExperiment.InsertFoodBasedSixLinesSE = function() 
{
    var algaeUsedCount = 0;

    var linesSqrt = parseInt(AlgaeExperiment.mudSize / 7);
    var sectorFoodSum = 0;
    var sectorFoodSums = new Array(linesSqrt);
    for (var i = 0; i < sectorFoodSums.length; i++) {
        sectorFoodSums[i] = new Array();
    }
    var sectorFoodSumsKeys = new Array(linesSqrt * linesSqrt);
    var sectorFoodPosValues = new Array(linesSqrt * linesSqrt);

    for (i = 0; i < linesSqrt * 7; i += 7)
    {
        for (j = 0; j < linesSqrt * 7; j += 7)
        {
            for (k = i; k < i + 6; k++)
            {
                for (l = j; l < j + 6; l++)
                {
                    sectorFoodSum += AlgaeExperiment.mudInputFood[k][l];
                }
            }

            sectorFoodSums[parseInt(i / 7)][parseInt(j / 7)] = sectorFoodSum;
            sectorFoodSum = 0;
        }
    }

    for (i = 0; i < linesSqrt; i++)
    {
        for (j = 0; j < linesSqrt; j++)
        {
            sectorFoodSumsKeys[i * linesSqrt + j] = sectorFoodSums[i][j];
            sectorFoodPosValues[i * linesSqrt + j] = i * linesSqrt + j;
        }
    }

    bubbleSort(sectorFoodSumsKeys, sectorFoodPosValues);

    for (i = sectorFoodPosValues.Length - 1; i >= 0; i--)
    {
        if (algaeUsedCount < AlgaeExperiment.algaeCount - 5)
        {
            var la = (parseInt(sectorFoodPosValues[i] / linesSqrt)) * 7;
            var lp = (sectorFoodPosValues[i] % linesSqrt) * 7;

            if (AlgaeExperiment.IsValidCell(3 + la, 5 + lp, AlgaeExperiment.mudSize))
            {
                AlgaeExperiment.mudOutputNoFood[3 + la][0 + lp] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + la][0 + lp] = 1;

                AlgaeExperiment.mudOutputNoFood[3 + la][1 + lp] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + la][1 + lp] = 1;

                AlgaeExperiment.mudOutputNoFood[3 + la][2 + lp] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + la][2 + lp] = 1;

                AlgaeExperiment.mudOutputNoFood[3 + la][3 + lp] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + la][3 + lp] = 1;

                AlgaeExperiment.mudOutputNoFood[3 + la][4 + lp] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + la][4 + lp] = 1;

                AlgaeExperiment.mudOutputNoFood[3 + la][5 + lp] = 1;
                AlgaeExperiment.mudOutputTempCopy[3 + la][5 + lp] = 1;

                algaeUsedCount += 6;
            }
        }
        else
        {
            return;
        }
    }   
}
AlgaeExperiment.InsertFoodBasedBlinkers = function()
{
    var algaeUsedCount = 0;
    var algaeInserted = algaeUsedCount;
    var IsBlinkerInserted = false;

    for (i = 0; i < AlgaeExperiment.mudSize; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            if (AlgaeExperiment.mudInputFood[i][j] == 1 && algaeUsedCount < AlgaeExperiment.algaeCount - 2)
            {
                algaeInserted = algaeUsedCount;

                if (AlgaeExperiment.IsValidCell(2 + i, 1 + j, AlgaeExperiment.mudSize) && AlgaeExperiment.IsValidCell(0 + i, j - 1, AlgaeExperiment.mudSize))
                {
                    AlgaeExperiment.mudOutputNoFood[0 + i][0 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[0 + i][0 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[1 + i][0 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[1 + i][0 + j] = 1;

                    AlgaeExperiment.mudOutputNoFood[2 + i][0 + j] = 1;
                    AlgaeExperiment.mudOutputTempCopy[2 + i][0 + j] = 1;

                    algaeUsedCount += 3;
                }

                if (algaeUsedCount > algaeInserted)
                {
                    IsBlinkerInserted = true;
                    j += 4;
                }
            }
        }

        if (IsBlinkerInserted)
        {
            i += 3;
            IsBlinkerInserted = false;
        }
    }

    for (i = AlgaeExperiment.mudSize - 1; i >= 0; i--)
    {
        for (j = AlgaeExperiment.mudSize - 1; j >= 0; j--)
        {
            if (AlgaeExperiment.mudInputFood[i][j] == 1 && algaeUsedCount < AlgaeExperiment.algaeCount && AlgaeExperiment.mudOutputNoFood[i][j] != 1)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }

    for (i = AlgaeExperiment.mudSize - 1; i >= 0; i--)
    {
        for (j = AlgaeExperiment.mudSize - 1; j >= 0; j--)
        {
            if (AlgaeExperiment.mudOutputNoFood[i][j] != 1 && algaeUsedCount < AlgaeExperiment.algaeCount)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = 1;
                AlgaeExperiment.mudOutputTempCopy[i][j] = 1;
                algaeUsedCount++;
            }
        }
    }   
}
AlgaeExperiment.GenerateAlgaeSetup = function() 
{
    
    var pulsarActualQty = (parseInt(AlgaeExperiment.mudSize / 16)) * (parseInt(AlgaeExperiment.mudSize / 16));
    if (pulsarActualQty > parseInt(AlgaeExperiment.algaeCount / 8))
        pulsarActualQty = parseInt(AlgaeExperiment.algaeCount / 8);

    var foodPercent = AlgaeExperiment.foodCount / (AlgaeExperiment.mudSize * AlgaeExperiment.mudSize);

    //f(x) = xy^2 + y*1500 + (100/(x+y))*600000 (~= 2300000)
    if (AlgaeExperiment.mudSize + AlgaeExperiment.generationsCount > 200 && AlgaeExperiment.mudSize * AlgaeExperiment.mudSize * AlgaeExperiment.generationsCount + AlgaeExperiment.mudSize * 1500 + (100 / (AlgaeExperiment.mudSize + AlgaeExperiment.generationsCount)) * 600000 > 2000000)
    {
        //Very high food count.
        //Very high algae count.
        //Mud size bigger than 5.
        if (AlgaeExperiment.foodCount >= (0.9 * AlgaeExperiment.mudSize * AlgaeExperiment.mudSize)
            && AlgaeExperiment.algaeCount >= (0.9 * AlgaeExperiment.mudSize * AlgaeExperiment.mudSize)
            && AlgaeExperiment.generationsCount <= AlgaeExperiment.mudSize
            && AlgaeExperiment.mudSize > 5)
        {
            AlgaeExperiment.InsertRiskySetup();
        }
        //Algae count enough for max.
        //Generations count enough to reach almost highest population of Max.
        //Mud size big enough to populate it with Max and to expand ~2 cells in every direction.
        else if (AlgaeExperiment.algaeCount >= 187 && AlgaeExperiment.algaeCount < 3 * (parseInt(AlgaeExperiment.mudSize / 3)) * (parseInt(AlgaeExperiment.mudSize / 3))
                    && (AlgaeExperiment.generationsCount > (0.7 * AlgaeExperiment.mudSize) - 27 && AlgaeExperiment.generationsCount < (1.3 * AlgaeExperiment.mudSize) - 27 * (27 / AlgaeExperiment.mudSize))
                    && AlgaeExperiment.mudSize >= 32)
        {
            //Pulsars can't mature.
            if (AlgaeExperiment.generationsCount < 24)
            {
                AlgaeExperiment.InsertMax();
            }
            //Pulsars can mature, but will give lower AlgaeExperiment.results than Max.
            else if ((((AlgaeExperiment.generationsCount + 19) * (AlgaeExperiment.generationsCount + 19) + 463) / 4) * (1 + foodPercent) > (pulsarActualQty * 8 * 6) * (1 + 2 * foodPercent))
            {
                AlgaeExperiment.InsertMax();
            }
            //Pulsars will give higher AlgaeExperiment.results than Max.
            else
            {
                AlgaeExperiment.InsertPulsars();
            }
        }
        //Very high food count.
        //Algae count enough for single puffers, but not enough for pulsars.
        //Generations count enough for a single puffer to almost reach the bottom of the mud.
        else if (AlgaeExperiment.foodCount > (0.7 * AlgaeExperiment.mudSize * AlgaeExperiment.mudSize)
                    && AlgaeExperiment.algaeCount >= 0.7 * (parseInt(AlgaeExperiment.mudSize / 24)) * 54 && AlgaeExperiment.algaeCount >= 54 && AlgaeExperiment.algaeCount < 3 * (parseInt(AlgaeExperiment.mudSize / 3)) * (parseInt(AlgaeExperiment.mudSize / 3))
                    && AlgaeExperiment.generationsCount > (0.8 * 2 * AlgaeExperiment.mudSize)
                    && AlgaeExperiment.mudSize >= 24)
        {
            AlgaeExperiment.InsertSinglePuffers();
        }
        //High food count.
        //Algae count enough for double puffers, but not enough for pulsars.
        //Generations count enough for a double puffer to almost reach the top and the bottom of the mud.
        else if (AlgaeExperiment.foodCount > (0.7 * AlgaeExperiment.mudSize * AlgaeExperiment.mudSize)
                    && AlgaeExperiment.algaeCount >= 0.7 * (parseInt(AlgaeExperiment.mudSize / 24)) * 108 && AlgaeExperiment.algaeCount >= 108 && AlgaeExperiment.algaeCount < 3 * (parseInt(AlgaeExperiment.mudSize / 3)) * (parseInt(AlgaeExperiment.mudSize / 3))
                    && AlgaeExperiment.generationsCount > (0.6 * AlgaeExperiment.mudSize)
                    && AlgaeExperiment.mudSize >= 144)
        {
            AlgaeExperiment.InsertDoublePuffers();
        }
        //Very high food count.
        //Very high algae count.
        //Mud size bigger than 5.
        else if (AlgaeExperiment.foodCount >= (0.7 * AlgaeExperiment.mudSize * AlgaeExperiment.mudSize)
                && AlgaeExperiment.algaeCount >= (0.7 * AlgaeExperiment.mudSize * AlgaeExperiment.mudSize)
                && AlgaeExperiment.mudSize > 5)
        {
            AlgaeExperiment.InsertRiskySetup();
        }
        //Algae count enough for max.
        //Generations count enough to reach almost highest population of Max.
        //Mud size big enough to populate it with Max and to expand ~2 cells in every direction.
        else if (AlgaeExperiment.algaeCount >= 187 && AlgaeExperiment.algaeCount < 3 * (parseInt(AlgaeExperiment.mudSize / 3)) * (parseInt(AlgaeExperiment.mudSize / 3))
                    && (AlgaeExperiment.generationsCount > (0.3 * AlgaeExperiment.mudSize) - 27 && AlgaeExperiment.generationsCount < (1.3 * AlgaeExperiment.mudSize) - 27 * (27 / AlgaeExperiment.mudSize))
                    && AlgaeExperiment.mudSize >= 32)
        {
            //Pulsars can't mature.
            if (AlgaeExperiment.generationsCount < 24)
            {
                AlgaeExperiment.InsertMax();
            }
            //Pulsars can mature, but will give lower AlgaeExperiment.results than Max.
            else if ((parseInt(((AlgaeExperiment.generationsCount + 19) * (AlgaeExperiment.generationsCount + 19) + 463) / 4)) * (1 + foodPercent) > (pulsarActualQty * 8 * 6) * (1 + 2 * foodPercent))
            {
                AlgaeExperiment.InsertMax();
            }
            //Pulsars will give higher AlgaeExperiment.results than Max.
            else
            {
                AlgaeExperiment.InsertPulsars();
            }
        }
        //Very low algae count compared to the puddle of mud size.
        else if (AlgaeExperiment.algaeCount < 1.1 * (parseInt(AlgaeExperiment.mudSize / 80)) * (parseInt(AlgaeExperiment.mudSize / 80)) * 10 && AlgaeExperiment.algaeCount >= 10
                    && AlgaeExperiment.generationsCount >= 30 && AlgaeExperiment.generationsCount <= 200
                    && AlgaeExperiment.mudSize >= 80)
        {
            AlgaeExperiment.InsertHs();
        }
        //Algae count not enough to fill the mud with blocks and enough for a single pulsar.
        //Mud size enough to fit in a pulsar.
        else if (AlgaeExperiment.algaeCount < 3 * (parseInt(AlgaeExperiment.mudSize / 4)) * (parseInt(AlgaeExperiment.mudSize / 4)) && AlgaeExperiment.algaeCount >= 8
                    && AlgaeExperiment.mudSize > 15)
        {
            AlgaeExperiment.InsertPulsars();
        }
        //Very high food count.
        //Very high algae count.
        //Mud size bigger than 5.
        else if (AlgaeExperiment.foodCount >= (0.6 * AlgaeExperiment.mudSize * AlgaeExperiment.mudSize)
                && AlgaeExperiment.algaeCount >= (0.6 * AlgaeExperiment.mudSize * AlgaeExperiment.mudSize)
                && AlgaeExperiment.mudSize > 5)
        {
            AlgaeExperiment.InsertRiskySetup();
        }
        else if (AlgaeExperiment.algaeCount >= 3 * (parseInt(AlgaeExperiment.mudSize / 3)) * (parseInt(AlgaeExperiment.mudSize / 3)))
        {
            AlgaeExperiment.InsertBlocksSymmetric();
        }
        else
        {
            AlgaeExperiment.InsertBlocks();
        }

        //Comment before release.
        //GetExperimentAlgaeExperiment.result();
    }
    else if (AlgaeExperiment.mudSize > 30)
    {
        var insertsNames = ["blocks", "blocksSym", "pulsars", "max", "sPuffers", "dPuffers", "riskySetup", "Hs"];
        var insertsResults = new Array(8);

        AlgaeExperiment.InsertBlocks();
        insertsResults[0] = AlgaeExperiment.GetExperimentResult();

        AlgaeExperiment.InsertBlocksSymmetric();
        insertsResults[1] = AlgaeExperiment.GetExperimentResult();

        if (AlgaeExperiment.algaeCount >= 8)
        {
            AlgaeExperiment.InsertPulsars();
            insertsResults[2] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[2] = 0;
        }

        if (AlgaeExperiment.algaeCount >= 187)
        {
            AlgaeExperiment.InsertMax();
            insertsResults[3] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[3] = 0;
        }

        if (AlgaeExperiment.algaeCount >= 54)
        {
            AlgaeExperiment.InsertSinglePuffers();
            insertsResults[4] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[4] = 0;
        }

        if (AlgaeExperiment.algaeCount >= 108 && AlgaeExperiment.mudSize >= 49)
        {
            AlgaeExperiment.InsertDoublePuffers();
            insertsResults[5] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[5] = 0;
        }

        AlgaeExperiment.InsertRiskySetup();
        insertsResults[6] = AlgaeExperiment.GetExperimentResult();

        if (AlgaeExperiment.algaeCount >= 10 && AlgaeExperiment.mudSize >= 80)
        {
            AlgaeExperiment.InsertHs();
            insertsResults[7] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[7] = 0;
        }

        bubbleSort(insertsResults, insertsNames);

        switch (insertsNames[7])
        {
            case "blocks":
                AlgaeExperiment.InsertBlocks();
                break;
            case "blocksSym":
                AlgaeExperiment.InsertBlocksSymmetric();
                break;
            case "pulsars":
                AlgaeExperiment.InsertPulsars();
                break;
            case "max":
                AlgaeExperiment.InsertMax();
                break;
            case "sPuffers":
                AlgaeExperiment.InsertSinglePuffers();
                break;
            case "dPuffers":
                AlgaeExperiment.InsertDoublePuffers();
                break;
            case "riskySetup":
                AlgaeExperiment.InsertRiskySetup();
                break;
            case "Hs":
                AlgaeExperiment.InsertHs();
                break;
            default:
                break;
        }
    }
    else
    {
        var insertsNames = ["blocks", "blocksSym", "pulsars", "max", "sPuffers", "dPuffers", "riskySetup", "foodBased", "fbBlocks", "fbLines", "fbLinesSE", "fbBlinkers"];
        var insertsResults = new Array(12);

        AlgaeExperiment.InsertBlocks();
        insertsResults[0] = AlgaeExperiment.GetExperimentResult();

        AlgaeExperiment.InsertBlocksSymmetric();
        insertsResults[1] = AlgaeExperiment.GetExperimentResult();

        if (AlgaeExperiment.algaeCount >= 8 && AlgaeExperiment.mudSize >= 16)
        {
            AlgaeExperiment.InsertPulsars();
            insertsResults[2] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[2] = 0;
        }

        if (AlgaeExperiment.algaeCount >= 187 && AlgaeExperiment.mudSize >= 27)
        {
            AlgaeExperiment.InsertMax();
            insertsResults[3] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[3] = 0;
        }

        if (AlgaeExperiment.algaeCount >= 54 && AlgaeExperiment.mudSize >= 24)
        {
            AlgaeExperiment.InsertSinglePuffers();
            insertsResults[4] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[4] = 0;
        }

        if (AlgaeExperiment.algaeCount >= 108 && AlgaeExperiment.mudSize >= 49)
        {
            AlgaeExperiment.InsertDoublePuffers();
            insertsResults[5] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[5] = 0;
        }

        if (AlgaeExperiment.mudSize > 5)
        {
            AlgaeExperiment.InsertRiskySetup();
            insertsResults[6] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[6] = 0;
        }

        AlgaeExperiment.InsertFoodBased();
        insertsResults[7] = AlgaeExperiment.GetExperimentResult();

        AlgaeExperiment.InsertFoodBasedBlocks();
        insertsResults[8] = AlgaeExperiment.GetExperimentResult();

        if (AlgaeExperiment.algaeCount >= 6 && AlgaeExperiment.mudSize >= 6)
        {
            AlgaeExperiment.InsertFoodBasedSixLines();
            insertsResults[9] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[9] = 0;
        }

        if (AlgaeExperiment.algaeCount >= 6 && AlgaeExperiment.mudSize >= 7)
        {
            AlgaeExperiment.InsertFoodBasedSixLinesSE();
            insertsResults[10] = AlgaeExperiment.GetExperimentResult();
        }
        else
        {
            insertsResults[10] = 0;
        }

        AlgaeExperiment.InsertFoodBasedBlinkers();
        insertsResults[11] = AlgaeExperiment.GetExperimentResult();

        bubbleSort(insertsResults, insertsNames);

        switch (insertsNames[11])
        {
            case "blocks":
                AlgaeExperiment.InsertBlocks();
                break;
            case "blocksSym":
                AlgaeExperiment.InsertBlocksSymmetric();
                break;
            case "pulsars":
                AlgaeExperiment.InsertPulsars();
                break;
            case "max":
                AlgaeExperiment.InsertMax();
                break;
            case "sPuffers":
                AlgaeExperiment.InsertSinglePuffers();
                break;
            case "dPuffers":
                AlgaeExperiment.InsertDoublePuffers();
                break;
            case "riskySetup":
                AlgaeExperiment.InsertRiskySetup();
                break;
            case "foodBased":
                AlgaeExperiment.InsertFoodBased();
                break;
            case "fbBlocks":
                AlgaeExperiment.InsertFoodBasedBlocks();
                break;
            case "fbLines":
                AlgaeExperiment.InsertFoodBasedSixLines();
                break;
            case "fbLinesSE":
                AlgaeExperiment.InsertFoodBasedSixLinesSE();
                break;
            case "fbBlinkers":
                AlgaeExperiment.InsertFoodBasedBlinkers();
                break;
            default:
                break;
        }
    }
}
AlgaeExperiment.GetExperimentResult = function()
{
    var mudInputFoodLocal = new Array(AlgaeExperiment.mudSize);
    for (var i = 0; i < AlgaeExperiment.mudSize; i++) {
        mudInputFoodLocal[i] = new Array(AlgaeExperiment.mudSize);
    }
    var neighboursSum;
    AlgaeExperiment.result = 0;

    //Make a local copy of the food state in the puddle of mud.
    for (i = 0; i < AlgaeExperiment.mudSize; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            mudInputFoodLocal[i][j] = AlgaeExperiment.mudInputFood[i][j];
        }
    }

    //Predict cell behaviour.
    //AlgaeExperiment.mudOutputNoFood is used for comparing and contains the last generation state of the puddle of mud.
    //AlgaeExperiment.mudOutputTempCopy is used for saving the new generation state.
    for (t = 0; t < AlgaeExperiment.generationsCount; t++)
    {
        for (i = 0; i < AlgaeExperiment.mudSize; i++)
        {
            for (j = 0; j < AlgaeExperiment.mudSize; j++)
            {
                neighboursSum = 0;

                if (AlgaeExperiment.IsValidCell(i - 1, j - 1, AlgaeExperiment.mudSize))
                    neighboursSum += AlgaeExperiment.mudOutputNoFood[i - 1][j - 1];
                if (AlgaeExperiment.IsValidCell(i - 1, j, AlgaeExperiment.mudSize))
                    neighboursSum += AlgaeExperiment.mudOutputNoFood[i - 1][j];
                if (AlgaeExperiment.IsValidCell(i - 1, j + 1, AlgaeExperiment.mudSize))
                    neighboursSum += AlgaeExperiment.mudOutputNoFood[i - 1][j + 1];
                if (AlgaeExperiment.IsValidCell(i, j - 1, AlgaeExperiment.mudSize))
                    neighboursSum += AlgaeExperiment.mudOutputNoFood[i][j - 1];
                if (AlgaeExperiment.IsValidCell(i, j + 1, AlgaeExperiment.mudSize))
                    neighboursSum += AlgaeExperiment.mudOutputNoFood[i][j + 1];
                if (AlgaeExperiment.IsValidCell(i + 1, j - 1, AlgaeExperiment.mudSize))
                    neighboursSum += AlgaeExperiment.mudOutputNoFood[i + 1][j - 1];
                if (AlgaeExperiment.IsValidCell(i + 1, j, AlgaeExperiment.mudSize))
                    neighboursSum += AlgaeExperiment.mudOutputNoFood[i + 1][j];
                if (AlgaeExperiment.IsValidCell(i + 1, j + 1, AlgaeExperiment.mudSize))
                    neighboursSum += AlgaeExperiment.mudOutputNoFood[i + 1][j + 1];

                //If the cell is alive.
                if (AlgaeExperiment.mudOutputNoFood[i][j] == 1)
                {
                    if (mudInputFoodLocal[i][j] == 1)
                    {
                        AlgaeExperiment.result++;
                        mudInputFoodLocal[i][j] = 0;
                    }

                    if (neighboursSum < 2 || neighboursSum > 3)
                    {
                        AlgaeExperiment.mudOutputTempCopy[i][j] = 0;
                    }
                }
                //If the cell is dead.
                else
                {
                    if (neighboursSum == 3)
                    {
                        AlgaeExperiment.mudOutputTempCopy[i][j] = 1;

                        if (mudInputFoodLocal[i][j] == 1)
                        {
                            AlgaeExperiment.result++;
                            mudInputFoodLocal[i][j] = 0;
                        }
                    }
                }
            }
        }

        //Comment before release.
        //PrintCurrentState(AlgaeExperiment.mudOutputNoFood, t);

        //Replace the old puddle of mud state with the new puddle of mud state.
        for (i = 0; i < AlgaeExperiment.mudSize; i++)
        {
            for (j = 0; j < AlgaeExperiment.mudSize; j++)
            {
                AlgaeExperiment.mudOutputNoFood[i][j] = AlgaeExperiment.mudOutputTempCopy[i][j];
            }
        }
    }

    var resultAlgaeCount = 0;

    //At this state the AlgaeExperiment.result contains only the eaten food.
    //Add the algae count to the AlgaeExperiment.result. If the algae count = 0, then AlgaeExperiment.result = 0.
    for (i = 0; i < AlgaeExperiment.mudSize; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            if (AlgaeExperiment.mudOutputNoFood[i][j] == 1)
            {
                AlgaeExperiment.result++;
                resultAlgaeCount++;
            }
        }
    }

    if (resultAlgaeCount == 0)
        AlgaeExperiment.result = 0;
            
    //Comment before release.
    //PrintCurrentState(AlgaeExperiment.mudOutputNoFood);

    //Reset the muds after running a particular experiment to prepare them for the next experiment.
    for (i = 0; i < AlgaeExperiment.mudSize; i++)
    {
        for (j = 0; j < AlgaeExperiment.mudSize; j++)
        {
            AlgaeExperiment.mudOutputNoFood[i][j] = 0;
            AlgaeExperiment.mudOutputTempCopy[i][j] = 0;
        }
    }

    return AlgaeExperiment.result;
}
AlgaeExperiment.IsValidCell = function(x, y, ms)
{
    if (x < 0 || x >= ms || y < 0 || y >= ms)
        return false;
    else
        return true;
}
AlgaeExperiment.PrintOutput = function () {

    AlgaeExperiment.startingArray = new Array(AlgaeExperiment.mudSize);

    for (i = 0; i < AlgaeExperiment.mudSize; i++) {

        AlgaeExperiment.startingArray[i] = new Array(AlgaeExperiment.mudSize);

        for (j = 0; j < AlgaeExperiment.mudSize; j++) {
            if (AlgaeExperiment.mudOutputNoFood[i][j] == 1) {
                AlgaeExperiment.mudOutputWithFood[i][j] = '+';
            }
            AlgaeExperiment.startingArray[i][j] = AlgaeExperiment.mudOutputWithFood[i][j];
        }
    }
    return AlgaeExperiment.startingArray;
}
AlgaeExperiment.RunPavelRun = function (a, d) {
    var neighboursSum;
    var ultraStupid = new Array();
    var s = d.length;
    var nd = new Array(s);
    for (i = 0; i < s; i++) {
        nd[i] = new Array(s);
        for (j = 0; j < s; j++) {
            nd[i][j] = d[i][j].valueOf();
        }
    }
    // var nd = d;
    a = parseInt(a);
    for (t = 0; t < a; t++) {
        // output.AppendLine(String.Format("gen {0}", t + 1));

        ultraStupid[t] = new Array();

        for (i = 0; i < s; i++) {
            for (j = 0; j < s; j++) {
                neighboursSum = 0;

                if (AlgaeExperiment.IsValidCell(i - 1, j - 1, s))
                    if (d[i - 1][j - 1] == '+')
                        neighboursSum++;
                if (AlgaeExperiment.IsValidCell(i - 1, j, s))
                    if (d[i - 1][j] == '+')
                        neighboursSum++;
                if (AlgaeExperiment.IsValidCell(i - 1, j + 1, s))
                    if (d[i - 1][j + 1] == '+')
                        neighboursSum++;
                if (AlgaeExperiment.IsValidCell(i, j - 1, s))
                    if (d[i][j - 1] == '+')
                        neighboursSum++;
                if (AlgaeExperiment.IsValidCell(i, j + 1, s))
                    if (d[i][j + 1] == '+')
                        neighboursSum++;
                if (AlgaeExperiment.IsValidCell(i + 1, j - 1, s))
                    if (d[i + 1][j - 1] == '+')
                        neighboursSum++;
                if (AlgaeExperiment.IsValidCell(i + 1, j, s))
                    if (d[i + 1][j] == '+')
                        neighboursSum++;
                if (AlgaeExperiment.IsValidCell(i + 1, j + 1, s))
                    if (d[i + 1][j + 1] == '+')
                        neighboursSum++;

                //If the cell is alive.
                if (d[i][j] == '+') {
                    if (neighboursSum < 2 || neighboursSum > 3) {
                        nd[i][j] = '0';
                        ultraStupid[t].push([i, j, 2]);
                    }
                }
                //If the cell is dead.
                else {
                    if (neighboursSum == 3) {
                        nd[i][j] = '+';
                        ultraStupid[t].push([i, j, 1]);
                    }
                }
            }
        }

        for (i = 0; i < s; i++) {
            for (j = 0; j < s; j++) {
                d[i][j] = nd[i][j];
            }
        }
    }
    return ultraStupid;
}
var AlgaeMainExperiment = function () { };
AlgaeMainExperiment.init = function (a, b, c, d) {

    AlgaeExperiment.ReadInput(parseInt(a), parseInt(b), parseInt(c), d);
    AlgaeExperiment.GenerateAlgaeSetup();
    return AlgaeExperiment.PrintOutput();
}

function bubbleSort(a,b)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) 
            {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
 
                var temp = b[i];
                b[i] = b[i+1];
                b[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}


