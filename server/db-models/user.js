/*============================================
; Title: user.js
; Author: Adam Donner
; Modified: Adam Donner
; Date: 6 January 2020
; Description:  User database model
;===========================================
*/


// start program

const mongoose = require('mongoose');
const SecurityQuestions = require('./security-question')

/**
 * Declare user database schema
 */
let userSchema = mongoose.Schema({
    username:          {type: String, required: true, unique: true, dropDups: true},
    password:          {type: String, required: true},
    firstname:         {type: String},
    lastname:          {type: String},
    phoneNumber:       {type: String},
    address:           {type: String},
    email:             {type: String},
    isDisabled:        {type: Boolean, default: false},
    role:              {type: String, default: 'standard'},
    securityQuestions: [SecurityQuestions],
    date_created:      {type: Date, default: new Date()},
    date_modified:     {type: Date} 
});

// Export mongoose model

module.exports = mongoose.model('User', userSchema);

// end program