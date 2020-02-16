import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { HomeFormService } from '../../home-form/home-form.service';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { AuthenticationGuard } from 'src/app/shared/AuthenticationGuard.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../../login-signup/login/login.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-b2b-home',
  templateUrl: './b2b-home.component.html',
  styleUrls: ['./b2b-home.component.css']
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
  livesInNotSelected: boolean;
  id: string;

  constructor(private router: Router, private httpClient: HttpClient,
    private homeFormService: HomeFormService, private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService, private authService: AuthenticationGuard,
    private loginStatus: LoginStatusService, private loginService: LoginService,
    private route: ActivatedRoute) {
      this.id = this.route.snapshot.queryParamMap.get('id');

      console.log(this.id);

      this.userFlow.setB2BUserFlowDetails("id", this.id);
      

    this.b2bHomeForm = new FormGroup({
      'country': new FormControl('Sri Lanka'),
      'purpose': new FormControl('select'),
      'livingIn': new FormControl('select')
    });

    this.country = this.b2bHomeForm.get('country');
    this.purpose = this.b2bHomeForm.get('purpose');
    this.livesIn = this.b2bHomeForm.get('livingIn');

    this.homeFormService.getHomeFormDataFromServer()
      .then((data) => {
        this.homeFormData = data;

        // this.preloaderService.showPreloader(false);

        let activeCountry: string = localStorage.getItem("activeCountry");
        let popularCountry: string = localStorage.getItem('popularCountry');
        if (activeCountry == "" || activeCountry == undefined || activeCountry == null) {
          this.country.setValue(this.homeFormData.data.countries[0]);
          this.selectedCountry = this.homeFormData.data.countries[0];

          console.log("here 1");
        }
        else {
          this.country.setValue(activeCountry);
          localStorage.setItem("activeCountry", "");
          console.log("here 2");
        }
        if (popularCountry == "" || popularCountry == undefined || popularCountry == null) {
          this.country.setValue(this.homeFormData.data.countries[0]);
          this.selectedCountry = this.homeFormData.data.countries[0];

          console.log("here 3");
        }
        else {
          this.country.setValue(popularCountry);
          localStorage.setItem("popularCountry", "");
          console.log("here 4");
        }

        // localStorage.setItem("countryList", JSON.stringify(data.data.countries));
        // console.log(data.data.data[this.selectedCountry]);
        this.preloaderService.showPreloader(false);
      });

  }

  ngOnInit() {
  }

  validatePurpose() {
    if ((this.purpose.dirty && this.purpose.value == 'select') || !this.purpose.touched || this.purpose.pristine) {
      this.purposeNotSelected = true;
      return false;
    } else {
      return true
    }
  }

  validateLivingIn() {
    if (this.livesIn.dirty && this.livesIn.value == 'select' || !this.livesIn.touched || this.livesIn.pristine) {
      this.livesInNotSelected = true;
      return false;
    } else {
      return true
    }
  }

  countryChanged ( ) {
    console.log("country changed");
    let temoCountry = this.b2bHomeForm.get('country').value;
    this.b2bHomeForm.get('purpose').setValue('select');
    this.b2bHomeForm.get('livingIn').setValue('select');
    this.selectedPurpose = 'select';
    this.selectedResideIn = 'select';
    this.b2bHomeForm.get('country').setValue(temoCountry);
  }

  validateForm() {
    console.log("validate form method called");
    this.validatePurpose();
    this.validateLivingIn();
    if (this.validatePurpose() == false || this.validateLivingIn() == false) {
      return false;
    } else {
      return true;
    }
  }


  onSubmit() {
    this.purpose.valueChanges.subscribe(
      (value) => {
        if (value == 'select') {
          this.purposeNotSelected = true;
        } else {
          this.purposeNotSelected = false;
        }
        console.log(this.purpose);
      }
    );

    this.livesIn.valueChanges.subscribe(
      (value) => {
        if (value == 'select') {
          this.livesInNotSelected = true;
        } else {
          this.livesInNotSelected = false;
        }
      }
    );


    if (this.validateForm()) {
      // this.userFlow.setUserFlowDetails("country", this.selectedCountry);
      // this.userFlow.setUserFlowDetails("purpose", this.selectedPurpose);
      // this.userFlow.setUserFlowDetails("livesIn", this.selectedResideIn);
      // console.log(this.userFlow.getUserFlowDetails())
      this.router.navigate(['b2b/visa-requirement/', this.selectedCountry, this.selectedPurpose]);
    }
  }

}