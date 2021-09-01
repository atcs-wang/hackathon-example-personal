var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const sample_events_file = path.join(process.cwd(), '/db/sample_events_ordered_datetime.json')



/*Returns object representing all filters as property-value pairs*/
// function getFilters(req_query){
//   let filter_query = req.query.filter || "";
//   let filters = filter_query.query.split(",");
//   return filters.reduce(obj, str => {
//     let prop_value = str.split(":");
//     obj[prop_value[0]] = prop_value[1];
//   }  , {} );
// }

/* Temp filtering function, obsolete when using SQL */
function filterBy(events_array, property, value){
  return events_array.filter(event => event[property] == value);
}

/* GET events list page. */
router.get('/', function(req, res, next) {
  let events_data = fs.readFileSync(sample_events_file);
  let events_array = JSON.parse(events_data);

  let filters;
  //Handle filter(s) from query
  if (req.query.filter){
    // let prop_value = req.query.filter.split(":");
    filters = req.query.filter.split(",").map(f => f.split(":"));
    filters.forEach(prop_value => {
      let property = 'event_' + prop_value[0];
      let value = prop_value[1];
      console.log(`Filtering by ${property} = ${value}`)
      events_array = events_array.filter(event => event[property] == value);
    });
  }

  // At this point, discuss efficiency issues with having server do filters and sorts..
  
  res.render('events', { title: 'HackBCA Events', 
                        layout:"layout", 
                        styles: ['tables'],
                        events: events_array,
                        filters: filters
                      }); 
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
router.post('/', function(req, res, next) {
  
  //Read from database
  let events_data = fs.readFileSync(sample_events_file);
  let events_array = JSON.parse(events_data);

  //Prepare form data to be added to database
  let new_event_data = req.body;
  let event_id = 1 + events_array.reduce(function(max_id, event) {return Math.max(max_id, event.event_id);} , 0);
  new_event_data.event_id = event_id;
  new_event_data.date = new_event_data.date_ymd //this is not ideal, but too much trouble to work with JS dates atm.
  
  //Update and write to database
  events_array.push(new_event_data);
  events_data = JSON.stringify(events_array);
  fs.writeFileSync(sample_events_file, events_data);
  
  //Response code of 201 Created
  res.status(201);
  //Redirect to the new event page for the created event.
  res.redirect(`/events/${event_id}`);
})


/* GET event page for given event_id. */
router.get('/:event_id', function(req, res, next) {
  let event_id = req.params.event_id;
  let events_data = fs.readFileSync(sample_events_file);
  let events_array = JSON.parse(events_data);
  let event = events_array.find( obj => obj.event_id == event_id);
  if (event == undefined)
    next(); //send 404
  else {
    res.render('event', { title: event.event_name, 
      layout:"layout", 
      styles: ['tables', 'event'],
      event: event,
    });    
  }
});


/* GET event form for updating a given event with event_id. */
router.get('/:event_id/modify', function(req, res, next) {
  let event_id = req.params.event_id;
  let events_data = fs.readFileSync(sample_events_file);
  let events_array = JSON.parse(events_data);
  let event = events_array.find( obj => obj.event_id == event_id);
  if (event == undefined)
    next(); //send 404
  else {
    res.render('eventform', { title: "Update: " + event.event_name, 
      layout:"layout", 
      styles: ['eventform'],
      event: event,
      update: true
    });
  }
});


/* POST event with event_id; handling form submission for updating a given event with event_id. */
router.post('/:event_id', function(req, res, next) {
  let event_id = req.params.event_id;
  //Read from database
  let events_data = fs.readFileSync(sample_events_file);
  let events_array = JSON.parse(events_data);
  //Confirm event exists.
  let event_index = events_array.findIndex( obj => obj.event_id == event_id);
  if (event_index == -1)
    next(); //send 404
  else {
    //Prepare form data to be added to database
    let updated_event_data = req.body;
    updated_event_data.event_id = event_id;
    updated_event_data.date = updated_event_data.date_ymd //this is not ideal, but too much trouble to work with JS dates atm.

    //Update and write to database
    events_array[event_index] = updated_event_data;
    events_data = JSON.stringify(events_array);
    fs.writeFileSync(sample_events_file, events_data);
    
    //Response code of 200 OK
    res.status(200);
    //Redirect to the event page for the updated event.
    res.redirect(`/events/${event_id}`);
  
  }
});

/* DELETE event with event_id; handling deleting a given event with event_id. */
router.delete('/:event_id', function(req, res, next) {
  let event_id = req.params.event_id;
  //Read from database
  let events_data = fs.readFileSync(sample_events_file);
  let events_array = JSON.parse(events_data);
  //Confirm event exists.
  let event_index = events_array.findIndex( obj => obj.event_id == event_id);
  if (event_index == -1)
    next(); //send 404
  else {
    //Update (delete one element at event_index) and write to database
    events_array.splice(event_index, 1);
    events_data = JSON.stringify(events_array);
    fs.writeFileSync(sample_events_file, events_data);
    
    //Response code of 204 No Content 
    res.sendStatus(204);
  }
});



module.exports = router;
