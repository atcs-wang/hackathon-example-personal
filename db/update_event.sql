UPDATE hackbca_example.events
SET
    event_name = ?event_name?,
    event_location = ?event_location?,  
    event_type = ?event_type?, 
    event_datetime = ?event_datetime?,
    event_duration = ?event_duration?, 
    event_description = ?event_description?
WHERE
	event_id = ?event_id?
;