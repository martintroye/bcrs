/*
============================================
; Title: user-detail-dialog.component
; Author: Reva Baumann
; Date: 01/09/2020
; Modified By: Troy Martin
; Description: User config CreateUser
;===========================================
*/
// Start Program

// Import the Modules
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
// Not sure if this is the correct import - User Dialog
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';

// Export the component
@Component({
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})

// Export the Class
export class UserDetailDialogComponent implements OnInit {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api/users`;
  user: User;
  id: string;
  title: string;

  isValid: boolean;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      if (data && data.id) {
        this.title = 'Edit user';
        this.id = data.id;
        this.http.get(`${this.apiBaseUrl}/${this.id}`)
        .pipe(
          map((res: any) => {
            return this.mapUser(res);
          })
        ).subscribe((u) => {
          console.log(u);
          this.user = u;
        }, (err) => {
          console.log('user-detail-dialog', err);
        });
    } else {
      this.id = null;
      this.user = new User();
      this.title = 'Create user';
    }
  }

  ngOnInit() {}

  // Save details of the user
  saveUser() {
    if (this.id) {
      this.updateUser();
    } else {
      this.createUser();
    }

  }

  // Update User
  updateUser() {
    if (this.isValid) {

      this.user.id = this.id;
      console.log(this.user);
      this.http.put(`${this.apiBaseUrl}/${this.id}`, this.user)
      .pipe(
        map((result: any) => {
            return this.mapUser(result);
          }
        )
      ).subscribe((u) => {
        this.dialogRef.close(u);
      }, (err) => {
        console.log('user-detail-dialog / updateUser', err);
      });
    }
  }

  // Create user details and post form data
  createUser() {

    if (this.isValid) {
      console.log(this.user);
      this.http.post(this.apiBaseUrl, this.user)
      .pipe(
        map((result: any) => {
            return this.mapUser(result);
          }
        )
      ).subscribe((u) => {
        this.dialogRef.close(u);
      }, (err) => {
        console.log('user-detail-dialog / createUser', err);
      });
    }

  }

  // cancel
  cancel() {
    this.dialogRef.close(null);
  }

  setValid(isFormValid: boolean) {
    this.isValid = isFormValid;
  }

  private mapUser(result: any): User {
    const user = new User();
    user.id = result._id;
    user.username = result.username;
    user.password = result.password;
    user.firstName = result.firstName;
    user.lastName = result.lastName;
    user.phoneNumber = result.phoneNumber;
    user.emailAddress = result.emailAddress;
    user.addressLine1 = result.addressLine1;
    user.addressLine2 = result.addressLine2;
    user.city = result.city;
    user.state = result.state;
    user.postalCode = result.postalCode;
    return user;
  }

}
// End Program
