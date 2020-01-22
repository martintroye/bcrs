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

}


// export the router
module.exports = router;

// end program
