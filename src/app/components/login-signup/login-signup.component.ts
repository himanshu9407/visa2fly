import { Component, OnInit, PLATFORM_ID, Inject, Output } from "@angular/core";
import * as $ from "jquery";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-login-signup",
  templateUrl: "./login-signup.component.html",
  styleUrls: ["./login-signup.component.css"],
})
export class LoginSignupComponent implements OnInit {
  title: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  public show_login: boolean = false;
  public show_signup: boolean = false;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params["form"] == "login") {
        this.showLogin();
      } else if (params["form"] == "signup") {
        this.showSignup();
      }
    });
  }

  showSignup() {
    if (this.show_signup == false) {
      this.show_signup = true;
    }
    this.show_login = false;
    if (isPlatformBrowser(this.platformId)) {
      $("#signUp").addClass("active");
      $("#signIn").removeClass("active");
    }
  }

  showLogin() {
    if (this.show_login == false) {
      this.show_login = true;
    }
    this.show_signup = false;
    if (isPlatformBrowser(this.platformId)) {
      $("#signIn").addClass("active");
      $("#signUp").removeClass("active");
      // $(".blurred-box").css("height", "426px");
      // 426px
    }
  }

  navigateToLogin() {
    this.router.navigate(["slcontainer", "login"]);
  }
  navigateToSignup() {
    this.router.navigate(["slcontainer", "signup"]);
  }
}
