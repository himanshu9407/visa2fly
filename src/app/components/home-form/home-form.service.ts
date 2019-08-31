import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn : "root"
})
export class HomeFormService {
    homeFormData;
    constructor ( private http : HttpClient ) {}



    getHomeFormData () {
        return this.homeFormData;
    }

    setHomeFormData (data) {
        this.homeFormData = data;
        console.log("data set")
    }
  getHomeFormDataFromServer () :Promise <any> {
        
        return this.http.get<any>("http://staging2.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/landing").toPromise();

          
    }


}