import { Component, OnInit } from '@angular/core';
import { OtherCountryService } from 'src/app/shared/OtherCountry.service';

@Component({
  selector: 'app-visa-arrival',
  templateUrl: './visa-arrival.component.html',
  styleUrls: ['./visa-arrival.component.css']
})
export class VisaArrivalComponent implements OnInit {

  constructor(private otherCountryService: OtherCountryService) { }

  ngOnInit() {
  }

  proceedToHome(countryName : string) {
    // console.log(countryName);
    this.otherCountryService.validateCountry(countryName);
  }

}
