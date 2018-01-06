// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser')
var app = express();


app.use(express.static('public'));
app.use(bodyParser.json())

//Connect to the database module.
var database = require("./database_connections");
var urls = require("./urls")

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/link/:id", function(request, response){ 
    var url = database.find_by_short("https://make-small.glitch.me/link/" + request.params.id, function(reply){
    if (reply == null){
    response.sendFile(__dirname + '/views/link_error.html');
  } else {
    response.redirect(reply)  
  }
  });
});

app.post("/", function(request, response){
  if (urls.check_url(request.body.long)){
    var entry = urls.create_entry(request.body.long)
    database.find_by_long(entry.long, function(reply){
      if (reply == null) {
        database.insert(entry,"urls")
        response.send(entry.short)
      } else {
        response.send(reply)
      }
    })
  } else {
    response.send("Your URL was invalid. It should be in the format 'http:\/\/www.example.com'.")
  }
})

// listen for requests :)
database.connect(function(){
  app.listen(process.env.PORT)
})

