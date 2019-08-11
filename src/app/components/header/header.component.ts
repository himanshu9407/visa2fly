import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-signup/login/login.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn = false;
  constructor(private loginService: LoginService, private loginSatatus : LoginStatusService) { }

  ngOnInit() {
    this.loginSatatus.getData().subscribe(
      (userLoggedIn) => {
        this.userLoggedIn = userLoggedIn;
      }
    );
  }

}
