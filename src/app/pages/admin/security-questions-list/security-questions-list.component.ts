/*
============================================
; Title: security-question-list.component
; Author: Troy Martin
; Date: 01/09/2020
; Modified By: Troy Martin
; Description: List of security questions to manage
;===========================================
*/
import { Component, OnInit } from "@angular/core";
import { SecurityQuestionService } from "src/app/shared/services/security-question.service";
import { SecurityQuestion } from "src/app/models/security-question.model";

// declare the component
@Component({
  // define the html template file
  templateUrl: "./security-questions-list.component.html",
  // define the css for the component
  styleUrls: ["./security-questions-list.component.css"]
})
// declare and export the component class
export class SecurityQuestionsListComponent implements OnInit {
  questions: SecurityQuestion[];
  displayedColumns: string[] = ["text", "functions"];

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
}
