/*
  Warnings:

  - Made the column `upvotes` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Feedback` MODIFY `upvotes` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'suggestion';
