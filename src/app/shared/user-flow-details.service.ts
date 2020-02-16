import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class UserFlowDetails {
  public userObject: object = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setUserFlowDetails(name: string, value: string) {
    this.userObject[name] = value;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("userFlowDetails", JSON.stringify(this.userObject));
    }

    // console.log(this.userObject);
  }

  setB2BUserFlowDetails(name: string, value: string) {
    this.userObject[name] = value;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("b2bUserFlowDetails", JSON.stringify(this.userObject));
    }

    // console.log(this.userObject);
  }

  setUserFlowDetailsObject(name: string, value: object) {
    this.userObject[name] = value;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("userFlowDetails", JSON.stringify(this.userObject));
    }
  }

  setUserProfile(value: object) {
    // console.log(value);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("profile", JSON.stringify(value));
    }
  }

  getUserProfile() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem("userDetails"));
    }
  }

  getUserFlowDetails() {
    if (isPlatformBrowser(this.platformId)) {
        return JSON.parse(localStorage.getItem("userFlowDetails"));
      }
    }

    getB2BUserFlowDetails() {
        if (isPlatformBrowser(this.platformId)) {
            return JSON.parse(localStorage.getItem("b2bUserFlowDetails"));
          }
        }

  getBaseURL() {
    return "https://test.visa2fly.com/api/";
  }
}
