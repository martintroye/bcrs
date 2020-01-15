/*
============================================
; Title: create-user
; Author: Troy Martin
; Date: 01/14/2020
; Modified By: Troy Martin
; Description: Create user common function for Users/CreateUser and Session/Register
;===========================================
*/
// start program
const encryption = require('../encryption');
const User = require('../db-models/user');

/*
; Params: request, response
; Response: none
; Description: Create the user from an express request and response
*/
createUser = function(request, response){
  // if the request and request body are not valid return an error
  if(!request
    || !request.body){
      response.status(400).send('Invalid request.');
    } else {
      // create a new user setting it to the request body
      const user = new User(request.body);
      // encrypt the users password
      if(user.password) {
        user.password = encryption.encryptValue(user.password);
      }

      // if there are selected security questions add them
      if(request.body.questions
        && Array.isArray(request.body.questions)) {
          console.log(request.body.questions);
          user.SecurityQuestions = [];
          request.body.questions.forEach((q) => {
            user.SecurityQuestions.push(q);
          });
      }

      // call the save method to store the new user in the db
      user.save((err, u) => {
        // if there is an error
        if(err) {
          // log the error
          console.log(err);
          // return a server error and the message
          response.status(500).send(err.message);
        } else {
          //console.log(u);
          // return the created status code and the new user
          response.status(201).send(u);
        }
      });
    }
}

module.exports = createUser;
// end program
