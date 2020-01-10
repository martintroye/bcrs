/*============================================
; Title: signin.component.ts
; Author: Adam Donner
; Date: 9 January 2020
; Description:  signin.component.ts
;===========================================
*/


// start program

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
    });
  }
  /**
   * Signin function.
   * Tests signin calling API from server.
   */
  signin() {
    /**
     * Assign variables with values collected from form.
     */
    const username  = this.form.controls.username.value;
    const password = this.form.controls.password.value;

    console.log(username);
    console.log(password);
    // Call API
    this.http.post('/api/sessions/signin', {
      username,
      password
    }).subscribe(res => {
        if (res['isAuthenticated']) {
          /**
           * Signing to application
           */
          this.cookieService.set('sessionuser', username, 1)
          this.router.navigate(['/']);
        } else { // else display error message
          this.errorMessage = res['message']
        }
      });
  }
}

// end program