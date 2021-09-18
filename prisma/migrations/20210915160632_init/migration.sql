-- CreateTable
CREATE TABLE `events` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `provisional` BOOLEAN NOT NULL DEFAULT false,
    `series` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `unconfirmed` BOOLEAN NOT NULL DEFAULT false,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `event_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`, `event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
