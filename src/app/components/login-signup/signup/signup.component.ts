import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormControl } from '@angular/forms';
import { SignupService } from './signup.service';
import { SignupResponseModel } from './SignupResponse.model';
import { HttpParams } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast.service';

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



  constructor(private singUpService : SignupService, private toastService :ToastService) { }

  ngOnInit() {
      this.signupForm = new FormGroup({
         
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'mobile': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
          'otp': new FormControl(null,[Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
        });
        
        
        
        // this.toastService.showNotification("sarthak",4000);
    //   setTimeout(function() {
      //     $(".alert").fadeTo(500, 0).slideUp(500, function(){
      //         (<any>$(this)).remove(); 
      //     });
      // }, 2000);

      
    }
  
    createUser () {
      console.log(this.signupForm.get('otp').value);
    }
    setFormFresh () {
      this.signupForm.markAsPristine();
      this.signupForm.markAsUntouched();
      this.signupForm.setValue({email : "", mobile : "", otp : ""});
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
      this.otpSentCount++;
      this.showOtpFields = true;
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