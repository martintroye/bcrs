/*
============================================
; Title: user-detail-dialog.component
; Author: Reva Baumann
; Date: 01/09/2020
; Modified By: Reva Baumann
; Description: List of users
;===========================================
*/

// Start Program

// Import the Modules
import {Component, OnInit} from '@angular/core';
// Not sure if this is the correct import - User Dialog
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

// Export the component
@Component({
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})
export class UserDetailDialogComponent implements OnInit {
  user: any;
  displayedColumns = ['username', 'firstname', 'lastname', 'phoneNumber', 'address', 'email', 'function']

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.http.get('/api/users').subscribe(res => {
      this.user = res;
      console.log(this.user);
    }, err=> {
      console.log(err);
    });
  }

  ngOnInit() {

  }

}
