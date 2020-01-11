import { Injectable } from '@angular/core';
// imports from the ngx-cookie-service module
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // declare the cookie name and set the default value
  cookieName = 'sessionuser';

  constructor(private cookieService: CookieService) {}

  hasCookie(): boolean {
    const user = this.cookieService.get(this.cookieName);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
