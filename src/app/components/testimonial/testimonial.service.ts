import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
    providedIn : "root"
})
export class TestimonialService {


    dataArr1;
    dataArr2;
    constructor (private http : HttpClient) {}

    getTestimonials () {
        return this.http.get<any>("http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/testimonials");
    }
}