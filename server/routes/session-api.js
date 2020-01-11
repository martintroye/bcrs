/*
============================================
; Title: session-api
; Author: Troy Martin
; Date: 01/08/2019
; Modified By: Troy Martin
; Description: Session API
;===========================================
*/
// start program
const express = require('express');
const encryption = require('../encryption');
const User = require('../db-models/user');

// declare the express router object
const router = express.Router();

/*
; Params: none
; Response: {isAuthenticated: boolean, message: string, timeStamp: Date, userId: string}
; Description: Signin - compares user name and password
; Post body {username: string, password: string}
*/
router.post('/signin', (request, response, next) => {

  // declare status code for result
  let statusCode = 200;
  // declare authentication flag for result
  let isAuthenticated = true;
  // declare message for result
  let message = null;
  // declare the default message for an error
  let defaultMessage = 'Invalid username or password';

  let userId = null;

  // if the request is not formed properly return a 401
  if (!request
    || !request.body
    || !request.body.username
    || !request.body.password) {
    // user was not authenticated
    isAuthenticated = false;
    // return the default message
    message = defaultMessage;
    // return unauthorized status code
    statusCode = 401;
  } else {
    // Using the findOne method of the user find the matching user by username
    User.findOne({ 'username': request.body.username }, (err, user) => {
      // if there is an error
      if (err
        || !user) {
        // log the error to the console
        console.log('An error occurred finding the user to sign in', err);
        // user was not authenticated
        isAuthenticated = false;
        // return a server error code
        statusCode = 500;
        // inform the user they should try again
        message = 'An error occurred signing in please try again';

      } else {
        // compare the password with the users encrypted value if it does not match return unauthorized
        if (!encryption.compare(request.body.password, user.password)) {
          // return unauthorized error code
          statusCode = 401;
          // user was not authenticated
          isAuthenticated = false;
          // return a message
          message = defaultMessage;

          // log the issue to the console for troubleshooting
          console.log(`Password does not match ${user.username}`);
        } else {
          userId = user._id;
        }
      }

      console.log('build result', userId);

      // declare the result object returning authentication status, a status code, message, timestamp and the users id
      const result = {
        isAuthenticated,
        message,
        // return a default date
        timeStamp: new Date(),
        userId
      }

      // return the status code and the result
      response.status(statusCode).send(result);

    });
  }
});

// export the router
module.exports = router;

// end program
