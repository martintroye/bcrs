import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() title: string;

  _user: User;
  get user(): User {
      return this._user;
  }

  @Input('user')
  set user(value: User) {
      this._user = value;
      if (this._user) {
        this.populateform();
      } else {
        this._user = new User();
      }
  }

  @Output() isValid: EventEmitter<boolean>;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
   }

  ngOnInit() {
  }

  /*
  ; Params: none
  ; Response: none
  ; Description: Initialize the form group
  */
  private initForm(): void {
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
      emailAddress: [null],
      phoneNumber: [null],
      addressLine1: [null],
      addressLine2: [null],
      city: [null],
      state: [null],
      postalCode: [null]
    });

    this.form.valueChanges.subscribe((c) => {
      this.getFormData();
    });
  }

    // getFormData, include details of users
    private getFormData() {
      this._user.username = this.form.controls.username.value;
      this._user.password = this.form.controls.password.value;
      this._user.lastName = this.form.controls.lastName.value;
      this._user.firstName = this.form.controls.firstName.value;
      this._user.phoneNumber = this.form.controls.phoneNumber.value;
      this._user.emailAddress = this.form.controls.emailAddress.value;
      this._user.addressLine1 = this.form.controls.addressLine1.value;
      this._user.addressLine2 = this.form.controls.addressLine2.value;
      this._user.city = this.form.controls.city.value;
      this._user.state = this.form.controls.state.value;
      this._user.postalCode = this.form.controls.postalCode.value;

      this.isValid.emit(this.form.valid);
    }

  private populateform() {
    this.form.controls.username.setValue(this._user.username);
    this.form.controls.password.setValue(this._user.password);
    this.form.controls.lastName.setValue(this.getOptionalValue(this._user.lastName));
    this.form.controls.firstName.setValue(this.getOptionalValue(this._user.firstName));
    this.form.controls.phoneNumber.setValue(this.getOptionalValue(this._user.phoneNumber));
    this.form.controls.emailAddress.setValue(this.getOptionalValue(this._user.emailAddress));
    this.form.controls.addressLine1.setValue(this.getOptionalValue(this._user.addressLine1));
    this.form.controls.addressLine2.setValue(this.getOptionalValue(this._user.addressLine2));
    this.form.controls.city.setValue(this.getOptionalValue(this._user.city));
    this.form.controls.state.setValue(this.getOptionalValue(this._user.state));
    this.form.controls.postalCode.setValue(this.getOptionalValue(this._user.postalCode));
  }

  private getOptionalValue(value: string) {
    return value ? value : '';
  }

}
