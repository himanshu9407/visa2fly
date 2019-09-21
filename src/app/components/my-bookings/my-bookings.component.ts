import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../login-signup/login/login.service';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/shared/preloader.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  myBookings : Array<any> = [];

  AUTH_TOKEN = "";

  constructor(private loginStatus : LoginStatusService, private loginService : LoginService,
              private  router :Router ,private preloaderService :PreloaderService) {
    this.myBookings =   [];
    this.preloaderService.showPreloader(true);
    


}

ngOnInit() {
    this.AUTH_TOKEN = this.loginService.getAuthToken();

    this.loginStatus.verifyAuthToken(this.AUTH_TOKEN).subscribe(
      ( data : any ) => {
               
        if (data.code == "0") {
          console.log(data.data.bookings);
          this.myBookings = data.data.bookings;

          setTimeout(() => {
              
              this.preloaderService.showPreloader(false);
          }, 4000);
        }
        else {
          // router.navigate(['']);
        }
    }      
    );
  }

}
