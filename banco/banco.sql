-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sistema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sistema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sistema` DEFAULT CHARACTER SET utf8 ;
USE `sistema` ;

-- -----------------------------------------------------
-- Table `sistema`.`doador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema`.`doador` (
  `iddoador` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(160) NULL,
  `nascimento` DATE NULL,
  `cpf` VARCHAR(45) NULL,
  `cep` VARCHAR(8) NULL,
  `numerocasa` VARCHAR(4) NULL,
  `uf` VARCHAR(2) NULL,
  `cidade` VARCHAR(50) NULL,
  `pais` VARCHAR(45) NULL,
  PRIMARY KEY (`iddoador`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sistema`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `identificacao` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sistema`.`campanha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema`.`campanha` (
  `id_campanha` INT NOT NULL AUTO_INCREMENT,
  `titulocampanha` VARCHAR(150) NOT NULL,
  `descricao` LONGTEXT NOT NULL,
  `datainicio` DATETIME NOT NULL,
  `datatermino` DATETIME NOT NULL,
  `valormeta` INT NOT NULL,
  `imagem1` VARCHAR(250) NULL,
  `imagem2` VARCHAR(250) NULL,
  `imagem3` VARCHAR(250) NULL,
  `imagem4` VARCHAR(250) NULL,
  `imagem5` VARCHAR(250) NULL,
  `imagem6` VARCHAR(250) NULL,
  `imagem7` VARCHAR(250) NULL,
  `imagem8` VARCHAR(250) NULL,
  `background` VARCHAR(250) NULL,
  `logo` VARCHAR(250) NULL,
  `texto1` VARCHAR(450) NULL,
  `texto2` VARCHAR(450) NULL,
  `texto3` VARCHAR(450) NULL,
  `texto4` VARCHAR(450) NULL,
  `texto5` VARCHAR(450) NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_campanha`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sistema`.`doacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema`.`doacao` (
  `id_doacao` INT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(14,2) NOT NULL,
  `data` VARCHAR(45) NOT NULL,
  `iddoador` INT NOT NULL,
  `cartao_numerocartao` VARCHAR(16) NOT NULL,
  `id_campanha` INT NOT NULL,
  `status` VARCHAR(50) NULL,
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_doacao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sistema`.`configuracoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sistema`.`configuracoes` (
  `nomeinstituicao` INT NOT NULL AUTO_INCREMENT,
  `emailinstituicao` VARCHAR(45) NOT NULL,
  `multas` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`nomeinstituicao`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
