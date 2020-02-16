import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { LoginService } from '../../login-signup/login/login.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';

@Injectable({
  providedIn: 'root'
})
export class B2bReqService {
  ID: string;
  b2bUserFlowDetail: any;

  constructor(private http: HttpClient, private userFlow: UserFlowDetails,
    private loginStatus: LoginStatusService, private loginService: LoginService) { }

  getRequirementsData(country: string) :Promise <any> {

    this.b2bUserFlowDetail = this.userFlow.getB2BUserFlowDetails();
    this.ID = this.b2bUserFlowDetail.id;

    const base_url = this.userFlow.getBaseURL();
    const headers = new HttpHeaders({ "id": this.ID, "visa-client": "0" });

    return this.http.get(base_url + 'b2b/redirect/country/' + country, { headers: headers }).toPromise();
  }
}
