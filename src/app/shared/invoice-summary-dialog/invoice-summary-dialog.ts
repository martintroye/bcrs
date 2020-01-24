/*
============================================
; Title: invoice-summary-dialog
; Author: Reva Baumann
; Date: 01/23/2020
; Modified By: Reva Baumann
; Description: Summarize and collect the invoice
;===========================================
*/

// Start Program

// Import the Modules
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.html',
  styleUrls: ['./invoice-summary-dialog.css']
})

// Export the class
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: any;

  constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.invoice = data.invoice;
  }

  ngOnInit() {

  }
}
