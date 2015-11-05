-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2015 at 01:05 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `skatelocations`
--

-- --------------------------------------------------------

--
-- Table structure for table `skatelocations`
--

CREATE TABLE IF NOT EXISTS `skatelocations` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(60) NOT NULL,
  `location_rating` int(2) NOT NULL,
  `location_description` varchar(200) NOT NULL,
  `adder_name` varchar(30) NOT NULL,
  `adder_ip` varchar(20) NOT NULL,
  `location_long` float(10,6) NOT NULL,
  `location_lat` float(10,6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `skatelocations`
--

INSERT INTO `skatelocations` (`id`, `location_name`, `location_rating`, `location_description`, `adder_name`, `adder_ip`, `location_long`, `location_lat`) VALUES
(1, 'Clitheroe Skatepark', 5, 'Clitheroe was built in 2006. Concrete Park with 2 minis, bowl, banks, pyramid, hubba, rails, kickers, manny pads, and ledges. It kicks ass!', 'Ben', '0.0.0.0', -2.394509, 53.869286);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
