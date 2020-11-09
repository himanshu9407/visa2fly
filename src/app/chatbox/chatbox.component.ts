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
import { ToastrService } from 'ngx-toastr';

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
    // var INDEX = 0;
    // $("#chat-submit").click(function (e) {
    //   e.preventDefault();
    //   var msg = $("#chat-input").val();
    //   if (msg.trim() == "") {
    //     return false;
    //   }
    //   generate_message(msg, "self");
    //   var buttons = [
    //     {
    //       name: "Existing User",
    //       value: "existing",
    //     },
    //     {
    //       name: "New User",
    //       value: "new",
    //     },
    //   ];
    //   setTimeout(function () {
    //     generate_message(msg, "user");
    //   }, 1000);
    // });

    // function generate_message(msg, type) {
    //   INDEX++;
    //   var str = "";
    //   str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
    //   str += '          <span class="msg-avatar">';
    //   str +=
    //     '            <img src="https://image.crisp.im/avatar/operator/196af8cc-f6ad-4ef7-afd1-c45d5231387c/240/?1483361727745">';
    //   str += "          </span>";
    //   str += '          <div class="cm-msg-text">';
    //   str += msg;
    //   str += "          </div>";
    //   str += "        </div>";
    //   $(".chat-logs").append(str);
    //   $("#cm-msg-" + INDEX)
    //     .hide()
    //     .fadeIn(300);
    //   if (type == "self") {
    //     $("#chat-input").val("");
    //   }
    //   $(".chat-logs")
    //     .stop()
    //     .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    // }

    // function generate_button_message(msg, buttons) {
    //   /* Buttons should be object array
    //     [
    //       {
    //         name: 'Existing User',
    //         value: 'existing'
    //       },
    //       {
    //         name: 'New User',
    //         value: 'new'
    //       }
    //     ]
    //   */
    //   INDEX++;
    //   var btn_obj = buttons
    //     .map(function (button) {
    //       return (
    //         '              <li class="button"><a href="javascript:;" class="btn btn-primary chat-btn" chat-value="' +
    //         button.value +
    //         '">' +
    //         button.name +
    //         "</a></li>"
    //       );
    //     })
    //     .join("");
    //   var str = "";
    //   str += "<div id='cm-msg-" + INDEX + '\' class="chat-msg user">';
    //   str += '          <span class="msg-avatar">';
    //   str +=
    //     '            <img src="https://image.crisp.im/avatar/operator/196af8cc-f6ad-4ef7-afd1-c45d5231387c/240/?1483361727745">';
    //   str += "          </span>";
    //   str += '          <div class="cm-msg-text">';
    //   str += msg;
    //   str += "          </div>";
    //   str += '          <div class="cm-msg-button">';
    //   str += "            <ul>";
    //   str += btn_obj;
    //   str += "            </ul>";
    //   str += "          </div>";
    //   str += "        </div>";
    //   $(".chat-logs").append(str);
    //   $("#cm-msg-" + INDEX)
    //     .hide()
    //     .fadeIn(300);
    //   $(".chat-logs")
    //     .stop()
    //     .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    //   $("#chat-input").attr("disabled", true);
    // }

    // $(document).delegate(".chat-btn", "click", function () {
    //   var value = $(this).attr("chat-value");
    //   var name = $(this).html();
    //   $("#chat-input").attr("disabled", false);
    //   generate_message(name, "self");
    // });

    $("#chat-circle").click(function () {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
    });

    $(".chat-box-toggle").click(function () {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
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
            this.toastService.showNotification(data.message + "", 4000);
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

  onChatBoxToggle() {
    const chatCircle = document.querySelector("#chat-circle");
    const chatBox = document.querySelector(".chat-box");

    chatCircle.classList.toggle("scale");
    chatBox.classList.toggle("scale");
  }
}

