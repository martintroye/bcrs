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
import {Component, OnInit } from '@anglar/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

// Details of the component, including route
@component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private)
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.http.get('/api/users/'+ this.userId).subscribe(res => {
      this.user = res;
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.firstname.setValue(this.user.firstname);
      this.form.controls.lastname.setValue(this.user.lastname);
      this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.form.controls.address.setValue(this.user.address);
      this.form.controls.email.setValue(this.user.email);
      this.form.controls.role.setValue(this.user.role);
    });
}

ngOnInit() {
  this.form = this.fb.group({
    firstname: [null, Validators.compose([Validators.required])],
    lastname: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email)],
    role: [null, Validators.compose([Validators.required])],
  });
}

saveUser() {
  this.http.put('/api/users/' + this.userId, {
    firstname: this.form.controls.fistname.value,
    lastname: this.form.controls.lastname.value,
    phoneNumber: this.form.controls.phoneNumber.value,
    address: this.form.controls.address.value,
    email: this.form.controls.email.value,
    role: this.form.controls.role.value
  }).subscribe(res => {
    this.router.navigate(['/users']);
  });
}

cancelAnimationFrame() {
  this.router.navigate(['/users']);
}

// End Program
