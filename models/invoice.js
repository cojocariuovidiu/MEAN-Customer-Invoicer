//Must bring in mongoose using require.
const mongoose = require("mongoose");

//Need a variable for the schema
//An object literal is passed into mongoose.Schema.
//The object literal is the model.
const invoiceSchema = mongoose.Schema({
    customer: {
      //the customer is coming from the customer Collection, which is the customerSchema.
      //mongoose is used to bring it into this file.
      type: mongoose.Schema.Types.ObjectId,
      //refs is used to point to the customers collection.
      ref: 'Customer'
    },
    service: {
      type: String,
      required: true
    },
    price: {
      type: String
    },
    due: {
      type: String
      
    },
    status: {
      type: String
    },
    created_at: {
      type: Date,
      default: Date.now //enters current date and time
    },
});

//This allows the schema to be accessed outside this file.
const Invoice = module.exports = mongoose.model("Invoice", invoiceSchema);
//customerSchema is customerSchema created on line 6. 

//Get all Invoices
//moodule.exports is used before every function so it can be used in other files.
//Whenever Invoices is capitalized, it refers to the model, Invoices.
module.exports.getInvoices = (callback, limit) => {
  //this gets all the invoices and sorts them in ascending order
  Invoice.find(callback).limit(limit).sort([['created_at', 'ascending']]);
}

//Get a single Invoice for a Customer
module.exports.getInvoiceById = (id,callback) => {
  //this gets all the customers and sorts them in ascending order
  Invoice.findById(id, callback);
}

//Get Customer Invoices for a specific Customer
//Limit is optional.
module.exports.getCustomerInvoices = (customer_id,callback, limit) => {
  const query = {customer: customer_id};
  //this gets all the invoices and sorts them in ascending order
  Invoice.find(query, callback).limit(limit).sort([['created_at', 'ascending']]);
}

//Add Invoice
module.exports.addInvoice = (customer, callback) => {
  const add = {
    customer: invoice.customer, 
    service: invoice.service, 
    price: invoice.price,
    due: invoice.due,
    status: invoice.status
    }
  Invoice.create(add, callback);
}

//Update an Invoice
module.exports.updateInvoice = (id, invoice, options, callback) => {
  const query = {_id: id};//The id passed in should match the _id field.
  //creating an object called update
  const update = {
    service: invoice.service,
    price: invoice.price,
    due: invoice.due,
    status: invoice.status
  }
  //query is the query object on line 75.
  //update is the update object o line 77.
  Invoice.findOneAndUpdate(query, update, options, callback); 
}

//Remove Customer
module.exports.removeInvoice = (id, callback) => {
  const query = {_id: id};
  Invoice.remove(query, callback);
}

  