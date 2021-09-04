INSERT INTO hackbca_example.events
	(event_name, 
    event_location, 
    event_type, 
    event_datetime,
    event_duration, 
    event_description)
VALUES
	(?, 
    ?, 
    ?, 
    STR_TO_DATE(?,'%m-%d-%Y %h:%i %p'),
    ?, 
    ?)
