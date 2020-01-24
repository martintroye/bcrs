import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent implements OnInit {
  form: FormGroup;
  username: string;
  email: string;
  phoneNumber: string;
  services: any;
  constructor(private http: HttpClient, 
            private cookieService: CookieService, 
            private fb: FormBuilder, 
            private dialog: MatDialog, 
            private router: Router) {

              // get the username
              this.username = this.cookieService.get('sessionuser')

              this.http.get(`/api/services/`).subscribe((services: []) => {
                this.services = services;
              }, (err) => {
                console.log(err);
              });
             }


  ngOnInit() {
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])],
      alternator: [null, null]
    });
    console.log(this.username);
  }

  submit(form) {
    console.log(form);
    const selectedServiceIds = [];
  for (const [key, value] of Object.entries(form.checkGroup)) {
    if (value) {
      selectedServiceIds.push({
        id: key
      });
    }
  }  

  console.log(selectedServiceIds);
  
  const lineItems = []

  for (const savedService of this.services) {
    for (const selectedService of selectedServiceIds) {
      if (savedService._id === selectedService.id) {
        lineItems.push({
          description: savedService.description,
          price: savedService.price
        });
      }
    }
  }
  console.log(lineItems);

  const partsAmount = parseFloat(form.parts);
  const laborAmount = form.labor * 50;
  const lineItemTotal = lineItems.reduce((prev, cur) => prev + cur.price, 0);
  const total = partsAmount + laborAmount + lineItemTotal;
  
  const invoice = {
    lineItems: lineItems,
    partsAmount: partsAmount,
    laborAmount: laborAmount,
    lineItemTotal: lineItemTotal,
    total: total,
    username: this.username,
    orderDate: new Date()
  };

  console.log(invoice);


}

}
