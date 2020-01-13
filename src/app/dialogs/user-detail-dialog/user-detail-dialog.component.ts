/*
============================================
; Title: user-detail-dialog.component
; Author: Reva Baumann
; Date: 01/09/2020
; Modified By: Reva Baumann
; Description: List of users
;===========================================
*/
// Start Program
// Import the Modules
import { Component, OnInit, Inject } from '@angular/core';
// Not sure if this is the correct import - User Dialog
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Export the component
@Component({
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})
export class UserDetailDialogComponent implements OnInit {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api/security-questions`;
  user: any;
  id: string;
  form: FormGroup;
  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    if (data && data.id) {
      this.id = data.id;
      this.http.get(`${this.apiBaseUrl}/api/users/${this.id}`).subscribe(
        res => {
          this.user = res;
          console.log(this.user);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
    }
  }

  ngOnInit() {}
  initForm(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=[]{};:|,.<>/?]+$'),
          Validators.minLength(8)
        ])
      ],
      firstName: [null],
      lastName: [null],
      emailAddress: [null],
      phoneNumber: [null],
      addressLine1: [null],
      addressLine2: [null],
      city: [null],
      state: [null],
      postalCode: [null]
    });
  }
}
