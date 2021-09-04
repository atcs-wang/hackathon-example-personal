SELECT 
	event_id, 
    event_name, 
    event_location, 
    event_type, 
    DATE_FORMAT(event_datetime, '%m-%d-%Y ') as event_date, 
    DATE_FORMAT(event_datetime, '%b %d (%a)') as event_date_pretty, 
    DATE_FORMAT(event_datetime, '%l:%i %p') as event_time, 
    event_duration, 
    event_interest,
    	EXISTS (SELECT * 
			FROM event_interest
            WHERE
			attendee_id = ? AND events.event_id = event_interest.event_id
            LIMIT 1
			) as event_starred
FROM 
	events
