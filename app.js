const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//The app variable initializes an instance of an express application.
const app = express();
const port = 3000;

//Setting up Client folder (static folder).
//This is where the compiled Angular 2 app will go.
app.use(express.static(__dirname+'/client'));

//Body Parser middleware
app.use(bodyParser.json());

//Route for index file.
//app.get has a callback function as a parameter.
//That callback function takes in the request and response as arguments. 
app.get('/', (req, res) => {
  res.send("Please use /api/customers or api/invoices");
});

//Route files
//This pulls in the GET route from routes/customers.js file.
const customers = require('./routes/customers');

//This pulls in the GET route from routes/invoices.js file.
const invoices = require('./routes/invoices');

//Path for the get routes
app.use('/api/customers', customers);
app.use('/api/invoices', invoices);

app.listen(port, () => {
  console.log("Server started on Port "+port);
});