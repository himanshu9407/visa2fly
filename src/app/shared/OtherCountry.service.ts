import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserFlowDetails } from './user-flow-details.service';
import { HomeFormService } from '../components/home-form/home-form.service';

@Injectable({
    providedIn : "root"
})
export class OtherCountryService {

    public countryList : Array<any> = [];
    constructor (private router : Router, private userFlowService : UserFlowDetails, private homeFormService : HomeFormService) {

        this.countryList = JSON.parse(localStorage.getItem('countryList')) || [];

        if(this.countryList == []  || this.countryList == undefined || this.countryList == null) {

            this.homeFormService.getHomeFormDataFromServer().then(
                (data) => {
                    this.countryList = data.data.countries;
                }
            );
        }
    }


    validateCountry (country : string) {
        if(this.countryList.indexOf(country) != -1) {
            localStorage.setItem("activeCountry",country);
            this.router.navigate(['/home']);
        }
    }

    validateCountryPopular (country : string) {
        if(this.countryList.indexOf(country) != -1) {
            localStorage.setItem("popularCountry",country);
            window.location.reload();
        }
    }
}