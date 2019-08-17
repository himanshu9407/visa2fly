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
import { HomeFormService } from './home-form.service';
import { HomeFormModel } from './HomeForm.model';


@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent {
  // @Input() homeFormData1 ;

  // homeFormData;

  // @Input () childMessage;
  homeForm: FormGroup;



  public homeFormData  = {
    "code": "0",
    "status": "SUCCESS",
    "message": "Data Fetched Successfully",
    "data": {
      "countries": ["Austrailia", "Dubai", "Russia"],
      "data": {
        "Austrailia": {
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

  // public homeFormData = {
  //   "code": "0",
  //   "status": "SUCCESS",
  //   "message": "Data Fetched Successfully",
  //   "data": {
  //     "countries": ["Australia", "Dubai", "Russia"],
  //     "data": {
  //       "Australia": {
  //         "countryName": "Austrailia",
  //         "purpose": ["BUSINESS", "TOURIST"],
  //         "entryType": ["SINGLE ENTRY"],
  //         "residenceOf": ["Delhi", "Noida", "Gurgaon"]
  //       },
  //       "Dubai": {
  //         "countryName": "Dubai",
  //         "purpose": ["BUSINESS", "TOURIST"],
  //         "entryType": ["SINGLE ENTRY", "MULTIPLE ENTRY"],
  //         "residenceOf": ["Delhi", "Noida", "Gurgaon"]
  //       },
  //       "Russia": {
  //         "countryName": "Russia",
  //         "purpose": ["BUSINESS", "TOURIST"],
  //         "entryType": ["SINGLE ENTRY", "MULTIPLE ENTRY"],
  //         "residenceOf": ["Delhi", "Noida", "Gurgaon"]
  //       }
  //     }
  //   }
  // };


  // public residenceOf : string [];
  public selectedResidenceOf: string = "select";

  // public visaType : string [];
  public selectedVisaType: string="select";

  // public country : string [];
  public selectedCountry: string = "Austrailia";


  // public purpose : string [];
  public selectedPurpose: string="select";


  public country: AbstractControl;
  public purpose: AbstractControl;
  public visaType: AbstractControl;
  public livesIn: AbstractControl;


  public purposeNotSelected: boolean = false;
  public visaTypeNotSelected: boolean = false;
  public livesInNotSelected: boolean = false;




  constructor(private router: Router, private httpClient: HttpClient,
    private homeFormService : HomeFormService) {

      
    }
   
    ngOnInit() {
      
      this.homeFormService.getHomeFormDataFromServer().then((data)=>{this.homeFormData = data});
 



  

      this.homeForm = new FormGroup({
      'country': new FormControl("Austrailia"),
      'purpose': new FormControl("select"),
      'visatype': new FormControl("select"),
      'livingin': new FormControl("select")
    });


    this.country = this.homeForm.get('country');
    this.purpose = this.homeForm.get('purpose');
    this.visaType = this.homeForm.get('visatype');
    this.livesIn = this.homeForm.get('livingin');


  }

  validatePurpose() {
    if ((this.purpose.dirty && this.purpose.value == 'select') || !this.purpose.touched || this.purpose.pristine) {
      this.purposeNotSelected = true;
      return false;
    }
    else {return true}
  }

  validateVisaType() {
    if (this.visaType.dirty && this.visaType.value == 'select' || !this.visaType.touched || this.visaType.pristine) {
      this.visaTypeNotSelected = true;
      return false;
    }
    else {return true}
  }

  validateLivingIn() {
    if (this.livesIn.dirty && this.livesIn.value == 'select' || !this.livesIn.touched || this.livesIn.pristine) {
      this.livesInNotSelected = true;

      return false;
    }
    else {return true}
  }

  validateForm() {
    console.log("validate form method called");
    this.validatePurpose();
    this.validateVisaType();
    this.validateLivingIn();
    if (this.validatePurpose() == false || this.validateVisaType() == false || this.validateLivingIn() == false){
      return false;

    }
    
    else {
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

  
    if(this.validateForm()){
      console.log()
      console.log("good to go")
      this.router.navigate(['reg']);
    }
}
}