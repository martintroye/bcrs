import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityQuestion } from 'src/app/models/security-question.model';
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
