import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Injectable({
  providedIn: 'root'
})
export class B2bSimService {

  constructor(private http : HttpClient , private userFlowService: UserFlowDetails) { }

  getSimcountries (id: string) {
    const header = new HttpHeaders({'id' : id, "visa-client" : "0"})
    let base_url = this.userFlowService.getBaseURL();
    return this.http.get(base_url+"sim/fetch/countries", {headers: header});
  }

  getSimPlans (country : string, id: string) {
    let base_url = this.userFlowService.getBaseURL();
    const header = new HttpHeaders({'id' : id, "visa-client" : "0"})
    const params = new HttpParams().set("countryName", country);
    return this.http.get(base_url + 'b2b/redirect/sim/fetch/plans',{params:params, headers: header});

  }
}
