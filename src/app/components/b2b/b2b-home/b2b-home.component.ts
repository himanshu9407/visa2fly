import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormControlName,
  AbstractControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { HomeFormService } from "../../home-form/home-form.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { AuthenticationGuard } from "src/app/shared/AuthenticationGuard.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../../login-signup/login/login.service";
import { stringify } from "querystring";
import { isPlatformBrowser } from "@angular/common";
// import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: "app-b2b-home",
  templateUrl: "./b2b-home.component.html",
  styleUrls: ["./b2b-home.component.css"]
})
export class B2bHomeComponent implements OnInit {
  b2bHomeForm: FormGroup;

  public selectedResideIn: string = "select";
  public selectedCountry: string = "Sri Lanka";
  public selectedPurpose: string = "select";

  public country: AbstractControl;
  public purpose: AbstractControl;
  public livesIn: AbstractControl;

  public homeFormData: any;

  purposeNotSelected: boolean = false;
  livesInNotSelected: boolean = false;
  id: string;
  isIdExist: boolean;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private titleService: Title,
    private meta: Meta,
    private toastr: ToastrService,
    private homeFormService: HomeFormService,
    // private toastService: ToastService,
    private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService,
    private authService: AuthenticationGuard,
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.id = this.route.snapshot.queryParamMap.get("id");
    this.userFlow.setB2BUserFlowDetails("id", this.id);

    // console.log(this.id);

    if (this.id == "" || this.id == null || this.id == undefined) {
      this.isIdExist = false;
      this.toastr.warning("ID Is Missing. Kindly Go Back And Try Again");
    } else {
      this.isIdExist = true;
    }

    this.b2bHomeForm = new FormGroup({
      country: new FormControl("Sri Lanka"),
      purpose: new FormControl("select"),
      livingIn: new FormControl("select")
    });

    this.country = this.b2bHomeForm.get("country");
    this.purpose = this.b2bHomeForm.get("purpose");
    this.livesIn = this.b2bHomeForm.get("livingIn");

    this.homeFormService.getHomeFormDataFromServer().then(data => {
      if (isPlatformBrowser(this.platformId)) {
        this.homeFormData = data;
        let activeCountry: string = localStorage.getItem("activeCountry");
        let popularCountry: string = localStorage.getItem("popularCountry");
        if (
          activeCountry == "" ||
          activeCountry == undefined ||
          activeCountry == null
        ) {
          this.country.setValue(this.homeFormData.data.countries[0]);
          this.selectedCountry = this.homeFormData.data.countries[0];

          // console.log("here 1");
        } else {
          this.country.setValue(activeCountry);
          localStorage.setItem("activeCountry", "");
          // console.log("here 2");
        }
        if (
          popularCountry == "" ||
          popularCountry == undefined ||
          popularCountry == null
        ) {
          this.country.setValue(this.homeFormData.data.countries[0]);
          this.selectedCountry = this.homeFormData.data.countries[0];

          // console.log("here 3");
        } else {
          this.country.setValue(popularCountry);
          localStorage.setItem("popularCountry", "");
          // console.log("here 4");
        }

        // localStorage.setItem("countryList", JSON.stringify(data.data.countries));
        // console.log(data.data.data[this.selectedCountry]);
        this.preloaderService.showPreloader(false);
      }
    });
  }

  ngOnInit() {
    this.titleService.setTitle("Visa2fly | Home");
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      },
      // { name: "author", content: "rsgitech" },
      // { name: "robots", content: "index, follow" }
    ]);
  }

  countryChanged() {
    // console.log("country changed");
    let temoCountry = this.b2bHomeForm.get("country").value;
    this.b2bHomeForm.get("purpose").setValue("select");
    this.b2bHomeForm.get("livingIn").setValue("select");
    this.selectedPurpose = "select";
    this.selectedResideIn = "select";
    this.b2bHomeForm.get("country").setValue(temoCountry);
  }

  validatePurpose() {
    if (
      (this.purpose.dirty && this.purpose.value == "select") ||
      !this.purpose.touched ||
      this.purpose.pristine
    ) {
      this.purposeNotSelected = true;
      return false;
    } else {
      return true;
    }
  }

  validateLivingIn() {
    if (
      (this.livesIn.dirty && this.livesIn.value == "select") ||
      !this.livesIn.touched ||
      this.livesIn.pristine
    ) {
      this.livesInNotSelected = true;
      return false;
    } else {
      return true;
    }
  }

  validateForm() {
    // console.log("validate form method called");
    this.validatePurpose();
    this.validateLivingIn();
    if (
      this.validatePurpose() == false ||
      this.validateLivingIn() == false ||
      this.isIdExist == false
    ) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.purpose.valueChanges.subscribe(value => {
      if (value == "select") {
        this.purposeNotSelected = true;
      } else {
        this.purposeNotSelected = false;
      }
      // console.log(this.purpose);
    });

    this.livesIn.valueChanges.subscribe(value => {
      if (value == "select") {
        this.livesInNotSelected = true;
      } else {
        this.livesInNotSelected = false;
      }
    });

    if (this.id == "" || this.id == null || this.id == undefined) {
      this.toastr.warning("ID Is Missing. Kindly Go Back And Try Again");
    }

    if (this.validateForm()) {
      // this.userFlow.setUserFlowDetails("country", this.selectedCountry);
      // this.userFlow.setUserFlowDetails("purpose", this.selectedPurpose);
      // this.userFlow.setUserFlowDetails("livesIn", this.selectedResideIn);
      // console.log(this.userFlow.getUserFlowDetails())
      this.preloaderService.showPreloader(true);
      this.router.navigate([
        "b2b/visa-requirement/",
        this.selectedCountry,
        this.selectedPurpose
      ]);
    }
  }
}
