import { Component, OnInit } from '@angular/core';
import { OtherCountryService } from 'src/app/shared/OtherCountry.service';
import { PreloaderService } from 'src/app/shared/preloader.service';

@Component({
  selector: 'app-visa-arrival',
  templateUrl: './visa-arrival.component.html',
  styleUrls: ['./visa-arrival.component.css']
})
export class VisaArrivalComponent implements OnInit {

  constructor(private otherCountryService: OtherCountryService, private preloaderService : PreloaderService) {

    this.preloaderService.showPreloader(true);
   }

  ngOnInit() {
    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 4000);
  }

  proceedToHome(countryName : string) {
    // console.log(countryName);
    this.otherCountryService.validateCountry(countryName);
  }

}
