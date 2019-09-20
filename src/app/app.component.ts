import { Component, AfterViewInit, OnInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { HomeServiceService } from './home-service.service';
import { HomeFormService } from './components/home-form/home-form.service';
import { PreloaderService } from './shared/preloader.service';
import { LoginStatusService } from './shared/login-status.service';
import { LoginService } from './components/login-signup/login/login.service';
import { SignupResponseModel } from './components/login-signup/signup/SignupResponse.model';
import { UserFlowDetails } from './shared/user-flow-details.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationGuard } from './shared/AuthenticationGuard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public dummyData = {
    "code": "0",
  "status": "SUCCESS",
  "message": "Data Fetched Successfully",
  "data": {
    "countries": ["Australia", "Dubai", "Russia"],
    "data": {
      "Australia": {
        "countryName": "Austrailia",
        "purpose": ["BUSINESS", "TOURIST"],
        "entryType": ["SINGLE ENTRY"],
        "residenceOf": ["Delhi", "Noida", "Gurgaon"]
      },
      "Dubai": {
        "countryName": "Dubai",
        "purpose": ["BUSINESS", "TOURIST"],
        "entryType": ["SINGLE ENTRY", "MULTIPLE ENTRY"],
        "residenceOf": ["Delhi", "Noida", "Gurgaon"]
      },
      "Russia": {
        "countryName": "Russia",
        "purpose": ["BUSINESS", "TOURIST"],
        "entryType": ["SINGLE ENTRY", "MULTIPLE ENTRY"],
        "residenceOf": ["Delhi", "Noida", "Gurgaon"]
      }
    }
  }
};
homeFormData :any;
title = 'visa-App';
public showPreloader : boolean  =false ;
users :object;
constructor(private homeFormService: HomeFormService,
  private preloaderService : PreloaderService, private loginStatusService : LoginStatusService,
  private loginService : LoginService, private userFlow : UserFlowDetails, private authService : AuthenticationGuard) {
  }
  
  ngOnInit() {

    console.log(localStorage.getItem("AUTH_TOKEN") == "");


    this.preloaderService.showPreloader(true);

    this.preloaderService.getAlert().subscribe(
      (showPreloader : boolean) => {
        this.showPreloader = showPreloader;
      });

      
      let token = this.loginService.getAuthToken();
     

    if (token == "" || token ==  null || token == undefined )  {
      console.log("profile cleared")
      this.userFlow.setUserProfile({});
      this.loginStatusService.setUserLoggedIn(false);
    }
    else {

      this.loginStatusService.verifyAuthToken(token).toPromise()
        .then((data : any) => {
        if(data.code == "0") {
            console.log(data);
            this.userFlow.setUserProfile(data.data);
            this.loginStatusService.setUserLoggedIn(true);
            // console.log(this.userFlow.getUserFlowDetails());
            this.preloaderService.showPreloader(false);
            this.loginStatusService.setUserProfile(data.data.profile);
        }
          else {
            this.userFlow.setUserProfile({});
            this.loginStatusService.setUserLoggedIn(false);
        }
        })
    }

      
    

    
    
    
  }


  
  
  
 

    
  }