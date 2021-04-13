import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserFlowDetails } from "./user-flow-details.service";
import { isPlatformBrowser } from "@angular/common";
import { HomeFormService } from '../components/home-container/home-form/home-form.service';
import { visaFormData } from "../interfaces/visa-form";

@Injectable({
  providedIn: "root",
})
export class OtherCountryService {
  homeFormData: visaFormData;
  countryList: string[];

  constructor(
    private router: Router,
    private userFlow: UserFlowDetails,
    private homeFormService: HomeFormService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.homeFormService.homeFormData.subscribe((res: visaFormData) => {
      // console.log(res);
      this.homeFormData = res;
      this.countryList = this.homeFormData.countries;
    });
  }

  validateCountry(country: string) {
    if (this.countryList.indexOf(country) != -1) {
      if (isPlatformBrowser(this.platformId)) {
        this.userFlow.setCookie("activeCountry", country);
      }
      this.router.navigate(["/visa"]);
      // window.location.reload();
    }
  }

  validateCountryPopular(country: string) {
    console.log(country);
    if (this.countryList.indexOf(country) != -1) {
      this.userFlow.setCookie("popularCountry", country);
      window.location.reload();
    }
  }
}
