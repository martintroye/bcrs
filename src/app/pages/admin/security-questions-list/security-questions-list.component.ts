/*
============================================
; Title: security-question-list.component
; Author: Troy Martin
; Date: 01/09/2020
; Modified By: Troy Martin
; Description: List of security questions to manage
;===========================================
*/
// imports from the angular core module
import { Component, OnInit, ViewChild } from '@angular/core';
// imports our custom security question service
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
// imports our custom security question model
import { SecurityQuestion } from 'src/app/models/security-question.model';

// declare the component
@Component({
  // define the html template file
  templateUrl: './security-questions-list.component.html',
  // define the css for the component
  styleUrls: ['./security-questions-list.component.css']
})
// declare and export the component class
export class SecurityQuestionsListComponent implements OnInit {

  // declare a local question array to bind to the table
  questions: SecurityQuestion[] = [];
  // declare the columns to display in the table
  displayedColumns: string[] = ['text', 'functions'];
  // an array to store the original list of questions
  allQuestions: SecurityQuestion[];
  // the current filter value
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

  /*
  ; Params: none
  ; Response: none
  ; Description: Clear the current filter value and reset the collection
  */
  onClear(): void {
    this.filterValue = '';
    this.onKeyUp(this.filterValue);
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: On key up filter the question list
  */
  onKeyUp(value: string): void {
    // if we have 3 or more characters start filtering the list
    if (value && value.length >= 3) {
      // save the full collection so we do not round trip to server
      if (!this.allQuestions) {
        // set the question list
        this.allQuestions = this.questions;
      }

      // use the array filter function to filter the questions
      this.questions = this.questions.filter(x => {
        // return true if the question contains the value
        return x.text.indexOf(value) >= 0;
      });
    } else {
      // since there is not a valid value show all questions
      if (this.allQuestions) {
        this.questions = this.allQuestions;
        // clear the array
        this.allQuestions = null;
      }
    }
  }
}
