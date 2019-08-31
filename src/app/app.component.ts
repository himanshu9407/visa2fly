import { Component } from '@angular/core';
import { HomeServiceService } from './home-service.service';
import { HomeFormService } from './components/home-form/home-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 public dummyData = {
  "code": "0",
  "status": "SUCCESS",
  "message": "Data Fetched Successfully",
  "data": {
    "countries": ["Australia", "Dubai", "Russia"],
    "data": {
      "Australia": {
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
  homeFormData :any;
  title = 'visa-App';
  users :object;
  constructor(private homeFormService: HomeFormService) {}


ngOnInit() {
}

}