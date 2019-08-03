import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HomeServiceService } from '../../home-service.service';
import { home_formData } from 'src/app/interfaces/home_formData';


@Component({
selector: 'app-home-form',
templateUrl: './home-form.component.html',
styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent  {
public  landing:home_formData={ "code": "0", "status": "SUCCESS", "message": "Data Fetched Successfully", "data": [
  { "countryName": "Austrailia", "purpose": [ "BUSINESS", "TOURIST" ], "entryType": [ "SINGLE_ENTRY" ], 
  "residenceOf": [ "Delhi", "Noida", "Gurgaon" ] },
]
};
;

  constructor(private router: Router,private httpClient: HttpClient,private myservice: HomeServiceService ) { }
  
    public show:boolean = false;
  
    ngOnInit () { 
      console.log(this.landing);
      this.myservice.get_landing().subscribe((res : home_formData)=>{
        this.landing = res;
        console.log(this.landing);
      });
    }
  
    toggle() {
      this.show = !this.show;
    }
   
    navigate() {
      this.router.navigate(['reg']);
}
  }
  