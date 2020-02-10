import {
  Component,
  OnInit,
  ViewChild,
  Input,  Injectable, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  //public selectedVisaType: string = "select";

  public selectedCountry: string = "Sri Lanka";


 public selectedPurpose: string = "select";


  public country: AbstractControl;
   public purpose: AbstractControl;
  //public visaType: AbstractControl;
  public livesIn: AbstractControl;


  public purposeNotSelected: boolean = false;
 // public visaTypeNotSelected: boolean = false;
  public livesInNotSelected: boolean = false;
  staticPagesArr : Array<any> = ['United Kingdom'];



  constructor(private router: Router, private httpClient: HttpClient,
    private homeFormService: HomeFormService, private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService, private authService: AuthenticationGuard,
    private loginStatus: LoginStatusService, private loginService: LoginService,
    @Inject(PLATFORM_ID) private platformId: Object) {

    this.preloaderService.showPreloader(true);

    this.homeForm = new FormGroup({
      'country': new FormControl("Sri Lanka"),
      'purpose': new FormControl(""),
      //'visatype': new FormControl(""),
      'livingin': new FormControl("")
    });


    this.country = this.homeForm.get('country');
     this.purpose = this.homeForm.get('purpose');
    //this.visaType = this.homeForm.get('visatype');
    this.livesIn = this.homeForm.get('livingin');

    // console.log(this.homeFormData.data.countries);
    

    this.homeFormService.getHomeFormDataFromServer()
      .then((data) => {
        if (isPlatformBrowser(this.platformId)) {
        this.homeFormData = data;
       // console.log(this.homeFormData);
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
      }
      });

  }
  

  ngOnInit() {

    



    // console.log(this.homeForm.get('purpose').value == "");




  }

  

  countryChanged ( ) {
    // console.log("country changed");
    let temoCountry = this.homeForm.get('country').value;
    this.homeForm.get('purpose').setValue('select');
   // this.homeForm.get('visatype').setValue('select');
    this.homeForm.get('livingin').setValue('select');
    // this.homeForm.get('purpose')
    this.selectedPurpose = 'select';
    //this.selectedVisaType = 'select';
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

  // validatePurposeType() {
  //   if (this.purpose.dirty && this.purpose.value == 'select' || !this.purpose.touched || this.purpose.pristine) {
  //     this.purposeNotSelected = true;
  //     return false;
  //   } else {
  //     return true
  //   }
  // }

  validateLivingIn() {
    if (this.livesIn.dirty && this.livesIn.value == 'select' || !this.livesIn.touched || this.livesIn.pristine) {
      this.livesInNotSelected = true;

      return false;
    } else {
      return true
    }
  }

  validateForm() {
     //console.log("validate form method called");
    this.validatePurpose();
    //this.validatePurposeType();
    this.validateLivingIn();
    if ( this.validatePurpose() == false || this.validateLivingIn() == false) {
      return false;

    } else {
      return true;
    }
  }


  // setDetailsOnLocalStorage () {
    // this.userFlow.setUserFlowDetails("country", this.selectedCountry);
    // this.userFlow.setUserFlowDetails("purpose", this.selectedPurpose);
    // this.userFlow.setUserFlowDetails("purpose", this.selectedPurpose);
    // this.userFlow.setUserFlowDetails("livesIn", this.selectedResidenceOf);
  // }



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

    // this.purpose.valueChanges.subscribe(
    //   (value) => {
    //     if (value == 'select') {
    //       this.purposeNotSelected = true;
    //     } else {
    //       this.purposeNotSelected = false;
    //     }
    //   }
    // );
    this.livesIn.valueChanges.subscribe(
      (value) => {
        if (value == 'select') {
          this.livesInNotSelected = true;
        } else {
          this.livesInNotSelected = false;
        }
      }
    );
    if(this.validateForm()) { 

         let purpose = this.homeForm.get('purpose').value;
        //  console.log(purpose);
         let country1 = this.homeForm.get('country').value;
        //  console.log(country1);
         //  let countryTemp = this.homeForm.get('country').value;
        let variable = "apply-for-" + country1 + "-visa-online";
         // console.log(countryTemp);
         let countryTemp1 = this.staticPagesArr.includes(this.selectedCountry);
        //  console.log(countryTemp1)
        switch(this.selectedCountry)
        {
          // case "Canada" : {
          //  this.setDetailsOnLocalStorage();
          //  this.router.navigate(['reg']);
          // break;
          // }
          case "United Kingdom" : {
           // this.setDetailsOnLocalStorage();
            this.router.navigate(['visa-requirements/apply-for-UK-visa-online', "" + purpose]);
            break;
          }
          case "Switzerland" : {
            // this.setDetailsOnLocalStorage();
             this.router.navigate(['visa-requirements/apply-for-Swiss-visa-online', "" + purpose]);
             break;
           }
          case "France" : {
            //this.setDetailsOnLocalStorage();
            this.router.navigate(['visa-requirements/apply-for-France-visa-online/',"" + purpose]);
            break;
          } 
          case "China" : {
            this.router.navigate(['visa-requirements/apply-for-China-visa-online/', "" + purpose]);
            break;
          }

          case "Ethiopia" : {
            this.router.navigate(['visa-requirements/apply-for-Ethiopia-visa-online/', "" + purpose]);
            break;
          }
          case "Malaysia" : {
            this.router.navigate(['visa-requirements/apply-for-Malaysia-visa-online/', "" + purpose]);
            break;
          }
          case "Dubai" : {
            this.router.navigate(['visa-requirements/apply-for-Dubai-visa-online/', "" + purpose]);
            break;
          }

          case "Maldives" : {
            this.router.navigate(['visa-requirements/apply-for-Maldives-visa-online/', "" + purpose]);
            break;
          }
          case "Spain" : {
            this.router.navigate(['visa-requirements/apply-for-Spain-visa-online/', "" + purpose]);
            break;
          }

          case "Singapore" : {
            this.router.navigate(['visa-requirements/apply-for-Singapore-visa-online/', "" + purpose]);
            break;
          }
          // case "Japan" : {
          //   this.setDetailsOnLocalStorage();
          //   this.router.navigate(['']);
          //   break;
          // }
          default : {
            //this.setDetailsOnLocalStorage();
            //console.log(this.userFlow.getUserFlowDetails())
            this.router.navigate(['visa-requirements/', "" + country1,variable,purpose]);
          }
        }      
    }
  }
}
