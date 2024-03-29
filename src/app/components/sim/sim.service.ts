import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Injectable({
    providedIn: "root"
})
export class SimService {
    constructor(private http: HttpClient, private userFlowService: UserFlowDetails) { }

    getSimcountries() {
        let base_url = this.userFlowService.getBaseURL();
        return this.http.get(base_url + "sim/fetch/countries");
    }

    getSimPlans(country: string) {
        let base_url = this.userFlowService.getBaseURL();
        const params = new HttpParams().set("countryName", country);
        return this.http.get(base_url + 'sim/fetch/plans', { params: params });

    }
}