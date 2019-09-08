import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Injectable({
    providedIn : "root"
})
export class HomeFormService {
    homeFormData;
    constructor ( private http : HttpClient, private userFlow : UserFlowDetails ) {}



    getHomeFormData () {
        return this.homeFormData;
    }

    setHomeFormData (data) {
        this.homeFormData = data;
        console.log("data set")
    }
  getHomeFormDataFromServer () :Promise <any> {

    const base_url = this.userFlow.getBaseURL();
        
        return this.http.get<any>(base_url+"info/landing").toPromise();

          
    }


}