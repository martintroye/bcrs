/*
============================================
; Title: api-security-questions
; Author: Adam Donner
; Date: 01/21/2019
; Modified By: Adam Donner
; Description: Roles API
;===========================================
*/
// start program
const express = require('express');
const Roles = require('../db-models/roles')

// declare the express router object
const router = express.Router();

/*
; Params: none
; Response: all roles
; Description: FindAll - finds all roles that are not disabled
*/
router.get('/', (request, response) => {

  // Using the find method of the role model return all questions that are not disabled
  Role.find({ isDisabled: false }, (err, res) => {
    // if there is an error
    if (err) {
      // log the error to the console
      console.log('An error occurred finding that role', err);
      // return an http status code 500, server error and the error
      response.status(500).send(err);
    } else {
      // set the status code to 200, OK and return the response
      response.status(200).send(res);
    }
  });
});

/*
; Params: none
; Response: updated role
; Description: UpdateRole - updates role
*/
router.get('/update/:id', (request, response, next) => {

  // Using the find one method of the role model return one role
  Role.findOne({'_id': request.params.id}, (err, role) => {
    // if there is an error
    if (err) {
      // log the error to the console
      console.log('An error occurred finding that role', err);
      // return an http status code 500, server error and the error
      response.status(500).send(err);
    } else {
      role.set({
        roleTitle: request.body.roletitle
      })

      role.save((err, saveRole) => {
        if (err) {
          // log the error to the console
          console.log(err);
        } else {
          // console.log role and respond with role JSON data
          console.log(role);
          res.json(role);
        }
      })
    }
  });
});

// export the router
module.exports = router;

// end program
