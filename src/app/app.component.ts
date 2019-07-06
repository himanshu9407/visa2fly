import { Component } from '@angular/core';
import { HomeServiceService } from './home-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  people: any[] = [
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
    },
    {
      "name": "Cook  Tyson"
    }
  ];
  title = 'visa-App';
  users :object;
  constructor(private myservice: HomeServiceService) {}


ngOnInit() {
  this.myservice.getHomelanding();
}

}