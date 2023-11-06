/*
  Warnings:

  - The primary key for the `bank` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `bank` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `bank_setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `bank_setting` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `bank_id` on the `bank_setting` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `setting_id` on the `bank_setting` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `bank_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `bank_user` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `bank_id` on the `bank_user` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `user_id` on the `bank_user` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `campaigns` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `campaigns` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `user_id` on the `campaigns` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `cashouts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `cashouts` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `campaign_id` on the `cashouts` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `user_id` on the `cashouts` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `bank_id` on the `cashouts` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `category_campaign` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `category_campaign` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `category_id` on the `category_campaign` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `campaign_id` on the `category_campaign` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `donations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `campaign_id` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `user_id` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `failed_jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `failed_jobs` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `user_id` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `bank_id` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `personal_access_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `personal_access_tokens` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `tokenable_id` on the `personal_access_tokens` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `user_id` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `settings` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `subscribers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `subscribers` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `current_team_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.
  - You are about to alter the column `role_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `bank_setting` DROP FOREIGN KEY `bank_setting_bank_id_foreign`;

-- DropForeignKey
ALTER TABLE `bank_setting` DROP FOREIGN KEY `bank_setting_setting_id_foreign`;

-- DropForeignKey
ALTER TABLE `bank_user` DROP FOREIGN KEY `bank_user_bank_id_foreign`;

-- DropForeignKey
ALTER TABLE `bank_user` DROP FOREIGN KEY `bank_user_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `campaigns` DROP FOREIGN KEY `campaigns_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `cashouts` DROP FOREIGN KEY `cashouts_bank_id_foreign`;

-- DropForeignKey
ALTER TABLE `cashouts` DROP FOREIGN KEY `cashouts_campaign_id_foreign`;

-- DropForeignKey
ALTER TABLE `cashouts` DROP FOREIGN KEY `cashouts_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `category_campaign` DROP FOREIGN KEY `category_campaign_campaign_id_foreign`;

-- DropForeignKey
ALTER TABLE `category_campaign` DROP FOREIGN KEY `category_campaign_category_id_foreign`;

-- DropForeignKey
ALTER TABLE `donations` DROP FOREIGN KEY `donations_campaign_id_foreign`;

-- DropForeignKey
ALTER TABLE `donations` DROP FOREIGN KEY `donations_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_role_id_foreign`;

-- AlterTable
ALTER TABLE `bank` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `bank_setting` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `bank_id` INTEGER NOT NULL,
    MODIFY `setting_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `bank_user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `bank_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `campaigns` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `cashouts` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `campaign_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `bank_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `category_campaign` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `category_id` INTEGER NOT NULL,
    MODIFY `campaign_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `contacts` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `donations` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `campaign_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `failed_jobs` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `payments` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `bank_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `personal_access_tokens` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `tokenable_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `roles` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `sessions` MODIFY `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `settings` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `subscribers` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `current_team_id` INTEGER NULL,
    MODIFY `role_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `bank_setting` ADD CONSTRAINT `bank_setting_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `bank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_setting` ADD CONSTRAINT `bank_setting_setting_id_foreign` FOREIGN KEY (`setting_id`) REFERENCES `settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_user` ADD CONSTRAINT `bank_user_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `bank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_user` ADD CONSTRAINT `bank_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cashouts` ADD CONSTRAINT `cashouts_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `bank`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cashouts` ADD CONSTRAINT `cashouts_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cashouts` ADD CONSTRAINT `cashouts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `category_campaign` ADD CONSTRAINT `category_campaign_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_campaign` ADD CONSTRAINT `category_campaign_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donations` ADD CONSTRAINT `donations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
