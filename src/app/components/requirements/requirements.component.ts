import { element } from 'protractor';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeServiceService } from '../../home-service.service';
import { requirementData } from '../../interfaces/requirement';
import { RequirementsService } from './requirements.service';
import { RequirementsModel } from './requirements.model';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { RouterHistory } from 'src/app/shared/router-history.service';
import { ToastService } from 'src/app/shared/toast.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../login-signup/login/login.service';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css'],
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
export class RequirementsComponent implements OnInit {
  public regData : requirementData ;

  
  requirement:requirementData = {"code":"0","status":"SUCCESS","message":"Data Fetched Successfully","data":{"country":"Austrailia","passportValidityPeriod":"6 months","minAccountBalanceRquired":"2 lakh","minAccountBalanceMaintainbilityPeriod":"2 months",
  "quotes":[{"purpose":"TOURIST","enrtyType":"SINGLE_ENTRY","periodTime":"30 Days","currency":"INR","price":6562,"processingTime":"3-5 Days","validity":"58 Days"},
  {"purpose":"TOURIST","enrtyType":"MULTIPLE_ENTRY","periodTime":"30 Days","currency":"INR","price":16100,"processingTime":"3-5 Days","validity":"58 Days"},
  {"purpose":"TOURIST","enrtyType":"SINGLE_ENTRY","periodTime":"90 Days","currency":"INR","price":18580,"processingTime":"3-5 Days","validity":"58 Days"},
  {"purpose":"TOURIST","enrtyType":"MULTIPLE_ENTRY","periodTime":"90 Days","currency":"INR","price":34613,"processingTime":"3-5 Days","validity":"58 Days"},
  {"purpose":"TRANSIT","enrtyType":null,"periodTime":"96 Hrs","currency":"INR","price":5151,"processingTime":"3-5 Days","validity":"58 Days"}],
  "cancelationPeriod":2,"createdAt":null,"updatedAt":null,"onlineCategory":true,"active":true,
  "fieldDetails":[{"fieldName":"passport","display":true,"content":"Scanned colour copy of the of Front and Back pages of Passport, if address is not mentioned on last page then require color scan copy of Address page as well. (Passport copy should be color only)"},
  {"fieldName":"flight","display":true,"content":"scanned copy of flight books"}]}};
  
  public onlinestatus:boolean = false;

  public requirementsData : any ;
   public userFlowDetails : any;
   
   public faqs : Array<any> = []  ;
   public dataSource : Array<{id:string,dataToggle:string, dataToggleHash:string}> = [];

   
   public mainArr:Array<any> = [[]];
   public mobileMainArr:Array<any> = [[]];
   
   public selectedDataArr: Array<any> = [this.mainArr[0][0]];
   public mobileSelectedDataArr:Array<any> = [this.mobileMainArr[0][0]];

   public showRequirementsDetailArr = [ true ]
   public mobileShowRequirementsDetailArr = [ true ]
   public purposeApiNew : Array<any> = [];
   public purposeApi : Array<any> = [];
   public quotes = [];
   public selectedPurposeType : any;
   public selectedCountrytype : any;
   public importantInfo : Array<any> = [];
   businessArr : Array<any> = [];
   touristArr : Array<any> = [];
   transitArr : Array<any> = [];   
   MyQuotation : Array<any> = [];
   Quotation : Array<any> = [];
   public imageCatogory : Array<any> = [];
   public imageCatogoryBusinessTemp : Array<any> = [];
   public imageCatogoryTouristTemp : Array<any> = [];
   public imageCatogoryTransitTemp : Array<any> = [];
   public imageCatogoryTemp : Array<any> = [];
  public imageUpload1 : Array<any> = [];
   
   purposeChooseForm1: FormGroup;
   constructor(private router: Router,private myservice: HomeServiceService, 
     private reqService : RequirementsService,
               private userFlow : UserFlowDetails, private routerHistory  :RouterHistory,
               private toastService :ToastService, private loginStatus : LoginStatusService,
               private loginService : LoginService, private preloaderService : PreloaderService,
               private activateRoute : ActivatedRoute) {

                this.userFlowDetails = this.userFlow.getUserFlowDetails();
                // console.log(this.userFlowDetails);
                this.activateRoute.params.subscribe((params :any) => {
                  this.selectedPurposeType = params.purpose;
                  //console.log(this.selectedPurposeType);
                  this.selectedCountrytype = params.country;
                  //console.log(this.selectedCountrytype);
                  
                });
                let tempPurpose = this.selectedPurposeType; 
                  //console.log(tempPurpose);
                    this.purposeChooseForm1 = new FormGroup({
                      'purposeSelected': new FormControl(tempPurpose)
                    });
                  //Api Call
                  this.reqService.getRequirementsData(this.selectedCountrytype)
                  .then((data : any )=> {
                    console.log(data);
                  if (data.code == "0") {
                    this.requirementsData = data;
                    console.log(data.data);
                    this.Quotation = data.data.displayQuotes;
                    //console.log(this.Quotation);
                    this.Quotation.forEach(element => {
                      
                      this.purposeApi.push(element.purpose);
                      //console.log(this.purposeApi);
                      if(element.purpose == 'Tourist')
                      {
                        this.touristArr.push(element);
                      }else if(element.purpose == 'Business')
                      {
                        this.businessArr.push(element);
                      }else{
                        this.transitArr.push(element);
                      }
                    });
            
                    //Fetch Value From quotation and remove dublicate
                    for(var value of this.purposeApi){
                      if(this.purposeApiNew.indexOf(value) === -1) {
                        this.purposeApiNew.push(value);
                      }
                    }
                    
                    
                    let purposeMain = this.selectedPurposeType;
                    let purposeUrl = purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
                    var newImageCatogoryPurpose = purposeMain.toUpperCase();
                    if(purposeUrl == 'Business')
                    {
                      this.MyQuotation = this.businessArr;
            
                    }else if(purposeUrl == 'Tourist')
                    {
                      this.MyQuotation = this.touristArr;
            
                    }else if(purposeUrl == 'Transit'){
                      this.MyQuotation = this.transitArr;
            
                    }else{
                      this.router.navigate(['visa/']);
                    }
                    //console.log(this.MyQuotation);
                    this.importantInfo = data.data.importantInfo;
                    // console.log(this.importantInfo);
                    this.onlinestatus = data.data.onlineCategory;
                    let tempFaqs = data.data.faqs; 
                    // console.log(tempFaqs);
            
                    for (let key in tempFaqs) {
                      let tempFaqObj = {title:key,content : tempFaqs[key]};
                      this.faqs.push(tempFaqObj);
                    }
            
                    this.faqs.forEach((element,index) => {
                      let  temp = {id:"",dataToggle:"",dataToggleHash:""};
                      temp.id = "Traveller "+index;
                      temp.dataToggle = "toogle"+index;
                      temp.dataToggleHash = "#toogle"+index;
                      this.dataSource.push(temp);
                    });
            
                    // console.log(this.faqs);
                    
                    this.imageCatogory.push(data.data.imageUploadInfo);
                    //  console.log(this.imageCatogory);
                    //  this.imageCatogory.forEach((element) => {
                    //    console.log(element);
                    //   if(element == 'BUSINESS')
                    //   {
                    //     this.imageCatogoryBusinessTemp.push(element);

                    //   }else if(element == 'TOURIST')
                    //   {
                    //     this.imageCatogoryTouristTemp.push(element);
                    //   }else {
                    //     this.imageCatogoryTransitTemp.push(element);
                    //   }
                    // })
                    this.imageCatogoryBusinessTemp = this.imageCatogory[0]['BUSINESS'];
                    //console.log(this.imageCatogoryBusinessTemp);
                    this.imageCatogoryTouristTemp = this.imageCatogory[0]['TOURIST'];
                    //console.log(this.imageCatogoryTouristTemp);
                    this.imageCatogoryTransitTemp = this.imageCatogory[0]['TRANSIT'];
                    //console.log(this.imageCatogoryTransitTemp);
                    //console.log(this.imageCatogoryBusinessTemp);
                   // var purposeTemp = this.selectedPurposeType;

                    if(purposeUrl == 'Business'){

                      this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;

                    }else if(purposeUrl == 'Tourist')
                    {
                      this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
                    }else{
                      this.imageCatogoryTemp = this.imageCatogoryTransitTemp
                    }

                    
                    let temp1 = JSON.parse(localStorage.getItem("userFlowDetails"));
                    this.userFlow.setUserFlowDetails("onlineCountry",JSON.stringify(data.data.onlineCategory));
                    // let imgDat = JSON.stringify(this.imageCatogoryTemp);
            
                    // if (imgDat == "null") {
                    //   this.userFlow.setUserFlowDetails("imageUploads",'[]');
                    // }
                    // else {
                    //   this.userFlow.setUserFlowDetails("imageUploads",JSON.stringify(this.imageCatogoryTemp));
                    // }
                    // this.userFlow.setUserFlowDetails("imagesRequired");
                    // this.quotes = data.data.quotes;
                    //this.quotes = data.data.displayQuotes;
                    this.imageUpload1 = this.imageCatogoryTemp;
                    let temp = [];
                    let i,j,temparray,chunk = 4;
                    
                    this.mainArr = []
                  
                    for (i=0,j=data.data.fieldDetails.length; i<j; i+=chunk) {
                      temparray = data.data.fieldDetails.slice(i,i+chunk);
                      this.mainArr.push(temparray);
                      console.log(this.mainArr);
                    }
            
            
                    let i1,j1,temparray1,chunk1 = 2;
                    
                    this.mobileMainArr = []
                  
                    for (i1=0,j1=data.data.fieldDetails.length; i1<j1; i1+=chunk1) {
                      temparray1 = data.data.fieldDetails.slice(i1,i1+chunk1);
                      this.mobileMainArr.push(temparray1);
                  
                    }
                   
                    
                    this.showRequirementsDetailArr = []
                    this.selectedDataArr = []
                    for (let  k =0;k<this.mainArr.length;k++) {
                      //console.log(this.mainArr[k][0]);
                      this.selectedDataArr.push(this.mainArr[k][0]);
                      // console.log(this.selectedDataArr);
                      if (k == 0) {
            
                        this.showRequirementsDetailArr.push(true);
                        // console.log(this.showRequirementsDetailArr);
                      }
                      else {
                        this.showRequirementsDetailArr.push(false);
                      }
                    }
                    this.mobileShowRequirementsDetailArr = []
                    this.mobileSelectedDataArr = []
            
                    for (let  k =0;k<this.mobileMainArr.length;k++) {
            
                      this.mobileSelectedDataArr.push( this.mobileMainArr[k][0]);
            
                      if (k ==0) {
            
                        this.mobileShowRequirementsDetailArr.push(true);
                      }
                      else {
                        this.mobileShowRequirementsDetailArr.push(false);
                      }
                    }
            
                    
                    // console.log(this.selectedDataArr);
              
            
                  }
            
                 
            
                });
                
              }
            
              navigate(quoteId : string,basePrice : number, serviceTax : number, stayPeriod:string, imageUploads : string) {
                
                this.preloaderService.showPreloader(true);
            
                this.userFlow.setUserFlowDetails("quoteId",quoteId);
                //console.log(quoteId);
                this.userFlow.setUserFlowDetails("basePrice",JSON.stringify(basePrice));
                this.userFlow.setUserFlowDetails("serviceTax",JSON.stringify(serviceTax));
                this.userFlow.setUserFlowDetails("stayPeriod",stayPeriod);
                this.userFlow.setUserFlowDetails("imageUploads", JSON.stringify(this.imageUpload1));
            
                 //console.log(quoteId);
            
                let token = this.loginService.getAuthToken();
                if (token == null || token ==  undefined) {
                  token = "";
                }
                this.loginStatus.verifyAuthToken(token).subscribe (
                  (data : any) => {
                    if (data.code == "0") {
                      
                      this.reqService.verifyQuotation(quoteId).subscribe(
                        (data : any) => {
                          if (data.code == "0") {
                            this.routerHistory.pushHistory("visa-requirement");
                            this.router.navigate(['addTraveller']);
            
                            // setTimeout(() => {
                              
                              this.preloaderService.showPreloader(false);
                           // }, 2000);
                            
                          }
                          else {
                            this.toastService.showNotification(""+data.message, 4000);
                            this.preloaderService.showPreloader(false);
                        }
                        }
                      );
                    }
                    else if(data.code == "301") {
                      this.loginService.setAuthToken("");
                      this.loginStatus.setUserStatus(false);
                      this.loginStatus.setUserLoggedIn(false);
                      // this.router.navigate(['visa']);
                      this.preloaderService.showPreloader(false);
                      localStorage.setItem("profile",JSON.stringify({}));
                      this.routerHistory.pushHistory("req-and-quote");
                      this.router.navigate(['slcontainer/login']);
                      this.preloaderService.showPreloader(false);
                  }
                    else {
                      this.routerHistory.pushHistory("req-and-quote");
                      this.router.navigate(['slcontainer/login']);
                      this.preloaderService.showPreloader(false);
                    }
                    
                  }
                )
            
  
                
    }
    
  onClickRequrements(i,j, item){
    // console.log(item);
    
    if (this.showRequirementsDetailArr[i] == true && this.selectedDataArr[i].fieldName == this.mainArr[i][j].fieldName) {
      this.showRequirementsDetailArr[i] = false;

      
    }

    else if (this.selectedDataArr[i].fieldName == this.mainArr[i][j].fieldName && this.showRequirementsDetailArr[i] == false) {
      this.showRequirementsDetailArr[i] = true;
    }
    else {
      console.log("else");
      this.showRequirementsDetailArr[i] = true;

    }


    this.selectedDataArr[i] = this.mainArr[i][j];
    console.log(this.selectedDataArr[i]);

  }
  purposeChanged(){
    var purpose = this.purposeChooseForm1.get('purposeSelected').value;
    //console.log(purpose);
    var country = this.selectedCountrytype;
    // console.log(country);
    window.history.replaceState(
      "",
      "",
      "visa-requirement/" + country + "/" + purpose
    );
    // console.log(this.businessArr);
    // let tempPurpose = this.selectedPurposeType;
    // this.purposeChooseForm1.get('purposeSelected').setValue(tempPurpose);
    if(purpose == 'Tourist')
      {
        this.MyQuotation = this.touristArr;
        this.imageUpload1 = this.imageCatogoryTouristTemp;
        
        //this.t.select("Tourist");

      }else if(purpose == 'Business')
      {
        this.MyQuotation = this.businessArr;
        this.imageUpload1 = this.imageCatogoryBusinessTemp;
        //this.t.select("Business");
      }else
      {
        this.MyQuotation = this.transitArr;
        this.imageUpload1 = this.imageCatogoryTransitTemp;
        //this.t.select("Transit");
      }
      //console.log(this.imageCatogoryTemp);
      // console.log(this.MyQuotation);
      
  }

  onClickRequrementsMobile(i,j, item){
    
    if (this.mobileShowRequirementsDetailArr[i] == true && this.mobileSelectedDataArr[i].fieldName == this.mobileMainArr[i][j].fieldName) {
      this.mobileShowRequirementsDetailArr[i] = false;
    }

    else if (this.mobileSelectedDataArr[i].fieldName == this.mobileMainArr[i][j].fieldName) {
      this.mobileShowRequirementsDetailArr[i] = true;
    }
    else {
      this.mobileShowRequirementsDetailArr[i] = true;

    }


    this.mobileSelectedDataArr[i] = this.mobileMainArr[i][j];

    
    

    
  
  }


  ngOnInit() {

    

    
  
  
  
    

   
  }

  
  // navigateTo(purpose: any) {
  //   // window.location
  //   //let urlpurpose = this.MyQuotation1
  //   var country = this.selectedCountrytype;
  //   // console.log(country);
  //   let purposeString : string = purpose.nextId;
  //    //console.log(purposeString);
  //   let purposeUrl = purposeString.charAt(0).toUpperCase() + purposeString.slice(1);
  //   let Purposetemper = this.purposeChooseForm1.get('purposeSelected').setValue(purposeUrl);
  //   if(purposeUrl == 'Tourist')
  //     {
  //       this.MyQuotation = this.touristArr;
  //       //this.t.select("Tourist");

  //     }else if(purposeUrl == 'Business')
  //     {
  //       this.MyQuotation = this.businessArr;
  //       //this.t.select("Business");
  //     }else
  //     {
  //       this.MyQuotation = this.transitArr;
  //       //this.t.select("Transit");
  //     }
  //      // console.log(this.MyQuotation1);
  //   window.history.replaceState(
  //     "",
  //     "",
  //     "visa-requirement/" + country + "/" + purposeUrl
  //   );
  //   // console.log("url changed");
  
//}


}
