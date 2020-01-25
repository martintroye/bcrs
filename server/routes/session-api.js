/*
============================================
; Title: session-api
; Author: Troy Martin
; Date: 01/14/2019
; Modified By: Adam Donner
; Description: Session API
;===========================================
*/
// start program
const express = require('express');
const encryption = require('../encryption');
const User = require('../db-models/user');
const createUserFunction = require('./create-user.function');

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

    const result = {
      isAuthenticated,
      message,
      // return a default date
      timeStamp: new Date(),
      userId
    }

    // return the status code and the result
    response.status(statusCode).send(result);

  } else {
    // Using the findOne method of the user find the matching user by username
    User.findOne({ 'username': { $regex : new RegExp(request.body.username, "i") } }, (err, user) => {
      // if there is an error
      if (err) {
        // log the error to the console
        console.log('An error occurred finding the user to sign in', err);
        // user was not authenticated
        isAuthenticated = false;
        // return a server error code
        statusCode = 500;
        // inform the user they should try again
        message = 'An error occurred signing in please try again';

      } else if (!user) {
        // user was not authenticated
        isAuthenticated = false;
        // return a server error code
        statusCode = 401;
        // log the error to the console
        console.log(`User ${request.body.username} not found`);

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

      // declare the result object returning authentication status, a status code, message, timestamp and the users id
      const result = {
        isAuthenticated,
        message,
        // return a default date
        timeStamp: new Date(),
        userId
      }

      // return the status code and the result
      response.status(statusCode).json(result);

    });
  }
});


/*
; Params: none
; Response: {_id: string, username: string, password: string ...}
; Description: CreateUser - adds a user with an encrypted password and security questions
; Required: username, password
; Defaulted: date_created: new Date(), role: standard, isDisabled: false
*/
router.post('/register', createUserFunction);

/*
; Params: none
; Response: {_id: string, username: string, password: string ...}
; Description: update the password of the user
*/
router.put('/users/:username/reset-password', (request, response) => {
  // Declare the username and get the value off the url if it exists
  var username = request.params && request.params.username ? request.params.username : null;

  // if the username was not defined then return a bad request response
  if (!username) {
    // set the status code to 400, bad request and send a message
    response.status(400).send('Request is invalid or missing the username.');
  } else {
    if (!request.body.password) {
      response.status(400).send('Request is missing the new password.');
    } else {
      // Using the findOne method of the user model search for a matching user do not return a disabled user
      User.findOne({ 'username': { $regex : new RegExp(username, "i") }, isDisabled: false }, (err, res) => {
        // if there is an error
        if (err) {
          // log the error to the console
          console.log('An error occurred finding the user', err);
          // return an http status code 500, server error and the error
          response.status(500).send(err);
        } else {
          // if a matching user is not found res will be null
          if (!res) {
            // set the status code to 400 bad request and return a message
            response.status(400).send('Invalid user, not found.');
          } else {

            // encrypt the users password
            if (request.body.password) {
              res.password = encryption.encryptValue(request.body.password);
            }

            // set the update date
            res.date_modified = new Date();

            // save the user
            res.save(null, (err, doc) => {
              // if there is an error
              if (err) {
                // log the error to the console
                console.log('An error occurred updating users password', err);
                // set the status code to 400, bad request and send the error message
                response.status(400).send(err.message);
              } else {
                // set the status code to 200, OK and return the updated user
                response.status(200).send(doc.toJSON());
              }
            });
          }
        }
      });
    }
  }
});

/**
 * VerifyUser
 */
router.get('/verify/users/:username', function (req, res, next) {
  User.findOne({ 'username': { $regex : new RegExp(req.params.username, "i") } }, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      res.json(user);
    }
  })
})

/**
 * VerifySecurityQuestions
 */

router.post('/verify/users/:username/security-questions', function (req, res, next) {
  // trim and tolower the answers supplied by the user
  const answerToSecurityQuestion1 = req.body.answerToSecurityQuestion1.trim().toLowerCase();
  console.log(answerToSecurityQuestion1);
  const answerToSecurityQuestion2 = req.body.answerToSecurityQuestion2.trim().toLowerCase();
  console.log(answerToSecurityQuestion2);
  const answerToSecurityQuestion3 = req.body.answerToSecurityQuestion3.trim().toLowerCase();
  console.log(answerToSecurityQuestion3);

  User.findOne({ 'username': { $regex : new RegExp(req.params.username, "i") } }, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      // trim and tolower the answers in the array before checking against the answers supplied by the user
      let answer1IsValid = answerToSecurityQuestion1 === user.SecurityQuestions[0].answer.trim().toLowerCase();
      console.log(answer1IsValid);

      let answer2IsValid = answerToSecurityQuestion2 === user.SecurityQuestions[1].answer.trim().toLowerCase();
      console.log(answer2IsValid);

      let answer3IsValid = answerToSecurityQuestion3 === user.SecurityQuestions[2].answer.trim().toLowerCase();
      console.log(answer3IsValid);

      if (answer1IsValid && answer2IsValid && answer3IsValid) {
        res.status(200).send({
          type: 'success',
          auth: true
        })
      } else {
        res.status(200).send({
          type: 'error',
          auth: false
        })
      }
    }
  })
});

// export the router
module.exports = router;

// end program
