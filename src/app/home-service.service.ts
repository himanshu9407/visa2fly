import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  getHomelanding() {
    return this.http.get('http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/landing')
  }
  getrequirements() {
    return this.http.get('http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/Austria')
  }
}
