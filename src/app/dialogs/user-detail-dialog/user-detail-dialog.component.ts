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

// Export the component
@Component({
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})

// Export the Class
export class UserDetailDialogComponent implements OnInit, OnDestroy {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api/users`;
  user: any;
  id: string;
  form: FormGroup;
  title: string;

  getSubscription: Subscription;
  createSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
      this.initForm();

      if (data && data.id) {
        this.title = 'Edit user';
        this.id = data.id;
        this.getSubscription = this.http.get(`${this.apiBaseUrl}/${this.id}`).subscribe(
          res => {
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

  // getFormData, include details of users
  private getFormData() {
    return {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
      lastName: this.form.controls.lastName.value,
      firstName: this.form.controls.firstName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      emailAddress: this.form.controls.emailAddress.value,
      addressLine1: this.form.controls.addressLine1.value,
      addressLine2: this.form.controls.addressLine2.value,
      city: this.form.controls.city.value,
      state: this.form.controls.state.value,
      postalCode: this.form.controls.postalCode.value
    };
  }

  populateform() {
    this.form.controls.username.setValue(this.user.username);
    this.form.controls.password.setValue(this.user.password);
    this.form.controls.lastName.setValue(this.user.lastName ? this.user.lastName : '');
    this.form.controls.firstName.setValue(this.user.firstName ? this.user.firstName : '');
    this.form.controls.phoneNumber.setValue(this.user.phoneNumber ? this.user.phoneNumber : '');
    this.form.controls.emailAddress.setValue(this.user.emailAddress ? this.user.emailAddress : '');
    this.form.controls.addressLine1.setValue(this.user.addressLine1 ? this.user.addressLine1 : '');
    this.form.controls.addressLine2.setValue(this.user.addressLine2 ? this.user.addressLine2 : '');
    this.form.controls.city.setValue(this.user.city ? this.user.city : '');
    this.form.controls.state.setValue(this.user.state ? this.user.state : '');
    this.form.controls.postalCode.setValue(this.user.postalCode ? this.user.postalCode : '');
  }

  // cancel
  cancel() {
    this.dialogRef.close(null);
  }


  initForm(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          // https://stackoverflow.com/questions/52850017/how-to-create-custom-lowercase-validator-in-angular-6
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
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


// End Program