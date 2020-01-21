/*
============================================
; Title: service-detail-dialog.component
; Author: Troy Martin
; Date: 01/19/2020
; Modified By: Troy Martin
; Description: Service Detail Dialog
;===========================================
*/
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from 'src/app/models/service.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './service-detail-dialog.component.html',
  styleUrls: ['./service-detail-dialog.component.css']
})
export class ServiceDetailDialogComponent implements OnInit {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api/services`;
  service: Service;
  form: FormGroup;
  id: string;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ServiceDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id }) {
    if (data && data.id) {
      this.id = data.id;
    }
  }

  ngOnInit() {

    this.form = this.fb.group({
      description: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])]
    });

    if (this.id) {
      this.http.get<Service>(`${this.apiBaseUrl}/${this.id}`).subscribe((service) => {
        if (service) {
          this.service = service;
        }
      }, (err) => {
        console.log(err);
      }, () => {
        if (!this.service) {
          this.service = new Service();
        }

        this.initForm();
      });
    } else {
      this.service = new Service();
      this.initForm();
    }
  }

  initForm() {
    this.form.controls.description.setValue(this.service.description);
    this.form.controls.price.setValue(this.service.price);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  save() {
    if (this.form.valid) {
      if (this.service._id) {
        this.http.put<Service>(`${this.apiBaseUrl}/${this.service._id}`, {
          description: this.form.controls.description.value,
          price: this.form.controls.price.value
        })
          .subscribe((res) => {
            if (res) {
              this.dialogRef.close(res);
            }
          }, (err) => {
            console.log(err);
          });
      } else {
        this.http.post<Service>(`${this.apiBaseUrl}/`, {
          description: this.form.controls.description.value,
          price: this.form.controls.price.value
        })
          .subscribe((res) => {
            if (res) {
              this.dialogRef.close(res);
            }
          }, (err) => {
            console.log(err);
          });

      }


    }
  }

}
