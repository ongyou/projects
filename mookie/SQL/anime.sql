-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 10 jan. 2020 à 11:20
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `mookie`
--

-- --------------------------------------------------------

--
-- Structure de la table `anime`
--

DROP TABLE IF EXISTS `anime`;
CREATE TABLE IF NOT EXISTS `anime` (
  `anime_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `anime_title` varchar(255) NOT NULL,
  `anime_url_poster` varchar(255) DEFAULT NULL,
  `anime_release_date` date DEFAULT NULL,
  `anime_release_french_date` date DEFAULT NULL,
  `anime_episode` int(11) DEFAULT NULL,
  `anime_season` int(11) DEFAULT NULL,
  `anime_synopsis` longtext,
  `anime_rating_pro` float DEFAULT NULL,
  `anime_rating_consumer` float DEFAULT NULL,
  `anime_genre_id` int(11) DEFAULT NULL,
  `anime_publics_id` int(11) DEFAULT NULL,
  `anime_original_title` varchar(255) DEFAULT NULL,
  `production_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `anime_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `anime_updated` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `anime_deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`anime_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

