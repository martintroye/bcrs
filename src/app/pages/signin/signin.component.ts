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
import { MatDialog } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import { UserRegistrationDialogComponent } from 'src/app/dialogs/user-registration-dialog/user-registration-dialog.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])]
    });
  }
  /**
   * SignIn function.
   * Tests signin calling API from server.
   */
  signin() {
    /**
     * Assign variables with values collected from form.
     */
    const username  = this.form.controls.username.value;
    const password = this.form.controls.password.value;

    // Call API
    this.http.post('/api/sessions/signin', {
      username,
      password
    }).subscribe(res => {
        if (res['isAuthenticated']) {
          /**
           * Signing to application
           */
          this.cookieService.set('sessionuser', username, 1);
          this.router.navigate(['/']);
        } else { // else display error message
          this.errorMessage = res['message'];
        }
      }, (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      });
  }

  register() {
    // declare and create the material dialog
    const dialogRef = this.dialog.open(UserRegistrationDialogComponent, {
      width: '60%', // options to control height and width of dialog
      disableClose: true, // the user cannot click in the overlay to close
      // pass the title and message to the dialog
      data: { id: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // the user was updated need to replace them in the array
        this.cookieService.set('sessionuser', result, 1);
        this.router.navigate(['/']);
      }

      // else they canceled nothing to do here
    });
  }
}



// end program
