const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
//TEst
const cors= require('cors');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// TEst
app.use(cors())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route in JSON for testing
//app.get('/', (req, res) => {
//    res.json({"message": "Welcome to Note Application. Take notes quickly. Organize and keep track of all your notes."});
//});

// define view to html
//app.get('/',function (req,res){
//    res.sendFile(path.join(__dirname+'/views/index.html'));
//})

// set view engine

//app.set('view engine', "raz");

// retrieve main file

app.use(express.static("views"));


// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});