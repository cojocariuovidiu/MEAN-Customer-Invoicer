//need to bring in express to use router
const express = require("express");
const router = express.Router();

//This route must be linked in app.js with an invoices const and app.use.
//GET route for all invoices. 
//This goes to /invoices, so only '/' is needed. 
router.get('/', (req, res) => {
  res.send('Invoices');
});


module.exports = router;