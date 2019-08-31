import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormControl } from '@angular/forms';
import { SignupService } from './signup.service';
import { SignupResponseModel } from './SignupResponse.model';
import { HttpParams } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showOtpFields : boolean = false;
  signupForm : FormGroup;
  showSendOtpButton : boolean = true;
  formSubmitted = false;
  otpSentCount : number = 0;
  showLoader : boolean = false;
  showAlert : boolean = false;
  otpFormSubmitted : boolean = false;
  showSignUpButton : boolean = false;



  constructor(private singUpService : SignupService, private toastService :ToastService,private router : Router) { }

  ngOnInit() {
      this.signupForm = new FormGroup({
         
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'firstName':new FormControl(null, [Validators.required,Validators.maxLength(20), Validators.minLength(3) ]),
          'lastName':new FormControl(null, [Validators.required ,Validators.maxLength(20), Validators.minLength(3)]),
          
          'mobile': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
          'otp': new FormControl(null,[Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
          'tnc' : new FormControl(false)
        });
        
        
        
        // this.toastService.showNotification("sarthak",4000);
    //   setTimeout(function() {
      //     $(".alert").fadeTo(500, 0).slideUp(500, function(){
      //         (<any>$(this)).remove(); 
      //     });
      // }, 2000);

      
    }
  
    createUser () {
      console.log(this.signupForm.value);

      let reqBody = {emailId:"",firstName:"",lastName:"",cell:"",otp:"",acceptedTOC:""};
      this.showSignUpButton = false;
      this.showLoader = true;
      reqBody.emailId = this.signupForm.get('email').value;
      reqBody.firstName = this.signupForm.get('firstName').value;
      reqBody.lastName = this.signupForm.get('lastName').value;
      reqBody.cell = this.signupForm.get('mobile').value;
      reqBody.otp = this.signupForm.get('otp').value;
      reqBody.acceptedTOC = this.signupForm.get('tnc').value;

      console.log(reqBody);

      this.singUpService.createUser(reqBody)
        .subscribe(
          (data : SignupResponseModel) => {
            if (!data) {
              this.toastService.showNotification("Something Went wrong", 4000);
              // this.setFormFresh();
            }

            else if (data.code = "0"){
              this.toastService.showNotification(data.message.toString(),5000);
              this.router.navigate(['slcontainer/login']);


            }
            else {
              this.toastService.showNotification(data.message.toString(),5000);
            }
          }
        );

    }
    setFormFresh () {
      this.signupForm.markAsPristine();
      this.signupForm.markAsUntouched();
      this.signupForm.setValue({email : "", mobile : "", otp : "",firstName:"",lastName:""});
      this.showLoader = false;
      this.showSendOtpButton = true;
    }

    showAlertMessage () {

      this.showAlert = true;

      setTimeout ( () => {
        this.showAlert = false;
      },4000)
    }
    
    afterSuccessfullOtpSent () {
      this.signupForm.get('firstName').disable();
      this.signupForm.get('lastName').disable();
      this.signupForm.get('email').disable();
      this.signupForm.get('mobile').disable();
      this.otpSentCount++;
      this.showOtpFields = true;
      this.showSignUpButton = true;
      this.showLoader = false;
      this.showAlertMessage();
    }
    
    onSubmit() {
      this.showLoader = true;
      this.showSendOtpButton = false;
      this.signupForm.markAsPristine();
      this.signupForm.markAsUntouched()
    
      console.log("submitted");
      let enteredMobile = this.signupForm.get('mobile').value;
      this.singUpService.getOtp(enteredMobile).subscribe(
        (data : SignupResponseModel) => {
          if(!data) {
            console.log("req failed"+data);
            this.toastService.showNotification("Something Went wrong", 4000);
            this.setFormFresh();
          }
          else {
            
            if(data.code == "0" /*|| data.code == "15" */ ) {
              console.log(data);
              this.afterSuccessfullOtpSent();
              this.otpFormSubmitted = true;
              
            }
            else {
              this.toastService.showNotification(data.message.toString(),4000);
              this.setFormFresh();
            }
          }
          
        },

        (err) => {
          console.log(err.toString()+ "*****");
          this.toastService.showNotification("Something went wrong ! Please try again after some time",4000);
          this.setFormFresh();
          // this.setFormFresh();
        }
      );
    }
  }