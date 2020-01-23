/*
============================================
; Title: invoice-api
; Author: Troy Martin
; Date: 01/21/2020
; Modified By: Troy Martin
; Description: Invoice API
;===========================================
*/

// start program
const express = require('express');
const Invoice = require('../db-models/invoice');

// declare the express router object
const router = express.Router();

/*
; Params: invoice data
; Response: Invoice JSON data
; Description: CreateInvoice - Creates an invoice in MongoDB
*/
router.post('/:username'), (request, response, next) => {
  // get the username
  const username = req.params.username;

  // create invoice object for MongoDB

  let invoice = {
    lineItems: req.body.lineItems,
    partsAmount: req.body.partsAmount,
    laborAmount: req.body.laborAmount,
    lineItemTotal: req.body.lineItemTotal,
    total: req.body.total,
    username: username,
    orderData: req.body.orderDate
  };
  // console.log invoice object
  console.log(invoice);

  // Creates the invoice document
  Invoice.create(invoice, (err, newInvoice) => {
    // If error return the error
    if (err) {
      console.log(err);
      return next(err);
    } else {
      // console.log invoice
      console.log(newInvoice);
      // return JSON results
      response.json(newInvoice);
    }
  })
}

router.get('/purchases-graph', (request, response) => {
  Invoice.aggregate([
    {
      '$unwind': {
        'path': '$items'
      }
    }, {
      '$group': {
        '_id': '$items.service.description',
        'quantity': {
          '$sum': '$items.quantity'
        }
      }
    }
  ],(err, items) => {
    if (err) {
      console.log(err);
      response.status(500).send();
    } else {
      response.status(200).json(items);
    }

  });
});


// export the router
module.exports = router;

// end program
