/*
============================================
; Title: invoice-summary-dialog.component
; Author: Adam Donner
; Date: 01/24/2020
; Modified By: Adam Donner
; Description: Invoice summary component
;===========================================
*/
// Start Program

// Import the Modules

import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: any;

  constructor(
    private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceSummaryDialogComponent) {
      this.invoice = data.invoice
    }

  ngOnInit() {
  }

}
// end program