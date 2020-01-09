/*============================================
; Title: app.js
; Author: Richard Krasso
; Modified by: Adam Donner
; Date: 6 January 2019
; Description:  Creates server and API for
; Angular application.
;===========================================
*/


// start program

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./db-models/user');
const SecurityQuestion = require('./db-models/security-question')
const bcrypt = require('bcrypt');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

/**
 * Variables
 */
const port = 3000; // server port

const conn = 'mongodb+srv://admin:admin@buwebdev-cluster-1-opi0o.mongodb.net/bcrs?retryWrites=true&w=majority';


/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s)
 */

/*
; Params: none
; Response: all security questions
; Description: FindAll - finds all security questions that are not disabled
*/
app.get('/api/security-questions', (request, response) => {

  // Using the find method of the security question model return all questions that are not disabled
  SecurityQuestion.find({ isDisabled: false }, (err, res) => {
    // if there is an error
    if (err) {
      // log the error to the console
      console.log('An error occurred finding the security questions', err);
      // return an http status code 500, server error and the error
      response.status(500).send(err);
    } else {
      // set the status code to 200, OK and return the response
      response.status(200).send(res);
    }
  });
});

/*
; Params: id: security question id
; Response: all security questions
; Description: UpdateSecurityQuestions - updates an existing security question
;   does not update disabled questions or the isDisabled flag
;   to delete a security question use the delete method
*/
app.put('/api/security-questions/:id', (request, response) => {
  // Declare the question id and get the value off the url if it exists
  var questionId = request.params && request.params.id ? request.params.id : null;

  // if the questionId was not defined then return a bad request response
  if (!questionId) {
    // set the status code to 400, bad request and send a message
    response.status(400).send('Request has invalid or missing the question id.');
  } else {
    // Using the findOne method of the security question model search for a matching question id
    // could include a filter for isDisabled to ensure they are not updated?
    SecurityQuestion.findOne({ _id: questionId, isDisabled: false }, (err, res) => {
      // if there is an error
      if (err) {
        // log the error to the console
        console.log('An error occurred finding the security question', err);
        // return an http status code 500, server error and the error
        response.status(500).send(err);
      } else {
        // if a matching question is not found res will be null
        if (!res) {
          // set the status code to 404, not found and return a message
          response.status(404).send('Invalid question, not found.');
        } else {
          // ignore isDisabled and use delete to soft delete the question
          res.text = request.body.text;

          // save the question
          res.save(null, (err, doc) => {
            // if there is an error
            if (err) {
              // log the error to the console
              console.log('An error occurred updating security question', err);
              // set the status code to 400, bad request and send the error message
              response.status(400).send(err.message);
            } else {
              // set the status code to 200, OK and return the updated question
              response.status(200).send(doc.toJSON());
            }
          });
        }
      }
    });
  }

});



/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function

// end program
