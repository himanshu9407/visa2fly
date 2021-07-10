import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../login-signup/login/login.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { response } from "express";

@Injectable({
  providedIn: "root",
})
export class MyBookingsService {
  activeBooking: any;
  verifytokendetails: Array<any> = [];
  //All Booking Variable
  allBookings: Array<any> = [];
  totalItems: number;
  totalCount: number;
  searchBy: any;
  fromDate: any;
  toDate: any;
  bookingID: any;
  currentPage1: number;
  currentPage2: number;
  visa: any;
  sim: any;
  insurance: any;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private http: HttpClient,
    private userFlow: UserFlowDetails
  ) { }

  postBookingsByDateFromServer(fromDate: String, toDate: String, pageNo: Number, pageSize: Number): Observable<any> {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
      this.router.navigateByUrl["/"];
    } else {
      let reqbodyByDate = {};
      reqbodyByDate = { fromDate, toDate, pageNo, pageSize };
      const base_url = this.userFlow.getBaseURL();
      const headers = new HttpHeaders({
        token: AUTH_TOKEN,
        "visa-client": "0",
      });
      return this.http.post(base_url + "fetchBookings/bydate", reqbodyByDate, { headers: headers });
    }
  }

  fetchBooking(pageNo: number, pageSize: number): Observable<any> {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
      this.router.navigateByUrl["/"];
    } else {
      const base_url = this.userFlow.getBaseURL();
      const headers = new HttpHeaders({
        token: AUTH_TOKEN,
        "visa-client": "0",
      });

      return this.http.get(base_url + "fetchBookings/v2?pageNo=" + pageNo + "&pageSize=" + pageSize, { headers: headers });
    }
  }

  postFindBookingById(bookingId): Observable<any> {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
      this.router.navigateByUrl["/"];
    } else {
      const base_url = this.userFlow.getBaseURL();
      let reqBookingId = {};
      const headers = new HttpHeaders({
        token: AUTH_TOKEN,
        "visa-client": "0",
      });
      return this.http.post(base_url + "fetchBookings/byId/" + bookingId, reqBookingId, { headers });
    }
  }

  postBookingFindByFilter(fromDate: String, toDate: String, pageNo: Number, pageSize: Number, filterList: Array<any>): Observable<any> {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
      this.router.navigateByUrl["/"];
    } else {
      const base_url = this.userFlow.getBaseURL();
      const reqbodyByFilter = { fromDate, toDate, pageNo, pageSize, filterList };
      const headers = new HttpHeaders({
        token: AUTH_TOKEN,
        "visa-client": "0",
      });
      return this.http.post(base_url + "fetchBookings/byFilter", reqbodyByFilter, { headers: headers });
    }
  }

  postFeedback(
    bookingid: string,
    rateOne: string,
    rateTwo: string,
    rateThree: string,
    suggestion: string,
    notInterested: boolean
  ): Observable<any> {
    let feedback = {};
    let AUTH_TOKEN = this.loginService.getAuthToken();
    const headers = new HttpHeaders({ token: AUTH_TOKEN, "visa-client": "0" });
    if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
      this.router.navigateByUrl["/"];
    } else {
      feedback = {
        bookingId: bookingid,
        rateOne: rateOne,
        rateTwo: rateTwo,
        rateThree: rateThree,
        suggestion: suggestion,
        notInterested: notInterested,
      };

      // console.log(feedback);

      const base_url = this.userFlow.getBaseURL();
      return this.http.post(base_url + "feedback/submit", feedback, {
        headers: headers,
      });
      // console.log(feedback);
    }
  }

  setActiveBooking(booking: any) {
    this.activeBooking = booking;
  }

  getActiveBooking() {
    return this.activeBooking;
  }

  getCreateEvisaFromServicer(bookingId: string, bookingFrom: string): Observable<any> {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
      // this.router.navigateByUrl["/"];
    } else {
      const base_url = this.userFlow.getBaseURL();
      const headers = new HttpHeaders({ 'bookingFrom': bookingFrom, 'token': AUTH_TOKEN });

      return this.http.get(base_url + "confirmation/e-visa/" + bookingId, { headers: headers });
    }
    //  console.log(AUTH_TOKEN);
  }

  getEvisaFromServicer(bookingId: string, bookingFrom: string): Observable<any> {
    let AUTH_TOKEN = this.loginService.getAuthToken();
    if (AUTH_TOKEN == null || AUTH_TOKEN == undefined) {
      // this.router.navigateByUrl["/"];
    } else {
      const base_url = this.userFlow.getBaseURL();
      const headers = new HttpHeaders({ 'bookingFrom': bookingFrom, 'token': AUTH_TOKEN });

      return this.http.get(base_url + "download/e-visa/" + bookingId, { headers: headers, responseType: 'blob' as 'json' });
    }
    //  console.log(AUTH_TOKEN);
  }
}
