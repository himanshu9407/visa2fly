import { country } from './../../../interfaces/home_formData';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from "@angular/core";
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
export class UnitedKingdomComponent implements OnInit {
  @ViewChild("t", { static: true }) t;
  ngbTabTitleClass;

  selectedRequirement: boolean = false;

  selectedVisaType = "tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  userControlDetail : any;
  public MyQuotation : Array<any> = [];
  public MyQuotation1 : any;
  public purposeChooseForm : FormGroup;
  public selectedPurpose = 'Tourist'; 

  constructor(private activeRoute: ActivatedRoute, private router: Router, 
    private requireQuotation : VisaRequirementService,
    private userFlow : UserFlowDetails) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params: any) => {
      //console.log(params);
      this.selectedVisaType = params.purpose;
      console.log(this.selectedVisaType);
      // console.log(this.selectedVisaType);
      setTimeout(() => {
        this.t.select(this.selectedVisaType);
      }, 6000);
    });
    this.userControlDetail = this.userFlow.getUserFlowDetails();
    console.log(this.userControlDetail);
       
    let tempPurpose = this.userControlDetail.purpose; 
      this.purposeChooseForm = new FormGroup({
        'purposeSelected':new FormControl(tempPurpose)
      });

      // setInterval(() => {
      //   console.log(this.purposeChoose.get('purposeSelected').value + "**********");
      // }, 2000);

      this.requireQuotation.getRequireQuotation(this.userControlDetail.country).subscribe((data : any)=> {
       // console.log(data);
        // if(data.code == 0)
        // {

          this.MyQuotation = data.data;
          console.log(this.MyQuotation);
          this.MyQuotation.forEach(element => {
           console.log(element.purpose);
           if(element.purpose == 'Tourist' && this.userControlDetail.purpose == 'Tourist'){
             //console.log(element);
            this.MyQuotation1 = element;
            console.log(this.MyQuotation1);
            
          }else if(element.purpose == 'Business' && this.userControlDetail.purpose == 'Business'){
            this.MyQuotation1 = element;
            
          }else if(element.purpose == 'Transit' && this.userControlDetail.purpose == 'Transit')
            this.MyQuotation1 = element;
            // console.log(this.MyQuotation1);
         })
         // return this.MyQuotation1;
        });
        //   if(this.userControlDetail.entryType == "Business"){
        //     return this.MyQuotation[1];axaxzax
        //     //console.log(this.MyQuotation1); 
        //   }else if(this.userControlDetail.entryType == "Tourist")
        //   {
        //     return this.MyQuotation[0];
        //     //console.log(this.MyQuotation1);
        //   }else{
        //     return this.MyQuotation[2];
        //     //console.log(this.MyQuotation1);
        //   }
        // }
        
      
    }
  
  
 
  


  
  // ngAfterViewInit() {
  //   this.t.select(this.selectedVisaType);
  // }
  purposeChanged(){
    var purpose = this.purposeChooseForm.get('purposeSelected').value;
    //console.log(purpose);
    this.requireQuotation.getRequireQuotation(this.userControlDetail.country).subscribe((data : any) =>{
      this.MyQuotation = data.data;
      //console.log(this.MyQuotation);
      this.MyQuotation.forEach(element => {
       //console.log(element.purpose);
       // console.log(purpose);
        if(element.purpose == 'Tourist' && purpose == "Tourist"){
          //console.log(element);
         this.MyQuotation1 = element;
         // console.log(this.MyQuotation1);
         
       }else if(element.purpose == 'Business' && purpose == "Business"){
         this.MyQuotation1 = element;
         
       }else if(element.purpose == 'Transit' && purpose == "Transit")
         this.MyQuotation1 = element;
         // console.log(this.MyQuotation1);
      })
    })
  }


  navigateTo(purpose: any) {
    // window.location
    window.history.replaceState(
      "",
      "",
      "/visa/united-kingdom/" + purpose.nextId
    );
    // console.log("url changed");
  }
}
