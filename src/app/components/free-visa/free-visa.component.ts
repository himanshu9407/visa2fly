import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-free-visa',
  templateUrl: './free-visa.component.html',
  styleUrls: ['./free-visa.component.css']
})
export class FreeVisaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  proceedToHome (countryName : string) {
    console.log(countryName);
  }

}
