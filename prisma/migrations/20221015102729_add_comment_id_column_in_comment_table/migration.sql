-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_replyingToId_fkey`;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `commentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_replyingToId_fkey` FOREIGN KEY (`replyingToId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
