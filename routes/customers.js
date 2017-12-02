//need to bring in express to use router
const express = require("express");
const router = express.Router();

/* need to bring the customer model into this file using require and referencing the file name.
This can now be used in the router.get. */
Customer = require('../models/customer');

//This route must be linked in app.js with a customers variable.
//GET route for all customers. 
//This goes to /customers, so only '/' is needed. 
router.get('/', (req, res) => {
  //"getCustomers" is a function that was created in the models.customer.js file
  //"customers" is the data returned from the data base.
  Customer.getCustomers((err, customers) => {
    if (err) { //if there is an err during the db query
      console.log("There was an error during the db query: ", err);
      res.send(err); //sends the err code
    }
    //if there is no err during the query, the customer data is sent in json form.
    res.json(customers);

  });//end of getCustomers
});

//Get a single Customer
router.get('/:id', (req, res) => {
  //To get the id in the url, use <req className="params id"></req>
  Customer.getCustomer(req.params.id, (err, customer) => {
    if (err) { //if there is an err during the db query
      console.log("There was an error during the db query: ", err);
      res.send(err); 
    }
    res.json(customer);
  });//end of getCustomer
});

//Add a Customer
//This is a post request
router.post('/', (req, res) => {
  //First need to get the body of whatever was submitted for an update.
  const customer = req.body;
  //req.body needs to be passed into the db query.
  //It's being passed in as the const customer.
  Customer.addCustomer(customer, (err, customer) => {
    if (err) { 
      console.log("There was an error during the db query: ", err);
      res.send(err); 
    }
    res.json(customer);
  });//end of addCustomer
});//end of router.post

//Update Customer
//This is a put request.
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const customer = req.body;
  /* Both req.params.id and req.body are passed in as variables to the db query.
  options are the empty object brackets. */
  Customer.updateCustomer(id, customer, {}, (err, customer) => {
    if (err) {
      res.send(err);
    }
    res.json(customer);
  }); //end of updateCustomer
});//end of router.put

//Delete a Customer
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Customer.removeCustomer(id, (err, customer) => {
    if (err) {
      res.send(err);
    }
    res.json(customer);
  }); //end of removeCustomer
}); //end of router.delete

module.exports = router;
