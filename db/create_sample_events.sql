INSERT INTO `hackbca_example`.`events` 
        (`event_name`, `event_location`, `event_type`, `event_datetime`, `event_duration`, `event_description`) 
VALUES 
        ('Opening Ceremony', 'Auditorium', 'Main', '2021-05-02 10:30:00', 25, 'The opening ceremony will be rad! Don\'t miss it. Or you\'re technically late.'),
        ('Hacktime', 'Gym', 'Main', '2021-05-02 11:00:00', NULL, 'Hacking happens all day, all night. Consider the gym home base.'),
        ('Presentations and Judging', 'Gym', 'Main', '2021-05-03 9:00:00', 30, 'Time to show your project to the judges! Be at your table with your team - and some duct tape, just in case.'),
        ('Closing Awards Ceremony', 'Auditorium', 'Main', '2021-05-03 11:00:00', 30, 'We wrap it all up with some awards.'),

        ('Beginner HTML/CSS/JS', 'Room 138A', 'Workshop', '2021-05-02 12:30:00', 90, 'Never done web dev before? Jump start your first static web project with us.'),
        ('Basic Hosting with Github Pages', 'Room 138A', 'Workshop', '2021-05-02 17:30:00', 45, 'Use Github Pages to host a static web project. No prior experience with Git or Github necessary.'),
        
        ('Introduction to Express for Web Dev', 'Room 138B', 'Workshop', '2021-05-02 12:30:00', 75, 'Learn how to make basic web servers with NodeJS and Express'),
        ('SQL Crash Course', 'Room 138B', 'Workshop', '2021-05-02 14:30:00', 60, 'Learn justtt enough SQL to set up a database for your next project.'),
        ('Handlebars for Templating (Express Pt 2A)', 'Room 138B', 'Workshop', '2021-05-02 16:00:00', 45, 'Explore the power of server-side templating with Handlebars'),
        ('Auth with Google Auth (Express Pt 2B)', 'Room 136', 'Workshop', '2021-05-02 16:00:00', 45, 'Add user logins via Google to your Express web project!'),

        ('White hat, black hat', 'Gym', 'Talk', '2021-05-02 19:00:00', 45, 'Hear from a former NSA hacker about the good, the bad, and the sketchy in the world of hacking (and general development).'),
        ('Planning the next HackBCA', 'Room 138A', 'Talk', '2021-05-03 10:30:00', 30, 'Loved the event? Chat with the organizers to get involved with planning next year!'),

        ('Lunch', 'Gym', 'Food', '2021-05-02 10:55:00', NULL, 'Pick up a bagged lunch and start hacking!'),
        ('Dinner', 'Lower Cafe', 'Food', '2021-05-02 18:00:00', NULL, 'Catering from Chipotle! Fuel up before getting back to business'),
        ('Breakfast', 'Lower Cafe', 'Food', '2021-05-03 07:30:00', NULL, 'Grab a bagel and some very needed coffee.'),
        ('Midnight Pizza', 'Gym', 'Food', '2021-05-03 00:00:00', NULL, 'A timely and cheesy slice to keep you going. Served in the gym where everyone is crushing it.'),

        ('Powerpoint Karaoke', 'Room 138A', 'Activity', '2021-05-02 22:00:00', 45, 'How good are your pitch skills... when you don\'t even know what you\'re pitching?'),
        ('Cup Stacking Competition', 'Lower Cafe', 'Activity', '2021-05-03 01:00:00', 30, 'CUP STACKING CUP STACKING CUP STACKING')
        
        ;
