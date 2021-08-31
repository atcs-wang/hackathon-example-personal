SELECT 
	event_id, 
    event_name, 
    event_location, 
    event_type, 
    DATE_FORMAT(event_datetime, '%Y-%m-%d') as event_date_ymd, 
    DATE_FORMAT(event_datetime, '%b %d (%a)') as event_date, 
    DATE_FORMAT(event_datetime, '%l:%i %p') as event_time, 
    event_duration, 
    event_interest,
    event_description
FROM 
	hackbca_example.events
ORDER BY event_datetime;