import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';

@Component({
  templateUrl: './purchases-graph.component.html',
  styleUrls: ['./purchases-graph.component.css']
})
export class PurchasesGraphComponent implements OnInit {
  // declare and set the default base url for the http service calls
  apiBaseUrl = `${environment.baseUrl}/api/invoices`;
  data: any;
  options = {
    responsive: true,
    scales: {
      yAxes: [{
        min: 0,
        step: 1,
        display: true,
        ticks: {
          beginAtZero: true,
          max: 5,
          min: 0,
          stepSize: 1,
        }
      }]
    }
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${this.apiBaseUrl}/purchases-graph`)
      .pipe(map((res) => {
        if (res && Array.isArray(res)) {

          return {
            labels: ['Keyboard Cleaning', 'Software Installation', 'RAM Upgrade'],
            datasets: [
              {
                label: 'Services Purchased',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: [3, 1, 1]
              }
            ]
          };

        }
      })).subscribe((results) => {
        this.data = results;
      });
  }

}
