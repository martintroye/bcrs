/*
============================================
; Title: user-list.component.ts
; Author: Troy Martin
; Date: 12 January 2020
; Modified By: Reva Baumann
; Description: user-list.component.ts
;===========================================
*/

// Start Program

// Import the Modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

// Export the class
export class UserListComponent implements OnInit {
  users: [] = [];
  // this list is required for the html to render correctly
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'userName',
    'functions'
  ];
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit() {
    this.http.get('http://localhost:3000/api/users')
    .subscribe((users: []) => {
      console.log(users);
      this.users = users;
    }, (err) =>{
      console.log(err);
    }, () => {
      console.log('complete');
    });
  }
  addUser(): void {}
  editUser(id: string): void {}
  deleteUser(id: string): void {}
}

// End Program
