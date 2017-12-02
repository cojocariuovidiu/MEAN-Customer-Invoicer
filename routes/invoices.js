//need to bring in express to use router
const express = require("express");
const router = express.Router();

Invoice = require('../models/invoice');

//This route must be linked in app.js with an invoices const and app.use.
//GET route for all invoices. 
//This goes to /invoices, so only '/' is needed. 
router.get('/', (req, res) => {
  Invoice.getInvoices((err, invoices) => {
    if(err) {
      res.send(err);
    }
    res.json(invoices);
  }); //end of getInvoices
}); //end of r eouter.get

//Get all invoices for a specific Customer
router.get('/customer/:customer_id', (req, res) => {
  Invoice.getCustomerInvoices(req.params.customer_id, (err, invoices) => {
    if(err) {
      res.send(err);
    }
    //invoices for the customer are returned in json array.
    res.json(invoices);
  }); //end of getCustomerInvoices
}); //end of router.get

//Add an Invoice
router.post('/',(req, res) => {
  const invoice = req.body;
  Invoice.addInvoice(invoice, (err, invoice) => {
    if(err) {
      res.send(err);
    }
    res.json(invoice);
  }); //end of addInvoice
}); //end router.post

//Update Invoice(s)
router.put('/:id',(req, res) => {
  const id = req.params.body;
  const invoice = req.body;
  Invoice.updateInvoice(id, invoice, {}, (err, invoice) => {
    if(err) {
      res.send(err);
    }
    res.json(invoice);
  }); //end of addInvoice
}); //end router.post

//Delete Invoice
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Customer.removeInvoice(id, (err, invoice) => {
    if (err) {
      res.send(err);
    }
    res.json(invoice);
  }); //end of removeInvoice
}); //end of router.delete

module.exports = router;