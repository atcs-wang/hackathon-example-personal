SELECT 
	event_id, 
    event_name, 
    event_location, 
    event_type, 
    DATE_FORMAT(event_datetime, '%b %d (%a)') as event_date, 
    DATE_FORMAT(event_datetime, '%l:%i %p') as event_time, 
    event_duration, 
    event_interest,
    event_description
FROM 
	hackbca_example.events
WHERE 
	event_id = ?event_id?
LIMIT 1;