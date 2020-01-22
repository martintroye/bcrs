/*
============================================
; Title: invoice
; Author: Troy Martin
; Date: 01/21/2020
; Modified By: Troy Martin
; Description: Invoice model
;===========================================
*/
// start program
const mongoose = require('mongoose');

/**
 * Declare invoice service schema
 */
let invoiceServiceSchema = mongoose.Schema({
  description: { type: String, required: true },
  price: { type: String, required: true },
});

/**
 * Declare invoice item schema
 */
let invoiceItemSchema = mongoose.Schema({
  quantity: { type: String, required: true },
  itemTotal: { type: String, required: true },
  service: invoiceServiceSchema
});

/*
; Declare invoice user schema
*/
let invoiceUserSchema = mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
});

/*
; Declare invoice account schema
*/
let invoiceAccountSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String },
});

/**
 * Declare invoice database schema
 */
let invoiceSchema = mongoose.Schema({
  user: invoiceUserSchema,
  account: invoiceAccountSchema,
  invoiceTotal: { type: String, required: true },
  items: [invoiceItemSchema],
  isDisabled: { type: Boolean, default: false },
  dateOrdered: { type: Date, default: new Date() },
  datePaid: { type: Date }
});

// Export mongoose model
module.exports = mongoose.model('Invoice', invoiceSchema, 'invoices');
// end program


