/*
============================================
; Title: security-question-list.component
; Author: Troy Martin
; Date: 01/09/2020
; Modified By: Troy Martin
; Description: List of security questions to manage
;===========================================
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { SecurityQuestion } from 'src/app/models/security-question.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

// declare the component
@Component({
  // define the html template file
  templateUrl: './security-questions-list.component.html',
  // define the css for the component
  styleUrls: ['./security-questions-list.component.css']
})
// declare and export the component class
export class SecurityQuestionsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  questions: SecurityQuestion[] = [];
  displayedColumns: string[] = ['text', 'functions'];
  allQuestions: SecurityQuestion[];
  filterValue: string;

  /*
  ; Params: none
  ; Response: none
  ; Description: default constructor
  */
  constructor(private questionService: SecurityQuestionService) {}

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the component
  */
  ngOnInit() {
    this.questionService.getAll().subscribe(questions => {
      this.questions = questions;
    });
  }

  onClear(): void {
    this.filterValue = '';
    this.onKeyUp(this.filterValue);
  }

  onKeyUp(value: string): void {
    if (value && value.length >= 3) {
      if (!this.allQuestions) {
        this.allQuestions = this.questions;
      }

      this.questions = this.questions.filter(x => {
        return x.text.indexOf(value) >= 0;
      });
    } else {
      if (this.allQuestions) {
        this.questions = this.allQuestions;
        this.allQuestions = null;
      }
    }
  }
}
