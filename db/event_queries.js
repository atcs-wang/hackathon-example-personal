const db = require('./db');
const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');
const mysql = require('mysql');

const delete_event_sql = fs.readFileSync(path.join(__dirname, "event_queries/delete_event.sql"), "utf8");
const insert_event_sql = fs.readFileSync(path.join(__dirname, "event_queries/insert_event.sql"), "utf8");
const select_event_sql = fs.readFileSync(path.join(__dirname, "event_queries/select_event.sql"), "utf8");
const update_event_sql = fs.readFileSync(path.join(__dirname, "event_queries/update_event.sql"), "utf8");
const select_events_list_chronological_sql = fs.readFileSync(path.join(__dirname, "event_queries/select_events_list_chronological.sql"), "utf8");
const select_events_list_sql = fs.readFileSync(path.join(__dirname, "event_queries/select_events_list.sql"), "utf8");



module.exports = {};

//Simply returns all events ordered by datetime
module.exports.select_events_list_basic = function(){
    return db.queryPromise(select_events_list_chronological_sql,[]);
}

const filter_columns = {
    "date": "DATE_FORMAT(event_datetime, '%m-%d-%Y')",
    "location": "event_location",
    "type": "event_type",
    "interest": "event_interest",
    // "starred": "event_starred" 
}

const sort_columns = {
    undefined: "event_datetime",
    "datetime": "event_datetime",
    "event": "event_name",
    "location": "event_location",
    "type": "event_type",
    "interest": "event_interest",
    "duration": "event_duration",
    "starred": "event_starred" 
}

const desc_sort_columns = ["starred", "interest"];

module.exports.select_events_list = function(queryParams){
    //dynamically construct sql query according to the query params
    //Start with select of events
    let sql = select_events_list_sql;
    let inserts = [];
    let where = true;
    //update sql with enough WHERE clauses for each valid filter condition
    //For safety, escape the filter values
    for (const name in queryParams) {
        if (name in filter_columns){
            //add WHERE before first filter condition, AND before all others
            sql += where ?  `\nWHERE ${filter_columns[name]} = ? ` : `AND ${filter_columns[name]} = ? `; 
            inserts.push(queryParams[name])
            where = false;
        }
    }

    //If valid sort condition, use an ORDER BY, which goes last.
    if (queryParams.sort in sort_columns) {
        sql += `\nORDER BY ${sort_columns[queryParams.sort]} ` + (desc_sort_columns.includes(queryParams.sort) ? "DESC" : "ASC");
    }

    return db.queryPromise(sql,inserts);
}


module.exports.select_event = function(event_id){
    return db.querySinglePromise(select_event_sql,[event_id]);
}

module.exports.delete_event = function(event_id){
    return db.queryPromise(delete_event_sql,[event_id]);
}

//Returns (a promise of) the event_id of the newly inserted row.
module.exports.insert_event = function(event_data){

    return (db.queryPromise(insert_event_sql,[event_data.event_name, 
                                            event_data.event_location, 
                                            event_data.event_type, 
                                            `${event_data.event_date} ${event_data.event_time}`,
                                            event_data.event_duration, 
                                            event_data.event_description])
            .then(results => results.insertId) //take result and get insertId, which has newly inserted row
            ); 
}

//Can get number of affectedRows from 
module.exports.update_event = function(event_data, event_id){

    return db.queryPromise(update_event_sql,[event_data.event_name, 
                                            event_data.event_location, 
                                            event_data.event_type, 
                                            `${event_data.event_date} ${event_data.event_time}`,
                                            event_data.event_duration, 
                                            event_data.event_description,
                                            event_id]);
}