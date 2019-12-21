import { Data } from './../../../interfaces/requirement';
import { country } from './../../../interfaces/home_formData';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit,AfterViewInit, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { VisaRequirementService } from '../visa-requirement.service';
import { HomeFormComponent } from '../../home-form/home-form.component';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-united-kingdom",
  templateUrl: "./united-kingdom.component.html",
  styleUrls: ["./united-kingdom.component.css"],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(800)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(
        ":leave",
        animate(800, style({ opacity: 0, background: "green" }))
      )
    ])
  ]
})
export class UnitedKingdomComponent implements OnInit,AfterViewInit {
  
  @ViewChild("t", { static : false }) t;
  ngbTabTitleClass;

  selectedRequirement: boolean = false;

  public selectedVisaType = "Tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  userControlDetail : any;
  public MyQuotation : Array<any> = [];
  public MyQuotation1 : Array<any> = [];
  public purposeChooseForm : FormGroup;
  public selectedPurpose = 'Tourist'; 
  businessArr : Array<any> =[];
  touristArr : Array<any> =[];
  transitArr : Array<any> =[];

  constructor(private activeRoute: ActivatedRoute, private router: Router, 
    private requireQuotation : VisaRequirementService,
    private userFlow : UserFlowDetails) {
      // this.userControlDetail = this.userFlow.getUserFlowDetails();
      // // console.log(this.userControlDetail);
      this.userControlDetail = this.userFlow.getUserFlowDetails();
      console.log(this.userControlDetail.purpose);
      
      this.activeRoute.params.subscribe((params : any) =>{
        this.selectedVisaType = params.purpose;
        console.log(this.selectedVisaType);
      });

      let tempPurpose = this.selectedVisaType;
      console.log(tempPurpose);
      this.purposeChooseForm = new FormGroup({
      'purposeSelected':new FormControl(tempPurpose)
         });
      this.requireQuotation.getRequireQuotation(this.userControlDetail.country).subscribe((res : any) => {
       // console.log(res.data);
        if(res.code == 0){
          this.MyQuotation = res.data;
          console.log(this.MyQuotation);
          this.MyQuotation.forEach((element) => {
            
            if(element.purpose == 'Business'){
            this.businessArr.push(element);
            console.log(this.businessArr);
          }else if(element.purpose == 'Tourist'){
            this.touristArr.push(element);
            console.log(this.touristArr);
          }else if(element.purpose == 'Transit'){
            this.transitArr.push(element);
            console.log(this.transitArr);
          }
          });
          let purposeMain = this.selectedVisaType;
          let purposeUrl = purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
          if(purposeUrl == 'Business')
          {
            this.MyQuotation1 = this.businessArr;
          }else if(purposeUrl == 'Tourist') {
            this.MyQuotation1 = this.touristArr;
          }else if(purposeUrl == 'Transit'){
            this.MyQuotation1 = this.transitArr;
          }else{
            this.router.navigate(['visa/']);
          }
        }
      });
      // let tempPurpose = this.userControlDetail.purpose; 
      // console.log(tempPurpose);
      //   

      //   this.requireQuotation.getRequireQuotation(this.userControlDetail.country).subscribe((data : any)=> {
      //     //console.log(data);
      //      // if(data.code == 0)
      //      // {
           
      //        this.MyQuotation = data.data;
      //        //console.log(this.MyQuotation);
      //        this.MyQuotation.forEach(element => {
      //         // console.log(element.purpose);
      //         if(element.purpose == 'Tourist'){
      //           //console.log(element);
      //           this.touristArr.push(element);
      //          // this.MyQuotation1 = this.touristArr;              
      //        }else if(element.purpose == 'Business'){
      //          this.businessArr.push(element);
               
      //        }else if(element.purpose == 'Transit')
      //          this.transitArr.push(element);
      //       })
 
      //       if(this.userControlDetail.purpose == 'Tourist')
      //       {
      //         this.MyQuotation1 = this.touristArr;
 
      //       }else if(this.userControlDetail.purpose == 'Business'){
      //        this.MyQuotation1 = this.businessArr;
      //       }else if(this.userControlDetail.purpose == 'Transit'){
      //        this.MyQuotation1 = this.transitArr;
      //       }
      //       // console.log(this.MyQuotation1);
      //      });  
      
  
        // setInterval(() => {
        //   console.log(this.purposeChoose.get('purposeSelected').value + "**********");
        // }, 2000);
  
        
    }

  ngOnInit() {
   
  
    // let url = "This is my Url"+" "+ window.location.href.split(2);
    // console.log(this.MyQuotation);
  //   this.activeRoute.params.subscribe((params: any) => {
  //     // console.log(params);
  //     this.selectedVisaType = params.purpose;
  //     // console.log(this.selectedVisaType);
  //     // console.log(this.selectedVisaType);
  //     // setTimeout(() => {
  //       // }, 6000);
  //     });
      
  //     let purposeString : string = this.selectedVisaType;
  //     console.log(purposeString);
   
   }

    ngAfterViewInit () {
    this.t.select(this.selectedVisaType);
      
    }


  
 
  


  
  // ngAfterViewInit() {
  //   this.t.select(this.selectedVisaType);
  // }
  purposeChanged(){
    var purpose = this.purposeChooseForm.get('purposeSelected').value;
    // console.log(purpose);
    window.history.replaceState(
      "",
      "",
      "/visa/United-Kingdom/" + purpose
    );
    // console.log(this.businessArr);
    
    if(purpose == 'Tourist')
      {
        this.MyQuotation1 = this.touristArr;
        this.t.select("Tourist");

      }else if(purpose == 'Business')
      {
        this.MyQuotation1 = this.businessArr;
        this.t.select("Business");
      }else
      {
        this.MyQuotation1 = this.transitArr;
        this.t.select("Transit");
      }
      // console.log(this.MyQuotation1);
      
  }


  navigateTo(purpose: any) {
    // window.location
    //let urlpurpose = this.MyQuotation1
    
    let purposeString : string = purpose.nextId;
     console.log(purposeString);
     let purposeUrl = purposeString.charAt(0).toUpperCase() + purposeString.slice(1);
     this.purposeChooseForm.get('purposeSelected').setValue(purposeString);
     if(purposeString == 'Tourist')
       {
         this.MyQuotation1 = this.touristArr;
         //this.t.select("Tourist");

     }else if(purposeString == 'Business')
       {
         this.MyQuotation1 = this.businessArr;
         // console.log(this.MyQuotation1);
         //this.t.select("Business");
       }else
       {
         this.MyQuotation1 = this.transitArr;
         //this.t.select("Transit");
       }
        // console.log(this.MyQuotation1);
     window.history.replaceState(
       "",
       "",
     "/visa/United-Kingdom/" + purposeUrl
     );
     // console.log("url changed");
     }
  
    }
