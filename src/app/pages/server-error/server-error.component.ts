import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  year: number = Date.now();

  constructor() { }

  ngOnInit() {
  }

}
