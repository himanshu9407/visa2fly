import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GetIPService {
  constructor(private http: HttpClient) {}

  getClientIP() {
    return this.http.get("https://api.ipify.org?format=json");
  }
}
