import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { GetIPService } from 'src/app/shared/getIP.service';
import { LoginResponseModel } from './loginResponse.model';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { LoginStatusService } from 'src/app/shared/login-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm : FormGroup;
    showLoader : boolean = false;
    showLoginButton : boolean = true;
    ipAddress : string = "";
  constructor( private loginService : LoginService,
    private getIP : GetIPService, private toastService : ToastService,
    private router : Router,
    private loginStatus : LoginStatusService) { }

  ngOnInit() {

    this.loginForm = new FormGroup ({
        'userId' : new FormControl (null,[Validators.required]),
        'password': new FormControl(null,[Validators.required]),
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
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
    this.loginForm.setValue({userId : "", password : "",rememberMe : false});
    this.showLoader = false;
    this.showLoginButton = true;
  }
  
  onSubmit() {
    this.showLoader = true;
    this.showLoginButton = false;
    let userId = this.loginForm.get("userId").value;
    let password = this.loginForm.get('password').value;
    let rememberMe = this.loginForm.get('rememberMe').value;
    let temp = this.checkUserId();
    console.log(this.loginForm.value);
    
    // console.log(result.then);
    this.getIP.getClientIP().subscribe (
      (data1 : {ip:string}) => {
        console.log(data1);
        this.ipAddress = data1.ip;
        this.loginService.loginUser(userId,password,rememberMe,this.ipAddress,temp).subscribe (
          (data : LoginResponseModel) => {
            console.log(data);
            
            if (!data) {
              console.log("req failed"+data);
              this.toastService.showNotification("Something Went wrong! Please try again later.",4000);
              this.setFormFresh();
  
            }
            else {
              if (data.code == "0") {
                console.log(data);
                this.loginService.setAuthToken(data.data.authentication.token);
                this.toastService.showNotification(data.message,4000);
                this.router.navigate(['home']);
                this.loginService.setUserStatus(true);
                this.loginStatus.setUserStatus(true);
  
              }
              else {
                console.log(data);
                this.toastService.showNotification(data.message,4000);
                this.setFormFresh();
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