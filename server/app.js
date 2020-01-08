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



/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function

// end program
