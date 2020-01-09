/*
============================================
; Title: user-api
; Author: Troy Martin
; Date: 01/08/2019
; Modified By: Adam Donner
; Description: User API
;===========================================
*/
// start program
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../db-models/user')

// declare the express router object
const router = express.Router();

 // salt rounds for hasing of password
const saltRounds = 10;

/*
; Params: id: User id
; Response: user by id
; Description: FindById - finds a security question by id
*/
router.get('/:id', (request, response, next) => {

    // Using the findOne method of the security question model return a security question based on provided id
    User.findOne({'_id': request.params.id}, (err, user) => {
      // if there is an error
      if (err) {
        // log the error to the console
        console.log('An error occurred finding that user', err);
        // return an http status code 500, server error and the error
        response.status(500).send(err);
      } else {
        // return user
        console.log(user);
        response.json(user);
      }
    });
  });


// export the router
module.exports = router;
// end program
