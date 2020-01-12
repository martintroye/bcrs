/*
============================================
; Title: user-list.component
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
import {UserDeleteDialogComponent} from '../../dialogs/user-delete-dialog/user-delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

// Export the component
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserDetailsComponent implements OnInit {
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

  delete(userId, username) {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      data: {
        username
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.http.delete('/api/users/' + userId).subscribe(res => {
          console.log('User Deleted');
          this.user = this.user.filter(u => u._id !== userId);
        });
      }
    });
  }
}
