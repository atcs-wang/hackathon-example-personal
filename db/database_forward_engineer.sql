-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema hackbca_example
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hackbca_example
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hackbca_example` DEFAULT CHARACTER SET utf8 ;
USE `hackbca_example` ;

-- -----------------------------------------------------
-- Table `hackbca_example`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hackbca_example`.`events` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(45) NOT NULL,
  `event_location` VARCHAR(45) NULL,
  `event_type` VARCHAR(45) NULL,
  `event_datetime` DATETIME NULL,
  `event_duration` INT NULL,
  `event_description` VARCHAR(1000) NULL,
  `event_interest` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`event_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hackbca_example`.`attendees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hackbca_example`.`attendees` (
  `attendee_id` INT NOT NULL AUTO_INCREMENT,
  `is_attending` TINYINT NOT NULL,
  `attendee_name` VARCHAR(45) NOT NULL,
  `attendee_email` VARCHAR(45) NOT NULL,
  `attendee_bio` VARCHAR(1000) NULL,
  PRIMARY KEY (`attendee_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hackbca_example`.`event_interest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hackbca_example`.`event_interest` (
  `event_id` INT NOT NULL,
  `attendee_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `event_id_idx` (`event_id` ASC) VISIBLE,
  INDEX `attendee_id_idx` (`attendee_id` ASC) VISIBLE,
  CONSTRAINT `event_id`
    FOREIGN KEY (`event_id`)
    REFERENCES `hackbca_example`.`events` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `attendee_id`
    FOREIGN KEY (`attendee_id`)
    REFERENCES `hackbca_example`.`attendees` (`attendee_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `hackbca_example`;

DELIMITER $$
USE `hackbca_example`$$
CREATE DEFINER = CURRENT_USER TRIGGER `hackbca_example`.`event_interest_AFTER_INSERT` AFTER INSERT ON `event_interest` FOR EACH ROW
BEGIN
	UPDATE events SET event_interest = event_interest + 1 WHERE event_id = NEW.event_id;
END$$

USE `hackbca_example`$$
CREATE DEFINER = CURRENT_USER TRIGGER `hackbca_example`.`event_interest_BEFORE_DELETE` BEFORE DELETE ON `event_interest` FOR EACH ROW
BEGIN
	UPDATE events SET event_interest = event_interest - 1 WHERE event_id = OLD.event_id;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
