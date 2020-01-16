import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './user-registration-dialog.component.html',
  styleUrls: ['./user-registration-dialog.component.css']
})
export class UserRegistrationDialogComponent implements OnInit {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api/users`;
  user: User = new User();
  isLinear = true;
  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  accountForm: FormGroup;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserRegistrationDialogComponent>,
    private fb: FormBuilder) {
     }

  ngOnInit() {
    this.personalInfoForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      emailAddress: [null],
      phoneNumber: [null],
    });

    this.personalInfoForm.valueChanges.subscribe(() => {
      this.user.firstName = this.personalInfoForm.controls.firstName.value;
      this.user.lastName = this.personalInfoForm.controls.firstName.value;
      this.user.phoneNumber = this.personalInfoForm.controls.firstName.value;
      this.user.emailAddress = this.personalInfoForm.controls.firstName.value;
    });

    this.addressForm = this.fb.group({
      addressLine1: [null],
      addressLine2: [null],
      city: [null],
      state: [null],
      postalCode: [null]
    });

    this.addressForm.valueChanges.subscribe(() => {
      this.user.addressLine1 = this.addressForm.controls.addressLine1.value;
      this.user.addressLine2 = this.addressForm.controls.addressLine2.value;
      this.user.city = this.addressForm.controls.city.value;
      this.user.state = this.addressForm.controls.state.value;
      this.user.postalCode = this.addressForm.controls.postalCode.value;
    });

    this.accountForm = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          // https://stackoverflow.com/questions/52850017/how-to-create-custom-lowercase-validator-in-angular-6
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
        ])
      ]
    });

    this.accountForm.valueChanges.subscribe(() => {
      this.user.username = this.personalInfoForm.controls.username.value;
      this.user.password = this.personalInfoForm.controls.password.value;
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  signIn() { }
}
