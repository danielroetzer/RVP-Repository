/**
 * Created by Rötzer on 14.11.2016.
 */

//Load config
var config = require('../config/config');

//Load the async module
var async = require('async');

//Load the rethinkdb module
var r = require('rethinkdb');

//Variable for connection data to the database
var connection = null;


//Exporting the database query functions
module.exports = {
    initDB
};

//Initialize DB -> Called one time on server start
//async.waterfall([]) executes all defined function in a row
//The connection variable must be given to the other functions with callback()
function initDB(){
    async.waterfall([
        function (callback) {
            r.connect(config.rethinkdb, function (err, conn) {
                if (err) throw err;
                connection = conn;
                callback(null,connection);
            });
        },function (connection, callback) {
            r.dbCreate('rethinkdb_prototype').run(connection, function(err, result){
                if(err) {
                    console.log("Database already created");
                } else {
                    console.log("Created new database: rethinkdb_prototype");
                    console.log(JSON.stringify(result, null, 2));
                }

                callback(null, connection);
            });
        },function (connection, callback) {
            r.db('rethinkdb_prototype').tableCreate('protoTable').run(connection, function(err, result) {
                if (err) {
                    console.log("Table already created");
                }else{
                    console.log("Created new table: protoTable");
                    console.log(JSON.stringify(result, null, 2));
                }

                callback(null,'###### Database is ready ######');
            });
        }
    ],function (err, status) {
        if (err) throw err;
        else console.log(status);
    });
}





//The code above is hard to understand at first sight
//The code below is basically the same thing as the function initDB()
//At the end of every function, the next function is automatically executed
//The callback delivers specified values, which are needed for the next function

 function connectDB() {
    r.connect(config.rethinkdb, function (err, conn) {
        if (err) throw err;
        connection = conn;
        createTable(connection);
    });
 }

 function createTable(connection){
     r.db('test').tableCreate('authors').run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
     });
 }