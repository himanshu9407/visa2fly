import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { CookiesService } from "@ngx-utils/cookies/src/cookies.service";

@Injectable({
  providedIn: "root",
})
export class UserFlowDetails {
  public userObject: object = {};
  expiry: string;
  expiryDate: { year: number; month: number; day: number };
  insuranceObject: object = {};
  insurancePlanObject: object = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookies: CookiesService
  ) { }

  setExpiry(rememberMe: boolean) {
    if (rememberMe) {
      const current = new Date();
      current.setDate(current.getDate() + 60);
      this.expiryDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate(),
      };
    } else {
      const current = new Date();
      current.setDate(current.getDate() + 15);
      this.expiryDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate(),
      };
    }

    if (this.expiryDate.month < 10 && this.expiryDate.day < 10) {
      this.expiry =
        "0" +
        this.expiryDate.month +
        ".0" +
        this.expiryDate.day +
        "." +
        this.expiryDate.year;
    } else if (this.expiryDate.day < 10) {
      this.expiry =
        this.expiryDate.month +
        ".0" +
        this.expiryDate.day +
        "." +
        this.expiryDate.year;
    } else if (this.expiryDate.month < 10) {
      this.expiry =
        "0" +
        this.expiryDate.month +
        "." +
        this.expiryDate.day +
        "." +
        this.expiryDate.year;
    } else {
      this.expiry =
        this.expiryDate.month +
        "." +
        this.expiryDate.day +
        "." +
        this.expiryDate.year;
    }
  }

  setUserFlowDetails(name: string, value: string) {
    this.userObject[name] = value;

    // console.log(this.userObject)

    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("userFlowDetails", JSON.stringify(this.userObject), {
        expires: this.expiry,
      });
    }
  }

  setInsuranceDetails(name: string, value: string) {
    this.insuranceObject[name] = value;

    // console.log(this.insuranceObject);


    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("insuranceDetails", JSON.stringify(this.insuranceObject), {
        expires: this.expiry,
      });
    }
  }

  setInsurancePlan(name: string, value: string) {
    this.insurancePlanObject[name] = value;

    // console.log(this.insurancePlanObject);


    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("insurancePlanDetails", JSON.stringify(this.insurancePlanObject), {
        expires: this.expiry,
      });
    }
  }

  setB2BUserFlowDetails(name: string, value: string) {
    this.userObject[name] = value;

    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("b2bUserFlowDetails", JSON.stringify(this.userObject));
    }
  }

  setUserFlowDetailsObject(name: string, value: object) {
    this.userObject[name] = value;
    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("userFlowDetails", JSON.stringify(this.userObject), {
        expires: this.expiry,
      });
    }
  }

  setUserProfile(value: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("profile", JSON.stringify(value), {
        expires: this.expiry,
      });
    }
  }

  getUserProfile() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(this.cookies.get("userDetails"));
    }
  }

  getUserFlowDetails() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(this.cookies.get("userFlowDetails"));
    }
  }

  getInsuranceDetails() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(this.cookies.get("insuranceDetails"));
    }
  }

  getInsurancePlanDetails() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(this.cookies.get("insurancePlanDetails"));
    }
  }

  getB2BUserFlowDetails() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(this.cookies.get("b2bUserFlowDetails"));
    }
  }

  setCookie(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put(key, value, {
        expires: this.expiry,
      });
    }
  }

  getCookie(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookies.get(key);
    }
  }

  setLocalStorage(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  getLocalStorage(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
  }

  getBaseURL() {
    return "https://test.visa2fly.com/api/";
  }
}
