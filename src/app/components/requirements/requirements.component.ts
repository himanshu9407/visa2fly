import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { HomeServiceService } from '../../home-service.service';
import { requirementData } from '../../interfaces/requirement';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {
  public regData : requirementData ;

  constructor(private router: Router,private myservice: HomeServiceService) {

   
   }

  requirement:requirementData = {"code":"0","status":"SUCCESS","message":"Data Fetched Successfully","data":{"country":"Austrailia","passportValidityPeriod":"6 months","minAccountBalanceRquired":"2 lakh","minAccountBalanceMaintainbilityPeriod":"2 months",
  "quotes":[{"purpose":"TOURIST","enrtyType":"SINGLE_ENTRY","periodTime":"30 Days","currency":"INR","price":6562,"processingTime":"3-5 Days","validity":"58 Days"},
  {"purpose":"TOURIST","enrtyType":"MULTIPLE_ENTRY","periodTime":"30 Days","currency":"INR","price":16100,"processingTime":"3-5 Days","validity":"58 Days"},
  {"purpose":"TOURIST","enrtyType":"SINGLE_ENTRY","periodTime":"90 Days","currency":"INR","price":18580,"processingTime":"3-5 Days","validity":"58 Days"},
  {"purpose":"TOURIST","enrtyType":"MULTIPLE_ENTRY","periodTime":"90 Days","currency":"INR","price":34613,"processingTime":"3-5 Days","validity":"58 Days"},
  {"purpose":"TRANSIT","enrtyType":null,"periodTime":"96 Hrs","currency":"INR","price":5151,"processingTime":"3-5 Days","validity":"58 Days"}],
  "cancelationPeriod":2,"createdAt":null,"updatedAt":null,"onlineCategory":true,"active":true,
  "fieldDetails":[{"fieldName":"passport","display":true,"content":"Scanned colour copy of the of Front and Back pages of Passport, if address is not mentioned on last page then require color scan copy of Address page as well. (Passport copy should be color only)"},
  {"fieldName":"flight","display":true,"content":"scanned copy of flight books"}]}};
  
  public onlinestatus:boolean = this.requirement.data.onlineCategory;



  ngOnInit() {
    // this.myservice.get_requriements().subscribe((res : requirementData)=>{
    //   this.requirement = res;
    //   console.log(this.requirement.data.country);
    // });
    // this.requirement=this.regData;
  }
  navigate() {
    console.log("before");
    this.router.navigate(['addTraveller']);
    console.log("after");
  }

}
