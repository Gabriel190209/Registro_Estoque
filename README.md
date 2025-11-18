# Estrutura pronta Banco de Dados

-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para registro
DROP DATABASE IF EXISTS `registro`;
CREATE DATABASE IF NOT EXISTS `registro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `registro`;

-- Copiando estrutura para tabela registro.movimentacao
DROP TABLE IF EXISTS `movimentacao`;
CREATE TABLE IF NOT EXISTS `movimentacao` (
  `id_mov` int(11) NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(100) NOT NULL,
  `id_computador` varchar(50) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `data_mov` datetime NOT NULL,
  PRIMARY KEY (`id_mov`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela registro.movimentacao: ~4 rows (aproximadamente)
INSERT INTO `movimentacao` (`id_mov`, `nome_produto`, `id_computador`, `tipo`, `quantidade`, `data_mov`) VALUES
	(1, 'Palha de Aço', 'adicao', '4', 2025, '0000-00-00 00:00:00'),
	(2, 'Palha de Aço', 'remocao', '4', 2025, '0000-00-00 00:00:00'),
	(3, 'Palha de Aço', '127.0.0.1', 'remocao', 4, '2025-11-13 15:27:17'),
	(4, 'Palha de Aço', '127.0.0.1', 'adicao', 10, '2025-11-13 15:28:09');

-- Copiando estrutura para tabela registro.produtos
DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `id_registro` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `volume` float NOT NULL,
  `uni_medida` varchar(5) NOT NULL,
  `tipo_embalagem` varchar(50) NOT NULL,
  `aplicacao` varchar(50) NOT NULL,
  `estoque` int(11) NOT NULL,
  `estoque_minimo` int(11) NOT NULL,
  PRIMARY KEY (`id_registro`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela registro.produtos: ~2 rows (aproximadamente)
INSERT INTO `produtos` (`id_registro`, `nome`, `marca`, `volume`, `uni_medida`, `tipo_embalagem`, `aplicacao`, `estoque`, `estoque_minimo`) VALUES
	(10, 'Palha de Aço', 'Bombril', 1, 'Kg', 'Plastico', 'Residencial', 11, 5),
	(11, 'Vassoura', 'Jeleca', 2, 'Kg', 'Palha', 'Residencial', 1, 5);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
