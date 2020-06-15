import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserFlowDetails } from './user-flow-details.service';
import { HomeFormService } from '../components/home-form/home-form.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn : "root"
})
export class OtherCountryService {

    public countryList : Array<any> = [];
    constructor (private router : Router, private userFlowService : UserFlowDetails, private homeFormService : HomeFormService,  @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
        this.countryList = JSON.parse(localStorage.getItem('countryList')) || [];
        }

        if(this.countryList == []  || this.countryList == undefined || this.countryList == null) {

            this.homeFormService.getHomeFormDataFromServer().subscribe(
                (data) => {
                    this.countryList = data.data.countries;
                }
            );
        }
    }


    validateCountry (country : string) {
        if(this.countryList.indexOf(country) != -1) {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem("activeCountry",country);
            }
            this.router.navigate(['/visa']);
            // window.location.reload();
        }
    }

    validateCountryPopular (country : string) {
        if(this.countryList.indexOf(country) != -1) {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem("popularCountry",country);
            }
            window.location.reload();
        }
    }
}