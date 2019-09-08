

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
        return this.http.get('https://staging2.visa2fly.com/info/' + country, { params: params }).toPromise();
    }
}
