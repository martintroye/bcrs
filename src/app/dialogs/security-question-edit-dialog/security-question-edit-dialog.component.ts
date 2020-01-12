import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationDialogData } from 'src/app/models/confirmation-dialog-data.model';

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
    private dialogRef: MatDialogRef<SecurityQuestionEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SecurityQuestionEditDialogComponent ) {
      this.questionId = data.questionId;
      this.question = data.question;

      this.http.get('api/security-questions/' + this.questionId).subscribe(res => {
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
    this.http.put('/api/security-questions/' + this.questionId, {
      text: this.form.controls.text.value
    }).subscribe( res => {
      this.dialogRef.close({_id: this.questionId, text: this.question}); // routes back to the secutiy question page
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