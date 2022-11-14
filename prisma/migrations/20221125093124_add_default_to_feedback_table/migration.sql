-- AlterTable
ALTER TABLE `Feedback` MODIFY `upvotes` INTEGER NULL DEFAULT 0,
    MODIFY `status` VARCHAR(191) NULL DEFAULT 'suggestion';
