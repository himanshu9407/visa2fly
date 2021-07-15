import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, Event } from "@angular/router";
import {
  NavigationEnd,
  NavigationStart,
  NavigationError,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ChatbotService } from "./chatbot.service";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"],
})
export class ChatboxComponent implements OnInit {
  name_error: boolean;
  cell_error: boolean;
  emailId_error: boolean;
  chatbootError: boolean;
  constructor(
    private callBackService: ChatbotService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  callBackForm: FormGroup;
  alertMessage: string;
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;

  ngOnInit() {
    this.callBackForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      cell: new FormControl("", [Validators.required]),
      emailId: new FormControl("", []),
      visa: new FormControl(false),
      sim: new FormControl(false),
      insurance: new FormControl(false),
      forex: new FormControl(false),
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // document.getElementById("chat-submit").click();
      }

      if (event instanceof NavigationError) {
        // Handle error
        // console.error(event.error);
      }

      if (event instanceof NavigationEnd) {
        //do something on end activity
        // console.log("end");
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let url: string = event.url;
        let arr = url.split("/");

        arr[arr.length - 1] = arr[arr.length - 1].split("?")[0];

        if (
          arr[1] == "visa-requirement" ||
          arr[1] == "freeVisa" ||
          arr[1] == "visaOnArrival" ||
          arr[1] == "profile" ||
          arr[1] == "payment" ||
          arr[1] == "myBookings" ||
          arr[1] == "bookingDetail" ||
          arr[1] == "visa-requirements" ||
          arr[1] == "addTraveller" ||
          event.url == "/sim/checkout" ||
          // arr[1] == "slcontainer" ||
          arr[1] == "tnc" ||
          arr[1] == "privacyPolicy" ||
          arr[1] == "cookiePolicy" ||
          arr[1] == "cancellationPolicy" ||
          arr[1] == "404" ||
          arr[1] == "About-Us" ||
          arr[1] == "offers" ||
          arr[1] == "insurance" ||
          arr[1] == "australia-visa-online" ||
          arr[1] == "austria-visa-online" ||
          arr[1] == "antigua & barbuda-visa-online" ||
          arr[1] == "armenia-visa-online" ||
          arr[1] == "bahrain-visa-online" ||
          arr[1] == "bhutan-visa-online" ||
          arr[1] == "belgium-visa-online" ||
          arr[1] == "azerbaijan-visa-online" ||
          arr[1] == "brazil-visa-online" ||
          arr[1] == "ukraine-visa-online" ||
          arr[1] == "china-visa-online" ||
          arr[1] == "canada-visa-online" ||
          arr[1] == "cambodia-visa-online" ||
          arr[1] == "denmark-visa-online" ||
          arr[1] == "dubai-visa-online" ||
          arr[1] == "egypt-visa-online" ||
          arr[1] == "ethiopia-visa-online" ||
          arr[1] == "estonia-visa-online" ||
          arr[1] == "finland-visa-online" ||
          arr[1] == "france-visa-online" ||
          arr[1] == "georgia-visa-online" ||
          arr[1] == "germany-visa-online" ||
          arr[1] == "iraq-visa-online" ||
          arr[1] == "japan-visa-online" ||
          arr[1] == "kenya-visa-online" ||
          arr[1] == "malaysia-visa-online" ||
          arr[1] == "maldives-visa-online" ||
          arr[1] == "malta-visa-online" ||
          arr[1] == "new-zealand-visa-online" ||
          arr[1] == "south-africa-visa-online" ||
          arr[1] == "netherlands-visa-online" ||
          arr[1] == "russia-visa-online" ||
          arr[1] == "rwanda-visa-online" ||
          arr[1] == "singapore-visa-online" ||
          arr[1] == "spain-visa-online" ||
          arr[1] == "sri-lanka-visa-online" ||
          arr[1] == "swiss-visa-online" ||
          arr[1] == "taiwan-visa-online" ||
          arr[1] == "tajikistan-visa-online" ||
          arr[1] == "thailand-visa-online" ||
          arr[1] == "turkey-visa-online" ||
          arr[1] == "uae-visa-online" ||
          arr[1] == "uk-visa-online" ||
          arr[1] == "usa-visa-online" ||
          arr[1] == "uzbekistan-visa-online" ||
          arr[1] == "vietnam-visa-online" ||
          arr[1] == "zambia-visa-online"
        ) {
          this.chatbootError = true;
          // this.footerForLoginSign = false;
          // this.footerForOther = true;
        } else if(arr[1] == "slcontainer") {
          this.chatbootError = false;
          // this.footerForLoginSign = true;
          // this.footerForOther = false;
        } else {
          this.chatbootError = true;
          // this.footerForLoginSign = false;
          // this.footerForOther = true;
        }
      }
    });

    $(function () {
      $("#chat-circle").click(function () {
        (<any>$("#chat-circle")).toggle("scale");
        (<any>$(".chat-box")).toggle("scale");
      });

      $(".chat-box-toggle").click(function () {
        (<any>$("#chat-circle")).toggle("scale");
        (<any>$(".chat-box")).toggle("scale");
      });
    });
  }

  onSubmit() {
    this.validateChatbotForm();
    if (this.callBackForm.valid) {
      if (
        this.callBackForm.get("visa").value ||
        this.callBackForm.get("sim").value ||
        this.callBackForm.get("insurance").value ||
        this.callBackForm.get("forex").value
      ) {
        this.showSuccessAlert = true;
        this.callBackService
          .submitCallBackForm(this.callBackForm.value)
          .subscribe((data: any) => {
            if (data.code == "0") {
              let el = document.getElementById("closeModel");
              this.callBackForm.reset();
              this.alertMessage = data.message;
              this.showSuccessAlert = false;
              this.toastService.success("Your callback request is submitted successfully.");
              (<any>$("#chat-circle")).toggle("scale");
              (<any>$(".chat-box")).toggle("scale");
            } else {
              this.toastService.error(data.message + "");
              this.alertMessage = data.message;
              this.showErrorAlert = true;
              setTimeout(() => {
                this.showErrorAlert = false;
                this.showSuccessAlert = false;
                (<any>$("#chat-circle")).toggle("scale");
                (<any>$(".chat-box")).toggle("scale");
              }, 4000);
            }
          });
      } else {
        this.toastService.error("Choose at least one service.");
      }
    }

  }

  validateChatbotForm() {
    let name_input = this.callBackForm.get('name');
    let cell_input = this.callBackForm.get('cell');

    this.name_error = name_input.value == null || name_input.value == undefined || name_input.value == "";
    this.cell_error = cell_input.value == null || cell_input.value == undefined || cell_input.value == "";

  }
}
