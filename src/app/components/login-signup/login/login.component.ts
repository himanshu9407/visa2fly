import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { GetIPService } from 'src/app/shared/getIP.service';
import { LoginResponseModel } from './loginResponse.model';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { RouterHistory } from 'src/app/shared/router-history.service';
import { RequirementsService } from '../../requirements/requirements.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
  
  otpSentCount : number = 0;
  loginForm : FormGroup;
  showLoader : boolean = false;
  showLoginButton : boolean = false;
  ipAddress : string = "";
  showOtpField  : boolean = false;
  showSendOtp : boolean = true;
  showAlert: boolean = false;
  prevRoute = "";

  constructor( private loginService : LoginService,
    private getIP : GetIPService, private toastService : ToastService,
    private router : Router, private userFlowService : UserFlowDetails,
    private loginStatus : LoginStatusService, private routerHistory : RouterHistory,
    private reqService : RequirementsService) { }

  ngOnInit() {


    this.prevRoute = this.routerHistory.getPrevRoute();
   

    this.loginForm = new FormGroup ({
        'userId' : new FormControl (null,[Validators.required]),
        'otp': new FormControl(null,[Validators.required]),
        'rememberMe': new FormControl (false)
    });

  }

  checkUserId ()  {
    let ifEmail = false;
    let ifMobile = false;
    let emailRegex = new RegExp("[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?");
    let mobileRegex = new RegExp("^[4-9][0-9]{9}$");

    let userId = this.loginForm.get("userId").value;
    if ( emailRegex.test(userId)) {
      ifEmail = true;
    }

    else if (mobileRegex.test(userId)) {
      ifMobile = true;
    }

    return {email :ifEmail, mobile : ifMobile};

  }

  setFormFresh () {
    this.showOtpField = false;
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.enable();
    this.loginForm.setValue({userId : "", otp : "",rememberMe : false});
    this.showLoader = false;
    this.showLoginButton = false;
  }
 

  sendOtp() {
    this.showLoader = true;
    this.showSendOtp = false;
    // this.showOtpField  =true;
    let userId = this.loginForm.get('userId').value;
    console.log(userId);
    this.loginService.sendLoginOtp(userId).subscribe(
      (data) => {
        if(!data) {
              this.toastService.showNotification("Something Went wrong! Please try again later.",4000);
              this.setFormFresh();
        }

        else if (data.code == "0") {
          this.showLoader = false;
          this.showLoginButton = true;
          this.showAlertMessage();
          this.loginForm.get('userId').disable();
          this.showOtpField = true;
          this.otpSentCount = this.otpSentCount+1;
        }
        else {
          this.toastService.showNotification(data.message,4000);
          this.setFormFresh();
          this.showSendOtp = true;

        }
      }
    );
  }

  showAlertMessage () {

    this.showAlert = true;

    setTimeout ( () => {
      this.showAlert = false;
    },4000)
  }

  onSubmit() {
    this.showLoader = true;
    this.showLoginButton = false;
    let userId = this.loginForm.get("userId").value;
    let otp = this.loginForm.get('otp').value;
    let rememberMe = this.loginForm.get('rememberMe').value;
    let temp = this.checkUserId();
    console.log(this.loginForm.value);

    this.getIP.getClientIP().subscribe (
      (data1 : {ip:string}) => {
        // console.log(data1  );
        this.ipAddress = data1.ip;
        this.loginService.loginUser(userId,otp,rememberMe,this.ipAddress,temp).subscribe (
          (data : LoginResponseModel) => {
            // console.log(data);

            if (!data) {
              console.log("req failed"+data);
              this.toastService.showNotification("Something Went wrong! Please try again later.",4000);
              this.setFormFresh();

            }
            else {
              if (data.code == "0") {
                //console.log(data);
                this.loginService.setAuthToken(data.data.authentication.token);
                // this.toastService.showNotification(data.message,4000);
                this.loginService.setUserStatus(true);
                this.loginStatus.setUserStatus(true);
                this.loginStatus.setUserLoggedIn(true);
                this.userFlowService.setUserProfile(data.data.profile);
                this.loginStatus.setUserProfile(data.data.profile);
                // window.location.reload();
                if(this.prevRoute == "req") {
                  this.routerHistory.clearRouteHistory();
                  this.router.navigate(['addTraveller']);
                }
                else if (this.prevRoute == "req-and-quote") {
                  let quoteId = this.userFlowService.getUserFlowDetails().quoteId;
                  
                  this.reqService.verifyQuotation(quoteId).subscribe(
                    (data : any) => {
                      if (data.code == "0") {
                        this.router.navigate(['addTraveller']);

                      }
                      else {
                        this.router.navigate(['visa']);
                      }
                    }
                  )
                }
                else if (this.prevRoute == "fail-login-sim") {
                  this.router.navigate(['/sim/checkout']);

                }
                else {

                  this.router.navigate(['']);
                }

              }
              else {
                // console.log(data);
                this.toastService.showNotification(data.message,4000);
                this.setFormFresh();
                this.showSendOtp = true;
                this.loginService.setUserStatus(false);
                this.loginStatus.setUserStatus(false);
              }
            }
          },
          (err) => console.log(err)
        )
      },
      (err) => {
        this.toastService.showNotification("Something went wrong! Please try again later.",4000);
      }

    );









  }




}
