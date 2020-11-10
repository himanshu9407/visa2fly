import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";

@Injectable({
  providedIn: "root",
})
export class TestimonialService {
  constructor(private http: HttpClient, private userFlow: UserFlowDetails) {}

  getTestimonials() {
    const base_url = this.userFlow.getBaseURL();

    return this.http.get<any>(base_url + "info/testimonials");
  }
}
