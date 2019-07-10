import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HomeServiceService } from '/Users/sahilkukreja/visatofly/29052019/ts-web/src/app/home-service.service';


@Component({
selector: 'app-home-form',
templateUrl: './home-form.component.html',
styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent  {


  constructor(private router: Router,private httpClient: HttpClient,private myservice: HomeServiceService ) { }
    public myobj: any;
    landing={ "code": "0", "status": "SUCCESS", "message": "Data Fetched Successfully", "data": [
      { "countryName": "Austrailia", "purpose": [ "BUSINESS", "TOURIST" ], "entryType": [ "SINGLE_ENTRY" ], 
      "residenceOf": [ "Delhi", "Noida", "Gurgaon" ] },
    { "countryName": "Dubai",
      "purpose": [ "BUSINESS", "TOURIST" ],
      "entryType": [ "SINGLE_ENTRY", "MULTIPLE_ENTRY" ],
      "residenceOf": [ "Delhi", "Noida", "Gurgaon" ]
    } 
    ]
};

    public show:boolean = false;
  
    ngOnInit () { 
      this.myobj= this.myservice.getHomelanding();
      console.log(this.myobj);
    }
  
    toggle() {
      this.show = !this.show;
    }
   
    navigate() {
      this.router.navigate(['reg']);
}
  }
  