//Must bring in mongoose using require.
const mongoose = require("mongoose");

//Need a variable for the schema
//An object literal is passed into mongoose.Schema.
const customerSchema = mongoose.Schema({
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    company: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    created_at: {
      type: Date,
      default: Date.now //enters current date and time
    },
});

//This allows the schema to be accessed outside this file.
const Customer = module.exports = mongoose.model("Customer", customerSchema);
//customerSchema is customerSchema created on line 6. 

//Get all Customers
//moodule.exports is used before every function so it can be used in other files.
//Whenever Customers is capitalized, it refers to the model, Customers.
module.exports.getCustomers = (callback, limit) => {
  //this gets all the customers and sorts them in ascending order
  Customer.find(callback).limit(limit).sort(['first_name', 'ascending']);
}

//Get a single Customer
module.exports.getCustomerById = (id,callback) => {
  //this gets all the customers and sorts them in ascending order
  Customer.findById(id, callback);
}

//Add Customer
module.exports.addCustomer = (customer, callback) => {
  const add = {
    first_name: customer.first_name,
    last_name: customer.last_name,
    company: customer.company,
    email: customer.email,
    phone: customer.phone,
    address: {
      street: customer.address.street,
      city: customer.address.city,
      state: customer.address.state,
      zip: customer.address.zip
    }
  }
  Customer.create(add, callback)
}

module.exports.updateCustomer = (id, customer, options, callback) => {
  const query = {_id: id};//The id passed in should match the _id field..
  //creating an object called update
  const update = {
    first_name: customer.first_name,
    last_name: customer.last_name,
    company: customer.company,
    email: customer.email,
    phone: customer.phone,
    address: {
      street: customer.address.street,
      city: customer.address.city,
      state: customer.address.state,
      zip: customer.address.zip
    }
  }
  //query is the query object on line 74.
  //update is the update object o line 76.
  Customer.findOneAndUpdate(query, update, options, callback); 
}

//Remove Customer
module.exports.removeCustomer = (id, callback) => {
  const query = {_id: id};
  Customer.remove(query, callback);
}

  