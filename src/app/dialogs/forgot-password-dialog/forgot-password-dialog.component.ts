import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {
  // declare the variables
userNameForm: FormGroup;
securityQuestionForm: FormGroup;
newPasswordForm: FormGroup;
selectedSecurityQuestions: any;


/*
; Params: none
; Response: none
; Description: default constructor
*/
constructor(
  private http: HttpClient,
  private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
  private fb: FormBuilder,
  private snackBar: MatSnackBar
) {}



  ngOnInit() {
    
  }

/**
 * Params: Username
 * Response: boolean
 * description: Test if there is a valid username in the system.
 */
validUserName() {
  const username = this.userNameForm.controls.username.value;

  this.http.get('/api/session/verify/users/' + username).subscribe( res => {
    if (res) {
      this.http.get('/api/users/' + username + 'security-questions').subscribe(res => {
        this.selectedSecurityQuestions = res; 
        /**
         * Should the remainder of the code for validating password go here?
         */
      })
    }
  }, err => {
    console.log(err);
  })
}

}
