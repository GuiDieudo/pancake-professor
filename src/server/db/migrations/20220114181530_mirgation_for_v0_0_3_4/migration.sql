-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "note" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Strategie" ALTER COLUMN "maxLooseAmount" DROP NOT NULL,
ALTER COLUMN "minWinAmount" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "decreaseAmount" DROP NOT NULL,
ALTER COLUMN "increaseAmount" DROP NOT NULL,
ALTER COLUMN "stopLoss" DROP NOT NULL,
ALTER COLUMN "takeProfit" DROP NOT NULL;
