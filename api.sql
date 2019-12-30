-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.1.37-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para administra
CREATE DATABASE IF NOT EXISTS `api` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `api`;

-- Volcando estructura para tabla administra.abonos
CREATE TABLE IF NOT EXISTS `abonos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tercero` int(11) NOT NULL,
  `fecha_at` date NOT NULL,
  `monto` decimal(12,2) NOT NULL,
  `monto_dolar` decimal(12,2) DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8 NOT NULL,
  `tipo` varchar(3) CHARACTER SET utf8 DEFAULT NULL,
  `monto_restante` decimal(12,2) NOT NULL,
  `monto_restante_dolar` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.abonos: ~0 rows (aproximadamente)
DELETE FROM `abonos`;
/*!40000 ALTER TABLE `abonos` DISABLE KEYS */;
/*!40000 ALTER TABLE `abonos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.acceso
CREATE TABLE IF NOT EXISTS `acceso` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del acceso',
  `usuario_id` int(11) NOT NULL COMMENT 'Identificador del usuario que accede',
  `tipo_acceso` int(1) NOT NULL DEFAULT '1' COMMENT 'Tipo de acceso (entrata o salida)',
  `ip` varchar(45) DEFAULT NULL COMMENT 'Dirección IP del usuario que ingresa',
  `acceso_at` datetime DEFAULT NULL COMMENT 'Fecha de registro del acceso',
  PRIMARY KEY (`id`),
  KEY `fk_acceso_usuario_idx` (`usuario_id`),
  CONSTRAINT `fk_acceso_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='Tabla que registra los accesos de los usuarios al sistema';

-- Volcando datos para la tabla administra.acceso: ~16 rows (aproximadamente)
DELETE FROM `acceso`;
/*!40000 ALTER TABLE `acceso` DISABLE KEYS */;
INSERT INTO `acceso` (`id`, `usuario_id`, `tipo_acceso`, `ip`, `acceso_at`) VALUES
	(1, 4, 1, '::1', '2019-07-11 14:11:26'),
	(2, 4, 2, '::1', '2019-07-11 14:11:46'),
	(3, 2, 1, '::1', '2019-07-11 15:44:24'),
	(4, 2, 1, '::1', '2019-07-15 14:50:02'),
	(5, 2, 1, '::1', '2019-07-18 14:05:48'),
	(6, 2, 1, '::1', '2019-07-19 14:08:32'),
	(7, 2, 1, '::1', '2019-07-25 09:43:58'),
	(8, 2, 1, '::1', '2019-07-28 15:52:16'),
	(9, 2, 1, '::1', '2019-07-29 10:21:40'),
	(10, 2, 1, '::1', '2019-07-30 09:30:15'),
	(11, 2, 1, '::1', '2019-07-30 12:49:11'),
	(12, 2, 1, '::1', '2019-08-01 14:51:56'),
	(13, 2, 1, '::1', '2019-08-06 11:53:28'),
	(14, 2, 1, '::1', '2019-08-09 15:58:39'),
	(15, 2, 1, '::1', '2019-08-12 10:01:21'),
	(16, 2, 1, '::1', '2019-08-13 13:53:05');
/*!40000 ALTER TABLE `acceso` ENABLE KEYS */;

-- Volcando estructura para tabla administra.backup
CREATE TABLE IF NOT EXISTS `backup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `denominacion` varchar(200) NOT NULL,
  `tamano` varchar(45) DEFAULT NULL,
  `archivo` varchar(45) NOT NULL,
  `backup_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_backup_usuario_idx` (`usuario_id`),
  CONSTRAINT `fk_backup_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene las copias de seguridad del sistema';

-- Volcando datos para la tabla administra.backup: ~0 rows (aproximadamente)
DELETE FROM `backup`;
/*!40000 ALTER TABLE `backup` DISABLE KEYS */;
INSERT INTO `backup` (`id`, `usuario_id`, `denominacion`, `tamano`, `archivo`, `backup_at`) VALUES
	(1, 2, 'DBKM Inicial', '3,44 KB', 'backup-1.sql.gz', '2014-01-01 00:00:01');
/*!40000 ALTER TABLE `backup` ENABLE KEYS */;

-- Volcando estructura para tabla administra.banco
CREATE TABLE IF NOT EXISTS `banco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cuenta` varchar(25) CHARACTER SET utf8 NOT NULL,
  `fecha_at` datetime NOT NULL,
  `entidad_id` int(11) NOT NULL,
  `fecha_apertura` date NOT NULL,
  `direccion` varchar(250) CHARACTER SET utf8 NOT NULL,
  `telefono` varchar(25) CHARACTER SET utf8 NOT NULL,
  `tipo_cuenta_id` int(11) NOT NULL,
  `agencia` varchar(150) CHARACTER SET utf8 NOT NULL,
  `contacto` varchar(150) CHARACTER SET utf8 NOT NULL,
  `telefono_contacto` varchar(25) CHARACTER SET utf8 NOT NULL,
  `email_contacto` varchar(70) CHARACTER SET utf8 DEFAULT NULL,
  `dias_diferidos` int(11) NOT NULL,
  `ult_saldo_conciliado` decimal(30,2) NOT NULL,
  `saldo_actual` decimal(30,2) DEFAULT NULL,
  `fecha_ult_conciliacion` date DEFAULT NULL,
  `pto_venta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_banco_entidad` (`entidad_id`),
  CONSTRAINT `fk_banco_entidad` FOREIGN KEY (`entidad_id`) REFERENCES `entidad` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Mantenimiento Tabla Bancos';

-- Volcando datos para la tabla administra.banco: ~0 rows (aproximadamente)
DELETE FROM `banco`;
/*!40000 ALTER TABLE `banco` DISABLE KEYS */;
/*!40000 ALTER TABLE `banco` ENABLE KEYS */;

-- Volcando estructura para tabla administra.beneficiario
CREATE TABLE IF NOT EXISTS `beneficiario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) CHARACTER SET utf8 NOT NULL,
  `clientes_id` int(11) DEFAULT NULL,
  `proveedor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.beneficiario: ~0 rows (aproximadamente)
DELETE FROM `beneficiario`;
/*!40000 ALTER TABLE `beneficiario` DISABLE KEYS */;
/*!40000 ALTER TABLE `beneficiario` ENABLE KEYS */;

-- Volcando estructura para tabla administra.caja
CREATE TABLE IF NOT EXISTS `caja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 NOT NULL,
  `saldo_actual` decimal(12,2) NOT NULL DEFAULT '0.00',
  `cnt_plan_cuentas` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) COMMENT 'Clave Primaria',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='Mantenimiento de Caja';

-- Volcando datos para la tabla administra.caja: ~2 rows (aproximadamente)
DELETE FROM `caja`;
/*!40000 ALTER TABLE `caja` DISABLE KEYS */;
INSERT INTO `caja` (`id`, `nombre`, `saldo_actual`, `cnt_plan_cuentas`) VALUES
	(1, 'VENTAS', 0.00, 1),
	(2, 'CAJA CHICA', 0.00, 1);
/*!40000 ALTER TABLE `caja` ENABLE KEYS */;

-- Volcando estructura para tabla administra.cambio
CREATE TABLE IF NOT EXISTS `cambio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tasa` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.cambio: ~0 rows (aproximadamente)
DELETE FROM `cambio`;
/*!40000 ALTER TABLE `cambio` DISABLE KEYS */;
INSERT INTO `cambio` (`id`, `tasa`) VALUES
	(1, 15000.00);
/*!40000 ALTER TABLE `cambio` ENABLE KEYS */;

-- Volcando estructura para tabla administra.cargos
CREATE TABLE IF NOT EXISTS `cargos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` datetime DEFAULT NULL,
  `fecha_in` datetime DEFAULT NULL,
  `conceptos_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.cargos: ~1 rows (aproximadamente)
DELETE FROM `cargos`;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.ciudad
CREATE TABLE IF NOT EXISTS `ciudad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=523 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.ciudad: ~498 rows (aproximadamente)
DELETE FROM `ciudad`;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` (`id`, `estado_id`, `nombre`) VALUES
	(1, 1, 'Maroa'),
	(2, 1, 'Puerto Ayacucho'),
	(3, 1, 'San Fernando de Atabapo'),
	(4, 2, 'Anaco'),
	(5, 2, 'Aragua de Barcelona'),
	(6, 2, 'Barcelona'),
	(7, 2, 'Boca de Uchire'),
	(8, 2, 'Cantaura'),
	(9, 2, 'Clarines'),
	(10, 2, 'El Chaparro'),
	(11, 2, 'El Pao Anzoátegui'),
	(12, 2, 'El Tigre'),
	(13, 2, 'El Tigrito'),
	(14, 2, 'Guanape'),
	(15, 2, 'Guanta'),
	(16, 2, 'Lechería'),
	(17, 2, 'Onoto'),
	(18, 2, 'Pariaguán'),
	(19, 2, 'Píritu'),
	(20, 2, 'Puerto La Cruz'),
	(21, 2, 'Puerto Píritu'),
	(22, 2, 'Sabana de Uchire'),
	(23, 2, 'San Mateo Anzoátegui'),
	(24, 2, 'San Pablo Anzoátegui'),
	(25, 2, 'San Tomé'),
	(26, 2, 'Santa Ana de Anzoátegui'),
	(27, 2, 'Santa Fe Anzoátegui'),
	(28, 2, 'Santa Rosa'),
	(29, 2, 'Soledad'),
	(30, 2, 'Urica'),
	(31, 2, 'Valle de Guanape'),
	(43, 3, 'Achaguas'),
	(44, 3, 'Biruaca'),
	(45, 3, 'Bruzual'),
	(46, 3, 'El Amparo'),
	(47, 3, 'El Nula'),
	(48, 3, 'Elorza'),
	(49, 3, 'Guasdualito'),
	(50, 3, 'Mantecal'),
	(51, 3, 'Puerto Páez'),
	(52, 3, 'San Fernando de Apure'),
	(53, 3, 'San Juan de Payara'),
	(54, 4, 'Barbacoas'),
	(55, 4, 'Cagua'),
	(56, 4, 'Camatagua'),
	(58, 4, 'Choroní'),
	(59, 4, 'Colonia Tovar'),
	(60, 4, 'El Consejo'),
	(61, 4, 'La Victoria'),
	(62, 4, 'Las Tejerías'),
	(63, 4, 'Magdaleno'),
	(64, 4, 'Maracay'),
	(65, 4, 'Ocumare de La Costa'),
	(66, 4, 'Palo Negro'),
	(67, 4, 'San Casimiro'),
	(68, 4, 'San Mateo'),
	(69, 4, 'San Sebastián'),
	(70, 4, 'Santa Cruz de Aragua'),
	(71, 4, 'Tocorón'),
	(72, 4, 'Turmero'),
	(73, 4, 'Villa de Cura'),
	(74, 4, 'Zuata'),
	(75, 5, 'Barinas'),
	(76, 5, 'Barinitas'),
	(77, 5, 'Barrancas'),
	(78, 5, 'Calderas'),
	(79, 5, 'Capitanejo'),
	(80, 5, 'Ciudad Bolivia'),
	(81, 5, 'El Cantón'),
	(82, 5, 'Las Veguitas'),
	(83, 5, 'Libertad de Barinas'),
	(84, 5, 'Sabaneta'),
	(85, 5, 'Santa Bárbara de Barinas'),
	(86, 5, 'Socopó'),
	(87, 6, 'Caicara del Orinoco'),
	(88, 6, 'Canaima'),
	(89, 6, 'Ciudad Bolívar'),
	(90, 6, 'Ciudad Piar'),
	(91, 6, 'El Callao'),
	(92, 6, 'El Dorado'),
	(93, 6, 'El Manteco'),
	(94, 6, 'El Palmar'),
	(95, 6, 'El Pao'),
	(96, 6, 'Guasipati'),
	(97, 6, 'Guri'),
	(98, 6, 'La Paragua'),
	(99, 6, 'Matanzas'),
	(100, 6, 'Puerto Ordaz'),
	(101, 6, 'San Félix'),
	(102, 6, 'Santa Elena de Uairén'),
	(103, 6, 'Tumeremo'),
	(104, 6, 'Unare'),
	(105, 6, 'Upata'),
	(106, 7, 'Bejuma'),
	(107, 7, 'Belén'),
	(108, 7, 'Campo de Carabobo'),
	(109, 7, 'Canoabo'),
	(110, 7, 'Central Tacarigua'),
	(111, 7, 'Chirgua'),
	(112, 7, 'Ciudad Alianza'),
	(113, 7, 'El Palito'),
	(114, 7, 'Guacara'),
	(115, 7, 'Guigue'),
	(116, 7, 'Las Trincheras'),
	(117, 7, 'Los Guayos'),
	(118, 7, 'Mariara'),
	(119, 7, 'Miranda'),
	(120, 7, 'Montalbán'),
	(121, 7, 'Morón'),
	(122, 7, 'Naguanagua'),
	(123, 7, 'Puerto Cabello'),
	(124, 7, 'San Joaquín'),
	(125, 7, 'Tocuyito'),
	(126, 7, 'Urama'),
	(127, 7, 'Valencia'),
	(128, 7, 'Vigirimita'),
	(129, 8, 'Aguirre'),
	(130, 8, 'Apartaderos Cojedes'),
	(131, 8, 'Arismendi'),
	(132, 8, 'Camuriquito'),
	(133, 8, 'El Baúl'),
	(134, 8, 'El Limón'),
	(135, 8, 'El Pao Cojedes'),
	(136, 8, 'El Socorro'),
	(137, 8, 'La Aguadita'),
	(138, 8, 'Las Vegas'),
	(139, 8, 'Libertad de Cojedes'),
	(140, 8, 'Mapuey'),
	(141, 8, 'Piñedo'),
	(142, 8, 'Samancito'),
	(143, 8, 'San Carlos'),
	(144, 8, 'Sucre'),
	(145, 8, 'Tinaco'),
	(146, 8, 'Tinaquillo'),
	(147, 8, 'Vallecito'),
	(148, 9, 'Tucupita'),
	(149, 24, 'Caracas'),
	(150, 24, 'El Junquito'),
	(151, 10, 'Adícora'),
	(152, 10, 'Boca de Aroa'),
	(153, 10, 'Cabure'),
	(154, 10, 'Capadare'),
	(155, 10, 'Capatárida'),
	(156, 10, 'Chichiriviche'),
	(157, 10, 'Churuguara'),
	(158, 10, 'Coro'),
	(159, 10, 'Cumarebo'),
	(160, 10, 'Dabajuro'),
	(161, 10, 'Judibana'),
	(162, 10, 'La Cruz de Taratara'),
	(163, 10, 'La Vela de Coro'),
	(164, 10, 'Los Taques'),
	(165, 10, 'Maparari'),
	(166, 10, 'Mene de Mauroa'),
	(167, 10, 'Mirimire'),
	(168, 10, 'Pedregal'),
	(169, 10, 'Píritu Falcón'),
	(170, 10, 'Pueblo Nuevo Falcón'),
	(171, 10, 'Puerto Cumarebo'),
	(172, 10, 'Punta Cardón'),
	(173, 10, 'Punto Fijo'),
	(174, 10, 'San Juan de Los Cayos'),
	(175, 10, 'San Luis'),
	(176, 10, 'Santa Ana Falcón'),
	(177, 10, 'Santa Cruz De Bucaral'),
	(178, 10, 'Tocopero'),
	(179, 10, 'Tocuyo de La Costa'),
	(180, 10, 'Tucacas'),
	(181, 10, 'Yaracal'),
	(182, 11, 'Altagracia de Orituco'),
	(183, 11, 'Cabruta'),
	(184, 11, 'Calabozo'),
	(185, 11, 'Camaguán'),
	(196, 11, 'Chaguaramas Guárico'),
	(197, 11, 'El Socorro'),
	(198, 11, 'El Sombrero'),
	(199, 11, 'Las Mercedes de Los Llanos'),
	(200, 11, 'Lezama'),
	(201, 11, 'Onoto'),
	(202, 11, 'Ortíz'),
	(203, 11, 'San José de Guaribe'),
	(204, 11, 'San Juan de Los Morros'),
	(205, 11, 'San Rafael de Laya'),
	(206, 11, 'Santa María de Ipire'),
	(207, 11, 'Tucupido'),
	(208, 11, 'Valle de La Pascua'),
	(209, 11, 'Zaraza'),
	(210, 12, 'Aguada Grande'),
	(211, 12, 'Atarigua'),
	(212, 12, 'Barquisimeto'),
	(213, 12, 'Bobare'),
	(214, 12, 'Cabudare'),
	(215, 12, 'Carora'),
	(216, 12, 'Cubiro'),
	(217, 12, 'Cují'),
	(218, 12, 'Duaca'),
	(219, 12, 'El Manzano'),
	(220, 12, 'El Tocuyo'),
	(221, 12, 'Guaríco'),
	(222, 12, 'Humocaro Alto'),
	(223, 12, 'Humocaro Bajo'),
	(224, 12, 'La Miel'),
	(225, 12, 'Moroturo'),
	(226, 12, 'Quíbor'),
	(227, 12, 'Río Claro'),
	(228, 12, 'Sanare'),
	(229, 12, 'Santa Inés'),
	(230, 12, 'Sarare'),
	(231, 12, 'Siquisique'),
	(232, 12, 'Tintorero'),
	(233, 13, 'Apartaderos Mérida'),
	(234, 13, 'Arapuey'),
	(235, 13, 'Bailadores'),
	(236, 13, 'Caja Seca'),
	(237, 13, 'Canaguá'),
	(238, 13, 'Chachopo'),
	(239, 13, 'Chiguara'),
	(240, 13, 'Ejido'),
	(241, 13, 'El Vigía'),
	(242, 13, 'La Azulita'),
	(243, 13, 'La Playa'),
	(244, 13, 'Lagunillas Mérida'),
	(245, 13, 'Mérida'),
	(246, 13, 'Mesa de Bolívar'),
	(247, 13, 'Mucuchíes'),
	(248, 13, 'Mucujepe'),
	(249, 13, 'Mucuruba'),
	(250, 13, 'Nueva Bolivia'),
	(251, 13, 'Palmarito'),
	(252, 13, 'Pueblo Llano'),
	(253, 13, 'Santa Cruz de Mora'),
	(254, 13, 'Santa Elena de Arenales'),
	(255, 13, 'Santo Domingo'),
	(256, 13, 'Tabáy'),
	(257, 13, 'Timotes'),
	(258, 13, 'Torondoy'),
	(259, 13, 'Tovar'),
	(260, 13, 'Tucani'),
	(261, 13, 'Zea'),
	(262, 14, 'Araguita'),
	(263, 14, 'Carrizal'),
	(264, 14, 'Caucagua'),
	(265, 14, 'Chaguaramas Miranda'),
	(266, 14, 'Charallave'),
	(267, 14, 'Chirimena'),
	(268, 14, 'Chuspa'),
	(269, 14, 'Cúa'),
	(270, 14, 'Cupira'),
	(271, 14, 'Curiepe'),
	(272, 14, 'El Guapo'),
	(273, 14, 'El Jarillo'),
	(274, 14, 'Filas de Mariche'),
	(275, 14, 'Guarenas'),
	(276, 14, 'Guatire'),
	(277, 14, 'Higuerote'),
	(278, 14, 'Los Anaucos'),
	(279, 14, 'Los Teques'),
	(280, 14, 'Ocumare del Tuy'),
	(281, 14, 'Panaquire'),
	(282, 14, 'Paracotos'),
	(283, 14, 'Río Chico'),
	(284, 14, 'San Antonio de Los Altos'),
	(285, 14, 'San Diego de Los Altos'),
	(286, 14, 'San Fernando del Guapo'),
	(287, 14, 'San Francisco de Yare'),
	(288, 14, 'San José de Los Altos'),
	(289, 14, 'San José de Río Chico'),
	(290, 14, 'San Pedro de Los Altos'),
	(291, 14, 'Santa Lucía'),
	(292, 14, 'Santa Teresa'),
	(293, 14, 'Tacarigua de La Laguna'),
	(294, 14, 'Tacarigua de Mamporal'),
	(295, 14, 'Tácata'),
	(296, 14, 'Turumo'),
	(297, 15, 'Aguasay'),
	(298, 15, 'Aragua de Maturín'),
	(299, 15, 'Barrancas del Orinoco'),
	(300, 15, 'Caicara de Maturín'),
	(301, 15, 'Caripe'),
	(302, 15, 'Caripito'),
	(303, 15, 'Chaguaramal'),
	(305, 15, 'Chaguaramas Monagas'),
	(307, 15, 'El Furrial'),
	(308, 15, 'El Tejero'),
	(309, 15, 'Jusepín'),
	(310, 15, 'La Toscana'),
	(311, 15, 'Maturín'),
	(312, 15, 'Miraflores'),
	(313, 15, 'Punta de Mata'),
	(314, 15, 'Quiriquire'),
	(315, 15, 'San Antonio de Maturín'),
	(316, 15, 'San Vicente Monagas'),
	(317, 15, 'Santa Bárbara'),
	(318, 15, 'Temblador'),
	(319, 15, 'Teresen'),
	(320, 15, 'Uracoa'),
	(321, 16, 'Altagracia'),
	(322, 16, 'Boca de Pozo'),
	(323, 16, 'Boca de Río'),
	(324, 16, 'El Espinal'),
	(325, 16, 'El Valle del Espíritu Santo'),
	(326, 16, 'El Yaque'),
	(327, 16, 'Juangriego'),
	(328, 16, 'La Asunción'),
	(329, 16, 'La Guardia'),
	(330, 16, 'Pampatar'),
	(331, 16, 'Porlamar'),
	(332, 16, 'Puerto Fermín'),
	(333, 16, 'Punta de Piedras'),
	(334, 16, 'San Francisco de Macanao'),
	(335, 16, 'San Juan Bautista'),
	(336, 16, 'San Pedro de Coche'),
	(337, 16, 'Santa Ana de Nueva Esparta'),
	(338, 16, 'Villa Rosa'),
	(339, 17, 'Acarigua'),
	(340, 17, 'Agua Blanca'),
	(341, 17, 'Araure'),
	(342, 17, 'Biscucuy'),
	(343, 17, 'Boconoito'),
	(344, 17, 'Campo Elías'),
	(345, 17, 'Chabasquén'),
	(346, 17, 'Guanare'),
	(347, 17, 'Guanarito'),
	(348, 17, 'La Aparición'),
	(349, 17, 'La Misión'),
	(350, 17, 'Mesa de Cavacas'),
	(351, 17, 'Ospino'),
	(352, 17, 'Papelón'),
	(353, 17, 'Payara'),
	(354, 17, 'Pimpinela'),
	(355, 17, 'Píritu de Portuguesa'),
	(356, 17, 'San Rafael de Onoto'),
	(357, 17, 'Santa Rosalía'),
	(358, 17, 'Turén'),
	(359, 18, 'Altos de Sucre'),
	(360, 18, 'Araya'),
	(361, 18, 'Cariaco'),
	(362, 18, 'Carúpano'),
	(363, 18, 'Casanay'),
	(364, 18, 'Cumaná'),
	(365, 18, 'Cumanacoa'),
	(366, 18, 'El Morro Puerto Santo'),
	(367, 18, 'El Pilar'),
	(368, 18, 'El Poblado'),
	(369, 18, 'Guaca'),
	(370, 18, 'Guiria'),
	(371, 18, 'Irapa'),
	(372, 18, 'Manicuare'),
	(373, 18, 'Mariguitar'),
	(374, 18, 'Río Caribe'),
	(375, 18, 'San Antonio del Golfo'),
	(376, 18, 'San José de Aerocuar'),
	(377, 18, 'San Vicente de Sucre'),
	(378, 18, 'Santa Fe de Sucre'),
	(379, 18, 'Tunapuy'),
	(380, 18, 'Yaguaraparo'),
	(381, 18, 'Yoco'),
	(382, 19, 'Abejales'),
	(383, 19, 'Borota'),
	(384, 19, 'Bramon'),
	(385, 19, 'Capacho'),
	(386, 19, 'Colón'),
	(387, 19, 'Coloncito'),
	(388, 19, 'Cordero'),
	(389, 19, 'El Cobre'),
	(390, 19, 'El Pinal'),
	(391, 19, 'Independencia'),
	(392, 19, 'La Fría'),
	(393, 19, 'La Grita'),
	(394, 19, 'La Pedrera'),
	(395, 19, 'La Tendida'),
	(396, 19, 'Las Delicias'),
	(397, 19, 'Las Hernández'),
	(398, 19, 'Lobatera'),
	(399, 19, 'Michelena'),
	(400, 19, 'Palmira'),
	(401, 19, 'Pregonero'),
	(402, 19, 'Queniquea'),
	(403, 19, 'Rubio'),
	(404, 19, 'San Antonio del Tachira'),
	(405, 19, 'San Cristobal'),
	(406, 19, 'San José de Bolívar'),
	(407, 19, 'San Josecito'),
	(408, 19, 'San Pedro del Río'),
	(409, 19, 'Santa Ana Táchira'),
	(410, 19, 'Seboruco'),
	(411, 19, 'Táriba'),
	(412, 19, 'Umuquena'),
	(413, 19, 'Ureña'),
	(414, 20, 'Batatal'),
	(415, 20, 'Betijoque'),
	(416, 20, 'Boconó'),
	(417, 20, 'Carache'),
	(418, 20, 'Chejende'),
	(419, 20, 'Cuicas'),
	(420, 20, 'El Dividive'),
	(421, 20, 'El Jaguito'),
	(422, 20, 'Escuque'),
	(423, 20, 'Isnotú'),
	(424, 20, 'Jajó'),
	(425, 20, 'La Ceiba'),
	(426, 20, 'La Concepción de Trujllo'),
	(427, 20, 'La Mesa de Esnujaque'),
	(428, 20, 'La Puerta'),
	(429, 20, 'La Quebrada'),
	(430, 20, 'Mendoza Fría'),
	(431, 20, 'Meseta de Chimpire'),
	(432, 20, 'Monay'),
	(433, 20, 'Motatán'),
	(434, 20, 'Pampán'),
	(435, 20, 'Pampanito'),
	(436, 20, 'Sabana de Mendoza'),
	(437, 20, 'San Lázaro'),
	(438, 20, 'Santa Ana de Trujillo'),
	(439, 20, 'Tostós'),
	(440, 20, 'Trujillo'),
	(441, 20, 'Valera'),
	(442, 21, 'Carayaca'),
	(443, 21, 'Litoral'),
	(444, 25, 'Archipiélago Los Roques'),
	(445, 22, 'Aroa'),
	(446, 22, 'Boraure'),
	(447, 22, 'Campo Elías de Yaracuy'),
	(448, 22, 'Chivacoa'),
	(449, 22, 'Cocorote'),
	(450, 22, 'Farriar'),
	(451, 22, 'Guama'),
	(452, 22, 'Marín'),
	(453, 22, 'Nirgua'),
	(454, 22, 'Sabana de Parra'),
	(455, 22, 'Salom'),
	(456, 22, 'San Felipe'),
	(457, 22, 'San Pablo de Yaracuy'),
	(458, 22, 'Urachiche'),
	(459, 22, 'Yaritagua'),
	(460, 22, 'Yumare'),
	(461, 23, 'Bachaquero'),
	(462, 23, 'Bobures'),
	(463, 23, 'Cabimas'),
	(464, 23, 'Campo Concepción'),
	(465, 23, 'Campo Mara'),
	(466, 23, 'Campo Rojo'),
	(467, 23, 'Carrasquero'),
	(468, 23, 'Casigua'),
	(469, 23, 'Chiquinquirá'),
	(470, 23, 'Ciudad Ojeda'),
	(471, 23, 'El Batey'),
	(472, 23, 'El Carmelo'),
	(473, 23, 'El Chivo'),
	(474, 23, 'El Guayabo'),
	(475, 23, 'El Mene'),
	(476, 23, 'El Venado'),
	(477, 23, 'Encontrados'),
	(478, 23, 'Gibraltar'),
	(479, 23, 'Isla de Toas'),
	(480, 23, 'La Concepción del Zulia'),
	(481, 23, 'La Paz'),
	(482, 23, 'La Sierrita'),
	(483, 23, 'Lagunillas del Zulia'),
	(484, 23, 'Las Piedras de Perijá'),
	(485, 23, 'Los Cortijos'),
	(486, 23, 'Machiques'),
	(487, 23, 'Maracaibo'),
	(488, 23, 'Mene Grande'),
	(489, 23, 'Palmarejo'),
	(490, 23, 'Paraguaipoa'),
	(491, 23, 'Potrerito'),
	(492, 23, 'Pueblo Nuevo del Zulia'),
	(493, 23, 'Puertos de Altagracia'),
	(494, 23, 'Punta Gorda'),
	(495, 23, 'Sabaneta de Palma'),
	(496, 23, 'San Francisco'),
	(497, 23, 'San José de Perijá'),
	(498, 23, 'San Rafael del Moján'),
	(499, 23, 'San Timoteo'),
	(500, 23, 'Santa Bárbara Del Zulia'),
	(501, 23, 'Santa Cruz de Mara'),
	(502, 23, 'Santa Cruz del Zulia'),
	(503, 23, 'Santa Rita'),
	(504, 23, 'Sinamaica'),
	(505, 23, 'Tamare'),
	(506, 23, 'Tía Juana'),
	(507, 23, 'Villa del Rosario'),
	(508, 21, 'La Guaira'),
	(509, 21, 'Catia La Mar'),
	(510, 21, 'Macuto'),
	(511, 21, 'Naiguatá'),
	(512, 25, 'Archipiélago Los Monjes'),
	(513, 25, 'Isla La Tortuga y Cayos adyacentes'),
	(514, 25, 'Isla La Sola'),
	(515, 25, 'Islas Los Testigos'),
	(516, 25, 'Islas Los Frailes'),
	(517, 25, 'Isla La Orchila'),
	(518, 25, 'Archipiélago Las Aves'),
	(519, 25, 'Isla de Aves'),
	(520, 25, 'Isla La Blanquilla'),
	(521, 25, 'Isla de Patos'),
	(522, 25, 'Islas Los Hermanos');
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;

-- Volcando estructura para tabla administra.clave_especial
CREATE TABLE IF NOT EXISTS `clave_especial` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.clave_especial: ~0 rows (aproximadamente)
DELETE FROM `clave_especial`;
/*!40000 ALTER TABLE `clave_especial` DISABLE KEYS */;
INSERT INTO `clave_especial` (`id`, `nombre`) VALUES
	(1, '1234');
/*!40000 ALTER TABLE `clave_especial` ENABLE KEYS */;

-- Volcando estructura para tabla administra.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `nombre_comercial` varchar(250) DEFAULT NULL,
  `cedula` varchar(50) NOT NULL,
  `fecha_at` datetime DEFAULT NULL,
  `fecha_in` datetime DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `tipo_estatus_id` int(11) NOT NULL,
  `telefono1` varchar(20) NOT NULL,
  `telefono2` varchar(20) DEFAULT NULL,
  `telefono3` varchar(50) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `direccion_fisica` varchar(200) DEFAULT NULL,
  `horario` varchar(200) DEFAULT NULL,
  `descuento` decimal(12,2) DEFAULT '0.00',
  `grupo_cliente_id` int(11) NOT NULL DEFAULT '1',
  `limite_credito` int(11) DEFAULT NULL,
  `tarifa` varchar(2) DEFAULT NULL,
  `contribuyente` varchar(3) DEFAULT NULL,
  `cobrador_id` int(11) DEFAULT NULL,
  `vendedor_id` int(11) DEFAULT NULL,
  `zonas_id` int(11) DEFAULT NULL,
  `correo_electronico` varchar(250) DEFAULT NULL,
  `correo_electronico2` varchar(250) DEFAULT NULL,
  `pag_web` varchar(250) DEFAULT NULL,
  `dias_credito` int(11) DEFAULT NULL,
  `creditos` decimal(12,2) DEFAULT NULL,
  `contacto` varchar(50) DEFAULT NULL,
  `telefono_contacto` varchar(20) DEFAULT NULL,
  `observacion` text,
  `estado_id` int(11) NOT NULL DEFAULT '16',
  `ciudad_id` int(11) NOT NULL DEFAULT '331',
  `empleado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.clientes: ~0 rows (aproximadamente)
DELETE FROM `clientes`;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`id`, `nombre`, `nombre_comercial`, `cedula`, `fecha_at`, `fecha_in`, `fecha_nac`, `sexo`, `tipo_estatus_id`, `telefono1`, `telefono2`, `telefono3`, `direccion`, `direccion_fisica`, `horario`, `descuento`, `grupo_cliente_id`, `limite_credito`, `tarifa`, `contribuyente`, `cobrador_id`, `vendedor_id`, `zonas_id`, `correo_electronico`, `correo_electronico2`, `pag_web`, `dias_credito`, `creditos`, `contacto`, `telefono_contacto`, `observacion`, `estado_id`, `ciudad_id`, `empleado`) VALUES
	(1, 'CONTADO', 'CONTADO', 'V-00000000', '2019-07-03 10:24:28', '2019-07-18 14:44:56', '2000-01-01', 'M', 1, '00000000000000000000', NULL, NULL, 'LA ASUNCIO', NULL, NULL, 0.00, 1, NULL, 'A', 'SI', NULL, NULL, NULL, 'contado@contado.com', NULL, NULL, NULL, NULL, 'CONTACTO', '00000000000', NULL, 16, 331, 1);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando estructura para tabla administra.cobrador
CREATE TABLE IF NOT EXISTS `cobrador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.cobrador: ~0 rows (aproximadamente)
DELETE FROM `cobrador`;
/*!40000 ALTER TABLE `cobrador` DISABLE KEYS */;
INSERT INTO `cobrador` (`id`, `nombre`) VALUES
	(1, 'UNICO');
/*!40000 ALTER TABLE `cobrador` ENABLE KEYS */;

-- Volcando estructura para tabla administra.cobranza
CREATE TABLE IF NOT EXISTS `cobranza` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` date NOT NULL,
  `documento` int(11) NOT NULL,
  `tipo` varchar(10) CHARACTER SET utf8 NOT NULL,
  `clientes_id` int(11) NOT NULL,
  `monto_documento` decimal(16,2) NOT NULL,
  `saldo_deudor` decimal(16,2) NOT NULL,
  `pago` decimal(16,2) NOT NULL,
  `descuento` decimal(16,2) NOT NULL,
  `retencion` decimal(16,2) NOT NULL,
  `devuelto` tinyint(1) DEFAULT NULL,
  `contabilizado` tinyint(1) DEFAULT NULL,
  `revisado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.cobranza: ~0 rows (aproximadamente)
DELETE FROM `cobranza`;
/*!40000 ALTER TABLE `cobranza` DISABLE KEYS */;
/*!40000 ALTER TABLE `cobranza` ENABLE KEYS */;

-- Volcando estructura para tabla administra.conceptos
CREATE TABLE IF NOT EXISTS `conceptos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL DEFAULT '1',
  `codigo` varchar(255) DEFAULT NULL,
  `referencia` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` mediumtext,
  `talla` varchar(11) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  `serial_estatico` tinyint(1) DEFAULT NULL,
  `serial_dinamico` tinyint(1) DEFAULT NULL,
  `existencia_minima` decimal(12,3) DEFAULT NULL,
  `existencia_maxima` decimal(12,3) DEFAULT NULL,
  `tipos_conceptos_id` int(11) NOT NULL DEFAULT '0',
  `ubicacion_id` int(11) DEFAULT '0',
  `costo` int(11) DEFAULT NULL COMMENT 'costo de reposicion',
  `ultimo_costo` decimal(12,2) DEFAULT NULL,
  `costo_mayor` decimal(12,2) DEFAULT NULL,
  `costo_promedio` decimal(12,2) DEFAULT NULL,
  `fecha_at` date DEFAULT NULL,
  `fecha_in` date DEFAULT NULL,
  `fecha_uc` date NOT NULL COMMENT 'fecha de la ultima compra',
  `grupos_id` int(11) DEFAULT '0',
  `subgrupos_id` int(11) DEFAULT '0',
  `presentacion` decimal(10,2) DEFAULT NULL,
  `unidades_id` int(11) DEFAULT '0',
  `fecha_hora` int(11) DEFAULT '0',
  `marcas_id` int(11) DEFAULT '0',
  `estado` tinyint(1) DEFAULT '0',
  `pvp` decimal(12,2) DEFAULT NULL,
  `precio_a` decimal(12,2) NOT NULL,
  `precio_b` decimal(12,2) DEFAULT NULL,
  `precio_c` decimal(12,2) DEFAULT NULL,
  `precio_dolar` decimal(12,2) NOT NULL DEFAULT '1.00',
  `utilidad` decimal(10,2) DEFAULT NULL,
  `utilidad_a` decimal(12,2) DEFAULT NULL,
  `utilidad_b` decimal(12,2) DEFAULT NULL,
  `utilidad_c` decimal(12,2) DEFAULT NULL,
  `utilidad_dolar` decimal(12,0) NOT NULL DEFAULT '1',
  `costo_dolar` decimal(12,2) NOT NULL DEFAULT '1.00',
  `precio_variable` smallint(6) DEFAULT '0',
  `retiene` tinyint(1) NOT NULL DEFAULT '0',
  `farm_principio_activo_id` int(11) DEFAULT '0',
  `imagen` varchar(255) DEFAULT 'default.png',
  `costo_adicional` decimal(12,2) DEFAULT NULL,
  `costo_adicional2` decimal(12,2) DEFAULT NULL,
  `cant_ensamblado` decimal(12,2) DEFAULT NULL,
  `licor` tinyint(1) DEFAULT '0',
  `porcentaje` decimal(4,2) DEFAULT NULL,
  `visible_pv` tinyint(1) DEFAULT '1',
  `visible_web` tinyint(1) DEFAULT '0',
  `rest_areas_id` int(11) DEFAULT NULL,
  `setcortesia` tinyint(1) DEFAULT '0',
  `exento` tinyint(1) DEFAULT '0',
  `merma` tinyint(1) DEFAULT '0',
  `existencia_c` decimal(12,3) DEFAULT NULL,
  `obviar_ajuste` tinyint(1) DEFAULT '0',
  `iva` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  UNIQUE KEY `referencia` (`referencia`),
  KEY `tipos_productos_id` (`tipos_conceptos_id`),
  KEY `ubicacion_id` (`ubicacion_id`),
  KEY `tipos_productos_id_2` (`tipos_conceptos_id`,`ubicacion_id`,`grupos_id`,`subgrupos_id`,`unidades_id`,`marcas_id`),
  KEY `productos_ibfk_5` (`grupos_id`),
  KEY `productos_ibfk_6` (`unidades_id`),
  KEY `productos_ibfk_7` (`marcas_id`),
  KEY `empresa_id` (`empresa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='Productos del Sistema';

-- Volcando datos para la tabla administra.conceptos: ~5 rows (aproximadamente)
DELETE FROM `conceptos`;
/*!40000 ALTER TABLE `conceptos` DISABLE KEYS */;
INSERT INTO `conceptos` (`id`, `empresa_id`, `codigo`, `referencia`, `nombre`, `descripcion`, `talla`, `color`, `descuento`, `serial_estatico`, `serial_dinamico`, `existencia_minima`, `existencia_maxima`, `tipos_conceptos_id`, `ubicacion_id`, `costo`, `ultimo_costo`, `costo_mayor`, `costo_promedio`, `fecha_at`, `fecha_in`, `fecha_uc`, `grupos_id`, `subgrupos_id`, `presentacion`, `unidades_id`, `fecha_hora`, `marcas_id`, `estado`, `pvp`, `precio_a`, `precio_b`, `precio_c`, `precio_dolar`, `utilidad`, `utilidad_a`, `utilidad_b`, `utilidad_c`, `utilidad_dolar`, `costo_dolar`, `precio_variable`, `retiene`, `farm_principio_activo_id`, `imagen`, `costo_adicional`, `costo_adicional2`, `cant_ensamblado`, `licor`, `porcentaje`, `visible_pv`, `visible_web`, `rest_areas_id`, `setcortesia`, `exento`, `merma`, `existencia_c`, `obviar_ajuste`, `iva`) VALUES
	(1, 1, '04010150541', 'C001', 'CARNE DE RES DE PRIMERA', 'Carne de res de primera por kilo', NULL, NULL, NULL, 0, 0, 20.000, 500.000, 2, 1, NULL, 69500.00, 68000.00, 68000.00, '2019-07-11', '2019-08-13', '2019-08-12', 3, 5, NULL, 3, NULL, NULL, 1, NULL, 79925.00, 69500.00, 69500.00, 5.75, NULL, 17.54, 2.21, 2.21, 15, 5.00, 0, 0, NULL, 'res.jpg', 0.00, 0.00, 0.00, 0, NULL, 1, NULL, NULL, 0, NULL, 1, NULL, 1, 1),
	(3, 1, '27323221122', 'C003', 'PESCADO FRESCO', 'Pescado Fresco de tipo small por kg', NULL, NULL, NULL, 0, 0, 30.000, 400.000, 2, 1, NULL, 26400.00, 14960.00, 14960.00, '2019-07-15', '2019-08-13', '2019-08-12', 3, 6, NULL, 3, NULL, NULL, 1, NULL, 29550.00, 30182.37, 30182.37, 1.97, NULL, 20.79, 23.37, 23.37, 12, 1.76, 0, 0, NULL, 'pescado.jpg', 0.00, 0.00, 0.00, 0, NULL, 1, NULL, 1, 0, NULL, 0, NULL, 0, 0),
	(4, 1, '355214235135', 'C004', 'CARNE MOLIDA', 'Carne Molida de Primera por kilo', NULL, NULL, NULL, 0, 0, 50.000, 500.000, 2, 1, NULL, 66150.00, 60000.00, 60000.00, '2019-07-15', '2019-08-13', '2019-08-12', 3, 5, NULL, 3, NULL, NULL, 1, NULL, 75450.00, 76415.76, 76415.76, 5.03, NULL, 23.09, 24.66, 24.66, 14, 4.41, 0, 0, NULL, 'carnemolida.jpg', 0.00, 0.00, 0.00, 0, NULL, 1, NULL, NULL, 0, NULL, 0, NULL, 0, 0),
	(5, 1, '3573676423', 'E001', 'CHORIZO POR BULTO', 'Chorizo Carupanero por bulto', NULL, NULL, NULL, 0, 0, 40.000, 200.000, 2, 1, NULL, 110250.00, 62475.00, 62475.00, '2019-07-15', '2019-08-13', '2019-08-12', 4, NULL, NULL, 1, NULL, NULL, 1, NULL, 123450.00, 162818.21, 162818.21, 8.23, NULL, 20.83, 59.37, 59.37, 12, 7.35, 0, 0, NULL, 'chorizo.jpg', 0.00, 0.00, 0.00, 0, NULL, 1, NULL, NULL, 0, NULL, 0, NULL, 0, 0),
	(6, 1, 'FGHFH', 'dsgeth', 'ENSAMBLADO PRUEBA', 'fgrwghsdf GH', NULL, NULL, NULL, 0, 0, NULL, NULL, 5, 1, NULL, 158400.00, 143616.00, 143616.00, '2019-08-12', '2019-08-13', '2019-08-12', 11, NULL, NULL, 1, NULL, NULL, 1, NULL, 190050.00, 158400.00, 158400.00, 12.67, NULL, 29.48, 7.91, 7.91, 20, 10.56, 0, 0, NULL, 'default.png', 0.00, 0.00, 1.00, 0, NULL, 1, NULL, NULL, 0, NULL, 0, NULL, 0, 0),
	(7, 1, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', 0, 0, NULL, 0, 0, 0, 0, NULL, 0.00, NULL, NULL, 1.00, NULL, NULL, NULL, NULL, 1, 1.00, 0, 0, 0, 'default.png', NULL, NULL, NULL, 0, NULL, 1, 0, NULL, 0, 0, 0, NULL, 0, 0);
/*!40000 ALTER TABLE `conceptos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.correlativos
CREATE TABLE IF NOT EXISTS `correlativos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `factura` int(11) NOT NULL,
  `devolucion` int(11) NOT NULL,
  `nota_credito` int(11) NOT NULL,
  `nota_debito` int(11) NOT NULL,
  `comprobante_riva` int(9) NOT NULL DEFAULT '0',
  `factura_manual` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.correlativos: ~0 rows (aproximadamente)
DELETE FROM `correlativos`;
/*!40000 ALTER TABLE `correlativos` DISABLE KEYS */;
INSERT INTO `correlativos` (`id`, `factura`, `devolucion`, `nota_credito`, `nota_debito`, `comprobante_riva`, `factura_manual`) VALUES
	(1, 13, 0, 2, 0, 0, 1);
/*!40000 ALTER TABLE `correlativos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.correos
CREATE TABLE IF NOT EXISTS `correos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `correo_envios` varchar(50) DEFAULT NULL,
  `password_envios` varchar(50) DEFAULT NULL,
  `name_envios` varchar(50) DEFAULT NULL,
  `destino` varchar(50) DEFAULT NULL,
  `destino2` varchar(50) DEFAULT NULL,
  `destino3` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.correos: ~0 rows (aproximadamente)
DELETE FROM `correos`;
/*!40000 ALTER TABLE `correos` DISABLE KEYS */;
INSERT INTO `correos` (`id`, `empresa_id`, `correo_envios`, `password_envios`, `name_envios`, `destino`, `destino2`, `destino3`) VALUES
	(1, 1, 'soporte@somossistemas.com', '*01mseguridad*02', 'Servicio Tecnico - Somos Sistemas, C.A', 'm.fierro@somossistemas.com', 'j.bellorin@somossistemas.com', NULL);
/*!40000 ALTER TABLE `correos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.departamentos
CREATE TABLE IF NOT EXISTS `departamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `niveles_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla administra.departamentos: ~3 rows (aproximadamente)
DELETE FROM `departamentos`;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` (`id`, `nombre`, `descripcion`, `niveles_id`) VALUES
	(1, 'Administracion', NULL, 1),
	(2, 'Soporte', NULL, 2),
	(3, 'Desarrollo', NULL, 3);
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.depositos
CREATE TABLE IF NOT EXISTS `depositos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL DEFAULT '1',
  `nombre` varchar(255) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `empresa_id` (`empresa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.depositos: ~4 rows (aproximadamente)
DELETE FROM `depositos`;
/*!40000 ALTER TABLE `depositos` DISABLE KEYS */;
INSERT INTO `depositos` (`id`, `empresa_id`, `nombre`, `usuario_id`) VALUES
	(1, 1, 'DEPOSITO 1', 0),
	(2, 1, 'DEPOSITO TRANSITO', 0),
	(3, 1, 'DEPOSITO 2', 0),
	(4, 1, 'Deposito 3', 0);
/*!40000 ALTER TABLE `depositos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_abonos
CREATE TABLE IF NOT EXISTS `det_abonos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `abonos_id` int(11) NOT NULL,
  `fecha_at` date DEFAULT NULL,
  `documento` int(11) NOT NULL,
  `tipo` varchar(10) CHARACTER SET utf8 NOT NULL,
  `monto_utilizado` decimal(12,2) NOT NULL,
  `monto_utilizado_dolar` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `abonos_id` (`abonos_id`),
  CONSTRAINT `det_abonos_ibfk_1` FOREIGN KEY (`abonos_id`) REFERENCES `abonos` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_abonos: ~0 rows (aproximadamente)
DELETE FROM `det_abonos`;
/*!40000 ALTER TABLE `det_abonos` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_abonos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_ajuste_inventario
CREATE TABLE IF NOT EXISTS `det_ajuste_inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_ajuste_inventario_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `existencia` decimal(12,3) NOT NULL,
  `toma_fisico` decimal(12,3) NOT NULL,
  `ajuste` decimal(12,3) NOT NULL,
  `costo` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enc_ajuste_inventario_id` (`enc_ajuste_inventario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_ajuste_inventario: ~0 rows (aproximadamente)
DELETE FROM `det_ajuste_inventario`;
/*!40000 ALTER TABLE `det_ajuste_inventario` DISABLE KEYS */;
INSERT INTO `det_ajuste_inventario` (`id`, `enc_ajuste_inventario_id`, `conceptos_id`, `depositos_id`, `existencia`, `toma_fisico`, `ajuste`, `costo`) VALUES
	(1, 1, 2, 1, 12.000, 5.000, -7.000, 25000.00);
/*!40000 ALTER TABLE `det_ajuste_inventario` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_ajuste_precios
CREATE TABLE IF NOT EXISTS `det_ajuste_precios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_ajuste_precios_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `ultimo_costo` decimal(12,3) NOT NULL,
  `precio_a` decimal(12,3) NOT NULL,
  `precio_b` decimal(12,3) DEFAULT NULL,
  `precio_c` decimal(12,3) DEFAULT NULL,
  `new_precio_a` decimal(12,3) DEFAULT NULL,
  `new_precio_b` decimal(12,3) DEFAULT NULL,
  `new_precio_c` decimal(12,3) DEFAULT NULL,
  `utilidad_a` decimal(12,3) DEFAULT NULL,
  `utilidad_b` decimal(12,3) DEFAULT NULL,
  `utilidad_c` decimal(12,3) DEFAULT NULL,
  `new_utilidad_a` decimal(12,3) DEFAULT NULL,
  `new_utilidad_b` decimal(12,3) DEFAULT NULL,
  `new_utilidad_c` decimal(12,3) DEFAULT NULL,
  `aumento_bs` decimal(12,3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.det_ajuste_precios: ~28 rows (aproximadamente)
DELETE FROM `det_ajuste_precios`;
/*!40000 ALTER TABLE `det_ajuste_precios` DISABLE KEYS */;
INSERT INTO `det_ajuste_precios` (`id`, `enc_ajuste_precios_id`, `conceptos_id`, `ultimo_costo`, `precio_a`, `precio_b`, `precio_c`, `new_precio_a`, `new_precio_b`, `new_precio_c`, `utilidad_a`, `utilidad_b`, `utilidad_c`, `new_utilidad_a`, `new_utilidad_b`, `new_utilidad_c`, `aumento_bs`) VALUES
	(1, 1, 1, 50578.660, 41400.000, 0.000, 0.000, 58093.890, 58093.890, 58093.890, 15.000, NULL, NULL, 14.858, 14.858, 14.858, 11928.930),
	(2, 1, 2, 50578.660, 37000.000, 0.000, 0.000, 47715.720, 47715.720, 47715.720, 15.000, NULL, NULL, -5.660, -5.660, -5.660, 11928.930),
	(3, 1, 3, 20994.920, 16755.200, 0.000, 0.000, 23499.990, 23499.990, 23499.990, 12.000, NULL, NULL, 11.932, 11.932, 11.932, 11928.930),
	(4, 1, 4, 47715.720, 38080.000, 0.000, 0.000, 53441.610, 53441.610, 53441.610, 12.000, NULL, NULL, 12.000, 12.000, 12.000, 11928.930),
	(5, 1, 5, 87677.640, 69955.000, 0.000, 0.000, 98175.090, 98175.090, 98175.090, 11.970, NULL, NULL, 11.973, 11.973, 11.973, 11928.930),
	(6, 2, 1, 63600.000, 58093.890, 58093.890, 58093.890, 73050.000, 73050.000, 73050.000, 14.860, 14.860, 14.860, 14.858, 14.858, 14.858, 15000.000),
	(7, 2, 2, 60000.000, 64232.330, 49771.480, 49771.480, 73050.000, 56604.000, 73050.000, 21.750, 5.660, 5.660, 21.750, -5.660, 21.750, 15000.000),
	(8, 2, 3, 26400.000, 23499.990, 23499.990, 23499.990, 29550.000, 29550.000, 29550.000, 11.930, 11.930, 11.930, 11.932, 11.932, 11.932, 15000.000),
	(9, 2, 4, 60000.000, 53441.610, 53441.610, 53441.610, 67200.000, 67200.000, 67200.000, 12.000, 12.000, 12.000, 12.000, 12.000, 12.000, 15000.000),
	(10, 2, 5, 110250.000, 98175.090, 98175.090, 98175.090, 123450.000, 123450.000, 123450.000, 11.970, 11.970, 11.970, 11.973, 11.973, 11.973, 15000.000),
	(11, 3, 1, 57664.000, 73050.000, 73050.000, 73050.000, 66232.000, 66232.000, 66232.000, 14.860, 14.860, 14.860, 14.858, 14.858, 14.858, 13600.000),
	(12, 3, 2, 54400.000, 73050.000, 56604.000, 73050.000, 66232.000, 57479.040, 66232.000, 21.750, 5.660, 21.750, 21.750, 5.660, 21.750, 13600.000),
	(13, 3, 3, 23936.000, 29550.000, 29550.000, 29550.000, 26792.000, 26792.000, 26792.000, 11.930, 11.930, 11.930, 11.932, 11.932, 11.932, 13600.000),
	(14, 3, 4, 54400.000, 67200.000, 67200.000, 67200.000, 60928.000, 60928.000, 60928.000, 12.000, 12.000, 12.000, 12.000, 12.000, 12.000, 13600.000),
	(15, 3, 5, 99960.000, 123450.000, 123450.000, 123450.000, 111928.000, 111928.000, 111928.000, 11.970, 11.970, 11.970, 11.973, 11.973, 11.973, 13600.000),
	(16, 4, 1, 68000.000, 78104.800, 78104.800, 78104.800, 79925.000, 69500.000, 69500.000, 14.860, 14.860, 14.860, 17.537, 2.206, 2.206, 13900.000),
	(17, 4, 2, 60000.000, 66234.000, 57480.000, 66234.000, 67693.000, 70536.106, 55600.000, 10.390, 4.200, 10.390, 12.822, 17.560, -7.333, 13900.000),
	(18, 4, 3, 25000.000, 26792.500, 26792.500, 26792.500, 27383.000, 24464.000, 24464.000, 7.170, 7.170, 7.170, 9.532, -2.144, -2.144, 13900.000),
	(19, 4, 4, 80000.000, 78168.000, 69632.000, 69632.000, 69917.000, 78978.243, 78978.243, 2.290, 12.960, 12.960, -12.604, -1.277, -1.277, 13900.000),
	(20, 4, 5, 150000.000, 111930.000, 111930.000, 111930.000, 114397.000, 102165.000, 102165.000, 25.380, 25.380, 25.380, -23.735, -31.890, -31.890, 13900.000),
	(21, 4, 6, 143616.000, 172312.000, 145052.160, 143616.000, 176113.000, 176113.000, 176113.000, 19.980, NULL, NULL, 22.628, 22.628, 22.628, 13900.000),
	(22, 4, 7, 40000.000, 33000.000, 20000.000, 20000.000, 33777.000, 50665.500, 50665.500, 17.500, 50.000, 50.000, -15.558, 26.664, 26.664, 13900.000),
	(23, 5, 2, 55600.000, 67693.000, 70536.110, 55600.000, 73050.000, 60222.420, 78404.565, 12.820, 17.560, 7.330, 31.385, 8.314, 41.015, 15000.000),
	(24, 5, 3, 24464.000, 27383.000, 24464.000, 24464.000, 29550.000, 30182.370, 30182.370, 9.530, 2.140, 2.140, 20.790, 23.375, 23.375, 15000.000),
	(25, 5, 4, 61299.000, 69917.000, 78978.240, 78978.240, 75450.000, 76415.760, 76415.760, 12.600, 1.280, 1.280, 23.085, 24.661, 24.661, 15000.000),
	(26, 5, 5, 102165.000, 114397.000, 102165.000, 102165.000, 123450.000, 162818.205, 162818.205, 23.740, 31.890, 31.890, 20.834, 59.368, 59.368, 15000.000),
	(27, 5, 6, 146784.000, 176113.000, 176113.000, 176113.000, 190050.000, 158400.000, 158400.000, 22.630, 22.630, 22.630, 29.476, 7.914, 7.914, 15000.000),
	(28, 5, 7, 20433.000, 33777.000, 50665.500, 50665.500, 36450.000, 26732.430, 26732.430, 15.560, 26.660, 26.660, 78.388, 30.830, 30.830, 15000.000);
/*!40000 ALTER TABLE `det_ajuste_precios` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_aumento
CREATE TABLE IF NOT EXISTS `det_aumento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_aumento_id` int(11) NOT NULL,
  `personal_id` int(11) NOT NULL,
  `sueldo_anterior` decimal(12,2) NOT NULL,
  `aumento` decimal(12,2) NOT NULL,
  `sueldo_nuevo` decimal(12,2) NOT NULL,
  `fecha_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.det_aumento: ~0 rows (aproximadamente)
DELETE FROM `det_aumento`;
/*!40000 ALTER TABLE `det_aumento` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_aumento` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_chequeras
CREATE TABLE IF NOT EXISTS `det_chequeras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_chequeras_id` int(11) NOT NULL,
  `num_cheque` int(8) unsigned zerofill NOT NULL,
  `estatus_cheque_id` int(11) NOT NULL,
  `comentario` varchar(100) DEFAULT NULL COMMENT 'En caso de anulacion',
  `fecha_in` date DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_det_chequeras_enc_chequeras` (`enc_chequeras_id`),
  CONSTRAINT `FK_det_chequeras_enc_chequeras` FOREIGN KEY (`enc_chequeras_id`) REFERENCES `enc_chequeras` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.det_chequeras: ~0 rows (aproximadamente)
DELETE FROM `det_chequeras`;
/*!40000 ALTER TABLE `det_chequeras` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_chequeras` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_compra
CREATE TABLE IF NOT EXISTS `det_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_compra_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `costo` decimal(18,2) NOT NULL,
  `descuento` decimal(18,2) NOT NULL,
  `cantidad` decimal(18,2) NOT NULL,
  `iva` decimal(18,2) NOT NULL,
  `serial_inicial` varchar(50) DEFAULT NULL,
  `serial_final` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_compra: ~9 rows (aproximadamente)
DELETE FROM `det_compra`;
/*!40000 ALTER TABLE `det_compra` DISABLE KEYS */;
INSERT INTO `det_compra` (`id`, `enc_compra_id`, `depositos_id`, `conceptos_id`, `costo`, `descuento`, `cantidad`, `iva`, `serial_inicial`, `serial_final`) VALUES
	(1, 1, 1, 1, 57664.00, 0.00, 1.00, 0.00, NULL, NULL),
	(2, 1, 1, 4, 60000.00, 0.00, 1.00, 0.00, NULL, NULL),
	(3, 2, 1, 4, 70000.00, 0.00, 1.00, 0.00, NULL, NULL),
	(4, 3, 1, 3, 25000.00, 0.00, 1.00, 0.00, NULL, NULL),
	(5, 4, 1, 2, 60000.00, 0.00, 1.00, 0.00, NULL, NULL),
	(6, 5, 1, 5, 150000.00, 0.00, 1.00, 0.00, NULL, NULL),
	(7, 6, 1, 7, 30000.00, 0.00, 40.00, 0.00, NULL, NULL),
	(8, 7, 1, 7, 40000.00, 0.00, 1.00, 0.00, NULL, NULL),
	(9, 8, 1, 4, 80000.00, 0.00, 1.00, 0.00, NULL, NULL);
/*!40000 ALTER TABLE `det_compra` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_conceptos
CREATE TABLE IF NOT EXISTS `det_conceptos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conceptos_id` int(11) NOT NULL,
  `ingrediente` int(11) NOT NULL,
  `unidades_id` int(11) NOT NULL,
  `cantidad` decimal(12,5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Conceptos asociados a los de tipo compuesto';

-- Volcando datos para la tabla administra.det_conceptos: ~3 rows (aproximadamente)
DELETE FROM `det_conceptos`;
/*!40000 ALTER TABLE `det_conceptos` DISABLE KEYS */;
INSERT INTO `det_conceptos` (`id`, `conceptos_id`, `ingrediente`, `unidades_id`, `cantidad`) VALUES
	(1, 6, 3, 3, 0.50000),
	(2, 6, 1, 3, 2.00000),
	(3, 6, 4, 3, 0.30000);
/*!40000 ALTER TABLE `det_conceptos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_concepto_procesado
CREATE TABLE IF NOT EXISTS `det_concepto_procesado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_concepto_procesado_id` int(11) NOT NULL DEFAULT '0',
  `det_compra_id` int(11) NOT NULL DEFAULT '0',
  `conceptos_id` int(11) NOT NULL DEFAULT '0',
  `porcentaje_merma` decimal(10,3) NOT NULL DEFAULT '0.000',
  `cantidad_merma` decimal(10,3) NOT NULL DEFAULT '0.000',
  `cantidad_util` decimal(10,3) NOT NULL DEFAULT '0.000',
  `costo_compra` decimal(10,3) NOT NULL DEFAULT '0.000',
  `cantidad_compra` decimal(10,3) NOT NULL DEFAULT '0.000',
  `costo_procesado` decimal(10,3) NOT NULL DEFAULT '0.000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.det_concepto_procesado: ~0 rows (aproximadamente)
DELETE FROM `det_concepto_procesado`;
/*!40000 ALTER TABLE `det_concepto_procesado` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_concepto_procesado` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_descargos
CREATE TABLE IF NOT EXISTS `det_descargos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_descargos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `existencia` decimal(12,3) NOT NULL,
  `descargo` decimal(12,3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.det_descargos: ~0 rows (aproximadamente)
DELETE FROM `det_descargos`;
/*!40000 ALTER TABLE `det_descargos` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_descargos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_despacho
CREATE TABLE IF NOT EXISTS `det_despacho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_despacho_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `por_entregar` int(11) NOT NULL,
  `entrega` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `enc_despacho_id` (`enc_despacho_id`),
  CONSTRAINT `det_despacho_ibfk_1` FOREIGN KEY (`enc_despacho_id`) REFERENCES `enc_despacho` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_despacho: ~2 rows (aproximadamente)
DELETE FROM `det_despacho`;
/*!40000 ALTER TABLE `det_despacho` DISABLE KEYS */;
INSERT INTO `det_despacho` (`id`, `enc_despacho_id`, `conceptos_id`, `cantidad`, `por_entregar`, `entrega`, `depositos_id`) VALUES
	(1, 2, 1, 1.000, 1, 1, 1),
	(2, 2, 3, 1.000, 1, 1, 1);
/*!40000 ALTER TABLE `det_despacho` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_ensamblado
CREATE TABLE IF NOT EXISTS `det_ensamblado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_ensamblado_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `costo_unitario` decimal(12,2) NOT NULL,
  `total` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_ensamblado: ~0 rows (aproximadamente)
DELETE FROM `det_ensamblado`;
/*!40000 ALTER TABLE `det_ensamblado` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_ensamblado` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_facturas
CREATE TABLE IF NOT EXISTS `det_facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_facturas_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `costo` decimal(18,2) NOT NULL,
  `costo_dolar` decimal(18,2) NOT NULL,
  `precio` decimal(18,2) NOT NULL,
  `precio_dolar` decimal(18,2) NOT NULL,
  `descuentopro` decimal(18,2) DEFAULT NULL,
  `fecha_at` date DEFAULT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `despachado` int(11) DEFAULT NULL,
  `devuelto` tinyint(4) DEFAULT '0',
  `seriales_id` int(11) DEFAULT '0',
  `monto_documento` decimal(18,2) DEFAULT '0.00',
  `lotes_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `enc_facturas_id` (`enc_facturas_id`),
  KEY `productos_id` (`conceptos_id`),
  KEY `enc_facturas_id_2` (`enc_facturas_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COMMENT='Detalle de las Facturas';

-- Volcando datos para la tabla administra.det_facturas: ~28 rows (aproximadamente)
DELETE FROM `det_facturas`;
/*!40000 ALTER TABLE `det_facturas` DISABLE KEYS */;
INSERT INTO `det_facturas` (`id`, `enc_facturas_id`, `conceptos_id`, `depositos_id`, `vendedor_id`, `costo`, `costo_dolar`, `precio`, `precio_dolar`, `descuentopro`, `fecha_at`, `cantidad`, `despachado`, `devuelto`, `seriales_id`, `monto_documento`, `lotes_id`) VALUES
	(1, 1, 4, 1, 2, 25000.00, 0.00, 37000.00, 0.00, 0.00, '2019-07-18', 1.000, NULL, 0, 0, 0.00, NULL),
	(2, 1, 8, 1, 1, 62475.00, 0.00, 69955.00, 0.00, 0.00, '2019-07-18', 1.000, NULL, 0, 0, 0.00, NULL),
	(3, 2, 2, 1, 1, 25000.00, 4.24, 37000.00, 4.00, 0.00, '2019-07-25', 1.000, NULL, NULL, NULL, 0.00, NULL),
	(4, 3, 1, 1, 1, 36000.00, 0.00, 41400.00, 0.00, 0.00, '2019-07-30', 1.000, 1, 0, 0, 0.00, NULL),
	(5, 3, 3, 1, 1, 14960.00, 0.00, 16755.00, 0.00, 0.00, '2019-07-30', 1.000, 1, 0, 0, 0.00, NULL),
	(6, 4, 1, 1, 1, 36000.00, 0.00, 41400.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(7, 4, 3, 1, 1, 14960.00, 0.00, 16755.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(8, 5, 1, 1, 1, 36000.00, 0.00, 41400.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(9, 5, 3, 1, 1, 14960.00, 0.00, 16755.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(10, 6, 1, 1, 1, 36000.00, 0.00, 41400.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(11, 6, 4, 1, 1, 34000.00, 0.00, 38080.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(12, 7, 4, 1, 1, 34000.00, 0.00, 38080.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(13, 7, 3, 1, 1, 14960.00, 0.00, 16755.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(14, 8, 3, 1, 1, 14960.00, 0.00, 16755.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(15, 8, 5, 1, 1, 62475.00, 0.00, 69955.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(16, 9, 1, 1, 1, 36000.00, 0.00, 41400.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(17, 9, 3, 1, 1, 14960.00, 0.00, 16755.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(18, 10, 1, 1, 1, 36000.00, 0.00, 41400.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(19, 10, 2, 1, 1, 25000.00, 0.00, 37000.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(20, 10, 3, 1, 1, 14960.00, 0.00, 16755.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(21, 11, 1, 1, 1, 36000.00, 0.00, 41400.00, 0.00, 0.00, '2019-07-30', 2.000, NULL, 0, 0, 0.00, NULL),
	(22, 11, 2, 1, 1, 25000.00, 0.00, 37000.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(23, 11, 4, 1, 1, 34000.00, 0.00, 38080.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(24, 12, 1, 1, 1, 50578.00, 0.00, 58093.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(26, 14, 1, 1, 1, 50578.00, 0.00, 58093.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(27, 15, 1, 1, 1, 50578.00, 0.00, 58093.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(28, 16, 1, 1, 1, 50578.00, 0.00, 58093.00, 0.00, 0.00, '2019-07-30', 1.000, NULL, 0, 0, 0.00, NULL),
	(29, 17, 1, 1, 1, 63600.00, 0.00, 73050.00, 0.00, 0.00, '2019-08-07', 1.000, NULL, 0, 0, 0.00, NULL);
/*!40000 ALTER TABLE `det_facturas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_inventario_mensual
CREATE TABLE IF NOT EXISTS `det_inventario_mensual` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_inventario_mensual_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `existencia` decimal(10,3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.det_inventario_mensual: ~6 rows (aproximadamente)
DELETE FROM `det_inventario_mensual`;
/*!40000 ALTER TABLE `det_inventario_mensual` DISABLE KEYS */;
INSERT INTO `det_inventario_mensual` (`id`, `enc_inventario_mensual_id`, `depositos_id`, `conceptos_id`, `existencia`) VALUES
	(1, 8, 1, 1, 0.000),
	(2, 9, 1, 1, 4996.000),
	(3, 9, 1, 2, 39998.000),
	(4, 9, 1, 3, 498.000),
	(5, 9, 1, 4, 19999.000),
	(6, 9, 1, 5, 37669.000);
/*!40000 ALTER TABLE `det_inventario_mensual` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_nota_entrega
CREATE TABLE IF NOT EXISTS `det_nota_entrega` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_nota_entrega_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `precio` decimal(18,2) NOT NULL,
  `cantidad` decimal(18,3) NOT NULL,
  `descuentopro` decimal(18,2) NOT NULL,
  `total` decimal(18,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_nota_entrega` (`enc_nota_entrega_id`),
  KEY `enc_nota_entrega_id` (`enc_nota_entrega_id`),
  CONSTRAINT `det_nota_entrega_ibfk_1` FOREIGN KEY (`enc_nota_entrega_id`) REFERENCES `enc_nota_entrega` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.det_nota_entrega: ~0 rows (aproximadamente)
DELETE FROM `det_nota_entrega`;
/*!40000 ALTER TABLE `det_nota_entrega` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_nota_entrega` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_orden_compra
CREATE TABLE IF NOT EXISTS `det_orden_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_orden_compra_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `costo` decimal(12,2) NOT NULL,
  `descuento` decimal(12,2) NOT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `iva` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `depositos_id` (`depositos_id`),
  KEY `conceptos_id` (`conceptos_id`),
  KEY `enc_orden_compra_id` (`enc_orden_compra_id`),
  CONSTRAINT `det_orden_compra_ibfk_1` FOREIGN KEY (`enc_orden_compra_id`) REFERENCES `enc_orden_compra` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_orden_compra: ~0 rows (aproximadamente)
DELETE FROM `det_orden_compra`;
/*!40000 ALTER TABLE `det_orden_compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_orden_compra` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_presupuesto
CREATE TABLE IF NOT EXISTS `det_presupuesto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_presupuesto_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `costo` decimal(18,2) NOT NULL,
  `costo_dolar` decimal(18,2) DEFAULT NULL,
  `precio` decimal(18,2) NOT NULL,
  `precio_dolar` decimal(18,2) DEFAULT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `descuentopro` decimal(18,2) NOT NULL,
  `total` decimal(18,2) NOT NULL,
  `total_dolar` decimal(18,2) DEFAULT NULL,
  `vendedor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_presupuesto` (`enc_presupuesto_id`),
  CONSTRAINT `fk_presupuesto` FOREIGN KEY (`enc_presupuesto_id`) REFERENCES `enc_presupuesto` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_presupuesto: ~0 rows (aproximadamente)
DELETE FROM `det_presupuesto`;
/*!40000 ALTER TABLE `det_presupuesto` DISABLE KEYS */;
INSERT INTO `det_presupuesto` (`id`, `enc_presupuesto_id`, `depositos_id`, `conceptos_id`, `costo`, `costo_dolar`, `precio`, `precio_dolar`, `cantidad`, `descuentopro`, `total`, `total_dolar`, `vendedor_id`) VALUES
	(1, 1, 1, 3, 14960.00, 1.76, 16755.20, 1.97, 1.000, 0.00, 16755.20, 1.97, 1);
/*!40000 ALTER TABLE `det_presupuesto` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_recepcion
CREATE TABLE IF NOT EXISTS `det_recepcion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_recepcion_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `costo` decimal(18,2) NOT NULL,
  `descuento` decimal(18,2) NOT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `iva` decimal(18,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `enc_recepcion_id` (`enc_recepcion_id`),
  CONSTRAINT `det_recepcion_ibfk_1` FOREIGN KEY (`enc_recepcion_id`) REFERENCES `enc_recepcion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_recepcion: ~0 rows (aproximadamente)
DELETE FROM `det_recepcion`;
/*!40000 ALTER TABLE `det_recepcion` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_recepcion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_requisicion
CREATE TABLE IF NOT EXISTS `det_requisicion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_requisicion_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `solicitado` decimal(18,3) NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `aprobado` decimal(18,3) DEFAULT NULL,
  `nota` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `enc_requisicion` (`enc_requisicion_id`) USING BTREE,
  CONSTRAINT `enc_requisicion` FOREIGN KEY (`enc_requisicion_id`) REFERENCES `enc_requisicion` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.det_requisicion: ~0 rows (aproximadamente)
DELETE FROM `det_requisicion`;
/*!40000 ALTER TABLE `det_requisicion` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_requisicion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_tasas_interes
CREATE TABLE IF NOT EXISTS `det_tasas_interes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_tasas_interes_id` int(11) NOT NULL,
  `mes` varchar(30) NOT NULL,
  `tasa` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.det_tasas_interes: ~24 rows (aproximadamente)
DELETE FROM `det_tasas_interes`;
/*!40000 ALTER TABLE `det_tasas_interes` DISABLE KEYS */;
INSERT INTO `det_tasas_interes` (`id`, `enc_tasas_interes_id`, `mes`, `tasa`) VALUES
	(13, 3, 'Enero', 14.52),
	(14, 3, 'Febrero', 12.36),
	(15, 3, 'Marzo', 12.45),
	(16, 3, 'Abril', 12.01),
	(17, 3, 'Mayo', 12.01),
	(18, 3, 'Junio', 12.03),
	(19, 3, 'Julio', 12.04),
	(20, 3, 'Agosto', 15.30),
	(21, 3, 'Septiembre', 15.10),
	(22, 3, 'Octubre', 12.01),
	(23, 3, 'Noviembre', 14.03),
	(24, 3, 'Diciembre', 15.01),
	(25, 2, 'Enero', 12.00),
	(26, 2, 'Febrero', 12.00),
	(27, 2, 'Marzo', 12.00),
	(28, 2, 'Abril', 12.00),
	(29, 2, 'Mayo', 12.00),
	(30, 2, 'Junio', 12.00),
	(31, 2, 'Julio', 12.00),
	(32, 2, 'Agosto', 15.20),
	(33, 2, 'Septiembre', 12.36),
	(34, 2, 'Octubre', 15.42),
	(35, 2, 'Noviembre', 13.60),
	(36, 2, 'Diciembre', 12.30);
/*!40000 ALTER TABLE `det_tasas_interes` ENABLE KEYS */;

-- Volcando estructura para tabla administra.det_transferencia_deposito
CREATE TABLE IF NOT EXISTS `det_transferencia_deposito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_transferencia_deposito_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `deposito_desde` int(11) NOT NULL,
  `deposito_hasta` int(11) NOT NULL,
  `existencia_desde` decimal(12,3) DEFAULT '0.000',
  `existencia_hasta` decimal(12,3) DEFAULT '0.000',
  `cantidad` decimal(12,3) DEFAULT '0.000',
  `costo` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.det_transferencia_deposito: ~0 rows (aproximadamente)
DELETE FROM `det_transferencia_deposito`;
/*!40000 ALTER TABLE `det_transferencia_deposito` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_transferencia_deposito` ENABLE KEYS */;

-- Volcando estructura para tabla administra.empresa
CREATE TABLE IF NOT EXISTS `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rif` varchar(20) NOT NULL,
  `razon_social` varchar(255) NOT NULL,
  `nombre_comercial` varchar(255) NOT NULL,
  `fecha_registro` date NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `telefono1` varchar(20) NOT NULL,
  `telefono2` varchar(20) NOT NULL,
  `telefono3` varchar(20) DEFAULT NULL,
  `pag_web` varchar(200) NOT NULL,
  `correo_electronico` varchar(200) NOT NULL,
  `correo_electronico2` varchar(200) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `firma_digital` varchar(200) DEFAULT NULL,
  `tipo_imagen` varchar(30) DEFAULT NULL,
  `licencia_licores` tinyint(1) NOT NULL DEFAULT '0',
  `nota` text NOT NULL COMMENT 'para presupuestos',
  `marca_agua` varchar(200) DEFAULT NULL COMMENT 'para presupuestos',
  `tipo_calculo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=Financiera, 1=Matematica',
  `contribuyente_especial` tinyint(4) DEFAULT '0',
  `nota2` text,
  `color_presupuesto` varchar(50) NOT NULL DEFAULT '#b9c9fe',
  `img_barcode` varchar(200) DEFAULT NULL,
  `modelo` tinyint(4) DEFAULT NULL,
  `serial_disk` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.empresa: ~0 rows (aproximadamente)
DELETE FROM `empresa`;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` (`id`, `rif`, `razon_social`, `nombre_comercial`, `fecha_registro`, `direccion`, `telefono1`, `telefono2`, `telefono3`, `pag_web`, `correo_electronico`, `correo_electronico2`, `twitter`, `facebook`, `instagram`, `logo`, `firma_digital`, `tipo_imagen`, `licencia_licores`, `nota`, `marca_agua`, `tipo_calculo`, `contribuyente_especial`, `nota2`, `color_presupuesto`, `img_barcode`, `modelo`, `serial_disk`) VALUES
	(1, 'J0000', 'EMPRESA DEMO', 'EMPRESA DEMO', '2019-02-22', 'PORLAMAR', '04265969440', '', NULL, '', '', NULL, NULL, NULL, NULL, 'logo.jpg', NULL, NULL, 0, '', NULL, 1, 0, '', '#229954', NULL, 4, '      E2034233CRLE6S');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_ajuste_inventario
CREATE TABLE IF NOT EXISTS `enc_ajuste_inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` datetime DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.enc_ajuste_inventario: ~0 rows (aproximadamente)
DELETE FROM `enc_ajuste_inventario`;
/*!40000 ALTER TABLE `enc_ajuste_inventario` DISABLE KEYS */;
INSERT INTO `enc_ajuste_inventario` (`id`, `fecha_at`, `descripcion`, `usuario_id`) VALUES
	(1, '2019-07-19 14:09:37', NULL, 2);
/*!40000 ALTER TABLE `enc_ajuste_inventario` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_ajuste_precios
CREATE TABLE IF NOT EXISTS `enc_ajuste_precios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_ajuste_precios_id` int(11) NOT NULL,
  `tipo_calculo` int(11) NOT NULL COMMENT '1=monto, 2=porcentaje',
  `observacion` varchar(255) DEFAULT NULL,
  `usuario_id` varchar(255) DEFAULT NULL,
  `fecha_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.enc_ajuste_precios: ~5 rows (aproximadamente)
DELETE FROM `enc_ajuste_precios`;
/*!40000 ALTER TABLE `enc_ajuste_precios` DISABLE KEYS */;
INSERT INTO `enc_ajuste_precios` (`id`, `tipo_ajuste_precios_id`, `tipo_calculo`, `observacion`, `usuario_id`, `fecha_at`) VALUES
	(1, 1, 3, NULL, '2', '2019-07-30 12:49:42'),
	(2, 1, 3, NULL, '2', '2019-08-06 15:37:44'),
	(3, 1, 3, NULL, '2', '2019-08-09 16:15:02'),
	(4, 1, 3, 'Ajuste realizado al cambiar la tasa.', '2', '2019-08-13 13:55:08'),
	(5, 1, 3, 'Ajuste realizado al cambiar la tasa.', '2', '2019-08-13 13:57:24');
/*!40000 ALTER TABLE `enc_ajuste_precios` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_aumento
CREATE TABLE IF NOT EXISTS `enc_aumento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` datetime DEFAULT NULL,
  `tipo_aumento_id` int(11) NOT NULL,
  `tipo_empleado_id` int(11) NOT NULL,
  `niveles_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.enc_aumento: ~0 rows (aproximadamente)
DELETE FROM `enc_aumento`;
/*!40000 ALTER TABLE `enc_aumento` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_aumento` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_chequeras
CREATE TABLE IF NOT EXISTS `enc_chequeras` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL DEFAULT '0',
  `cant_cheques` int(11) NOT NULL DEFAULT '0',
  `banco_id` int(11) NOT NULL DEFAULT '0',
  `fecha_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.enc_chequeras: ~0 rows (aproximadamente)
DELETE FROM `enc_chequeras`;
/*!40000 ALTER TABLE `enc_chequeras` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_chequeras` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_compra
CREATE TABLE IF NOT EXISTS `enc_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero_factura` varchar(100) CHARACTER SET utf8 NOT NULL,
  `proveedor_id` int(11) NOT NULL,
  `enc_orden_compra_id` int(11) DEFAULT '0',
  `enc_recepcion_id` int(11) DEFAULT '0',
  `fecha_at` date NOT NULL,
  `numero_control` varchar(100) NOT NULL DEFAULT 'N/A',
  `fecha_in` date DEFAULT NULL,
  `subtotal` decimal(18,2) NOT NULL,
  `subtotal_dolar` decimal(18,2) DEFAULT NULL,
  `descuento` decimal(18,2) NOT NULL DEFAULT '0.00',
  `descuento_dolar` decimal(18,2) NOT NULL DEFAULT '0.00',
  `descuento_global` decimal(18,2) DEFAULT '0.00',
  `descuento_global_dolar` decimal(18,2) DEFAULT '0.00',
  `iva` decimal(18,2) DEFAULT '0.00',
  `retencion` decimal(18,2) DEFAULT '0.00',
  `abono` decimal(18,2) NOT NULL DEFAULT '0.00',
  `abono_dolar` decimal(18,2) NOT NULL DEFAULT '0.00',
  `status` tinyint(1) DEFAULT '0',
  `observacion` text CHARACTER SET utf8,
  `fecha_compra` date NOT NULL,
  `riva` bigint(20) DEFAULT NULL,
  `procesado` tinyint(4) DEFAULT '0',
  `imagen` varchar(255) DEFAULT 'default.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.enc_compra: ~8 rows (aproximadamente)
DELETE FROM `enc_compra`;
/*!40000 ALTER TABLE `enc_compra` DISABLE KEYS */;
INSERT INTO `enc_compra` (`id`, `numero_factura`, `proveedor_id`, `enc_orden_compra_id`, `enc_recepcion_id`, `fecha_at`, `numero_control`, `fecha_in`, `subtotal`, `subtotal_dolar`, `descuento`, `descuento_dolar`, `descuento_global`, `descuento_global_dolar`, `iva`, `retencion`, `abono`, `abono_dolar`, `status`, `observacion`, `fecha_compra`, `riva`, `procesado`, `imagen`) VALUES
	(1, '65456', 1, NULL, NULL, '2019-08-12', '789789', NULL, 117664.00, 9.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 'AFGFSDF', '2019-08-12', NULL, NULL, 'default.png'),
	(2, '6547464', 1, NULL, NULL, '2019-08-12', '78797', NULL, 70000.00, 4.41, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 'GJMJE', '2019-08-12', NULL, NULL, 'default.png'),
	(3, '878987', 1, NULL, NULL, '2019-08-12', '87748', NULL, 25000.00, 1.76, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 'JHCVJH', '2019-08-12', NULL, NULL, 'default.png'),
	(4, '578', 1, NULL, NULL, '2019-08-12', '924', NULL, 60000.00, 4.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 'dfgd', '2019-08-12', NULL, NULL, 'default.png'),
	(5, 'dfg', 1, NULL, NULL, '2019-08-12', 'sdgf', NULL, 150000.00, 7.35, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 'dsf', '2019-08-12', NULL, NULL, 'default.png'),
	(6, '87474', 1, NULL, NULL, '2019-08-12', '6515', NULL, 1200000.00, 58.80, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 'dsff gfs<fg', '2019-08-12', NULL, NULL, 'default.png'),
	(7, '55645', 1, NULL, NULL, '2019-08-12', '87998798', NULL, 40000.00, 1.47, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 'gfcjkgkj', '2019-08-12', NULL, NULL, 'default.png'),
	(8, '6548548', 1, NULL, NULL, '2019-08-12', '7879489', NULL, 80000.00, 4.41, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 'sdgdsdf', '2019-08-12', NULL, NULL, 'default.png');
/*!40000 ALTER TABLE `enc_compra` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_concepto_procesado
CREATE TABLE IF NOT EXISTS `enc_concepto_procesado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_compra_id` int(11) NOT NULL DEFAULT '0',
  `usuario_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.enc_concepto_procesado: ~0 rows (aproximadamente)
DELETE FROM `enc_concepto_procesado`;
/*!40000 ALTER TABLE `enc_concepto_procesado` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_concepto_procesado` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_descargos
CREATE TABLE IF NOT EXISTS `enc_descargos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `tipo_descargo_id` int(11) NOT NULL,
  `responsable` int(11) NOT NULL,
  `autorizador` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.enc_descargos: ~0 rows (aproximadamente)
DELETE FROM `enc_descargos`;
/*!40000 ALTER TABLE `enc_descargos` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_descargos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_despacho
CREATE TABLE IF NOT EXISTS `enc_despacho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` datetime NOT NULL,
  `enc_facturas_id` int(11) NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.enc_despacho: ~0 rows (aproximadamente)
DELETE FROM `enc_despacho`;
/*!40000 ALTER TABLE `enc_despacho` DISABLE KEYS */;
INSERT INTO `enc_despacho` (`id`, `fecha_at`, `enc_facturas_id`, `direccion`) VALUES
	(2, '2019-08-01 14:52:38', 3, 'LA ASUNCIO');
/*!40000 ALTER TABLE `enc_despacho` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_ensamblado
CREATE TABLE IF NOT EXISTS `enc_ensamblado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` date DEFAULT NULL,
  `fecha_in` date DEFAULT NULL,
  `conceptos_id` int(11) NOT NULL,
  `tipo_estatus_ensamblado_id` int(11) NOT NULL,
  `cantidad_plant` decimal(12,2) NOT NULL,
  `total_porciones` decimal(12,2) NOT NULL,
  `total_costos` decimal(12,2) NOT NULL,
  `total_gastos` decimal(12,2) NOT NULL,
  `otros` decimal(12,2) NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.enc_ensamblado: ~0 rows (aproximadamente)
DELETE FROM `enc_ensamblado`;
/*!40000 ALTER TABLE `enc_ensamblado` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_ensamblado` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_facturas
CREATE TABLE IF NOT EXISTS `enc_facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero_factura` varchar(255) NOT NULL DEFAULT '0',
  `numero_fiscal` varchar(50) NOT NULL DEFAULT '0',
  `serial_impresora` varchar(255) DEFAULT NULL,
  `fecha_at` date NOT NULL,
  `fecha_in` date DEFAULT NULL,
  `vendedor_id` int(11) NOT NULL,
  `clientes_id` int(11) NOT NULL,
  `subtotal` decimal(18,2) NOT NULL,
  `subtotal_dolar` decimal(18,2) DEFAULT NULL,
  `descuento` decimal(18,2) DEFAULT NULL,
  `iva` decimal(18,2) NOT NULL,
  `facturado` tinyint(1) NOT NULL,
  `estatus_pago` tinyint(1) NOT NULL,
  `abono` decimal(18,2) DEFAULT '0.00',
  `abono_dolar` decimal(18,2) DEFAULT '0.00',
  `tipos_facturas_id` int(11) DEFAULT NULL,
  `usuarios_id` int(11) NOT NULL,
  `caja_id` int(11) NOT NULL,
  `observacion` mediumtext,
  `enc_presupuesto_id` int(11) DEFAULT NULL,
  `anulada` tinyint(1) DEFAULT NULL,
  `usuario_modificador` varchar(50) DEFAULT NULL COMMENT 'usuario que anula/edita la factura',
  `devuelto` decimal(18,2) NOT NULL,
  `motivoreimpresion` mediumtext,
  `afecta_factura` varchar(15) DEFAULT NULL,
  `rest_pedidos_id` int(11) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `coo` int(18) DEFAULT NULL,
  `estatus_entrega` tinyint(4) DEFAULT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clientes_id` (`clientes_id`),
  KEY `tipos_facturas_id` (`tipos_facturas_id`),
  KEY `usuarios_id` (`usuarios_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='Encabezados de las facturas';

-- Volcando datos para la tabla administra.enc_facturas: ~16 rows (aproximadamente)
DELETE FROM `enc_facturas`;
/*!40000 ALTER TABLE `enc_facturas` DISABLE KEYS */;
INSERT INTO `enc_facturas` (`id`, `numero_factura`, `numero_fiscal`, `serial_impresora`, `fecha_at`, `fecha_in`, `vendedor_id`, `clientes_id`, `subtotal`, `subtotal_dolar`, `descuento`, `iva`, `facturado`, `estatus_pago`, `abono`, `abono_dolar`, `tipos_facturas_id`, `usuarios_id`, `caja_id`, `observacion`, `enc_presupuesto_id`, `anulada`, `usuario_modificador`, `devuelto`, `motivoreimpresion`, `afecta_factura`, `rest_pedidos_id`, `fecha_hora`, `coo`, `estatus_entrega`, `fecha_entrega`) VALUES
	(1, '00000001', '0', NULL, '2019-07-18', NULL, 1, 1, 106955.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(2, '00000001', '45546541654', '0', '2019-07-25', '2019-07-25', 2, 1, 37000.00, 4.00, 0.00, 0.00, 1, 0, 0.00, 0.00, 5, 2, 1, NULL, NULL, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(3, '00000002', '0', NULL, '2019-07-30', NULL, 1, 1, 58155.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, '00000003', '0', NULL, '2019-07-30', NULL, 1, 1, 58155.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(5, '00000004', '0', NULL, '2019-07-30', NULL, 1, 1, 58155.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(6, '00000005', '0', NULL, '2019-07-30', NULL, 1, 1, 79480.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(7, '00000006', '0', NULL, '2019-07-30', NULL, 1, 1, 54835.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(8, '00000007', '0', NULL, '2019-07-30', NULL, 1, 1, 86710.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(9, '00000008', '0', NULL, '2019-07-30', NULL, 1, 1, 58155.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(10, '00000009', '0', NULL, '2019-07-30', NULL, 1, 1, 95155.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(11, '00000010', '0', NULL, '2019-07-30', NULL, 1, 1, 157880.00, NULL, 0.00, 0.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(12, '00000011', '00000047', 'Z1A8137599', '2019-07-30', NULL, 1, 1, 58093.00, NULL, 0.00, 9295.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, 'adtyfrh', NULL, NULL, NULL, NULL, NULL, NULL),
	(14, '00000001', '0', NULL, '2019-07-30', NULL, 1, 1, 58093.00, NULL, 0.00, 9295.00, 1, 0, 0.00, 0.00, 3, 1, 1, 'saf', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, 0, NULL, NULL),
	(15, '00000012', '00000048', 'Z1A8137599', '2019-07-30', NULL, 1, 1, 58093.00, NULL, 0.00, 9295.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(16, '00000002', '0', NULL, '2019-07-30', NULL, 1, 1, 58093.00, NULL, 0.00, 9295.00, 1, 0, 0.00, 0.00, 3, 1, 1, 'hfsd', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, 0, NULL, NULL),
	(17, '00000013', '0', NULL, '2019-08-07', NULL, 1, 1, 73050.00, NULL, 0.00, 11688.00, 1, 1, 0.00, 0.00, 1, 1, 1, '', 0, 0, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `enc_facturas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_inventario_mensual
CREATE TABLE IF NOT EXISTS `enc_inventario_mensual` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mes` date NOT NULL,
  `fecha_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.enc_inventario_mensual: ~2 rows (aproximadamente)
DELETE FROM `enc_inventario_mensual`;
/*!40000 ALTER TABLE `enc_inventario_mensual` DISABLE KEYS */;
INSERT INTO `enc_inventario_mensual` (`id`, `mes`, `fecha_at`) VALUES
	(8, '2019-06-30', '2019-07-11'),
	(9, '2019-07-31', '2019-08-01');
/*!40000 ALTER TABLE `enc_inventario_mensual` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_nota_entrega
CREATE TABLE IF NOT EXISTS `enc_nota_entrega` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` date DEFAULT NULL,
  `clientes_id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `descuento` decimal(12,2) DEFAULT NULL,
  `abono` decimal(12,2) DEFAULT NULL,
  `iva` decimal(12,2) DEFAULT NULL,
  `contribuyente` varchar(2) NOT NULL,
  `estatus` varchar(50) NOT NULL,
  `observacion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.enc_nota_entrega: ~0 rows (aproximadamente)
DELETE FROM `enc_nota_entrega`;
/*!40000 ALTER TABLE `enc_nota_entrega` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_nota_entrega` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_orden_compra
CREATE TABLE IF NOT EXISTS `enc_orden_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proveedor_id` int(11) NOT NULL,
  `fecha_at` date DEFAULT NULL,
  `fecha_in` date DEFAULT NULL,
  `descuento` decimal(12,2) DEFAULT '0.00',
  `iva` decimal(12,2) DEFAULT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `observacion` text CHARACTER SET utf8,
  `estatus` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.enc_orden_compra: ~0 rows (aproximadamente)
DELETE FROM `enc_orden_compra`;
/*!40000 ALTER TABLE `enc_orden_compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_orden_compra` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_presupuesto
CREATE TABLE IF NOT EXISTS `enc_presupuesto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `fecha_at` date DEFAULT NULL,
  `fecha_in` date DEFAULT NULL,
  `clientes_id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `subtotal_dolar` decimal(12,2) DEFAULT '0.00',
  `descuento` decimal(12,2) DEFAULT '0.00',
  `descuento_dolar` decimal(12,2) DEFAULT '0.00',
  `descuento_global` decimal(12,2) DEFAULT '0.00',
  `descuento_global_dolar` decimal(12,2) DEFAULT '0.00',
  `abono` decimal(12,2) DEFAULT '0.00',
  `abono_dolar` decimal(12,2) DEFAULT '0.00',
  `iva` decimal(12,2) DEFAULT '0.00',
  `contribuyente` varchar(2) CHARACTER SET utf8 DEFAULT NULL,
  `estatus` varchar(50) CHARACTER SET utf8 NOT NULL,
  `moneda` varchar(50) DEFAULT NULL,
  `observacion` text CHARACTER SET utf8,
  `numero_factura` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.enc_presupuesto: ~0 rows (aproximadamente)
DELETE FROM `enc_presupuesto`;
/*!40000 ALTER TABLE `enc_presupuesto` DISABLE KEYS */;
INSERT INTO `enc_presupuesto` (`id`, `usuario_id`, `fecha_at`, `fecha_in`, `clientes_id`, `vendedor_id`, `subtotal`, `subtotal_dolar`, `descuento`, `descuento_dolar`, `descuento_global`, `descuento_global_dolar`, `abono`, `abono_dolar`, `iva`, `contribuyente`, `estatus`, `moneda`, `observacion`, `numero_factura`) VALUES
	(1, 2, '2019-07-30', NULL, 1, 1, 16755.20, 1.97, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'SI', 'Nuevo', NULL, NULL, NULL);
/*!40000 ALTER TABLE `enc_presupuesto` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_recepcion
CREATE TABLE IF NOT EXISTS `enc_recepcion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proveedor_id` int(11) NOT NULL,
  `enc_orden_compra_id` int(11) DEFAULT NULL,
  `fecha_at` date DEFAULT NULL,
  `fecha_in` date DEFAULT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `descuento` decimal(12,2) NOT NULL,
  `iva` decimal(12,2) DEFAULT '0.00',
  `status` tinyint(1) NOT NULL,
  `observacion` text CHARACTER SET utf8,
  `nota_entrega` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.enc_recepcion: ~0 rows (aproximadamente)
DELETE FROM `enc_recepcion`;
/*!40000 ALTER TABLE `enc_recepcion` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_recepcion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_requisicion
CREATE TABLE IF NOT EXISTS `enc_requisicion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` date DEFAULT NULL,
  `fecha_in` date DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `tipos_requisicion_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `solicitante` int(11) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `autorizo` int(11) DEFAULT NULL,
  `observacion2` varchar(255) DEFAULT NULL,
  `proveedor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.enc_requisicion: ~0 rows (aproximadamente)
DELETE FROM `enc_requisicion`;
/*!40000 ALTER TABLE `enc_requisicion` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_requisicion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_tasas_interes
CREATE TABLE IF NOT EXISTS `enc_tasas_interes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `periodo` varchar(150) NOT NULL,
  `fecha_at` int(11) DEFAULT NULL,
  `fecha_in` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.enc_tasas_interes: ~2 rows (aproximadamente)
DELETE FROM `enc_tasas_interes`;
/*!40000 ALTER TABLE `enc_tasas_interes` DISABLE KEYS */;
INSERT INTO `enc_tasas_interes` (`id`, `periodo`, `fecha_at`, `fecha_in`) VALUES
	(2, '2015', NULL, '2015-07-17 08:27:37'),
	(3, '2015', NULL, NULL);
/*!40000 ALTER TABLE `enc_tasas_interes` ENABLE KEYS */;

-- Volcando estructura para tabla administra.enc_transferencia_deposito
CREATE TABLE IF NOT EXISTS `enc_transferencia_deposito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `observacion` text CHARACTER SET utf8 NOT NULL,
  `total_bs` decimal(12,2) NOT NULL,
  `fecha_at` datetime DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.enc_transferencia_deposito: ~0 rows (aproximadamente)
DELETE FROM `enc_transferencia_deposito`;
/*!40000 ALTER TABLE `enc_transferencia_deposito` DISABLE KEYS */;
/*!40000 ALTER TABLE `enc_transferencia_deposito` ENABLE KEYS */;

-- Volcando estructura para tabla administra.ensamblado
CREATE TABLE IF NOT EXISTS `ensamblado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deposito_origen` int(11) NOT NULL,
  `deposito_transito` int(11) NOT NULL,
  `deposito_destino` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.ensamblado: ~0 rows (aproximadamente)
DELETE FROM `ensamblado`;
/*!40000 ALTER TABLE `ensamblado` DISABLE KEYS */;
/*!40000 ALTER TABLE `ensamblado` ENABLE KEYS */;

-- Volcando estructura para tabla administra.entidad
CREATE TABLE IF NOT EXISTS `entidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.entidad: ~20 rows (aproximadamente)
DELETE FROM `entidad`;
/*!40000 ALTER TABLE `entidad` DISABLE KEYS */;
INSERT INTO `entidad` (`id`, `nombre`) VALUES
	(1, '100% BANCO'),
	(2, 'ACTIVO'),
	(3, 'BANCARIBE'),
	(4, 'BANCRECER'),
	(5, 'BANESCO'),
	(6, 'BANFANB'),
	(7, 'BANPLUS'),
	(8, 'BICENTENARIO'),
	(9, 'BFC'),
	(10, 'BNC'),
	(11, 'BOD'),
	(12, 'CARONI'),
	(13, 'CORP BANCA'),
	(14, 'DEL TESORO'),
	(15, 'DELSUR'),
	(16, 'EXTERIOR'),
	(17, 'MERCANTIL'),
	(18, 'PLAZA'),
	(19, 'PROVINCIAL'),
	(20, 'VENEZUELA');
/*!40000 ALTER TABLE `entidad` ENABLE KEYS */;

-- Volcando estructura para tabla administra.estado
CREATE TABLE IF NOT EXISTS `estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.estado: ~25 rows (aproximadamente)
DELETE FROM `estado`;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` (`id`, `nombre`) VALUES
	(1, 'Amazonas'),
	(2, 'Anzoátegui'),
	(3, 'Apure'),
	(4, 'Aragua'),
	(5, 'Barinas'),
	(6, 'Bolívar'),
	(7, 'Carabobo'),
	(8, 'Cojedes'),
	(9, 'Delta Amacuro'),
	(10, 'Falcón'),
	(11, 'Guárico'),
	(12, 'Lara'),
	(13, 'Mérida'),
	(14, 'Miranda'),
	(15, 'Monagas'),
	(16, 'Nueva Esparta'),
	(17, 'Portuguesa'),
	(18, 'Sucre'),
	(19, 'Táchira'),
	(20, 'Trujillo'),
	(21, 'Vargas'),
	(22, 'Yaracuy'),
	(23, 'Zulia'),
	(24, 'Distrito Capital'),
	(25, 'Dependencias Federales');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;

-- Volcando estructura para tabla administra.estado_usuario
CREATE TABLE IF NOT EXISTS `estado_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del estado del usuario',
  `usuario_id` int(11) NOT NULL COMMENT 'Identificador del usuario',
  `estado_usuario` int(11) NOT NULL COMMENT 'Código del estado del usuario',
  `descripcion` varchar(100) NOT NULL COMMENT 'Motivo del cambio de estado',
  `estado_usuario_at` datetime DEFAULT NULL COMMENT 'Fecha del cambio de estado',
  PRIMARY KEY (`id`),
  KEY `fk_estado_usuario_usuario_idx` (`usuario_id`),
  CONSTRAINT `fk_estado_usuario_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene los estados de los usuarios';

-- Volcando datos para la tabla administra.estado_usuario: ~5 rows (aproximadamente)
DELETE FROM `estado_usuario`;
/*!40000 ALTER TABLE `estado_usuario` DISABLE KEYS */;
INSERT INTO `estado_usuario` (`id`, `usuario_id`, `estado_usuario`, `descripcion`, `estado_usuario_at`) VALUES
	(1, 1, 2, 'Bloqueado por ser un usuario sin privilegios', '2014-01-01 00:00:01'),
	(2, 2, 1, 'Activo por ser el Super Usuario del sistema', '2014-01-01 00:00:01'),
	(3, 3, 1, 'Activado por registro inicial', '2016-02-15 14:16:11'),
	(4, 4, 1, 'Activado por registro inicial', '2016-02-15 14:16:11'),
	(5, 5, 1, 'Activado por registro inicial', '2016-02-15 14:16:11');
/*!40000 ALTER TABLE `estado_usuario` ENABLE KEYS */;

-- Volcando estructura para tabla administra.estatus_cheque
CREATE TABLE IF NOT EXISTS `estatus_cheque` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.estatus_cheque: ~3 rows (aproximadamente)
DELETE FROM `estatus_cheque`;
/*!40000 ALTER TABLE `estatus_cheque` DISABLE KEYS */;
INSERT INTO `estatus_cheque` (`id`, `nombre`) VALUES
	(1, 'disponible'),
	(2, 'utilizado'),
	(3, 'anulado');
/*!40000 ALTER TABLE `estatus_cheque` ENABLE KEYS */;

-- Volcando estructura para tabla administra.farm_principio_activo
CREATE TABLE IF NOT EXISTS `farm_principio_activo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.farm_principio_activo: ~0 rows (aproximadamente)
DELETE FROM `farm_principio_activo`;
/*!40000 ALTER TABLE `farm_principio_activo` DISABLE KEYS */;
/*!40000 ALTER TABLE `farm_principio_activo` ENABLE KEYS */;

-- Volcando estructura para tabla administra.grupos
CREATE TABLE IF NOT EXISTS `grupos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `imagen` varchar(100) NOT NULL DEFAULT 'default.png',
  `visualizar` tinyint(1) DEFAULT '0',
  `posicion` tinyint(3) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COMMENT='Grupos de Productos';

-- Volcando datos para la tabla administra.grupos: ~13 rows (aproximadamente)
DELETE FROM `grupos`;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` (`id`, `nombre`, `imagen`, `visualizar`, `posicion`) VALUES
	(1, 'LACTEOS', 'default.png', 0, 1),
	(2, 'BEBIDAS', 'default.png', 1, 1),
	(3, 'CARNES', 'default.png', 1, 1),
	(4, 'EMBUTIDOS', 'default.png', 0, 1),
	(5, 'FRUTAS', 'default.png', 0, 1),
	(6, 'HORTALIZAS', 'default.png', 0, 1),
	(7, 'CEREALES', 'default.png', 0, 1),
	(8, 'ESPECIAS', 'default.png', 0, 1),
	(9, 'POSTRES', 'default.png', 1, 1),
	(10, 'ENTRADAS', 'default.png', 1, 1),
	(11, 'PLATOS', 'default.png', 1, 1),
	(12, 'PRUEBA CREATE API NODEJS', 'default.png', 0, 1),
	(13, 'PRUEBA 2 CREATE API NODEJS', 'default.png', 0, 1);
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.grupos_rest_caracteristicas
CREATE TABLE IF NOT EXISTS `grupos_rest_caracteristicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grupos_id` int(11) NOT NULL DEFAULT '0',
  `rest_caracteristicas_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Tabla que relaciona las caracteristicas de los conceptos con grupos de conceptos';

-- Volcando datos para la tabla administra.grupos_rest_caracteristicas: ~0 rows (aproximadamente)
DELETE FROM `grupos_rest_caracteristicas`;
/*!40000 ALTER TABLE `grupos_rest_caracteristicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupos_rest_caracteristicas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.grupo_cliente
CREATE TABLE IF NOT EXISTS `grupo_cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.grupo_cliente: ~57 rows (aproximadamente)
DELETE FROM `grupo_cliente`;
/*!40000 ALTER TABLE `grupo_cliente` DISABLE KEYS */;
INSERT INTO `grupo_cliente` (`id`, `nombre`) VALUES
	(1, 'RESTAURANTES'),
	(2, 'BODEGON'),
	(3, 'TIENDAS DE ROPA'),
	(4, 'MUEBLERIAS'),
	(5, 'TIENDAS DE PERSIANAS'),
	(6, 'OFICINAS ADMINISTRATIVAS'),
	(7, 'CONSTRUCTORAS'),
	(8, 'AGENCIAS DE VIAJES'),
	(9, 'PERFUMERIAS'),
	(10, 'PANADERIAS'),
	(11, 'VENTAS DE RESPUESTOS PARA VEHICULOS Y ACCESORIOS'),
	(12, 'LAVANDERIAS'),
	(13, 'TIENDAS NATURISTAS'),
	(14, 'HOTELES'),
	(15, 'AUTOLAVADOS'),
	(16, 'FERRETERIAS'),
	(17, 'GIMNASIO'),
	(18, 'PELUQUERIAS'),
	(19, 'LABORATORIOS'),
	(20, 'CLINICAS'),
	(21, 'LIBRERIAS'),
	(22, 'AGENCIAS DE LOTERIAS Y APUESTAS'),
	(23, 'COLEGIOS'),
	(24, 'MATERIALES DE CONSTRUCCION'),
	(25, 'FARMACIAS'),
	(26, 'EMISORAS DE RADIO'),
	(27, 'TIENDAS DE COMPUTACION Y ACCESORIOS'),
	(28, 'CARNICERIAS'),
	(29, 'ESTETICA'),
	(30, 'ADUANERA'),
	(31, 'ALCALDIAS'),
	(32, 'FRUTERIA'),
	(33, 'MARMOLESRIA PARA COCINAS Y ACSESORIOS'),
	(34, 'HELADERIA'),
	(35, 'TIENDAS DE ARTICULOS PARA FIESTAS'),
	(36, 'REPUESTOS PARA VEHICULOS'),
	(37, 'PERSONAL'),
	(38, 'INMOBILIARIA'),
	(39, 'MATERNAL'),
	(40, 'SUPERMERCADOS'),
	(41, 'CONDOMINIO'),
	(42, 'JOYERIA'),
	(43, 'DISTRIBUIDORA'),
	(44, 'carroceria'),
	(45, 'ACTIVIDADES DE HOSPITALES'),
	(46, 'pizeria'),
	(47, 'publicidad'),
	(48, 'venta de lubricantes'),
	(49, 'GUARDIA NACIONAL'),
	(50, 'EMPRESAS DE SERVICIOS'),
	(51, 'charcuteria'),
	(52, 'TASCA'),
	(53, 'MINIMARKET'),
	(54, 'CAFE'),
	(55, 'TIENDA DE FRUTOS SECOS Y ALGO MAS'),
	(56, 'MANICERIA'),
	(57, 'GALERIA DE ARTE');
/*!40000 ALTER TABLE `grupo_cliente` ENABLE KEYS */;

-- Volcando estructura para tabla administra.iva
CREATE TABLE IF NOT EXISTS `iva` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 NOT NULL,
  `porcentaje` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.iva: ~2 rows (aproximadamente)
DELETE FROM `iva`;
/*!40000 ALTER TABLE `iva` DISABLE KEYS */;
INSERT INTO `iva` (`id`, `nombre`, `porcentaje`) VALUES
	(1, 'ALÍCUOTA NORMAL (16%)', 16.00),
	(2, 'ALÍCUOTA REDUCIDA (8%)', 8.00);
/*!40000 ALTER TABLE `iva` ENABLE KEYS */;

-- Volcando estructura para tabla administra.licores
CREATE TABLE IF NOT EXISTS `licores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conceptos_id` int(11) NOT NULL,
  `especie` varchar(50) NOT NULL,
  `grados` decimal(10,2) NOT NULL,
  `procedencia` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.licores: ~0 rows (aproximadamente)
DELETE FROM `licores`;
/*!40000 ALTER TABLE `licores` DISABLE KEYS */;
/*!40000 ALTER TABLE `licores` ENABLE KEYS */;

-- Volcando estructura para tabla administra.log
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de Tabla',
  `autorizador` varchar(50) NOT NULL COMMENT 'Usuario Autorizado para realizar esta accion',
  `accion` varchar(50) DEFAULT NULL COMMENT 'Accion Realizada por el usuario (modificó, eliminó, etc) ',
  `cantidad` varchar(50) DEFAULT NULL COMMENT 'Cantidad Afectada',
  `descripcion` text NOT NULL COMMENT 'Lo que Realizó el Usuario',
  `usuarios_id` int(11) NOT NULL COMMENT 'Usuario que ejecuto la accion',
  `fecha_at` datetime DEFAULT NULL COMMENT 'Fecha de Modificacion',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.log: ~0 rows (aproximadamente)
DELETE FROM `log`;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` (`id`, `autorizador`, `accion`, `cantidad`, `descripcion`, `usuarios_id`, `fecha_at`) VALUES
	(1, '', NULL, NULL, 'Se reliazo un descuento de 3(%) - por un monto de 1742,82', 2, NULL);
/*!40000 ALTER TABLE `log` ENABLE KEYS */;

-- Volcando estructura para tabla administra.lotes
CREATE TABLE IF NOT EXISTS `lotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lote` varchar(50) DEFAULT '0',
  `conceptos_id` int(11) NOT NULL,
  `documento` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `fecha_compra` date NOT NULL,
  `fecha_elaboracion` date DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `precio_costo` decimal(12,3) DEFAULT NULL,
  `precio_a` decimal(12,3) DEFAULT NULL,
  `precio_b` decimal(12,3) DEFAULT NULL,
  `precio_c` decimal(12,3) DEFAULT NULL,
  `utilidad_a` decimal(12,3) DEFAULT NULL,
  `utilidad_b` decimal(12,3) DEFAULT NULL,
  `utilidad_c` decimal(12,3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.lotes: ~0 rows (aproximadamente)
DELETE FROM `lotes`;
/*!40000 ALTER TABLE `lotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `lotes` ENABLE KEYS */;

-- Volcando estructura para tabla administra.marcas
CREATE TABLE IF NOT EXISTS `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='marcas de productos';

-- Volcando datos para la tabla administra.marcas: ~2 rows (aproximadamente)
DELETE FROM `marcas`;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` (`id`, `nombre`) VALUES
	(1, 'Polar'),
	(2, 'Rexona');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del menú',
  `menu_id` int(11) DEFAULT NULL COMMENT 'Identificador del menú padre',
  `recurso_id` int(11) DEFAULT NULL COMMENT 'Identificador del recurso',
  `menu` varchar(45) NOT NULL COMMENT 'Texto a mostrar del menú',
  `url` varchar(60) DEFAULT NULL COMMENT 'Url del menú',
  `posicion` int(11) DEFAULT '0' COMMENT 'Posisión dentro de otros items',
  `icono` varchar(45) DEFAULT NULL COMMENT 'Icono a mostrar ',
  `activo` int(1) NOT NULL DEFAULT '1' COMMENT 'Menú activo o inactivo',
  `visibilidad` int(1) NOT NULL DEFAULT '1' COMMENT 'Indica si el menú se muestra en el backend o en el frontend',
  `custom` int(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_menu_recurso_idx` (`recurso_id`),
  KEY `fk_menu_menu_idx` (`menu_id`),
  CONSTRAINT `fk_menu_menu` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_menu_recurso` FOREIGN KEY (`recurso_id`) REFERENCES `recurso` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene los menú para los usuarios';

-- Volcando datos para la tabla administra.menu: ~23 rows (aproximadamente)
DELETE FROM `menu`;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`id`, `menu_id`, `recurso_id`, `menu`, `url`, `posicion`, `icono`, `activo`, `visibilidad`, `custom`) VALUES
	(1, NULL, NULL, 'Principal', '#', 10, 'fa-home', 1, 1, NULL),
	(2, 1, 2, 'Principal', 'dashboard/', 11, 'fa-home', 1, 1, NULL),
	(3, NULL, NULL, 'Sistema', '#', 900, 'fa-cogs', 1, 1, NULL),
	(4, 3, 4, 'Accesos', 'sistema/accesos/listar/', 901, 'fa-exchange', 1, 1, NULL),
	(5, 3, 5, 'Auditoría', 'sistema/auditorias/', 902, 'fa-eye', 1, 1, NULL),
	(6, 3, 6, 'Backups', 'sistema/backups/listar/', 903, 'fa-hdd-o', 1, 1, NULL),
	(7, 3, 7, 'Mantenimiento', 'sistema/mantenimiento/', 904, 'fa-bolt', 1, 1, NULL),
	(8, 3, 8, 'Menú', 'sistema/menus/listar/', 905, 'fa-list', 1, 1, NULL),
	(9, 3, 9, 'Perfiles', 'sistema/perfiles/listar/', 906, 'fa-group', 1, 1, NULL),
	(10, 3, 10, 'Permisos', 'sistema/permisos/listar/', 907, 'fa-magic', 1, 1, NULL),
	(11, 3, 11, 'Recursos', 'sistema/recursos/listar/', 908, 'fa-lock', 1, 1, NULL),
	(12, 3, 12, 'Usuarios', 'sistema/usuarios/listar/', 909, 'fa-user', 1, 1, NULL),
	(13, 3, 13, 'Visor de sucesos', 'sistema/sucesos/listar/', 910, 'fa-filter', 1, 1, NULL),
	(14, 3, 14, 'Sistema', 'sistema/configuracion/', 911, 'fa-wrench', 1, 1, NULL),
	(15, NULL, NULL, 'ALMACEN', 'Index/menuAlamacen/', 1, NULL, 2, 2, NULL),
	(16, NULL, NULL, 'CAJA Y BANCO', 'Index/menuCajayBanco/', 2, NULL, 2, 1, NULL),
	(20, 1, 16, 'Almacen', 'index/menuAlmacen', 12, 'fa-inbox', 1, 1, NULL),
	(21, 1, 17, 'Caja y Banco', 'index/menuCajaBanco', 13, 'fa-usd', 1, 1, NULL),
	(23, 1, 19, 'Ventas', 'index/menuVentas', 15, 'fa-tags', 1, 1, NULL),
	(24, 1, 20, 'Reportes', 'index/menuReportes', 17, 'fa-folder-open', 1, 1, NULL),
	(27, 3, 24, 'Empresa', 'empresa/index', 1, 'fa-building-o', 1, 1, NULL),
	(29, 1, 18, 'Compras', 'index/menuCompras', 14, 'fa-shopping-cart', 1, 1, NULL),
	(30, 1, 26, 'Restaurant', 'index/menuRestaurante', 16, 'fa-cutlery', 1, 1, NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

-- Volcando estructura para tabla administra.menu_sist
CREATE TABLE IF NOT EXISTS `menu_sist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_modelo` int(11) DEFAULT NULL,
  `menu_sist2_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.menu_sist: ~269 rows (aproximadamente)
DELETE FROM `menu_sist`;
/*!40000 ALTER TABLE `menu_sist` DISABLE KEYS */;
INSERT INTO `menu_sist` (`id`, `empresa_modelo`, `menu_sist2_id`) VALUES
	(1, 1, 1),
	(2, 1, 5),
	(3, 1, 12),
	(4, 1, 13),
	(5, 1, 14),
	(6, 1, 16),
	(7, 1, 17),
	(8, 1, 18),
	(9, 1, 19),
	(10, 1, 37),
	(11, 1, 38),
	(12, 1, 39),
	(13, 1, 45),
	(14, 1, 49),
	(15, 1, 51),
	(16, 1, 52),
	(17, 1, 53),
	(18, 1, 54),
	(19, 1, 55),
	(20, 1, 57),
	(21, 1, 59),
	(22, 1, 60),
	(23, 1, 61),
	(24, 1, 69),
	(25, 1, 71),
	(26, 1, 73),
	(27, 1, 74),
	(28, 2, 1),
	(29, 2, 2),
	(30, 2, 3),
	(31, 2, 4),
	(32, 2, 5),
	(33, 2, 6),
	(34, 2, 7),
	(35, 2, 9),
	(36, 2, 10),
	(37, 2, 11),
	(38, 2, 12),
	(39, 2, 13),
	(40, 2, 14),
	(41, 2, 16),
	(42, 2, 17),
	(43, 2, 18),
	(44, 2, 19),
	(45, 2, 21),
	(46, 2, 23),
	(47, 2, 24),
	(48, 2, 25),
	(49, 2, 26),
	(50, 2, 27),
	(51, 2, 28),
	(52, 2, 34),
	(53, 2, 35),
	(54, 2, 36),
	(55, 2, 37),
	(56, 2, 38),
	(57, 2, 39),
	(58, 2, 42),
	(59, 2, 43),
	(60, 2, 44),
	(61, 2, 45),
	(62, 2, 46),
	(63, 2, 47),
	(64, 2, 49),
	(65, 2, 50),
	(66, 2, 51),
	(67, 2, 52),
	(68, 2, 53),
	(69, 2, 54),
	(70, 2, 55),
	(71, 2, 56),
	(72, 2, 57),
	(73, 2, 58),
	(74, 2, 59),
	(75, 2, 60),
	(76, 2, 61),
	(77, 2, 62),
	(78, 2, 64),
	(79, 2, 65),
	(80, 2, 66),
	(81, 2, 67),
	(82, 2, 68),
	(83, 2, 69),
	(84, 2, 70),
	(85, 2, 71),
	(86, 2, 72),
	(87, 2, 73),
	(88, 2, 74),
	(89, 2, 75),
	(90, 2, 76),
	(91, 2, 77),
	(92, 2, 78),
	(93, 3, 1),
	(94, 3, 2),
	(95, 3, 3),
	(96, 3, 4),
	(97, 3, 5),
	(98, 3, 6),
	(99, 3, 7),
	(100, 3, 8),
	(101, 3, 9),
	(102, 3, 10),
	(103, 3, 11),
	(104, 3, 12),
	(105, 3, 13),
	(106, 3, 14),
	(107, 3, 15),
	(108, 3, 16),
	(109, 3, 17),
	(110, 3, 18),
	(111, 3, 19),
	(112, 3, 20),
	(113, 3, 21),
	(114, 3, 22),
	(115, 3, 23),
	(116, 3, 24),
	(117, 3, 25),
	(118, 3, 26),
	(119, 3, 27),
	(120, 3, 28),
	(121, 3, 29),
	(122, 3, 30),
	(123, 3, 31),
	(124, 3, 32),
	(125, 3, 33),
	(126, 3, 34),
	(127, 3, 35),
	(128, 3, 36),
	(129, 3, 37),
	(130, 3, 38),
	(131, 3, 39),
	(132, 3, 40),
	(133, 3, 41),
	(134, 3, 42),
	(135, 3, 43),
	(136, 3, 44),
	(137, 3, 45),
	(138, 3, 46),
	(139, 3, 47),
	(140, 3, 48),
	(141, 3, 49),
	(142, 3, 51),
	(143, 3, 52),
	(144, 3, 53),
	(145, 3, 54),
	(146, 3, 55),
	(147, 3, 56),
	(148, 3, 57),
	(149, 3, 58),
	(150, 3, 59),
	(151, 3, 60),
	(152, 3, 61),
	(153, 3, 62),
	(154, 3, 63),
	(155, 3, 64),
	(156, 3, 65),
	(157, 3, 66),
	(158, 3, 67),
	(159, 3, 68),
	(160, 3, 69),
	(161, 3, 70),
	(162, 3, 71),
	(163, 3, 72),
	(164, 3, 73),
	(165, 3, 74),
	(166, 3, 75),
	(167, 3, 76),
	(168, 3, 77),
	(169, 3, 78),
	(170, 3, 79),
	(171, 3, 80),
	(172, 3, 81),
	(173, 3, 82),
	(174, 4, 1),
	(175, 4, 2),
	(176, 4, 3),
	(177, 4, 4),
	(178, 4, 5),
	(179, 4, 6),
	(180, 4, 7),
	(181, 4, 8),
	(182, 4, 9),
	(183, 4, 10),
	(184, 4, 11),
	(185, 4, 12),
	(186, 4, 13),
	(187, 4, 14),
	(188, 4, 15),
	(189, 4, 16),
	(190, 4, 17),
	(191, 4, 18),
	(192, 4, 19),
	(193, 4, 20),
	(194, 4, 21),
	(195, 4, 22),
	(196, 4, 23),
	(197, 4, 24),
	(198, 4, 25),
	(199, 4, 26),
	(200, 4, 27),
	(201, 4, 28),
	(202, 4, 29),
	(203, 4, 30),
	(204, 4, 31),
	(205, 4, 32),
	(206, 4, 33),
	(207, 4, 34),
	(208, 4, 35),
	(209, 4, 36),
	(210, 4, 37),
	(211, 4, 38),
	(212, 4, 39),
	(213, 4, 40),
	(214, 4, 41),
	(215, 4, 42),
	(216, 4, 43),
	(217, 4, 44),
	(218, 4, 45),
	(219, 4, 46),
	(220, 4, 47),
	(221, 4, 48),
	(222, 4, 49),
	(223, 4, 51),
	(224, 4, 52),
	(225, 4, 53),
	(226, 4, 54),
	(227, 4, 55),
	(228, 4, 56),
	(229, 4, 57),
	(230, 4, 58),
	(231, 4, 59),
	(232, 4, 60),
	(233, 4, 61),
	(234, 4, 62),
	(235, 4, 63),
	(236, 4, 64),
	(237, 4, 65),
	(238, 4, 66),
	(239, 4, 67),
	(240, 4, 68),
	(241, 4, 69),
	(242, 4, 70),
	(243, 4, 71),
	(244, 4, 72),
	(245, 4, 73),
	(246, 4, 74),
	(247, 4, 75),
	(248, 4, 76),
	(249, 4, 77),
	(250, 4, 78),
	(251, 4, 79),
	(252, 4, 80),
	(253, 4, 81),
	(254, 4, 82),
	(255, 4, 83),
	(256, 4, 84),
	(257, 4, 85),
	(258, 4, 86),
	(259, 4, 87),
	(260, 4, 88),
	(261, 4, 89),
	(262, 4, 90),
	(263, 4, 91),
	(264, 4, 92),
	(265, 4, 93),
	(266, 4, 94),
	(267, 4, 95),
	(268, 4, 96),
	(269, 4, 97);
/*!40000 ALTER TABLE `menu_sist` ENABLE KEYS */;

-- Volcando estructura para tabla administra.menu_sist2
CREATE TABLE IF NOT EXISTS `menu_sist2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `menu` varchar(50) DEFAULT NULL,
  `pestana` varchar(50) DEFAULT NULL,
  `url` varchar(50) DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `estilo` varchar(50) DEFAULT 'width=''60px''',
  `boton` varchar(50) DEFAULT 'primary',
  `visible` varchar(50) DEFAULT NULL,
  `principal` tinyint(4) DEFAULT '0',
  `posicion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla administra.menu_sist2: ~96 rows (aproximadamente)
DELETE FROM `menu_sist2`;
/*!40000 ALTER TABLE `menu_sist2` DISABLE KEYS */;
INSERT INTO `menu_sist2` (`id`, `nombre`, `menu`, `pestana`, `url`, `imagen`, `estilo`, `boton`, `visible`, `principal`, `posicion`) VALUES
	(1, 'CAJAS', 'Caja y Banco', NULL, 'caja/', 'caja.png', 'width="60px"', 'primary', '1', 0, 1),
	(2, 'MOVIMIENTOS DE CAJA', 'Caja y Banco', NULL, 'movimientos_caja/', 'movimiento_caja.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(3, 'TRANSFERENCIA DE CAJA', 'Caja y Banco', NULL, 'transferencias_caja/', 'transferencia_caja1.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(4, 'REPOSICION DE CAJA', 'Caja y Banco', NULL, 'reposicion_caja/', 'reposicion_caja.png', 'width=\'100px\' height=\'60\'', 'primary', '1', 0, 4),
	(5, 'BANCO', 'Caja y Banco', NULL, 'banco/', 'banco.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(6, 'MOVIMIENTOS DE BANCO', 'Caja y Banco', NULL, 'movimientos_bancos/', 'movimiento_banco.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 6),
	(7, 'TRANSFERENCIA BANCARIAS', 'Caja y Banco', NULL, 'transferencia_bancaria/', 'transferencia_banco.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 7),
	(8, 'CONCILIACIONES BANCARIAS', 'Caja y Banco', NULL, '#', 'conciliacion_bancaria.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 8),
	(9, 'CHEQUERAS', 'Caja y Banco', NULL, 'chequeras/', 'nueva_chequera.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 9),
	(10, 'IMPRIMIR CHEQUE', 'Caja y Banco', NULL, 'cheques/', 'print_check.png', 'width=\'135px\'', 'primary', '1', 0, 10),
	(11, 'ANULAR CHEQUE', 'Caja y Banco', NULL, 'cheques/anular/', 'anular_cheque.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 11),
	(12, 'GRUPOS', 'Almacen', NULL, 'grupos/', 'grupos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(13, 'SUBGRUPOS', 'Almacen', NULL, 'subgrupos/', 'subgrupos.ico', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(14, 'MARCAS', 'Almacen', NULL, 'marcas/', 'marcas.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(15, 'DEPOSITOS', 'Almacen', NULL, 'depositos/', 'depositos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 4),
	(16, 'UBICACIÓN', 'Almacen', NULL, 'ubicacion/', 'ubicacion.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(17, 'PRODUCTOS', 'Almacen', NULL, 'conceptos/', 'conceptos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 1, 6),
	(18, 'AJUSTE DE INVENTARIO', 'Almacen', NULL, 'ajuste_inventario/', 'ajuste_inventario.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 7),
	(19, 'CARGOS', 'Almacen', NULL, 'cargos/', 'cargos.jpg', 'width=\'60px\' height=\'60px\'', 'primary', '1', 1, 8),
	(20, 'TRANS. ENTRE DEPOSITOS', 'Almacen', NULL, 'transferencia_deposito/', 'transferencia_depositos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 9),
	(21, 'AJUSTE DE PRECIOS', 'Almacen', NULL, 'ajuste_precios/', 'search-good.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 10),
	(22, 'PRODUCTOS ENSAMBLADOS', 'Almacen', NULL, 'ensamblado/', 'Assembly.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 11),
	(23, 'TIPO DE PROVEEDOR', 'Compras', NULL, 'tipo_proveedor/', 'tipo_proveedor.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(24, 'PROVEEDOR', 'Compras', NULL, 'proveedor/', 'proveedor.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(25, 'GASTOS', 'Compras', NULL, 'gastos/', 'gastos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(26, 'ORDEN DE COMPRA', 'Compras', NULL, 'orden_compra/', 'orden_compra.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 4),
	(27, 'RECEPCION', 'Compras', NULL, 'recepcion/', 'recepcion_compra.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(28, 'COMPRAS', 'Compras', NULL, 'compras/', 'compras_nueva.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 1, 6),
	(29, 'ORDEN DE PAGO', 'Compras', NULL, 'orden_pago/', 'orden_pagos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 7),
	(30, 'PAGOS', 'Compras', NULL, 'pagos/', 'pagos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 8),
	(31, 'PAGOS MULTIPLES', 'Compras', NULL, 'compras/pagoMultiple/', 'multiples_pagos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 1, 9),
	(32, 'OTROS PAGOS', 'Compras', NULL, 'enc_compra/', 'otros_pagos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 9),
	(33, 'PROCESAR ORDEN DE PAGO', 'Compras', NULL, 'procesar_pago/', 'procesar_pago2.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 10),
	(34, 'ABONOS / ANTICIPOS', 'Compras', NULL, 'abonos_compras/', 'anticipo.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 11),
	(35, 'TIPOS DE RETENCION', 'Compras', NULL, 'tipo_retencion/', 'retencion.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 12),
	(36, 'TABLA DE IVA', 'Compras', NULL, 'iva/', 'iva.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 13),
	(37, 'GRUPOS DE CLIENTES', 'Ventas', NULL, 'grupo_cliente/', 'grupo_cliente.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(38, 'CLIENTES', 'Ventas', NULL, 'clientes/', 'cliente.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(39, 'VENDEDOR', 'Ventas', NULL, 'vendedor/', 'vendedor.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(40, 'COBRADOR', 'Ventas', NULL, 'cobrador/', 'cobrador.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 4),
	(41, 'ZONAS DE COBRANZAS', 'Ventas', NULL, 'zonas/', 'zona_cobranza.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(42, 'PRESUPUESTO', 'Ventas', NULL, 'presupuesto/', 'presupuesto.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 6),
	(43, 'ADELANTOS/ANTICIPOS', 'Ventas', NULL, 'abonos/', 'anticipo.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 7),
	(44, 'DESCARGOS', 'Ventas', NULL, 'descargos/', 'descargo.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 8),
	(45, 'FACTURACION', 'Ventas', NULL, 'facturacion/', 'facturacion.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 1, 9),
	(46, 'NOTA DE ENTREGA', 'Ventas', NULL, 'nota_entrega/', 'nota_entrega.gif', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 10),
	(47, 'DESPACHOS', 'Ventas', NULL, 'despacho/', 'despacho.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 11),
	(48, 'COBRANZAS', 'Ventas', NULL, 'cobranza/', 'cobranza.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 1, 12),
	(49, 'UNIDADES', 'Almacen', NULL, 'unidades/', 'unidad_medida.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(51, 'CONCEPTOS', 'Reportes', 'Almacen', 'reportes/Conceptos/', 'conceptos2.png', 'width=\'60px\' height=\'60px\'', 'success', '1', 0, 1),
	(52, 'LISTADO EXISTENCIA', 'Reportes', 'Almacen', 'reportes/ListExistencias/', 'existen-guy.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(53, 'INVENTARIO', 'Reportes', 'Almacen', 'reportes/Inventario/', 'conceptos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(54, 'LISTA DE PRECIOS', 'Reportes', 'Almacen', 'reportes/ListaPrecios/', 'price_list.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 4),
	(55, 'Ajuste Inventario', 'Reportes', 'Almacen', 'reportes/AjusteInventario/', 'ajuste_inventario.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(56, 'Trans. Deposito', 'Reportes', 'Almacen', 'reportes/TransDeposito/', 'transferencia_depositos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 6),
	(57, 'Movimiento Inventario', 'Reportes', 'Almacen', 'reportes/MovimientoInventario/', 'movimiento_inventario.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 7),
	(58, 'CIERRE INVENTARIO', 'Reportes', 'Almacen', 'reportes/CierreInventario/', 'conceptos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 8),
	(59, 'CORTE DE CAJA', 'Reportes', 'CajaYBanco', 'reportes/CorteCaja/', 'cuadre_caja.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(60, 'MOVIMIENTOS BANCARIOS', 'Reportes', 'CajaYBanco', 'reportes/MovimientoBanco/', 'movimiento_banco.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(61, 'MOVIMIENTOS DE CAJAS', 'Reportes', 'CajaYBanco', 'reportes/MovimientoBanco/', 'movimiento_caja.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(62, 'COBRANZA', 'Reportes', 'CajaYBanco', 'reportes/Cobranza/', 'maquina.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 4),
	(63, 'FLUJO DE CAJA', 'Reportes', 'CajaYBanco', 'reportes/FlujoDeCaja/', 'flujo_caja.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(64, 'LIBRO DE COMPRAS', 'Reportes', 'Compras', 'reportes/LibroCompra/', 'libro_compra.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(65, 'CUENTAS POR PAGAR', 'Reportes', 'Compras', 'reportes/CxP/', 'cxp.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(66, 'COMPRAS Y GASTOS', 'Reportes', 'Compras', 'reportes/Compras_Gastos/', 'compras_gastos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(67, 'GASTOS', 'Reportes', 'Compras', 'reportes/Gastos/', 'gastos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 4),
	(68, 'MAYOR ANALITICO', 'Reportes', 'Compras', 'reportes/MayorAnalitico/', 'analisis.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(69, 'CLIENTES', 'Reportes', 'Ventas', 'reportes/Clientes/', 'grupo_cliente.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(70, 'CLIENTES POR ZONA', 'Reportes', 'Ventas', 'reportes/ClientesZona/', 'ClientesXZona.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(71, 'LIBRO DE VENTAS', 'Reportes', 'Ventas', 'reportes/LibroVentas/', 'libro_ventas.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(72, 'CUENTAS POR COBRAR', 'Reportes', 'Ventas', 'reportes/CxC/', 'cxc.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 4),
	(73, 'VENTA DIARIA', 'Reportes', 'Ventas', 'reportes/VentaDiaria/', 'prod_vendidos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(74, 'DESCARGOS', 'Reportes', 'Ventas', 'reportes/Descargos/', 'descargo.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 6),
	(75, 'VENDEDORES', 'Reportes', 'Ventas', 'reportes/Vendedores/', 'vendedor.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 7),
	(76, 'VENTAS POR PRODUCTOS', 'Reportes', 'Ventas', 'reportes/VentaPorProducto/', 'prod_vendidos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 8),
	(77, 'VENTAS GLOBAL', 'Reportes', 'Ventas', 'reportes/VentaGlobalProducto/', 'productos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 9),
	(78, 'VENTAS POR CLIENTES', 'Reportes', 'Ventas', 'reportes/VentasClientes/', 'productos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 9),
	(79, 'SOPORTE TECNICO', 'Reportes', 'SoporteTecnico', 'reportes/ServicioTecnico/', 'tecnicos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(80, 'RUTAS TECNICOS', 'Reportes', 'SoporteTecnico', 'reportes/RutasTecnicos/', 'tecnicos.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(81, 'LIBRO DE ENTRADA', 'Reportes', 'Licores', 'reportes/LibroEntrada/', 'entregas_lic.png', 'width=\'60px\' height=\'60px\'', 'primary', '0', 0, 1),
	(82, 'LIBRO DE SALIDA', 'Reportes', 'Licores', 'reportes/LibroSalida/', 'salida_lic.png', 'width=\'60px\' height=\'60px\'', 'primary', '0', 0, 1),
	(83, 'COMANDAS ANULADAS', 'Reportes', 'Restaurant', 'reportes/Rest_Anulados/', 'Restaurante/default.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(84, 'RANKING DE PRODUCTOS', 'Reportes', 'Restaurant', 'reportes/RankingProductos/', 'ranking.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(85, 'RESUMEN GLOBAL', 'Reportes', 'Restaurant', 'reportes/VentaGlobalProducto2/', 'ventasG.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(86, 'RESUMEN PRODUCTOS', 'Reportes', 'Restaurant', 'reportes/ResumenPedidos/', 'resumenP.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(87, 'ZONAS', 'Restaurant', NULL, 'rest_zonas/', 'Restaurante/restaurant-icon.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 1),
	(88, 'MESAS', 'Restaurant', NULL, 'rest_mesas/', 'Restaurante/dining4.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 2),
	(89, 'COMANDAS', 'Restaurant', NULL, 'pedidos/', 'Restaurante/icono-meseros.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 3),
	(90, 'MOTIVO ANULACION', 'Restaurant', NULL, 'rest_motivo_anul/', 'Restaurante/remove.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 4),
	(91, 'COCINA', 'Restaurant', NULL, 'cocina/', 'Restaurante/kitchen.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 5),
	(92, 'PERSONAL', 'Restaurant', NULL, 'rest_personal/', 'Restaurante/user group.png', 'width=\'60px\' height=\'60px\'', 'primary', '0', 0, 6),
	(93, 'ASIGNAR PUNTOS', 'Restaurant', NULL, 'rest_puntos/index', 'Restaurante/porcentaje.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 7),
	(94, 'HORARIOS', 'Restaurant', NULL, 'rest_horarios/index', 'Restaurante/timer.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 8),
	(95, 'PROCESAR INVENTARIO', 'Almacen', NULL, 'procesar/', 'Restaurante/procesar_inv.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 12),
	(96, 'CARGAR PLATOS', 'Almacen', NULL, 'conceptos/cargarPlatos/', 'Restaurante/add_plate.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 13),
	(97, 'CARACTERISTICAS', 'Almacen', NULL, 'rest_caracteristicas/', 'Restaurante/caracteristicas.png', 'width=\'60px\' height=\'60px\'', 'primary', '1', 0, 13);
/*!40000 ALTER TABLE `menu_sist2` ENABLE KEYS */;

-- Volcando estructura para tabla administra.motivo_retiro
CREATE TABLE IF NOT EXISTS `motivo_retiro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.motivo_retiro: ~0 rows (aproximadamente)
DELETE FROM `motivo_retiro`;
/*!40000 ALTER TABLE `motivo_retiro` DISABLE KEYS */;
/*!40000 ALTER TABLE `motivo_retiro` ENABLE KEYS */;

-- Volcando estructura para tabla administra.movimientos_bancos
CREATE TABLE IF NOT EXISTS `movimientos_bancos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banco_id` int(11) NOT NULL,
  `tipo_movimiento_id` int(11) NOT NULL,
  `caja_id` int(11) DEFAULT NULL,
  `fecha_at` date NOT NULL,
  `tipo_pago_id` int(11) NOT NULL,
  `referencia` varchar(20) CHARACTER SET utf8 NOT NULL,
  `credito` decimal(18,2) DEFAULT NULL,
  `credito_dolar` decimal(18,2) DEFAULT NULL,
  `debito` decimal(18,2) DEFAULT NULL,
  `descripcion` varchar(250) CHARACTER SET utf8 NOT NULL,
  `beneficiario` int(11) NOT NULL,
  `entidad_id` int(11) DEFAULT NULL,
  `origen` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `documento` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `efectivo` decimal(18,2) DEFAULT NULL,
  `cheque_mismo_banco` decimal(18,2) DEFAULT NULL,
  `cheque_otro_banco` decimal(18,2) DEFAULT NULL,
  `islr` decimal(18,2) DEFAULT NULL,
  `comision` decimal(18,2) DEFAULT NULL,
  `fecha_cheque_mismo_banco` date DEFAULT NULL,
  `fecha_cheque_otro_banco` date DEFAULT NULL,
  `conciliado` tinyint(1) DEFAULT NULL,
  `fecha_conciliado` date DEFAULT NULL,
  `islrnc` decimal(18,2) DEFAULT NULL,
  `riva` decimal(18,2) DEFAULT NULL,
  `estatus` tinyint(4) DEFAULT '0' COMMENT '0=activo 1=anulado',
  `fecha_transaccion` date DEFAULT NULL,
  `imagen` varchar(255) DEFAULT 'default.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.movimientos_bancos: ~0 rows (aproximadamente)
DELETE FROM `movimientos_bancos`;
/*!40000 ALTER TABLE `movimientos_bancos` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimientos_bancos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.movimientos_caja
CREATE TABLE IF NOT EXISTS `movimientos_caja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caja_id` int(11) NOT NULL,
  `fecha_at` date NOT NULL,
  `fecha_in` datetime DEFAULT NULL,
  `hora_in` time DEFAULT NULL,
  `tipo_pago_id` int(11) NOT NULL,
  `tipo_movimiento_id` int(11) NOT NULL,
  `banco_id` int(11) DEFAULT NULL,
  `referencia` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `debito` decimal(18,2) DEFAULT NULL,
  `credito` decimal(18,2) DEFAULT NULL,
  `credito_dolar` decimal(18,2) DEFAULT NULL,
  `descripcion` varchar(150) CHARACTER SET utf8 NOT NULL,
  `origen` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `numero_origen` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `entidad_id` int(11) DEFAULT NULL,
  `islrnc` decimal(18,2) DEFAULT NULL,
  `riva` decimal(18,2) DEFAULT NULL,
  `fecha_transaccion` date DEFAULT NULL,
  `imagen` varchar(50) DEFAULT 'default.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.movimientos_caja: ~15 rows (aproximadamente)
DELETE FROM `movimientos_caja`;
/*!40000 ALTER TABLE `movimientos_caja` DISABLE KEYS */;
INSERT INTO `movimientos_caja` (`id`, `caja_id`, `fecha_at`, `fecha_in`, `hora_in`, `tipo_pago_id`, `tipo_movimiento_id`, `banco_id`, `referencia`, `debito`, `credito`, `credito_dolar`, `descripcion`, `origen`, `numero_origen`, `entidad_id`, `islrnc`, `riva`, `fecha_transaccion`, `imagen`) VALUES
	(1, 1, '2019-07-18', NULL, NULL, 1, 1, 0, '0', 0.00, 106955.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '1', 0, 0.00, NULL, NULL, 'default.png'),
	(2, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 58155.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '3', 0, 0.00, NULL, NULL, 'default.png'),
	(3, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 58155.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '4', 0, 0.00, NULL, NULL, 'default.png'),
	(4, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 58155.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '5', 0, 0.00, NULL, NULL, 'default.png'),
	(5, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 79480.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '6', 0, 0.00, NULL, NULL, 'default.png'),
	(6, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 54835.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '7', 0, 0.00, NULL, NULL, 'default.png'),
	(7, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 86710.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '8', 0, 0.00, NULL, NULL, 'default.png'),
	(8, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 58155.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '9', 0, 0.00, NULL, NULL, 'default.png'),
	(9, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 95155.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '10', 0, 0.00, NULL, NULL, 'default.png'),
	(10, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 157880.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '11', 0, 0.00, NULL, NULL, 'default.png'),
	(11, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 67388.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '12', 0, 0.00, NULL, NULL, 'default.png'),
	(13, 1, '2019-07-30', NULL, NULL, 1, 2, 0, '0', 67388.00, 0.00, NULL, 'DEVOLUCION FACTURA', 'DEVOLUCION', '14', 0, 0.00, NULL, NULL, 'default.png'),
	(14, 1, '2019-07-30', NULL, NULL, 1, 1, 0, '0', 0.00, 67388.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '15', 0, 0.00, NULL, NULL, 'default.png'),
	(15, 1, '2019-07-30', NULL, NULL, 1, 2, 0, '0', 67388.00, 0.00, NULL, 'DEVOLUCION FACTURA', 'DEVOLUCION', '16', 0, 0.00, NULL, NULL, 'default.png'),
	(16, 1, '2019-08-07', NULL, NULL, 1, 1, 0, '0', 0.00, 84738.00, NULL, 'PAGO DE FACTURA', 'FACTURA', '17', 0, 0.00, NULL, NULL, 'default.png');
/*!40000 ALTER TABLE `movimientos_caja` ENABLE KEYS */;

-- Volcando estructura para tabla administra.movimiento_deposito
CREATE TABLE IF NOT EXISTS `movimiento_deposito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depositos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `existencia` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `depositos_id` (`depositos_id`,`conceptos_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COMMENT='tabla que almacena las existencia de los conceptos por deposito';

-- Volcando datos para la tabla administra.movimiento_deposito: ~9 rows (aproximadamente)
DELETE FROM `movimiento_deposito`;
/*!40000 ALTER TABLE `movimiento_deposito` DISABLE KEYS */;
INSERT INTO `movimiento_deposito` (`id`, `depositos_id`, `conceptos_id`, `existencia`) VALUES
	(1, 1, 1, 4996.00),
	(2, 1, 2, 39999.00),
	(3, 1, 3, 499.00),
	(4, 1, 4, 20002.00),
	(5, 1, 5, 37670.00),
	(6, 1, 6, 0.00),
	(7, 1, 7, 41.00),
	(8, 2, 1, 50.00),
	(9, 2, 2, 20000.00),
	(10, 3, 1, 15000.00);
/*!40000 ALTER TABLE `movimiento_deposito` ENABLE KEYS */;

-- Volcando estructura para tabla administra.movimiento_inventario
CREATE TABLE IF NOT EXISTS `movimiento_inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conceptos_id` int(11) NOT NULL,
  `fecha_at` date DEFAULT NULL,
  `depositos_id` int(11) NOT NULL,
  `tipo` varchar(4) CHARACTER SET utf8 NOT NULL,
  `origen` varchar(10) CHARACTER SET utf8 NOT NULL,
  `documento` int(11) NOT NULL,
  `tercero` int(11) DEFAULT NULL COMMENT 'clientes,proveedores,ajuste, recepcion',
  `cantidad` decimal(12,2) NOT NULL,
  `costo` decimal(12,2) DEFAULT NULL,
  `costo_dolar` decimal(12,2) DEFAULT '0.00',
  `venta` decimal(12,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.movimiento_inventario: ~41 rows (aproximadamente)
DELETE FROM `movimiento_inventario`;
/*!40000 ALTER TABLE `movimiento_inventario` DISABLE KEYS */;
INSERT INTO `movimiento_inventario` (`id`, `conceptos_id`, `fecha_at`, `depositos_id`, `tipo`, `origen`, `documento`, `tercero`, `cantidad`, `costo`, `costo_dolar`, `venta`) VALUES
	(1, 2, '2019-07-18', 1, 'SAL', 'FAC', 1, 1, 1.00, 25000.00, 0.00, 37000.00),
	(2, 5, '2019-07-18', 1, 'SAL', 'FAC', 1, 1, 1.00, 62475.00, 0.00, 69955.00),
	(3, 3, '2019-07-18', 1, 'ENT', 'CAR', 1, NULL, 6.00, 14960.00, 0.00, 0.00),
	(4, 2, '2019-07-18', 1, 'ENT', 'CAR', 2, NULL, 8.00, 25000.00, 0.00, 0.00),
	(5, 2, '2019-07-19', 1, 'ENT', 'CAR', 3, NULL, 5.00, 25000.00, 0.00, 0.00),
	(6, 2, '2019-07-19', 1, 'SAL', 'AJU', 1, NULL, -7.00, 25000.00, 0.00, 0.00),
	(7, 2, '2019-07-25', 1, 'SAL', 'FAC', 2, 1, 1.00, 25000.00, 4.24, 0.00),
	(8, 1, '2019-07-30', 1, 'SAL', 'FAC', 3, 1, 1.00, 36000.00, 0.00, 41400.00),
	(9, 3, '2019-07-30', 1, 'SAL', 'FAC', 3, 1, 1.00, 14960.00, 0.00, 16755.00),
	(10, 1, '2019-07-30', 1, 'SAL', 'FAC', 4, 1, 1.00, 36000.00, 0.00, 41400.00),
	(11, 3, '2019-07-30', 1, 'SAL', 'FAC', 4, 1, 1.00, 14960.00, 0.00, 16755.00),
	(12, 1, '2019-07-30', 1, 'SAL', 'FAC', 5, 1, 1.00, 36000.00, 0.00, 41400.00),
	(13, 3, '2019-07-30', 1, 'SAL', 'FAC', 5, 1, 1.00, 14960.00, 0.00, 16755.00),
	(14, 1, '2019-07-30', 1, 'SAL', 'FAC', 6, 1, 1.00, 36000.00, 0.00, 41400.00),
	(15, 4, '2019-07-30', 1, 'SAL', 'FAC', 6, 1, 1.00, 34000.00, 0.00, 38080.00),
	(16, 4, '2019-07-30', 1, 'SAL', 'FAC', 7, 1, 1.00, 34000.00, 0.00, 38080.00),
	(17, 3, '2019-07-30', 1, 'SAL', 'FAC', 7, 1, 1.00, 14960.00, 0.00, 16755.00),
	(18, 3, '2019-07-30', 1, 'SAL', 'FAC', 8, 1, 1.00, 14960.00, 0.00, 16755.00),
	(19, 5, '2019-07-30', 1, 'SAL', 'FAC', 8, 1, 1.00, 62475.00, 0.00, 69955.00),
	(20, 1, '2019-07-30', 1, 'SAL', 'FAC', 9, 1, 1.00, 36000.00, 0.00, 41400.00),
	(21, 3, '2019-07-30', 1, 'SAL', 'FAC', 9, 1, 1.00, 14960.00, 0.00, 16755.00),
	(22, 1, '2019-07-30', 1, 'SAL', 'FAC', 10, 1, 1.00, 36000.00, 0.00, 41400.00),
	(23, 2, '2019-07-30', 1, 'SAL', 'FAC', 10, 1, 1.00, 25000.00, 0.00, 37000.00),
	(24, 3, '2019-07-30', 1, 'SAL', 'FAC', 10, 1, 1.00, 14960.00, 0.00, 16755.00),
	(25, 1, '2019-07-30', 1, 'SAL', 'FAC', 11, 1, 2.00, 36000.00, 0.00, 41400.00),
	(26, 2, '2019-07-30', 1, 'SAL', 'FAC', 11, 1, 1.00, 25000.00, 0.00, 37000.00),
	(27, 4, '2019-07-30', 1, 'SAL', 'FAC', 11, 1, 1.00, 34000.00, 0.00, 38080.00),
	(28, 1, '2019-07-30', 1, 'SAL', 'FAC', 12, 1, 1.00, 50578.00, 0.00, 58093.00),
	(30, 1, '2019-07-30', 1, 'ENT', 'NC', 14, 1, 1.00, 50578.00, 0.00, 58093.00),
	(31, 1, '2019-07-30', 1, 'SAL', 'FAC', 15, 1, 1.00, 50578.00, 0.00, 58093.00),
	(32, 1, '2019-07-30', 1, 'ENT', 'NC', 16, 1, 1.00, 50578.00, 0.00, 58093.00),
	(33, 1, '2019-08-07', 1, 'SAL', 'FAC', 17, 1, 1.00, 63600.00, 0.00, 73050.00),
	(34, 1, '2019-08-12', 1, 'ENT', 'COM', 1, 1, 1.00, 57664.00, 5.00, 0.00),
	(35, 4, '2019-08-12', 1, 'ENT', 'COM', 1, 1, 1.00, 60000.00, 4.00, 0.00),
	(36, 4, '2019-08-12', 1, 'ENT', 'COM', 2, 1, 1.00, 70000.00, 4.41, 0.00),
	(37, 3, '2019-08-12', 1, 'ENT', 'COM', 3, 1, 1.00, 25000.00, 1.76, 0.00),
	(38, 2, '2019-08-12', 1, 'ENT', 'COM', 4, 1, 1.00, 60000.00, 4.00, 0.00),
	(39, 5, '2019-08-12', 1, 'ENT', 'COM', 5, 1, 1.00, 150000.00, 7.35, 0.00),
	(40, 7, '2019-08-12', 1, 'ENT', 'COM', 6, 1, 40.00, 30000.00, 1.47, 0.00),
	(41, 7, '2019-08-12', 1, 'ENT', 'COM', 7, 1, 1.00, 40000.00, 1.47, 0.00),
	(42, 4, '2019-08-12', 1, 'ENT', 'COM', 8, 1, 1.00, 80000.00, 4.41, 0.00);
/*!40000 ALTER TABLE `movimiento_inventario` ENABLE KEYS */;

-- Volcando estructura para tabla administra.niveles
CREATE TABLE IF NOT EXISTS `niveles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla administra.niveles: ~3 rows (aproximadamente)
DELETE FROM `niveles`;
/*!40000 ALTER TABLE `niveles` DISABLE KEYS */;
INSERT INTO `niveles` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Gerencia de Administracion', NULL),
	(2, 'Gerencia de Tecnologia', NULL),
	(3, 'Gerencia de Desarrollo', NULL);
/*!40000 ALTER TABLE `niveles` ENABLE KEYS */;

-- Volcando estructura para tabla administra.nivel_academico
CREATE TABLE IF NOT EXISTS `nivel_academico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.nivel_academico: ~4 rows (aproximadamente)
DELETE FROM `nivel_academico`;
/*!40000 ALTER TABLE `nivel_academico` DISABLE KEYS */;
INSERT INTO `nivel_academico` (`id`, `nombre`) VALUES
	(1, 'EDUC. BASICA'),
	(2, 'BACHILLER'),
	(3, 'T.S.U'),
	(4, 'UNIVERSITARIO');
/*!40000 ALTER TABLE `nivel_academico` ENABLE KEYS */;

-- Volcando estructura para tabla administra.orden_pago
CREATE TABLE IF NOT EXISTS `orden_pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enc_compra_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `fecha_at` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `enc_compra_id` (`enc_compra_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.orden_pago: ~0 rows (aproximadamente)
DELETE FROM `orden_pago`;
/*!40000 ALTER TABLE `orden_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden_pago` ENABLE KEYS */;

-- Volcando estructura para tabla administra.parametros
CREATE TABLE IF NOT EXISTS `parametros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `max_porcentaje` decimal(10,2) DEFAULT NULL,
  `tipo_precio` text NOT NULL,
  `borrar_producto` int(11) DEFAULT '1',
  `direccionDescargos` varchar(50) DEFAULT NULL,
  `ImpresoraFiscal` varchar(50) DEFAULT NULL,
  `AutorizadoDevolucion` tinyint(4) DEFAULT '1',
  `AutorizadoReimpresion` tinyint(4) DEFAULT '1',
  `AutorizadoLimpiar` tinyint(4) DEFAULT '1',
  `nro_decimales` tinyint(4) DEFAULT '0',
  `index_exist` tinyint(4) DEFAULT '0',
  `ImpresoraPrecuenta` varchar(50) CHARACTER SET utf8mb4 NOT NULL DEFAULT 'windows',
  `verifica_exist` tinyint(4) DEFAULT '0' COMMENT 'factura_manual',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.parametros: ~0 rows (aproximadamente)
DELETE FROM `parametros`;
/*!40000 ALTER TABLE `parametros` DISABLE KEYS */;
INSERT INTO `parametros` (`id`, `max_porcentaje`, `tipo_precio`, `borrar_producto`, `direccionDescargos`, `ImpresoraFiscal`, `AutorizadoDevolucion`, `AutorizadoReimpresion`, `AutorizadoLimpiar`, `nro_decimales`, `index_exist`, `ImpresoraPrecuenta`, `verifica_exist`) VALUES
	(1, 20.00, 'PRECIO A', 0, 'http://localhost/diansoft/descargos/', NULL, 0, 1, 0, 0, 0, 'TICKET-80-MM', 0);
/*!40000 ALTER TABLE `parametros` ENABLE KEYS */;

-- Volcando estructura para tabla administra.parametros_facturacion
CREATE TABLE IF NOT EXISTS `parametros_facturacion` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `get_size` varchar(50) DEFAULT NULL,
  `get_nota` varchar(50) DEFAULT NULL,
  `get_lotes` int(11) DEFAULT NULL,
  `get_vencimiento` int(11) DEFAULT NULL,
  `get_vendedor` int(11) DEFAULT NULL,
  `get_pago` int(11) DEFAULT NULL,
  `set_filas` int(11) DEFAULT NULL,
  `get_anulada` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.parametros_facturacion: ~0 rows (aproximadamente)
DELETE FROM `parametros_facturacion`;
/*!40000 ALTER TABLE `parametros_facturacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametros_facturacion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.perfil
CREATE TABLE IF NOT EXISTS `perfil` (
  `id` int(2) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del perfil',
  `perfil` varchar(45) NOT NULL COMMENT 'Nombre del perfil',
  `estado` int(1) NOT NULL DEFAULT '1' COMMENT 'Indica si el perfil esta activo o inactivo',
  `plantilla` varchar(45) DEFAULT 'default' COMMENT 'Plantilla para usar en el sitema',
  `perfil_at` datetime DEFAULT NULL COMMENT 'Fecha de registro del perfil',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene los grupos de los usuarios';

-- Volcando datos para la tabla administra.perfil: ~9 rows (aproximadamente)
DELETE FROM `perfil`;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` (`id`, `perfil`, `estado`, `plantilla`, `perfil_at`) VALUES
	(1, 'Super Usuario', 1, 'default', '2014-01-01 00:00:01'),
	(2, 'Usuario Estandar', 1, 'default', '2016-02-15 13:35:56'),
	(3, 'gerencia', 1, 'default', '2016-02-18 14:30:24'),
	(4, 'Tecnico', 1, 'default', '2016-10-24 14:51:30'),
	(5, 'Mesonero', 1, 'mesonero', '2016-06-13 16:07:47'),
	(6, 'Supervisor', 1, 'mesonero', '2016-07-07 16:03:20'),
	(7, 'Cocinero', 1, 'cocina', '2017-05-30 09:09:21'),
	(8, 'cajera', 1, 'default', '2017-05-31 11:01:38'),
	(9, 'consulta', 1, 'default', '2018-03-21 15:50:16');
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;

-- Volcando estructura para tabla administra.periodo_pago
CREATE TABLE IF NOT EXISTS `periodo_pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.periodo_pago: ~2 rows (aproximadamente)
DELETE FROM `periodo_pago`;
/*!40000 ALTER TABLE `periodo_pago` DISABLE KEYS */;
INSERT INTO `periodo_pago` (`id`, `nombre`) VALUES
	(1, 'Quincenal'),
	(2, 'Semanal');
/*!40000 ALTER TABLE `periodo_pago` ENABLE KEYS */;

-- Volcando estructura para tabla administra.personal
CREATE TABLE IF NOT EXISTS `personal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` int(11) NOT NULL,
  `rif` varchar(10) DEFAULT NULL,
  `nombres` varchar(250) NOT NULL,
  `apellidos` varchar(250) NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `estado_civil` varchar(20) NOT NULL,
  `fecha_at` datetime DEFAULT NULL,
  `fecha_in` datetime DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `lugar_nacimiento` varchar(250) NOT NULL,
  `edad` int(4) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono1` varchar(20) NOT NULL,
  `telefono2` varchar(20) DEFAULT NULL,
  `email_personal` varchar(250) DEFAULT NULL,
  `email_empresa` varchar(250) DEFAULT NULL,
  `fecha_ingreso` date NOT NULL,
  `tipo_empleado_id` int(8) NOT NULL,
  `departamentos_id` int(8) NOT NULL,
  `puesto_id` int(8) NOT NULL,
  `profesiones_id` int(8) DEFAULT NULL,
  `niveles_id` int(8) NOT NULL,
  `tipo_pago_id` int(8) DEFAULT NULL,
  `num_cuenta` text,
  `sueldo_mensual` decimal(12,2) NOT NULL,
  `sueldo_diario` decimal(12,2) NOT NULL,
  `tipo_estatus_id` int(11) NOT NULL,
  `tipo_cuenta_id` int(11) DEFAULT NULL,
  `nivel_academico_id` int(11) NOT NULL,
  `tipo_nomina_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla administra.personal: ~0 rows (aproximadamente)
DELETE FROM `personal`;
/*!40000 ALTER TABLE `personal` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal` ENABLE KEYS */;

-- Volcando estructura para tabla administra.precios_conceptos
CREATE TABLE IF NOT EXISTS `precios_conceptos` (
  `id` int(11) DEFAULT NULL,
  `valor_activo_id` int(11) DEFAULT NULL,
  `conceptos_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.precios_conceptos: ~0 rows (aproximadamente)
DELETE FROM `precios_conceptos`;
/*!40000 ALTER TABLE `precios_conceptos` DISABLE KEYS */;
/*!40000 ALTER TABLE `precios_conceptos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.presentaciones
CREATE TABLE IF NOT EXISTS `presentaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conceptos_id` int(11) NOT NULL DEFAULT '0',
  `nombre` varchar(255) NOT NULL DEFAULT 'default',
  `modificador` decimal(12,2) DEFAULT '1.00',
  `utilidad` decimal(12,2) DEFAULT '1.00',
  PRIMARY KEY (`id`),
  KEY `conceptos_id` (`conceptos_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='presnetaciones de cada producto';

-- Volcando datos para la tabla administra.presentaciones: ~2 rows (aproximadamente)
DELETE FROM `presentaciones`;
/*!40000 ALTER TABLE `presentaciones` DISABLE KEYS */;
INSERT INTO `presentaciones` (`id`, `conceptos_id`, `nombre`, `modificador`, `utilidad`) VALUES
	(3, 3, 'prueba 2', 1.00, 1.00),
	(4, 3, 'prueba 3', 1.00, 1.00);
/*!40000 ALTER TABLE `presentaciones` ENABLE KEYS */;

-- Volcando estructura para tabla administra.profesiones
CREATE TABLE IF NOT EXISTS `profesiones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla administra.profesiones: ~4 rows (aproximadamente)
DELETE FROM `profesiones`;
/*!40000 ALTER TABLE `profesiones` DISABLE KEYS */;
INSERT INTO `profesiones` (`id`, `nombre`) VALUES
	(1, 'Administrador'),
	(2, 'Contador'),
	(3, 'Ingeniero de Sistemas'),
	(4, 'Ingeniero Industrial');
/*!40000 ALTER TABLE `profesiones` ENABLE KEYS */;

-- Volcando estructura para tabla administra.proveedor
CREATE TABLE IF NOT EXISTS `proveedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  `tipo_proveedor_id` int(11) NOT NULL,
  `fecha_at` date DEFAULT NULL,
  `cedula` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `rif` varchar(20) CHARACTER SET utf8 NOT NULL,
  `telefono_oficina` varchar(20) CHARACTER SET utf8 NOT NULL,
  `telefono_celular` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `telefono_casa` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `direccion` varchar(250) CHARACTER SET utf8 NOT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  `contacto` varchar(150) CHARACTER SET utf8 NOT NULL,
  `telefono_contacto1` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `telefono_contacto2` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `correo_electronico` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `cuenta_bancaria` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `tipo_retencion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`,`rif`),
  KEY `cedula_2` (`cedula`,`rif`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.proveedor: ~0 rows (aproximadamente)
DELETE FROM `proveedor`;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` (`id`, `nombre`, `tipo_proveedor_id`, `fecha_at`, `cedula`, `rif`, `telefono_oficina`, `telefono_celular`, `telefono_casa`, `direccion`, `estatus`, `contacto`, `telefono_contacto1`, `telefono_contacto2`, `correo_electronico`, `cuenta_bancaria`, `tipo_retencion_id`) VALUES
	(1, 'SOMOS SISTEMAS C.A', 1, '2019-07-11', 'V00000000', 'J000000000', '(0000) 000-0000', NULL, NULL, 'La Asuncion', 1, 'JOSEITO', NULL, NULL, NULL, NULL, 20);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;

-- Volcando estructura para tabla administra.puesto
CREATE TABLE IF NOT EXISTS `puesto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla administra.puesto: ~9 rows (aproximadamente)
DELETE FROM `puesto`;
/*!40000 ALTER TABLE `puesto` DISABLE KEYS */;
INSERT INTO `puesto` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Administrador', NULL),
	(2, 'Supervisor', NULL),
	(3, 'Analista', NULL),
	(4, 'Tecnico', NULL),
	(5, 'Cocinero', NULL),
	(6, 'Barman', NULL),
	(7, 'Mesonero', NULL),
	(8, 'Ayudante', NULL),
	(9, 'Chef', NULL);
/*!40000 ALTER TABLE `puesto` ENABLE KEYS */;

-- Volcando estructura para tabla administra.recurso
CREATE TABLE IF NOT EXISTS `recurso` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del recurso',
  `modulo` varchar(45) DEFAULT NULL COMMENT 'Nombre del módulo',
  `controlador` varchar(45) DEFAULT NULL COMMENT 'Nombre del controlador',
  `accion` varchar(45) DEFAULT NULL COMMENT 'Nombre de la acción',
  `recurso` varchar(100) DEFAULT NULL COMMENT 'Nombre del recurso',
  `descripcion` text NOT NULL COMMENT 'Descripción del recurso',
  `activo` int(1) NOT NULL DEFAULT '1' COMMENT 'Estado del recurso',
  `custom` int(1) DEFAULT '1',
  `recurso_at` datetime DEFAULT NULL COMMENT 'Fecha de registro',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=521 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene los recursos a los que acceden los usuarios';

-- Volcando datos para la tabla administra.recurso: ~515 rows (aproximadamente)
DELETE FROM `recurso`;
/*!40000 ALTER TABLE `recurso` DISABLE KEYS */;
INSERT INTO `recurso` (`id`, `modulo`, `controlador`, `accion`, `recurso`, `descripcion`, `activo`, `custom`, `recurso_at`) VALUES
	(1, '*', 'NULL', 'NULL', '*', 'Comodï¿½n para la administraciï¿½n total (usar con cuidado)', 1, NULL, '2014-01-01 00:00:01'),
	(2, 'dashboard', '*', '*', 'dashboard/*/*', 'Pagina príncipal del sistema', 1, NULL, '2014-01-01 00:00:01'),
	(3, 'sistema', 'mi_cuenta', '*', 'sistema/mi_cuenta/*', 'Gestión de la cuenta del usuario logueado', 1, NULL, '2014-01-01 00:00:01'),
	(4, 'sistema', 'accesos', '*', 'sistema/accesos/*', 'Submódulo\r\n para la gestión de ingresos al sistema', 1, NULL, '2014-01-01 00:00:01'),
	(5, 'sistema', 'auditorias', '*', 'sistema/auditorias/*', 'Submódulo para el control de las acciones de los usuarios', 1, NULL, '2014-01-01 00:00:01'),
	(6, 'sistema', 'backups', '*', 'sistema/backups/*', 'Submódulo para la gestión de las copias de seguridad', 1, NULL, '2014-01-01 00:00:01'),
	(7, 'sistema', 'mantenimiento', '*', 'sistema/mantenimiento/*', 'Submódulo para el mantenimiento de las tablas', 1, NULL, '2014-01-01 00:00:01'),
	(8, 'sistema', 'menus', '*', 'sistema/menus/*', 'Submódulo del sistema para la creación de menú', 1, NULL, '2014-01-01 00:00:01'),
	(9, 'sistema', 'perfiles', '*', 'sistema/perfiles/*', 'Submódulo del sistema para los perfiles de usuarios', 1, NULL, '2014-01-01 00:00:01'),
	(10, 'sistema', 'permisos', '*', 'sistema/permisos/*', 'Submódulo del sistema para asignar recursos a los perfiles', 1, NULL, '2014-01-01 00:00:01'),
	(11, 'sistema', 'recursos', '*', 'sistema/recursos/*', 'Submódulo del sistema para la gestión de los recursos', 1, NULL, '2014-01-01 00:00:01'),
	(12, 'sistema', 'usuarios', '*', 'sistema/usuarios/*', 'Submódulo para la administración de los usuarios del sistema', 1, NULL, '2014-01-01 00:00:01'),
	(13, 'sistema', 'sucesos', '*', 'sistema/sucesos/*', 'Submódulo para el listado de los logs del sistema', 1, NULL, '2014-01-01 00:00:01'),
	(14, 'sistema', 'configuracion', '*', 'sistema/configuracion/*', 'Submódulo para la configuración de la aplicación (.ini)', 1, NULL, '2014-01-01 00:00:01'),
	(16, 'Almacen', 'index', 'menuAlmacen', 'index/menuAlmacen', 'MENU ALAMACEN', 1, NULL, '2016-02-15 14:34:31'),
	(17, 'Caja y Banco', 'index', 'menuCajaBanco', 'index/menuCajaBanco', 'MODULO DE CAJA Y BANCO', 1, NULL, '2016-02-16 09:00:51'),
	(18, 'Compras', 'index', 'menuCompras', 'index/menuCompras', 'MODULO DE COMPRAS', 1, 0, '2016-02-16 09:02:42'),
	(19, 'Ventas', 'index', 'menuVentas', 'index/menuVentas', 'MODULO DE VENTAS', 1, 0, '2016-02-16 09:03:07'),
	(20, 'Reportes', 'index', 'menuReportes', 'index/menuReportes', 'MENU DE REPORTES', 1, 0, '2016-02-16 09:23:47'),
	(22, 'Almacen', 'conceptos', 'index', 'conceptos/index', 'LISTADO DE CONCEPTO', 1, NULL, '2016-03-01 15:40:26'),
	(23, 'Almacen', 'grupos', 'index', 'grupos/index', 'LISTADO DE GRUPOS', 1, 0, '2016-03-01 16:00:14'),
	(24, 'Almacen', 'conceptos', 'crear', 'conceptos/crear', 'CREAR CONCEPTO', 1, NULL, '2016-03-01 16:09:26'),
	(25, 'Almacen', 'conceptos', 'editar', 'conceptos/editar', 'EDITAR CONCEPTO', 1, 0, '2016-03-01 16:20:55'),
	(26, 'Restaurant', 'index', 'menuRestaurante', 'index/menuRestaurante', 'Menú para el modulo Restaurant', 1, 0, '2016-05-10 15:00:32'),
	(27, 'Restaurant', 'rest_mesas', 'confirmar_anulacion', 'rest_mesas/confirmar_anulacion', 'Permite anular todos los pedidos asociados a una mesa', 1, 0, '2016-05-17 10:58:50'),
	(28, 'Restaurant', 'pedidos', 'index', 'pedidos/index', 'index de pedido', 1, NULL, '2016-05-18 11:10:29'),
	(29, 'Restaurant', 'pedidos', 'crear', 'pedidos/crear', 'accion pedidos/crear', 1, 0, '2016-05-18 11:13:21'),
	(30, 'Restaurant', 'rest_mesas', 'getMotivo', 'rest_mesas/getMotivo', 'Pantalla para anular la mesa/ obtiene teclado touch', 1, NULL, '2016-05-18 11:32:57'),
	(32, 'Restaurant', 'rest_mesas', 'autorizacion', 'rest_mesas/autorizacion', 'Vista para autenticar usuario autorizador de la anulacion', 1, 0, '2016-05-18 14:33:07'),
	(33, 'Restaurant', 'rest_mesas', 'validar_autorizador', 'rest_mesas/validar_autorizador', 'Valida el usuario que esta autorizando la anulacion de la mesa', 1, 0, '2016-05-18 14:35:23'),
	(34, 'Empresa', 'empresa', '*', 'empresa/*', 'inf empresa', 1, NULL, '2016-06-09 15:13:28'),
	(36, 'Restaurant', 'pedidos', 'getSubgrupos', 'pedidos/getSubgrupos', 'Accion que permite ver los subgrupos de determinado grupo', 1, 0, '2016-06-13 15:13:12'),
	(37, 'Restaurant', 'pedidos', 'limpiar', 'pedidos/limpiar', 'Actualiza el estatus de la mesa a Disponible', 1, 0, '2016-06-13 15:18:32'),
	(38, 'Restaurant', 'pedidos', 'crearMovil', 'pedidos/crearMovil', 'Vista crear adaptada a tablets y smartphone', 1, 0, '2016-06-13 15:19:33'),
	(39, 'Restaurant', 'pedidos', 'anularP', 'pedidos/anularP', 'Anula un producto en especifico de la mesa', 1, 0, '2016-06-13 15:20:10'),
	(40, 'Restaurant', 'pedidos', 'anularTodo', 'pedidos/anularTodo', 'Anula los productos escogidos en una mesa', 1, 0, '2016-06-13 15:21:08'),
	(41, 'Restaurant', 'pedidos', 'getGrupos', 'pedidos/getGrupos', 'Muestra los grupos en la vista pedidos/crear', 1, 0, '2016-06-13 15:21:50'),
	(42, 'Restaurant', 'pedidos', 'getGruposMovil', 'pedidos/getGruposMovil', 'Muestra los grupos en la vista pedidos/crearMovil', 1, 0, '2016-06-13 15:22:16'),
	(43, 'Restaurant', 'pedidos', 'getSubgruposMovil', 'pedidos/getSubgruposMovil', 'Accion que permite ver los subgrupos de determinado grupo, adaptado a tablets y smartphone', 1, 0, '2016-06-13 15:27:17'),
	(44, 'Restaurant', 'pedidos', 'getArticulo', 'pedidos/getArticulo', 'devuelve los pedidos asociados a una mesa', 1, 0, '2016-06-13 15:28:07'),
	(45, 'Restaurant', 'pedidos', 'getArticulos', 'pedidos/getArticulos', 'devuelve los articulos asociados a un grupo/subgrupo especifico', 1, 0, '2016-06-13 15:29:21'),
	(46, 'Restaurant', 'pedidos', 'getArticulosMovil', 'pedidos/getArticulosMovil', 'devuelve los articulos asociados a un grupo/subgrupo especifico (para tablet o smartphone)', 1, 0, '2016-06-13 15:29:55'),
	(47, 'Restaurant', 'pedidos', 'enviarP', 'pedidos/enviarP', 'envia los productos en estatus nuevo a la cocina', 1, 0, '2016-06-13 15:31:38'),
	(48, 'Restaurant', 'pedidos', 'caracteristicas', 'pedidos/caracteristicas', 'devuelve las caracteristicas del producto', 1, 0, '2016-06-13 15:32:42'),
	(49, 'Restaurant', 'pedidos', 'detalle_producto', 'pedidos/detalle_producto', 'Muestra el detalle de un producto en especifico', 1, 0, '2016-06-13 15:33:23'),
	(50, 'Restaurant', 'pedidos', 'confirmarTxProd', 'pedidos/confirmarTxProd', 'Confirma la transferencia del producto a otra mesa', 1, 0, '2016-06-13 15:34:11'),
	(51, 'Restaurant', 'pedidos', 'anularPE', 'pedidos/anularPE', 'Anular productos con estatus distinto a nuevo', 1, 0, '2016-06-13 15:53:38'),
	(52, 'Restaurant', 'rest_mesas', 'transferencia', 'rest_mesas/transferencia', 'Transferir pedido de mesa', 1, 0, '2016-06-13 17:01:39'),
	(53, 'Restaurant', 'rest_mesas', 'getMotivoMovil', 'rest_mesas/getMotivoMovil', 'VIsta para introducir el motivo de una anulacion o transferencia desde smartphone o tablet', 1, 0, '2016-06-16 11:35:12'),
	(54, 'Restaurant', 'menu', 'principal', 'menu/principal', 'Menu del Cliente', 1, 0, '2016-07-07 17:03:05'),
	(55, 'Restaurant', 'rest_mesas', 'transferir_mesa', 'rest_mesas/transferir_mesa', 'Para transferir mesas a otras mesas disponibles', 1, 0, '2016-08-01 15:31:29'),
	(56, 'Restaurant', 'rest_mesas', 'confirmar_transferencia', 'rest_mesas/confirmar_transferencia', 'confirmar transferencia con autorizacion de supervisor', 1, 0, '2016-08-01 15:38:56'),
	(57, 'Restaurant', 'pedidos', 'getObservacionMovil', 'pedidos/getObservacionMovil', 'Para Cerrar Mesa', 1, NULL, '2016-08-15 11:41:28'),
	(58, 'Restaurant', 'pedidos', 'aumentarCantidad', 'pedidos/aumentarCantidad', 'aumenta cant pedido', 1, NULL, '2016-08-15 11:42:10'),
	(59, 'Restaurant', 'pedidos', 'disminuirCantidad', 'pedidos/disminuirCantidad', 'disminuye cant pedido', 1, NULL, '2016-08-15 11:42:40'),
	(60, 'Restaurant', 'pedidos', 'getObservacion', 'pedidos/getObservacion', 'cerrar pedido', 1, NULL, '2016-08-15 11:44:18'),
	(61, 'Restaurant', 'listados', '*', 'listados/*', 'listados', 1, 0, '2016-08-15 11:52:10'),
	(62, 'Restaurant', 'pedidos', 'getCliente', 'pedidos/getCliente', 'Datos del cliente para cerrar cuenta', 1, NULL, '2016-08-15 11:54:11'),
	(63, 'Restaurant', 'pedidos', 'cerrar_mesa', 'pedidos/cerrar_mesa', 'cerrar mesa para facturar', 1, 0, '2016-08-15 13:15:53'),
	(64, 'Parametrizacion', 'index', 'menuParametrizacion', 'index/menuParametrizacion', 'Para configurar los Detalles de la nomina', 1, 0, '2016-08-24 11:17:04'),
	(65, 'Formulacion', 'index', 'menuFormulacion', 'index/menuFormulacion', 'Nomina', 1, 0, '2016-08-24 11:18:15'),
	(66, 'Almacen', 'conceptos', 'newList', 'conceptos/newList', 'Listado de conceptos', 1, 0, '2017-02-02 09:08:03'),
	(67, 'Almacen', 'conceptos', 'getSubGrupos', 'conceptos/getSubGrupos', 'Obtener los subgrupos', 1, 0, '2017-02-02 09:10:40'),
	(68, 'Almacen', 'conceptos', 'guardarConcepto', 'conceptos/guardarConcepto', 'GUARDAR CONCEPTO', 1, 0, '2017-02-02 09:11:54'),
	(69, 'Almacen', 'conceptos', 'editarConcepto', 'conceptos/editarConcepto', 'EDITAR CONCEPTO', 1, 0, '2017-02-02 09:12:24'),
	(70, 'Almacen', 'conceptos', 'buscarConcepto', 'conceptos/buscarConcepto', 'BUSCAR CONCEPTO', 1, 0, '2017-02-02 09:13:01'),
	(71, 'Almacen', 'conceptos', 'listarExistencia', 'conceptos/listarExistencia', 'EXISTENCIA DE PRODUCTO', 1, 0, '2017-02-02 09:15:43'),
	(72, 'Almacen', 'conceptos', 'listarMovimiento', 'conceptos/listarMovimiento', 'LISTADO DE MOVIMIENTO DE INV', 1, 0, '2017-02-02 09:16:35'),
	(73, 'Almacen', 'conceptos', 'listarMovimientoFiltro', 'conceptos/listarMovimientoFiltro', 'LISTAR MOVIMIENTO', 1, 0, '2017-02-02 09:17:46'),
	(74, 'Almacen', 'conceptos', 'buscarConceptoCodigo', 'conceptos/buscarConceptoCodigo', 'BUSCAR CONCEPTO', 1, 0, '2017-02-02 09:18:32'),
	(75, 'Almacen', 'conceptos', 'listar', 'conceptos/listar', 'LISTADOS', 1, 0, '2017-02-02 09:18:56'),
	(76, 'Almacen', 'conceptos', 'modal', 'conceptos/modal', 'VENTANA MODAL', 1, 0, '2017-02-02 09:19:27'),
	(77, 'Almacen', 'conceptos', 'imprimir', 'conceptos/imprimir', 'IMPRIMIR', 1, 0, '2017-02-02 09:19:55'),
	(78, 'Almacen', 'conceptos', 'ver', 'conceptos/ver', 'VER CONCEPTO', 1, 0, '2017-02-02 09:20:23'),
	(79, 'Almacen', 'conceptos', 'upload', 'conceptos/upload', 'CARGAR', 1, 0, '2017-02-02 09:20:54'),
	(80, 'Almacen', 'conceptos', 'agregarNuevo', 'conceptos/agregarNuevo', 'AGREGAR NUEVO', 1, 0, '2017-02-02 09:22:28'),
	(81, 'Almacen', 'conceptos', 'listarLotes', 'conceptos/listarLotes', 'LISTADO DE LOTES', 1, 0, '2017-02-02 09:22:47'),
	(82, 'Almacen', 'conceptos', 'borrar', 'conceptos/borrar', 'BORRAR', 1, 0, '2017-02-02 09:23:08'),
	(83, 'Almacen', 'movimiento_inventario', 'index', 'movimiento_inventario/index', 'LISTADO DE MOVIMIENTO DE INVENTARIO', 1, 0, '2017-02-02 09:24:14'),
	(84, 'Almacen', 'movimiento_inventario', 'crear', 'movimiento_inventario/crear', 'CREAR MOV DE INVENTARIO', 1, 0, '2017-02-02 09:24:59'),
	(85, 'Almacen', 'movimiento_inventario', 'editar', 'movimiento_inventario/editar', 'EDITAR MOVIMIENTO DE INVENTARIO', 1, 0, '2017-02-02 10:29:10'),
	(86, 'Almacen', 'movimiento_inventario', 'borrar', 'movimiento_inventario/borrar', 'BORRAR MOVIMIENTO DE INVENTARIO', 1, 0, '2017-02-02 10:32:17'),
	(87, 'Almacen', 'movimiento_inventario', 'ver', 'movimiento_inventario/ver', 'VER MOVIMIENTO', 1, 0, '2017-02-02 10:34:33'),
	(88, 'Almacen', 'marcas', 'actualizar', 'marcas/actualizar', 'ACTUALIZAR', 1, 0, '2017-02-02 10:35:08'),
	(89, 'Almacen', 'marcas', 'index', 'marcas/index', 'LISTADO DE MARCAS', 1, 0, '2017-02-02 10:35:58'),
	(90, 'Almacen', 'marcas', 'crear', 'marcas/crear', 'CREAR MARCA', 1, 0, '2017-02-02 10:36:58'),
	(91, 'Almacen', 'marcas', 'editar', 'marcas/editar', 'EDITAR MARCA', 1, 0, '2017-02-02 10:37:44'),
	(92, 'Almacen', 'marcas', 'borrar', 'marcas/borrar', 'BORRAR MARCA', 1, 0, '2017-02-02 10:38:15'),
	(93, 'Almacen', 'marcas', 'ver', 'marcas/ver', 'VER MARCA', 1, 0, '2017-02-02 10:38:41'),
	(94, 'Almacen', 'cargos', 'guardarCargo', 'cargos/guardarCargo', 'GUARDAR CARGO', 1, 0, '2017-02-02 10:39:35'),
	(95, 'Almacen', 'cargos', 'getConceptosCargo', 'cargos/getConceptosCargo', 'OBTENER CARGOS DE CONCEPTOS', 1, 0, '2017-02-02 10:41:03'),
	(96, 'Almacen', 'cargos', 'getConceptosNombre', 'cargos/getConceptosNombre', 'OBTENER NOMBRES DE LOS CONCEPTOS', 1, 0, '2017-02-02 10:43:40'),
	(97, 'Almacen', 'cargos', 'getConceptosCodigo', 'cargos/getConceptosCodigo', 'OBTENER CODIGOS DE LOS CONCEPTOS', 1, 0, '2017-02-02 10:44:25'),
	(98, 'Almacen', 'cargos', 'getConceptosReferencia', 'cargos/getConceptosReferencia', 'OBTENER REFERENCIA DE CONCEPTOS', 1, 0, '2017-02-02 10:45:07'),
	(99, 'Almacen', 'cargos', 'imprimir', 'cargos/imprimir', 'IMPRIMIR', 1, 0, '2017-02-02 10:46:21'),
	(100, 'Almacen', 'cargos', 'detalle', 'cargos/detalle', 'DETALLE DE CARGOS', 1, 0, '2017-02-02 10:46:52'),
	(101, 'Almacen', 'cargos', 'index', 'cargos/index', 'LISTADO DE CARGOS', 1, 0, '2017-02-02 10:47:34'),
	(102, 'Almacen', 'cargos', 'crear', 'cargos/crear', 'CREAR CARGOS', 1, 0, '2017-02-02 10:48:41'),
	(103, 'Almacen', 'cargos', 'editar', 'cargos/editar', 'EDITAR CARGOS', 1, 0, '2017-02-02 10:49:09'),
	(104, 'Almacen', 'cargos', 'borrar', 'cargos/borrar', 'BORRAR CARGO', 1, 0, '2017-02-02 10:51:05'),
	(105, 'Almacen', 'cargos', 'ver', 'cargos/ver', 'VER CARGOS', 1, 0, '2017-02-02 10:51:32'),
	(106, 'Almacen', 'lotes', 'index', 'lotes/index', 'LISTADO DE LOTES', 1, 0, '2017-02-02 10:52:12'),
	(107, 'Almacen', 'lotes', 'crear', 'lotes/crear', 'CREAR LOTE', 1, 0, '2017-02-02 10:52:49'),
	(108, 'Almacen', 'lotes', 'editar', 'lotes/editar', 'EDITAR LOTE', 1, 0, '2017-02-02 10:53:21'),
	(109, 'Almacen', 'lotes', 'borrar', 'lotes/borrar', 'BORRAR LOTE', 1, 0, '2017-02-02 10:53:57'),
	(110, 'Almacen', 'lotes', 'ver', 'lotes/ver', 'VER LOTES', 1, 0, '2017-02-02 10:55:15'),
	(111, 'Almacen', 'movimiento_deposito', 'index', 'movimiento_deposito/index', 'LISTADO DE MOVIMIENTOS DE DEPOSITO', 1, 0, '2017-02-02 10:55:46'),
	(112, 'Almacen', 'movimiento_deposito', 'crear', 'movimiento_deposito/crear', 'CREAR MOVIMIENTO DE DEPOSITO', 1, 0, '2017-02-02 10:58:36'),
	(113, 'Almacen', 'movimiento_deposito', 'editar', 'movimiento_deposito/editar', 'EDITAR MOVIMIENTO DE DEPOSITO', 1, 0, '2017-02-02 10:59:18'),
	(114, 'Almacen', 'movimiento_deposito', 'borrar', 'movimiento_deposito/borrar', 'BORRAR MOVIMIENTO DE DEPOSITO', 1, 0, '2017-02-02 10:59:49'),
	(115, 'Almacen', 'movimiento_deposito', 'ver', 'movimiento_deposito/ver', 'VER MOVIMIENTO DE DEPOSITO', 1, 0, '2017-02-02 11:00:20'),
	(116, 'Almacen', 'unidades', 'borrar', 'unidades/borrar', 'BORRAR UNIDAD', 1, 0, '2017-02-02 11:00:51'),
	(117, 'Almacen', 'unidades', 'actualizar', 'unidades/actualizar', 'ACTUALIZAR LISTADO DE UNIDADES', 1, 0, '2017-02-02 11:07:29'),
	(118, 'Almacen', 'unidades', 'index', 'unidades/index', 'LISTADO DE UNIDADES', 1, 0, '2017-02-02 11:08:04'),
	(119, 'Almacen', 'unidades', 'crear', 'unidades/crear', 'CREAR UNIDADES', 1, 0, '2017-02-02 11:12:19'),
	(120, 'Almacen', 'unidades', 'editar', 'unidades/editar', 'EDITAR UNIDADES', 1, 0, '2017-02-02 11:17:26'),
	(121, 'Almacen', 'unidades', 'ver', 'unidades/ver', 'VER UNIDADES', 1, 0, '2017-02-02 11:17:52'),
	(122, 'Almacen', 'ajuste_inventario', 'index', 'ajuste_inventario/index', 'LISTADO DE INVENTARIO', 1, 0, '2017-02-02 11:18:27'),
	(123, 'Almacen', 'ajuste_inventario', 'guardarAjuste', 'ajuste_inventario/guardarAjuste', 'GUARDAR AJUSTE DE INVENTARIO', 1, 0, '2017-02-02 11:19:00'),
	(124, 'Almacen', 'ajuste_inventario', 'getConceptosFiltro', 'ajuste_inventario/getConceptosFiltro', 'FILTRAR CONCEPTOS', 1, 0, '2017-02-02 11:19:47'),
	(125, 'Almacen', 'ajuste_inventario', 'getConceptosNombre', 'ajuste_inventario/getConceptosNombre', 'OBTENER NOMBRE DE LOS CONCEPTOS', 1, 0, '2017-02-02 11:20:22'),
	(126, 'Almacen', 'ajuste_inventario', 'getConceptosCodigo', 'ajuste_inventario/getConceptosCodigo', 'OBTENER CODIGO DE CONCEPTOS', 1, 0, '2017-02-02 11:22:51'),
	(127, 'Almacen', 'ajuste_inventario', 'getConceptosReferencia', 'ajuste_inventario/getConceptosReferencia', 'OBTENER REFERENCIA DE CONCEPTOS', 1, 0, '2017-02-02 11:23:26'),
	(128, 'Almacen', 'ajuste_inventario', 'imprimir', 'ajuste_inventario/imprimir', 'IMPRIMIR INVENTARIO', 1, 0, '2017-02-02 11:24:00'),
	(129, 'Almacen', 'ajuste_inventario', 'detalle', 'ajuste_inventario/detalle', 'DETALLE DE INVENTARIO', 1, 0, '2017-02-02 11:24:24'),
	(130, 'Almacen', 'ajuste_inventario', 'detalle_ajuste', 'ajuste_inventario/detalle_ajuste', 'DETALLE DE AJUSTE DE INVENTARIO', 1, 0, '2017-02-02 11:25:05'),
	(131, 'Almacen', 'farm_principio_activo', 'autocomplete', 'farm_principio_activo/autocomplete', 'AUTOCOMPLETAR', 1, 0, '2017-02-02 11:25:48'),
	(132, 'Almacen', 'farm_principio_activo', 'index', 'farm_principio_activo/index', 'LISTADO DE PRINCIPIO ACTIVO', 1, 0, '2017-02-02 11:27:15'),
	(133, 'Almacen', 'farm_principio_activo', 'crear', 'farm_principio_activo/crear', 'CREAR PRINCIPIO ACTIVO', 1, 0, '2017-02-02 11:27:43'),
	(134, 'Almacen', 'farm_principio_activo', 'editar', 'farm_principio_activo/editar', 'EDITAR PRINCIPIO ACTIVO', 1, 0, '2017-02-02 11:28:13'),
	(135, 'Almacen', 'farm_principio_activo', 'borrar', 'farm_principio_activo/borrar', 'BORRAR PRINCIPIO ACTIVO', 1, 0, '2017-02-02 11:34:00'),
	(136, 'Almacen', 'farm_principio_activo', 'ver', 'farm_principio_activo/ver', 'VER PRINCIPIO ACTIVO', 1, 0, '2017-02-02 11:34:36'),
	(137, 'Almacen', 'ubicacion', 'borrar', 'ubicacion/borrar', 'ELIMINAR UBICACION', 1, NULL, '2017-02-02 11:38:51'),
	(138, 'Almacen', 'ubicacion', 'actualizar', 'ubicacion/actualizar', 'ACTUALIZAR UBICACION', 1, 0, '2017-02-02 11:39:48'),
	(139, 'Almacen', 'ubicacion', 'index', 'ubicacion/index', 'LISTADO DE UBICACION DE PRODUCTOS', 1, 0, '2017-02-02 11:40:42'),
	(140, 'Almacen', 'ubicacion', 'crear', 'ubicacion/crear', 'CREAR UBICACION', 1, 0, '2017-02-02 11:49:25'),
	(141, 'Almacen', 'ubicacion', 'editar', 'ubicacion/editar', 'EDITAR UBICACION', 1, 0, '2017-02-02 16:24:11'),
	(142, 'Almacen', 'ubicacion', 'ver', 'ubicacion/ver', 'VER UBICACION', 1, 0, '2017-02-02 16:26:47'),
	(143, 'Almacen', 'subgrupos', 'index', 'subgrupos/index', 'LISTADO DE SUBGRUPOS', 1, 0, '2017-02-02 16:27:33'),
	(144, 'Almacen', 'subgrupos', 'borrar', 'subgrupos/borrar', 'ELIMINAR SUBGRUPO', 1, 0, '2017-02-02 16:29:00'),
	(145, 'Almacen', 'subgrupos', 'crear', 'subgrupos/crear', 'CREAR SUBGRUPO', 1, 0, '2017-02-02 16:29:49'),
	(146, 'Almacen', 'subgrupos', 'upload', 'subgrupos/upload', 'CARGAR SUBGRUPOS', 1, 0, '2017-02-02 16:32:40'),
	(147, 'Almacen', 'subgrupos', 'actualizar', 'subgrupos/actualizar', 'ACTUALIZAR SUBGRUPOS', 1, 0, '2017-02-02 16:33:33'),
	(148, 'Almacen', 'subgrupos', 'ver', 'subgrupos/ver', 'VER SUBGRUPOS', 1, 0, '2017-02-02 16:34:01'),
	(149, 'Almacen', 'grupos', 'buscar', 'grupos/buscar', 'BUSCAR GRUPOS', 1, 0, '2017-02-02 16:34:38'),
	(150, 'Almacen', 'grupos', 'borrar', 'grupos/borrar', 'ELIMINAR GRUPO', 1, 0, '2017-02-02 16:35:01'),
	(151, 'Almacen', 'grupos', 'crear', 'grupos/crear', 'CREAR GRUPO', 1, 0, '2017-02-02 16:35:28'),
	(152, 'Almacen', 'grupos', 'upload', 'grupos/upload', 'CARGAR GRUPOS', 1, 0, '2017-02-02 16:36:28'),
	(153, 'Almacen', 'grupos', 'editar', 'grupos/editar', 'EDITAR GRUPOS', 1, 0, '2017-02-02 16:36:46'),
	(154, 'Almacen', 'grupos', 'actualizar', 'grupos/actualizar', 'ACTUALIZAR GRUPOS', 1, 0, '2017-02-02 16:37:33'),
	(155, 'Almacen', 'grupos', 'ver', 'grupos/ver', 'VER GRUPOS', 1, 0, '2017-02-02 16:38:46'),
	(156, 'Almacen', 'depositos', 'borrar', 'depositos/borrar', 'ELIMINAR DEPOSITO', 1, 0, '2017-02-02 16:41:14'),
	(157, 'Almacen', 'depositos', 'index', 'depositos/index', 'LISTADO DE DEPOSITO', 1, 0, '2017-02-02 16:42:25'),
	(158, 'Almacen', 'depositos', 'crear', 'depositos/crear', 'CREAR DEPOSITO', 1, 0, '2017-02-02 16:43:19'),
	(159, 'Almacen', 'depositos', 'editar', 'depositos/editar', 'EDITAR DEPOSITOS', 1, 0, '2017-02-02 16:43:50'),
	(160, 'Almacen', 'depositos', 'ver', 'depositos/ver', 'VER DEPOSITOS', 1, 0, '2017-02-02 16:44:24'),
	(161, 'Almacen', 'transferencia_deposito', 'getConcepto', 'transferencia_deposito/getConcepto', 'OBTENER CONCEPTO DE TRANSF DE DEPOSITO', 1, 0, '2017-02-02 16:45:56'),
	(162, 'Almacen', 'transferencia_deposito', 'guardarTransferencia', 'transferencia_deposito/guardarTransferencia', 'GUARDAR TRANSFERENCIA DE DEPOSITO', 1, 0, '2017-02-02 16:46:46'),
	(163, 'Almacen', 'transferencia_deposito', 'agregarMovimientoDeposito', 'transferencia_deposito/agregarMovimientoDeposito', 'AGREGAR MOV DE DEPOSITO', 1, 0, '2017-02-02 16:47:38'),
	(164, 'Almacen', 'transferencia_deposito', 'imprimir', 'transferencia_deposito/imprimir', 'IMPRIMIR TRANSFERENCIA DE DEPOSITO', 1, 0, '2017-02-02 16:48:13'),
	(165, 'Almacen', 'transferencia_deposito', 'detalle', 'transferencia_deposito/detalle', 'DETALLE DE TRANSFERENCIA', 1, 0, '2017-02-02 16:48:59'),
	(166, 'Almacen', 'tipos_conceptos', 'index', 'tipos_conceptos/index', 'LISTADO DE TIPO DE CONCEPTOS', 1, 0, '2017-02-02 16:49:38'),
	(167, 'Almacen', 'tipos_conceptos', 'crear', 'tipos_conceptos/crear', 'CREAR TIPO DE CONCEPTOS', 1, 0, '2017-02-02 16:50:03'),
	(168, 'Almacen', 'tipos_conceptos', 'editar', 'tipos_conceptos/editar', 'EDITAR TIPO DE CONCEPTO', 1, 0, '2017-02-02 16:50:33'),
	(169, 'Almacen', 'tipos_conceptos', 'borrar', 'tipos_conceptos/borrar', 'ELIMINAR TIPO DE CONCEPTOS', 1, 0, '2017-02-02 16:51:09'),
	(170, 'Almacen', 'tipos_conceptos', 'ver', 'tipos_conceptos/ver', 'VER TIPO DE CONCEPTOS', 1, 0, '2017-02-02 16:51:55'),
	(171, 'Almacen', 'seriales', 'index', 'seriales/index', 'LISTA DE SERIALES', 1, 0, '2017-02-02 16:53:49'),
	(172, 'Almacen', 'seriales', 'crear', 'seriales/crear', 'CREAR SERIALES', 1, 0, '2017-02-02 16:54:21'),
	(173, 'Almacen', 'seriales', 'editar', 'seriales/editar', 'EDITAR SERIAL', 1, 0, '2017-02-02 16:55:21'),
	(174, 'Almacen', 'seriales', 'borrar', 'seriales/borrar', 'ELIMINAR SERIAL', 1, 0, '2017-02-02 16:57:12'),
	(175, 'Almacen', 'seriales', 'ver', 'seriales/ver', 'VER SERIAL', 1, 0, '2017-02-02 16:57:53'),
	(176, 'Caja y Banco', 'banco', 'index', 'banco/index', 'LISTADO DE BANCOS', 1, 0, '2017-02-02 16:59:59'),
	(177, 'Caja y Banco', 'banco', 'editar', 'banco/editar', 'EDITAR BANCO', 1, 0, '2017-02-02 17:00:42'),
	(178, 'Caja y Banco', 'banco', 'borrar', 'banco/borrar', 'ELIMINAR BANCO', 1, 0, '2017-02-02 17:01:17'),
	(179, 'Caja y Banco', 'banco', 'crear', 'banco/crear', 'CREAR BANCO', 1, 0, '2017-02-02 17:02:45'),
	(180, 'Caja y Banco', 'banco', 'ver', 'banco/ver', 'VER BANCOS', 1, 0, '2017-02-02 17:03:18'),
	(181, 'Caja y Banco', 'movimientos_caja', 'crear', 'movimientos_caja/crear', 'CREAR MOVIMIENTO DE CAJA', 1, 0, '2017-02-02 17:03:58'),
	(182, 'Caja y Banco', 'movimientos_caja', 'editar', 'movimientos_caja/editar', 'EDITAR MOVIMIENTO DE CAJA', 1, 0, '2017-02-02 17:05:05'),
	(183, 'Caja y Banco', 'movimientos_caja', 'ver', 'movimientos_caja/ver', 'VER MOVIMIENTOS DE CAJA', 1, 0, '2017-02-02 17:05:36'),
	(184, 'Caja y Banco', 'movimientos_caja', 'index', 'movimientos_caja/index', 'LISTADO DE MOVIMIENTOS DE CAJA', 1, 0, '2017-02-02 17:07:58'),
	(185, 'Almacen', 'movimientos_caja', 'borrar', 'movimientos_caja/borrar', 'ELIMINAR MOVIMIENTO DE CAJA', 1, 0, '2017-02-02 17:08:33'),
	(186, 'Caja y Banco', 'chequeras', 'crear_chequera', 'chequeras/crear_chequera', 'CREAR CHEQUERAS', 1, NULL, '2017-02-02 17:09:23'),
	(187, 'Caja y Banco', 'chequeras', 'crear', 'chequeras/crear', 'CREAR CHEQUERAS', 1, 0, '2017-02-06 13:49:44'),
	(188, 'Caja y Banco', 'chequeras', 'tipo_chequera', 'chequeras/tipo_chequera', 'TIPO DE CHEQUERA', 1, 0, '2017-02-06 13:50:48'),
	(189, 'Caja y Banco', 'chequeras', 'index', 'chequeras/index', 'LISTADO DE CHEQUERAS', 1, 0, '2017-02-06 13:55:29'),
	(190, 'Caja y Banco', 'chequeras', 'ver', 'chequeras/ver', 'VER CHEQUERAS', 1, 0, '2017-02-06 13:58:15'),
	(191, 'Caja y Banco', 'chequeras', 'anular', 'chequeras/anular', 'ANULAR CHEQUERA', 1, 0, '2017-02-06 14:03:58'),
	(192, 'Caja y Banco', 'chequeras', 'getCuentas', 'chequeras/getCuentas', 'OBTENER CUENTAS', 1, 0, '2017-02-06 14:04:27'),
	(193, 'Caja y Banco', 'chequeras', 'getChequera', 'chequeras/getChequera', 'LISTADO DE CHEQUERAS', 1, 0, '2017-02-06 14:05:12'),
	(194, 'Caja y Banco', 'chequeras', 'getCheques', 'chequeras/getCheques', 'OBTENER CHEQUES', 1, 0, '2017-02-06 14:05:54'),
	(195, 'Caja y Banco', 'chequeras', 'getEstatus', 'chequeras/getEstatus', 'OBTENER ESTATUS DE CHEQUERAS', 1, 0, '2017-02-06 14:10:28'),
	(196, 'Caja y Banco', 'chequeras', 'anular_cheque', 'chequeras/anular_cheque', 'ANULAR CHEQUE', 1, 0, '2017-02-06 14:11:00'),
	(197, 'Caja y Banco', 'chequeras', 'anular_mov_compra', 'chequeras/anular_mov_compra', 'ANULAR MOVIMIENTO DE COMPRA', 1, 0, '2017-02-06 14:11:27'),
	(198, 'Caja y Banco', 'chequeras', 'anular_mov_abono', 'chequeras/anular_mov_abono', 'ANULAR MOVIMIENTO DE ABONO CON CHEQUE', 1, 0, '2017-02-06 14:12:01'),
	(199, 'Caja y Banco', 'chequeras', 'anular_chequera', 'chequeras/anular_chequera', 'ANULAR CHEQUERA', 1, 0, '2017-02-06 14:12:36'),
	(200, 'Caja y Banco', 'chequeras', 'comentario', 'chequeras/comentario', 'COMENTARIO', 1, 0, '2017-02-06 14:12:59'),
	(201, 'Caja y Banco', 'cheques', 'index', 'cheques/index', 'LISTADO DE CHEQUES', 1, 0, '2017-02-06 14:14:01'),
	(202, 'Caja y Banco', 'cheques', 'concepto', 'cheques/concepto', 'MOTIVO DEL CHEQUE', 1, 0, '2017-02-06 14:15:55'),
	(203, 'Caja y Banco', 'cheques', 'imprimir', 'cheques/imprimir', 'IMPRIMIR CHEQUE', 1, 0, '2017-02-06 14:16:26'),
	(204, 'Caja y Banco', 'movimientos_bancos', 'ver', 'movimientos_bancos/ver', 'VER MOVIMIENTOS DE BANCO', 1, 0, '2017-02-06 14:19:00'),
	(205, 'Caja y Banco', 'movimientos_bancos', 'getBeneficiario', 'movimientos_bancos/getBeneficiario', 'OBTENER LISTA DE BENEFICIARIOS', 1, 0, '2017-02-06 14:20:12'),
	(206, 'Caja y Banco', 'movimientos_bancos', 'editar', 'movimientos_bancos/editar', 'EDITAR MOVIMIENTO DE BANCOS', 1, 0, '2017-02-06 14:26:50'),
	(207, 'Caja y Banco', 'movimientos_bancos', 'editarMovimiento', 'movimientos_bancos/editarMovimiento', 'EDITAR MOVIMIENTO DE BANCO', 1, 0, '2017-02-06 14:27:34'),
	(208, 'Caja y Banco', 'movimientos_bancos', 'index', 'movimientos_bancos/index', 'LISTADO DE MOVIMIENTOS', 1, 0, '2017-02-08 10:20:42'),
	(209, 'Caja y Banco', 'movimientos_bancos', 'crear', 'movimientos_bancos/crear', 'CREAR MOVIMIENTO DE BANCO', 1, 0, '2017-02-08 10:21:27'),
	(210, 'Caja y Banco', 'movimientos_bancos', 'borrar', 'movimientos_bancos/borrar', 'ELIMINAR MOVIMIENTO DE BANCO', 1, 0, '2017-02-08 10:22:41'),
	(211, 'Caja y Banco', 'reposicion_caja', 'index', 'reposicion_caja/index', 'LISTADO DE REPOSICION DE CAJA', 1, 0, '2017-02-08 10:23:29'),
	(212, 'Caja y Banco', 'reposicion_caja', 'crear', 'reposicion_caja/crear', 'CREAR REPOSICION DE CAJA', 1, 0, '2017-02-08 10:23:59'),
	(213, 'Caja y Banco', 'reposicion_caja', 'editar', 'reposicion_caja/editar', 'EDITAR REPOSICION DE CAJA', 1, 0, '2017-02-08 10:41:59'),
	(214, 'Caja y Banco', 'reposicion_caja', 'borrar', 'reposicion_caja/borrar', 'ELIMINAR REPOSICION DE CAJA', 1, 0, '2017-02-08 10:45:07'),
	(215, 'Caja y Banco', 'reposicion_caja', 'ver', 'reposicion_caja/ver', 'VER REPOSICION DE CAJA', 1, 0, '2017-02-08 10:45:46'),
	(216, 'Caja y Banco', 'transferencia_bancaria', 'crear', 'transferencia_bancaria/crear', 'AGREGAR TRANSFERENCIA BANCARIA', 1, 0, '2017-02-08 10:49:13'),
	(217, 'Caja y Banco', 'transferencia_bancaria', 'index', 'transferencia_bancaria/index', 'LISTADO DE TRANSFERENCIAS BANCARIAS', 1, 0, '2017-02-08 10:49:46'),
	(218, 'Caja y Banco', 'transferencia_bancaria', 'editar', 'transferencia_bancaria/editar', 'MODIFICAR TRANSFERENCIA BANCARIA', 1, 0, '2017-02-08 10:50:16'),
	(219, 'Caja y Banco', 'transferencia_bancaria', 'borrar', 'transferencia_bancaria/borrar', 'ELIMINAR TRANSFERENCIA BANCARIA', 1, 0, '2017-02-08 10:51:59'),
	(220, 'Caja y Banco', 'transferencia_bancaria', 'ver', 'transferencia_bancaria/ver', 'VER TRANSFERENCIAS BANCARIAS', 1, 0, '2017-02-08 11:11:09'),
	(221, 'Caja y Banco', 'transferencias_caja', 'crear', 'transferencias_caja/crear', 'AGREGAR TRANSFERENCIA DE CAJA', 1, 0, '2017-02-08 11:11:42'),
	(222, 'Caja y Banco', 'transferencias_caja', 'index', 'transferencias_caja/index', 'LISTADO DE TRANSFERENCIAS DE CAJA', 1, 0, '2017-02-08 11:17:32'),
	(223, 'Caja y Banco', 'transferencias_caja', 'editar', 'transferencias_caja/editar', 'MODIFICAR TRANSFERENCIA DE CAJA', 1, 0, '2017-02-08 11:18:17'),
	(224, 'Caja y Banco', 'transferencias_caja', 'borrar', 'transferencias_caja/borrar', 'ELIMINAR TRANSFERENCIA DE CAJA', 1, 0, '2017-02-08 11:19:26'),
	(225, 'Caja y Banco', 'transferencias_caja', 'ver', 'transferencias_caja/ver', 'VER TRANSFERENCIA DE CAJA', 1, 0, '2017-02-08 11:20:25'),
	(226, 'Caja y Banco', 'beneficiario', 'index', 'beneficiario/index', 'LISTADO DE BENEFICIARIOS', 1, 0, '2017-02-08 11:21:15'),
	(227, 'Caja y Banco', 'beneficiario', 'crear', 'beneficiario/crear', 'AGREGAR BENEFICIARIO', 1, 0, '2017-02-08 11:21:41'),
	(228, 'Caja y Banco', 'beneficiario', 'editar', 'beneficiario/editar', 'MODIFICAR BENEFICIARIO', 1, 0, '2017-02-08 11:22:07'),
	(229, 'Caja y Banco', 'beneficiario', 'borrar', 'beneficiario/borrar', 'ELIMINAR BENEFICIARIO', 1, 0, '2017-02-08 11:22:37'),
	(230, 'Caja y Banco', 'beneficiario', 'ver', 'beneficiario/ver', 'VER BENEFICIARIO', 1, 0, '2017-02-08 11:23:03'),
	(231, 'Caja y Banco', 'tipo_movimiento', 'index', 'tipo_movimiento/index', 'LISTADO DE TIPOS DE MOVIMIENTO', 1, 0, '2017-02-08 11:23:36'),
	(232, 'Caja y Banco', 'tipo_movimiento', 'crear', 'tipo_movimiento/crear', 'AGREGAR TIPO DE MOVIMIENTO', 1, 0, '2017-02-08 11:24:03'),
	(233, 'Caja y Banco', 'tipo_movimiento', 'editar', 'tipo_movimiento/editar', 'MODIFICAR TIPO DE MOVIMIENTO', 1, 0, '2017-02-08 11:24:38'),
	(234, 'Caja y Banco', 'tipo_movimiento', 'borrar', 'tipo_movimiento/borrar', 'ELIMINAR TIPO DE MOVIMIENTO', 1, 0, '2017-02-08 11:25:12'),
	(235, 'Caja y Banco', 'tipo_movimiento', 'ver', 'tipo_movimiento/ver', 'VER TIPO DE MOVIMIENTO', 1, 0, '2017-02-08 11:26:07'),
	(236, 'Caja y Banco', 'entidad', 'index', 'entidad/index', 'LISTADO DE ENTIDADES BANCARIAS', 1, 0, '2017-02-08 11:35:39'),
	(237, 'Caja y Banco', 'entidad', 'crear', 'entidad/crear', 'AGREGAR ENTIDAD BANCARIA', 1, 0, '2017-02-08 11:36:03'),
	(238, 'Caja y Banco', 'entidad', 'editar', 'entidad/editar', 'MODIFICAR ENTIDAD BANCARIA', 1, 0, '2017-02-08 11:36:29'),
	(239, 'Caja y Banco', 'entidad', 'borrar', 'entidad/borrar', 'ELIMINAR ENTIDAD BANCARIA', 1, 0, '2017-02-08 11:37:10'),
	(240, 'Caja y Banco', 'entidad', 'ver', 'entidad/ver', 'VER ENTIDADES', 1, 0, '2017-02-08 11:39:49'),
	(241, 'Caja y Banco', 'tipo_pago', 'index', 'tipo_pago/index', 'LISTADO DE TIPO DE PAGO', 1, 0, '2017-02-08 11:40:08'),
	(242, 'Caja y Banco', 'tipo_pago', 'crear', 'tipo_pago/crear', 'AGREGAR TIPO DE PAGO', 1, 0, '2017-02-08 11:40:28'),
	(243, 'Caja y Banco', 'tipo_pago', 'editar', 'tipo_pago/editar', 'MODIFICAR TIPO DE PAGO', 1, 0, '2017-02-08 11:40:50'),
	(244, 'Caja y Banco', 'tipo_pago', 'borrar', 'tipo_pago/borrar', 'ELIMINAR TIPO DE PAGO', 1, 0, '2017-02-08 11:41:29'),
	(245, 'Caja y Banco', 'tipo_pago', 'ver', 'tipo_pago/ver', 'VER TIPO DE PAGO', 1, 0, '2017-02-08 11:42:06'),
	(246, 'Caja y Banco', 'caja', 'index', 'caja/index', 'LISTADO DE CAJAS', 1, 0, '2017-02-08 11:42:29'),
	(247, 'Caja y Banco', 'caja', 'crear', 'caja/crear', 'AGREGAR CAJA', 1, 0, '2017-02-08 11:42:55'),
	(248, 'Caja y Banco', 'caja', 'editar', 'caja/editar', 'MODIFICAR CAJA', 1, 0, '2017-02-08 11:43:10'),
	(249, 'Caja y Banco', 'caja', 'borrar', 'caja/borrar', 'ELIMINAR CAJA', 1, 0, '2017-02-08 11:43:46'),
	(250, 'Caja y Banco', 'caja', 'ver', 'caja/ver', 'VER CAJA', 1, 0, '2017-02-08 11:44:06'),
	(251, 'Caja y Banco', 'tipo_cuenta', 'index', 'tipo_cuenta/index', 'LISTADO DE TIPOS DE CUENTA', 1, 0, '2017-02-08 11:44:28'),
	(252, 'Caja y Banco', 'tipo_cuenta', 'crear', 'tipo_cuenta/crear', 'AGREGAR TIPO DE CUENTA', 1, 0, '2017-02-08 11:44:43'),
	(253, 'Caja y Banco', 'tipo_cuenta', 'editar', 'tipo_cuenta/editar', 'MODIFICAR TIPO DE CUENTA', 1, 0, '2017-02-08 11:45:08'),
	(254, 'Caja y Banco', 'tipo_cuenta', 'borrar', 'tipo_cuenta/borrar', 'ELIMINAR TIPO DE CUENTA', 1, 0, '2017-02-08 11:45:44'),
	(255, 'Caja y Banco', 'tipo_cuenta', 'ver', 'tipo_cuenta/ver', 'VER TIPO DE CUENTA', 1, 0, '2017-02-08 11:46:03'),
	(256, 'Compras', 'compras', 'index', 'compras/index', 'LISTADO DE COMPRAS', 1, 0, '2017-02-08 11:47:08'),
	(257, 'Compras', 'compras', 'crear', 'compras/crear', 'AGREGAR COMPRA', 1, 0, '2017-02-08 11:47:57'),
	(258, 'Compras', 'compras', 'editar', 'compras/editar', 'MODIFICAR COMPRA', 1, 0, '2017-02-08 11:48:30'),
	(259, 'Compras', 'compras', 'guardar', 'compras/guardar', 'GUARDAR COMPRA', 1, 0, '2017-02-08 11:49:04'),
	(260, 'Compras', 'compras', 'borrar', 'compras/borrar', 'ELIMINAR COMPRA', 1, 0, '2017-02-08 11:49:28'),
	(261, 'Compras', 'compras', 'editarCompra', 'compras/editarCompra', 'MODIFICAR COMPRA', 1, 0, '2017-02-08 11:52:58'),
	(262, 'Compras', 'compras', 'pagar', 'compras/pagar', 'PAGAR COMPRA', 1, 0, '2017-02-08 11:53:15'),
	(263, 'Compras', 'compras', 'guardarPago', 'compras/guardarPago', 'GUARDAR PAGO DE COMPRA', 1, 0, '2017-02-08 11:55:14'),
	(264, 'Compras', 'compras', 'getTipoPago', 'compras/getTipoPago', 'OBTENER TIPO DE PAGO', 1, 0, '2017-02-08 11:59:24'),
	(265, 'Compras', 'compras', 'imprimir', 'compras/imprimir', 'IMPRIMIR COMPROBANTE DE COMPRA', 1, 0, '2017-02-08 11:59:48'),
	(266, 'Compras', 'compras', 'reporte', 'compras/reporte', 'GENERAR REPORTE DE COMPRA', 1, 0, '2017-02-08 12:01:40'),
	(267, 'Compras', 'compras', 'aplicarAbono', 'compras/aplicarAbono', 'APLICAR ABONO A COMPRA', 1, 0, '2017-02-08 12:05:12'),
	(268, 'Compras', 'compras', 'guardarAbono', 'compras/guardarAbono', 'GUARDAR ABONO APLICADO A COMPRA', 1, 0, '2017-02-08 12:05:37'),
	(269, 'Compras', 'compras', 'serialesDinamicos', 'compras/serialesDinamicos', 'SERIALES DINAMICOS', 1, 0, '2017-02-08 12:06:15'),
	(270, 'Compras', 'compras', 'serialesEstaticos', 'compras/serialesEstaticos', 'SERIALES ESTATICOS', 1, 0, '2017-02-08 12:06:38'),
	(271, 'Compras', 'compras', 'getChequera', 'compras/getChequera', 'OBTENER LISTA CHEQUERAS PARA PAGAR UNA COMPRA', 1, 0, '2017-02-08 12:07:43'),
	(272, 'Compras', 'compras', 'getCheques', 'compras/getCheques', 'OBTENER LISTA DE CHEQUE SEGUN LA CHEQUERA PARA PAGO DE COMPRA', 1, 0, '2017-02-08 12:08:13'),
	(273, 'Compras', 'compras', 'retencion_iva', 'compras/retencion_iva', 'APLICAR RETENCION DEL IVA A LA COMPRA', 1, 0, '2017-02-08 12:08:41'),
	(274, 'Compras', 'compras', 'newList', 'compras/newList', 'MOSTRAR NUEVA LISTA DE COMPRAS', 1, 0, '2017-02-08 12:09:32'),
	(275, 'Compras', 'compras', 'buscar_producto_compra', 'compras/buscar_producto_compra', 'BUSCAR LOS PRODUCTOS DE LA COMPRA', 1, 0, '2017-02-08 12:10:35'),
	(276, 'Compras', 'compras', 'devolucion', 'compras/devolucion', 'DEVOLUCION DE UNA COMPRA', 1, 0, '2017-02-08 12:11:02'),
	(277, 'Compras', 'recibo_cobro', 'index', 'recibo_cobro/index', 'LISTADO DE RECIBOS DE COBRO', 1, 0, '2017-02-08 12:50:08'),
	(278, 'Compras', 'recibo_cobro', 'crear', 'recibo_cobro/crear', 'AGREGAR RECIBO DE COBRO', 1, 0, '2017-02-08 12:50:31'),
	(279, 'Compras', 'recibo_cobro', 'ver', 'recibo_cobro/ver', 'VER RECIBO DE COBRO', 1, 0, '2017-02-08 12:51:50'),
	(280, 'Compras', 'recibo_cobro', 'borrar', 'recibo_cobro/borrar', 'ELIMINAR RECIBO DE COBRO', 1, 0, '2017-02-08 12:52:23'),
	(281, 'Compras', 'recibo_cobro', 'guardar', 'recibo_cobro/guardar', 'GUARDAR RECIBO DE COBRO', 1, 0, '2017-02-08 12:54:04'),
	(282, 'Compras', 'recibo_cobro', 'listar', 'recibo_cobro/listar', 'LISTAR RECIBOS DE COBRO', 1, 0, '2017-02-08 12:54:52'),
	(283, 'Compras', 'recibo_cobro', 'listarCompras', 'recibo_cobro/listarCompras', 'LISTADO DE COMPRAS CON RECIBO DE COBRO', 1, 0, '2017-02-08 12:58:23'),
	(284, 'Compras', 'recibo_cobro', 'pagar', 'recibo_cobro/pagar', 'PAGAR RECIBO DE COBRO', 1, 0, '2017-02-08 12:58:50'),
	(285, 'Compras', 'recibo_cobro', 'guardarPago', 'recibo_cobro/guardarPago', 'GUARDAR PAGO DE COBRO', 1, 0, '2017-02-08 12:59:30'),
	(286, 'Compras', 'recibo_cobro', 'getTipoPago', 'recibo_cobro/getTipoPago', 'OBTENER LOS TIPOS DE PAGO', 1, 0, '2017-02-08 13:00:09'),
	(287, 'Compras', 'recibo_cobro', 'aplicarAbono', 'recibo_cobro/aplicarAbono', 'APLICAR ABONO A RECIBO DE COBRO', 1, 0, '2017-02-08 13:00:38'),
	(288, 'Compras', 'recibo_cobro', 'guardarAbono', 'recibo_cobro/guardarAbono', 'GUARDAR ABONO DE COBRO', 1, 0, '2017-02-08 13:01:29'),
	(289, 'Compras', 'recepcion', 'index', 'recepcion/index', 'LISTADO DE RECEPCIONES', 1, 0, '2017-02-08 13:02:08'),
	(290, 'Compras', 'recepcion', 'crear', 'recepcion/crear', 'AGREGAR NUEVA RECEPCION', 1, 0, '2017-02-08 13:02:36'),
	(291, 'Compras', 'recepcion', 'guardar', 'recepcion/guardar', 'GUARDAR RECEPCION', 1, 0, '2017-02-08 13:03:08'),
	(292, 'Compras', 'recepcion', 'imprimir', 'recepcion/imprimir', 'IMPRIMIR RECEPCION', 1, 0, '2017-02-08 13:03:59'),
	(293, 'Compras', 'recepcion', 'reporte', 'recepcion/reporte', 'EMITIR REPORTE DE RECEPCION', 1, 0, '2017-02-08 13:41:48'),
	(294, 'Compras', 'recepcion', 'borrar', 'recepcion/borrar', 'ELIMINAR RECEPCION', 1, 0, '2017-02-08 13:42:12'),
	(295, 'Compras', 'recepcion', 'editar', 'recepcion/editar', 'MODIFICAR RECEPCION', 1, 0, '2017-02-08 13:42:31'),
	(296, 'Compras', 'recepcion', 'editarRecepcion', 'recepcion/editarRecepcion', 'MODIFICAR RECEPCION', 1, 0, '2017-02-08 13:43:16'),
	(297, 'Compras', 'proveedor', 'index', 'proveedor/index', 'LISTADO DE PROVEEDORES', 1, 0, '2017-02-08 13:43:43'),
	(298, 'Compras', 'proveedor', 'ver', 'proveedor/ver', 'VER DATOS DE PROVEEDOR', 1, 0, '2017-02-08 13:44:23'),
	(299, 'Compras', 'proveedor', 'autocomplete', 'proveedor/autocomplete', 'AUTOCOMPLETAR CAMPOS DE PROVEEDOR', 1, 0, '2017-02-08 13:44:55'),
	(300, 'Compras', 'proveedor', 'crear', 'proveedor/crear', 'AGREGAR PROVEEDOR', 1, 0, '2017-02-08 14:11:31'),
	(301, 'Compras', 'proveedor', 'editar', 'proveedor/editar', 'EDITAR PROVEEDOR', 1, 0, '2017-02-08 14:12:03'),
	(302, 'Compras', 'proveedor', 'borrar', 'proveedor/borrar', 'ELIMINAR PROVEEDOR', 1, 0, '2017-02-08 14:12:27'),
	(303, 'Compras', 'orden_compra', 'index', 'orden_compra/index', 'LISTADO DE ORDENES DE COMPRA', 1, 0, '2017-02-08 14:13:56'),
	(304, 'Compras', 'orden_compra', 'crear', 'orden_compra/crear', 'CREAR NUEVA ORDEN DE COMPRA', 1, 0, '2017-02-08 14:14:23'),
	(305, 'Compras', 'orden_compra', 'editar', 'orden_compra/editar', 'MODIFICAR ORDEN DE COMPRA', 1, 0, '2017-02-08 14:14:54'),
	(306, 'Compras', 'orden_compra', 'editarOrden', 'orden_compra/editarOrden', 'EDITAR ORDEN DE COMPRA', 1, 0, '2017-02-08 14:15:31'),
	(307, 'Compras', 'orden_compra', 'guardar', 'orden_compra/guardar', 'GUARDAR ORDEN DE COMPRA', 1, 0, '2017-02-08 14:15:54'),
	(308, 'Compras', 'orden_compra', 'imprimir', 'orden_compra/imprimir', 'IMPRIMIR ORDEN DE COMPRA', 1, 0, '2017-02-08 14:16:27'),
	(309, 'Compras', 'orden_compra', 'reporte', 'orden_compra/reporte', 'VER REPORTE DE ORDEN DE COMPRA', 1, 0, '2017-02-08 14:16:51'),
	(310, 'Compras', 'orden_compra', 'borrar', 'orden_compra/borrar', 'ELIMINAR ORDEN DE COMPRA', 1, 0, '2017-02-08 14:17:16'),
	(311, 'Compras', 'orden_compra', 'estatus', 'orden_compra/estatus', 'ESTATUS DE ORDEN DE COMPRA', 1, 0, '2017-02-08 14:17:46'),
	(312, 'Compras', 'orden_compra', 'getPeriodo', 'orden_compra/getPeriodo', 'OBTENER ORDEN DE COMPRA SEGUN PERIODO', 1, 0, '2017-02-08 14:18:26'),
	(313, 'Compras', 'abonos_compras', 'index', 'abonos_compras/index', 'LISTADO DE ABONOS DE COMPRAS', 1, 0, '2017-02-08 14:18:55'),
	(314, 'Compras', 'abonos_compras', 'crear', 'abonos_compras/crear', 'AGREGAR ABONO DE COMPRA', 1, 0, '2017-02-08 14:19:19'),
	(315, 'Compras', 'abonos_compras', 'getCuentas', 'abonos_compras/getCuentas', 'OBTENER CUENTAS DE DONDE SE REALIZO EL ABONO DE LA COMPRA', 1, 0, '2017-02-08 14:20:22'),
	(316, 'Compras', 'abonos_compras', 'getTipoPago', 'abonos_compras/getTipoPago', 'OBTENER TIPOS DE PAGO PARA CREAR ABONO', 1, 0, '2017-02-08 14:21:57'),
	(317, 'Compras', 'abonos_compras', 'guardarAbono', 'abonos_compras/guardarAbono', 'GUARDAR ABONO DE COMPRA', 1, 0, '2017-02-08 14:22:52'),
	(318, 'Compras', 'retenciones', 'imprimir', 'retenciones/imprimir', 'IMPRIMIR RETENCION', 1, 0, '2017-02-08 14:23:19'),
	(319, 'Compras', 'orden_pago', 'index', 'orden_pago/index', 'LISTADO DE ORDENES DE PAGO', 1, 0, '2017-02-08 14:23:52'),
	(320, 'Compras', 'orden_pago', 'listado', 'orden_pago/listado', 'LISTADO DE ORDENES DE PAGO', 1, 0, '2017-02-08 14:24:31'),
	(321, 'Compras', 'orden_pago', 'generar', 'orden_pago/generar', 'GENERAR ORDEN DE PAGO', 1, 0, '2017-02-08 14:27:46'),
	(322, 'Compras', 'otros_pagos', 'index', 'otros_pagos/index', 'LISTADO DE OTROS PAGOS', 1, 0, '2017-02-08 14:29:42'),
	(323, 'Compras', 'orden_pago', 'imprimir', 'orden_pago/imprimir', 'IMPRIMIR ORDEN DE PAGO', 1, 0, '2017-02-08 14:30:08'),
	(324, 'Compras', 'pagos', 'index', 'pagos/index', 'LISTADO DE PAGOS', 1, 0, '2017-02-08 14:30:34'),
	(325, 'Compras', 'procesar_pago', 'index', 'procesar_pago/index', 'LISTADO DE ORDENES DE PAGO ENVIADAS PARA SER PROCESADAS', 1, 0, '2017-02-08 14:33:32'),
	(326, 'Compras', 'procesar_pago', 'pagar', 'procesar_pago/pagar', 'PAGAR ORDEN DE PAGO ENVIADA A PROCESAR', 1, 0, '2017-02-08 14:34:16'),
	(327, 'Compras', 'procesar_pago', 'guardarPago', 'procesar_pago/guardarPago', 'GUARDAR PAGO DE ORDEN DE PAGO ENVIADA A PROCESAR', 1, 0, '2017-02-08 14:34:45'),
	(328, 'Compras', 'procesar_pago', 'getTipoPago', 'procesar_pago/getTipoPago', 'OBTENER TIPO DE PAGO PARA PROCESAR EL PAGO DE LA ORDEN DE PAGO', 1, 0, '2017-02-08 14:38:11'),
	(329, 'Compras', 'procesar_pago', 'pagos', 'procesar_pago/pagos', 'PAGO DE ORDENES DE PAGO PROCESADAS', 1, 0, '2017-02-08 14:39:40'),
	(330, 'Compras', 'enc_compra', 'editar', 'enc_compra/editar', 'MODIFICAR ENCABEZADO DE COMPRA', 1, 0, '2017-02-08 15:30:05'),
	(331, 'Compras', 'enc_compra', 'index', 'enc_compra/index', 'LISTADO DE ENCABEZADO DE COMPRAS', 1, 0, '2017-02-08 15:30:43'),
	(332, 'Compras', 'enc_compra', 'crear', 'enc_compra/crear', 'AGREGAR ENCABEZADO DE COMPRA', 1, 0, '2017-02-08 15:31:14'),
	(333, 'Compras', 'enc_compra', 'borrar', 'enc_compra/borrar', 'ELIMINAR ENCABEZADO DE COMPRA', 1, 0, '2017-02-08 15:31:49'),
	(334, 'Compras', 'enc_compra', 'ver', 'enc_compra/ver', 'VER ENCABEZADO DE COMPRA', 1, 0, '2017-02-08 15:32:15'),
	(335, 'Compras', 'tipo_proveedor', 'index', 'tipo_proveedor/index', 'LISTADO DE TIPOS DE PROVEEDOR', 1, 0, '2017-02-08 15:32:56'),
	(336, 'Compras', 'tipo_proveedor', 'crear', 'tipo_proveedor/crear', 'CREAR TIPO DE PROVEEDOR', 1, 0, '2017-02-08 15:33:27'),
	(337, 'Compras', 'tipo_proveedor', 'editar', 'tipo_proveedor/editar', 'MODIFICAR TIPO DE PROVEEDOR', 1, 0, '2017-02-08 15:34:00'),
	(338, 'Compras', 'tipo_proveedor', 'borrar', 'tipo_proveedor/borrar', 'ELIMINAR TIPO DE PROVEEDOR', 1, 0, '2017-02-08 15:34:28'),
	(339, 'Compras', 'tipo_proveedor', 'ver', 'tipo_proveedor/ver', 'VER TIPOS DE PROVEEDOR', 1, 0, '2017-02-08 15:34:54'),
	(340, 'Compras', 'tipo_retencion', 'index', 'tipo_retencion/index', 'LISTADO DE TIPOS DE RETENCION', 1, 0, '2017-02-08 15:35:27'),
	(341, 'Compras', 'tipo_retencion', 'crear', 'tipo_retencion/crear', 'AGREGAR TIPO DE RETENCION', 1, 0, '2017-02-08 15:35:48'),
	(342, 'Compras', 'tipo_retencion', 'editar', 'tipo_retencion/editar', 'MODIFICAR TIPO DE RETENCION', 1, 0, '2017-02-08 15:36:19'),
	(343, 'Compras', 'tipo_retencion', 'borrar', 'tipo_retencion/borrar', 'ELIMINAR TIPO DE RETENCION', 1, 0, '2017-02-08 15:37:12'),
	(344, 'Compras', 'tipo_retencion', 'ver', 'tipo_retencion/ver', 'VER TIPO DE RETENCION', 1, 0, '2017-02-08 15:37:42'),
	(345, 'Ventas', 'clientes', 'index', 'clientes/index', 'LISTADO DE CLIENTES', 1, 0, '2017-02-09 15:49:56'),
	(346, 'Ventas', 'clientes', 'editar', 'clientes/editar', 'MODIFICAR DATOS DEL CLIENTE', 1, 0, '2017-02-13 10:44:01'),
	(347, 'Ventas', 'clientes', 'lista_clientes', 'clientes/lista_clientes', 'LISTA DE CLIENTES', 1, 0, '2017-02-13 10:46:18'),
	(348, 'Ventas', 'clientes', 'autocomplete', 'clientes/autocomplete', 'AUTOCOMPLETAR CAMPOS', 1, 0, '2017-02-13 10:46:45'),
	(349, 'Ventas', 'clientes', 'getAdmCiudad', 'clientes/getAdmCiudad', 'OBTENER LISTADO DE CIUDADES', 1, 0, '2017-02-13 10:50:59'),
	(350, 'Ventas', 'clientes', 'crear', 'clientes/crear', 'AGREGAR NUEVO CLIENTE', 1, 0, '2017-02-13 10:51:53'),
	(351, 'Ventas', 'clientes', 'borrar', 'clientes/borrar', 'ELIMINAR CLIENTE', 1, 0, '2017-02-13 10:52:32'),
	(352, 'Ventas', 'clientes', 'ver', 'clientes/ver', 'VER INFORMACION DE CLIENTE', 1, 0, '2017-02-13 10:59:00'),
	(353, 'Ventas', 'presupuesto', 'index', 'presupuesto/index', 'LISTADO DE PRESUPUESTO', 1, 0, '2017-02-13 11:00:09'),
	(354, 'Ventas', 'presupuesto', 'crear', 'presupuesto/crear', 'CREAR NUEVO PRESUPUESTO', 1, 0, '2017-02-13 11:00:44'),
	(355, 'Ventas', 'presupuesto', 'borrar', 'presupuesto/borrar', 'ELIMINAR PRESUPUESTO', 1, 0, '2017-02-13 11:01:45'),
	(356, 'Ventas', 'presupuesto', 'editar', 'presupuesto/editar', 'MODIFICAR PRESUPUESTO', 1, 0, '2017-02-13 11:02:10'),
	(357, 'Ventas', 'presupuesto', 'duplicar', 'presupuesto/duplicar', 'DUPLICAR PRESUPUESTO', 1, 0, '2017-02-13 11:02:42'),
	(359, 'Ventas', 'presupuesto', 'editarPresupuesto', 'presupuesto/editarPresupuesto', 'EDITAR PRESUPUESTO', 1, 0, '2017-02-13 11:04:08'),
	(360, 'Ventas', 'presupuesto', 'imprimir', 'presupuesto/imprimir', 'IMPRIMIR PRESUPUESTO', 1, 0, '2017-02-13 11:04:46'),
	(361, 'Ventas', 'presupuesto', 'correo', 'presupuesto/correo', 'ENVIAR PRESUPUESTO POR CORREO', 1, 0, '2017-02-13 11:05:26'),
	(362, 'Ventas', 'presupuesto', 'presupuestar_caso', 'presupuesto/presupuestar_caso', 'PRESUPUESTAR CASO DE SERVICIO', 1, 0, '2017-02-13 11:05:59'),
	(363, 'Ventas', 'presupuesto', 'estatus', 'presupuesto/estatus', 'ESTATUS DEL PRESUPUESTO', 1, 0, '2017-02-13 11:06:28'),
	(364, 'Ventas', 'presupuesto', 'getPeriodo', 'presupuesto/getPeriodo', 'VER PRESUPUESTOS POR PERIODOS', 1, 0, '2017-02-13 11:08:00'),
	(365, 'Ventas', 'presupuesto', 'enviar', 'presupuesto/enviar', 'ENVIAR PRESUPUESTO', 1, 0, '2017-02-13 11:08:43'),
	(366, 'Ventas', 'presupuesto', 'descargar', 'presupuesto/descargar', 'DESCARGAR PRESUPUESTO', 1, 0, '2017-02-13 11:09:16'),
	(367, 'Ventas', 'presupuesto', 'guardarPresupuesto', 'presupuesto/guardarPresupuesto', 'GUARDAR PRESUPUESTO', 1, 0, '2017-02-13 11:10:21'),
	(368, 'Ventas', 'cobranza', 'index', 'cobranza/index', 'LISTADO DE COBRANZA', 1, 0, '2017-02-13 11:13:36'),
	(369, 'Ventas', 'cobranza', 'cobrar', 'cobranza/cobrar', 'COBRAR', 1, 0, '2017-02-13 11:14:52'),
	(370, 'Ventas', 'cobranza', 'crear', 'cobranza/crear', 'CREAR COBRANZA', 1, 0, '2017-02-13 11:14:56'),
	(371, 'Ventas', 'cobranza', 'getTipoPago', 'cobranza/getTipoPago', 'OBTENER TIPO DE PAGO', 1, 0, '2017-02-13 11:16:23'),
	(372, 'Ventas', 'cobranza', 'ver_cobro', 'cobranza/ver_cobro', 'VER INFORMACION DEL COBRO', 1, NULL, '2017-02-13 11:17:03'),
	(373, 'Ventas', 'cobranza', 'imprimir', 'cobranza/imprimir', 'IMPRIMIR COBRANZA', 1, 0, '2017-02-13 11:19:16'),
	(374, 'Ventas', 'despacho', 'index', 'despacho/index', 'LISTADO GENERAL DE NOTAS DE DESPACHO', 1, 0, '2017-02-13 11:22:37'),
	(375, 'Ventas', 'despacho', 'crear', 'despacho/crear', 'CREAR NUEVA NOTA DE DESPACHO', 1, 0, '2017-02-13 11:22:59'),
	(376, 'Ventas', 'despacho', 'guardarGuia', 'despacho/guardarGuia', 'GUARDAR GUIA DE DESPACHO', 1, 0, '2017-02-13 11:23:58'),
	(377, 'Ventas', 'despacho', 'imprimir', 'despacho/imprimir', 'IMPRIMIR GUIA DE DESPACHO', 1, 0, '2017-02-13 11:24:03'),
	(378, 'Ventas', 'despacho', 'ver_detalle', 'despacho/ver_detalle', 'VER DETALLE DE LA GUIA DE DESPACHO', 1, 0, '2017-02-13 11:25:58'),
	(379, 'Ventas', 'facturacion', 'index', 'facturacion/index', 'LISTADO DE FACTURAS', 1, 0, '2017-02-13 11:26:48'),
	(380, 'Ventas', 'facturacion', 'crear', 'facturacion/crear', 'AGREGAR NUEVA FACTURA', 1, 0, '2017-02-13 11:27:53'),
	(381, 'Ventas', 'facturacion', 'ver_detalle', 'facturacion/ver_detalle', 'VER DETALLE DE FACTURA', 1, 0, '2017-02-13 11:28:10'),
	(382, 'Ventas', 'facturacion', 'getTipoPago', 'facturacion/getTipoPago', 'OBTENER TIPO DE PAGO DE LA FACTURA', 1, 0, '2017-02-13 11:29:41'),
	(383, 'Ventas', 'facturacion', 'getDetFactura', 'facturacion/getDetFactura', 'OBTENER DETALLES DE LA FACTURA', 1, 0, '2017-02-13 11:29:57'),
	(384, 'Ventas', 'facturacion', 'imprimirFactura', 'facturacion/imprimirFactura', 'IMPRIMIR FACTURA', 1, 0, '2017-02-13 11:31:37'),
	(385, 'Ventas', 'facturacion', 'borrarFactura', 'facturacion/borrarFactura', 'ELIMINAR FACTURA', 1, 0, '2017-02-13 11:31:53'),
	(386, 'Ventas', 'facturacion', 'pagar', 'facturacion/pagar', 'PAGAR FACTURA', 1, 0, '2017-02-13 11:33:16'),
	(387, 'Ventas', 'facturacion', 'guardarFactura', 'facturacion/guardarFactura', 'GUARDAR FACTURA', 1, 0, '2017-02-13 11:33:21'),
	(388, 'Ventas', 'facturacion', 'guardarAbono', 'facturacion/guardarAbono', 'GUARDAR ABONO A FACTURA', 1, 0, '2017-02-13 11:34:28'),
	(389, 'Ventas', 'facturacion', 'guardarPago', 'facturacion/guardarPago', 'GUARDAR PAGO DE FACTURA', 1, 0, '2017-02-13 11:34:43'),
	(390, 'Ventas', 'facturacion', 'imprimir', 'facturacion/imprimir', 'IMPRIMIR FACTURA', 1, 0, '2017-02-13 11:42:25'),
	(391, 'Ventas', 'facturacion', 'anular', 'facturacion/anular', 'ANULAR LA FACTURA', 1, 0, '2017-02-13 11:43:36'),
	(392, 'Ventas', 'facturacion', 'aplicarAbono', 'facturacion/aplicarAbono', 'APLICAR ABONO DE FACTURA', 1, 0, '2017-02-13 11:45:11'),
	(393, 'Ventas', 'abonos', 'index', 'abonos/index', 'LISTADO DE ABONOS DE FACTURAS', 1, 0, '2017-02-13 11:46:16'),
	(394, 'Ventas', 'abonos', 'crear', 'abonos/crear', 'AGREGAR ABONO A FACTURA', 1, 0, '2017-02-13 11:46:40'),
	(395, 'Ventas', 'abonos', 'getTipoPago', 'abonos/getTipoPago', 'OBTENER TIPO DE PAGO DE ABONO', 1, 0, '2017-02-13 11:51:41'),
	(396, 'Ventas', 'abonos', 'getCuentas', 'abonos/getCuentas', 'OBTENER CUENTAS PARA APLICAR EL ABONO', 1, 0, '2017-02-13 11:51:51'),
	(397, 'Ventas', 'abonos', 'guardarAbono', 'abonos/guardarAbono', 'GUARDAR ABONO', 1, 0, '2017-02-13 11:53:18'),
	(398, 'Ventas', 'nota_entrega', 'index', 'nota_entrega/index', 'LISTADO DE NOTAS DE ENTREGA', 1, 0, '2017-02-13 11:55:38'),
	(399, 'Ventas', 'nota_entrega', 'crear', 'nota_entrega/crear', 'CREAR NOTA DE ENTREGA', 1, 0, '2017-02-13 11:58:00'),
	(400, 'Ventas', 'nota_entrega', 'editar', 'nota_entrega/editar', 'EDITAR NOTA DE ENTREGA', 1, 0, '2017-02-13 11:59:14'),
	(401, 'Ventas', 'nota_entrega', 'imprimir', 'nota_entrega/imprimir', 'IMPRIMIR NOTA DE ENTREGA', 1, 0, '2017-02-13 11:59:23'),
	(402, 'Ventas', 'nota_entrega', 'guardarNota', 'nota_entrega/guardarNota', 'GUARDAR NOTA DE ENTREGA', 1, 0, '2017-02-13 12:00:37'),
	(403, 'Ventas', 'nota_entrega', 'editarNota', 'nota_entrega/editarNota', 'EDITAR NOTA DE ENTREGA', 1, 0, '2017-02-13 12:01:06'),
	(404, 'Ventas', 'zonas', 'crear', 'zonas/crear', 'CREAR NUEVA ZONA', 1, 0, '2017-02-13 12:03:28'),
	(405, 'Ventas', 'zonas', 'index', 'zonas/index', 'LISTADO DE ZONAS', 1, 0, '2017-02-13 12:06:37'),
	(406, 'Ventas', 'zonas', 'editar', 'zonas/editar', 'MODIFICAR ZONAS', 1, 0, '2017-02-13 12:07:19'),
	(407, 'Ventas', 'zonas', 'borrar', 'zonas/borrar', 'ELIMINAR ZONA', 1, 0, '2017-02-13 12:07:57'),
	(408, 'Ventas', 'zonas', 'ver', 'zonas/ver', 'VER ZONAS', 1, 0, '2017-02-13 12:08:18'),
	(409, 'Ventas', 'cobrador', 'index', 'cobrador/index', 'LISTADO DE COBRADORES', 1, 0, '2017-02-13 12:08:57'),
	(410, 'Ventas', 'cobrador', 'crear', 'cobrador/crear', 'AGREGAR COBRADOR NUEVO', 1, 0, '2017-02-13 12:09:26'),
	(411, 'Ventas', 'cobrador', 'editar', 'cobrador/editar', 'MODIFICAR COBRADOR', 1, 0, '2017-02-13 12:09:55'),
	(412, 'Ventas', 'cobrador', 'borrar', 'cobrador/borrar', 'ELIMINAR COBRADOR', 1, 0, '2017-02-13 12:10:22'),
	(413, 'Ventas', 'cobrador', 'ver', 'cobrador/ver', 'VER COBRADORES', 1, 0, '2017-02-13 12:10:47'),
	(414, 'Ventas', 'vendedor', 'index', 'vendedor/index', 'LISTADO DE VENDEDORES', 1, 0, '2017-02-13 12:27:09'),
	(415, 'Ventas', 'vendedor', 'crear', 'vendedor/crear', 'AGREGAR VENDEDOR', 1, 0, '2017-02-13 12:27:49'),
	(416, 'Ventas', 'vendedor', 'editar', 'vendedor/editar', 'MODIFICAR INFORMACION DEL VENDEDOR', 1, 0, '2017-02-13 12:28:27'),
	(417, 'Ventas', 'vendedor', 'borrar', 'vendedor/borrar', 'ELIMINAR VENDEDOR', 1, 0, '2017-02-13 12:30:47'),
	(418, 'Ventas', 'vendedor', 'ver', 'vendedor/ver', 'VER INFORMACION DE VENDEDOR', 1, 0, '2017-02-13 12:31:12'),
	(419, 'Ventas', 'grupo_cliente', 'index', 'grupo_cliente/index', 'LISTADO DE GRUPOS DE CLIENTES', 1, 0, '2017-02-13 12:31:49'),
	(420, 'Ventas', 'grupo_cliente', 'crear', 'grupo_cliente/crear', 'AGREGAR NUEVO GRUPO DE CLIENTE', 1, 0, '2017-02-13 12:32:30'),
	(421, 'Ventas', 'grupo_cliente', 'editar', 'grupo_cliente/editar', 'MODIFICAR GRUPO DE CLIENTE', 1, 0, '2017-02-13 12:33:26'),
	(422, 'Ventas', 'grupo_cliente', 'borrar', 'grupo_cliente/borrar', 'ELIMINAR GRUPO DE CLIENTES', 1, 0, '2017-02-13 12:43:15'),
	(423, 'Ventas', 'grupo_cliente', 'ver', 'grupo_cliente/ver', 'VER GRUPOS DE CLIENTES', 1, 0, '2017-02-13 12:44:16'),
	(424, 'Reportes', 'Reportes', 'LibroCompra', 'Reportes/LibroCompra', 'REPORTE DE LIBRO DE COMPRAS', 1, 0, '2017-02-13 12:47:28'),
	(425, 'Reportes', 'Reportes', 'Compras_Gastos', 'Reportes/Compras_Gastos', 'REPORTE DE COMPRAS Y GASTOS', 1, 0, '2017-02-13 12:48:14'),
	(426, 'Reportes', 'Reportes', 'Gastos', 'Reportes/Gastos', 'REPORTE DE GASTOS', 1, 0, '2017-02-13 12:48:52'),
	(427, 'Reportes', 'Reportes', 'LibroVentas', 'Reportes/LibroVentas', 'REPORTE DE LIBRO DE VENTAS', 1, 0, '2017-02-13 12:49:48'),
	(428, 'Reportes', 'Reportes', 'Inventario', 'Reportes/Inventario', 'REPORTE DE INVENTARIO', 1, 0, '2017-02-13 12:50:25'),
	(429, 'Reportes', 'Reportes', 'MovimientoBanco', 'Reportes/MovimientoBanco', 'REPORTE DE MOVIMIENTOS DE BANCO', 1, 0, '2017-02-13 12:51:38'),
	(430, 'Reportes', 'Reportes', 'MovimientoCaja', 'Reportes/MovimientoCaja', 'REPORTE DE MOVIMIENTOS DE CAJA', 1, 0, '2017-02-13 12:52:13'),
	(431, 'Reportes', 'Reportes', 'CxC', 'Reportes/CxC', 'REPORTE DE CUENTAS POR COBRAR', 1, 0, '2017-02-13 12:53:26'),
	(432, 'Reportes', 'Reportes', 'CxP', 'Reportes/CxP', 'REPORTE DE CUENTAS POR PAGAR', 1, 0, '2017-02-13 12:53:57'),
	(433, 'Reportes', 'Reportes', 'FlujoDeCaja', 'Reportes/FlujoDeCaja', 'REPORTE DE FLUJO DE CAJA', 1, 0, '2017-02-13 12:54:44'),
	(434, 'Reportes', 'Reportes', 'FlujoDeCajaDiario', 'Reportes/FlujoDeCajaDiario', 'REPORTE DE FLUJO DE CAJA DIARIO', 1, 0, '2017-02-13 12:55:21'),
	(435, 'Reportes', 'Reportes', 'ListaPrecios', 'Reportes/ListaPrecios', 'LISTA DE PRECIOS DE PRODUCTOS', 1, 0, '2017-02-13 12:56:15'),
	(436, 'Reportes', 'Reportes', 'VentaDiaria', 'Reportes/VentaDiaria', 'REPORTE DE VENTA DIARIA', 1, 0, '2017-02-13 12:57:08'),
	(437, 'Reportes', 'Reportes', 'Clientes', 'Reportes/Clientes', 'REPORTE DE CLIENTES', 1, 0, '2017-02-13 12:58:18'),
	(438, 'Reportes', 'Reportes', 'ClientesZona', 'Reportes/ClientesZona', 'REPORTE DE CLIENTES POR ZONA', 1, 0, '2017-02-13 12:59:50'),
	(439, 'Reportes', 'Reportes', 'TransDeposito', 'Reportes/TransDeposito', 'REPORTE DE TRANSFERENCIA DE DEPOSITO', 1, 0, '2017-02-13 13:00:46'),
	(440, 'Reportes', 'Reportes', 'AjusteInventario', 'Reportes/AjusteInventario', 'REPORTE DE AJUSTES DE INVENTARIO', 1, 0, '2017-02-13 13:01:20'),
	(441, 'Reportes', 'Reportes', 'MovimientoInventario', 'Reportes/MovimientoInventario', 'REPORTE DE MOVIMIENTOS DE INVENTARIO', 1, 0, '2017-02-13 13:01:52'),
	(442, 'Reportes', 'Reportes', 'Descargos', 'Reportes/Descargos', 'REPORTE DE DESCARGOS DE MERCANCIA', 1, 0, '2017-02-13 13:02:27'),
	(443, 'Reportes', 'Reportes', 'Vendedores', 'Reportes/Vendedores', 'REPORTE DE VENTAS REALIZADAS POR VENDEDOR', 1, 0, '2017-02-13 13:04:18'),
	(444, 'Reportes', 'Reportes', 'VentaPorProducto', 'Reportes/VentaPorProducto', 'REPORTE DE VENTAS POR PRODUCTOS', 1, 0, '2017-02-13 13:05:07'),
	(445, 'Reportes', 'Reportes', 'Psicotropicos', 'Reportes/Psicotropicos', 'REPORTE DE PSICOTROPICOS', 1, 0, '2017-02-13 13:05:59'),
	(446, 'Reportes', 'Reportes', 'VentaGlobalProducto', 'Reportes/VentaGlobalProducto', 'REPORTE DE VENTAS GLOBALES POR PRODUCTO', 1, 0, '2017-02-13 13:06:37'),
	(447, 'Reportes', 'Reportes', 'CorteCaja', 'Reportes/CorteCaja', 'REPORTE DE CORTE DE CAJA', 1, 0, '2017-02-13 13:07:11'),
	(448, 'Dashboard', 'index', 'cierre_inventario', 'index/cierre_inventario', 'inventario mensual', 1, 0, '2017-08-10 08:22:46'),
	(449, 'Ventas', 'clientes', 'validar_usuario', 'clientes/validar_usuario', 'valida si el usuario puede cambiar limites de credito', 1, 0, '2018-02-26 13:43:30'),
	(450, 'Dashboard', 'index', 'menuCocina', 'index/menuCocina', 'permite mostrar el menú de la cocina', 1, 0, '2019-06-11 16:00:02'),
	(451, 'Dashboard', 'index', 'verNotificacion', 'index/verNotificacion', 'Permite ver las notificaciones enviada', 1, 0, '2019-06-11 16:02:16'),
	(452, 'Almacen', 'conceptos', 'cargarPlatos', 'conceptos/cargarPlatos', 'Carga los platos que tienen existencia', 1, 0, '2017-05-29 09:11:00'),
	(453, 'Almacen', 'conceptos', 'getConceptosCodigo', 'conceptos/getConceptosCodigo', 'obtiene los conceptos por codigo', 1, 0, '2017-05-29 09:14:00'),
	(454, 'Almacen', 'conceptos', 'getConceptosReferencia', 'conceptos/getConceptosReferencia', 'Obtiene los conceptos por referencia', 1, 0, '2017-05-29 09:16:00'),
	(455, 'Almacen', 'conceptos', 'uploadGaleria', 'conceptos/uploadGaleria', 'SUBIR IMAGENES', 1, 0, '2018-09-05 10:06:00'),
	(456, 'Almacen', 'conceptos', 'autocomplete', 'conceptos/autocomplete', 'autocompletar conceptos', 1, 0, '2018-09-05 10:07:00'),
	(457, 'Almacen', 'conceptos', 'autocompleteReporte', 'conceptos/autocompleteReporte', 'autocompleteReporte', 1, 0, '2018-09-05 10:07:00'),
	(458, 'Almacen', 'conceptos', 'listarLotes', 'conceptos/listarLotes', 'listarLotes', 1, 0, '2018-09-05 10:11:00'),
	(459, 'Almacen', 'conceptos', 'newListIng', 'conceptos/newListIng', 'Listado Ingredientes', 1, 0, '2018-09-05 10:12:00'),
	(460, 'Almacen', 'conceptos', 'newListEns', 'conceptos/newListEns', 'Listado Ensamblados', 1, 0, '2018-09-05 10:13:00'),
	(461, 'Almacen', 'conceptos', 'costos_ens', 'conceptos/costos_ens', 'Costos prod ensamblados', 1, 0, '2018-09-05 10:14:00'),
	(462, 'Almacen', 'conceptos', 'subirConceptos', 'conceptos/subirConceptos', 'Subir Imagen', 1, 0, '2018-09-05 10:15:00'),
	(463, 'Almacen', 'conceptos', 'listadoConceptos', 'conceptos/listadoConceptos', 'listadoConceptos', 1, 0, '2018-09-05 10:15:00'),
	(464, 'Almacen', 'conceptos', 'eliminarImagen', 'conceptos/eliminarImagen', 'eliminarImagen', 1, 0, '2018-09-05 10:16:00'),
	(465, 'Almacen', 'conceptos', 'listadoProductosPrecios', 'conceptos/listadoProductosPrecios', 'listadoProductosPrecios', 1, 0, '2018-09-05 10:17:00'),
	(466, 'Almacen', 'conceptos', 'newListPrecio', 'conceptos/newListPrecio', 'newListPrecio', 1, 0, '2018-09-05 10:17:00'),
	(467, 'Almacen', 'conceptos', 'actualizarPrecio', 'conceptos/actualizarPrecio', 'actualizarPrecio', 1, 0, '2018-09-05 10:17:00'),
	(468, 'Almacen', 'conceptos', 'actualizarPrecios', 'conceptos/actualizarPrecios', 'actualizarPrecios', 1, 0, '2018-09-05 10:18:00'),
	(469, 'Almacen', 'conceptos', 'info_licores', 'conceptos/info_licores', 'info_licores', 1, 0, '2018-09-05 10:18:00'),
	(470, 'Almacen', 'conceptos', 'verificar_duplicidad', 'conceptos/verificar_duplicidad', 'verificar_duplicidad', 1, 0, '2018-09-05 10:18:00'),
	(471, 'Almacen', 'conceptos', 'new_product', 'conceptos/new_product', 'new_product', 1, 0, '2018-09-05 10:19:00'),
	(472, 'Almacen', 'conceptos', 'new_product_cargo', 'conceptos/new_product_cargo', 'new_product_cargo', 1, 0, '2018-09-05 10:19:00'),
	(473, 'Almacen', 'conceptos', 'new_product_compra', 'conceptos/new_product_compra', 'new_product_compra', 1, 0, '2018-09-05 10:19:00'),
	(474, 'Almacen', 'conceptos', 'saveProduct', 'conceptos/saveProduct', 'saveProduct', 1, 0, '2018-09-05 10:20:00'),
	(475, 'Compras', 'proveedor', 'guardarProveedor', 'proveedor/guardarProveedor', 'guardarProveedor', 1, 0, '2018-09-05 11:29:00'),
	(476, 'Compras', 'proveedor', 'verificar_duplicidad', 'proveedor/verificar_duplicidad', 'verificar_duplicidad', 1, 0, '2018-09-05 11:29:00'),
	(477, 'Compras', 'proveedor', 'editarProveedor', 'proveedor/editarProveedor', 'editarProveedor', 1, 0, '2018-09-05 11:30:00'),
	(478, 'Compras', 'proveedor', 'new_proveedor', 'proveedor/new_proveedor', 'new_product_compra', 1, 0, '2018-09-05 11:29:00'),
	(479, 'Compras', 'compras', 'pagoMultiple', 'compras/pagoMultiple', 'Para pagos multiples', 1, 0, '2018-09-05 10:26:00'),
	(480, 'Compras', 'compras', 'guardarPagoMultiple', 'compras/guardarPagoMultiple', 'guardarPagoMultiple', 1, 0, '2018-09-05 10:27:00'),
	(481, 'Compras', 'compras', 'getTipoPagoNew', 'compras/getTipoPagoNew', 'getTipoPagoNew', 1, 0, '2018-09-05 10:27:00'),
	(482, 'Compras', 'compras', 'newListIndex', 'compras/newListIndex', 'newListIndex', 1, 0, '2018-09-05 10:28:00'),
	(483, 'Compras', 'compras', 'modificar_fila', 'compras/modificar_fila', 'modificar_fila', 1, 0, '2018-09-05 10:29:00'),
	(484, 'Compras', 'compras', 'confirmarTotales', 'compras/confirmarTotales', 'confirmarTotales', 1, 0, '2018-09-05 10:30:00'),
	(485, 'Compras', 'compras', 'getCompra', 'compras/getCompra', 'getCompra', 1, 0, '2018-09-05 10:31:00'),
	(486, 'Compras', 'compras', 'getDetCompra', 'compras/getDetCompra', 'getDetCompra', 1, 0, '2018-09-05 10:31:00'),
	(487, 'Compras', 'compras', 'guardar_borrador', 'compras/guardar_borrador', 'guardar_borrador', 1, 0, '2018-09-05 10:31:00'),
	(488, 'Compras', 'compras', 'eliminar_borrador', 'compras/eliminar_borrador', 'eliminar_borrador', 1, 0, '2018-09-05 10:32:00'),
	(489, 'Listados', 'listados', 'buscar_cliente', 'listados/buscar_cliente', 'listado de clientes registrados', 1, 0, '2016-09-09 11:31:00'),
	(490, 'Listados', 'listados', 'buscar_producto', 'listados/buscar_producto', 'permite ver el listado del producto', 1, 0, '2017-05-31 11:45:00'),
	(491, 'Listados', 'listados', 'buscar_producto_cocina', 'listados/buscar_producto_cocina', 'permite ver listado de producto de la cocina', 1, 0, '2017-05-31 12:02:00'),
	(492, 'Listados', 'listados', '*', 'listados/*', 'Todas las acciones', 1, 0, '2018-09-05 10:38:00'),
	(493, 'Reportes', 'reportes', 'VentaGlobalProducto', 'reportes/VentaGlobalProducto', 'REPORTE DE VENTAS GLOBALES POR PRODUCTO', 1, 0, '2017-02-13 13:06:00'),
	(494, 'Reportes', 'reportes', 'Existencias', 'reportes/Existencias', 'Reporte de las existencias de platos', 1, 0, '2017-05-29 13:42:00'),
	(495, 'Reportes', 'reportes', 'Conceptos', 'reportes/Conceptos', 'Listado de conceptos y reportes', 1, 0, '2018-03-21 16:52:00'),
	(496, 'Reportes', 'reportes', 'getConceptos', 'reportes/getConceptos', 'listado de conceptos', 1, 0, '2018-03-21 16:56:00'),
	(497, 'Reportes', 'reportes', 'ExistenciasM', 'reportes/ExistenciasM', 'Minimos y Maximos', 1, 0, '2018-03-22 12:00:00'),
	(498, 'Reportes', 'reportes', 'reporte_compra', 'reportes/reporte_compra', 'listado de compras', 1, 0, '2018-03-22 12:51:00'),
	(499, 'Reportes', 'reportes', 'getConceptoT', 'reportes/getConceptoT', 'getConceptoT', 1, 0, '2018-09-05 10:39:00'),
	(500, 'Reportes', 'reportes', 'ListExistencias', 'reportes/ListExistencias', 'ListExistencias', 1, 0, '2018-09-05 10:40:00'),
	(501, 'Reportes', 'reportes', 'getExistencia', 'reportes/getExistencia', 'getExistencia', 1, 0, '2018-09-05 10:45:00'),
	(502, 'Reportes', 'reportes', 'CierreInventario', 'reportes/CierreInventario', 'CierreInventario', 1, 0, '2018-09-05 10:46:00'),
	(503, 'Reportes', 'reportes', 'VentaGlobalProducto2', 'reportes/VentaGlobalProducto2', 'VentaGlobalProducto', 1, 0, '2018-09-05 11:07:00'),
	(504, 'Reportes', 'reportes', 'Rest_Anulados', 'reportes/Rest_Anulados', 'Rest_Anulados', 1, 0, '2018-09-05 11:09:00'),
	(505, 'Reportes', 'reportes', 'RankingProductos', 'reportes/RankingProductos', 'RankingProductos', 1, 0, '2018-09-05 11:09:00'),
	(506, 'Reportes', 'reportes', 'VentasClientes', 'reportes/VentasClientes', 'VentasClientes', 1, 0, '2018-09-05 11:10:00'),
	(507, 'Reportes', 'reportes', 'ResumenPedidos', 'reportes/ResumenPedidos', 'ResumenPedidos', 1, 0, '2018-09-05 11:10:00'),
	(508, 'Restaurant', 'conceptos', 'autocomplete', 'conceptos/autocomplete', 'buscador', 1, 0, '2016-08-30 16:04:00'),
	(509, 'restaurant', 'cocina', 'imprimir60', 'cocina/imprimir60', 'imprimir comanda', 1, 0, '2016-09-07 10:49:00'),
	(510, 'Restaurant', 'pedidos', 'autorizacion_cort', 'pedidos/autorizacion_cort', 'Para autorizaciones de cortesias', 1, 0, '2018-09-25 05:24:00'),
	(511, 'Restaurant', 'pedidos', 'confirmar_cortesia', 'pedidos/confirmar_cortesia', 'Confirma cortesia', 1, 0, '2018-09-25 05:28:00'),
	(512, 'Restaurant', 'pedidos', 'validar_autorizador', 'pedidos/validar_autorizador', 'Validar usuario que autoriza la cortesia', 1, 0, '2018-09-25 05:30:00'),
	(513, 'Restaurant', 'pedidos', 'getClienteCortesia', 'pedidos/getClienteCortesia', 'Cerrar mesa con cortersia', 1, 0, '2018-09-26 07:28:00'),
	(514, 'Restaurant', 'pedidos', 'cerrar_cortesia', 'pedidos/cerrar_cortesia', 'Cierra ell pedido que unicamente tiene cortesias', 1, 0, '2018-09-26 08:03:00'),
	(515, 'Restaurant', 'pedidos', 'getObservacionMovil', 'pedidos/getObservacionMovil', 'cerrar mesas movil', 1, 0, '2016-08-17 11:20:00'),
	(516, 'Restaurant', 'pedidos', 'precuenta', 'pedidos/precuenta', 'muestra la precuenta', 1, 0, '2016-09-07 11:22:00'),
	(517, 'Restaurant', 'pedidos', 'cerrar_mesa', 'pedidos/cerrar_mesa', 'cerrar la mesa', 1, 0, '2016-09-09 11:30:00'),
	(518, 'Restaurant', 'pedidos', 'caracteristicasMovil', 'pedidos/caracteristicasMovil', 'Permite visualizar la cantidad de pedidos a enviar', 1, 0, '2017-05-30 09:08:00'),
	(519, 'Restaurant', 'pedidos', 'buscador', 'pedidos/buscador', 'Consultador de precio en el menu de mesonero', 1, 0, '2017-07-25 10:09:00'),
	(520, 'Ventas', 'clientes', 'validar_usuario', 'clientes/validar_usuario', 'valida si el usuario puede cambiar limites de credito', 1, 0, '2018-02-26 13:43:00');
/*!40000 ALTER TABLE `recurso` ENABLE KEYS */;

-- Volcando estructura para tabla administra.recurso_perfil
CREATE TABLE IF NOT EXISTS `recurso_perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recurso_id` int(11) NOT NULL,
  `perfil_id` int(11) NOT NULL,
  `recurso_perfil_at` datetime DEFAULT NULL,
  `recurso_perfil_in` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recurso_perfil_recurso_idx` (`recurso_id`),
  KEY `fk_recurso_perfil_perfil_idx` (`perfil_id`),
  CONSTRAINT `fk_recurso_perfil_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_recurso_perfil_recurso` FOREIGN KEY (`recurso_id`) REFERENCES `recurso` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25057 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene los recursos del usuario en el sistema segun su perfl';

-- Volcando datos para la tabla administra.recurso_perfil: ~369 rows (aproximadamente)
DELETE FROM `recurso_perfil`;
/*!40000 ALTER TABLE `recurso_perfil` DISABLE KEYS */;
INSERT INTO `recurso_perfil` (`id`, `recurso_id`, `perfil_id`, `recurso_perfil_at`, `recurso_perfil_in`) VALUES
	(1, 1, 1, '2014-01-01 00:00:01', NULL),
	(2, 2, 2, '2014-03-31 23:35:39', NULL),
	(3, 2, 3, '2014-03-31 23:39:29', NULL),
	(4, 3, 3, '2014-03-31 23:39:29', NULL),
	(5, 3, 2, '2014-03-31 23:45:17', NULL),
	(6, 2, 4, '2014-03-31 23:59:48', NULL),
	(7, 3, 4, '2014-03-31 23:59:48', NULL),
	(55, 27, 1, '2016-05-17 11:00:17', NULL),
	(24155, 2, 6, '2014-04-01 00:01:44', NULL),
	(24156, 3, 6, '2014-04-01 00:01:44', NULL),
	(24397, 2, 8, '2019-06-11 16:03:57', NULL),
	(24398, 2, 7, '2019-06-11 16:03:57', NULL),
	(24399, 2, 5, '2019-06-11 16:03:57', NULL),
	(24701, 16, 3, '2019-06-11 23:14:18', NULL),
	(24702, 16, 2, '2019-06-11 23:14:18', NULL),
	(24703, 22, 3, '2019-06-11 23:14:18', NULL),
	(24704, 22, 2, '2019-06-11 23:14:18', NULL),
	(24705, 23, 3, '2019-06-11 23:14:18', NULL),
	(24706, 23, 2, '2019-06-11 23:14:18', NULL),
	(24707, 24, 3, '2019-06-11 23:14:18', NULL),
	(24708, 24, 2, '2019-06-11 23:14:18', NULL),
	(24709, 25, 3, '2019-06-11 23:14:18', NULL),
	(24710, 25, 2, '2019-06-11 23:14:18', NULL),
	(24711, 66, 3, '2019-06-11 23:14:18', NULL),
	(24712, 66, 2, '2019-06-11 23:14:18', NULL),
	(24713, 67, 3, '2019-06-11 23:14:18', NULL),
	(24714, 68, 3, '2019-06-11 23:14:18', NULL),
	(24715, 69, 3, '2019-06-11 23:14:18', NULL),
	(24716, 70, 3, '2019-06-11 23:14:18', NULL),
	(24717, 71, 3, '2019-06-11 23:14:18', NULL),
	(24718, 72, 3, '2019-06-11 23:14:18', NULL),
	(24719, 73, 3, '2019-06-11 23:14:18', NULL),
	(24720, 74, 3, '2019-06-11 23:14:18', NULL),
	(24721, 75, 3, '2019-06-11 23:14:18', NULL),
	(24722, 76, 3, '2019-06-11 23:14:18', NULL),
	(24723, 77, 3, '2019-06-11 23:14:18', NULL),
	(24724, 78, 3, '2019-06-11 23:14:18', NULL),
	(24725, 79, 3, '2019-06-11 23:14:18', NULL),
	(24726, 80, 3, '2019-06-11 23:14:18', NULL),
	(24727, 81, 3, '2019-06-11 23:14:18', NULL),
	(24728, 82, 3, '2019-06-11 23:14:18', NULL),
	(24729, 83, 3, '2019-06-11 23:14:18', NULL),
	(24730, 84, 3, '2019-06-11 23:14:18', NULL),
	(24731, 85, 3, '2019-06-11 23:14:18', NULL),
	(24732, 86, 3, '2019-06-11 23:14:18', NULL),
	(24733, 87, 3, '2019-06-11 23:14:18', NULL),
	(24734, 88, 3, '2019-06-11 23:14:18', NULL),
	(24735, 89, 3, '2019-06-11 23:14:18', NULL),
	(24736, 90, 3, '2019-06-11 23:14:18', NULL),
	(24737, 91, 3, '2019-06-11 23:14:18', NULL),
	(24738, 92, 3, '2019-06-11 23:14:18', NULL),
	(24739, 93, 3, '2019-06-11 23:14:18', NULL),
	(24740, 94, 3, '2019-06-11 23:14:18', NULL),
	(24741, 95, 3, '2019-06-11 23:14:18', NULL),
	(24742, 96, 3, '2019-06-11 23:14:18', NULL),
	(24743, 97, 3, '2019-06-11 23:14:18', NULL),
	(24744, 98, 3, '2019-06-11 23:14:18', NULL),
	(24745, 99, 3, '2019-06-11 23:14:18', NULL),
	(24746, 116, 3, '2019-06-11 23:14:18', NULL),
	(24747, 117, 3, '2019-06-11 23:14:18', NULL),
	(24748, 118, 3, '2019-06-11 23:14:18', NULL),
	(24749, 119, 3, '2019-06-11 23:14:18', NULL),
	(24750, 120, 3, '2019-06-11 23:14:18', NULL),
	(24751, 121, 3, '2019-06-11 23:14:18', NULL),
	(24752, 137, 3, '2019-06-11 23:14:18', NULL),
	(24753, 138, 3, '2019-06-11 23:14:18', NULL),
	(24754, 139, 3, '2019-06-11 23:14:18', NULL),
	(24755, 140, 3, '2019-06-11 23:14:18', NULL),
	(24756, 141, 3, '2019-06-11 23:14:18', NULL),
	(24757, 142, 3, '2019-06-11 23:14:18', NULL),
	(24758, 143, 3, '2019-06-11 23:14:18', NULL),
	(24759, 144, 3, '2019-06-11 23:14:18', NULL),
	(24760, 145, 3, '2019-06-11 23:14:18', NULL),
	(24761, 146, 3, '2019-06-11 23:14:18', NULL),
	(24762, 147, 3, '2019-06-11 23:14:18', NULL),
	(24763, 148, 3, '2019-06-11 23:14:18', NULL),
	(24764, 149, 3, '2019-06-11 23:14:18', NULL),
	(24765, 150, 3, '2019-06-11 23:14:18', NULL),
	(24766, 151, 3, '2019-06-11 23:14:18', NULL),
	(24767, 152, 3, '2019-06-11 23:14:18', NULL),
	(24768, 153, 3, '2019-06-11 23:14:18', NULL),
	(24769, 154, 3, '2019-06-11 23:14:18', NULL),
	(24770, 155, 3, '2019-06-11 23:14:18', NULL),
	(24771, 17, 3, '2019-06-11 23:14:18', NULL),
	(24772, 176, 3, '2019-06-11 23:14:18', NULL),
	(24773, 177, 3, '2019-06-11 23:14:18', NULL),
	(24774, 178, 3, '2019-06-11 23:14:18', NULL),
	(24775, 179, 3, '2019-06-11 23:14:18', NULL),
	(24776, 180, 3, '2019-06-11 23:14:18', NULL),
	(24777, 181, 3, '2019-06-11 23:14:18', NULL),
	(24778, 182, 3, '2019-06-11 23:14:18', NULL),
	(24779, 183, 3, '2019-06-11 23:14:18', NULL),
	(24780, 184, 3, '2019-06-11 23:14:18', NULL),
	(24781, 186, 3, '2019-06-11 23:14:18', NULL),
	(24782, 187, 3, '2019-06-11 23:14:18', NULL),
	(24783, 188, 3, '2019-06-11 23:14:18', NULL),
	(24784, 189, 3, '2019-06-11 23:14:18', NULL),
	(24785, 190, 3, '2019-06-11 23:14:18', NULL),
	(24786, 191, 3, '2019-06-11 23:14:18', NULL),
	(24787, 192, 3, '2019-06-11 23:14:18', NULL),
	(24788, 193, 3, '2019-06-11 23:14:18', NULL),
	(24789, 194, 3, '2019-06-11 23:14:18', NULL),
	(24790, 195, 3, '2019-06-11 23:14:18', NULL),
	(24791, 196, 3, '2019-06-11 23:14:18', NULL),
	(24792, 197, 3, '2019-06-11 23:14:18', NULL),
	(24793, 198, 3, '2019-06-11 23:14:18', NULL),
	(24794, 199, 3, '2019-06-11 23:14:18', NULL),
	(24795, 200, 3, '2019-06-11 23:14:18', NULL),
	(24796, 201, 3, '2019-06-11 23:14:18', NULL),
	(24797, 202, 3, '2019-06-11 23:14:18', NULL),
	(24798, 203, 3, '2019-06-11 23:14:18', NULL),
	(24799, 204, 3, '2019-06-11 23:14:18', NULL),
	(24800, 205, 3, '2019-06-11 23:14:18', NULL),
	(24801, 206, 3, '2019-06-11 23:14:18', NULL),
	(24802, 207, 3, '2019-06-11 23:14:18', NULL),
	(24803, 208, 3, '2019-06-11 23:14:18', NULL),
	(24804, 209, 3, '2019-06-11 23:14:18', NULL),
	(24805, 210, 3, '2019-06-11 23:14:18', NULL),
	(24806, 211, 3, '2019-06-11 23:14:18', NULL),
	(24807, 212, 3, '2019-06-11 23:14:18', NULL),
	(24808, 213, 3, '2019-06-11 23:14:18', NULL),
	(24809, 214, 3, '2019-06-11 23:14:18', NULL),
	(24810, 215, 3, '2019-06-11 23:14:18', NULL),
	(24811, 216, 3, '2019-06-11 23:14:18', NULL),
	(24812, 217, 3, '2019-06-11 23:14:18', NULL),
	(24813, 218, 3, '2019-06-11 23:14:18', NULL),
	(24814, 219, 3, '2019-06-11 23:14:18', NULL),
	(24815, 220, 3, '2019-06-11 23:14:18', NULL),
	(24816, 221, 3, '2019-06-11 23:14:18', NULL),
	(24817, 222, 3, '2019-06-11 23:14:18', NULL),
	(24818, 223, 3, '2019-06-11 23:14:18', NULL),
	(24819, 224, 3, '2019-06-11 23:14:18', NULL),
	(24820, 225, 3, '2019-06-11 23:14:18', NULL),
	(24821, 226, 3, '2019-06-11 23:14:18', NULL),
	(24822, 227, 3, '2019-06-11 23:14:18', NULL),
	(24823, 228, 3, '2019-06-11 23:14:18', NULL),
	(24824, 229, 3, '2019-06-11 23:14:18', NULL),
	(24825, 230, 3, '2019-06-11 23:14:18', NULL),
	(24826, 231, 3, '2019-06-11 23:14:18', NULL),
	(24827, 232, 3, '2019-06-11 23:14:18', NULL),
	(24828, 233, 3, '2019-06-11 23:14:18', NULL),
	(24829, 234, 3, '2019-06-11 23:14:18', NULL),
	(24830, 235, 3, '2019-06-11 23:14:18', NULL),
	(24831, 236, 3, '2019-06-11 23:14:18', NULL),
	(24832, 237, 3, '2019-06-11 23:14:18', NULL),
	(24833, 238, 3, '2019-06-11 23:14:18', NULL),
	(24834, 239, 3, '2019-06-11 23:14:18', NULL),
	(24835, 240, 3, '2019-06-11 23:14:18', NULL),
	(24836, 241, 3, '2019-06-11 23:14:18', NULL),
	(24837, 242, 3, '2019-06-11 23:14:18', NULL),
	(24838, 243, 3, '2019-06-11 23:14:18', NULL),
	(24839, 244, 3, '2019-06-11 23:14:18', NULL),
	(24840, 245, 3, '2019-06-11 23:14:18', NULL),
	(24841, 246, 3, '2019-06-11 23:14:18', NULL),
	(24842, 247, 3, '2019-06-11 23:14:18', NULL),
	(24843, 248, 3, '2019-06-11 23:14:18', NULL),
	(24844, 249, 3, '2019-06-11 23:14:18', NULL),
	(24845, 250, 3, '2019-06-11 23:14:18', NULL),
	(24846, 251, 3, '2019-06-11 23:14:18', NULL),
	(24847, 252, 3, '2019-06-11 23:14:18', NULL),
	(24848, 253, 3, '2019-06-11 23:14:18', NULL),
	(24849, 254, 3, '2019-06-11 23:14:18', NULL),
	(24850, 255, 3, '2019-06-11 23:14:18', NULL),
	(24851, 18, 3, '2019-06-11 23:14:18', NULL),
	(24852, 256, 3, '2019-06-11 23:14:18', NULL),
	(24853, 257, 3, '2019-06-11 23:14:18', NULL),
	(24854, 258, 3, '2019-06-11 23:14:18', NULL),
	(24855, 259, 3, '2019-06-11 23:14:18', NULL),
	(24856, 260, 3, '2019-06-11 23:14:18', NULL),
	(24857, 261, 3, '2019-06-11 23:14:18', NULL),
	(24858, 262, 3, '2019-06-11 23:14:18', NULL),
	(24859, 263, 3, '2019-06-11 23:14:18', NULL),
	(24860, 264, 3, '2019-06-11 23:14:18', NULL),
	(24861, 265, 3, '2019-06-11 23:14:18', NULL),
	(24862, 266, 3, '2019-06-11 23:14:18', NULL),
	(24863, 267, 3, '2019-06-11 23:14:18', NULL),
	(24864, 268, 3, '2019-06-11 23:14:18', NULL),
	(24865, 269, 3, '2019-06-11 23:14:18', NULL),
	(24866, 270, 3, '2019-06-11 23:14:18', NULL),
	(24867, 271, 3, '2019-06-11 23:14:18', NULL),
	(24868, 272, 3, '2019-06-11 23:14:18', NULL),
	(24869, 273, 3, '2019-06-11 23:14:18', NULL),
	(24870, 274, 3, '2019-06-11 23:14:18', NULL),
	(24871, 275, 3, '2019-06-11 23:14:18', NULL),
	(24872, 276, 3, '2019-06-11 23:14:18', NULL),
	(24873, 277, 3, '2019-06-11 23:14:18', NULL),
	(24874, 278, 3, '2019-06-11 23:14:18', NULL),
	(24875, 279, 3, '2019-06-11 23:14:18', NULL),
	(24876, 280, 3, '2019-06-11 23:14:18', NULL),
	(24877, 281, 3, '2019-06-11 23:14:18', NULL),
	(24878, 282, 3, '2019-06-11 23:14:18', NULL),
	(24879, 283, 3, '2019-06-11 23:14:18', NULL),
	(24880, 284, 3, '2019-06-11 23:14:18', NULL),
	(24881, 285, 3, '2019-06-11 23:14:18', NULL),
	(24882, 286, 3, '2019-06-11 23:14:18', NULL),
	(24883, 287, 3, '2019-06-11 23:14:18', NULL),
	(24884, 288, 3, '2019-06-11 23:14:18', NULL),
	(24885, 289, 3, '2019-06-11 23:14:18', NULL),
	(24886, 290, 3, '2019-06-11 23:14:18', NULL),
	(24887, 291, 3, '2019-06-11 23:14:18', NULL),
	(24888, 292, 3, '2019-06-11 23:14:18', NULL),
	(24889, 293, 3, '2019-06-11 23:14:18', NULL),
	(24890, 294, 3, '2019-06-11 23:14:18', NULL),
	(24891, 295, 3, '2019-06-11 23:14:18', NULL),
	(24892, 296, 3, '2019-06-11 23:14:18', NULL),
	(24893, 297, 3, '2019-06-11 23:14:18', NULL),
	(24894, 298, 3, '2019-06-11 23:14:18', NULL),
	(24895, 299, 3, '2019-06-11 23:14:18', NULL),
	(24896, 300, 3, '2019-06-11 23:14:18', NULL),
	(24897, 301, 3, '2019-06-11 23:14:18', NULL),
	(24898, 302, 3, '2019-06-11 23:14:18', NULL),
	(24899, 303, 3, '2019-06-11 23:14:18', NULL),
	(24900, 304, 3, '2019-06-11 23:14:18', NULL),
	(24901, 305, 3, '2019-06-11 23:14:18', NULL),
	(24902, 306, 3, '2019-06-11 23:14:18', NULL),
	(24903, 307, 3, '2019-06-11 23:14:18', NULL),
	(24904, 308, 3, '2019-06-11 23:14:18', NULL),
	(24905, 309, 3, '2019-06-11 23:14:18', NULL),
	(24906, 310, 3, '2019-06-11 23:14:18', NULL),
	(24907, 311, 3, '2019-06-11 23:14:18', NULL),
	(24908, 312, 3, '2019-06-11 23:14:18', NULL),
	(24909, 313, 3, '2019-06-11 23:14:18', NULL),
	(24910, 314, 3, '2019-06-11 23:14:18', NULL),
	(24911, 315, 3, '2019-06-11 23:14:18', NULL),
	(24912, 316, 3, '2019-06-11 23:14:18', NULL),
	(24913, 317, 3, '2019-06-11 23:14:18', NULL),
	(24914, 318, 3, '2019-06-11 23:14:18', NULL),
	(24915, 319, 3, '2019-06-11 23:14:18', NULL),
	(24916, 320, 3, '2019-06-11 23:14:18', NULL),
	(24917, 321, 3, '2019-06-11 23:14:18', NULL),
	(24918, 322, 3, '2019-06-11 23:14:18', NULL),
	(24919, 323, 3, '2019-06-11 23:14:18', NULL),
	(24920, 324, 3, '2019-06-11 23:14:18', NULL),
	(24921, 325, 3, '2019-06-11 23:14:18', NULL),
	(24922, 326, 3, '2019-06-11 23:14:18', NULL),
	(24923, 327, 3, '2019-06-11 23:14:18', NULL),
	(24924, 328, 3, '2019-06-11 23:14:18', NULL),
	(24925, 329, 3, '2019-06-11 23:14:18', NULL),
	(24926, 330, 3, '2019-06-11 23:14:18', NULL),
	(24927, 331, 3, '2019-06-11 23:14:18', NULL),
	(24928, 332, 3, '2019-06-11 23:14:18', NULL),
	(24929, 333, 3, '2019-06-11 23:14:18', NULL),
	(24930, 334, 3, '2019-06-11 23:14:18', NULL),
	(24931, 335, 3, '2019-06-11 23:14:18', NULL),
	(24932, 336, 3, '2019-06-11 23:14:18', NULL),
	(24933, 337, 3, '2019-06-11 23:14:18', NULL),
	(24934, 338, 3, '2019-06-11 23:14:18', NULL),
	(24935, 339, 3, '2019-06-11 23:14:18', NULL),
	(24936, 340, 3, '2019-06-11 23:14:18', NULL),
	(24937, 341, 3, '2019-06-11 23:14:18', NULL),
	(24938, 342, 3, '2019-06-11 23:14:18', NULL),
	(24939, 343, 3, '2019-06-11 23:14:18', NULL),
	(24940, 344, 3, '2019-06-11 23:14:18', NULL),
	(24941, 448, 8, '2019-06-11 23:14:18', NULL),
	(24942, 448, 7, '2019-06-11 23:14:18', NULL),
	(24943, 448, 3, '2019-06-11 23:14:18', NULL),
	(24944, 448, 4, '2019-06-11 23:14:18', NULL),
	(24945, 450, 7, '2019-06-11 23:14:18', NULL),
	(24946, 451, 8, '2019-06-11 23:14:18', NULL),
	(24947, 451, 7, '2019-06-11 23:14:18', NULL),
	(24948, 451, 5, '2019-06-11 23:14:18', NULL),
	(24949, 451, 6, '2019-06-11 23:14:18', NULL),
	(24950, 65, 3, '2019-06-11 23:14:18', NULL),
	(24951, 65, 4, '2019-06-11 23:14:18', NULL),
	(24952, 64, 3, '2019-06-11 23:14:18', NULL),
	(24953, 64, 4, '2019-06-11 23:14:18', NULL),
	(24954, 20, 3, '2019-06-11 23:14:18', NULL),
	(24955, 424, 3, '2019-06-11 23:14:18', NULL),
	(24956, 425, 3, '2019-06-11 23:14:18', NULL),
	(24957, 426, 3, '2019-06-11 23:14:18', NULL),
	(24958, 427, 3, '2019-06-11 23:14:18', NULL),
	(24959, 26, 5, '2019-06-11 23:14:18', NULL),
	(24960, 26, 6, '2019-06-11 23:14:18', NULL),
	(24961, 27, 6, '2019-06-11 23:14:18', NULL),
	(24962, 28, 5, '2019-06-11 23:14:18', NULL),
	(24963, 28, 6, '2019-06-11 23:14:18', NULL),
	(24964, 29, 5, '2019-06-11 23:14:18', NULL),
	(24965, 29, 6, '2019-06-11 23:14:18', NULL),
	(24966, 30, 5, '2019-06-11 23:14:18', NULL),
	(24967, 30, 6, '2019-06-11 23:14:18', NULL),
	(24968, 32, 5, '2019-06-11 23:14:18', NULL),
	(24969, 32, 6, '2019-06-11 23:14:18', NULL),
	(24970, 33, 5, '2019-06-11 23:14:18', NULL),
	(24971, 33, 6, '2019-06-11 23:14:18', NULL),
	(24972, 36, 5, '2019-06-11 23:14:18', NULL),
	(24973, 36, 6, '2019-06-11 23:14:18', NULL),
	(24974, 37, 5, '2019-06-11 23:14:18', NULL),
	(24975, 37, 6, '2019-06-11 23:14:18', NULL),
	(24976, 38, 5, '2019-06-11 23:14:18', NULL),
	(24977, 38, 6, '2019-06-11 23:14:18', NULL),
	(24978, 39, 5, '2019-06-11 23:14:18', NULL),
	(24979, 39, 6, '2019-06-11 23:14:18', NULL),
	(24980, 40, 5, '2019-06-11 23:14:18', NULL),
	(24981, 40, 6, '2019-06-11 23:14:18', NULL),
	(24982, 41, 5, '2019-06-11 23:14:18', NULL),
	(24983, 41, 6, '2019-06-11 23:14:18', NULL),
	(24984, 42, 5, '2019-06-11 23:14:18', NULL),
	(24985, 42, 6, '2019-06-11 23:14:18', NULL),
	(24986, 43, 5, '2019-06-11 23:14:18', NULL),
	(24987, 43, 6, '2019-06-11 23:14:18', NULL),
	(24988, 44, 5, '2019-06-11 23:14:18', NULL),
	(24989, 44, 6, '2019-06-11 23:14:18', NULL),
	(24990, 45, 5, '2019-06-11 23:14:18', NULL),
	(24991, 45, 6, '2019-06-11 23:14:18', NULL),
	(24992, 46, 5, '2019-06-11 23:14:18', NULL),
	(24993, 46, 6, '2019-06-11 23:14:18', NULL),
	(24994, 47, 5, '2019-06-11 23:14:18', NULL),
	(24995, 47, 6, '2019-06-11 23:14:18', NULL),
	(24996, 48, 5, '2019-06-11 23:14:18', NULL),
	(24997, 48, 6, '2019-06-11 23:14:18', NULL),
	(24998, 49, 5, '2019-06-11 23:14:18', NULL),
	(24999, 49, 6, '2019-06-11 23:14:18', NULL),
	(25000, 50, 6, '2019-06-11 23:14:18', NULL),
	(25001, 51, 6, '2019-06-11 23:14:18', NULL),
	(25002, 52, 5, '2019-06-11 23:14:18', NULL),
	(25003, 52, 6, '2019-06-11 23:14:18', NULL),
	(25004, 53, 5, '2019-06-11 23:14:18', NULL),
	(25005, 53, 6, '2019-06-11 23:14:18', NULL),
	(25006, 55, 5, '2019-06-11 23:14:18', NULL),
	(25007, 55, 6, '2019-06-11 23:14:18', NULL),
	(25008, 56, 6, '2019-06-11 23:14:18', NULL),
	(25009, 57, 5, '2019-06-11 23:14:18', NULL),
	(25010, 57, 6, '2019-06-11 23:14:18', NULL),
	(25011, 58, 5, '2019-06-11 23:14:18', NULL),
	(25012, 58, 6, '2019-06-11 23:14:18', NULL),
	(25013, 59, 5, '2019-06-11 23:14:18', NULL),
	(25014, 59, 6, '2019-06-11 23:14:18', NULL),
	(25015, 60, 5, '2019-06-11 23:14:18', NULL),
	(25016, 60, 6, '2019-06-11 23:14:18', NULL),
	(25017, 61, 5, '2019-06-11 23:14:18', NULL),
	(25018, 61, 6, '2019-06-11 23:14:18', NULL),
	(25019, 62, 5, '2019-06-11 23:14:18', NULL),
	(25020, 62, 6, '2019-06-11 23:14:18', NULL),
	(25021, 63, 5, '2019-06-11 23:14:18', NULL),
	(25022, 63, 6, '2019-06-11 23:14:18', NULL),
	(25023, 508, 5, '2019-06-11 23:14:18', NULL),
	(25024, 508, 6, '2019-06-11 23:14:18', NULL),
	(25025, 509, 5, '2019-06-11 23:14:18', NULL),
	(25026, 509, 6, '2019-06-11 23:14:18', NULL),
	(25027, 510, 5, '2019-06-11 23:14:18', NULL),
	(25028, 510, 6, '2019-06-11 23:14:18', NULL),
	(25029, 512, 5, '2019-06-11 23:14:18', NULL),
	(25030, 512, 6, '2019-06-11 23:14:18', NULL),
	(25031, 513, 5, '2019-06-11 23:14:18', NULL),
	(25032, 513, 6, '2019-06-11 23:14:18', NULL),
	(25033, 514, 5, '2019-06-11 23:14:18', NULL),
	(25034, 514, 6, '2019-06-11 23:14:18', NULL),
	(25035, 515, 5, '2019-06-11 23:14:18', NULL),
	(25036, 515, 6, '2019-06-11 23:14:18', NULL),
	(25037, 516, 5, '2019-06-11 23:14:18', NULL),
	(25038, 516, 6, '2019-06-11 23:14:18', NULL),
	(25039, 517, 5, '2019-06-11 23:14:18', NULL),
	(25040, 517, 6, '2019-06-11 23:14:18', NULL),
	(25041, 518, 5, '2019-06-11 23:14:18', NULL),
	(25042, 518, 6, '2019-06-11 23:14:18', NULL),
	(25043, 519, 5, '2019-06-11 23:14:18', NULL),
	(25044, 519, 6, '2019-06-11 23:14:18', NULL),
	(25045, 19, 3, '2019-06-11 23:14:18', NULL),
	(25046, 345, 3, '2019-06-11 23:14:18', NULL),
	(25047, 346, 3, '2019-06-11 23:14:18', NULL),
	(25048, 347, 3, '2019-06-11 23:14:18', NULL),
	(25049, 348, 3, '2019-06-11 23:14:18', NULL),
	(25050, 349, 3, '2019-06-11 23:14:18', NULL),
	(25051, 350, 3, '2019-06-11 23:14:18', NULL),
	(25052, 352, 3, '2019-06-11 23:14:18', NULL),
	(25053, 419, 3, '2019-06-11 23:14:18', NULL),
	(25054, 420, 3, '2019-06-11 23:14:18', NULL),
	(25055, 421, 3, '2019-06-11 23:14:18', NULL),
	(25056, 423, 3, '2019-06-11 23:14:18', NULL);
/*!40000 ALTER TABLE `recurso_perfil` ENABLE KEYS */;

-- Volcando estructura para tabla administra.reposicion_caja
CREATE TABLE IF NOT EXISTS `reposicion_caja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_reposicion` date NOT NULL,
  `fecha_at` datetime DEFAULT NULL,
  `caja_id` int(11) NOT NULL,
  `monto` decimal(30,2) NOT NULL,
  `concepto` varchar(150) CHARACTER SET utf8 NOT NULL,
  `banco_id` int(11) NOT NULL,
  `referencia` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `contabilizado` tinyint(1) DEFAULT NULL,
  `reversado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.reposicion_caja: ~0 rows (aproximadamente)
DELETE FROM `reposicion_caja`;
/*!40000 ALTER TABLE `reposicion_caja` DISABLE KEYS */;
/*!40000 ALTER TABLE `reposicion_caja` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_areas
CREATE TABLE IF NOT EXISTS `rest_areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `impresora` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.rest_areas: ~5 rows (aproximadamente)
DELETE FROM `rest_areas`;
/*!40000 ALTER TABLE `rest_areas` DISABLE KEYS */;
INSERT INTO `rest_areas` (`id`, `nombre`, `impresora`) VALUES
	(1, 'COCINA', 'CUSTOM Q3'),
	(2, 'BAR', NULL),
	(3, 'PIZZERIA', NULL),
	(4, 'zona prueba', 'hola'),
	(5, '', 'hola'),
	(6, '', 'hola');
/*!40000 ALTER TABLE `rest_areas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_caracteristicas
CREATE TABLE IF NOT EXISTS `rest_caracteristicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla administra.rest_caracteristicas: ~2 rows (aproximadamente)
DELETE FROM `rest_caracteristicas`;
/*!40000 ALTER TABLE `rest_caracteristicas` DISABLE KEYS */;
INSERT INTO `rest_caracteristicas` (`id`, `nombre`) VALUES
	(1, 'CARACT'),
	(2, 'USADO PARA EL ENSAMBLAJE');
/*!40000 ALTER TABLE `rest_caracteristicas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_det_pedidos
CREATE TABLE IF NOT EXISTS `rest_det_pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rest_pedidos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `precio` decimal(12,3) NOT NULL,
  `fecha_at` datetime DEFAULT NULL,
  `fecha_in` datetime DEFAULT NULL,
  `rest_estatus_id` int(11) NOT NULL,
  `estado` varchar(255) NOT NULL DEFAULT 'ACTIVO',
  `observacion` text,
  `rest_areas_id` int(11) DEFAULT NULL,
  `motivo` text,
  `autorizo` int(11) DEFAULT NULL,
  `impreso` tinyint(1) DEFAULT '0',
  `entrada` tinyint(1) DEFAULT '0',
  `usuario_id` int(11) DEFAULT NULL,
  `cortesia` tinyint(1) DEFAULT '0',
  `rest_motivo_anul_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Detalles del Pedido';

-- Volcando datos para la tabla administra.rest_det_pedidos: ~2 rows (aproximadamente)
DELETE FROM `rest_det_pedidos`;
/*!40000 ALTER TABLE `rest_det_pedidos` DISABLE KEYS */;
INSERT INTO `rest_det_pedidos` (`id`, `rest_pedidos_id`, `conceptos_id`, `cantidad`, `precio`, `fecha_at`, `fecha_in`, `rest_estatus_id`, `estado`, `observacion`, `rest_areas_id`, `motivo`, `autorizo`, `impreso`, `entrada`, `usuario_id`, `cortesia`, `rest_motivo_anul_id`) VALUES
	(1, 1, 1, 1.000, 41400.000, '2019-07-18 15:42:43', '2019-07-18 15:43:20', 7, 'ACTIVO', NULL, NULL, NULL, NULL, 0, 0, 2, NULL, NULL),
	(2, 1, 3, 1.000, 16755.200, '2019-07-18 15:42:46', '2019-07-18 15:43:23', 7, 'ACTIVO', NULL, 1, NULL, NULL, 0, 0, 2, NULL, NULL);
/*!40000 ALTER TABLE `rest_det_pedidos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_estatus
CREATE TABLE IF NOT EXISTS `rest_estatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.rest_estatus: ~7 rows (aproximadamente)
DELETE FROM `rest_estatus`;
/*!40000 ALTER TABLE `rest_estatus` DISABLE KEYS */;
INSERT INTO `rest_estatus` (`id`, `nombre`) VALUES
	(1, 'NUEVO'),
	(2, 'FACTURADO'),
	(3, 'POR FACTURAR'),
	(4, 'ENVIADO'),
	(5, 'NO FACTURADO'),
	(6, 'EN PROCESO'),
	(7, 'TERMINADO');
/*!40000 ALTER TABLE `rest_estatus` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_galeria
CREATE TABLE IF NOT EXISTS `rest_galeria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conceptos_id` int(11) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.rest_galeria: ~0 rows (aproximadamente)
DELETE FROM `rest_galeria`;
/*!40000 ALTER TABLE `rest_galeria` DISABLE KEYS */;
/*!40000 ALTER TABLE `rest_galeria` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_horarios
CREATE TABLE IF NOT EXISTS `rest_horarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `inicio` time NOT NULL,
  `fin` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.rest_horarios: ~2 rows (aproximadamente)
DELETE FROM `rest_horarios`;
/*!40000 ALTER TABLE `rest_horarios` DISABLE KEYS */;
INSERT INTO `rest_horarios` (`id`, `nombre`, `inicio`, `fin`) VALUES
	(1, 'Desayunos', '08:00:00', '11:29:59'),
	(2, 'Almuerzo', '11:30:00', '15:29:00');
/*!40000 ALTER TABLE `rest_horarios` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_mesas
CREATE TABLE IF NOT EXISTS `rest_mesas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rest_zonas_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `cant_personas` int(11) DEFAULT '0',
  `fecha_in` datetime DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'Disponible',
  `fecha_at` datetime DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT 'dining4.png',
  `privada` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.rest_mesas: ~0 rows (aproximadamente)
DELETE FROM `rest_mesas`;
/*!40000 ALTER TABLE `rest_mesas` DISABLE KEYS */;
INSERT INTO `rest_mesas` (`id`, `rest_zonas_id`, `nombre`, `cant_personas`, `fecha_in`, `estado`, `fecha_at`, `observacion`, `usuario_id`, `imagen`, `privada`) VALUES
	(1, 1, 'Mesa 1', 5, '2019-07-18 15:44:11', 'Por Facturar', '2019-07-18 15:42:38', NULL, 2, 'dining4.png', NULL);
/*!40000 ALTER TABLE `rest_mesas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_motivo_anul
CREATE TABLE IF NOT EXISTS `rest_motivo_anul` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.rest_motivo_anul: ~5 rows (aproximadamente)
DELETE FROM `rest_motivo_anul`;
/*!40000 ALTER TABLE `rest_motivo_anul` DISABLE KEYS */;
INSERT INTO `rest_motivo_anul` (`id`, `nombre`) VALUES
	(1, 'Retraso en Cocina'),
	(2, 'Plato Frio'),
	(3, 'Cambio Orden Cliente'),
	(4, 'Otro'),
	(5, 'Comida desagradable');
/*!40000 ALTER TABLE `rest_motivo_anul` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_pedidos
CREATE TABLE IF NOT EXISTS `rest_pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rest_mesas_id` int(11) NOT NULL,
  `rest_estatus_id` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'ACTIVO',
  `cant_personas` int(11) DEFAULT '1',
  `fecha_at` datetime DEFAULT NULL,
  `fecha_in` datetime DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `autorizo` int(11) DEFAULT NULL COMMENT 'Usuario que autoriza anulacion',
  `motivo` varchar(200) DEFAULT NULL,
  `observacion` text,
  `clientes_id` int(11) DEFAULT NULL,
  `enc_facturas_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.rest_pedidos: ~0 rows (aproximadamente)
DELETE FROM `rest_pedidos`;
/*!40000 ALTER TABLE `rest_pedidos` DISABLE KEYS */;
INSERT INTO `rest_pedidos` (`id`, `rest_mesas_id`, `rest_estatus_id`, `estado`, `cant_personas`, `fecha_at`, `fecha_in`, `usuario_id`, `autorizo`, `motivo`, `observacion`, `clientes_id`, `enc_facturas_id`) VALUES
	(1, 1, 3, 'ACTIVO', 5, '2019-07-18 15:42:43', '2019-07-18 15:44:11', 2, NULL, NULL, NULL, 1, NULL);
/*!40000 ALTER TABLE `rest_pedidos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_puntos
CREATE TABLE IF NOT EXISTS `rest_puntos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personal_id` int(11) NOT NULL,
  `puntos` decimal(10,3) NOT NULL DEFAULT '0.000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.rest_puntos: ~0 rows (aproximadamente)
DELETE FROM `rest_puntos`;
/*!40000 ALTER TABLE `rest_puntos` DISABLE KEYS */;
/*!40000 ALTER TABLE `rest_puntos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_turno_horario
CREATE TABLE IF NOT EXISTS `rest_turno_horario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `inicio` time NOT NULL,
  `fin` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.rest_turno_horario: ~0 rows (aproximadamente)
DELETE FROM `rest_turno_horario`;
/*!40000 ALTER TABLE `rest_turno_horario` DISABLE KEYS */;
INSERT INTO `rest_turno_horario` (`id`, `nombre`, `inicio`, `fin`) VALUES
	(1, 'unico', '06:00:00', '20:00:00');
/*!40000 ALTER TABLE `rest_turno_horario` ENABLE KEYS */;

-- Volcando estructura para tabla administra.rest_zonas
CREATE TABLE IF NOT EXISTS `rest_zonas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT '0',
  `servicio` tinyint(4) DEFAULT '0',
  `multiusos` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.rest_zonas: ~2 rows (aproximadamente)
DELETE FROM `rest_zonas`;
/*!40000 ALTER TABLE `rest_zonas` DISABLE KEYS */;
INSERT INTO `rest_zonas` (`id`, `nombre`, `servicio`, `multiusos`) VALUES
	(1, 'SALON', 0, 0),
	(2, 'BARRA', 0, 0);
/*!40000 ALTER TABLE `rest_zonas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.retiros_caja
CREATE TABLE IF NOT EXISTS `retiros_caja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caja_id` int(11) DEFAULT '0',
  `monto` decimal(12,2) DEFAULT '0.00',
  `clientes_id` int(11) DEFAULT '0',
  `motivo_retiro_id` int(11) DEFAULT NULL,
  `Observacion` text,
  `fecha_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.retiros_caja: ~0 rows (aproximadamente)
DELETE FROM `retiros_caja`;
/*!40000 ALTER TABLE `retiros_caja` DISABLE KEYS */;
/*!40000 ALTER TABLE `retiros_caja` ENABLE KEYS */;

-- Volcando estructura para tabla administra.seriales
CREATE TABLE IF NOT EXISTS `seriales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serial` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `clientes_id` int(11) DEFAULT '0',
  `enc_facturas_id` int(11) DEFAULT '0',
  `fecha_in` date DEFAULT NULL,
  `fecha_at` date DEFAULT NULL,
  `vendido` tinyint(1) NOT NULL DEFAULT '0',
  `documento` int(11) DEFAULT NULL,
  `origen` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clientes_id` (`clientes_id`),
  KEY `productos_id` (`conceptos_id`,`clientes_id`),
  KEY `enc_facturas_id` (`enc_facturas_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.seriales: ~0 rows (aproximadamente)
DELETE FROM `seriales`;
/*!40000 ALTER TABLE `seriales` DISABLE KEYS */;
/*!40000 ALTER TABLE `seriales` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_area
CREATE TABLE IF NOT EXISTS `serv_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.serv_area: ~0 rows (aproximadamente)
DELETE FROM `serv_area`;
/*!40000 ALTER TABLE `serv_area` DISABLE KEYS */;
INSERT INTO `serv_area` (`id`, `nombre`) VALUES
	(1, 'refrigeracion');
/*!40000 ALTER TABLE `serv_area` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_carro
CREATE TABLE IF NOT EXISTS `serv_carro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(250) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.serv_carro: ~0 rows (aproximadamente)
DELETE FROM `serv_carro`;
/*!40000 ALTER TABLE `serv_carro` DISABLE KEYS */;
/*!40000 ALTER TABLE `serv_carro` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_caso
CREATE TABLE IF NOT EXISTS `serv_caso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` datetime DEFAULT NULL,
  `fecha_in` date DEFAULT NULL,
  `titulo` varchar(150) DEFAULT '0',
  `serv_medio_comunicacion_id` int(11) NOT NULL DEFAULT '0',
  `clientes_id` int(11) NOT NULL DEFAULT '0',
  `serv_tecnico_id` int(11) NOT NULL DEFAULT '0',
  `serv_relevancia_id` int(11) NOT NULL DEFAULT '0',
  `serv_area_id` int(11) NOT NULL DEFAULT '0',
  `serv_status_id` int(11) DEFAULT '1',
  `descripcion_detallada` text NOT NULL,
  `fecha_tentativa` date NOT NULL,
  `hora_tentativa` time NOT NULL,
  `tiempo_ejecucion` time NOT NULL,
  `monto` decimal(13,2) DEFAULT '1500.00',
  `enc_presupuesto_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.serv_caso: ~0 rows (aproximadamente)
DELETE FROM `serv_caso`;
/*!40000 ALTER TABLE `serv_caso` DISABLE KEYS */;
/*!40000 ALTER TABLE `serv_caso` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_caso_seguimiento
CREATE TABLE IF NOT EXISTS `serv_caso_seguimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serv_caso_id` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_at` datetime NOT NULL,
  `fecha` date NOT NULL,
  `hora_ini` time NOT NULL,
  `hora_fin` time NOT NULL,
  `serv_tecnico_id` int(11) NOT NULL,
  `serv_carro_id` int(11) DEFAULT NULL,
  `serv_ruta_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `serv_caso_id` (`serv_caso_id`),
  CONSTRAINT `serv_caso_seguimiento_ibfk_1` FOREIGN KEY (`serv_caso_id`) REFERENCES `serv_caso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.serv_caso_seguimiento: ~0 rows (aproximadamente)
DELETE FROM `serv_caso_seguimiento`;
/*!40000 ALTER TABLE `serv_caso_seguimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `serv_caso_seguimiento` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_det_seguimiento
CREATE TABLE IF NOT EXISTS `serv_det_seguimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serv_caso_id` int(11) NOT NULL,
  `depositos_id` int(11) NOT NULL,
  `conceptos_id` int(11) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `descuentopro` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.serv_det_seguimiento: ~0 rows (aproximadamente)
DELETE FROM `serv_det_seguimiento`;
/*!40000 ALTER TABLE `serv_det_seguimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `serv_det_seguimiento` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_medio_comunicacion
CREATE TABLE IF NOT EXISTS `serv_medio_comunicacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.serv_medio_comunicacion: ~6 rows (aproximadamente)
DELETE FROM `serv_medio_comunicacion`;
/*!40000 ALTER TABLE `serv_medio_comunicacion` DISABLE KEYS */;
INSERT INTO `serv_medio_comunicacion` (`id`, `nombre`) VALUES
	(1, 'EMAIL'),
	(2, 'LLAMADA TELEFONICA'),
	(3, 'SMS'),
	(4, 'PRESENCIALMENTE'),
	(5, 'PIN BBM'),
	(6, 'WHATSAPP');
/*!40000 ALTER TABLE `serv_medio_comunicacion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_relevancia
CREATE TABLE IF NOT EXISTS `serv_relevancia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.serv_relevancia: ~5 rows (aproximadamente)
DELETE FROM `serv_relevancia`;
/*!40000 ALTER TABLE `serv_relevancia` DISABLE KEYS */;
INSERT INTO `serv_relevancia` (`id`, `nombre`) VALUES
	(1, 'SUPER URGENTE'),
	(2, 'URGENTE'),
	(3, 'ALTA'),
	(4, 'MEDIA'),
	(5, 'BAJA');
/*!40000 ALTER TABLE `serv_relevancia` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_ruta
CREATE TABLE IF NOT EXISTS `serv_ruta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(250) NOT NULL,
  `tarifa` decimal(13,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.serv_ruta: ~57 rows (aproximadamente)
DELETE FROM `serv_ruta`;
/*!40000 ALTER TABLE `serv_ruta` DISABLE KEYS */;
INSERT INTO `serv_ruta` (`id`, `descripcion`, `tarifa`) VALUES
	(1, 'CC SAMBIL', 540.00),
	(3, 'JUANGRIEGO', 840.00),
	(5, 'PORLAMAR', 600.00),
	(7, 'CC AB', 600.00),
	(8, 'EN OFICINA', 0.00),
	(9, 'CC BAYSIDE', 300.00),
	(10, 'CC PARQUE COSTAZUL', 600.00),
	(11, 'CONEJEROS', 540.00),
	(12, 'LA FUENTE', 480.00),
	(13, 'LA LOMA', 260.00),
	(14, 'PARAGUACHI', 540.00),
	(15, 'EL TIRANO', 560.00),
	(16, 'APOSTADERO', 540.00),
	(17, 'LOS ROBLES', 540.00),
	(18, 'PAMPATAR', 600.00),
	(19, 'JORGE COLL', 540.00),
	(20, 'CC RATTAN PLAZA', 540.00),
	(21, 'PLAYA EL ANGEL', 540.00),
	(22, 'SANTIAGO MARI*O', 550.00),
	(23, 'AV 4 DE MAYO', 690.00),
	(24, 'EL FARO', 330.00),
	(25, 'EL MORRO', 360.00),
	(26, 'LOS COCOS', 330.00),
	(27, 'SIGO PROVEEDURIA', 600.00),
	(28, 'BOCA DE RIO', 2700.00),
	(29, 'LAS HERNANDEZ', 1900.00),
	(30, 'PUNTA DE PIEDRA', 2400.00),
	(31, 'EL GUAMACHE', 1060.00),
	(32, 'PALOSANO', 140.00),
	(33, 'GUATAMARE', 420.00),
	(34, 'LA AGUADA', 180.00),
	(35, 'ATAMO SUR', 160.00),
	(36, 'SALAMANCA', 140.00),
	(37, 'TACARIGUA', 480.00),
	(38, 'SANTA ANA', 500.00),
	(39, 'LA VECINDAD', 720.00),
	(40, 'ALTAGRACIA', 840.00),
	(41, 'PEDRO GONZALEZ', 960.00),
	(42, 'GUAYACAN', 1320.00),
	(43, 'CLINICA EL VALLE', 480.00),
	(44, 'EL PIACHE', 720.00),
	(45, 'VILLAROSA', 950.00),
	(46, 'SAN ANTONIO', 840.00),
	(47, 'COTOPERIZ', 320.00),
	(48, 'LA ISLETA', 360.00),
	(49, 'SAN JUAN', 1440.00),
	(50, 'LA GUARDIA', 1600.00),
	(51, 'AEROPUERTO', 780.00),
	(52, 'PEDREGALES', 960.00),
	(53, 'LA GALERA', 960.00),
	(54, 'CC LA VELA', 600.00),
	(55, 'EL YAQUE', 1300.00),
	(56, 'PLAYA EL AGUA', 720.00),
	(57, 'LA OTRABANDA', 150.00),
	(58, 'LA ASUNCION', 200.00),
	(59, 'EL ESPINAL', 1440.00),
	(60, 'BELLA VISTA', 600.00);
/*!40000 ALTER TABLE `serv_ruta` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_status
CREATE TABLE IF NOT EXISTS `serv_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.serv_status: ~10 rows (aproximadamente)
DELETE FROM `serv_status`;
/*!40000 ALTER TABLE `serv_status` DISABLE KEYS */;
INSERT INTO `serv_status` (`id`, `nombre`) VALUES
	(1, 'ABIERTO'),
	(3, 'EN PROCESO'),
	(4, 'PAUSADO'),
	(5, 'CERRADO'),
	(6, 'POR FACTURAR'),
	(7, 'POR PRESUPUESTAR'),
	(8, 'POR ENTREGAR'),
	(9, 'EJECUTANDOSE'),
	(10, 'ASIGNADO'),
	(11, 'ESPERANDO POR EL CLIENTE');
/*!40000 ALTER TABLE `serv_status` ENABLE KEYS */;

-- Volcando estructura para tabla administra.serv_tecnico
CREATE TABLE IF NOT EXISTS `serv_tecnico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) CHARACTER SET utf8 NOT NULL,
  `telefono` varchar(50) CHARACTER SET utf8 NOT NULL,
  `correo` varchar(150) CHARACTER SET utf8 NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.serv_tecnico: ~0 rows (aproximadamente)
DELETE FROM `serv_tecnico`;
/*!40000 ALTER TABLE `serv_tecnico` DISABLE KEYS */;
/*!40000 ALTER TABLE `serv_tecnico` ENABLE KEYS */;

-- Volcando estructura para tabla administra.subgrupos
CREATE TABLE IF NOT EXISTS `subgrupos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grupos_id` int(11) NOT NULL DEFAULT '0',
  `nombre` varchar(255) CHARACTER SET utf8 NOT NULL,
  `imagen` varchar(50) NOT NULL DEFAULT 'default.png',
  `visualizar` tinyint(1) NOT NULL DEFAULT '0',
  `posicion` tinyint(3) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `grupos_id` (`grupos_id`),
  CONSTRAINT `fk_subgrupos_grupos` FOREIGN KEY (`grupos_id`) REFERENCES `grupos` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.subgrupos: ~15 rows (aproximadamente)
DELETE FROM `subgrupos`;
/*!40000 ALTER TABLE `subgrupos` DISABLE KEYS */;
INSERT INTO `subgrupos` (`id`, `grupos_id`, `nombre`, `imagen`, `visualizar`, `posicion`) VALUES
	(1, 2, 'SIN ALCOHOL', 'default.png', 1, 1),
	(2, 2, 'CON ALCOHOL', 'default.png', 1, 1),
	(3, 2, 'JUGOS', 'default.png', 1, 1),
	(4, 3, 'AVE', 'default.png', 1, 1),
	(5, 3, 'BOVINA', 'default.png', 1, 1),
	(6, 3, 'PESCADO', 'default.png', 1, 1),
	(7, 7, 'HARINAS', 'default.png', 0, 1),
	(8, 7, 'CEREALES DE CONSUMO', 'default.png', 0, 1),
	(9, 4, 'JAMON', 'default.png', 0, 1),
	(10, 4, 'CHORIZO', 'default.png', 0, 1),
	(11, 4, 'SALCHICHA', 'default.png', 0, 1),
	(12, 10, 'SNACKS', 'default.png', 1, 1),
	(13, 11, 'Sopa de pollo', 'default.png', 1, 1),
	(14, 11, 'Sopa de carne', 'default.png', 1, 1),
	(15, 11, 'Sopa de mondongo', 'default.png', 1, 1);
/*!40000 ALTER TABLE `subgrupos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.sueldo_minimo
CREATE TABLE IF NOT EXISTS `sueldo_minimo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` date DEFAULT NULL,
  `monto` decimal(12,2) NOT NULL,
  `fecha_vigencia` date NOT NULL,
  `gaceta` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.sueldo_minimo: ~0 rows (aproximadamente)
DELETE FROM `sueldo_minimo`;
/*!40000 ALTER TABLE `sueldo_minimo` DISABLE KEYS */;
/*!40000 ALTER TABLE `sueldo_minimo` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipos_conceptos
CREATE TABLE IF NOT EXISTS `tipos_conceptos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='tipos de productos del sistema';

-- Volcando datos para la tabla administra.tipos_conceptos: ~5 rows (aproximadamente)
DELETE FROM `tipos_conceptos`;
/*!40000 ALTER TABLE `tipos_conceptos` DISABLE KEYS */;
INSERT INTO `tipos_conceptos` (`id`, `nombre`) VALUES
	(1, 'Servicio'),
	(2, 'Articulo'),
	(3, 'Compuesto'),
	(4, 'GASTOS'),
	(5, 'Ensamblado');
/*!40000 ALTER TABLE `tipos_conceptos` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipos_facturas
CREATE TABLE IF NOT EXISTS `tipos_facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 NOT NULL,
  `inicial` char(4) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.tipos_facturas: ~5 rows (aproximadamente)
DELETE FROM `tipos_facturas`;
/*!40000 ALTER TABLE `tipos_facturas` DISABLE KEYS */;
INSERT INTO `tipos_facturas` (`id`, `nombre`, `inicial`) VALUES
	(1, 'Factura', 'F'),
	(2, 'Devolucion', 'D'),
	(3, 'Nota de Credito', 'NC'),
	(4, 'Nota de Debito', 'ND'),
	(5, 'Factura', 'FL');
/*!40000 ALTER TABLE `tipos_facturas` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipos_requisicion
CREATE TABLE IF NOT EXISTS `tipos_requisicion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla administra.tipos_requisicion: ~0 rows (aproximadamente)
DELETE FROM `tipos_requisicion`;
/*!40000 ALTER TABLE `tipos_requisicion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipos_requisicion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_aumento
CREATE TABLE IF NOT EXISTS `tipo_aumento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.tipo_aumento: ~3 rows (aproximadamente)
DELETE FROM `tipo_aumento`;
/*!40000 ALTER TABLE `tipo_aumento` DISABLE KEYS */;
INSERT INTO `tipo_aumento` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'SUELDO MINIMO', NULL),
	(2, 'LINEAL', NULL),
	(3, 'PERSONALIZADO', NULL);
/*!40000 ALTER TABLE `tipo_aumento` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_aumento_precios
CREATE TABLE IF NOT EXISTS `tipo_aumento_precios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.tipo_aumento_precios: ~2 rows (aproximadamente)
DELETE FROM `tipo_aumento_precios`;
/*!40000 ALTER TABLE `tipo_aumento_precios` DISABLE KEYS */;
INSERT INTO `tipo_aumento_precios` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Lineal', ''),
	(3, 'Compras', NULL);
/*!40000 ALTER TABLE `tipo_aumento_precios` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_concepto
CREATE TABLE IF NOT EXISTS `tipo_concepto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` datetime DEFAULT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.tipo_concepto: ~5 rows (aproximadamente)
DELETE FROM `tipo_concepto`;
/*!40000 ALTER TABLE `tipo_concepto` DISABLE KEYS */;
INSERT INTO `tipo_concepto` (`id`, `fecha_at`, `nombre`, `descripcion`) VALUES
	(1, '2015-07-20 10:03:03', 'ASIGNACION', NULL),
	(2, '2015-07-20 10:03:11', 'DEDUCCION', NULL),
	(3, '2015-07-20 10:03:26', 'VACACIONES', NULL),
	(4, '2015-07-20 10:03:38', 'LIQUIDACION', NULL),
	(5, '2015-07-20 10:03:44', 'PATRONAL', NULL);
/*!40000 ALTER TABLE `tipo_concepto` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_cuenta
CREATE TABLE IF NOT EXISTS `tipo_cuenta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.tipo_cuenta: ~2 rows (aproximadamente)
DELETE FROM `tipo_cuenta`;
/*!40000 ALTER TABLE `tipo_cuenta` DISABLE KEYS */;
INSERT INTO `tipo_cuenta` (`id`, `nombre`) VALUES
	(1, 'CORRIENTE'),
	(2, 'AHORRO');
/*!40000 ALTER TABLE `tipo_cuenta` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_descargo
CREATE TABLE IF NOT EXISTS `tipo_descargo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.tipo_descargo: ~3 rows (aproximadamente)
DELETE FROM `tipo_descargo`;
/*!40000 ALTER TABLE `tipo_descargo` DISABLE KEYS */;
INSERT INTO `tipo_descargo` (`id`, `nombre`) VALUES
	(1, 'NORMAL'),
	(2, 'AUTOCONSUMO'),
	(3, 'RETIRO');
/*!40000 ALTER TABLE `tipo_descargo` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_empleado
CREATE TABLE IF NOT EXISTS `tipo_empleado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla administra.tipo_empleado: ~2 rows (aproximadamente)
DELETE FROM `tipo_empleado`;
/*!40000 ALTER TABLE `tipo_empleado` DISABLE KEYS */;
INSERT INTO `tipo_empleado` (`id`, `nombre`) VALUES
	(1, 'FIJO'),
	(2, 'OBRERO');
/*!40000 ALTER TABLE `tipo_empleado` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_estatus
CREATE TABLE IF NOT EXISTS `tipo_estatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.tipo_estatus: ~3 rows (aproximadamente)
DELETE FROM `tipo_estatus`;
/*!40000 ALTER TABLE `tipo_estatus` DISABLE KEYS */;
INSERT INTO `tipo_estatus` (`id`, `nombre`) VALUES
	(1, 'ACTIVO'),
	(2, 'INACTIVO'),
	(3, 'VACACIONES');
/*!40000 ALTER TABLE `tipo_estatus` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_estatus_ensamblado
CREATE TABLE IF NOT EXISTS `tipo_estatus_ensamblado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.tipo_estatus_ensamblado: ~3 rows (aproximadamente)
DELETE FROM `tipo_estatus_ensamblado`;
/*!40000 ALTER TABLE `tipo_estatus_ensamblado` DISABLE KEYS */;
INSERT INTO `tipo_estatus_ensamblado` (`id`, `nombre`) VALUES
	(1, 'Nueva '),
	(2, 'Procesada'),
	(3, 'Anulada');
/*!40000 ALTER TABLE `tipo_estatus_ensamblado` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_movimiento
CREATE TABLE IF NOT EXISTS `tipo_movimiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.tipo_movimiento: ~2 rows (aproximadamente)
DELETE FROM `tipo_movimiento`;
/*!40000 ALTER TABLE `tipo_movimiento` DISABLE KEYS */;
INSERT INTO `tipo_movimiento` (`id`, `nombre`) VALUES
	(1, 'Ingreso'),
	(2, 'Egreso');
/*!40000 ALTER TABLE `tipo_movimiento` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_nomina
CREATE TABLE IF NOT EXISTS `tipo_nomina` (
  `id` int(11) NOT NULL,
  `tipo` varchar(150) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla administra.tipo_nomina: ~0 rows (aproximadamente)
DELETE FROM `tipo_nomina`;
/*!40000 ALTER TABLE `tipo_nomina` DISABLE KEYS */;
INSERT INTO `tipo_nomina` (`id`, `tipo`, `descripcion`) VALUES
	(1, 'Empleados Fijos', NULL);
/*!40000 ALTER TABLE `tipo_nomina` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_pago
CREATE TABLE IF NOT EXISTS `tipo_pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  `ver_pos` tinyint(4) NOT NULL,
  `ver_referencia` tinyint(4) NOT NULL,
  `ver_bco_origen` tinyint(4) NOT NULL,
  `ver_bco_destino` tinyint(4) NOT NULL,
  `ver_cuenta` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.tipo_pago: ~3 rows (aproximadamente)
DELETE FROM `tipo_pago`;
/*!40000 ALTER TABLE `tipo_pago` DISABLE KEYS */;
INSERT INTO `tipo_pago` (`id`, `nombre`, `ver_pos`, `ver_referencia`, `ver_bco_origen`, `ver_bco_destino`, `ver_cuenta`) VALUES
	(1, 'EFECTIVO', 0, 0, 0, 0, 0),
	(2, 'DEPOSITO', 0, 0, 0, 0, 0),
	(3, 'TRANSFERENCIA', 0, 0, 0, 0, 0);
/*!40000 ALTER TABLE `tipo_pago` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_proveedor
CREATE TABLE IF NOT EXISTS `tipo_proveedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.tipo_proveedor: ~0 rows (aproximadamente)
DELETE FROM `tipo_proveedor`;
/*!40000 ALTER TABLE `tipo_proveedor` DISABLE KEYS */;
INSERT INTO `tipo_proveedor` (`id`, `nombre`) VALUES
	(1, 'GENERAL');
/*!40000 ALTER TABLE `tipo_proveedor` ENABLE KEYS */;

-- Volcando estructura para tabla administra.tipo_retencion
CREATE TABLE IF NOT EXISTS `tipo_retencion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `concepto` varchar(255) CHARACTER SET utf8 NOT NULL,
  `codigo_xml` varchar(50) NOT NULL,
  `porcentaje_retencion` decimal(10,2) NOT NULL,
  `sustraendo` decimal(10,2) DEFAULT NULL,
  `valor_unidad_tributaria` decimal(10,2) NOT NULL,
  `pago_superior` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.tipo_retencion: ~20 rows (aproximadamente)
DELETE FROM `tipo_retencion`;
/*!40000 ALTER TABLE `tipo_retencion` DISABLE KEYS */;
INSERT INTO `tipo_retencion` (`id`, `concepto`, `codigo_xml`, `porcentaje_retencion`, `sustraendo`, `valor_unidad_tributaria`, `pago_superior`) VALUES
	(1, 'PN - Honorarios Profesionales Pagos efectuados en clínicas, hospitales y otros centros de salud, bufetes, escritorios, oficinas, colegios profesionales, médicos, psicólogos, radiólogos,  abogados,  ingenieros  y  demás profesionales. ', '2', 3.00, 1250.00, 500.00, 41666.67),
	(2, 'PJ - Honorarios Profesionales Pagos efectuados en clínicas, hospitales y otros centros de salud, bufetes, escritorios, oficinas, colegios profesionales, médicos, psicólogos, radiólogos,  abogados,  ingenieros  y  demás profesionales. ', '4', 5.00, 0.00, 500.00, 25.00),
	(3, 'PN - Comisiones  por  la  enajenación  de  bienes inmuebles', '14', 3.00, 1250.00, 500.00, 41666.67),
	(4, 'PJ - Comisiones  por  la  enajenación  de  bienes inmuebles', '16', 5.00, 0.00, 500.00, 25.00),
	(5, 'PN - Comisiones en general, distintas a Remuneraciones accesorias de los sueldos, salarios y demas remuneraciones similares ', '18', 3.00, 1250.00, 500.00, 41666.67),
	(6, 'pj - Comisiones en general, distintas a Remuneraciones accesorias de los sueldos, salarios y demas remuneraciones similares ', '20', 5.00, 0.00, 500.00, 25.00),
	(7, 'PN - Pago a empresas contratistas o sub-contratistas por ejecución de obras o prestación de servicios, con base a valuaciones, ordenes de pago, permanentes individuales o mediante otra modalidad', '53', 1.00, 416.67, 500.00, 41666.67),
	(8, 'PJ - Pago a empresas contratistas o sub-contratistas por ejecución de obras o prestación de servicios, con base a valuaciones, ordenes de pago, permanentes individuales o mediante otra modalidad', '55', 2.00, 0.00, 500.00, 25.00),
	(9, 'PN - Arrendamiento de bienes Inmuebles situados en el país', '57', 3.00, 1250.00, 500.00, 41666.67),
	(10, 'PJ - Arrendamiento de bienes Inmuebles situados en el país', '59', 5.00, 0.00, 500.00, 25.00),
	(11, 'PN - Arrendamiento de bienes muebles situados en el país', '61', 3.00, 1250.00, 500.00, 41666.67),
	(12, 'PJ - Arrendamiento de bienes muebles situados en el país', '63', 5.00, 0.00, 500.00, 25.00),
	(13, 'PN - Servicios de Publicidad, Propaganda y ventas de Espacio Publicitario.', '83', 3.00, 1250.00, 500.00, 41666.67),
	(14, 'PJ - Servicios de Publicidad, Propaganda y ventas de Espacio Publicitario.', '84', 5.00, 0.00, 500.00, 25.00),
	(15, 'PN - Gastos de Transporte conformados por Fletes', '71', 1.00, 1250.00, 500.00, 41666.67),
	(16, 'PJ - Gastos de Transporte conformados por Fletes', '72', 3.00, 0.00, 500.00, 25.00),
	(17, 'PN - Intereses S/Prestamos', '25', 3.00, 1250.00, 500.00, 41666.67),
	(18, 'PJ - Intereses S/Prestamos', '27', 5.00, 0.00, 500.00, 25.00),
	(19, 'PN - Venta de Acciones o Cuotas de Participación de Sociedades de Comercio Constituidas y domiciliadas en el Pais', '3', 3.00, 1250.00, 500.00, 41666.67),
	(20, 'PJ - Venta de Acciones o Cuotas de Participación de Sociedades de Comercio Constituidas y domiciliadas en el Pais', '3', 5.00, 0.00, 500.00, 25.00);
/*!40000 ALTER TABLE `tipo_retencion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.transferencias_caja
CREATE TABLE IF NOT EXISTS `transferencias_caja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_transferencia_caja` date NOT NULL,
  `fecha_in` date DEFAULT NULL,
  `hora_in` time DEFAULT NULL,
  `id_caja_desde` int(11) NOT NULL,
  `id_caja_hasta` int(11) NOT NULL,
  `monto` decimal(30,2) NOT NULL,
  `referencia` varchar(50) CHARACTER SET utf8 NOT NULL,
  `concepto` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.transferencias_caja: ~0 rows (aproximadamente)
DELETE FROM `transferencias_caja`;
/*!40000 ALTER TABLE `transferencias_caja` DISABLE KEYS */;
/*!40000 ALTER TABLE `transferencias_caja` ENABLE KEYS */;

-- Volcando estructura para tabla administra.transferencia_bancaria
CREATE TABLE IF NOT EXISTS `transferencia_bancaria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_at` datetime NOT NULL,
  `fecha_movimiento` date NOT NULL,
  `monto` decimal(18,2) NOT NULL,
  `referencia` varchar(30) CHARACTER SET utf8 NOT NULL,
  `id_banco_desde` int(11) NOT NULL,
  `id_banco_hasta` int(11) NOT NULL,
  `concepto` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.transferencia_bancaria: ~0 rows (aproximadamente)
DELETE FROM `transferencia_bancaria`;
/*!40000 ALTER TABLE `transferencia_bancaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `transferencia_bancaria` ENABLE KEYS */;

-- Volcando estructura para tabla administra.ubicacion
CREATE TABLE IF NOT EXISTS `ubicacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.ubicacion: ~0 rows (aproximadamente)
DELETE FROM `ubicacion`;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` (`id`, `nombre`) VALUES
	(1, 'UNICA');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;

-- Volcando estructura para tabla administra.unidades
CREATE TABLE IF NOT EXISTS `unidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.unidades: ~4 rows (aproximadamente)
DELETE FROM `unidades`;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` (`id`, `nombre`) VALUES
	(1, 'UNIDAD'),
	(2, 'SERVICIO'),
	(3, 'KG'),
	(4, 'LT');
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;

-- Volcando estructura para tabla administra.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del usuario',
  `nombre` varchar(70) NOT NULL COMMENT 'Nombre del Usuario',
  `apellido` varchar(70) NOT NULL COMMENT 'Apellido del usuario',
  `login` varchar(45) NOT NULL COMMENT 'Nombre de usuario',
  `password` varchar(255) NOT NULL COMMENT 'Contraseña de acceso al sistea',
  `perfil_id` int(2) NOT NULL COMMENT 'Identificador del perfil',
  `email` varchar(45) DEFAULT NULL COMMENT 'Dirección del correo electónico',
  `tema` varchar(45) DEFAULT 'default' COMMENT 'Tema aplicable para la interfaz',
  `app_ajax` int(1) DEFAULT '1' COMMENT 'Indica si la app se trabaja con ajax o peticiones normales',
  `datagrid` int(11) DEFAULT '30' COMMENT 'Datos por página en los datagrid',
  `fotografia` varchar(45) DEFAULT 'default.png',
  `pool` varchar(45) DEFAULT NULL,
  `usuario_at` datetime DEFAULT NULL COMMENT 'Fecha de registro',
  `usuario_in` datetime DEFAULT NULL COMMENT 'Fecha de la última modificación',
  `caja_id` int(2) DEFAULT NULL,
  `vendedor_id` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_perfil_idx` (`perfil_id`),
  CONSTRAINT `fk_usuario_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='Tabla que contiene los usuarios';

-- Volcando datos para la tabla administra.usuario: ~9 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `login`, `password`, `perfil_id`, `email`, `tema`, `app_ajax`, `datagrid`, `fotografia`, `pool`, `usuario_at`, `usuario_in`, `caja_id`, `vendedor_id`) VALUES
	(1, 'Cronjob', 'System', 'cronjob', '963db57a0088931e0e3627b1e73e6eb5', 1, NULL, 'default', 1, 30, 'default.png', NULL, '2013-01-01 00:00:01', NULL, NULL, NULL),
	(2, 'Súper', 'Admin', 'admin', '7c4a8d09ca3762af61e59520943dc26494f8941b', 1, NULL, 'default', 1, 30, 'default.png', NULL, '2013-01-01 00:00:01', NULL, 1, 1),
	(3, 'Administrador', 'gerente', 'gerente', '7c4a8d09ca3762af61e59520943dc26494f8941b', 1, '', 'default', 1, 30, '85db6bc5ede43dd5da6db4e07e158eb1.jpg', NULL, '2016-02-15 14:16:11', '2016-06-13 16:08:23', 1, 1),
	(4, 'soporte', 'Admin', 'soporte', '2081ab297d5be74ab716bae982eb39294f5a6098', 1, NULL, 'default', 1, 30, 'default.png', NULL, '2013-01-01 00:00:01', NULL, 1, 1),
	(5, 'Adrian', 'Lozano', 'adrian', '92478578ea3b5ff51120bba9153fa3997f603cdb', 6, 'adrian@lozano.com', 'default', 1, 30, 'default.png', NULL, '2017-05-31 13:51:41', '2018-09-06 16:58:45', NULL, NULL),
	(6, 'irio', 'Gomez', 'iriojgomezv@gmail.com', '$2a$10$fc3jYLPODTmxmavDhvapi.A46nMTqFdpQkUnca', 1, NULL, 'default', 1, 30, 'default.png', NULL, NULL, NULL, NULL, NULL),
	(16, 'jose', 'Gomez', 'joseagomezv@gmail.com', '$2a$10$OYujUmWPyoHIImQrJoMipO342NInoIpG/1rF/U83cBkETzWEmmVXu', 1, NULL, 'default', 1, 30, 'default.png', NULL, NULL, NULL, NULL, NULL),
	(24, 'luis', 'sasasas', '24', '$2a$10$WVM0n0aEOWGIfPza3wki9eDB486MjyXFT0Apqy4z4vus2wyzuNi.i', 1, NULL, 'default', 1, 30, 'default.png', NULL, NULL, NULL, NULL, NULL),
	(25, 'luis', '5assaas', 'luisajgomezv@gmail.com', '$2a$10$LKOrz2zMm1Fjzcto7gm3d.3AMnb0cPqAa29htJDH3ThB2evTfDsii', 1, NULL, 'default', 1, 30, 'default.png', NULL, NULL, NULL, NULL, NULL),
	(26, 'manuel', 'asasasas', 'josakskas@gmail.com', '$2a$10$1WlOIYy39v4vvVTHvOTxeOej18sC6fnetp1RAr2vVCxANcW9ZsuVu', 1, NULL, 'default', 1, 30, 'default.png', NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Volcando estructura para tabla administra.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `caja_id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Tabla de Usuarios del Sistema';

-- Volcando datos para la tabla administra.usuarios: ~0 rows (aproximadamente)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `nombre`, `password`, `caja_id`, `vendedor_id`) VALUES
	(1, 'caja', '01', 1, 1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla administra.valor_activo
CREATE TABLE IF NOT EXISTS `valor_activo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inicial` decimal(10,2) NOT NULL,
  `final` decimal(10,2) NOT NULL,
  KEY `Índice 1` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla administra.valor_activo: ~0 rows (aproximadamente)
DELETE FROM `valor_activo`;
/*!40000 ALTER TABLE `valor_activo` DISABLE KEYS */;
/*!40000 ALTER TABLE `valor_activo` ENABLE KEYS */;

-- Volcando estructura para tabla administra.vendedor
CREATE TABLE IF NOT EXISTS `vendedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.vendedor: ~2 rows (aproximadamente)
DELETE FROM `vendedor`;
/*!40000 ALTER TABLE `vendedor` DISABLE KEYS */;
INSERT INTO `vendedor` (`id`, `nombre`) VALUES
	(1, 'GENERAL'),
	(2, 'Prueba');
/*!40000 ALTER TABLE `vendedor` ENABLE KEYS */;

-- Volcando estructura para tabla administra.zonas
CREATE TABLE IF NOT EXISTS `zonas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla administra.zonas: ~30 rows (aproximadamente)
DELETE FROM `zonas`;
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
INSERT INTO `zonas` (`id`, `nombre`) VALUES
	(1, 'CENTRO DE PORLAMAR'),
	(2, 'PARQUE COSTAZUL'),
	(3, 'SAMBIL'),
	(4, 'PEDROGONZALEZ'),
	(5, 'PARAGUACHI'),
	(6, 'LA FUENTE'),
	(7, 'PAMPATAR'),
	(8, 'EL VALLE'),
	(9, 'JUANGRIEGO'),
	(10, 'PORLAMAR'),
	(11, 'ALCALDIAS'),
	(12, 'SALAMANCA'),
	(13, 'LA ASUNCION'),
	(14, 'LOS ROBLES'),
	(15, 'LAS HERNANDEZ'),
	(16, 'LA VELA'),
	(17, 'AV. JBA'),
	(18, 'AV BOLIVAR'),
	(19, 'PLAYA EL AGUA'),
	(20, 'MUN. DIAZ'),
	(21, 'EL YAQUE '),
	(22, 'PUNTA DE PIEDRA'),
	(23, 'AV JUAN BAUTISTA'),
	(24, 'EL ESPINAL'),
	(25, 'San Juan Bautista'),
	(26, 'BOCA DE RIO'),
	(27, 'MATURIN'),
	(28, 'CARACAS'),
	(29, 'VILLA ROSA'),
	(30, 'SUCRE');
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
