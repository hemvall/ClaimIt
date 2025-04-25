-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 26 avr. 2025 à 00:14
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `claimit`
--

-- --------------------------------------------------------

--
-- Structure de la table `airdrops`
--

CREATE TABLE `airdrops` (
  `Id` bigint(20) UNSIGNED NOT NULL,
  `Label` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Ticker` varchar(255) NOT NULL,
  `CoinGeckoTicker` varchar(255) NOT NULL,
  `IconURL` varchar(255) NOT NULL,
  `WebsiteURL` varchar(255) NOT NULL,
  `XAccount` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  `Phase` varchar(255) NOT NULL,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime NOT NULL,
  `Claimed` tinyint(1) NOT NULL,
  `VerifiedByTeam` tinyint(1) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `Level` bigint(20) DEFAULT 4,
  `Blockchain` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `airdrops`
--

INSERT INTO `airdrops` (`Id`, `Label`, `Description`, `Ticker`, `CoinGeckoTicker`, `IconURL`, `WebsiteURL`, `XAccount`, `Status`, `Phase`, `StartDate`, `EndDate`, `Claimed`, `VerifiedByTeam`, `CreatedAt`, `UpdatedAt`, `Level`, `Blockchain`) VALUES
(1, 'Gaea', 'Decentralized AI-driven ecosystem. Unlock the future of AI with blockchain. Be the creator in a new silicon-based world.', 'TBD', 'TBD', 'https://pbs.twimg.com/profile_images/1837031126910783491/7fC9AyRI_400x400.png', 'https://app.aigaea.net/dashboard', 'aigaea', 'Farming', 'S1', '2024-09-15 14:30:00', '2025-05-01 14:30:00', 0, 1, '2025-02-27 12:57:50', '2025-02-27 12:57:50', 2, 'TBD'),
(2, 'LayerEdge', ' Bitcoin backed Internet using trust minimized verification & proof aggregation for all layers & apps.', 'TBD', 'TBD', 'https://pbs.twimg.com/profile_images/1837132336011280384/XpzvFeA7_400x400.jpg', 'https://www.getgrass.io', '@layeredge', 'Farming', 'S0', '2024-10-26 14:30:00', '2025-04-26 14:30:00', 1, 1, '2025-02-27 12:57:50', '2025-02-27 12:57:50', 1, 'Solana'),
(3, 'RainMakr', 'The World’s Fastest AI Launchpad on @MegaETH_Labs. 100% fees to buy back $RAIN.', 'RAIN', 'rain', 'https://pbs.twimg.com/profile_images/1819638283133243394/vQq0fW9F_400x400.jpg', 'https://zealy.io/cw/rainmakr/questboard', '@RainMakr_xyz', 'Farming', 'S0', '2025-08-01 14:30:00', '2025-09-01 14:30:00', 0, 1, '2025-03-11 12:05:49', '2025-03-11 12:05:49', 3, 'MegaETH'),
(4, 'NodePay', 'Nodepay is a platform for AI training and development. Their mission is to provide an ecosystem for users to own and access AI with real time data intelligence.', 'NC', 'nodecoin', 'https://play-lh.googleusercontent.com/x7F1sCseMpHlWuBYYh3vUaXvEASveBMCO6bejozZ7_FGQODAEKOYlcnNB-91xLXGrg=w240-h480-rw', 'https://www.nodepay.com', 'NodePay', 'Live', 'S4', '2024-10-26 14:30:00', '2025-04-26 14:30:00', 1, 1, '2025-03-16 17:41:41', '2025-03-16 17:41:41', 4, 'Solana');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `Id` bigint(20) UNSIGNED NOT NULL,
  `AirdropId` bigint(20) NOT NULL,
  `Subject` varchar(255) NOT NULL,
  `Body` varchar(255) NOT NULL,
  `URL` varchar(255) NOT NULL,
  `ExpiresAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`Id`, `AirdropId`, `Subject`, `Body`, `URL`, `ExpiresAt`, `CreatedAt`) VALUES
(1, 1, '$NC Season 4 Claim is now Live!', 'You can from now go to https://www.nodefoundation.com and check if you are eligible for S4 rewards.', 'https://www.nodefoundation.com', '2025-08-01 14:30:00', '2024-07-01 14:30:00'),
(2, 2, 'New network ATH: more than 1,000,000 GB scraped in a day.', 'In the last 24 hours, Grass has gathered more multi-modal data than a human brain will process in four decades.', 'https://x.com/getgrass_io', '2025-03-05 12:47:46', '2025-03-05 12:47:46');

-- --------------------------------------------------------

--
-- Structure de la table `suggestions`
--

CREATE TABLE `suggestions` (
  `Id` bigint(20) UNSIGNED NOT NULL,
  `AirdropId` bigint(20) NOT NULL,
  `Potential` bigint(20) NOT NULL,
  `TutorialSource` varchar(255) NOT NULL,
  `FarmCost` bigint(20) NOT NULL,
  `TimeCost` bigint(20) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `suggestions`
--

INSERT INTO `suggestions` (`Id`, `AirdropId`, `Potential`, `TutorialSource`, `FarmCost`, `TimeCost`, `CreatedAt`) VALUES
(1, 4, 800, 'http://localhost:3000/tutorials/nodepay', 0, 15, '2025-02-27 12:57:50'),
(2, 3, 500, 'http://localhost:3000/tutorials/rainmakr', 0, 15, '2025-02-27 12:57:50');

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `Id` bigint(20) UNSIGNED NOT NULL,
  `AirdropId` bigint(20) NOT NULL,
  `Label` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `URL` varchar(255) NOT NULL,
  `Deadline` datetime DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `Level` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tasks`
--

INSERT INTO `tasks` (`Id`, `AirdropId`, `Label`, `Type`, `URL`, `Deadline`, `CreatedAt`, `Level`) VALUES
(1, 1, 'Do your Emotional Check-in', 'Daily', 'https://app.aigaea.net/emotionalCheckIn', '2025-03-01 14:30:00', '2025-02-27 13:22:47', 3),
(2, 3, 'Daily tasks on Zealy', 'Daily', 'https://zealy.io/cw/rainmakr/questboard', '2025-08-01 14:30:00', '2025-02-27 13:22:47', 1),
(3, 2, 'Create your GRASS Wallet', 'Discover', 'https://www.google.com/', '2025-03-01 14:30:00', '2025-03-07 08:26:56', 2),
(4, 3, 'Record a 2 ETH Volume on RainPump', 'Once', 'https://rainmakr.xyz/en/rain-pump/token-detail/19', '2025-08-01 14:30:00', '2025-03-27 15:21:25', 1);

-- --------------------------------------------------------

--
-- Structure de la table `userairdrop`
--

CREATE TABLE `userairdrop` (
  `UserId` bigint(20) NOT NULL,
  `AirdropId` bigint(20) NOT NULL,
  `WalletId` bigint(20) NOT NULL,
  `Allocation` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `userairdrop`
--

INSERT INTO `userairdrop` (`UserId`, `AirdropId`, `WalletId`, `Allocation`) VALUES
(1, 3, 1, 0),
(1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `Id` bigint(20) UNSIGNED NOT NULL,
  `Username` varchar(255) NOT NULL,
  `X` varchar(255) NOT NULL,
  `Discord` bigint(20) NOT NULL,
  `Email` bigint(20) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `XP` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`Id`, `Username`, `X`, `Discord`, `Email`, `CreatedAt`, `XP`) VALUES
(1, 'Hemvall', '@Hemvall', 0, 0, '2025-02-27 12:57:50', 0);

-- --------------------------------------------------------

--
-- Structure de la table `usertask`
--

CREATE TABLE `usertask` (
  `UserId` bigint(20) UNSIGNED NOT NULL,
  `TaskId` bigint(20) NOT NULL,
  `Completed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `wallets`
--

CREATE TABLE `wallets` (
  `Id` bigint(20) UNSIGNED NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `Label` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Platform` varchar(255) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `wallets`
--

INSERT INTO `wallets` (`Id`, `UserId`, `Label`, `Address`, `Platform`, `CreatedAt`) VALUES
(1, 1, '20Mto0', '49ujxTPGCciW2vYcEUTpZBq62tW1JnfhWY6FbyDDCoxZ', 'Phantom', '2025-02-27 12:57:50');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `airdrops`
--
ALTER TABLE `airdrops`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `airdrops`
--
ALTER TABLE `airdrops`
  MODIFY `Id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `Id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `Id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `Id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `Id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `Id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
