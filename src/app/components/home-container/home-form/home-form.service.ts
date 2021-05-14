import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { isPlatformBrowser } from "@angular/common";
import { Subject } from "rxjs";
import { visaFormData, visaForm } from "src/app/interfaces/visa-form";

@Injectable({
  providedIn: "root",
})
export class HomeFormService {
  homeFormData: Subject<visaFormData> = new Subject<visaFormData>();
  countryInputModel: Subject<string> = new Subject<string>();
  visaTypeInputModel: Subject<string> = new Subject<string>();
  resideInInputModel: Subject<string> = new Subject<string>();

  visaTypeList: Subject<string[]> = new Subject<string[]>();
  resideInList: Subject<string[]> = new Subject<string[]>();

  constructor(private http: HttpClient, private userFlow: UserFlowDetails) { }

  getHomeFormData() {
    return this.homeFormData;
  }

  setHomeFormData(data) {
    this.homeFormData = data;
  }

  getHomeFormDataFromServer() {
    const base_url = this.userFlow.getBaseURL();

    this.http.get<any>(base_url + 'info/landing').subscribe((res: visaForm) => {
      if (res.code === '0') {
        this.homeFormData.next(res.data);
      } else {
      }
    });
  }
}
