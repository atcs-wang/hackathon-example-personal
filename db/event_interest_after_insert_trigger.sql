CREATE DEFINER = CURRENT_USER TRIGGER `hackbca_example`.`event_interest_AFTER_INSERT` AFTER INSERT ON `event_interest` FOR EACH ROW
BEGIN
	UPDATE events SET event_interest = event_interest + 1 WHERE event_id = NEW.event_id;
END