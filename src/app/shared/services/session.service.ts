/*
============================================
; Title: session.service
; Author: Troy Martin
; Date: 01/09/2019
; Modified By: Troy Martin
; Description: Session cookie service
;===========================================
*/
// imports from the angular core module
import { Injectable } from '@angular/core';
// imports from the ngx-cookie-service module
import { CookieService } from 'ngx-cookie-service';
// imports from rxjs
import { BehaviorSubject } from 'rxjs';

// declare the injectable
@Injectable({
  providedIn: 'root'
})
// declare and export the class
export class SessionService {
  // declare the cookie name and set the default value
  cookieName = 'sessionuser';

  /*
  ; Params: cookieService
  ; Response: none
  ; Description: default constructor
  */
  constructor(private cookieService: CookieService) {}

  /*
  ; Params: none
  ; Response: none
  ; Description: does the sessionuser cookie exist
  */
  hasCookie(): boolean {
    // retrieve the cookie by name
    const user = this.cookieService.get(this.cookieName);

    // if truthy
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
