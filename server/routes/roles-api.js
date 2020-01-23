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
const Roles = require('../db-models/role')

// declare the express router object
const router = express.Router();

/*
; Params: none
; Response: all roles
; Description: FindAll - finds all roles that are not disabled
*/
router.get('/', (request, response) => {

  // Using the find method of the role model return all questions that are not disabled
  Roles.find({ isDisabled: false }, (err, res) => {
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
; Params: id: Role id
; Response: Role by id
; Description: FindById - finds a rold by id
*/
router.get('/:id', (request, response, next) => {
  // Declare the id and get the value off the url if it exists
  var id = request.params && request.params.id ? request.params.id : null;

  // if the id was not defined then return a bad request response
  if (!id) {
    // set the status code to 400, bad request and send a message
    response.status(400).send('Request is invalid or missing the id.');
  } else {
    // Using the findOne method of the role model return a role based on provided id
    Roles.findOne({ '_id': id }, (err, role) => {
      // if there is an error
      if (err) {
        // log the error to the console
        console.log('An error occurred finding that role', err);
        // return an http status code 500, server error and the error
        response.status(500).send(err);
      } else {
        // return role
        console.log(role);
        response.status(200).json(role);
      }
    });
  }
});

/*
; Params: none
; Response: updated role
; Description: UpdateRole - updates role
*/
router.get('/update/:id', (request, response, next) => {

  // Using the find one method of the role model return one role
  Role.findOne({ '_id': request.params.id }, (err, role) => {
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
