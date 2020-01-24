/*
============================================
; Title: user-delete-dialog
; Author: Reva Baumann
; Date: 01/23/2020
; Modified By: Reva Baumann
; Description: Delete User Dialog
;===========================================
*/

// Start Program

// Import the Modules
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

// Declare the components
@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.html',
  styleUrls: ['./user-delete-dialog.css']
})

// Export the class
export class UserDeleteDialogComponent implements OnInit {
  username: string;
  constructor(private dialogRef: MatDialogRef<UserDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.username = data.username;
  }

  ngOnInit() {

  }
}

// End Program
