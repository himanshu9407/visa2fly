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
      otp: new FormGroup({
        digit1: new FormControl('1', [
          Validators.required,
          Validators.maxLength(1),
        ]),
        digit2: new FormControl('2', [
          Validators.required,
          Validators.maxLength(1),
        ]),
        digit3: new FormControl('3', [
          Validators.required,
          Validators.maxLength(1),
        ]),
        digit4: new FormControl('4', [
          Validators.required,
          Validators.maxLength(1),
        ]),
        digit5: new FormControl('5', [
          Validators.required,
          Validators.maxLength(1),
        ]),
        digit6: new FormControl('6', [
          Validators.required,
          Validators.maxLength(1),
        ]),
      }),
      // otp: new FormControl(null, [Validators.required]),
      tnc: new FormControl(false),
    });
  }

  createUser() {
    console.log("createUser");

    if (
      (this.signupForm.get("otp").invalid &&
        this.signupForm.get("otp").dirty) ||
      this.signupForm.get("otp").pristine
    ) {
      this.toastr.error("Enter valid OTP");
    } else if (this.signupForm.get("tnc").value == false) {
      this.toastr.error("Please accept terms and condition.");
    }
    else {
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
    this.showAlertMessage();
  }

  resetDetails() {
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
    this.displayButton = false;
    this.showLoader = false;
    this.showOtpFields = false;
    this.showSendOtpButton = true;
    this.showSignUpButton = false;
    this.showAlert = false;
  }

  onSubmit() {
    console.log("onSubmit");
    
    if (
      (this.signupForm.get("mobile").invalid &&
        this.signupForm.get("mobile").dirty) ||
      (this.signupForm.get("email").invalid &&
        this.signupForm.get("email").dirty) ||
      this.signupForm.get("email").pristine ||
      this.signupForm.get("mobile").pristine
    ) {
      this.toastr.error("Kindly Enter Valid Details");
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
    this.signupForm.enable();
  }
}
