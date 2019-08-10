import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { HttpHeaders } from '@angular/common/http';
import { Observable, from } from "rxjs";  
import { requirementData } from './interfaces/requirement';
import { home_formData } from './interfaces/home_formData';
import{testimonialsData} from './interfaces/testimonials';

headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
@Injectable({
  providedIn: 'root'
})    
export class HomeServiceService {
  
  // baseUrl:String='http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/';
  // constructor(private http: HttpClient) { }
  // get_requriements() : Observable<requirementData>{
  //   return this.http.get<requirementData>(this.baseUrl+'Austrailia');
  // }
  // get_landing() : Observable<home_formData>{
  //   return this.http.get<home_formData>(this.baseUrl+'landing');
  // }
  // get_testimonials() : Observable<testimonialsData>{
  //   return this.http.get<testimonialsData>(this.baseUrl+'testimonials');
  // }
}
