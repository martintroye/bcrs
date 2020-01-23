/*
============================================
; Title: role
; Author: Adam Donner
; Date: 01/22/2020
; Modified By: Adam Donner
; Description: role model
;===========================================
*/
// start program


const mongoose = require('mongoose');


/**
 * Declare role schema
 */
let roleSchema = mongoose.Schema({
    text: {type: String, unique: true, dropDups: true}
});

// Export mongoose model
module.exports = mongoose.model('Role', roleSchema);

// end program
