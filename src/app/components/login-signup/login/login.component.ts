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
      otp: new FormControl({ value: null, disabled: !this.showOtpField }, [
        Validators.required,
      ]),
      rememberMe: new FormControl(false),
    });

    if (
      this.loginForm.get("userId").valid ||
      this.loginForm.get("userId").value !== null
    ) {
      this.loginForm.get("otp").enable();
    } else {
      this.loginForm.get("otp").disable();
    }
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
    this.loginForm.setValue({ userId: "", otp: "", rememberMe: false });
    this.showLoader = false;
    this.showLoginButton = false;
  }

  setFormForUser() {
    this.showOtpField = false;
    this.loginForm.enable();
    this.showLoader = false;
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.setValue({ userId: "", otp: "", rememberMe: false });
    this.showLoginButton = true;
    this.showSendOtp = true;
    this.showLoginButton = false;
  }

  // bringBack(){
  //   this.showLoader = true;
  //   this.showSendOtp = false;
  // }

  sendOtp() {
    if (
      (this.loginForm.get("userId").invalid &&
        this.loginForm.get("userId").dirty) ||
      this.loginForm.get("userId").pristine
    ) {
      this.toastr.error("Kindly Enter Your Email/Mobile Number");
    } else {
      this.showLoader = true;
      this.showSendOtp = false;
      this.loginForm.get("otp").enable();
      // this.showOtpField  =true;
      let userId = this.loginForm.get("userId").value;
      this.loginService.sendLoginOtp(userId).subscribe((data) => {
        if (!data) {
          this.toastr.error("Something Went wrong! Please try again later.");
          this.setFormFresh();
        } else if (data.code == "0") {
          this.showLoader = false;
          this.showLoginButton = true;
          this.showAlertMessage();
          this.loginForm.get("userId").disable();
          this.showOtpField = true;
          this.changeNumber = true;
          this.otpSentCount = this.otpSentCount + 1;
        } else {
          this.toastr.error(data.message);
          this.showLoader = false;
          //this.setFormFresh();
          this.showSendOtp = true;
        }
      }, (err) => {
        this.toastr.error("Something went wrong.");
        this.showLoader = false;
        this.showSendOtp = true;
      });
    }
  }

  changeUserNumber() {
    this.setFormForUser();
    // this.bringBack();
    this.changeNumber = false;
    this.showAlert = false;
  }

  showAlertMessage() {
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.toastr.error("Kindly Enter Valid Credentials");
    } else {
        this.showLoader = true;
        this.showLoginButton = false;
        let userId = this.loginForm.get("userId").value;
        let otp = this.loginForm.get("otp").value;
        let rememberMe = this.loginForm.get("rememberMe").value;
        let temp = this.checkUserId();
    
        this.userFlowService.setExpiry(rememberMe);
    
        this.getIP.getClientIP().subscribe(
          (data1: { ip: string }) => {
            this.ipAddress = data1.ip;
            this.loginService
              .loginUser(userId, otp, rememberMe, this.ipAddress, temp)
              .subscribe(
                (data: LoginResponseModel) => {
    
                  if (!data) {
                    this.toastr.error(
                      "Something Went wrong! Please try again later."
                    );
                    this.setFormFresh();
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
                      this.toastr.error(data.message);
                      this.showLoader = false;
                      console.log('kjh');
                      
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
