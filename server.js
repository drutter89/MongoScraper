// Require our dependencies 
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");


// Set our Port 
var PORT = process.env.PORT || 3000;

// Instantiate our Express App
var app = express();

// Set up an Express Router 
var router = express.Router();

// Require our routes files pass our router object
require("./config/routes")(router);

// Designate our Public Folder as  a static directory
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to Express APP
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Use Body Parser in our APP
app.use(bodyParser.urlencoded({
  extended: false
}));

// Have all requests go through our router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(db);


// Connect Mongoose to our database
mongoose.connect(db, function (error) {
  // Log any errors connecting with Mongoose
  if (error) {
    console.log(error);
  }
  // Or Log a successful connection 
  else {
    console.log("mongoose connection is succesfull");
  }
});

// Listen on Port
app.listen(PORT, function () {
  console.log("Listening on port:" + PORT);
});