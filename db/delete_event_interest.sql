DELETE 
	FROM event_interest
	
WHERE
	event_id = ?event_id? AND
    attendee_id = ?attendee_id?
;
