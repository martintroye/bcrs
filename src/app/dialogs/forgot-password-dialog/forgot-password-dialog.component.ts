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
question1: string;
question2: string;
question3: string;
errorMessage: string;



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
    //if true pull selected security questions.
    if (res) {
      this.http.get('/api/users/' + username + 'security-questions').subscribe(res => {
        this.selectedSecurityQuestions = res; 
      },  err => {
        console.log(err)
      }, () => {
        // find selected security questions by id and populate from array
        this.http.post('/api/security-questions/find-by-ids', {
          question1: this.selectedSecurityQuestions[0].questionId,
          question2: this.selectedSecurityQuestions[1].questionId,
          question3: this.selectedSecurityQuestions[2].questionId,
        }).subscribe(res => {
          this.question1 = res[0].text;
          this.question2 = res[1].text;
          this.question3 = res[2].text;

          console.log(this.question1);
          console.log(this.question2);
          console.log(this.question3);
        });
      });
    }
  }, err => {
    console.log(err);
    this.errorMessage = "Invalid username."
  })
}

}
