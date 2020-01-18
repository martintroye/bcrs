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
import { MatSnackBar } from '@angular/material';

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

  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  accountForm: FormGroup;

  accountSubscription: Subscription;
  personalSubscription: Subscription;
  addressSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserDetailDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data && data.id) {
      console.log('user-detail-dialog.component', data, 'edit');
      this.title = 'Edit user';
      this.id = data.id;
    } else {
      console.log('user-detail-dialog.component', 'add');

      this.id = null;
      this.user = new User();
      this.title = 'Create user';
    }
  }

  ngOnInit() {

    // declare the personal information form
    this.personalInfoForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      phoneNumber: [null]
    });

    // declare the address form
    this.addressForm = this.fb.group({
      addressLine1: [null],
      addressLine2: [null],
      city: [null],
      state: [null],
      postalCode: [null]
    });

    // declare the account form, set validators for the password
    this.accountForm = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[0-9]/)
        ])
      ]
    });

    if (!this.id) {
      this.subscribeFormChanges();
    } else {
      // get the user and set them on the component
      this.http.get(`${this.apiBaseUrl}/${this.id}`)
        .pipe(
          map((res: any) => {
            console.log(res);

            return this.mapUser(res);
          })
        ).subscribe((u) => {
          this.user = u;
        }, (err) => {
          console.log('user-detail-dialog', err);
        }, () => {
          this.populateForm();

        });
    }
  }

  private unsubscribeFormChanges() {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
      this.personalSubscription.unsubscribe();
      this.addressSubscription.unsubscribe();
    }
  }

  private subscribeFormChanges() {
    // subscribe to form changes and populate the user on the component
    this.accountSubscription = this.accountForm.valueChanges.subscribe(() => {
      this.user.username = this.accountForm.controls.username.value;
      this.user.password = this.accountForm.controls.password.value;
    });

    // subscribe to form changes and populate the user variable for the component
    this.personalSubscription = this.personalInfoForm.valueChanges.subscribe(() => {
      this.user.firstName = this.personalInfoForm.controls.firstName.value;
      this.user.lastName = this.personalInfoForm.controls.lastName.value;
      this.user.phoneNumber = this.personalInfoForm.controls.phoneNumber.value;
      this.user.email = this.personalInfoForm.controls.email.value;
    });

    // subscribe to address form changes and populate the user on the component
    this.addressSubscription = this.addressForm.valueChanges.subscribe(() => {
      this.user.addressLine1 = this.addressForm.controls.addressLine1.value;
      this.user.addressLine2 = this.addressForm.controls.addressLine2.value;
      this.user.city = this.addressForm.controls.city.value;
      this.user.state = this.addressForm.controls.state.value;
      this.user.postalCode = this.addressForm.controls.postalCode.value;
    });
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
    if (this.accountForm.valid) {

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

    if (this.accountForm.valid) {
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

  private mapUser(result: any): User {
    const user = new User();
    user.id = result._id;
    user.username = result.username;
    user.password = result.password;
    user.firstName = result.firstName;
    user.lastName = result.lastName;
    user.phoneNumber = result.phoneNumber;
    user.email = result.email;
    user.addressLine1 = result.addressLine1;
    user.addressLine2 = result.addressLine2;
    user.city = result.city;
    user.state = result.state;
    user.postalCode = result.postalCode;
    return user;
  }

  private populateForm() {
    if (this.user) {
      this.unsubscribeFormChanges();

      this.accountForm.controls.username.setValue(this.user.username);
      this.accountForm.controls.password.setValue(this.user.password);

      this.personalInfoForm.controls.firstName.setValue(this.user.firstName);
      this.personalInfoForm.controls.lastName.setValue(this.user.lastName);
      this.personalInfoForm.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.personalInfoForm.controls.email.setValue(this.user.email);

      this.addressForm.controls.addressLine1.setValue(this.user.addressLine1);
      this.addressForm.controls.addressLine2.setValue(this.user.addressLine2);
      this.addressForm.controls.city.setValue(this.user.city);
      this.addressForm.controls.state.setValue(this.user.state);
      this.addressForm.controls.postalCode.setValue(this.user.postalCode);
    }

    this.subscribeFormChanges();
  }

  /*
  ; Params: message
  ; Response: none
  ; Description: display the snackbar message
  */
  private displayMessage(message: string) {
    // display the snackbar message for 10sec
    this.snackBar.open(message, 'OK', {
      duration: 10000
    });
  }

}
// End Program
