import { Injectable } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from '../login-signup/login/login.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VisaRequirementService {

  constructor(private http: HttpClient, private userFlow : UserFlowDetails,
    private loginStatus : LoginStatusService, private loginService : LoginService ) {
      
     }

    getRequireQuotation(country : String){
      const base_url = this.userFlow.getBaseURL();
      return this.http.get(base_url + 'info/' + country + '/quotation');
    }

}
