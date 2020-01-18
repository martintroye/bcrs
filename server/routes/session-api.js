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
      User.findOne({ 'username': username, isDisabled: false }, (err, res) => {
        // if there is an error
        if (err) {
          // log the error to the console
          console.log('An error occurred finding the user', err);
          // return an http status code 500, server error and the error
          response.status(500).send(err);
        } else {
          // if a matching user is not found res will be null
          if (!res) {
            // set the status code to 404, not found and return a message
            response.status(404).send('Invalid user, not found.');
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

 router.get('verify/users/:username', function(request, response, next) {
   User.findOne({'username': request.params.username}, function(err, user) {
     if (err) {
       console.log(err);
       return next(err);
     } else {
       console.log(user);
       response.json(user);
     }
   });
 })

/**
 * VerifySecurityQuestions
 */

 router.post('/verify/users/:username/security-questions', function (req, res, next) {
   const answerToSecurityQuestion1 = req.body.answerToSecurityQuestion1;
   console.log(answerToSecurityQuestion1);
   const answerToSecurityQuestion2 = req.body.answerToSecurityQuestion2;
   console.log(answerToSecurityQuestion2);
   const answerToSecurityQuestion3 = req.body.answerToSecurityQuestion3;
   console.log(answerToSecurityQuestion3);

   User.findOne({'username': req.params.username}, function (err, user) {
     if (err) {
       console.log(err);
       return next(err);
     } else {
       console.log(user);

       let answer1IsValid = answerToSecurityQuestion1 === user.securityQuestions[0].answer;
       console.log(answer1IsValid);

       let answer2IsValid = answerToSecurityQuestion2 === user.securityQuestions[1].answer;
       console.log(answer2IsValid);

       let answer3IsValid = answerToSecurityQuestion3 === user.securityQuestions[2].answer;
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


/*
; Params: Username, answers to 3 security questions
; Response: username
; Description: VerifySecurityQuestion - Accepts answer to security questions looked up by user and verify agains saved answers
*/
router.post('/verify/users/:username/security-question', (request, response, next) => {
  const answerToQuestion1 = request.body.answerToQuestion1;
  console.log(answerToQuestion1);

  const answerToQuestion2 = request.body.answerToQuestion2;
  console.log(answerToQuestion2);

  const answerToQuestion3 = request.body.answerToQuestion3;
  console.log(answerToQuestion3);


  User.findOne({ 'username': request.params.username }, (err, username) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(username);

      // creates test cases for provided values against values stored in database
      let validAnswer1 = answerToQuestion1 === username.SecurityQuestions[0].answer;
      let validAnswer2 = answerToQuestion2 === username.SecurityQuestions[1].answer;
      let validAnswer3 = answerToQuestion3 === username.SecurityQuestions[2].answer;
      // If all three are true
      if (validAnswer1 && validAnswer2 && validAnswer3) {
        response.status(200).send({
          type: 'sucessful',
          auth: true
        })
      } else {
        response.status(401).send({
          type: 'unauthorized',
          auth: false
        })
      }
    }
  })
});

// export the router
module.exports = router;

// end program
