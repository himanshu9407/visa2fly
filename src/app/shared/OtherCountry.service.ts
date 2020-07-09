import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserFlowDetails } from "./user-flow-details.service";
import { isPlatformBrowser } from "@angular/common";
import { HomeFormService } from '../components/home-container/home-form/home-form.service';

@Injectable({
  providedIn: "root",
})
export class OtherCountryService {
  public countryList: Array<any> = [];
  constructor(
    private router: Router,
    private userFlow: UserFlowDetails,
    private homeFormService: HomeFormService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.userFlow.getCookie("countryList")) {
        this.countryList = JSON.parse(this.userFlow.getCookie("countryList")) || [];
      }
    }

    if (
      this.countryList == [] ||
      this.countryList == undefined ||
      this.countryList == null
    ) {
      this.homeFormService.getHomeFormDataFromServer().subscribe((data) => {
        this.countryList = data.data.countries;
      });
    }
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
    if (this.countryList.indexOf(country) != -1) {
      if (isPlatformBrowser(this.platformId)) {
        this.userFlow.setCookie("popularCountry", country);
      }
      window.location.reload();
    }
  }
}
