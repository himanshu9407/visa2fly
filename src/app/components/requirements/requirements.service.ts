

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
@Injectable({
    providedIn: "root"
})
export class RequirementsService {
    constructor(private http: HttpClient, private userFlow : UserFlowDetails) { }
    getRequirementsData(country: string, purpose: string, entryType: string) :Promise <any> {
        let obj = {
            purpose: purpose,
            entryType: entryType
        };
        const base_url = this.userFlow.getBaseURL();

        let params = new HttpParams({ fromObject: obj });
        console.log(obj);
        return this.http.get(base_url+'info/' + country, { params: params }).toPromise();
    }
}
