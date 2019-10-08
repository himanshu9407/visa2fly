import { Component, OnInit } from '@angular/core';
import { OtherCountryService } from 'src/app/shared/OtherCountry.service';

@Component({
  selector: 'app-free-visa',
  templateUrl: './free-visa.component.html',
  styleUrls: ['./free-visa.component.css']
})
export class FreeVisaComponent implements OnInit {

  constructor(private otherCountryService: OtherCountryService) { }

  ngOnInit() {
  }


  proceedToHome (countryName : string) {
    // console.log(countryName);
    this.otherCountryService.validateCountry(countryName);
  }

}
