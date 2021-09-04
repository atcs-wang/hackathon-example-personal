UPDATE hackbca_example.events
SET
    event_name = ?,
    event_location = ?,  
    event_type = ?, 
    event_datetime = STR_TO_DATE(?,'%m-%d-%Y %h:%i %p'),
    event_duration = ?, 
    event_description = ?
WHERE
	event_id = ?
;