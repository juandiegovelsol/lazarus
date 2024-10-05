-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2024 a las 08:17:02
-- Versión del servidor: 8.0.36
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `library`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students`
--

CREATE TABLE `students` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `year_school` varchar(5) COLLATE utf8mb4_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `age`, `year_school`) VALUES
(501, 'John Doe', 'johndoe@example.com', 25, 'MS3'),
(502, 'Jane Smith', 'janesmith@example.com', 17, 'MS1'),
(600, 'Alice Johnson', 'alicej@example.com', 20, 'MS2'),
(608, 'Bob Brown', 'bobbrown@example.com', 19, 'MS1'),
(658, 'Charlie White', 'charliew@example.com', 21, 'MS2'),
(720, 'Diana Black', 'dianab@example.com', 19, 'MS1'),
(812, 'Edward Green', 'edwardg@example.com', 16, 'MS1'),
(813, 'Fiona Blue', 'fionab@example.com', 22, 'MS4'),
(823, 'George Red', 'georger@example.com', 28, 'MS5'),
(833, 'Helen Purple', 'helenp@example.com', 18, 'MS1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
