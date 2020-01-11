/*
============================================
; Title: security-question.service
; Author: Troy Martin
; Date: 01/09/2020
; Modified By: Troy Martin
; Description: Security question service
;===========================================
*/
// imports from the angular core module
import { Injectable } from '@angular/core';
// imports from angular common
import { HttpClient } from '@angular/common/http';
// import rxjs
import { Observable } from 'rxjs';
// import our custom security question model
import { SecurityQuestion } from '../../models/security-question.model';
import { environment } from '../../../environments/environment';

// declare injectable
@Injectable({
  providedIn: 'root'
})
// declare and export the service class
export class SecurityQuestionService {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api/security-questions`;

  /*
  ; Params: http: HttpClient
  ; Response: none
  ; Description: default constructor
  */
  constructor(private http: HttpClient) { }

  /*
  ; Params: none
  ; Response: SecurityQuestion[]
  ; Description: FindAll security questions
  */
  getAll(): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(`${this.apiBaseUrl}/`);
  }
}
