import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { SignupService } from "./signup.service";
import { SignupResponseModel } from "./SignupResponse.model";
import { HttpParams } from "@angular/common/http";
// import { ToastService } from 'src/app/shared/toast.service';
import { Router } from "@angular/router";
import { RouterHistory } from "src/app/shared/router-history.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { LoginService } from "../login/login.service";
import { ToastrService } from "ngx-toastr";
import { LoginStatusService } from "src/app/shared/login-status.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  showOtpFields: boolean = false;
  signupForm: FormGroup;
  showSendOtpButton: boolean = true;
  formSubmitted = false;
  otpSentCount: number = 0;
  showLoader: boolean = false;
  showAlert: boolean = false;
  otpFormSubmitted: boolean = false;
  showSignUpButton: boolean = false;
  prevRoute = "";
  displayButton: boolean = false;

  constructor(
    private singUpService: SignupService,
    // private toastService: ToastService,
    private router: Router,
    private toastr: ToastrService,
    private routerHistory: RouterHistory,
    private userFlowService: UserFlowDetails,
    private reqService: RequirementsService,
    private loginService: LoginService,
    private loginStatus: LoginStatusService
  ) {}

  onKeyPress(event: any) {
    this.createUser();
  }

  onKeyPress1(event: any) {
    this.onSubmit();
  }

  ngOnInit() {
    this.prevRoute = this.routerHistory.getPrevRoute();
    // console.log(this.prevRoute);

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]),

      mobile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      otp: new FormControl(null, [Validators.required]),
      tnc: new FormControl(false)
    });

    //   setTimeout(function() {
    //     $(".alert").fadeTo(500, 0).slideUp(500, function(){
    //         (<any>$(this)).remove();
    //     });
    // }, 2000);
  }

  createUser() {
    // console.log(this.signupForm.value);

    let reqBody = {
      emailId: "",
      firstName: "",
      lastName: "",
      cell: "",
      otp: "",
      acceptedTOC: ""
    };
    this.showSignUpButton = false;
    this.showLoader = true;
    reqBody.emailId = this.signupForm.get("email").value;
    reqBody.firstName = this.signupForm.get("firstName").value;
    reqBody.lastName = this.signupForm.get("lastName").value;
    reqBody.cell = this.signupForm.get("mobile").value;
    reqBody.otp = this.signupForm.get("otp").value;
    reqBody.acceptedTOC = this.signupForm.get("tnc").value;

    // console.log(reqBody);

    this.singUpService.createUser(reqBody).subscribe((data: any) => {
      // console.log(data);
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
        // this.setFormFresh();
        this.showLoader = false;
        this.showSignUpButton = true;
        this.router.navigate(["slcontainer", "signup"]);
      }
    });
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
      tnc: false
    });
    this.showLoader = false;
    this.showSignUpButton = true;
    //this.showSendOtpButton = true;
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
      tnc: false
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
    // this.showLoader = true;
    this.showSendOtpButton = false;
    // this.signupForm.markAsPristine();
    // this.signupForm.markAsUntouched()
    this.signupForm.disable();
    this.signupForm.get("otp").enable();
    this.signupForm.get("tnc").enable();

    // console.log("submitted");
    let enteredMobile = this.signupForm.get("mobile").value;
    this.singUpService.getOtp(enteredMobile).subscribe(
      (data: SignupResponseModel) => {
        if (!data) {
          // console.log("req failed"+data);
          this.toastr.error("Something Went wrong");
          this.setFormFresh();
        } else {
          if (data.code == "0" /*|| data.code == "15" */) {
            // console.log(data);
            this.afterSuccessfullOtpSent();
            this.otpFormSubmitted = true;
          } else if (data.code == "309") {
            this.toastr.error(data.message.toString());
            // this.afterSuccessfullOtpSent();
            this.otpFormSubmitted = true;
          } else {
            this.toastr.error(data.message.toString());

            // this.setFormFresh();
          }
        }
      },

      err => {
        // console.log(err.toString()+ "*****");
        this.toastr.error(
          "Something went wrong ! Please try again after some time"
        );
        this.setFormFresh();
        // this.setFormFresh();
      }
    );
  }
}
