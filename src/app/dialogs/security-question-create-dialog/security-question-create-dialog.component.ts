/*
============================================
; Title: security-question-create-dialog.component
; Author: Adam Donner
; Date: 01/10/2020
; Modified By: Adam Donner
; Description: Creates new security questions
;===========================================
*/


// start program
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-security-question-create-dialog',
  templateUrl: './security-question-create-dialog.component.html',
  styleUrls: ['./security-question-create-dialog.component.css']
})
export class SecurityQuestionCreateDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router,
    private dialogRef: MatDialogRef<SecurityQuestionCreateDialogComponent>) {
   }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }
  /**
   * Creates a new security question using text from the form field
   */
  create() {
    // write to the API
    this.http.post('api/security-questions', {
      text: this.form.controls.text.value
    }).subscribe( res => {
      this.dialogRef.close(true); // routes back to the secutiy question page
    });
  }

  /**
   * If cancels route back to security questions page
   */
  cancel() {
    this.dialogRef.close(true);
  }
}
// end program