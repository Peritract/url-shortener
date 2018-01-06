var mongodb = require("mongodb")
var urls = require("./urls")

//connection string
var CONNECTION = "mongodb://" + process.env.USER +":" + process.env.KEY + "@" + process.env.HOST + "/" + process.env.DATABASE;

var database = null; //place to store the database once connected.

function connect(callback){
  //the actual connection.
  mongodb.MongoClient.connect(CONNECTION, function(err, db_obj){ //Connects to the database and returns the connection as an object.
    if(err){
    console.log("Error: failed to connect to the database")
      callback(err)
    } else{
      database = db_obj
      callback(null)
    }
  })
}

function close(){
  //close the connection. Apparently I never get to actually do this.
  if (database != null){
    database.close(function(err){
      if(err){
        console.log("Error: failed to close the connection.")
      } else {
        database = null; //resets the database holder to null.
      }
    })
  }
}

function insert(item, collection){
  if (database != null){ //if a database object is connected
    var db = database.db(process.env.DATABASE); //get the specific database from the object,
    db.collection(collection).insert(item, function(err){ //add the item to the collection.
      if(err){
        console.log("Error: failed to insert data.")
      }
    }); 
  } else {
    console.log("Error: no connection found.")
  }
}

function find_by_short(short, callback){
  if (database != null){
    var db = database.db(process.env.DATABASE)
    db.collection("urls").findOne({short: short}, function(err, data){
    if (data == null) {
      callback(null)
    } else {
      callback(data.long)
    }
    })
  } else{
    console.log("Error: no connection found.")
    callback(null)
  }
}

function find_by_long(long, callback){
  if (database != null){
    var db = database.db(process.env.DATABASE)
    db.collection("urls").findOne({long: long}, function(err, data){
    if (data == null) {
      callback(null)
    } else {
      callback(data.short)
    }
    })
  } else{
    console.log("Error: no connection found.")
    callback(null)
  }
}
    
module.exports = {
  connect: connect,
  close: close,
  insert: insert,
  find_by_short: find_by_short,
  find_by_long: find_by_long
};