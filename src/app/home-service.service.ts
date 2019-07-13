import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { map, catchError } from 'rxjs/operators';


import { HttpHeaders } from '@angular/common/http';

headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  //  httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //   })
  // };
  url:String='http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/';
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  getHomelanding() {
    this.http.get('landing')
    .pipe(map((response : Response) => {
        return response.json();   
    }));
  }
  getrequirements() {
    this.http.get('http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/Australia')
    .pipe(map((response : Response) => {
        return response.json();   
    }));
  }

 
}
