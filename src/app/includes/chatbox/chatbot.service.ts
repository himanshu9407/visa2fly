import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient, private userFlowService: UserFlowDetails) { }


  submitCallBackForm(data: any) {
    let base_url = this.userFlowService.getBaseURL();
    return this.http.post(base_url + "callBack", data);
  }
}
