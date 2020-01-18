/*
============================================
; Title: user-form.component
; Author: Troy Martin
; Date: 01/15/2019
; Modified By: Troy Martin
; Description: Common user form
;===========================================
*/

// imports from angular and our custom components
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// declare the component
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
// declare and export the component class
export class UserFormComponent implements OnInit {
  // input for the form title
  @Input() title: string;

  // declare a user variable to store information
  _user: User;
  // getter to provide output
  get user(): User {
    return this._user;
  }

  // input for user
  @Input('user')
  // setter for user
  set user(value: User) {
    this._user = value;
    // if the user is null create a new user model
    if (!this._user) {
      this._user = new User();
    } else {
      // populate the form with the data from the user model
      this.populateform();
    }
  }

  // declare an output to tell the subscriber that the form is valid
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  // declare a subscription for value changes
  valueChangeSubscription: Subscription;
  // declare the form group
  form: FormGroup;

  /*
  ; Params: none
  ; Response: none
  ; Description: default constructor
  */
  constructor(private fb: FormBuilder) {
    // initialize the form group
    this.initForm();
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: initialize the component
  */
  ngOnInit() { }

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the form group
  */
  private initForm(): void {
    // declare the form group
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          // https://stackoverflow.com/questions/52850017/how-to-create-custom-lowercase-validator-in-angular-6
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
        ])
      ],
      firstName: [null],
      lastName: [null],
      email: [null],
      phoneNumber: [null],
      addressLine1: [null],
      addressLine2: [null],
      city: [null],
      state: [null],
      postalCode: [null]
    });

    // emit the initial form status
    this.isValid.emit(this.form.valid);
    // call the method to subscribe to value changes
    this.subscribeToValueChanges();
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: populate form data into the component user model
  */
  private getFormData() {
    this._user.username = this.form.controls.username.value;
    this._user.password = this.form.controls.password.value;
    this._user.lastName = this.form.controls.lastName.value;
    this._user.firstName = this.form.controls.firstName.value;
    this._user.phoneNumber = this.form.controls.phoneNumber.value;
    this._user.email = this.form.controls.email.value;
    this._user.addressLine1 = this.form.controls.addressLine1.value;
    this._user.addressLine2 = this.form.controls.addressLine2.value;
    this._user.city = this.form.controls.city.value;
    this._user.state = this.form.controls.state.value;
    this._user.postalCode = this.form.controls.postalCode.value;

    // emit the status of the form
    this.isValid.emit(this.form.valid);
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: sets up the subscription to form value changes
  */
  private subscribeToValueChanges() {
    // create the subscription
    this.valueChangeSubscription = this.form.valueChanges.subscribe(c => {
      // as data changes get the form data
      this.getFormData();
    });
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: populate the form with data from the model
  */
  private populateform() {

    // shut of the value change subscription if it exists
    // will cause model properties to be cleared.
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }

    this.form.controls.username.setValue(this._user.username);
    this.form.controls.password.setValue(this._user.password);
    this.form.controls.lastName.setValue(
      this.getOptionalValue(this._user.lastName)
    );
    this.form.controls.firstName.setValue(
      this.getOptionalValue(this._user.firstName)
    );
    this.form.controls.phoneNumber.setValue(
      this.getOptionalValue(this._user.phoneNumber)
    );
    this.form.controls.email.setValue(
      this.getOptionalValue(this._user.email)
    );
    this.form.controls.addressLine1.setValue(
      this.getOptionalValue(this._user.addressLine1)
    );
    this.form.controls.addressLine2.setValue(
      this.getOptionalValue(this._user.addressLine2)
    );
    this.form.controls.city.setValue(this.getOptionalValue(this._user.city));
    this.form.controls.state.setValue(this.getOptionalValue(this._user.state));
    this.form.controls.postalCode.setValue(
      this.getOptionalValue(this._user.postalCode)
    );

    // subscribe to the changes again
    this.subscribeToValueChanges();
    // emit the status of the form
    this.isValid.emit(this.form.valid);
  }

  /*
  ; Params: value: string
  ; Response: none
  ; Description: is the string truthy or empty return empty or value
  */
  private getOptionalValue(value: string) {
    return !value || value === '' ? '' : value;
  }
}
