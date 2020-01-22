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
  ]).exec((err, result) => {
    if (err) {
      console.log(err);
      response.status(500).send();
    } else {
      response.json(result).status(200).send();
    }
  });
});


// export the router
module.exports = router;

// end program
