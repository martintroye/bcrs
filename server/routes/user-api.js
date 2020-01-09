/*
============================================
; Title: user-api
; Author: Troy Martin
; Date: 01/08/2019
; Modified By: Troy Martin
; Description: User API
;===========================================
*/
// start program
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../db-models/user')

// declare the express router object
const router = express.Router();

// export the router
module.exports = router;
// end program
