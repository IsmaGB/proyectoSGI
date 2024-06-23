-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 23-06-2024 a las 03:07:13
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sgibd`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `ValidarUsuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ValidarUsuario` (IN `p_usuario` VARCHAR(255), IN `p_contrasena` VARCHAR(255))   BEGIN
    DECLARE usuario_existente INT;

    -- Utilizar BINARY para hacer una comparación de cadenas de caracteres sensible a mayúsculas y minúsculas
    SELECT COUNT(*) INTO usuario_existente
    FROM usuarios
    WHERE CT_Codigo_Usuario = BINARY p_usuario AND CT_Contraseña = BINARY p_contrasena;

    IF usuario_existente = 1 THEN
        SELECT 1 AS resultado;
    ELSE
        SELECT 2 AS resultado;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_afectacion`
--

DROP TABLE IF EXISTS `t_afectacion`;
CREATE TABLE IF NOT EXISTS `t_afectacion` (
  `CN_Id_Afectacion` int NOT NULL,
  `CT_Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Nombre_Sistema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CN_Activo` int DEFAULT '1',
  PRIMARY KEY (`CN_Id_Afectacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `t_afectacion`
--

INSERT INTO `t_afectacion` (`CN_Id_Afectacion`, `CT_Descripcion`, `CT_Nombre_Sistema`, `CN_Activo`) VALUES
(1, 'Bajo', 'SGI', 1),
(2, 'Medio', 'SGI', 1),
(3, 'Alto', 'SGI', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_asignar_incidencia`
--

DROP TABLE IF EXISTS `t_asignar_incidencia`;
CREATE TABLE IF NOT EXISTS `t_asignar_incidencia` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CT_Usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CN_Id_Incidencia` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `CT_Usuario` (`CT_Usuario`),
  KEY `CN_Id_Incidencia` (`CN_Id_Incidencia`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `t_asignar_incidencia`
--

INSERT INTO `t_asignar_incidencia` (`Id`, `CT_Usuario`, `CN_Id_Incidencia`) VALUES
(69, 'r.tecnico', '2024-000001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_bitacoras_accion`
--

DROP TABLE IF EXISTS `t_bitacoras_accion`;
CREATE TABLE IF NOT EXISTS `t_bitacoras_accion` (
  `CN_Id_Bitacoras_Accion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Nombre_Sistema` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Nombre_Referencia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Id_Pantalla` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`CN_Id_Bitacoras_Accion`),
  KEY `CT_Usuario` (`CT_Usuario`),
  KEY `CT_Id_Pantalla` (`CT_Id_Pantalla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `t_bitacoras_accion`
--

INSERT INTO `t_bitacoras_accion` (`CN_Id_Bitacoras_Accion`, `CT_Nombre_Sistema`, `CT_Nombre_Referencia`, `CT_Usuario`, `CT_Id_Pantalla`) VALUES
('2024/06/22|12:18:41', 'SGI', '2024-000001-i.usuario', 'i.usuario', 'P002'),
('2024/06/22|12:23:23', 'SGI', '2024-000001-r.tecnico', 'r.tecnico', 'P003');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_categoria`
--

DROP TABLE IF EXISTS `t_categoria`;
CREATE TABLE IF NOT EXISTS `t_categoria` (
  `CN_Id_Categoria` int NOT NULL,
  `CT_Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Sistema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CN_Activo` int DEFAULT '1',
  PRIMARY KEY (`CN_Id_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `t_categoria`
--

INSERT INTO `t_categoria` (`CN_Id_Categoria`, `CT_Descripcion`, `CT_Sistema`, `CN_Activo`) VALUES
(1, 'Reparación', 'SGI', 1),
(2, 'Intervención por Causa Natural', 'SGI', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_departamento`
--

DROP TABLE IF EXISTS `t_departamento`;
CREATE TABLE IF NOT EXISTS `t_departamento` (
  `CN_Id_Depa` int NOT NULL AUTO_INCREMENT,
  `CT_Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`CN_Id_Depa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `t_departamento`
--

INSERT INTO `t_departamento` (`CN_Id_Depa`, `CT_Descripcion`) VALUES
(1, 'Docencia'),
(2, 'Vida Estudiantil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_diagnostico`
--

DROP TABLE IF EXISTS `t_diagnostico`;
CREATE TABLE IF NOT EXISTS `t_diagnostico` (
  `CN_Id_Diagnostico` int NOT NULL AUTO_INCREMENT,
  `CT_Fecha_Hora` varchar(255) NOT NULL,
  `CT_Diagnostico` varchar(255) NOT NULL,
  `CN_Id_Incidencia` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `CT_Requiere_Compra` varchar(20) NOT NULL,
  `CT_Tiempo_Estimado` varchar(30) NOT NULL,
  `CT_Observaciones` varchar(255) NOT NULL,
  `CT_Usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`CN_Id_Diagnostico`),
  KEY `CN_Id_Incidencia` (`CN_Id_Incidencia`),
  KEY `CT_Usuario` (`CT_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `t_diagnostico`
--

INSERT INTO `t_diagnostico` (`CN_Id_Diagnostico`, `CT_Fecha_Hora`, `CT_Diagnostico`, `CN_Id_Incidencia`, `CT_Requiere_Compra`, `CT_Tiempo_Estimado`, `CT_Observaciones`, `CT_Usuario`) VALUES
(35, '2024/06/22|12:24', 'prueba', '2024-000001', 'no', '5', 'prueba', 'r.tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_estados`
--

DROP TABLE IF EXISTS `t_estados`;
CREATE TABLE IF NOT EXISTS `t_estados` (
  `CN_Id_Estado` int NOT NULL AUTO_INCREMENT,
  `CT_Descripcion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `CT_Nombre_Sistema` int NOT NULL,
  `CN_Activo` int NOT NULL,
  PRIMARY KEY (`CN_Id_Estado`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `t_estados`
--

INSERT INTO `t_estados` (`CN_Id_Estado`, `CT_Descripcion`, `CT_Nombre_Sistema`, `CN_Activo`) VALUES
(1, 'Registrado', 1, 1),
(2, 'Asignado', 1, 1),
(3, 'En revision', 1, 1),
(4, 'En reparacion', 1, 1),
(5, 'Pendiente de Compra', 1, 1),
(6, 'Terminado', 1, 1),
(7, 'Aprobado', 1, 1),
(8, 'Rechazado', 1, 1),
(9, 'Cerrado', 1, 1),
(10, 'Contratacion Externa', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_incidencias`
--

DROP TABLE IF EXISTS `t_incidencias`;
CREATE TABLE IF NOT EXISTS `t_incidencias` (
  `CN_Id_Incidencia` varchar(255) NOT NULL,
  `CN_Id_Estado` int NOT NULL,
  `CT_Usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Titulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Lugar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CN_Costos` float DEFAULT NULL,
  `CN_Duracion` int DEFAULT NULL,
  `CN_Id_Prioridad` int DEFAULT NULL,
  `CN_Id_Riesgo` int DEFAULT NULL,
  `CN_Id_Afectacion` int DEFAULT NULL,
  `CN_Id_Categoria` int DEFAULT NULL,
  `CT_Imagen` longtext,
  `justificacionCierre` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CN_Id_Incidencia`),
  KEY `CN_Id_Estado` (`CN_Id_Estado`),
  KEY `CT_Usuario` (`CT_Usuario`),
  KEY `CN_Id_Prioridad` (`CN_Id_Prioridad`),
  KEY `CN_Id_Riesgo` (`CN_Id_Riesgo`),
  KEY `CN_Id_Afectacion` (`CN_Id_Afectacion`),
  KEY `CN_Id_Categoria` (`CN_Id_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `t_incidencias`
--

INSERT INTO `t_incidencias` (`CN_Id_Incidencia`, `CN_Id_Estado`, `CT_Usuario`, `CT_Titulo`, `CT_Descripcion`, `CT_Lugar`, `CN_Costos`, `CN_Duracion`, `CN_Id_Prioridad`, `CN_Id_Riesgo`, `CN_Id_Afectacion`, `CN_Id_Categoria`, `CT_Imagen`, `justificacionCierre`, `createdAt`, `updatedAt`) VALUES
('2024-000001', 8, 'i.usuario', 'incidencia', 'daños en el baño', 'baño', 1500, 4, 2, 1, 1, 1, NULL, '', '2024-06-22 18:18:41', '2024-06-22 18:25:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_pantallas`
--

DROP TABLE IF EXISTS `t_pantallas`;
CREATE TABLE IF NOT EXISTS `t_pantallas` (
  `CT_Id_Pantalla` varchar(255) NOT NULL,
  `CT_Descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`CT_Id_Pantalla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `t_pantallas`
--

INSERT INTO `t_pantallas` (`CT_Id_Pantalla`, `CT_Descripcion`) VALUES
('P001', 'Pantallas de Admin'),
('P002', 'Pantallas de Usuario'),
('P003', 'Pantallas de Encargado'),
('P004', 'Pantalla de Tecnico'),
('P005', 'Pantalla de Supervisor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_pantallas_roles`
--

DROP TABLE IF EXISTS `t_pantallas_roles`;
CREATE TABLE IF NOT EXISTS `t_pantallas_roles` (
  `CN_Id` int NOT NULL AUTO_INCREMENT,
  `CN_Id_Rol` int NOT NULL,
  `CT_Id_Pantalla` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`CN_Id`),
  KEY `CN_Id_Rol` (`CN_Id_Rol`),
  KEY `CT_Id_Pantalla` (`CT_Id_Pantalla`),
  KEY `CT_Id_Pantalla_2` (`CT_Id_Pantalla`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `t_pantallas_roles`
--

INSERT INTO `t_pantallas_roles` (`CN_Id`, `CN_Id_Rol`, `CT_Id_Pantalla`) VALUES
(1, 1, 'P001'),
(2, 2, 'P002'),
(3, 3, 'P003'),
(4, 4, 'P004'),
(5, 5, 'P005');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_prioridad`
--

DROP TABLE IF EXISTS `t_prioridad`;
CREATE TABLE IF NOT EXISTS `t_prioridad` (
  `CN_Id_Prioridad` int NOT NULL,
  `CT_Descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Nombre_Sistema` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Activo` int DEFAULT '1',
  PRIMARY KEY (`CN_Id_Prioridad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `t_prioridad`
--

INSERT INTO `t_prioridad` (`CN_Id_Prioridad`, `CT_Descripcion`, `CT_Nombre_Sistema`, `CT_Activo`) VALUES
(1, 'Bajo', 'SGI', 1),
(2, 'Medio', 'SGI', 1),
(3, 'Alto', 'SGI', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_riesgo`
--

DROP TABLE IF EXISTS `t_riesgo`;
CREATE TABLE IF NOT EXISTS `t_riesgo` (
  `CN_Id_Riesgo` int NOT NULL,
  `CT_Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Nombre_Sistema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CN_Activo` int DEFAULT '1',
  PRIMARY KEY (`CN_Id_Riesgo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `t_riesgo`
--

INSERT INTO `t_riesgo` (`CN_Id_Riesgo`, `CT_Descripcion`, `CT_Nombre_Sistema`, `CN_Activo`) VALUES
(1, 'Bajo', 'SGI', 1),
(2, 'Medio', 'SGI', 1),
(3, 'Alto', 'SGI', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_roles`
--

DROP TABLE IF EXISTS `t_roles`;
CREATE TABLE IF NOT EXISTS `t_roles` (
  `CN_Id_Rol` int NOT NULL AUTO_INCREMENT,
  `CT_Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Nombre_Sistema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CN_Activo` int NOT NULL,
  PRIMARY KEY (`CN_Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `t_roles`
--

INSERT INTO `t_roles` (`CN_Id_Rol`, `CT_Descripcion`, `CT_Nombre_Sistema`, `CN_Activo`) VALUES
(1, 'Administrador', 'SGI', 1),
(2, 'Usuario', 'SGI', 1),
(3, 'Encargado', 'SGI', 1),
(4, 'Tecnico', 'SGI', 1),
(5, 'Supervisor', 'SGI', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_usuario_rol`
--

DROP TABLE IF EXISTS `t_usuario_rol`;
CREATE TABLE IF NOT EXISTS `t_usuario_rol` (
  `CN_Id` int NOT NULL AUTO_INCREMENT,
  `CT_Usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CN_Id_Rol` int NOT NULL,
  PRIMARY KEY (`CN_Id`),
  KEY `CT_Codigo_Usuario` (`CT_Usuario`(250)),
  KEY `CN_Id_Rol` (`CN_Id_Rol`),
  KEY `tablaUsuario` (`CT_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `t_usuario_rol`
--

INSERT INTO `t_usuario_rol` (`CN_Id`, `CT_Usuario`, `CN_Id_Rol`) VALUES
(9, 'i.usuario', 2),
(10, 'r.tecnico', 4),
(11, 'g.encargado', 3),
(12, 'a.supervisor', 5),
(13, 'p.admin', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `CT_Codigo_Usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Contraseña` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CN_Numero_Telefonico` int DEFAULT NULL,
  `CT_Puesto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CT_Id_Departamento` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`CT_Codigo_Usuario`),
  UNIQUE KEY `CT_Usuario` (`CT_Usuario`),
  KEY `CT_Id_Departamento` (`CT_Id_Departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`CT_Codigo_Usuario`, `CT_Nombre`, `CT_Contraseña`, `CT_Usuario`, `CN_Numero_Telefonico`, `CT_Puesto`, `CT_Id_Departamento`, `createdAt`, `updatedAt`) VALUES
('A1', 'Ismael', '123', 'i.usuario', 43939493, 'Developer', 2, '2024-06-22 11:00:15', '2024-06-22 11:00:15'),
('A2', 'Roger', '123', 'r.tecnico', 4334533, 'developer', 1, '2024-06-22 11:01:50', '2024-06-22 11:01:50'),
('A3', 'Gomez', '123', 'g.encargado', 4457334, 'developer', 1, '2024-06-22 11:02:28', '2024-06-22 11:02:28'),
('A4', 'Adriana', '123', 'a.supervisor', 4859493, 'developer', 1, '2024-06-22 11:03:21', '2024-06-22 11:03:21'),
('A5', 'Pamela', '123', 'p.admin', 87546443, 'developer', 1, '2024-06-22 11:04:06', '2024-06-22 11:04:06');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `t_asignar_incidencia`
--
ALTER TABLE `t_asignar_incidencia`
  ADD CONSTRAINT `t_asignar_incidencia_ibfk_1` FOREIGN KEY (`CT_Usuario`) REFERENCES `usuarios` (`CT_Usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_asignar_incidencia_ibfk_2` FOREIGN KEY (`CN_Id_Incidencia`) REFERENCES `t_incidencias` (`CN_Id_Incidencia`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `t_bitacoras_accion`
--
ALTER TABLE `t_bitacoras_accion`
  ADD CONSTRAINT `t_bitacoras_accion_ibfk_1` FOREIGN KEY (`CT_Id_Pantalla`) REFERENCES `t_pantallas` (`CT_Id_Pantalla`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `t_diagnostico`
--
ALTER TABLE `t_diagnostico`
  ADD CONSTRAINT `t_diagnostico_ibfk_1` FOREIGN KEY (`CN_Id_Incidencia`) REFERENCES `t_incidencias` (`CN_Id_Incidencia`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_diagnostico_ibfk_2` FOREIGN KEY (`CT_Usuario`) REFERENCES `usuarios` (`CT_Usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `t_incidencias`
--
ALTER TABLE `t_incidencias`
  ADD CONSTRAINT `t_incidencias_ibfk_1` FOREIGN KEY (`CN_Id_Estado`) REFERENCES `t_estados` (`CN_Id_Estado`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_incidencias_ibfk_2` FOREIGN KEY (`CT_Usuario`) REFERENCES `usuarios` (`CT_Usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_incidencias_ibfk_3` FOREIGN KEY (`CN_Id_Afectacion`) REFERENCES `t_afectacion` (`CN_Id_Afectacion`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_incidencias_ibfk_4` FOREIGN KEY (`CN_Id_Categoria`) REFERENCES `t_categoria` (`CN_Id_Categoria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_incidencias_ibfk_5` FOREIGN KEY (`CN_Id_Riesgo`) REFERENCES `t_riesgo` (`CN_Id_Riesgo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `t_incidencias_ibfk_6` FOREIGN KEY (`CN_Id_Prioridad`) REFERENCES `t_prioridad` (`CN_Id_Prioridad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `t_pantallas_roles`
--
ALTER TABLE `t_pantallas_roles`
  ADD CONSTRAINT `tpantallas` FOREIGN KEY (`CT_Id_Pantalla`) REFERENCES `t_pantallas` (`CT_Id_Pantalla`),
  ADD CONSTRAINT `Troles` FOREIGN KEY (`CN_Id_Rol`) REFERENCES `t_roles` (`CN_Id_Rol`);

--
-- Filtros para la tabla `t_usuario_rol`
--
ALTER TABLE `t_usuario_rol`
  ADD CONSTRAINT `tablaRol` FOREIGN KEY (`CN_Id_Rol`) REFERENCES `t_roles` (`CN_Id_Rol`),
  ADD CONSTRAINT `tablaUsuario` FOREIGN KEY (`CT_Usuario`) REFERENCES `usuarios` (`CT_Usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `depa` FOREIGN KEY (`CT_Id_Departamento`) REFERENCES `t_departamento` (`CN_Id_Depa`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
