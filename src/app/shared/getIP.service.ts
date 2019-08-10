import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class GetIPService {

    constructor(private http : HttpClient) {}




    getClientIP () {
        // let params = new HttpParams().se;
       return this.http.get<any>('https://api.ipify.org?format=json');
    }
    
}