import { Component, OnInit } from "@angular/core";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../login-signup/login/login.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProfileService } from "./profile.service";
import { Title, Meta } from '@angular/platform-browser';
// import { ToastService } from "src/app/shared/toast.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  profile: any = { emailId: "", firstName: "" };
  mindate: any = "";
  profileForm: FormGroup;
  hidedata: any;
  constructor(
    private loginStatusService: LoginStatusService,
    private loginService: LoginService,
    private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService,
    private router: Router,
private profleService: ProfileService,
private toastr: ToastrService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.preloaderService.showPreloader(true);
    let AUTH_TOKEN = this.loginService.getAuthToken();
    if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
      AUTH_TOKEN = "";
    }

    this.profileForm = new FormGroup({
      title: new FormControl(this.profile.title || "Mr", []),
      firstName: new FormControl(this.profile.firstName || "abc", [
        Validators.required
      ]),
      middleName: new FormControl(this.profile.middleName, [
        Validators.nullValidator
      ]),
      lastName: new FormControl(this.profile.firstName, [Validators.required]),
      addressLine1: new FormControl(this.profile.addressLine1, []),
      addressLine2: new FormControl(this.profile.addressLine2, []),
      state: new FormControl(this.profile.state || "Haryana", []),
      city: new FormControl(this.profile.city || "", []),
      pinCode: new FormControl(this.profile.pinCode, []),
      passportNumber: new FormControl(this.profile.passportNumber, []),
      passportExpiryDate: new FormControl("", [])
    });

    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 4000);

    this.loginStatusService
      .verifyAuthToken(AUTH_TOKEN)
      .subscribe((data: any) => {
        if (data.code == "0") {
          this.profile = data.data.profile;
          // console.log(this.profile.firstName);

          this.profileForm.setValue({
            title: this.profile.title,
            firstName: this.profile.firstName,
            middleName: this.profile.middleName,
            lastName: this.profile.lastName,
            addressLine1: this.profile.addressLine1,
            addressLine2: this.profile.addressLine2,
            state: this.profile.state,
            city: this.profile.city,
            pinCode: this.profile.pinCode,
            passportNumber: this.profile.passportNumber,
            passportExpiryDate: this.profile.passportExpiryDate
          });

          this.profileForm.updateValueAndValidity();

          if (this.profile.pinCode == "0") {
            this.profileForm.get("pinCode").setValidators(null);
            this.profileForm.get("pinCode").updateValueAndValidity();
            this.profileForm.updateValueAndValidity();
          }

          // setTimeout(() => {
          //   this.preloaderService.showPreloader(false);
          // }, 2000);
        } else {
          this.router.navigate(["visa"]);
          // this.preloaderService.showPreloader(false);
        }

        // setTimeout(() => {
        //   this.preloaderService.showPreloader(false);
        // }, 2000);
      });

    // console.log("hello worold");
  }

  ngOnInit() {
    this.titleService.setTitle("Visa2fly | Profile");
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      },
      // { name: "author", content: "rsgitech" },
      // { name: "robots", content: "index, follow" }
    ]);

    const current = new Date();
    this.mindate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  submitProfileData() {
    let tempDoe = "";
    let doe: {
      year: number;
      month: number;
      day: number;
    } = this.profileForm.get("passportExpiryDate").value;
    if (doe == undefined || doe == null) {
    } else {
      if (doe.month < 10 && doe.day < 10) {
        tempDoe = doe.year + "-0" + doe.month + "-0" + doe.day;
      } else if (doe.day < 10) {
        tempDoe = doe.year + "-" + doe.month + "-0" + doe.day;
      } else if (doe.month < 10) {
        tempDoe = doe.year + "-0" + doe.month + "-" + doe.day;
      } else {
        tempDoe = doe.year + "-" + doe.month + "-" + doe.day;
      }

      this.profileForm.get("passportExpiryDate").setValue(tempDoe);
    }

    let reqData = this.profileForm.value;

    this.profleService.updateProfile(reqData).subscribe((data: any) => {
      if (data.code == "0") {
        // console.log(data);
        this.toastr.success(data.message);
        this.router.navigate(["profile"]);
      } else {
        // console.log(data);
        this.toastr.error(data.message);
      }
    });
  }
}
