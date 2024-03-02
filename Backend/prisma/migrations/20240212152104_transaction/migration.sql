/*
  Warnings:

  - Added the required column `Ticket_Price` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `Ticket_Price` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `Qualifications` (
    `Qualification_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Degree` VARCHAR(191) NOT NULL,
    `University` VARCHAR(191) NOT NULL,
    `Doctor_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Qualification_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experiences` (
    `Experience_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Start_Date` DATETIME(3) NOT NULL,
    `End_Date` DATETIME(3) NOT NULL,
    `Position` VARCHAR(191) NOT NULL,
    `Hospital` VARCHAR(191) NOT NULL,
    `Doctor_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Experience_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Time_Slots` (
    `Time_Slots_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Day` VARCHAR(191) NOT NULL,
    `Start_Time` VARCHAR(191) NOT NULL,
    `End_Time` VARCHAR(191) NOT NULL,
    `Doctor_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Time_Slots_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Qualifications` ADD CONSTRAINT `Qualifications_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experiences` ADD CONSTRAINT `Experiences_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Time_Slots` ADD CONSTRAINT `Time_Slots_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
