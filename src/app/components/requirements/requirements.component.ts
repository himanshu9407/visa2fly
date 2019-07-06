import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeServiceService } from '/Users/sahilkukreja/visatofly/29052019/ts-web/src/app/home-service.service';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {

  
  constructor(private router: Router,private myservice: HomeServiceService) { }
  public documents: any[] = [
    {
      "name": "Douglas  Pace"
    },
    {
      "name": "Mcleod  Mueller"
    },
    {
      "name": "Day  Meyers"
    },
    {
      "name": "Aguirre  Ellis"
    }
  ];
  data: any={};
 
  public requirementdata$: object;
  public onlinestatus:boolean = false;


  ngOnInit() {
    this.myservice.getrequirements();}
  navigate() {
    this.router.navigate(['addTraveller']);
}

}
