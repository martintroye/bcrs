/*
============================================
; Title: user-profile.component
; Author: Troy Martin
; Date: 01/23/2020
; Modified By: Troy Martin
; Description: User profile
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api`;

  username: string;
  user: User;

  constructor(private sessionService: SessionService, private http: HttpClient) {
    this.username = this.sessionService.getUsername();
    console.log(this.username);
  }

  ngOnInit() {
    this.http.get<User>(`${this.apiBaseUrl}/sessions/verify/users/${this.username}`)
    .subscribe((u) => {
      this.user = u;
    }, (err) => {
      console.log(err);
    });
  }

}
