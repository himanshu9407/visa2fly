import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OtherCountryService } from 'src/app/shared/OtherCountry.service';

@Component({
  selector: 'app-mini-carousel',
  templateUrl: './mini-carousel.component.html',
  styleUrls: ['./mini-carousel.component.css']
})
export class MiniCarouselComponent implements OnInit {

  

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private otherCountryService : OtherCountryService) { }

  ngOnInit() {
  }
  



  proceedToHome (countryName : string) {
    // console.log(countryName);
    this.otherCountryService.validateCountryPopular(countryName);
  }
}
