-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2024 a las 01:45:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `savage-project`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `AdministradorID` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Contrasena` varchar(100) NOT NULL,
  `Rol` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `CategoriaID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`CategoriaID`, `Nombre`, `Descripcion`) VALUES
(1, 'Tops', 'Estas prendas pueden abarcar desde camisetas básicas hasta blusas elegantes, suéteres, sudaderas, camisas formales, tops sin mangas, y mucho más.'),
(2, 'Shorts', 'Comprende una amplia variedad de prendas de vestir que se caracterizan por su longitud corta, diseñadas para cubrir la parte inferior del torso y las piernas, pero sin llegar a la longitud de los pantalones convencionales.'),
(3, 'Hoodies', 'Los hoodies, también conocidos como sudaderas con capucha, son prendas de vestir informales y cómodas que se caracterizan por tener una capucha en la parte posterior, la cual puede ajustarse con cordones.'),
(4, 'Crewnecks', 'Los crewnecks son prendas de vestir similares a los hoodies en términos de estilo y comodidad, pero con la distinción de no tener capucha. Se caracterizan por tener un cuello redondo o \"crew neck\", de ahí su nombre.'),
(5, 'Swimwear', 'La categoría de swimwear comprende una amplia gama de prendas diseñadas específicamente para ser usadas en actividades acuáticas, como nadar, tomar el sol o practicar deportes acuáticos. Estas prendas están diseñadas no solo para proporcionar comodidad y movilidad en el agua, sino también para brindar estilo y expresión personal.'),
(6, 'Jewelry', 'La categoría de joyería comprende una amplia variedad de adornos personales diseñados para embellecer y complementar la apariencia de quienes los usan. Estos objetos preciosos pueden ser tanto para uso cotidiano como para ocasiones especiales, y van desde piezas simples y discretas hasta piezas elaboradas y lujosas.'),
(7, 'Accesories', 'La categoría de accesorios abarca una amplia variedad de objetos adicionales que complementan y realzan la apariencia, la funcionalidad y el estilo personal de una persona. Estos accesorios pueden incluir una amplia gama de artículos, desde elementos de moda hasta dispositivos prácticos.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `ClienteID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Pais` varchar(100) NOT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Ciudad` varchar(255) DEFAULT NULL,
  `CodigoPostal` varchar(10) DEFAULT NULL,
  `FechaRegistro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedidos`
--

CREATE TABLE `detallepedidos` (
  `DetallePedidoID` int(11) NOT NULL,
  `PedidoID` int(11) DEFAULT NULL,
  `PrendasID` int(11) DEFAULT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especificaciones`
--

CREATE TABLE `especificaciones` (
  `EspecificacionesID` int(11) NOT NULL,
  `PrendaID` int(11) NOT NULL,
  `Talla` varchar(10) NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especificaciones`
--

INSERT INTO `especificaciones` (`EspecificacionesID`, `PrendaID`, `Talla`, `Color`, `Stock`) VALUES
(1, 1, 'XS', 'Blanco', 0),
(2, 1, 'S', 'Blanco', 7),
(3, 1, 'M', 'Blanco', 7),
(4, 1, 'L', 'Blanco', 7),
(5, 1, 'XL', 'Blanco', 7),
(6, 1, 'XXL', 'Blanco', 7),
(7, 2, 'XS', 'Azul', 3),
(8, 2, 'S', 'Azul', 3),
(9, 2, 'M', 'Azul', 3),
(10, 2, 'L', 'Azul', 3),
(11, 2, 'XL', 'Azul', 3),
(12, 2, 'XXL', 'Azul', 3),
(13, 3, 'XS', 'Azul', 12),
(14, 3, 'S', 'Azul', 12),
(15, 3, 'M', 'Azul', 13),
(16, 3, 'L', 'Azul', 12),
(17, 3, 'XL', 'Azul', 12),
(18, 3, 'XXL', 'Azul', 12),
(19, 4, 'XS', 'Azul', 10),
(20, 4, 'S', 'Azul', 11),
(21, 4, 'M', 'Azul', 10),
(22, 4, 'L', 'Azul', 10),
(23, 4, 'XL', 'Azul', 10),
(24, 4, 'XXL', 'Azul', 10),
(25, 5, 'XS', 'Blanco', 5),
(26, 5, 'S', 'Blanco', 6),
(27, 5, 'M', 'Blanco', 5),
(28, 5, 'L', 'Blanco', 5),
(29, 5, 'XL', 'Blanco', 5),
(30, 5, 'XXL', 'Blanco', 5),
(31, 6, 'XS', 'Blanco', 9),
(32, 6, 'S', 'Blanco', 9),
(33, 6, 'M', 'Blanco', 9),
(34, 6, 'L', 'Blanco', 9),
(35, 6, 'XL', 'Blanco', 10),
(36, 6, 'XXL', 'Blanco', 9),
(37, 7, 'XS', 'Blanco', 15),
(38, 7, 'S', 'Blanco', 15),
(39, 7, 'M', 'Blanco', 15),
(40, 7, 'L', 'Blanco', 15),
(41, 7, 'XL', 'Blanco', 15),
(42, 7, 'XXL', 'Blanco', 15),
(43, 8, 'XS', 'Blanco', 0),
(44, 8, 'S', 'Blanco', 1),
(45, 8, 'M', 'Blanco', 1),
(46, 8, 'L', 'Blanco', 1),
(47, 8, 'XL', 'Blanco', 1),
(48, 8, 'XXL', 'Blanco', 4),
(49, 9, 'XS', 'Verde', 6),
(50, 9, 'S', 'Verde', 6),
(51, 9, 'M', 'Verde', 4),
(52, 9, 'L', 'Verde', 6),
(53, 9, 'XL', 'Verde', 6),
(54, 9, 'XXL', 'Verde', 7),
(55, 10, 'XS', 'Gris', 14),
(56, 10, 'S', 'Gris', 14),
(57, 10, 'M', 'Gris', 14),
(58, 10, 'L', 'Gris', 14),
(59, 10, 'XL', 'Gris', 14),
(60, 10, 'XXL', 'Gris', 14),
(61, 11, 'XS', 'Verde', 9),
(62, 11, 'S', 'Verde', 9),
(63, 11, 'M', 'Verde', 6),
(64, 11, 'L', 'Verde', 9),
(65, 11, 'XL', 'Verde', 10),
(66, 11, 'XXL', 'Verde', 9),
(67, 12, 'XS', 'Verde', 4),
(68, 12, 'S', 'Verde', 4),
(69, 12, 'M', 'Verde', 4),
(70, 12, 'L', 'Verde', 4),
(71, 12, 'XL', 'Verde', 4),
(72, 12, 'XXL', 'Verde', 4),
(73, 13, 'XS', 'Beige', 11),
(74, 13, 'S', 'Beige', 11),
(75, 13, 'M', 'Beige', 11),
(76, 13, 'L', 'Beige', 11),
(77, 13, 'XL', 'Beige', 11),
(78, 13, 'XXL', 'Beige', 11),
(79, 14, 'XS', 'Rosa', 5),
(80, 14, 'S', 'Rosa', 5),
(81, 14, 'M', 'Rosa', 5),
(82, 14, 'L', 'Rosa', 5),
(83, 14, 'XL', 'Rosa', 5),
(84, 14, 'XXL', 'Rosa', 5),
(85, 15, 'XS', 'Gris', 8),
(86, 15, 'S', 'Gris', 8),
(87, 15, 'M', 'Gris', 8),
(88, 15, 'L', 'Gris', 9),
(89, 15, 'XL', 'Gris', 8),
(90, 15, 'XXL', 'Gris', 10),
(91, 16, 'XS', 'Azul', 16),
(92, 16, 'S', 'Azul', 16),
(93, 16, 'M', 'Azul', 16),
(94, 16, 'L', 'Azul', 16),
(95, 16, 'XL', 'Azul', 16),
(96, 16, 'XXL', 'Azul', 16),
(97, 17, 'XS', 'Gris', 11),
(98, 17, 'S', 'Gris', 11),
(99, 17, 'M', 'Gris', 11),
(100, 17, 'L', 'Gris', 11),
(101, 17, 'XL', 'Gris', 11),
(102, 17, 'XXL', 'Gris', 11),
(103, 18, 'XS', 'Negro', 10),
(104, 18, 'S', 'Negro', 5),
(105, 18, 'M', 'Negro', 5),
(106, 18, 'L', 'Negro', 5),
(107, 18, 'XL', 'Negro', 15),
(108, 18, 'XXL', 'Negro', 10),
(109, 19, 'XS', 'Negro', 4),
(110, 19, 'S', 'Negro', 4),
(111, 19, 'M', 'Negro', 4),
(112, 19, 'L', 'Negro', 4),
(113, 19, 'XL', 'Negro', 4),
(114, 19, 'XXL', 'Negro', 6),
(115, 20, 'XS', 'Negro', 14),
(116, 20, 'S', 'Negro', 14),
(117, 20, 'M', 'Negro', 14),
(118, 20, 'L', 'Negro', 14),
(119, 20, 'XL', 'Negro', 14),
(120, 20, 'XXL', 'Negro', 14),
(121, 21, 'XS', 'Gris', 5),
(122, 21, 'S', 'Gris', 5),
(123, 21, 'M', 'Gris', 5),
(124, 21, 'L', 'Gris', 5),
(125, 21, 'XL', 'Gris', 5),
(126, 21, 'XXL', 'Gris', 5),
(127, 22, 'XS', 'Verde', 3),
(128, 22, 'S', 'Verde', 3),
(129, 22, 'M', 'Verde', 3),
(130, 22, 'L', 'Verde', 3),
(131, 22, 'XL', 'Verde', 3),
(132, 22, 'XXL', 'Verde', 3),
(133, 23, 'XS', 'Azul', 10),
(134, 23, 'S', 'Azul', 10),
(135, 23, 'M', 'Azul', 10),
(136, 23, 'L', 'Azul', 10),
(137, 23, 'XL', 'Azul', 10),
(138, 23, 'XXL', 'Azul', 10),
(139, 24, 'XS', 'Marrón', 7),
(140, 24, 'S', 'Marrón', 7),
(141, 24, 'M', 'Marrón', 7),
(142, 24, 'L', 'Marrón', 7),
(143, 24, 'XL', 'Marrón', 7),
(144, 24, 'XXL', 'Marrón', 7),
(145, 25, 'XS', 'Azul', 9),
(146, 25, 'S', 'Azul', 9),
(147, 25, 'M', 'Azul', 9),
(148, 25, 'L', 'Azul', 9),
(149, 25, 'XL', 'Azul', 9),
(150, 25, 'XXL', 'Azul', 9),
(151, 26, 'XS', 'Negro', 3),
(152, 26, 'S', 'Negro', 3),
(153, 26, 'M', 'Negro', 3),
(154, 26, 'L', 'Negro', 3),
(155, 26, 'XL', 'Negro', 3),
(156, 26, 'XXL', 'Negro', 3),
(157, 27, 'XS', 'Marrón', 6),
(158, 27, 'S', 'Marrón', 6),
(159, 27, 'M', 'Marrón', 6),
(160, 27, 'L', 'Marrón', 6),
(161, 27, 'XL', 'Marrón', 6),
(162, 27, 'XXL', 'Marrón', 6),
(163, 28, 'XS', 'Azul', 12),
(164, 28, 'S', 'Azul', 12),
(165, 28, 'M', 'Azul', 12),
(166, 28, 'L', 'Azul', 12),
(167, 28, 'XL', 'Azul', 12),
(168, 28, 'XXL', 'Azul', 12),
(169, 29, 'XS', 'Gris', 15),
(170, 29, 'S', 'Gris', 15),
(171, 29, 'M', 'Gris', 15),
(172, 29, 'L', 'Gris', 15),
(173, 29, 'XL', 'Gris', 15),
(174, 29, 'XXL', 'Gris', 15),
(175, 30, 'XS', 'Blanco', 7),
(176, 30, 'S', 'Blanco', 7),
(177, 30, 'M', 'Blanco', 7),
(178, 30, 'L', 'Blanco', 7),
(179, 30, 'XL', 'Blanco', 7),
(180, 30, 'XXL', 'Blanco', 7),
(181, 31, 'XS', 'Gris', 5),
(182, 31, 'S', 'Gris', 5),
(183, 31, 'M', 'Gris', 5),
(184, 31, 'L', 'Gris', 5),
(185, 31, 'XL', 'Gris', 5),
(186, 31, 'XXL', 'Gris', 5),
(187, 32, 'XS', 'Blanco', 3),
(188, 32, 'S', 'Blanco', 3),
(189, 32, 'M', 'Blanco', 3),
(190, 32, 'L', 'Blanco', 3),
(191, 32, 'XL', 'Blanco', 3),
(192, 32, 'XXL', 'Blanco', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `PedidoID` int(11) NOT NULL,
  `ClienteID` int(11) DEFAULT NULL,
  `FechaPedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `Total` decimal(10,2) NOT NULL,
  `Estado` varchar(50) DEFAULT 'EN PROCESO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prendas`
--

CREATE TABLE `prendas` (
  `PrendasID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `CategoriaID` int(11) DEFAULT NULL,
  `FechaAgregado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prendas`
--

INSERT INTO `prendas` (`PrendasID`, `Nombre`, `Descripcion`, `Precio`, `CategoriaID`, `FechaAgregado`) VALUES
(1, 'Zafiro Brillante', 'Camiseta gráfica', 6.00, 1, '2024-06-03 10:25:54'),
(2, 'Onda Azul', 'Tubo con estampado geométrico', 7.00, 1, '2024-06-03 10:25:55'),
(3, 'Azul Cielo', 'Polo corto', 5.00, 1, '2024-06-03 10:25:55'),
(4, 'Mar Profundo', 'Top halter con fruncido delantero', 6.00, 1, '2024-06-03 10:25:55'),
(5, 'Algodón Puro', 'Camiseta blanca corta con hombres caídos', 11.00, 1, '2024-06-03 10:25:55'),
(6, 'Nieve Fresca', 'Estampado de cruz con cordones laterales', 6.00, 1, '2024-06-03 10:25:55'),
(7, 'Blanco Perla', 'Top halter con volantes', 10.00, 1, '2024-06-03 10:25:55'),
(8, 'Brisa Blanca', 'Top boho sin tirantes', 7.00, 1, '2024-06-03 10:25:55'),
(9, 'Esmeralda Primaveral', 'Camiseta con estampado de slogan ribete', 6.00, 1, '2024-06-03 10:25:55'),
(10, 'Jade Sereno', 'Top bustier con cierre de cremallera', 10.00, 1, '2024-06-03 10:25:55'),
(11, 'Granito Suave', 'Top tubo corto tejido de cabalé', 4.00, 1, '2024-06-03 10:25:55'),
(12, 'Musgo Encantado', 'Camiseta crop con cordón delantero', 6.00, 1, '2024-06-03 10:25:55'),
(13, 'Primavera Floreciente', 'Corto desigual con correa asimétrica', 7.00, 1, '2024-06-03 10:25:55'),
(14, 'Flores Silvestres', 'Top halter', 13.00, 1, '2024-06-03 10:25:55'),
(15, 'Acero Lunar', 'Camiseta ajustada de manga cortacon estampado de estrellas', 5.00, 1, '2024-06-03 10:25:55'),
(16, 'Azul Veloz', 'Camiseta crop con estampado de letra', 7.00, 1, '2024-06-03 10:25:55'),
(17, 'Niebla Plateada', 'Camiseta grunge de cuello asimétrico tejido de canalé', 5.00, 1, '2024-06-03 10:25:55'),
(18, 'Noche Estelar', 'Camiseta corta con estampado de letras', 6.00, 1, '2024-06-03 10:25:55'),
(19, 'Carbón Elegante', 'Camiseta de manga corta con patrón de araña', 5.00, 1, '2024-06-03 10:25:55'),
(20, 'Obsidiana Brillante', 'Camiseta informal con cuello redondo y estampado de pedrería', 6.00, 1, '2024-06-03 10:25:55'),
(21, 'Distinción Urbana', 'Shorts tejidos', 11.00, 2, '2024-06-03 12:43:44'),
(22, 'Chic Contemporáneo', 'Shorts con bolsillo con solapa con diseño de hebilla cargo', 15.00, 2, '2024-06-03 12:43:44'),
(23, 'Cuadros Clásicos', 'Shorts bolsillo a cuadros casual', 6.00, 2, '2024-06-03 12:43:44'),
(24, 'Canela Cómodos', 'Shorts con bolsillo lateral con solapa', 15.00, 2, '2024-06-03 12:43:44'),
(25, 'Azul Medianoche', 'Shorts deportivos vintage informales', 8.00, 2, '2024-06-03 12:43:44'),
(26, 'Negro Profundo', 'Shorts con estampado de slogan y dibujos', 5.00, 2, '2024-06-03 12:43:44'),
(27, 'Tierra Tostada', 'Shorts con estampado de mariposa y letra', 7.00, 2, '2024-06-03 12:43:44'),
(28, 'Rayas Sofisticadas', 'Shorts de rayas', 9.00, 2, '2024-06-03 12:43:44'),
(29, 'Gris Atlético', 'Shorts con estampado de dibujos con letras', 6.00, 2, '2024-06-03 12:43:44'),
(30, 'Nieve Ligera', 'Grunge punk shorts cruzado con parches', 9.00, 2, '2024-06-03 12:43:44'),
(31, 'Plata Deportiva', 'Shorts telaraña con estampado de corazón', 7.00, 2, '2024-06-03 12:43:44'),
(32, 'Algodón Blanco', 'Shorts de lino', 9.00, 2, '2024-06-03 12:43:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `ProveedorID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Producto` varchar(25) NOT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Ciudad` varchar(255) DEFAULT NULL,
  `CodigoPostal` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`AdministradorID`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`CategoriaID`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`ClienteID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indices de la tabla `detallepedidos`
--
ALTER TABLE `detallepedidos`
  ADD PRIMARY KEY (`DetallePedidoID`),
  ADD KEY `PedidoID` (`PedidoID`),
  ADD KEY `PrendasID` (`PrendasID`);

--
-- Indices de la tabla `especificaciones`
--
ALTER TABLE `especificaciones`
  ADD PRIMARY KEY (`EspecificacionesID`),
  ADD KEY `PrendaID` (`PrendaID`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`PedidoID`),
  ADD KEY `ClienteID` (`ClienteID`);

--
-- Indices de la tabla `prendas`
--
ALTER TABLE `prendas`
  ADD PRIMARY KEY (`PrendasID`),
  ADD KEY `CategoriaID` (`CategoriaID`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`ProveedorID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `AdministradorID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `CategoriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `ClienteID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallepedidos`
--
ALTER TABLE `detallepedidos`
  MODIFY `DetallePedidoID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especificaciones`
--
ALTER TABLE `especificaciones`
  MODIFY `EspecificacionesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `PedidoID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prendas`
--
ALTER TABLE `prendas`
  MODIFY `PrendasID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `ProveedorID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallepedidos`
--
ALTER TABLE `detallepedidos`
  ADD CONSTRAINT `detallepedidos_ibfk_1` FOREIGN KEY (`PedidoID`) REFERENCES `pedidos` (`PedidoID`),
  ADD CONSTRAINT `detallepedidos_ibfk_2` FOREIGN KEY (`PrendasID`) REFERENCES `prendas` (`PrendasID`);

--
-- Filtros para la tabla `especificaciones`
--
ALTER TABLE `especificaciones`
  ADD CONSTRAINT `especificaciones_ibfk_1` FOREIGN KEY (`PrendaID`) REFERENCES `prendas` (`PrendasID`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`ClienteID`) REFERENCES `clientes` (`ClienteID`);

--
-- Filtros para la tabla `prendas`
--
ALTER TABLE `prendas`
  ADD CONSTRAINT `prendas_ibfk_1` FOREIGN KEY (`CategoriaID`) REFERENCES `categorias` (`CategoriaID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
