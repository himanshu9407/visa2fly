import { Component, OnInit } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-address',
  templateUrl: './country-address.component.html',
  styleUrls: ['./country-address.component.css']
})
export class CountryAddressComponent implements OnInit {
  activeRoute: string;

  constructor(private userflow: UserFlowDetails, private router: Router) {
    this.activeRoute = this.router.url.split('/')[2];
   }

  ngOnInit(): void {
  }

  resetPage() {
    this.userflow.setCookie("selectedVisaPurpose", "Tourist");
  }

}
