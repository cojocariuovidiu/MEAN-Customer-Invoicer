//need to bring in express to use router
const express = require("express");
const router = express.Router();

//This route must be linked in app.js with a customers variable.
//GET route for all customers. 
//This goes to /customers, so only '/' is needed. 
router.get('/', (req, res) => {
  res.send('Customers');
});


module.exports = router;
