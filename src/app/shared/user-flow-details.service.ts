import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { CookiesService } from "@ngx-utils/cookies/src/cookies.service";

@Injectable({
  providedIn: "root",
})
export class UserFlowDetails {
  public userObject: object = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookies: CookiesService
  ) {}

  setUserFlowDetails(name: string, value: string) {
    this.userObject[name] = value;

    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("userFlowDetails", JSON.stringify(this.userObject));
    }

    // console.log(this.userObject);
  }

  setB2BUserFlowDetails(name: string, value: string) {
    this.userObject[name] = value;

    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put(
        "b2bUserFlowDetails",
        JSON.stringify(this.userObject)
      );
    }

    // console.log(this.userObject);
  }

  setUserFlowDetailsObject(name: string, value: object) {
    this.userObject[name] = value;
    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("userFlowDetails", JSON.stringify(this.userObject));
    }
  }

  setUserProfile(value: object) {
    // console.log(value);
    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put("profile", JSON.stringify(value));
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

  getB2BUserFlowDetails() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(this.cookies.get("b2bUserFlowDetails"));
    }
  }

  setCookie(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.cookies.put(key, value);
    }
  }

  getCookie(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookies.get(key);
    }
  }

  getBaseURL() {
    return "https://test.visa2fly.com/api/";
  }
}
