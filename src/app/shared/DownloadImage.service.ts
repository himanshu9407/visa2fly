import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserFlowDetails } from './user-flow-details.service';
import { LoginService } from '../components/login-signup/login/login.service';

@Injectable({
    providedIn: "root"
})
export class DownloadImageService {

    constructor(private http: HttpClient, private userFlowDetails: UserFlowDetails,
        private loginService: LoginService) { }


    downloadImageWithUrl(url: string, bookingId: string) {
        let token = this.loginService.getAuthToken();
        if (token == null || token == undefined) {
            token = "";
        }
        // console.log(token);
        let headers = new HttpHeaders({ 'token': token, 'visa-client': "0" });
        let base_url = this.userFlowDetails.getBaseURL();
        return this.http.get(base_url + "profile" + "/downloadFile/" + bookingId + "/" + url, { headers: headers, responseType: 'blob' as 'json' });
    }

    createDownloadInvoice(bookingId: string) {
        let token = this.loginService.getAuthToken();
        if (token == null || token == undefined) {
            token = "";
        }
        // console.log(token);
        let headers = new HttpHeaders({ 'token': token, 'visa-client': "0" });
        let base_url = this.userFlowDetails.getBaseURL();
        return this.http.get(base_url + "create/invoice/" + bookingId, { headers: headers });

    }

    downloadInvoice(bookingId: string) {
      let token = this.loginService.getAuthToken();
      if (token == null || token == undefined) {
          token = "";
      }
      // console.log(token);
      let headers = new HttpHeaders({ 'token': token, 'visa-client': "0" });
      let base_url = this.userFlowDetails.getBaseURL();
      return this.http.get(base_url + "download/invoice/" + bookingId, { headers: headers, responseType: 'blob' as 'json' });

  }

    getPolicy(policyNumber: string) {
        let token = this.loginService.getAuthToken();
        if (token == null || token == undefined) {
            token = "";
        }
        // console.log(policyNumber);
        let headers = new HttpHeaders({ 'token': token, 'visa-client': "0" });
        let base_url = this.userFlowDetails.getBaseURL();
        let reqBody = {
            'policyNum': policyNumber
        }
        return this.http.post(base_url + "insurance/getPolicy", reqBody, { headers: headers });
    }

    //

    downloadPolicy(bookingId: string) {
        let token = this.loginService.getAuthToken();
        if (token == null || token == undefined) {
            token = "";
        }
        // console.log(bookingId);
        let headers = new HttpHeaders({ 'token': token, 'visa-client': "0" });
        let base_url = this.userFlowDetails.getBaseURL();
        return this.http.post(base_url + "insurance/download/policy/" + bookingId, '', { headers: headers, responseType: 'blob' as 'json' });
    }

}
