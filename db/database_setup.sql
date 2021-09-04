-- -----------------------------------------------------
-- Table `events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(45) NOT NULL,
  `event_location` VARCHAR(45) NULL,
  `event_type` VARCHAR(45) NULL,
  `event_datetime` DATETIME NULL,
  `event_duration` INT NULL,
  `event_description` VARCHAR(1000) NULL,
  `event_interest` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`event_id`))
;


-- -----------------------------------------------------
-- Table `attendees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attendees` (
  `attendee_id` INT NOT NULL AUTO_INCREMENT,
  `is_attending` TINYINT NOT NULL,
  `attendee_name` VARCHAR(45) NOT NULL,
  `attendee_email` VARCHAR(45) NOT NULL,
  `attendee_bio` VARCHAR(1000) NULL,
  PRIMARY KEY (`attendee_id`))
;


-- -----------------------------------------------------
-- Table `event_interest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `event_interest` (
  `event_id` INT NOT NULL,
  `attendee_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `event_id_idx` (`event_id` ASC) VISIBLE,
  INDEX `attendee_id_idx` (`attendee_id` ASC) VISIBLE,
  CONSTRAINT `event_id`
    FOREIGN KEY (`event_id`)
    REFERENCES `events` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `attendee_id`
    FOREIGN KEY (`attendee_id`)
    REFERENCES `attendees` (`attendee_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `event_interest_AFTER_INSERT` AFTER INSERT ON `event_interest` FOR EACH ROW
BEGIN
	UPDATE events SET event_interest = event_interest + 1 WHERE event_id = NEW.event_id;
END$$

CREATE DEFINER = CURRENT_USER TRIGGER `event_interest_BEFORE_DELETE` BEFORE DELETE ON `event_interest` FOR EACH ROW
BEGIN
	UPDATE events SET event_interest = event_interest - 1 WHERE event_id = OLD.event_id;
END$$

DELIMITER ;