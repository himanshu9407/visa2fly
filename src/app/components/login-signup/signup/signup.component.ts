import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { SignupService } from "./signup.service";
import { SignupResponseModel } from "./SignupResponse.model";
import { Router } from "@angular/router";
import { RouterHistory } from "src/app/shared/router-history.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { LoginService } from "../login/login.service";
import { ToastrService } from "ngx-toastr";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  showOtpFields: boolean = false;
  signupForm: FormGroup;
  formSubmitted = false;
  otpSentCount: number = 0;
  showLoader: boolean = false;
  showAlert: boolean = false;
  otpFormSubmitted: boolean = false;
  showSendOtpButton: boolean = true;
  showSignUpButton: boolean = false;
  showRotatingLoader: boolean = false;
  prevRoute = "";
  displayButton: boolean = false;
  changeNumber: boolean = false;
  showOtpBox: boolean = false;

  constructor(
    private singUpService: SignupService,
    private router: Router,
    private toastr: ToastrService,
    private routerHistory: RouterHistory,
    private userFlowService: UserFlowDetails,
    private reqService: RequirementsService,
    private loginService: LoginService,
    private loginStatus: LoginStatusService,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Visa2fly | SignUp");
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: "",
      },
    ]);
    this.prevRoute = this.routerHistory.getPrevRoute();
    // console.log(this.prevRoute);

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      digit1: new FormControl("", [
        Validators.required,
        Validators.maxLength(1),
      ]),
      digit2: new FormControl("", [
        Validators.required,
        Validators.maxLength(1),
      ]),
      digit3: new FormControl("", [
        Validators.required,
        Validators.maxLength(1),
      ]),
      digit4: new FormControl("", [
        Validators.required,
        Validators.maxLength(1),
      ]),
      digit5: new FormControl("", [
        Validators.required,
        Validators.maxLength(1),
      ]),
      digit6: new FormControl("", [
        Validators.required,
        Validators.maxLength(1),
      ]),
      tnc: new FormControl(false),
    });
  }

  createUser() {
    if (
      this.signupForm.get("digit1").invalid ||
      this.signupForm.get("digit2").invalid ||
      this.signupForm.get("digit3").invalid ||
      this.signupForm.get("digit4").invalid ||
      this.signupForm.get("digit5").invalid ||
      this.signupForm.get("digit6").invalid
    ) {
      this.toastr.error("Enter valid OTP");
    } else {
      this.showSignUpButton = false;
      this.showSendOtpButton = false;
      this.showRotatingLoader = true;

      let reqBody = {
        emailId: "",
        firstName: "",
        lastName: "",
        cell: "",
        otp: "",
        acceptedTOC: "",
      };
      this.showLoader = true;
      reqBody.emailId = this.signupForm.get("email").value;
      reqBody.firstName = this.signupForm.get("firstName").value;
      reqBody.lastName = this.signupForm.get("lastName").value;
      reqBody.cell = this.signupForm.get("mobile").value;
      reqBody.otp = this.signupForm.get("otp").value;
      reqBody.acceptedTOC = this.signupForm.get("tnc").value;

      console.log(reqBody);

      this.singUpService.createUser(reqBody).subscribe((data: any) => {
        if (!data) {
          this.toastr.error("Something Went wrong");
          this.setFormFresh();
        } else if (data.code == "0") {
          this.loginService.setAuthToken(data.data.authentication.token);
          this.loginService.setUserStatus(true);
          this.loginStatus.setUserStatus(true);
          this.loginStatus.setUserLoggedIn(true);
          this.userFlowService.setUserProfile(data.data.profile);
          this.loginStatus.setUserProfile(data.data.profile);
          this.changeNumber = false;
          // this.router.navigate(['slcontainer/login']);
          if (this.prevRoute == "req") {
            this.routerHistory.clearRouteHistory();
            this.router.navigate(["addTraveller"]);
          } else if (this.prevRoute == "req-and-quote") {
            let quoteId = this.userFlowService.getUserFlowDetails().quoteId;

            this.reqService.verifyQuotation(quoteId).subscribe((data: any) => {
              if (data.code == "0") {
                this.router.navigate(["addTraveller"]);
              } else {
                this.router.navigate(["visa"]);
              }
            });
          } else if (this.prevRoute == "fail-login-sim") {
            this.router.navigate(["/sim/checkout"]);

            this.toastr.error(data.message.toString());
          } else {
            this.toastr.error(data.message.toString());
            this.router.navigate(["visa"]);
          }
        } else {
          this.toastr.error(data.message.toString());
          this.showRotatingLoader = false;
          this.showLoader = false;
          this.showSignUpButton = true;
        }
      });
    }
  }

  setFormFresh() {
    this.signupForm.markAsPristine();
    this.signupForm.markAsUntouched();
    this.signupForm.enable();
    this.signupForm.setValue({
      email: "",
      mobile: "",
      otp: "",
      firstName: "",
      lastName: "",
      tnc: false,
    });
    this.showLoader = false;
    this.showSignUpButton = true;
  }

  showAlertMessage() {
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }

  afterSuccessfullOtpSent() {
    this.signupForm.get("firstName").disable();
    this.signupForm.get("lastName").disable();
    this.signupForm.get("email").disable();
    this.signupForm.get("mobile").disable();
    this.otpSentCount++;
    this.displayButton = true;
    this.showOtpFields = true;
    this.showSignUpButton = true;
    this.showRotatingLoader = false;
    this.showSendOtpButton = false;
    this.changeNumber = true;
    this.showLoader = false;
    this.showOtpBox = true;
    this.showAlertMessage();
  }

  resetDetails() {
    this.signupForm.markAsPristine();
    this.signupForm.markAsUntouched();
    this.signupForm.enable();
    this.signupForm.setValue({
      email: "",
      mobile: "",
      firstName: "",
      lastName: "",
      tnc: false,
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    });
    this.showLoader = false;
    this.displayButton = false;
    this.showLoader = false;
    this.showOtpFields = false;
    this.showSendOtpButton = true;
    this.showSignUpButton = false;
    this.showAlert = false;
  }

  onSubmit() {
    if (
      this.signupForm.get("firstName").invalid ||
      this.signupForm.get("lastName").invalid ||
      this.signupForm.get("mobile").invalid ||
      this.signupForm.get("email").invalid
    ) {
      this.toastr.error("Kindly Enter Valid Details");
    } else if (this.signupForm.get("tnc").value == false) {
      this.toastr.error("Please accept terms and condition.");
    } else {
      let enteredMobile = this.signupForm.get("mobile").value;
      this.showSignUpButton = false;
      this.showSendOtpButton = false;
      this.showRotatingLoader = true;

      this.singUpService.getOtp(enteredMobile).subscribe(
        (data: SignupResponseModel) => {
          if (!data) {
            this.toastr.error("Something Went wrong");
            this.setFormFresh();
          } else {
            if (data.code == "0") {
              this.afterSuccessfullOtpSent();
            } else if (data.code == "309") {
              this.toastr.error(data.message.toString());
              this.showSignUpButton = false;
              this.showRotatingLoader = false;
              this.showSendOtpButton = true;
              this.changeNumber = false;
            } else {
              this.showSignUpButton = false;
              this.showRotatingLoader = false;
              this.showSendOtpButton = true;
              this.toastr.error(data.message.toString());
            }
          }
        },
        (err) => {
          this.toastr.error(
            "Something went wrong ! Please try again after some time"
          );
          this.setFormFresh();
        }
      );
    }
  }

  changeUserNumber() {
    this.resetDetails();
    this.showSendOtpButton = true;
    this.showSignUpButton = false;
    this.showOtpFields = false;
    this.showOtpBox = false;
    this.signupForm.enable();
  }

  signUpDetail(event: any) {
    if (
      this.signupForm.get("email").valid ||
      this.signupForm.get("firstName").valid ||
      this.signupForm.get("lastName").valid ||
      this.signupForm.get("mobile").valid
    ) {
      this.onSubmit();
    }
  }

  onOTPPress(event: any) {
    if (
      this.signupForm.get("digit1").valid ||
      this.signupForm.get("digit2").valid ||
      this.signupForm.get("digit3").valid ||
      this.signupForm.get("digit4").valid ||
      this.signupForm.get("digit5").valid ||
      this.signupForm.get("digit6").valid
    ) {
      this.createUser();
    }
  }
}
