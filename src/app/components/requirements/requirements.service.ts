

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: "root"
})
export class RequirementsService {
    constructor(private http: HttpClient) { }
    getRequirementsData(country: string, purpose: string, entryType: string) :Promise <any> {
        let obj = {
            purpose: purpose,
            entryType: entryType
        };
        let params = new HttpParams({ fromObject: obj });
        console.log(obj);
        return this.http.get('http://staging2.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/' + country, { params: params }).toPromise();
    }
}
