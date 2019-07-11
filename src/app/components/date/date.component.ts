import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  //   $('#minMaxExample').datepicker();
  //   $('#minMaxExample').datepicker({
  //     language: 'en',
  //     minDate: new Date() // Now can select only dates, which goes after today
  // });
  }

}
