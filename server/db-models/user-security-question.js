/*
============================================
; Title: user-security-question.js
; Author: Troy Martin
; Date: 01/06/2019
; Modified By: Reva Baumann
; Description: User security question with answer
;===========================================
*/


// start program

const mongoose = require('mongoose');

/**
 * Declare user security question schema
 */
let userSecurityQuestionSchema = mongoose.Schema({
    question: {type: String},
    answer: {type: String}
});

/**
 * CreateSecurityQuestion - Errors to Log
 */
router.post('/', function(req, res, next) {
  let sq = {
    text: req.body.text
  };

  SecurityQuestion.create(sq, function (err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});

// Export mongoose model

module.exports = userSecurityQuestionSchema;

// end program
