import { Component, OnInit } from '@angular/core';
import { OtherCountryService } from 'src/app/shared/OtherCountry.service';
import { PreloaderService } from 'src/app/shared/preloader.service';

@Component({
  selector: 'app-free-visa',
  templateUrl: './free-visa.component.html',
  styleUrls: ['./free-visa.component.css']
})
export class FreeVisaComponent implements OnInit {

  constructor(private otherCountryService: OtherCountryService, private preloaderService: PreloaderService) {
    this.preloaderService.showPreloader(true);
   }

  ngOnInit() {
    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 4000);
  }


  proceedToHome (countryName : string) {
    console.log(countryName);
    this.otherCountryService.validateCountry(countryName);
  }

}
