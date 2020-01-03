import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastService } from 'src/app/shared/toast.service';
import { RequirementsService } from '../../requirements/requirements.service';
import { RouterHistory } from 'src/app/shared/router-history.service';
import { LoginService } from '../../login-signup/login/login.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { B2bReqService } from './b2b-req.service';

@Component({
  selector: 'app-b2b-req',
  templateUrl: './b2b-req.component.html',
  styleUrls: ['./b2b-req.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.3s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('0.4s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class B2bReqComponent implements OnInit {
  userControlDetail: any;
  selectedVisaType: any;
  MyQuotation: any;
  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];
  selectedCountry: any;
  MyQuotation1: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router, 
    private userFlow : UserFlowDetails,private loginStatus : LoginStatusService,
    private loginService : LoginService, private preloaderService : PreloaderService,
    private routerHistory  :RouterHistory,
    private b2bReq: B2bReqService,private toastService :ToastService) {
      this.userControlDetail = this.userFlow.getUserFlowDetails();
       
       this.activeRoute.params.subscribe((params : any) =>{
         this.selectedVisaType = params.purpose;
         this.selectedCountry = params.country;
         console.log(this.selectedCountry);
       });

       this.b2bReq.getRequirementsData(this.selectedCountry).subscribe((res : any) => {
        console.log(res);
        if(res.code == 0){
          this.MyQuotation = res.data.displayQuotes;
          //console.log(this.MyQuotation);
          this.MyQuotation.forEach((element) => {
            
            if(element.purpose == 'Business'){
            this.businessArr.push(element);
           // console.log(this.businessArr);
          }else if(element.purpose == 'Tourist'){
            this.touristArr.push(element);
            //console.log(this.touristArr);
          }else if(element.purpose == 'Transit'){
            this.transitArr.push(element);
           // console.log(this.transitArr);
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
 
     }

  ngOnInit() {

    
  }

}
