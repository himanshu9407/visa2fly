import { Component, OnInit, PLATFORM_ID, Inject, Output } from "@angular/core";
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
  public login = "";
  public signUp = "";

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params["form"] == "login") {
        this.showLogin();
        this.login = "Login";
        this.signUp = "Sign Up";
      } else if (params["form"] == "signup") {
        this.signUp = "Login";
        this.login = "Sign Up";
        this.showSignup();
      }
    });
  }

  showSignup() {
    if (this.show_signup == false) {
      this.show_signup = true;
    }
    this.signUp = "Login"
    this.login = "Sign Up";
    this.show_login = false;
    // if (isPlatformBrowser(this.platformId)) {
    //   $("#signUp").addClass("active");
    //   $("#signIn").removeClass("active");
    // }
  }

  showLogin() {
    if (this.show_login == false) {
      this.show_login = true;
    }
    this.signUp = "Sign Up";
    this.login = "Login";
    this.show_signup = false;
    // if (isPlatformBrowser(this.platformId)) {
    //   $("#signIn").addClass("active");
    //   $("#signUp").removeClass("active");
    // }
  }

  NavigateToLoginAndSignup() {
    if(this.signUp === 'Sign Up'){
      // console.log("working");
      this.router.navigate(["slcontainer", "signup"]);
    } else {
      // console.log("not working");
      this.router.navigate(["slcontainer", "login"]);
    }
  }

  // navigateToLogin() {
  //   this.router.navigate(["slcontainer", "login"]);
  // }
  // navigateToSignup() {
  //   this.router.navigate(["slcontainer", "signup"]);
  // }
}
