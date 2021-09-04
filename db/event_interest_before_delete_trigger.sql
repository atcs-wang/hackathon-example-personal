CREATE DEFINER = CURRENT_USER TRIGGER `event_interest_BEFORE_DELETE` BEFORE DELETE ON `event_interest` FOR EACH ROW
BEGIN
	UPDATE events SET event_interest = event_interest - 1 WHERE event_id = OLD.event_id;
END
