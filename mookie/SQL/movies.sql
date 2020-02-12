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
-- Structure de la table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `movie_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `movie_title` varchar(255) NOT NULL,
  `movie_url_poster` varchar(255) DEFAULT NULL,
  `movie_release_date` date DEFAULT NULL,
  `movie_release_french_date` date DEFAULT NULL,
  `movie_duration` int(11) DEFAULT NULL,
  `movie_synopsis` longtext,
  `movie_rating_pro` float DEFAULT NULL,
  `movie_rating_consumer` float DEFAULT NULL,
  `movie_genre_id` int(11) DEFAULT NULL,
  `movie_publics_id` int(11) DEFAULT NULL,
  `movie_original_title` varchar(255) DEFAULT NULL,
  `production_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `movie_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movie_updated` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `movie_deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `movies`
--

INSERT INTO `movies` (`movie_id`, `movie_title`, `movie_url_poster`, `movie_release_date`, `movie_release_french_date`, `movie_duration`, `movie_synopsis`, `movie_rating_pro`, `movie_rating_consumer`, `movie_genre_id`, `movie_publics_id`, `movie_original_title`, `production_id`, `country_id`, `movie_created`, `movie_updated`, `movie_deleted`) VALUES
(1, 'La reine des neiges', '', '2013-11-24', '2013-12-04', 102, 'Anna, une jeune', 3, 4, 1, 1, 'FROZEN', NULL, NULL, '2020-01-10 02:29:39', '2020-01-10 02:30:16', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
