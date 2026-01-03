/*
  Warnings:

  - You are about to drop the column `Name` on the `words` table. All the data in the column will be lost.
  - Added the required column `audio` to the `words` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `words` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcription` to the `words` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "words" DROP COLUMN "Name",
ADD COLUMN     "audio" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "transcription" TEXT NOT NULL;
