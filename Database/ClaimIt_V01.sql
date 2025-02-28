CREATE TABLE `Airdrops`(
    `Id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Label` VARCHAR(255) NOT NULL,
    `Description` VARCHAR(255) NOT NULL,
    `Ticker` VARCHAR(255) NOT NULL,
    `CoinGeckoTicker` VARCHAR(255) NOT NULL,
    `IconURL` VARCHAR NOT NULL,
    `WebsiteURL` VARCHAR(255) NOT NULL,
    `XAccount` VARCHAR(255) NOT NULL,
    `Status` VARCHAR(255) NOT NULL,
    `Phase` VARCHAR(255) NOT NULL,
    `StartDate` DATETIME NOT NULL,
    `EndDate` DATETIME NOT NULL,
    `Claimed` BOOLEAN NOT NULL,
    `VerifiedByTeam` BOOLEAN NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `Suggestions`(
    `Id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `AirdropId` BIGINT NOT NULL,
    `Potential` BIGINT NOT NULL,
    `TutorialSource` VARCHAR(255) NOT NULL,
    `FarmCost` BIGINT NOT NULL,
    `TimeCost` BIGINT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `Users`(
    `Id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Username` VARCHAR(255) NOT NULL,
    `X` VARCHAR(255) NOT NULL,
    `Discord` BIGINT NOT NULL,
    `Email` BIGINT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `UserAirdrop`(
    `UserId` BIGINT NOT NULL,
    `AirdropId` BIGINT NOT NULL,
    `WalletId` BIGINT NOT NULL,
    `Allocation` BIGINT NOT NULL,
    PRIMARY KEY (`UserId`, `AirdropId`),
    FOREIGN KEY (`UserId`) REFERENCES `Users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`AirdropId`) REFERENCES `Airdrops`(`id`) ON DELETE CASCADE
);
CREATE TABLE `Wallets`(
    `Id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UserId` BIGINT NOT NULL,
    `Label` VARCHAR(255) NOT NULL,
    `Address` VARCHAR(255) NOT NULL,
    `Platform` VARCHAR(255) NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `Tasks`(
    `Id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `AirdropId` BIGINT NOT NULL,
    `Label` VARCHAR(255) NOT NULL,
    `Type` VARCHAR(255) NOT NULL,
    `URL` VARCHAR(255) NOT NULL,
    `Deadline` DATETIME NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `UserTask`(
    `UserId` BIGINT UNSIGNED NOT NULL,
    `TaskId` BIGINT NOT NULL,
    `Completed` BOOLEAN NOT NULL
);
CREATE TABLE `Notifications`(
    `Id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `AirdropId` BIGINT NOT NULL,
    `Subject` VARCHAR(255) NOT NULL,
    `Body` VARCHAR(255) NOT NULL,
    `URL` VARCHAR(255) NOT NULL,
    `ExpiresAt` DATETIME,
    `CreatedAt` DATETIME NOT NULL
);

INSERT INTO `airdrops`(`Label`, `Description`, `Ticker`, `CoinGeckoTicker`, `IconURL`, `WebsiteURL`, `XAccount`, `Status`, `Phase`, `StartDate`, `EndDate`, `Claimed`, `VerifiedByTeam`, `CreatedAt`, `UpdatedAt`) 
VALUES ("NodePay", "Nodepay is a platform for AI training and development. Their mission is to provide an ecosystem for users to own and access AI with real time data intelligence.", "NC", "https://api.coingecko.com/api/v3/simple/price?ids=nodecoin&vs_currencies=usd", "https://play-lh.googleusercontent.com/x7F1sCseMpHlWuBYYh3vUaXvEASveBMCO6bejozZ7_FGQODAEKOYlcnNB-91xLXGrg=w240-h480-rw", "https://www.nodepay.com", "NodePay", "Live", "S4", '2024-10-26 14:30:00', '2025-04-26 14:30:00', 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `airdrops`(`Label`, `Description`, `Ticker`, `CoinGeckoTicker`, `IconURL`, `WebsiteURL`, `XAccount`, `Status`, `Phase`, `StartDate`, `EndDate`, `Claimed`, `VerifiedByTeam`, `CreatedAt`, `UpdatedAt`) 
VALUES ("Grass", "Grass is a network of millions of people who share their unused internet bandwidth to create a more equitable internet.", "GRASS", "https://api.coingecko.com/api/v3/simple/price?ids=grass&vs_currencies=usd", "https://pbs.twimg.com/profile_images/1836126251007852545/wILJU3d6_400x400.jpg", "https://www.getgrass.io", "@Grass_IO", "Live", "S5", '2024-10-26 14:30:00', '2025-04-26 14:30:00', 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `suggestions`(`AirdropId`, `Potential`, `TutorialSource`, `FarmCost`, `TimeCost`, `CreatedAt`) VALUES (1, 800, "https://x.com/mr_cbillionaire/status/1879764929554579694", "0", 15, CURRENT_TIMESTAMP);
INSERT INTO `users`(`Username`, `X`, `Discord`, `Email`, `CreatedAt`) VALUES ("Hemvall", "@Hemvall", "Hemvall#001", "gemvallofficial@gmail.com", CURRENT_TIMESTAMP);
INSERT INTO `wallets`(`UserId`, `Label`, `Address`, `Platform`, `CreatedAt`) VALUES (1, "20Mto0", "49ujxTPGCciW2vYcEUTpZBq62tW1JnfhWY6FbyDDCoxZ", "Phantom", CURRENT_TIMESTAMP);
INSERT INTO `userairdrop`(`UserId`, `AirdropId`, `WalletId`, `Allocation`) VALUES (1, 1, 1, 105);
INSERT INTO `tasks`(`AirdropId`, `Label`, `Type`, `URL`, `Deadline`, `CreatedAt`) 
VALUES (1, "Claim Daily bonus", "Daily", "https://www.nodepay.ai/", "2025-03-01 14:30:00", CURRENT_TIMESTAMP);
INSERT INTO `tasks`(`AirdropId`, `Label`, `Type`, `URL`, `Deadline`, `CreatedAt`) 
VALUES (1, "Stake a minimum of 10 $NC", "Once", "https://www.nodefoundation.com", "2025-08-01 14:30:00", CURRENT_TIMESTAMP);
INSERT INTO `Notifications`(`AirdropId`, `Subject`, `Body`, `URL`, `ExpiresAt`, `CreatedAt`) 
VALUES (1, "$NC Season 4 Claim is now Live!", "You can from now go tp https://www.nodefoundation.com and check if you are eligible for S4 rewards.", "https://www.nodefoundation.com", "2025-08-01 14:30:00", "2024-07-01 14:30:00");
