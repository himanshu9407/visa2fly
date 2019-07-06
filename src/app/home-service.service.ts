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
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  getHomelanding() {
    return this.http.get('http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/landing')
    .subscribe( (data) => console.log(JSON.stringify(data)));
  }
  getrequirements() {
    return this.http.get('http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/Austrailia')
    .subscribe( (data) => console.log(JSON.stringify(data)));
  }
  getTravellers(){
    this.http.get('http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/landing')
    .pipe(map((response : Response) => {
        return response.json();   
    }));
  //   this.http.get(`http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/landing`)
  //  .subscribe( (data) => console.log(JSON.stringify(data)));
}
}
