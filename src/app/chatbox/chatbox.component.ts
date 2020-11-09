import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { CallBackService } from "./CallBack.service";
import { ToastService } from "../shared/toast.service";
import { Router, Event } from "@angular/router";
import {
  NavigationEnd,
  NavigationStart,
  NavigationError,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-chatbox",
  templateUrl: "./chatbox.component.html",
  styleUrls: ["./chatbox.component.css"],
})
export class ChatboxComponent implements OnInit {
  constructor(
    private callBackService: CallBackService,
    private toastService: ToastrService,
    private router: Router
  ) {}

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
    if (
      this.callBackForm.get("visa").value ||
      this.callBackForm.get("sim").value ||
      this.callBackForm.get("insurance").value ||
      this.callBackForm.get("forex").value
    ) {
      this.callBackService
        .submitCallBackForm(this.callBackForm.value)
        .subscribe((data: any) => {
          if (data.code == "0") {
            let el = document.getElementById("closeModel");
            // el.triger

            this.callBackForm.reset();
            // this.toastService.showNotification(data.message+"",4000);
            this.alertMessage = data.message;
            this.showSuccessAlert = true;
            setTimeout(() => {
              this.showSuccessAlert = false;
              (<any>$("#exampleModal")).modal("hide");
            }, 4000);
          } else {
            this.toastService.error(data.message + "");
            this.alertMessage = data.message;
            this.showErrorAlert = true;
            setTimeout(() => {
              this.showErrorAlert = false;
              (<any>$("#exampleModal")).modal("hide");
            }, 4000);
          }
        });
    }
  }
}
