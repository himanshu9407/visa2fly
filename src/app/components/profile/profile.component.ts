import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../login-signup/login/login.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:any = {emailId:"",firstName:""};

  constructor(private loginStatusService :LoginStatusService, private loginService : LoginService,
    private userFlow : UserFlowDetails, private preloaderService : PreloaderService, private router : Router) {
      this.preloaderService.showPreloader(true);
      let AUTH_TOKEN = this.loginService.getAuthToken();
      if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
        AUTH_TOKEN = "";
      }
  
  
      this.loginStatusService.verifyAuthToken(AUTH_TOKEN).subscribe (
        (data: any) => {
          if (data.code == "0") {
            this.profile = data.data.profile;
            // this.preloaderService.showPreloader(false);
          }
          else {
            this.router.navigate(['home']);
            // this.preloaderService.showPreloader(false);
          }
        }
      )
     }

  ngOnInit() {

    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 2000);
 
  }

}
