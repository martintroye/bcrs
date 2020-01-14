/*
============================================
; Title: user-api
; Author: Troy Martin
; Date: 01/08/2019
; Modified By: Reva Baumann
; Description: User API
;===========================================
*/
// start program
const express = require('express');
const encryption = require('../encryption');
const User = require('../db-models/user')

// declare the express router object
const router = express.Router();

/*
; Params: none
; Response: {_id: string, username: string, password: string ...}
; Description: CreateUser - adds a user with an encrypted password
; Required: username, password
; Defaulted: date_created: new Date(), role: standard, isDisabled: false
*/
router.post('/', (request, response) => {
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
});


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


/**
 * FindAll
 */
router.get('/', function(req, res, next) {
  User.find({}).where('isDisabled').equals(false).exec(function(err, users) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(users);
      res.json(users);
    }
  });
});

  /*
; Params: id: user id
; Response: updated user
; Description: DeleteUser - sets a status of isDisabled user by id
*/
router.delete('/:id', (request, response, next) => {

    // Using the findOne method of the user model return a user based on provided id
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

        if (user) {
          user.set({
            isDisabled: true
          });

          user.save((err, savedUser) => {
            if (err) {
              // log the error to the console
              console.log('An error occurred finding that user', err);
              // return an http status code 500, server error and the error
              response.status(500).send(err);
            } else {
              console.log(savedUser);
              // return saved user
              response.json(savedUser);
            }
          })
        }
      }
    });
  });

  /**
   * UpdateUser
   */
  router.put('/:id', function (req, res, next) {
    User.findOne({'_id': req.params.id}, function (err, user) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(user);

        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          emailAddress: req.body.emailAddress,
          addressLine1: req.body.addressLine1,
          addressLine2: req.body.addressLine2,
          city: req.body.city,
          state: req.body.state,
          postalCode: req.body.postalCode
        });

        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(savedUser);
            res.json(savedUser);
          }
        })
      }
    })
  })

// export the router
module.exports = router;
// end program
