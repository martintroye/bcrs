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

@Component({
  selector: 'app-security-question-create-dialog',
  templateUrl: './security-question-create-dialog.component.html',
  styleUrls: ['./security-question-create-dialog.component.css']
})
export class SecurityQuestionCreateDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router) {
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
      this.router.navigate(['admin/security-questions']); // routes back to the secutiy question page
    });
  }

  /**
   * If cancels route back to security questions page
   */
  cancel() {
    this.router.navigate(['admin/security-questions']);
  }
}
// end program