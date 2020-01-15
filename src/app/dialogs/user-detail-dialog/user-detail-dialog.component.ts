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

// Export the component
@Component({
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})

// Export the Class
export class UserDetailDialogComponent implements OnInit, OnDestroy {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api/users`;
  user: User;
  id: string;
  title: string;

  getSubscription: Subscription;
  createSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      if (data && data.id) {
        this.title = 'Edit user';
        this.id = data.id;
        this.getSubscription = this.http.get<User>(`${this.apiBaseUrl}/${this.id}`)
        .subscribe(
          (res) => {
            this.user = res;
            this.populateform();
            console.log(this.user);
          },
          err => {
            console.log(err);
          },
          () => {
            console.log('complete');
          }
        );
    } else {
      this.id = null;
      this.user = null;
      this.title = 'Create user';
    }
  }

  ngOnInit() {}

  // Destroy when duplicates are found
  ngOnDestroy(): void {
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
  }

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
    if (this.form.valid) {

      const body: any = this.getFormData();
      body._id = this.id;
      this.createSubscription = this.http.put(`${this.apiBaseUrl}/${this.id}`, body).subscribe((result: any) => {
        if (result
          && result._id) {
          this.dialogRef.close(result);
        }
      }, (err) => {
          console.log(err);
      }, () => {
        // complete
      });
    }
  }

  // Create user details and post form data
  createUser() {

    if (this.form.valid) {

      const body = this.getFormData();
      this.createSubscription = this.http.post(this.apiBaseUrl, body).subscribe((result: any) => {
        if (result
          && result._id) {
          this.dialogRef.close(result);
        }
      }, (err) => {
          console.log(err);
      }, () => {
        // complete
      });
    }

  }

  // cancel
  cancel() {
    this.dialogRef.close(null);
  }

}
// End Program
