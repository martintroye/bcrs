/*============================================
; Title: security-question.js
; Author: Adam Donner
; Modified: Adam Donner
; Date: 6 January 2020
; Description:  Security question database model
;===========================================
*/


// start program

const mongoose = require('mongoose');

/**
 * Declare security question database schema
 */
let securityQuestionSchema = mongoose.Schema({
    text:       {type: String},
    isDisabled: {type: Boolean, default: false}
});

// Export mongoose model

module.exports = mongoose.model('securityQuestion', securityQuestionSchema);

// end program
