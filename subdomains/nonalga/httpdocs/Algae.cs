using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Algae
{
    public class AlgaeExperiment
    {
        private static AlgaeExperiment instance;

        private AlgaeExperiment() { }

        public static AlgaeExperiment Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new AlgaeExperiment();
                }
                return instance;
            }
        }

        int generationsCount;
        int algaeCount;
        //int algaeUsedCount = 0;
        int mudSize;
        int result = 0;
        int foodCount = 0;

        int[,] mudInputFood;
        int[,] mudOutputNoFood;
        int[,] mudOutputTempCopy;
        char[,] mudOutputWithFood;

        public void ReadInput()
        {
            generationsCount = int.Parse(Console.ReadLine());
            algaeCount = int.Parse(Console.ReadLine());
            mudSize = int.Parse(Console.ReadLine());

            mudInputFood = new int[mudSize, mudSize];
            mudOutputNoFood = new int[mudSize, mudSize];
            mudOutputTempCopy = new int[mudSize, mudSize];
            mudOutputWithFood = new char[mudSize, mudSize];

            for (int i = 0; i < mudSize; i++)
            {
                string mudRow = Console.ReadLine();

                for (int j = 0; j < mudRow.Length; j++)
                {
                    if (mudRow[j] == 'F')
                    {
                        mudInputFood[i, j] = 1;
                        mudOutputWithFood[i, j] = 'F';
                        foodCount++;
                    }
                    else
                    {
                        mudInputFood[i, j] = 0;
                        mudOutputWithFood[i, j] = '0';
                    }
                }
            }
        }

        public void GenerateInput(int foodDropChance)
        {
            generationsCount = int.Parse(Console.ReadLine());
            algaeCount = int.Parse(Console.ReadLine());
            mudSize = int.Parse(Console.ReadLine());

            mudInputFood = new int[mudSize, mudSize];
            mudOutputNoFood = new int[mudSize, mudSize];
            mudOutputTempCopy = new int[mudSize, mudSize];
            mudOutputWithFood = new char[mudSize, mudSize];

            Random r = new Random();

            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (r.Next(1, 101) <= foodDropChance)
                    {
                        mudInputFood[i, j] = 1;
                        mudOutputWithFood[i, j] = 'F';
                        foodCount++;
                    }
                    else
                    {
                        mudInputFood[i, j] = 0;
                        mudOutputWithFood[i, j] = '0';
                    }
                }
            }
        }

        //Input initial algae setup manually.
        public void ReadOutput()
        {
            for (int i = 0; i < mudSize; i++)
            {
                string mudRow = Console.ReadLine();

                for (int j = 0; j < mudRow.Length; j++)
                {
                    if (mudRow[j] == '+')
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                    }
                    else
                    {
                        mudOutputNoFood[i, j] = 0;
                        mudOutputTempCopy[i, j] = 0;
                    }
                }
            }
        }

        //Insert still forms of life - blocks.
        private void InsertBlocks()
        {
            int algaeUsedCount = 0;

            for (int i = 0; i < mudSize; i += 4)
            {
                for (int j = 0; j < mudSize; j += 4)
                {
                    if (algaeUsedCount < algaeCount - 2)
                    {
                        InsertBlock(i, j, ref algaeUsedCount);
                    }
                    else
                    {
                        return;
                    }
                }
            }
        }

        private void InsertBlock(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            if (IsValidCell(1 + offsetI, 1 + offsetJ, mudSize))
            {
                mudOutputNoFood[0 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[1 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[1 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 1 + offsetJ] = 1;

                algaeUsedCount += 3;
            }
        }

        private void InsertBlocksSymmetric()
        {
            int algaeUsedCount = 0;
            int fillLimit = 3 * (int)Math.Sqrt(algaeCount / 3);

            if (fillLimit > mudSize)
                fillLimit = mudSize;

            for (int i = 0; i < fillLimit; i += 3)
            {
                for (int j = 0; j < fillLimit; j += 3)
                {
                    if (algaeUsedCount < algaeCount - 2)
                    {
                        if (i % 2 == 0 && j % 2 == 0)
                            InsertBlockSymmetricTL(i, j, ref algaeUsedCount);
                        else if (i % 2 == 0 && j % 2 == 1)
                            InsertBlockSymmetricTR(i, j, ref algaeUsedCount);
                        else if (i % 2 == 1 && j % 2 == 0)
                            InsertBlockSymmetricBL(i, j, ref algaeUsedCount);
                        else if (i % 2 == 1 && j % 2 == 1)
                            InsertBlockSymmetricBR(i, j, ref algaeUsedCount);
                    }
                    else
                    {
                        return;
                    }
                }
            }
        }

        private void InsertBlockSymmetricTL(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            if (IsValidCell(1 + offsetI, 1 + offsetJ, mudSize))
            {
                mudOutputNoFood[0 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[1 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[1 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 1 + offsetJ] = 1;

                algaeUsedCount += 3;
            }
        }

        private void InsertBlockSymmetricTR(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            if (IsValidCell(1 + offsetI, 1 + offsetJ, mudSize))
            {
                mudOutputNoFood[0 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[1 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[1 + offsetI, 1 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 1 + offsetJ] = 1;

                algaeUsedCount += 3;
            }
        }

        private void InsertBlockSymmetricBL(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            if (IsValidCell(1 + offsetI, 1 + offsetJ, mudSize))
            {
                mudOutputNoFood[0 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[1 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[1 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[1 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[1 + offsetI, 1 + offsetJ] = 1;

                algaeUsedCount += 3;
            }
        }

        private void InsertBlockSymmetricBR(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            if (IsValidCell(1 + offsetI, 1 + offsetJ, mudSize))
            {
                mudOutputNoFood[1 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[1 + offsetI, 1 + offsetJ] = 1;

                mudOutputNoFood[1 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[1 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 1 + offsetJ] = 1;

                algaeUsedCount += 3;
            }
        }

        //Insert oscillators - pulsars.
        private void InsertPulsars()
        {
            int algaeUsedCount = 0;

            int pulsarsSqrt = mudSize / 16;
            int sectorFoodSum = 0;
            int[,] sectorFoodSums = new int[pulsarsSqrt, pulsarsSqrt];
            int[] sectorFoodSumsKeys = new int[pulsarsSqrt * pulsarsSqrt];
            int[] sectorFoodPosValues = new int[pulsarsSqrt * pulsarsSqrt];

            for (int i = 0; i < pulsarsSqrt * 16; i += 16)
            {
                for (int j = 0; j < pulsarsSqrt * 16; j += 16)
                {
                    for (int k = i + 1; k < i + 14; k++)
                    {
                        for (int l = j + 1; l < j + 14; l++)
                        {
                            sectorFoodSum += mudInputFood[k, l];
                        }
                    }

                    sectorFoodSums[i / 16, j / 16] = sectorFoodSum;
                    sectorFoodSum = 0;
                }
            }

            for (int i = 0; i < pulsarsSqrt; i++)
            {
                for (int j = 0; j < pulsarsSqrt; j++)
                {
                    sectorFoodSumsKeys[i * pulsarsSqrt + j] = sectorFoodSums[i, j];
                    sectorFoodPosValues[i * pulsarsSqrt + j] = i * pulsarsSqrt + j;
                }
            }

            Array.Sort(sectorFoodSumsKeys, sectorFoodPosValues);

            for (int i = sectorFoodPosValues.Length - 1; i >= 0; i--)
            {
                if (algaeUsedCount < algaeCount - 7)
                {
                    InsertPulsar((sectorFoodPosValues[i] / pulsarsSqrt) * 16, (sectorFoodPosValues[i] % pulsarsSqrt) * 16, ref algaeUsedCount);
                }
                else
                {
                    return;
                }
            }
        }

        private void InsertPulsar(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            mudOutputNoFood[6 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 4 + offsetJ] = 1;

            mudOutputNoFood[7 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 4 + offsetJ] = 1;

            mudOutputNoFood[8 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 4 + offsetJ] = 1;

            mudOutputNoFood[7 + offsetI, 5 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 5 + offsetJ] = 1;

            mudOutputNoFood[6 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 10 + offsetJ] = 1;

            mudOutputNoFood[7 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 10 + offsetJ] = 1;

            mudOutputNoFood[8 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 10 + offsetJ] = 1;

            mudOutputNoFood[7 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 9 + offsetJ] = 1;

            algaeUsedCount += 8;
        }

        private void InsertHs()
        {
            int algaeUsedCount = 0;

            int hSqrt = mudSize / 80;
            int sectorFoodSum = 0;
            int[,] sectorFoodSums = new int[hSqrt, hSqrt];
            int[] sectorFoodSumsKeys = new int[hSqrt * hSqrt];
            int[] sectorFoodPosValues = new int[hSqrt * hSqrt];

            for (int i = 0; i < hSqrt * 80; i += 80)
            {
                for (int j = 0; j < hSqrt * 80; j += 80)
                {
                    for (int k = i + 1; k < i + 78; k++)
                    {
                        for (int l = j + 1; l < j + 78; l++)
                        {
                            sectorFoodSum += mudInputFood[k, l];
                        }
                    }

                    sectorFoodSums[i / 80, j / 80] = sectorFoodSum;
                    sectorFoodSum = 0;
                }
            }

            for (int i = 0; i < hSqrt; i++)
            {
                for (int j = 0; j < hSqrt; j++)
                {
                    sectorFoodSumsKeys[i * hSqrt + j] = sectorFoodSums[i, j];
                    sectorFoodPosValues[i * hSqrt + j] = i * hSqrt + j;
                }
            }

            Array.Sort(sectorFoodSumsKeys, sectorFoodPosValues);

            for (int i = sectorFoodPosValues.Length - 1; i >= 0; i--)
            {
                if (algaeUsedCount < algaeCount - 9)
                {
                    InsertH((sectorFoodPosValues[i] / hSqrt) * 80, (sectorFoodPosValues[i] % hSqrt) * 80, ref algaeUsedCount);
                }
                else
                {
                    return;
                }
            }
        }

        private void InsertH(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            mudOutputNoFood[38 + offsetI, 37 + offsetJ] = 1;
            mudOutputTempCopy[38 + offsetI, 37 + offsetJ] = 1;

            mudOutputNoFood[39 + offsetI, 37 + offsetJ] = 1;
            mudOutputTempCopy[39 + offsetI, 37 + offsetJ] = 1;

            mudOutputNoFood[40 + offsetI, 37 + offsetJ] = 1;
            mudOutputTempCopy[40 + offsetI, 37 + offsetJ] = 1;

            mudOutputNoFood[39 + offsetI, 38 + offsetJ] = 1;
            mudOutputTempCopy[39 + offsetI, 38 + offsetJ] = 1;

            mudOutputNoFood[39 + offsetI, 39 + offsetJ] = 1;
            mudOutputTempCopy[39 + offsetI, 39 + offsetJ] = 1;

            mudOutputNoFood[39 + offsetI, 40 + offsetJ] = 1;
            mudOutputTempCopy[39 + offsetI, 40 + offsetJ] = 1;

            mudOutputNoFood[39 + offsetI, 41 + offsetJ] = 1;
            mudOutputTempCopy[39 + offsetI, 41 + offsetJ] = 1;

            mudOutputNoFood[39 + offsetI, 42 + offsetJ] = 1;
            mudOutputTempCopy[39 + offsetI, 42 + offsetJ] = 1;

            mudOutputNoFood[38 + offsetI, 42 + offsetJ] = 1;
            mudOutputTempCopy[38 + offsetI, 42 + offsetJ] = 1;

            mudOutputNoFood[40 + offsetI, 42 + offsetJ] = 1;
            mudOutputTempCopy[40 + offsetI, 42 + offsetJ] = 1;

            algaeUsedCount += 10;
        }

        //Insert Max in the centre of the puddle of mud.
        private void InsertMax()
        {
            if (mudSize >= 27 && algaeCount >= 187)
            {
                int offset = (mudSize - 27) / 2;
                InsertMax(offset, offset);
            }
        }

        //Insert Max coordinates.
        private void InsertMax(int offsetI, int offsetJ)
        {
            mudOutputNoFood[0 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[1 + offsetI, 17 + offsetJ] = 1;
            mudOutputNoFood[1 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[1 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 12 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 14 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 14 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 22 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 14 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 17 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 23 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 24 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 12 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 17 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 23 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 24 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 0 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 22 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 23 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 24 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 0 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 5 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 14 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 24 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 25 + offsetJ] = 1;
            mudOutputNoFood[9 + offsetI, 0 + offsetJ] = 1;
            mudOutputNoFood[9 + offsetI, 6 + offsetJ] = 1;
            mudOutputNoFood[9 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[9 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 5 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 17 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 23 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 24 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 25 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 26 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 5 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 17 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 22 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 26 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 0 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 6 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 26 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 0 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 5 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 22 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 25 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 0 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 17 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 22 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 25 + offsetJ] = 1;
            mudOutputNoFood[17 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[17 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[17 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[17 + offsetI, 26 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 12 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 17 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 22 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 26 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 6 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 17 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 23 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 24 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 25 + offsetJ] = 1;
            mudOutputNoFood[19 + offsetI, 26 + offsetJ] = 1;
            mudOutputNoFood[20 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[20 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[20 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[20 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[20 + offsetI, 14 + offsetJ] = 1;
            mudOutputNoFood[21 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[21 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[21 + offsetI, 5 + offsetJ] = 1;
            mudOutputNoFood[21 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[21 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[21 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[21 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[22 + offsetI, 5 + offsetJ] = 1;
            mudOutputNoFood[22 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[22 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[22 + offsetI, 12 + offsetJ] = 1;
            mudOutputNoFood[22 + offsetI, 16 + offsetJ] = 1;
            mudOutputNoFood[23 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[23 + offsetI, 5 + offsetJ] = 1;
            mudOutputNoFood[23 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[23 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[23 + offsetI, 11 + offsetJ] = 1;
            mudOutputNoFood[23 + offsetI, 12 + offsetJ] = 1;
            mudOutputNoFood[23 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[24 + offsetI, 6 + offsetJ] = 1;
            mudOutputNoFood[24 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[24 + offsetI, 12 + offsetJ] = 1;
            mudOutputNoFood[24 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[24 + offsetI, 14 + offsetJ] = 1;
            mudOutputNoFood[25 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[25 + offsetI, 8 + offsetJ] = 1;
            mudOutputNoFood[25 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[26 + offsetI, 8 + offsetJ] = 1;

            mudOutputTempCopy[0 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[1 + offsetI, 17 + offsetJ] = 1;
            mudOutputTempCopy[1 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[1 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 12 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 14 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 14 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 22 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 14 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 17 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 23 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 24 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 12 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 17 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 23 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 24 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 0 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 22 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 23 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 24 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 0 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 5 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 14 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 24 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 25 + offsetJ] = 1;
            mudOutputTempCopy[9 + offsetI, 0 + offsetJ] = 1;
            mudOutputTempCopy[9 + offsetI, 6 + offsetJ] = 1;
            mudOutputTempCopy[9 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[9 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 5 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 17 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 23 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 24 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 25 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 26 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 5 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 17 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 22 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 26 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 0 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 6 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 26 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 0 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 5 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 22 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 25 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 0 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 17 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 22 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 25 + offsetJ] = 1;
            mudOutputTempCopy[17 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[17 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[17 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[17 + offsetI, 26 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 12 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 17 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 22 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 26 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 6 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 17 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 23 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 24 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 25 + offsetJ] = 1;
            mudOutputTempCopy[19 + offsetI, 26 + offsetJ] = 1;
            mudOutputTempCopy[20 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[20 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[20 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[20 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[20 + offsetI, 14 + offsetJ] = 1;
            mudOutputTempCopy[21 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[21 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[21 + offsetI, 5 + offsetJ] = 1;
            mudOutputTempCopy[21 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[21 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[21 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[21 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[22 + offsetI, 5 + offsetJ] = 1;
            mudOutputTempCopy[22 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[22 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[22 + offsetI, 12 + offsetJ] = 1;
            mudOutputTempCopy[22 + offsetI, 16 + offsetJ] = 1;
            mudOutputTempCopy[23 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[23 + offsetI, 5 + offsetJ] = 1;
            mudOutputTempCopy[23 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[23 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[23 + offsetI, 11 + offsetJ] = 1;
            mudOutputTempCopy[23 + offsetI, 12 + offsetJ] = 1;
            mudOutputTempCopy[23 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[24 + offsetI, 6 + offsetJ] = 1;
            mudOutputTempCopy[24 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[24 + offsetI, 12 + offsetJ] = 1;
            mudOutputTempCopy[24 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[24 + offsetI, 14 + offsetJ] = 1;
            mudOutputTempCopy[25 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[25 + offsetI, 8 + offsetJ] = 1;
            mudOutputTempCopy[25 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[26 + offsetI, 8 + offsetJ] = 1;

            //algaeUsedCount += 187;
        }

        //Insert a single line of puffers.
        private void InsertSinglePuffers()
        {
            int algaeUsedCount = 0;

            int puffersCount = mudSize / 24;
            int sectorFoodSum = 0;
            int[] sectorFoodSumsKeys = new int[puffersCount];
            int[] sectorFoodPosValues = new int[puffersCount];

            for (int j = 0; j < puffersCount * 24; j += 24)
            {
                for (int k = 0; k < mudSize; k++)
                {
                    for (int l = j; l < j + 24; l++)
                    {
                        sectorFoodSum += mudInputFood[k, l];
                    }
                }

                sectorFoodSumsKeys[j / 24] = sectorFoodSum;
                sectorFoodSum = 0;
            }

            for (int i = 0; i < puffersCount; i++)
            {
                    sectorFoodPosValues[i] = i;
            }

            Array.Sort(sectorFoodSumsKeys, sectorFoodPosValues);

            for (int j = sectorFoodPosValues.Length - 1; j >= 0; j--)
            {
                if (algaeUsedCount < algaeCount - 53)
                {
                    InsertSinglePuffer(sectorFoodPosValues[j] * 24, ref algaeUsedCount);
                }
                else
                {
                    return;
                }
            }
        }

        private void InsertSinglePuffer(int offsetJ, ref int algaeUsedCount)
        {
            mudOutputNoFood[0, 2 + offsetJ] = 1;
            mudOutputNoFood[0, 3 + offsetJ] = 1;
            mudOutputNoFood[0, 19 + offsetJ] = 1;
            mudOutputNoFood[0, 20 + offsetJ] = 1;
            mudOutputNoFood[1, 2 + offsetJ] = 1;
            mudOutputNoFood[1, 3 + offsetJ] = 1;
            mudOutputNoFood[1, 4 + offsetJ] = 1;
            mudOutputNoFood[1, 18 + offsetJ] = 1;
            mudOutputNoFood[1, 19 + offsetJ] = 1;
            mudOutputNoFood[1, 20 + offsetJ] = 1;
            mudOutputNoFood[2, 2 + offsetJ] = 1;
            mudOutputNoFood[2, 3 + offsetJ] = 1;
            mudOutputNoFood[2, 4 + offsetJ] = 1;
            mudOutputNoFood[2, 18 + offsetJ] = 1;
            mudOutputNoFood[2, 19 + offsetJ] = 1;
            mudOutputNoFood[2, 20 + offsetJ] = 1;
            mudOutputNoFood[3, 2 + offsetJ] = 1;
            mudOutputNoFood[3, 3 + offsetJ] = 1;
            mudOutputNoFood[3, 4 + offsetJ] = 1;
            mudOutputNoFood[3, 7 + offsetJ] = 1;
            mudOutputNoFood[3, 15 + offsetJ] = 1;
            mudOutputNoFood[3, 18 + offsetJ] = 1;
            mudOutputNoFood[3, 19 + offsetJ] = 1;
            mudOutputNoFood[3, 20 + offsetJ] = 1;
            mudOutputNoFood[4, 1 + offsetJ] = 1;
            mudOutputNoFood[4, 3 + offsetJ] = 1;
            mudOutputNoFood[4, 4 + offsetJ] = 1;
            mudOutputNoFood[4, 7 + offsetJ] = 1;
            mudOutputNoFood[4, 15 + offsetJ] = 1;
            mudOutputNoFood[4, 18 + offsetJ] = 1;
            mudOutputNoFood[4, 19 + offsetJ] = 1;
            mudOutputNoFood[4, 21 + offsetJ] = 1;
            mudOutputNoFood[5, 1 + offsetJ] = 1;
            mudOutputNoFood[5, 2 + offsetJ] = 1;
            mudOutputNoFood[5, 3 + offsetJ] = 1;
            mudOutputNoFood[5, 7 + offsetJ] = 1;
            mudOutputNoFood[5, 15 + offsetJ] = 1;
            mudOutputNoFood[5, 19 + offsetJ] = 1;
            mudOutputNoFood[5, 20 + offsetJ] = 1;
            mudOutputNoFood[5, 21 + offsetJ] = 1;
            mudOutputNoFood[6, 2 + offsetJ] = 1;
            mudOutputNoFood[6, 7 + offsetJ] = 1;
            mudOutputNoFood[6, 15 + offsetJ] = 1;
            mudOutputNoFood[6, 20 + offsetJ] = 1;
            mudOutputNoFood[7, 7 + offsetJ] = 1;
            mudOutputNoFood[7, 10 + offsetJ] = 1;
            mudOutputNoFood[7, 12 + offsetJ] = 1;
            mudOutputNoFood[7, 15 + offsetJ] = 1;
            mudOutputNoFood[8, 7 + offsetJ] = 1;
            mudOutputNoFood[8, 8 + offsetJ] = 1;
            mudOutputNoFood[8, 9 + offsetJ] = 1;
            mudOutputNoFood[8, 13 + offsetJ] = 1;
            mudOutputNoFood[8, 14 + offsetJ] = 1;
            mudOutputNoFood[8, 15 + offsetJ] = 1;

            mudOutputTempCopy[0, 2 + offsetJ] = 1;
            mudOutputTempCopy[0, 3 + offsetJ] = 1;
            mudOutputTempCopy[0, 19 + offsetJ] = 1;
            mudOutputTempCopy[0, 20 + offsetJ] = 1;
            mudOutputTempCopy[1, 2 + offsetJ] = 1;
            mudOutputTempCopy[1, 3 + offsetJ] = 1;
            mudOutputTempCopy[1, 4 + offsetJ] = 1;
            mudOutputTempCopy[1, 18 + offsetJ] = 1;
            mudOutputTempCopy[1, 19 + offsetJ] = 1;
            mudOutputTempCopy[1, 20 + offsetJ] = 1;
            mudOutputTempCopy[2, 2 + offsetJ] = 1;
            mudOutputTempCopy[2, 3 + offsetJ] = 1;
            mudOutputTempCopy[2, 4 + offsetJ] = 1;
            mudOutputTempCopy[2, 18 + offsetJ] = 1;
            mudOutputTempCopy[2, 19 + offsetJ] = 1;
            mudOutputTempCopy[2, 20 + offsetJ] = 1;
            mudOutputTempCopy[3, 2 + offsetJ] = 1;
            mudOutputTempCopy[3, 3 + offsetJ] = 1;
            mudOutputTempCopy[3, 4 + offsetJ] = 1;
            mudOutputTempCopy[3, 7 + offsetJ] = 1;
            mudOutputTempCopy[3, 15 + offsetJ] = 1;
            mudOutputTempCopy[3, 18 + offsetJ] = 1;
            mudOutputTempCopy[3, 19 + offsetJ] = 1;
            mudOutputTempCopy[3, 20 + offsetJ] = 1;
            mudOutputTempCopy[4, 1 + offsetJ] = 1;
            mudOutputTempCopy[4, 3 + offsetJ] = 1;
            mudOutputTempCopy[4, 4 + offsetJ] = 1;
            mudOutputTempCopy[4, 7 + offsetJ] = 1;
            mudOutputTempCopy[4, 15 + offsetJ] = 1;
            mudOutputTempCopy[4, 18 + offsetJ] = 1;
            mudOutputTempCopy[4, 19 + offsetJ] = 1;
            mudOutputTempCopy[4, 21 + offsetJ] = 1;
            mudOutputTempCopy[5, 1 + offsetJ] = 1;
            mudOutputTempCopy[5, 2 + offsetJ] = 1;
            mudOutputTempCopy[5, 3 + offsetJ] = 1;
            mudOutputTempCopy[5, 7 + offsetJ] = 1;
            mudOutputTempCopy[5, 15 + offsetJ] = 1;
            mudOutputTempCopy[5, 19 + offsetJ] = 1;
            mudOutputTempCopy[5, 20 + offsetJ] = 1;
            mudOutputTempCopy[5, 21 + offsetJ] = 1;
            mudOutputTempCopy[6, 2 + offsetJ] = 1;
            mudOutputTempCopy[6, 7 + offsetJ] = 1;
            mudOutputTempCopy[6, 15 + offsetJ] = 1;
            mudOutputTempCopy[6, 20 + offsetJ] = 1;
            mudOutputTempCopy[7, 7 + offsetJ] = 1;
            mudOutputTempCopy[7, 10 + offsetJ] = 1;
            mudOutputTempCopy[7, 12 + offsetJ] = 1;
            mudOutputTempCopy[7, 15 + offsetJ] = 1;
            mudOutputTempCopy[8, 7 + offsetJ] = 1;
            mudOutputTempCopy[8, 8 + offsetJ] = 1;
            mudOutputTempCopy[8, 9 + offsetJ] = 1;
            mudOutputTempCopy[8, 13 + offsetJ] = 1;
            mudOutputTempCopy[8, 14 + offsetJ] = 1;
            mudOutputTempCopy[8, 15 + offsetJ] = 1;

            algaeUsedCount += 54;
        }

        //Insert two lines of puffers.
        private void InsertDoublePuffers()
        {
            int algaeUsedCount = 0;

            int puffersCount = mudSize / 24;
            int sectorFoodSum = 0;
            int[] sectorFoodSumsKeys = new int[puffersCount];
            int[] sectorFoodPosValues = new int[puffersCount];

            for (int j = 0; j < puffersCount * 24; j += 24)
            {
                for (int k = 0; k < mudSize; k++)
                {
                    for (int l = j; l < j + 24; l++)
                    {
                        sectorFoodSum += mudInputFood[k, l];
                    }
                }

                sectorFoodSumsKeys[j / 24] = sectorFoodSum;
                sectorFoodSum = 0;
            }

            for (int i = 0; i < puffersCount; i++)
            {
                sectorFoodPosValues[i] = i;
            }

            Array.Sort(sectorFoodSumsKeys, sectorFoodPosValues);

            for (int j = sectorFoodPosValues.Length - 1; j >= 0; j--)
            {
                if (algaeUsedCount < algaeCount - 107)
                {
                    InsertDoublePuffer((mudSize - 19) / 2, sectorFoodPosValues[j] * 24, ref algaeUsedCount);
                }
                else
                {
                    return;
                }
            }
        }

        private void InsertDoublePuffer(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            mudOutputNoFood[0 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[0 + offsetI, 8 + offsetJ] = 1;
            mudOutputNoFood[0 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[0 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[0 + offsetI, 14 + offsetJ] = 1;
            mudOutputNoFood[0 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[1 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[1 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[1 + offsetI, 12 + offsetJ] = 1;
            mudOutputNoFood[1 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[2 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[3 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[4 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[5 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[6 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[7 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[8 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[10 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[11 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[12 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[13 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 4 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 18 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[14 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 1 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 3 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 19 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[15 + offsetI, 21 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 2 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[16 + offsetI, 20 + offsetJ] = 1;
            mudOutputNoFood[17 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[17 + offsetI, 10 + offsetJ] = 1;
            mudOutputNoFood[17 + offsetI, 12 + offsetJ] = 1;
            mudOutputNoFood[17 + offsetI, 15 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 7 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 8 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 9 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 13 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 14 + offsetJ] = 1;
            mudOutputNoFood[18 + offsetI, 15 + offsetJ] = 1;

            mudOutputTempCopy[0 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[0 + offsetI, 8 + offsetJ] = 1;
            mudOutputTempCopy[0 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[0 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[0 + offsetI, 14 + offsetJ] = 1;
            mudOutputTempCopy[0 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[1 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[1 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[1 + offsetI, 12 + offsetJ] = 1;
            mudOutputTempCopy[1 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[2 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[3 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[4 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[5 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[6 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[7 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[8 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[10 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[11 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[12 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[13 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 4 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 18 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[14 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 1 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 3 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 19 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[15 + offsetI, 21 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 2 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[16 + offsetI, 20 + offsetJ] = 1;
            mudOutputTempCopy[17 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[17 + offsetI, 10 + offsetJ] = 1;
            mudOutputTempCopy[17 + offsetI, 12 + offsetJ] = 1;
            mudOutputTempCopy[17 + offsetI, 15 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 7 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 8 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 9 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 13 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 14 + offsetJ] = 1;
            mudOutputTempCopy[18 + offsetI, 15 + offsetJ] = 1;

            algaeUsedCount += 108;
        }

        private void InsertRiskySetup()
        {
            int algaeUsedCount = 0;

            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (algaeUsedCount <= algaeCount + 5)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }

            if (IsValidCell(0, 0, mudSize))
            {
                mudOutputNoFood[0, 0] = 0;
                mudOutputTempCopy[0, 0] = 0;
            }
            if (IsValidCell(0, 1, mudSize))
            {
                mudOutputNoFood[0, 1] = 0;
                mudOutputTempCopy[0, 1] = 0;
            }
            if (IsValidCell(0, 2, mudSize))
            {
                mudOutputNoFood[0, 2] = 0;
                mudOutputTempCopy[0, 2] = 0;
            }
            if (IsValidCell(0, 3, mudSize))
            {
                mudOutputNoFood[0, 3] = 0;
                mudOutputTempCopy[0, 3] = 0;
            }
            if (IsValidCell(0, 4, mudSize))
            {
                mudOutputNoFood[0, 4] = 0;
                mudOutputTempCopy[0, 4] = 0;
            }

            algaeUsedCount -= 5;
        }

        private void InsertFoodBased()
        {
            int algaeUsedCount = 0;

            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (mudInputFood[i, j] == 1 && algaeUsedCount < algaeCount)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }

            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (mudOutputNoFood[i, j] != 1 && algaeUsedCount < algaeCount)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }
        }

        private void InsertFoodBasedBlocks()
        {
            int algaeUsedCount = 0;
            int algaeInserted = algaeUsedCount;
            bool IsBlockInserted = false;

            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (mudInputFood[i, j] == 1 && algaeUsedCount < algaeCount - 2)
                    {
                        algaeInserted = algaeUsedCount;
                        InsertBlock(i, j, ref algaeUsedCount);
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

            for (int i = mudSize - 1; i >= 0; i--)
            {
                for (int j = mudSize - 1; j >= 0; j--)
                {
                    if (mudInputFood[i, j] == 1 && algaeUsedCount < algaeCount && mudOutputNoFood[i, j] != 1)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }

            for (int i = mudSize - 1; i >= 0; i--)
            {
                for (int j = mudSize - 1; j >= 0; j--)
                {
                    if (mudOutputNoFood[i, j] != 1 && algaeUsedCount < algaeCount)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }
        }

        private void InsertFoodBasedSixLines()
        {
            int algaeUsedCount = 0;
            int algaeInserted = algaeUsedCount;
            bool IsLineInserted = false;

            for (int i = 1; i < mudSize - 1; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (mudInputFood[i, j] == 1 && algaeUsedCount < algaeCount - 5)
                    {
                        algaeInserted = algaeUsedCount;
                        InsertSixLine(i, j, ref algaeUsedCount);
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

            for (int i = mudSize - 1; i >= 0; i--)
            {
                for (int j = mudSize - 1; j >= 0; j--)
                {
                    if (mudInputFood[i, j] == 1 && algaeUsedCount < algaeCount && mudOutputNoFood[i, j] != 1)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }

            for (int i = mudSize - 1; i >= 0; i--)
            {
                for (int j = mudSize - 1; j >= 0; j--)
                {
                    if (mudOutputNoFood[i, j] != 1 && algaeUsedCount < algaeCount)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }
        }

        private void InsertFoodBasedSixLinesSE()
        {
            int algaeUsedCount = 0;

            int linesSqrt = mudSize / 7;
            int sectorFoodSum = 0;
            int[,] sectorFoodSums = new int[linesSqrt, linesSqrt];
            int[] sectorFoodSumsKeys = new int[linesSqrt * linesSqrt];
            int[] sectorFoodPosValues = new int[linesSqrt * linesSqrt];

            for (int i = 0; i < linesSqrt * 7; i += 7)
            {
                for (int j = 0; j < linesSqrt * 7; j += 7)
                {
                    for (int k = i; k < i + 6; k++)
                    {
                        for (int l = j; l < j + 6; l++)
                        {
                            sectorFoodSum += mudInputFood[k, l];
                        }
                    }

                    sectorFoodSums[i / 7, j / 7] = sectorFoodSum;
                    sectorFoodSum = 0;
                }
            }

            for (int i = 0; i < linesSqrt; i++)
            {
                for (int j = 0; j < linesSqrt; j++)
                {
                    sectorFoodSumsKeys[i * linesSqrt + j] = sectorFoodSums[i, j];
                    sectorFoodPosValues[i * linesSqrt + j] = i * linesSqrt + j;
                }
            }

            Array.Sort(sectorFoodSumsKeys, sectorFoodPosValues);

            for (int i = sectorFoodPosValues.Length - 1; i >= 0; i--)
            {
                if (algaeUsedCount < algaeCount - 5)
                {
                    InsertSixLineSE((sectorFoodPosValues[i] / linesSqrt) * 7, (sectorFoodPosValues[i] % linesSqrt) * 7, ref algaeUsedCount);
                }
                else
                {
                    return;
                }
            }
        }

        private void InsertSixLine(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            if (IsValidCell(0 + offsetI, 5 + offsetJ, mudSize))
            {
                mudOutputNoFood[0 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 1 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 2 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 2 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 3 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 3 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 4 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 4 + offsetJ] = 1;

                mudOutputNoFood[0 + offsetI, 5 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 5 + offsetJ] = 1;

                algaeUsedCount += 6;
            }
        }

        private void InsertSixLineSE(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            if (IsValidCell(3 + offsetI, 5 + offsetJ, mudSize))
            {
                mudOutputNoFood[3 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[3 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[3 + offsetI, 1 + offsetJ] = 1;
                mudOutputTempCopy[3 + offsetI, 1 + offsetJ] = 1;

                mudOutputNoFood[3 + offsetI, 2 + offsetJ] = 1;
                mudOutputTempCopy[3 + offsetI, 2 + offsetJ] = 1;

                mudOutputNoFood[3 + offsetI, 3 + offsetJ] = 1;
                mudOutputTempCopy[3 + offsetI, 3 + offsetJ] = 1;

                mudOutputNoFood[3 + offsetI, 4 + offsetJ] = 1;
                mudOutputTempCopy[3 + offsetI, 4 + offsetJ] = 1;

                mudOutputNoFood[3 + offsetI, 5 + offsetJ] = 1;
                mudOutputTempCopy[3 + offsetI, 5 + offsetJ] = 1;

                algaeUsedCount += 6;
            }
        }

        private void InsertFoodBasedBlinkers()
        {
            int algaeUsedCount = 0;
            int algaeInserted = algaeUsedCount;
            bool IsBlinkerInserted = false;

            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (mudInputFood[i, j] == 1 && algaeUsedCount < algaeCount - 2)
                    {
                        algaeInserted = algaeUsedCount;
                        InsertFoodBasedBlinker(i, j, ref algaeUsedCount);
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

            for (int i = mudSize - 1; i >= 0; i--)
            {
                for (int j = mudSize - 1; j >= 0; j--)
                {
                    if (mudInputFood[i, j] == 1 && algaeUsedCount < algaeCount && mudOutputNoFood[i, j] != 1)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }

            for (int i = mudSize - 1; i >= 0; i--)
            {
                for (int j = mudSize - 1; j >= 0; j--)
                {
                    if (mudOutputNoFood[i, j] != 1 && algaeUsedCount < algaeCount)
                    {
                        mudOutputNoFood[i, j] = 1;
                        mudOutputTempCopy[i, j] = 1;
                        algaeUsedCount++;
                    }
                }
            }
        }

        private void InsertFoodBasedBlinker(int offsetI, int offsetJ, ref int algaeUsedCount)
        {
            if (IsValidCell(2 + offsetI, 1 + offsetJ, mudSize) && IsValidCell(0 + offsetI, offsetJ - 1, mudSize))
            {
                mudOutputNoFood[0 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[0 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[1 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[1 + offsetI, 0 + offsetJ] = 1;

                mudOutputNoFood[2 + offsetI, 0 + offsetJ] = 1;
                mudOutputTempCopy[2 + offsetI, 0 + offsetJ] = 1;

                algaeUsedCount += 3;
            }
        }

        //Don't read the following code if you don't believe in magic.
        public void GenerateAlgaeSetup()
        {
            int pulsarActualQty = (mudSize / 16) * (mudSize / 16);
            if (pulsarActualQty > algaeCount / 8)
                pulsarActualQty = algaeCount / 8;

            float foodPercent = (float)foodCount / (mudSize * mudSize);

            //f(x) = xy^2 + y*1500 + (100/(x+y))*600000 (~= 2300000)
            if (mudSize + generationsCount > 200 && mudSize * mudSize * generationsCount + mudSize * 1500 + (100.0f / (mudSize + generationsCount)) * 600000 > 2000000)
            {
                //Very high food count.
                //Very high algae count.
                //Mud size bigger than 5.
                if (foodCount >= (0.9f * mudSize * mudSize)
                    && algaeCount >= (0.9f * mudSize * mudSize)
                    && generationsCount <= mudSize
                    && mudSize > 5)
                {
                    InsertRiskySetup();
                }
                //Algae count enough for max.
                //Generations count enough to reach almost highest population of Max.
                //Mud size big enough to populate it with Max and to expand ~2 cells in every direction.
                else if (algaeCount >= 187 && algaeCount < 3 * (mudSize / 3) * (mudSize / 3)
                         && (generationsCount > (0.7f * mudSize) - 27 && generationsCount < (1.3f * mudSize) - 27 * (27.0f / mudSize))
                         && mudSize >= 32)
                {
                    //Pulsars can't mature.
                    if (generationsCount < 24)
                    {
                        InsertMax();
                    }
                    //Pulsars can mature, but will give lower results than Max.
                    else if ((((generationsCount + 19) * (generationsCount + 19) + 463) / 4) * (1 + foodPercent) > (pulsarActualQty * 8 * 6) * (1 + 2 * foodPercent))
                    {
                        InsertMax();
                    }
                    //Pulsars will give higher results than Max.
                    else
                    {
                        InsertPulsars();
                    }
                }
                //Very high food count.
                //Algae count enough for single puffers, but not enough for pulsars.
                //Generations count enough for a single puffer to almost reach the bottom of the mud.
                else if (foodCount > (0.7f * mudSize * mudSize)
                         && algaeCount >= 0.7f * (mudSize / 24) * 54 && algaeCount >= 54 && algaeCount < 3 * (mudSize / 3) * (mudSize / 3)
                         && generationsCount > (0.8f * 2 * mudSize)
                         && mudSize >= 24)
                {
                    InsertSinglePuffers();
                }
                //High food count.
                //Algae count enough for double puffers, but not enough for pulsars.
                //Generations count enough for a double puffer to almost reach the top and the bottom of the mud.
                else if (foodCount > (0.7f * mudSize * mudSize)
                         && algaeCount >= 0.7f * (mudSize / 24) * 108 && algaeCount >= 108 && algaeCount < 3 * (mudSize / 3) * (mudSize / 3)
                         && generationsCount > (0.6f * mudSize)
                         && mudSize >= 144)
                {
                    InsertDoublePuffers();
                }
                //Very high food count.
                //Very high algae count.
                //Mud size bigger than 5.
                else if (foodCount >= (0.7f * mudSize * mudSize)
                        && algaeCount >= (0.7f * mudSize * mudSize)
                        && mudSize > 5)
                {
                    InsertRiskySetup();
                }
                //Algae count enough for max.
                //Generations count enough to reach almost highest population of Max.
                //Mud size big enough to populate it with Max and to expand ~2 cells in every direction.
                else if (algaeCount >= 187 && algaeCount < 3 * (mudSize / 3) * (mudSize / 3)
                         && (generationsCount > (0.3f * mudSize) - 27 && generationsCount < (1.3f * mudSize) - 27 * (27.0f / mudSize))
                         && mudSize >= 32)
                {
                    //Pulsars can't mature.
                    if (generationsCount < 24)
                    {
                        InsertMax();
                    }
                    //Pulsars can mature, but will give lower results than Max.
                    else if ((((generationsCount + 19) * (generationsCount + 19) + 463) / 4) * (1 + foodPercent) > (pulsarActualQty * 8 * 6) * (1 + 2 * foodPercent))
                    {
                        InsertMax();
                    }
                    //Pulsars will give higher results than Max.
                    else
                    {
                        InsertPulsars();
                    }
                }
                //Very low algae count compared to the puddle of mud size.
                else if (algaeCount < 1.1f * (mudSize / 80) * (mudSize / 80) * 10 && algaeCount >= 10
                         && generationsCount >= 30 && generationsCount <= 200
                         && mudSize >= 80)
                {
                    InsertHs();
                }
                //Algae count not enough to fill the mud with blocks and enough for a single pulsar.
                //Mud size enough to fit in a pulsar.
                else if (algaeCount < 3 * (mudSize / 4) * (mudSize / 4) && algaeCount >= 8
                         && mudSize > 15)
                {
                    InsertPulsars();
                }
                //Very high food count.
                //Very high algae count.
                //Mud size bigger than 5.
                else if (foodCount >= (0.6f * mudSize * mudSize)
                        && algaeCount >= (0.6f * mudSize * mudSize)
                        && mudSize > 5)
                {
                    InsertRiskySetup();
                }
                else if (algaeCount >= 3 * (mudSize / 3) * (mudSize / 3))
                {
                    InsertBlocksSymmetric();
                }
                else
                {
                    InsertBlocks();
                }

                //Comment before release.
                //GetExperimentResult();
            }
            else if (mudSize > 30)//At this state the AlgaeExperiment.result contains only the eaten food.
    //Add the algae count to the AlgaeExperiment.result. If the algae count = 0, then AlgaeExperiment.result = 0.
            {
                string[] insertsNames = new string[] { "blocks", "blocksSym", "pulsars", "max", "sPuffers", "dPuffers", "riskySetup", "Hs" };
                int[] insertsResults = new int[8];

                InsertBlocks();
                insertsResults[0] = GetExperimentResult();

                InsertBlocksSymmetric();
                insertsResults[1] = GetExperimentResult();

                if (algaeCount >= 8)
                {
                    InsertPulsars();
                    insertsResults[2] = GetExperimentResult();
                }
                else
                {
                    insertsResults[2] = 0;
                }

                if (algaeCount >= 187)
                {
                    InsertMax();
                    insertsResults[3] = GetExperimentResult();
                }
                else
                {
                    insertsResults[3] = 0;
                }

                if (algaeCount >= 54)
                {
                    InsertSinglePuffers();
                    insertsResults[4] = GetExperimentResult();
                }
                else
                {
                    insertsResults[4] = 0;
                }

                if (algaeCount >= 108 && mudSize >= 49)
                {
                    InsertDoublePuffers();
                    insertsResults[5] = GetExperimentResult();
                }
                else
                {
                    insertsResults[5] = 0;
                }

                InsertRiskySetup();
                insertsResults[6] = GetExperimentResult();

                if (algaeCount >= 10 && mudSize >= 80)
                {
                    InsertHs();
                    insertsResults[7] = GetExperimentResult();
                }
                else
                {
                    insertsResults[7] = 0;
                }

                Array.Sort(insertsResults, insertsNames);

                switch (insertsNames[7])
                {
                    case "blocks":
                        InsertBlocks();
                        break;
                    case "blocksSym":
                        InsertBlocksSymmetric();
                        break;
                    case "pulsars":
                        InsertPulsars();
                        break;
                    case "max":
                        InsertMax();
                        break;
                    case "sPuffers":
                        InsertSinglePuffers();
                        break;
                    case "dPuffers":
                        InsertDoublePuffers();
                        break;
                    case "riskySetup":
                        InsertRiskySetup();
                        break;
                    case "Hs":
                        InsertHs();
                        break;
                    default:
                        break;
                }
            }
            else
            {
                string[] insertsNames = new string[] { "blocks", "blocksSym", "pulsars", "max", "sPuffers", "dPuffers", "riskySetup", "foodBased", "fbBlocks", "fbLines", "fbLinesSE", "fbBlinkers" };
                int[] insertsResults = new int[12];

                InsertBlocks();
                insertsResults[0] = GetExperimentResult();

                InsertBlocksSymmetric();
                insertsResults[1] = GetExperimentResult();

                if (algaeCount >= 8 && mudSize >= 16)
                {
                    InsertPulsars();
                    insertsResults[2] = GetExperimentResult();
                }
                else
                {
                    insertsResults[2] = 0;
                }

                if (algaeCount >= 187 && mudSize >= 27)
                {
                    InsertMax();
                    insertsResults[3] = GetExperimentResult();
                }
                else
                {
                    insertsResults[3] = 0;
                }

                if (algaeCount >= 54 && mudSize >= 24)
                {
                    InsertSinglePuffers();
                    insertsResults[4] = GetExperimentResult();
                }
                else
                {
                    insertsResults[4] = 0;
                }

                if (algaeCount >= 108 && mudSize >= 49)
                {
                    InsertDoublePuffers();
                    insertsResults[5] = GetExperimentResult();
                }
                else
                {
                    insertsResults[5] = 0;
                }

                if (mudSize > 5)
                {
                    InsertRiskySetup();
                    insertsResults[6] = GetExperimentResult();
                }
                else
                {
                    insertsResults[6] = 0;
                }

                InsertFoodBased();
                insertsResults[7] = GetExperimentResult();

                InsertFoodBasedBlocks();
                insertsResults[8] = GetExperimentResult();

                if (algaeCount >= 6 && mudSize >= 6)
                {
                    InsertFoodBasedSixLines();
                    insertsResults[9] = GetExperimentResult();
                }
                else
                {
                    insertsResults[9] = 0;
                }

                if (algaeCount >= 6 && mudSize >= 7)
                {
                    InsertFoodBasedSixLinesSE();
                    insertsResults[10] = GetExperimentResult();
                }
                else
                {
                    insertsResults[10] = 0;
                }

                InsertFoodBasedBlinkers();
                insertsResults[11] = GetExperimentResult();

                Array.Sort(insertsResults, insertsNames);

                switch (insertsNames[11])
                {
                    case "blocks":
                        InsertBlocks();
                        break;
                    case "blocksSym":
                        InsertBlocksSymmetric();
                        break;
                    case "pulsars":
                        InsertPulsars();
                        break;
                    case "max":
                        InsertMax();
                        break;
                    case "sPuffers":
                        InsertSinglePuffers();
                        break;
                    case "dPuffers":
                        InsertDoublePuffers();
                        break;
                    case "riskySetup":
                        InsertRiskySetup();
                        break;
                    case "foodBased":
                        InsertFoodBased();
                        break;
                    case "fbBlocks":
                        InsertFoodBasedBlocks();
                        break;
                    case "fbLines":
                        InsertFoodBasedSixLines();
                        break;
                    case "fbLinesSE":
                        InsertFoodBasedSixLinesSE();
                        break;
                    case "fbBlinkers":
                        InsertFoodBasedBlinkers();
                        break;
                    default:
                        break;
                }
            }
        }

        public void PrintOutput()
        {
            StringBuilder output = new StringBuilder();

            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (mudOutputNoFood[i, j] == 1)
                    {
                        mudOutputWithFood[i, j] = '+';
                    }
                    output.Append(mudOutputWithFood[i, j]);
                }
                if (i != mudSize - 1)
                    output.AppendLine();
            }

            Console.WriteLine(output.ToString());
        }

        private int GetExperimentResult()
        {
            int[,] mudInputFood = new int[mudSize, mudSize];
            int neighboursSum;
            result = 0;

            //Make a local copy of the food state in the puddle of mud.
            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    mudInputFood[i, j] = this.mudInputFood[i, j];
                }
            }

            //Predict cell behaviour.
            //mudOutputNoFood is used for comparing and contains the last generation state of the puddle of mud.
            //mudOutputTempCopy is used for saving the new generation state.
            for (int t = 0; t < generationsCount; t++)
            {
                for (int i = 0; i < mudSize; i++)
                {
                    for (int j = 0; j < mudSize; j++)
                    {
                        neighboursSum = 0;

                        if (IsValidCell(i - 1, j - 1, mudSize))
                            neighboursSum += mudOutputNoFood[i - 1, j - 1];
                        if (IsValidCell(i - 1, j, mudSize))
                            neighboursSum += mudOutputNoFood[i - 1, j];
                        if (IsValidCell(i - 1, j + 1, mudSize))
                            neighboursSum += mudOutputNoFood[i - 1, j + 1];
                        if (IsValidCell(i, j - 1, mudSize))
                            neighboursSum += mudOutputNoFood[i, j - 1];
                        if (IsValidCell(i, j + 1, mudSize))
                            neighboursSum += mudOutputNoFood[i, j + 1];
                        if (IsValidCell(i + 1, j - 1, mudSize))
                            neighboursSum += mudOutputNoFood[i + 1, j - 1];
                        if (IsValidCell(i + 1, j, mudSize))
                            neighboursSum += mudOutputNoFood[i + 1, j];
                        if (IsValidCell(i + 1, j + 1, mudSize))
                            neighboursSum += mudOutputNoFood[i + 1, j + 1];

                        //If the cell is alive.
                        if (mudOutputNoFood[i, j] == 1)
                        {
                            if (mudInputFood[i, j] == 1)
                            {
                                result++;
                                mudInputFood[i, j] = 0;
                            }

                            if (neighboursSum < 2 || neighboursSum > 3)
                            {
                                mudOutputTempCopy[i, j] = 0;
                            }
                        }
                        //If the cell is dead.
                        else
                        {
                            if (neighboursSum == 3)
                            {
                                mudOutputTempCopy[i, j] = 1;

                                if (mudInputFood[i, j] == 1)
                                {
                                    result++;
                                    mudInputFood[i, j] = 0;
                                }
                            }
                        }
                    }
                }

                //Comment before release.
                //PrintCurrentState(mudOutputNoFood, t);

                //Replace the old puddle of mud state with the new puddle of mud state.
                for (int i = 0; i < mudSize; i++)
                {
                    for (int j = 0; j < mudSize; j++)
                    {
                        mudOutputNoFood[i, j] = mudOutputTempCopy[i, j];
                    }
                }
            }

            int resultAlgaeCount = 0;

            //At this state the result contains only the eaten food.
            //Add the algae count to the result. If the algae count = 0, then result = 0.
            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    if (mudOutputNoFood[i, j] == 1)
                    {
                        result++;
                        resultAlgaeCount++;
                    }
                }
            }

            if (resultAlgaeCount == 0)
                result = 0;
            
            //Comment before release.
            //PrintCurrentState(mudOutputNoFood);

            //Reset the muds after running a particular experiment to prepare them for the next experiment.
            for (int i = 0; i < mudSize; i++)
            {
                for (int j = 0; j < mudSize; j++)
                {
                    mudOutputNoFood[i, j] = 0;
                    mudOutputTempCopy[i, j] = 0;
                }
            }

            return result;
        }

        public void RunPavelRun()
        {
            int neighboursSum;
            result = 0;
            StringBuilder output = new StringBuilder();

            for (int t = 0; t < generationsCount; t++)
            {
                output.AppendLine(String.Format("gen {0}", t + 1));

                for (int i = 0; i < mudSize; i++)
                {
                    for (int j = 0; j < mudSize; j++)
                    {
                        neighboursSum = 0;

                        if (IsValidCell(i - 1, j - 1, mudSize))
                            neighboursSum += mudOutputNoFood[i - 1, j - 1];
                        if (IsValidCell(i - 1, j, mudSize))
                            neighboursSum += mudOutputNoFood[i - 1, j];
                        if (IsValidCell(i - 1, j + 1, mudSize))
                            neighboursSum += mudOutputNoFood[i - 1, j + 1];
                        if (IsValidCell(i, j - 1, mudSize))
                            neighboursSum += mudOutputNoFood[i, j - 1];
                        if (IsValidCell(i, j + 1, mudSize))
                            neighboursSum += mudOutputNoFood[i, j + 1];
                        if (IsValidCell(i + 1, j - 1, mudSize))
                            neighboursSum += mudOutputNoFood[i + 1, j - 1];
                        if (IsValidCell(i + 1, j, mudSize))
                            neighboursSum += mudOutputNoFood[i + 1, j];
                        if (IsValidCell(i + 1, j + 1, mudSize))
                            neighboursSum += mudOutputNoFood[i + 1, j + 1];

                        //If the cell is alive.
                        if (mudOutputNoFood[i, j] == 1)
                        {
                            if (mudInputFood[i, j] == 1)
                            {
                                result++;
                                mudInputFood[i, j] = 0;
                            }

                            if (neighboursSum < 2 || neighboursSum > 3)
                            {
                                mudOutputTempCopy[i, j] = 0;
                                output.AppendLine(String.Format("{0} {1} died", i, j));
                            }
                        }
                        //If the cell is dead.
                        else
                        {
                            if (neighboursSum == 3)
                            {
                                mudOutputTempCopy[i, j] = 1;
                                output.AppendLine(String.Format("{0} {1} born", i, j));

                                if (mudInputFood[i, j] == 1)
                                {
                                    result++;
                                    mudInputFood[i, j] = 0;
                                }
                            }
                        }
                    }
                }

                //PrintCurrentState(t);

                for (int i = 0; i < mudSize; i++)
                {
                    for (int j = 0; j < mudSize; j++)
                    {
                        mudOutputNoFood[i, j] = mudOutputTempCopy[i, j];
                    }
                }
            }

            Console.WriteLine(output.ToString());
        }

        //Checks if the cell is inside the puddle of mud.
        private bool IsValidCell(int x, int y, int mudSize)
        {
            if (x < 0 || x >= mudSize || y < 0 || y >= mudSize)
                return false;
            else
                return true;
        }

        private void PrintCurrentState(int[,] mud, int time = 0)
        {
            Console.WriteLine("Time: {0}", time);

            //for (int i = 0; i < mudSize; i++)
            //{
            //    for (int j = 0; j < mudSize; j++)
            //    {
            //        Console.Write(mud[i, j]);
            //    }
            //    Console.WriteLine();
            //}

            Console.WriteLine("Food: {0}", foodCount);
            Console.WriteLine("Result: {0}", result);
            Console.WriteLine();
        }
    }

    class Algae
    {
        static void Main()
        {
            AlgaeExperiment experiment = AlgaeExperiment.Instance;

            experiment.ReadInput();

            //Comment before release.
            //experiment.GenerateInput(20);

            //Comment before release.
            //DateTime startTime = DateTime.UtcNow;

            experiment.GenerateAlgaeSetup();

            experiment.PrintOutput();

            //Comment before release.
            //experiment.RunPavelRun();

            //Comment before release.
            //Console.WriteLine("Time: {0} ms.", (DateTime.UtcNow - startTime).TotalMilliseconds);
        }
    }
}
