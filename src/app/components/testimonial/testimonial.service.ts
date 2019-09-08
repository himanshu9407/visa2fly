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
        return this.http.get<any>("https://staging2.visa2fly.com/info/testimonials");
    }
}