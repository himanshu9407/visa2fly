import {
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import {
  HomeServiceService
} from '../../home-service.service';
import {
  home_formData
} from 'src/app/interfaces/home_formData';
import {
  NgForm,
  FormGroup,
  FormControl,
  AbstractControl
} from '@angular/forms';
import {
  HomeFormService
} from './home-form.service';
import {
  HomeFormModel
} from './HomeForm.model';
import {
  UserFlowDetails
} from 'src/app/shared/user-flow-details.service';
import {
  PreloaderService
} from 'src/app/shared/preloader.service';
import {
  AuthenticationGuard
} from 'src/app/shared/AuthenticationGuard.service';
import {
  LoginStatusService
} from 'src/app/shared/login-status.service';
import {
  LoginService
} from '../login-signup/login/login.service';


@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent {

  homeForm: FormGroup;
  




  public homeFormData : any = {
    "code": "0",
    "status": "SUCCESS",
    "message": "Data Fetched Successfully",
    "data": {
        "countries": [
            "China",
            "Sri Lanka",
            "Australia"
        ],
        "data": {
            "Sri Lanka": {
                "countryName": "Sri Lanka",
                "purpose": [
                    "Business",
                    "Transit",
                    "Tourist"
                ],
                "entryType": [
                    "Single Entry"
                ],
                "Business" : ["Single Entry"],
                "Transit" : ["Single Entry"],
                "Tourist" : ["Single Entry"],
                "residenceOf": [
                    "Delhi",
                    "Noida",
                    "Gurugram"
                ]
            },
            "China": {
                "countryName": "China",
                "purpose": [
                    "Business",
                    "Transit",
                    "Tourist"
                ],
                "entryType": [
                    "Single Entry",
                    "Double Entry",
                    "Multiple Entry"
                ],
                "Business" : [
                      "Single Entry",
                      "Double Entry",
                      "Multiple Entry"
                ],
                "Transit" : ["Single Entry"],
                "Tourist" : [
                      "Single Entry",
                      "Double Entry",
                      "Multiple Entry"
                ],
                "residenceOf": [
                    "Delhi",
                    "Noida",
                    "Gurugram"
                ]
            },
            "Australia": {
                "countryName": "Australia",
                "purpose": [
                    "Business"
                ],
                "entryType": [
                    "Single entry"
                ],
                
                "Business" : [
                      "Single Entry",
                      "Multiple Entry"
                ],
                "Transit" : ["Single Entry"],
                "Tourist" : [
                      "Single Entry",
                      "Multiple Entry"
                ],
                "residenceOf": [
                    "Delhi"
                ]
            }
        }
    }
};





  public selectedResidenceOf: string = "select";

  public selectedVisaType: string = "select";

  public selectedCountry: string = "Sri Lanka";


  public selectedPurpose: string = "select";


  public country: AbstractControl;
  public purpose: AbstractControl;
  public visaType: AbstractControl;
  public livesIn: AbstractControl;


  public purposeNotSelected: boolean = false;
  public visaTypeNotSelected: boolean = false;
  public livesInNotSelected: boolean = false;




  constructor(private router: Router, private httpClient: HttpClient,
    private homeFormService: HomeFormService, private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService, private authService: AuthenticationGuard,
    private loginStatus: LoginStatusService, private loginService: LoginService) {

    this.preloaderService.showPreloader(true);

    this.homeForm = new FormGroup({
      'country': new FormControl("Sri Lanka"),
      'purpose': new FormControl(""),
      'visatype': new FormControl(""),
      'livingin': new FormControl("")
    });


    this.country = this.homeForm.get('country');
    this.purpose = this.homeForm.get('purpose');
    this.visaType = this.homeForm.get('visatype');
    this.livesIn = this.homeForm.get('livingin');

    console.log(this.homeFormData.data.countries);

    this.homeFormService.getHomeFormDataFromServer()
      .then((data) => {
        this.homeFormData = data;

        let activeCountry : string = localStorage.getItem("activeCountry");
        let popularCountry : string = localStorage.getItem('popularCountry');
        if(activeCountry == ""  || activeCountry == undefined || activeCountry == null) {
          this.country.setValue(this.homeFormData.data.countries[0]);
          this.selectedCountry = this.homeFormData.data.countries[0];

          // console.log("here 1");
        }
        else {
          this.country.setValue(activeCountry);
          localStorage.setItem("activeCountry", "");
          // console.log("here 2");
        }
        if(popularCountry == ""  || popularCountry == undefined || popularCountry == null) {
          this.country.setValue(this.homeFormData.data.countries[0]);
          this.selectedCountry = this.homeFormData.data.countries[0];

          // console.log("here 3");
        }
        else {
          this.country.setValue(popularCountry);
          localStorage.setItem("popularCountry", "");
         // console.log("here 4");
        }

        localStorage.setItem("countryList",JSON.stringify(data.data.countries));
        // console.log(data.data.data[this.selectedCountry]);
        this.preloaderService.showPreloader(false);
      });

  }

  ngOnInit() {

    








  }

  countryChanged ( ) {
    console.log("country changed");
    let temoCountry = this.homeForm.get('country').value;
    this.homeForm.get('purpose').setValue('select');
    this.homeForm.get('visatype').setValue('select');
    this.homeForm.get('livingin').setValue('select');
    this.selectedPurpose = 'select';
    this.selectedVisaType = 'select';
    this.selectedResidenceOf = 'select';
    this.homeForm.get('country').setValue(temoCountry);
  }

  validatePurpose() {
    if ((this.purpose.dirty && this.purpose.value == 'select') || !this.purpose.touched || this.purpose.pristine) {
      this.purposeNotSelected = true;
      return false;
    } else {
      return true
    }
  }

  validateVisaType() {
    if (this.visaType.dirty && this.visaType.value == 'select' || !this.visaType.touched || this.visaType.pristine) {
      this.visaTypeNotSelected = true;
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

  validateForm() {
    console.log("validate form method called");
    this.validatePurpose();
    this.validateVisaType();
    this.validateLivingIn();
    if (this.validatePurpose() == false || this.validateVisaType() == false || this.validateLivingIn() == false) {
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
       // console.log(this.purpose);
      }
    );

    this.visaType.valueChanges.subscribe(
      (value) => {
        if (value == 'select') {
          this.visaTypeNotSelected = true;
        } else {
          this.visaTypeNotSelected = false;
        }
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
      this.userFlow.setUserFlowDetails("country", this.selectedCountry);
      this.userFlow.setUserFlowDetails("purpose", this.selectedPurpose);
      this.userFlow.setUserFlowDetails("entryType", this.selectedVisaType);
      this.userFlow.setUserFlowDetails("livesIn", this.selectedResidenceOf);
      console.log(this.userFlow.getUserFlowDetails())
      this.router.navigate(['reg']);
    }
  }
}
