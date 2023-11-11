-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
