import { Component, OnInit } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Component({
  selector: 'app-country-address',
  templateUrl: './country-address.component.html',
  styleUrls: ['./country-address.component.css']
})
export class CountryAddressComponent implements OnInit {

  constructor(private userflow: UserFlowDetails) { }

  ngOnInit(): void {
  }

 

}
