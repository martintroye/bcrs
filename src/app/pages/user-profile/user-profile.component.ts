/*
============================================
; Title: user-profile.component
; Author: Troy Martin
; Date: 01/23/2020
; Modified By: Troy Martin
; Description: User profile
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchingPassword } from '../../shared/validators/matching-password.validator';
import { SecurityQuestion } from 'src/app/models/security-question.model';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // declare and set variables
  apiBaseUrl = `${environment.baseUrl}/api`;
  username: string;
  user: User;
  questions: SecurityQuestion[];
  personalInfoForm: FormGroup;
  newPasswordForm: FormGroup;
  securityQuestionsForm: FormGroup;

  /*
  ; Params: none
  ; Response: none
  ; Description: default constructor
  */
  constructor(
    private sessionService: SessionService,
    private http: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {
    // get the logged in user name
    this.username = this.sessionService.getUsername();
    console.log(this.username);

    // get the security questions to display in the drop downs
    this.http.get<SecurityQuestion[]>(`${this.apiBaseUrl}/security-questions`)
      .subscribe((questions) => {
        this.questions = questions;
      }, (err) => {
        console.log(err);
      });
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the component
  */
  ngOnInit() {
    // declare the personal information form
    this.personalInfoForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null, [Validators.email]],
      phoneNumber: [null],
      addressLine1: [null],
      addressLine2: [null],
      city: [null],
      state: [null],
      postalCode: [null]

    });

    // declare the new password form
    this.newPasswordForm = this.fb.group({
      currentPassword: [null, Validators.required],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[0-9]/)
      ])],
      confirmationPassword: [null, [Validators.required]]
    },
      // FormGroup validators
      [
        matchingPassword('password', 'confirmationPassword')
      ]);

    // declare the security question form
    this.securityQuestionsForm = this.fb.group({
      questionId1: [null, [Validators.required]],
      answer1: [null, [Validators.required]],
      questionId2: [null, [Validators.required]],
      answer2: [null, [Validators.required]],
      questionId3: [null, [Validators.required]],
      answer3: [null, [Validators.required]],
    });

    // get the logged in users information
    this.http.get<User>(`${this.apiBaseUrl}/sessions/verify/users/${this.username}`)
      .subscribe((u) => {
        console.log(u);
        // set the user on the component
        this.user = u;
      }, (err) => {
        console.log(err);
      }, () => {
        // on completion set the form values
        this.setFormValues();
      });
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Reset the personal information form back to original values
  */
  resetPersonalInfo() {
    this.setPersonalInformation();
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Update the users personal information
  */
  savePersonalInfo() {

    this.displayMessage('Your personal information has been updated.')
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Change the users password
  */
  changePassword() {
    this.displayMessage('Your password has been changed.')

  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Reset the security questions
  */
  resetQuestions() {
    this.setUsersQuestions();
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Update the users security question choices
  */
  setQuestions() {
    this.displayMessage('Your security questions and answers have been updated.')
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Sets the form values based on the current user
  */
  private setFormValues() {
    this.setPersonalInformation();
    this.setUsersQuestions();
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Sets the personal information form to the user values
  */
  private setPersonalInformation() {
    // set if we have a user
    if (this.user) {
      this.personalInfoForm.controls.firstName.setValue(this.user.firstName);
      this.personalInfoForm.controls.lastName.setValue(this.user.lastName);
      this.personalInfoForm.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.personalInfoForm.controls.email.setValue(this.user.email);
      this.personalInfoForm.controls.addressLine1.setValue(this.user.addressLine1);
      this.personalInfoForm.controls.addressLine2.setValue(this.user.addressLine2);
      this.personalInfoForm.controls.city.setValue(this.user.city);
      this.personalInfoForm.controls.state.setValue(this.user.state);
      this.personalInfoForm.controls.postalCode.setValue(this.user.postalCode);

    }
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Set the users security questions
  */
  private setUsersQuestions() {
    // set if we have a user and questions
    if (this.user && this.user.SecurityQuestions) {
      this.securityQuestionsForm.controls.questionId1.setValue(this.user.SecurityQuestions[0].id);
      this.securityQuestionsForm.controls.answer1.setValue(this.user.SecurityQuestions[0].answer);

      this.securityQuestionsForm.controls.questionId2.setValue(this.user.SecurityQuestions[1].id);
      this.securityQuestionsForm.controls.answer2.setValue(this.user.SecurityQuestions[1].answer);

      this.securityQuestionsForm.controls.questionId3.setValue(this.user.SecurityQuestions[2].id);
      this.securityQuestionsForm.controls.answer3.setValue(this.user.SecurityQuestions[2].answer);

    }
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
