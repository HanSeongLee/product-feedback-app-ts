/*
  Warnings:

  - You are about to drop the column `upvotes` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Feedback` DROP COLUMN `upvotes`,
    ADD COLUMN `upvoteCount` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `FeedbackUpvote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `feedbackId` INTEGER NULL,

    UNIQUE INDEX `FeedbackUpvote_userId_feedbackId_key`(`userId`, `feedbackId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FeedbackUpvote` ADD CONSTRAINT `FeedbackUpvote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedbackUpvote` ADD CONSTRAINT `FeedbackUpvote_feedbackId_fkey` FOREIGN KEY (`feedbackId`) REFERENCES `Feedback`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
