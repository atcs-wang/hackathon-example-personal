var express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require('../db/event_queries');

/* GET events list page. */
router.get('/', function(req, res, next) {
  //Use the query params to both parameterize the db query
  //and to update the links in the rendered page.  
  db.select_events_list(req.query)
  .then(events_array => {
    res.render('events', 
      { title: 'HackBCA Events', 
        layout:"layout", 
        styles: ['tables'],
        events: events_array,
        query: req.query, 
      }
    );
  })
  .catch(err => next(err));
   

});


/* GET event form for creating a NEW event . */
router.get('/new', function(req, res, next) {
    res.render('eventform', { title: "Create New Event", 
      layout:"layout", 
      styles: ['eventform'],
      update: false
    });
});

/* POST event; handling form submission for creating a NEW event . */
router.post('/', async function(req, res, next) {
  try {
    //form data to be inserted into database  
    let event_id = await db.insert_event(req.body);  
    //Response code of 201 Created
    //Redirect to the new event page for the created event.
    res.redirect(201, `/events/${event_id}`);
  } catch(err){
    res.sendStatus(400);
  }
})


/* GET event page for given event_id. */
router.get('/:event_id', async function(req, res, next) {
  let event_id = req.params.event_id;
  try {
    let event = await db.select_event(event_id);
    res.render('event', { title: event.event_name, 
        layout:"layout", 
        styles: ['tables', 'event'],
        event: event,
    });    
    
  } catch(err) {
    next(err);
  }
  
});


/* GET event form for updating a given event with event_id. */
router.get('/:event_id/modify', async function(req, res, next) {
  let event_id = req.params.event_id;
  try {
    let event = await db.select_event(event_id);
    res.render('eventform', { title: "Update: " + event.event_name, 
      layout:"layout", 
      styles: ['eventform'],
      event: event,
      update: true
    });
  }
  catch(err) {
    next(err);
  }
});


/* POST event with event_id; handling form submission for updating a given event with event_id. */
router.post('/:event_id', async function(req, res, next) {
  let event_id = req.params.event_id;
  //Read from database
  try {
    //form data to be inserted into database  
    await db.update_event(req.body, event_id);  
    //Response code of 201 OK
    //Redirect to the new event page for the created event.
    res.redirect(200, `/events/${event_id}`);
  } catch(err){
    res.sendStatus(400);
  }
});

/* DELETE event with event_id; handling deleting a given event with event_id. */
router.delete('/:event_id', async function(req, res, next) {
  let event_id = req.params.event_id;
  //Read from database
  try {
    //form data to be inserted into database  
    await db.delete_event(event_id);  
    //Response code of 204 No Content
    res.sendStatus(204);
  } catch(err){
    res.sendStatus(400);
  }
});



module.exports = router;
