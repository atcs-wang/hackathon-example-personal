const mysql = require('mysql');
require('dotenv').config();

const dbConfig = {  
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT) || 10000,
}

function parseBoolean(str) {
    return (str.toLowerCase() == "true");
}
const LOG_QUERIES = parseBoolean(process.env.LOG_QUERIES)
const LOG_QUERY_RESULTS = parseBoolean(process.env.LOG_QUERY_RESULTS)
const LOG_QUERY_RESULTS_VERBOSE = parseBoolean(process.env.LOG_QUERY_RESULTS_VERBOSE)

//OLD: Create SINGLE connection to MySQL DB
// let connection = mysql.createConnection(dbConfig);
//Connect to database - though this step is optional, as the query method also implicitly does this.
// connection.connect(function(err) {
//   if (err) 
//     throw err;
//   console.log('Connected to the MySQL server.');
// });

// The connection has a simple method for querying:
// connection.query(sql, args, (err, results) => ____ )

//NEW UPDATE: Using just one connection is terrible - it can only handle one query at a time.
//If multiple requests come in at once, each must wait for the previous to finish.
//Instead, we should have a pool of connections - multithreaded - and open new connections for each query job 

let connectionPool = mysql.createPool(dbConfig);

// When we want to make a query, the pool.query() method can be used.
// This is a shortcut for the pool.getConnection() -> connection.query() -> connection.release() 
//More efficient use of db connections might do multiple queries on one connection before closing, 
// but this is not super important for small applications.


//Add two custom query functions:

//Wrapper of the query function with logging.
//Levels of logging will be enabled/disabled based on the .env variables
//ARGS: 
//  sql is a query string, possibly with '?' for value args and 
//  args is an array of arguments to be escaped and inserted at each '?' or '??' in sql. If none, must be an empty [].
//  callback is a function that takes two params:
//      err: if an error occurs, this will describe the error. Otherwise, is falsy.
//      results: Array of record objects, where each property matches a column 
//  If no callback provided, the query is still made and logging occurs.
connectionPool.queryCallback = function (sql, args, callback = (()=>{})) {
    //Log query before sending
    if(LOG_QUERIES) 
        console.log(`QUERY @${dbConfig.database}: '${sql}', ${args}`);

    connectionPool.query(sql, args, (err, results)=>{
        //Log query results after receiving
        if (LOG_QUERY_RESULTS){
            if (err)
                console.log(`QUERY ERROR: ${err}`);
            else {
                if (Array.isArray(results)){
                    console.log(`QUERY RESULTS: ${results.length} results`);
                    if (LOG_QUERY_RESULTS_VERBOSE)
                        results.forEach((row, i) => console.log(`\t${i}| ${JSON.stringify(row)}`));
                }
                else {
                    console.log(`QUERY RESULTS:`,results);
                }
            }
        }

        callback(err,results);
    });
}

//See above queryCallback, except for the callback function: 
//      results: Single record object (not an array), where each property matches a column 
connectionPool.querySingleCallback = function (sql, args, callback) {
    //Use array destructuring to fetch first result only (will be undefined if no results found)
    connectionPool.queryCallback(sql, args, (err, [singleResult]) => callback(err,singleResult))
}

//Promise wrapper for query function. 
//Use instead of queryCallback. 
//  connectionPool.queryPromise(sql, args)
//  .then(results => {/* handle results*/}
//  .catch(err => {/* handle err */})
connectionPool.queryPromise = function  (sql, args)  {
    return new Promise ((resolve, reject) => {
        connectionPool.queryCallback(sql, args, (err, results) => {
            if (err)
                return reject(err);
            resolve (results);
        });
    });
}

//Promise wrapper for querySingle function; result is a single object, not an array
connectionPool.querySinglePromise = function (sql, args) {
    return new Promise ((resolve, reject) => {
        connectionPool.querySingleCallback(sql, args, (err, results) => {
            if (err)
                return reject(err);
            resolve (results);
        });
    });
}

//TODO multi parallel queries on one connection for efficiency.

module.exports = connectionPool