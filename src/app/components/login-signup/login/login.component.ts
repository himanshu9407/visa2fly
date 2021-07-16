import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { LoginService } from "./login.service";
import { GetIPService } from "src/app/shared/getIP.service";
import { LoginResponseModel } from "./loginResponse.model";
// import { ToastService } from "src/app/shared/toast.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { Meta, Title } from "@angular/platform-browser";
import { Subscriber, Subscription, timer } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  otpSentCount: number = 0;
  loginForm: FormGroup;
  showLoader: boolean = false;
  showLoginButton: boolean = false;
  ipAddress: string = "";
  showOtpField: boolean = false;
  showSendOtp: boolean = true;
  showAlert: boolean = false;
  prevRoute = "";
  changeNumber: boolean = false;
  credentialError:boolean = false;
  showOtpBox: boolean = false;
  // showSendOtpButton: boolean = true;
  showSignUpButton: boolean = false;
  showRotatingLoader: boolean = false;
  disableResend: boolean = true;

  countDown: Subscription;
  counter = 60;
  tick = 1000;
  resendBtnText: string = "Resend OTP";

  deskstopField: boolean = false;
  mobileField: boolean = false;
  allErrorDisplayValue: any;
  allOtpRelatedError: any;
  inputFieldError: boolean = false;

  constructor(
    private loginService: LoginService,
    private getIP: GetIPService,
    // private toastService: ToastService,
    private router: Router,
    private toastr: ToastrService,
    private userFlowService: UserFlowDetails,
    private loginStatus: LoginStatusService,
    private routerHistory: RouterHistory,

    private titleService: Title,
    private meta: Meta,
    private reqService: RequirementsService
  ) {}

  onUserPress() {
    $(".send_otpButton").addClass("activateOnError");
    if (this.loginForm.get("userId").valid) {
      this.sendOtp();
    }
  }

  onOTPPress() {
    if (this.loginForm.get("otp").valid) {
      this.onSubmit();
    }
  }

  ngOnInit() {
    this.titleService.setTitle("Visa2fly | Login");
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: "",
      },
    ]);

    this.prevRoute = this.routerHistory.getPrevRoute();

    this.loginForm = new FormGroup({
      userId: new FormControl(null, [Validators.required]),
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
      // otp: new FormControl({ value: null, disabled: !this.showOtpField }, [
      //   Validators.required,
      // ]),
      // rememberMe: new FormControl(false),
    });

    $(function () {
      $(".box").on("keyup", function (e) {
        var $input = $(this);
        if ((<any>$input.val()).length == 0 && e.which == 8) {
          $input.toggleClass("productkey2 productkey1").prev(".box").focus();
          $("#digit1").removeClass("errorForOtp");
          $("#digit1").removeClass("is-invalid-new");
          // this.loginForm.get("digit2").reset();
          $("#digit2").removeClass("errorForOtp");
          $("#digit2").removeClass("is-invalid-new");
          // this.loginForm.get("digit3").reset();
          $("#digit3").removeClass("errorForOtp");
          $("#digit3").removeClass("is-invalid-new");
          // this.loginForm.get("digit4").reset();
          $("#digit4").removeClass("errorForOtp");
          $("#digit4").removeClass("is-invalid-new");
          // this.loginForm.get("digit5").reset();
          $("#digit5").removeClass("errorForOtp");
          $("#digit5").removeClass("is-invalid-new");
          // this.loginForm.get("digit6").reset();
          $("#digit6").removeClass("errorForOtp");
          $("#digit6").removeClass("is-invalid-new");
        } else if (
          (<any>$input.val()).length >= parseInt($input.attr("maxlength"), 10)
        ) {
          $input.toggleClass("productkey1 productkey2").next(".box").focus();
          $("#digit1").removeClass("errorForOtp");
          // this.loginForm.get("digit2").reset();
          $("#digit2").removeClass("errorForOtp");
          // this.loginForm.get("digit3").reset();
          $("#digit3").removeClass("errorForOtp");
          // this.loginForm.get("digit4").reset();
          $("#digit4").removeClass("errorForOtp");
          // this.loginForm.get("digit5").reset();
          $("#digit5").removeClass("errorForOtp");
          // this.loginForm.get("digit6").reset();
          $("#digit6").removeClass("errorForOtp");
        }
      });
    });

    // if (
    //   this.loginForm.get("userId").valid ||
    //   this.loginForm.get("userId").value !== null
    // ) {
    //   this.loginForm.get("otp").enable();
    // } else {
    //   this.loginForm.get("otp").disable();
    // }
  }

  checkUserId() {
    let ifEmail = false;
    let ifMobile = false;
    let emailRegex = new RegExp(
      "[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(.[-a-zA-Z0-9_]+)*.([cC][oO][mM]))(:[0-9]{1,5})?"
    );
    let mobileRegex = new RegExp("^[4-9][0-9]{9}$");

    let userId = this.loginForm.get("userId").value;
    if (emailRegex.test(userId)) {
      // test()..??
      ifEmail = true;
    } else if (mobileRegex.test(userId)) {
      ifMobile = true;
    }

    return { email: ifEmail, mobile: ifMobile };
  }

  setFormFresh() {
    this.showOtpField = false;
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.enable();
    this.loginForm.setValue(
      { userId: "",
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
        digit5:"",
        digit6:"" }
      );
    this.showLoader = false;
    this.showLoginButton = false;
  }

  resendDetails () {
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.enable();
    this.loginForm.setValue(
      { userId: "",
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
        digit5:"",
        digit6:"" }
      );
     this.showSendOtp = true;
    //  this.inputFieldError = false;
     this.showLoginButton = false;
  }

  setFormForUser() {
    this.showOtpField = false;
    this.loginForm.enable();
    this.showLoader = false;
    // this.loginForm.get('userId').enable();
    // this.loginForm.get('otp').disable();
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.setValue(
      { userId: "",
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
        digit5:"",
        digit6:"" }
      );
    this.showLoginButton = true;
    this.showSendOtp = true;
    this.showLoginButton = false;
  }

  afterSuccessfullOtpSend() {
    this.loginForm.get('userId').disable();
    this.otpSentCount++;
    this.showLoginButton = true;
    this.showRotatingLoader = false;
    this.showSendOtp = false;
    this.changeNumber = true;
    this.showOtpBox = true;
  }

  counterFunc() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter === 0) {
        this.countDown.unsubscribe();
        this.resendBtnText = "Resend OTP";
        this.disableResend = false;
        return;
      } else {
        this.resendBtnText = "Resend in " + this.counter + "s";
        --this.counter;
      }
    });
  }


  sendOtp() {
    if(this.loginForm.get("userId").value === null || this.loginForm.get("userId").value === undefined)
    {
      this.credentialError = true;
      this.allErrorDisplayValue = "Kindly Enter Your Email/Mobile Number";
      $(".send_otpButton").removeClass("activateOnError");
    } else if (
      (this.loginForm.get("userId").invalid &&
        this.loginForm.get("userId").dirty) ||
        this.loginForm.get("userId").pristine
    ) {
      // console.log("Himanshu");
      this.inputFieldError = true;
      this.credentialError = false;
      $(".send_otpButton").addClass("activateOnError");
      // this.allErrorDisplayValue = "Kindly Enter Your Email/Mobile Number";
      // this.toastr.error("");
    } else {
      this.showRotatingLoader = true;
      this.showSendOtp = false;
      this.inputFieldError = false;
      let userId = this.loginForm.get("userId").value;
      this.loginService.sendLoginOtp(userId).subscribe((data) => {
        if (!data) {
          // this.toastr.error("Something Went wrong! Please try again later.");
          this.setFormFresh();
        } else if (data.code == "0") {
          this.afterSuccessfullOtpSend();
          $(".send_otpButton").removeClass("activateOnError");
          this.disableResend = true;
          $("#digit1").removeClass("errorForOtp");
          // this.loginForm.get("digit2").reset();
          $("#digit2").removeClass("errorForOtp");
          // this.loginForm.get("digit3").reset();
          $("#digit3").removeClass("errorForOtp");
          // this.loginForm.get("digit4").reset();
          $("#digit4").removeClass("errorForOtp");
          // this.loginForm.get("digit5").reset();
          $("#digit5").removeClass("errorForOtp");
          // this.loginForm.get("digit6").reset();
          $("#digit6").removeClass("errorForOtp");
          this.deskstopField = false;
          this.inputFieldError = false;
          this.allErrorDisplayValue = false;
          this.counter = 60;
          this.counterFunc();
        } else if(data.code === '309') {
          // this.toastr.error(data.message.toString());
          this.credentialError = true;
          this.allErrorDisplayValue = data.message;
          this.showLoginButton = false;
          this.showRotatingLoader = false;
          this.inputFieldError = false;
          $(".send_otpButton").addClass("activateOnError");
          this.showSendOtp = true;
          this.changeNumber = false;
        } else if(data.code === '312') {
          // this.toastr.error(data.message.toString());
          this.credentialError = true;
          this.inputFieldError = false;
          this.showRotatingLoader = false;
          $(".send_otpButton").addClass("activateOnError");
          this.allErrorDisplayValue = data.message;
          this.resendDetails();
          this.showOtpBox = false;
        } else {
          // this.toastr.error(data.message.toString());
          this.credentialError = true;
          $(".send_otpButton").addClass("activateOnError");
          this.allErrorDisplayValue = data.message;
          this.showLoginButton = false;
          this.showRotatingLoader = false;
          this.showSendOtp = true;
        }
      }, (err) => {
        // this.toastr.error("Something went wrong.");
        this.credentialError = true;
        this.allErrorDisplayValue = err.message.toString();
        this.showLoginButton = false;
        this.showSendOtp = true;
        this.showRotatingLoader = false;
        this.setFormFresh();
      });
    }
  }

  changeUserNumber() {
    this.resendDetails();
    this.showSendOtp = true;
    this.showLoginButton = false;
    this.showRotatingLoader = false;
    $("#digit1").removeClass("errorForOtp");
    $("#digit2").removeClass("errorForOtp");
    $("#digit3").removeClass("errorForOtp");
    $("#digit4").removeClass("errorForOtp");
    $("#digit5").removeClass("errorForOtp");
    $("#digit6").removeClass("errorForOtp");
    this.credentialError = false;
    this.inputFieldError = false;
    this.showOtpField = false;
    this.deskstopField = false;
    this.showOtpBox = false;
    this.loginForm.enable();
  }

  showAlertMessage() {
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  validateNumber(event) {
    const keyCode = event.keyCode;
    this.deskstopField = false;
    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
      // this.loginForm.get("digit1").reset();

    }
  }

  // otpFieldFunction(){
  //   this.loginForm.get("digit1").invalid;
  //   this.loginForm.get("digit2").invalid;
  //   this.loginForm.get("digit3").invalid;
  //   this.loginForm.get("digit4").invalid;
  //   this.loginForm.get("digit5").invalid;
  //   this.loginForm.get("digit6").invalid;
  //   this.loginForm.setValue(
  //     { userId: "",
  //       digit1: "",
  //       digit2: "",
  //       digit3: "",
  //       digit4: "",
  //       digit5:"",
  //       digit6:"" }
  //     );
  // }

  onSubmit() {
      let digit1 = this.loginForm.get("digit1").value;
      let digit2 = this.loginForm.get("digit2").value;
      let digit3 = this.loginForm.get("digit3").value;
      let digit4 = this.loginForm.get("digit4").value;
      let digit5 = this.loginForm.get("digit5").value;
      let digit6 = this.loginForm.get("digit6").value;
    if (this.loginForm.get("digit1").invalid ||
        this.loginForm.get("digit2").invalid ||
        this.loginForm.get("digit3").invalid ||
        this.loginForm.get("digit4").invalid ||
        this.loginForm.get("digit5").invalid ||
        this.loginForm.get("digit6").invalid ) {
        this.deskstopField = true;
        this.allOtpRelatedError = "Enter valid OTP";
        // this.otpFieldFunction();
        // this.toastr.error("");
    } else {
        let digit1 = this.loginForm.get("digit1").value;
        let digit2 = this.loginForm.get("digit2").value;
        let digit3 = this.loginForm.get("digit3").value;
        let digit4 = this.loginForm.get("digit4").value;
        let digit5 = this.loginForm.get("digit5").value;
        let digit6 = this.loginForm.get("digit6").value;

        this.showLoader = true;
        this.showLoginButton = false;
        let userId = this.loginForm.get("userId").value;
        let otp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
        let rememberMe = true;
        // let otp = this.loginForm.get("otp").value;

        // let rememberMe = this.loginForm.get("rememberMe").value;
        let temp = this.checkUserId();

        this.userFlowService.setExpiry(true);

        this.getIP.getClientIP().subscribe(
          (data1: { ip: string }) => {
            this.ipAddress = data1.ip;
            this.loginService
              .loginUser(userId, otp, rememberMe, this.ipAddress, temp)
              .subscribe(
                (data: LoginResponseModel) => {

                  if (!data) {
                    // this.toastr.error(
                    //   ""
                    // );
                      this.allOtpRelatedError = "Something Went wrong! Please try again later.";
                      this.loginForm.get("digit1").reset();
                      $("#digit1").addClass("errorForOtp");
                      this.loginForm.get("digit2").reset();
                      $("#digit2").addClass("errorForOtp");
                      this.loginForm.get("digit3").reset();
                      $("#digit3").addClass("errorForOtp");
                      this.loginForm.get("digit4").reset();
                      $("#digit4").addClass("errorForOtp");
                      this.loginForm.get("digit5").reset();
                      $("#digit5").addClass("errorForOtp");
                      this.loginForm.get("digit6").reset();
                      $("#digit6").addClass("errorForOtp");
                  } else {
                    if (data.code == "0") {
                      this.loginService.setAuthToken(
                        data.data.authentication.token
                      );
                      this.loginService.setUserStatus(true);
                      this.loginStatus.setUserStatus(true);
                      this.loginStatus.setUserLoggedIn(true);
                      this.changeNumber = false;
                      this.userFlowService.setUserProfile(data.data.profile);
                      this.loginStatus.setUserProfile(data.data.profile);
                      // window.location.reload();
                      if (this.prevRoute == "req") {
                        this.routerHistory.clearRouteHistory();
                        this.router.navigate(["addTraveller"]);
                      } else if (this.prevRoute == "req-and-quote") {
                        // req-and-quotere use in req page
                        let quoteId = this.userFlowService.getUserFlowDetails()
                          .quoteId;

                        this.reqService
                          .verifyQuotation(quoteId)
                          .subscribe((data: any) => {
                            if (data.code == "0") {
                              this.router.navigate(["addTraveller"]);
                            } else {
                              this.router.navigate(["visa"]);
                            }
                          });
                      } else if (this.prevRoute == "insurance-form") {
                        this.router.navigate(["insurance/application-form"]);
                      } else if (this.prevRoute == "fail-login-sim") {
                        // fail-login-sim use in sim
                        this.router.navigate(["/sim/checkout"]);
                      } else {
                        this.router.navigate([""]);
                      }
                    } else {
                      // this.toastr.error(data.message);
                      this.showLoader = false;
                      // console.log('kjh');
                      this.deskstopField = true;
                      this.allOtpRelatedError = data.message;
                      this.loginForm.get("digit1").reset();
                      $("#digit1").addClass("errorForOtp");
                      this.loginForm.get("digit2").reset();
                      $("#digit2").addClass("errorForOtp");
                      this.loginForm.get("digit3").reset();
                      $("#digit3").addClass("errorForOtp");
                      this.loginForm.get("digit4").reset();
                      $("#digit4").addClass("errorForOtp");
                      this.loginForm.get("digit5").reset();
                      $("#digit5").addClass("errorForOtp");
                      this.loginForm.get("digit6").reset();
                      $("#digit6").addClass("errorForOtp");
                      this.showLoginButton = true;
                      // this.showOtpField = false;
                      this.otpSentCount = 0;
                      //this.showSendOtp = true;
                      //this.showLoginButton = true;
                      this.loginService.setUserStatus(false);
                      this.loginStatus.setUserStatus(false);
                    }
                  }
                }
              );
          },
          (err) => {
            this.toastr.error("Something went wrong! Please try again later.");
          }
        );
      }
  }
}
