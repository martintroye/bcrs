import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './user-registration-dialog.component.html',
  styleUrls: ['./user-registration-dialog.component.css']
})
export class UserRegistrationDialogComponent implements OnInit {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api`;
  user: User = new User();
  isLinear = true;
  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  accountForm: FormGroup;
  username: string;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserRegistrationDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.personalInfoForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      emailAddress: [null],
      phoneNumber: [null]
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
      this.user.username = this.accountForm.controls.username.value;
      this.user.password = this.accountForm.controls.password.value;
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  signIn() {
    // todo also validate that we have three security questions for the user
    if (this.accountForm.valid) {
      this.http
        .post(`${this.apiBaseUrl}/sessions/register`, this.user)
        .subscribe(
          (res: any) => {
            // if we get a result and the result has a mongo id then success
            if (res
              && res._id) {
              console.log('user-registration-dialog / signIn', 'success', res);
              this.username = res.username;
            }
          },
          (err) => {
            console.log('user-registration-dialog / signIn', 'error', err);
            this.displayMessage('There was an error creating your account.');
          },
          () => {
            if (this.username) {
              this.dialogRef.close(this.username);
            }
          }
        );
    }
  }

  /*
  ; Params: message
  ; Response: none
  ; Description: display the snackbar message
  */
  private displayMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 10000
    });
  }
}
