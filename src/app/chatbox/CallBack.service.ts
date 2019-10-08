import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserFlowDetails } from '../shared/user-flow-details.service';

@Injectable({
    providedIn :"root"
})
export class CallBackService {
    constructor (private  http : HttpClient, private userFlowService : UserFlowDetails) {}


    submitCallBackForm(data : any) {
        let base_url = this.userFlowService.getBaseURL();
        return this.http.post(base_url+"callBack",data);
    }
}