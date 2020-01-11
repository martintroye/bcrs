import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-security-question-edit-dialog',
  templateUrl: './security-question-edit-dialog.component.html',
  styleUrls: ['./security-question-edit-dialog.component.css']
})

export class SecurityQuestionEditDialogComponent implements OnInit {
  question: any;
  questionId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router,
    private dialogRef: MatDialogRef<SecurityQuestionEditDialogComponent>) {
      this.questionId = this.route.snapshot.paramMap.get('questionId');
      this.http.get('api/security-questions' + this.questionId).subscribe(res => {
        this.question = res;
      }, err => {
        console.log(err);
      }, () => {
        this.form.controls.text.setValue(this.question.text);
      });
    }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }
  /**
   * Puts new value of security quesion using text from the form field
   */
  saveQuestion() {
    // write to the API
    this.http.put('api/security-questions' + this.questionId, {
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