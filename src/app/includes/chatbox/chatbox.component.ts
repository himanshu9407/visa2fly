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
