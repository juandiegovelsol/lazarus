-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2024 a las 08:16:48
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
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `status` int NOT NULL,
  `id_students` int DEFAULT NULL
) ;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `name`, `status`, `id_students`) VALUES
(1, 'Gray\'s Anatomy', 1, 501),
(2, 'Harrison\'s Principles of Internal Medicine', 1, 0),
(3, 'Davidson\'s Principles and Practice of Medicine', 1, 0),
(4, 'Robbins & Cotran Pathologic Basis of Disease', 1, 0),
(5, 'Guyton and Hall Textbook of Medical Physiology', 1, 0),
(6, 'Netter\'s Atlas of Human Anatomy', 1, 0),
(7, 'Current Medical Diagnosis and Treatment', 1, 0),
(8, 'Rosen\'s Emergency Medicine: Concepts and Clinical Practice', 1, 812),
(9, 'Nelson Textbook of Pediatrics', 1, 0),
(10, 'Williams Obstetrics', 1, 502),
(11, 'Goodman & Gilman\'s: The Pharmacological Basis of Therapeutics', 1, 0),
(12, 'Tintinalli\'s Emergency Medicine Manual', 1, 0),
(13, 'Clinical Microbiology Made Ridiculously Simple', 2, 501),
(14, 'Principles and Practice of Infectious Diseases', 1, 0),
(15, 'The Washington Manual of Medical Therapeutics', 2, 823),
(16, 'The Sanford Guide to Antimicrobial Therapy', 1, 0),
(17, 'Principles of Neurology', 1, 0),
(18, 'Clinical Anesthesiology', 2, 608),
(19, 'Oxford Handbook of Clinical Medicine', 1, 0),
(20, 'Advanced Cardiovascular Life Support (ACLS) Provider Manual', 2, 812),
(21, 'Essentials of Clinical Geriatrics', 1, 0),
(22, 'DeGowin\'s Diagnostic Examination', 1, 0),
(23, 'Goldman-Cecil Medicine', 1, 0),
(24, 'Mayo Clinic Family Health Book', 1, 0),
(25, 'Braunwald\'s Heart Disease: A Textbook of Cardiovascular Medicine', 2, 720),
(26, 'Textbook of Pediatric Emergency Medicine', 1, 0),
(27, 'Fitzpatrick\'s Dermatology in General Medicine', 1, 0),
(28, 'Clinical Ophthalmology: A Systematic Approach', 2, 823),
(29, 'Atlas of Human Anatomy by Frank H. Netter', 1, 0),
(30, 'Textbook of Critical Care', 2, 720),
(32, 'cosa', 1, 0),
(33, 'cosa2', 1, 0),
(34, 'ulktimo', 1, 0),
(35, 'nomas', 1, 0),
(36, 'agrego', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
