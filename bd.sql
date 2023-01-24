-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-01-2023 a las 17:19:12
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--
CREATE DATABASE IF NOT EXISTS `inventario` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `inventario`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `sku` varchar(6) NOT NULL,
  `articulo` varchar(15) NOT NULL,
  `marca` varchar(15) NOT NULL,
  `modelo` varchar(20) NOT NULL,
  `departamento_id` int(11) NOT NULL,
  `clase_id` int(11) NOT NULL,
  `familia_id` int(11) NOT NULL,
  `fecha_alta` date NOT NULL,
  `stock` int(9) NOT NULL,
  `cantidad` int(9) NOT NULL,
  `descontinuado` int(1) NOT NULL,
  `fecha_baja` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `sku`, `articulo`, `marca`, `modelo`, `departamento_id`, `clase_id`, `familia_id`, `fecha_alta`, `stock`, `cantidad`, `descontinuado`, `fecha_baja`) VALUES
(1, '0704', 'PRUEBA', 'prueba', 'prueba', 1, 1, 1, '2023-01-13', 50, 5, 0, '2023-01-20'),
(2, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(3, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(4, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(5, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(6, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(7, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(8, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(9, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(10, '', '', '', '', 0, 0, 0, '0000-00-00', 0, 0, 0, '0000-00-00'),
(12, '028', 'prueba 2', 'prueba 2', 'prueba 2', 1, 1, 1, '2023-01-21', 10, 9, 0, '1900-01-01'),
(13, '012', 'prueba 3', 'prueba 3', 'prueba 3', 2, 5, 15, '2023-01-22', 20, 3, 1, '2023-01-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `id` int(11) NOT NULL,
  `numero` int(2) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `departamento_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`id`, `numero`, `nombre`, `departamento_id`) VALUES
(1, 1, 'COMESTIBLES', 1),
(2, 2, 'LICUADORAS', 1),
(3, 3, 'BATIDORAS', 1),
(4, 4, 'CAFETERAS', 1),
(5, 1, 'AMPLIFICADORES CAR AUDIO', 2),
(6, 2, 'AUTO STEREOS', 2),
(7, 1, 'COLCHON', 3),
(8, 2, 'JUEGO BOX', 3),
(9, 1, 'SALAS', 4),
(10, 2, 'COMPLEMENTOS PARA SALA', 4),
(11, 3, 'SOFAS CAMA', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `id` int(11) NOT NULL,
  `numero` int(1) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`id`, `numero`, `nombre`) VALUES
(1, 1, 'DOMESTICOS'),
(2, 2, 'ELECTRONICA'),
(3, 3, 'MUEBLE SUELTO'),
(4, 4, 'SALAS, RECAMARAS, COMEDORES');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familias`
--

CREATE TABLE `familias` (
  `id` int(11) NOT NULL,
  `numero` int(3) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `clase_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `familias`
--

INSERT INTO `familias` (`id`, `numero`, `nombre`, `clase_id`) VALUES
(1, 0, 'SIN NOMBRE', 1),
(2, 1, 'LICUADORAS', 2),
(3, 2, 'EXCLUSIVO COPPEL.COM', 2),
(4, 1, 'BATIDORA MANUAL', 3),
(5, 2, 'PROCESADOR', 3),
(6, 3, 'PICADORA', 3),
(7, 4, 'BATIDORA PEDESTAL', 3),
(8, 5, 'BATIDORA FUENTE DE SO', 3),
(9, 6, 'MULTIPRACTICOS', 3),
(10, 7, 'EXCLUSIVOS COPPEL.COM', 3),
(11, 1, 'CAFETERAS', 4),
(12, 2, 'PERCOLADORAS', 4),
(13, 1, 'AMPLIFICADOR/RECEPTOR', 5),
(14, 2, 'KIT DE INSTALACION', 5),
(15, 3, 'AMPLIFICADORES COPPEL', 5),
(16, 1, 'AUTOESTEREO CD', 6),
(17, 2, 'ACCESORIOS CAR AUDIO', 6),
(18, 3, 'AMPLIFICADOR', 6),
(19, 4, 'ALARMA CASA/AUTO/OFICINA', 6),
(20, 5, 'SIN MECANISMO', 6),
(21, 6, 'CON CD', 6),
(22, 7, 'MULTIMEDIA', 6),
(23, 8, 'PAQUETE SIN MECANISMO', 6),
(24, 9, 'PAQUETE CON CD', 6),
(25, 1, 'PILLOW TOP KS', 7),
(26, 2, 'PILLOW TOP DOBLE KS', 7),
(27, 3, 'HULE ESPUMA KS', 7),
(28, 1, 'ESTANDAR INDIVIDUAL', 8),
(29, 2, 'PILLOW TOP INDIVIDUAL', 8),
(30, 3, 'PILLOW TOP DOBLE IND', 8),
(31, 1, 'ESQUINERAS SUPERIORES', 9),
(32, 2, 'TIPO L SECCIONAL', 9),
(33, 1, 'SILLON OCASIONAL', 10),
(34, 2, 'PUFF', 10),
(35, 3, 'BAUL', 10),
(36, 4, 'TABURETE', 10),
(37, 1, 'SOFA CAMA TAPIZADO CO', 11),
(38, 2, 'SOFACAMA CLASICO', 11),
(39, 3, 'ESTUDIO', 11);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `familias`
--
ALTER TABLE `familias`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `familias`
--
ALTER TABLE `familias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
