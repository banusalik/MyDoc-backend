-- CreateTable
CREATE TABLE `Patient` (
    `Patient_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Image` VARCHAR(191) NOT NULL,
    `Phone_Number` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Patient_Name` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Blood_Group` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `DOB` DATETIME(3) NOT NULL,
    `Gender` VARCHAR(191) NOT NULL,
    `Registration_Date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Patient_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `Doctor_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Image` VARCHAR(191) NOT NULL,
    `Phone_Number` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Doctor_Name` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Bio` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Speciality` VARCHAR(191) NOT NULL,
    `Timeslot_time` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Doctor_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `Appointment_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Date` DATETIME(3) NOT NULL,
    `Status` ENUM('Paid', 'Unpaid') NOT NULL,
    `Patient_ID` INTEGER NOT NULL,
    `Doctor_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Appointment_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `Department_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Doctor_ID` INTEGER NOT NULL,
    `Department_Type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Department_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `Payment_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Status` ENUM('Paid', 'Unpaid') NOT NULL,
    `Tests_ID` INTEGER NULL,
    `Method` VARCHAR(191) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `Appointment_ID` INTEGER NULL,
    `Date` DATETIME(3) NOT NULL,
    `patientPatient_ID` INTEGER NULL,

    PRIMARY KEY (`Payment_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment_details` (
    `Payment_Details_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Amount` DOUBLE NOT NULL,
    `Payment_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Payment_Details_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Test` (
    `Test_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Doctor_ID` INTEGER NOT NULL,
    `Date` DATETIME(3) NOT NULL,
    `Status` ENUM('Active', 'Disactive') NOT NULL,
    `Patient_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Test_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `Review_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Rating` DOUBLE NOT NULL,
    `Comment` VARCHAR(191) NOT NULL,
    `Patient_ID` INTEGER NOT NULL,
    `Doctor_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Review_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`Patient_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_Tests_ID_fkey` FOREIGN KEY (`Tests_ID`) REFERENCES `Test`(`Test_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_Appointment_ID_fkey` FOREIGN KEY (`Appointment_ID`) REFERENCES `Appointment`(`Appointment_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_patientPatient_ID_fkey` FOREIGN KEY (`patientPatient_ID`) REFERENCES `Patient`(`Patient_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment_details` ADD CONSTRAINT `Payment_details_Payment_ID_fkey` FOREIGN KEY (`Payment_ID`) REFERENCES `Payment`(`Payment_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`Patient_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_Patient_ID_fkey` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`Patient_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_Doctor_ID_fkey` FOREIGN KEY (`Doctor_ID`) REFERENCES `Doctor`(`Doctor_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
