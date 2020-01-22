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
  selectedChart = 'bar';
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
          const labels = [];
          const data = [];
          // convert to the chart format
          res.forEach((x) => {
            labels.push(x._id);
            data.push(x.quantity);
          });

          return {
            labels,
            datasets: [
              {
                label: 'Services Purchased',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data
              }
            ]
          };

        }
      })).subscribe((results) => {
        this.data = results;
      });
  }

  onChartChange(chart: string) {
    console.log(chart);

  }

}
