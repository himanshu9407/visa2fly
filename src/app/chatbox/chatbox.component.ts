import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CallBackService } from './CallBack.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor(private callBackService: CallBackService, private toastService : ToastService) { }

  callBackForm : FormGroup;
  alertMessage : string ;
  showSuccessAlert : boolean = false;
  showErrorAlert : boolean = false;
  ngOnInit() {
    this.callBackForm = new FormGroup({
      'name' : new FormControl('',[Validators.required]),
      'cell': new FormControl('',[Validators.required]),
      'emailId': new FormControl('',[]),
      'visa' : new FormControl(true),
      'sim' : new FormControl(true),
      'insurance' : new FormControl(true),
      'forex' : new FormControl(true)
    });
  }

  onSubmit() {
    if (this.callBackForm.get('visa').value || this.callBackForm.get('sim').value 
    ||this.callBackForm.get('insurance').value ||this.callBackForm.get('forex').value) {
      this.callBackService.submitCallBackForm(this.callBackForm.value).subscribe(
        (data: any) => {
          if(data.code =="0") {
            let el = document.getElementById("closeModel");
            // el.triger
            
            this.callBackForm.reset();
            // this.toastService.showNotification(data.message+"",4000);
            this.alertMessage = data.message;
            this.showSuccessAlert =true;
            setTimeout(() => {
              this.showSuccessAlert = false;
              (<any>($('#exampleModal'))).modal('hide');
            }, 4000);
          }
          else {
            this.toastService.showNotification(data.message+"",4000);
            this.alertMessage = data.message;
            this.showErrorAlert =true;
            setTimeout(() => {
              this.showErrorAlert = false;
              (<any>($('#exampleModal'))).modal('hide');
            }, 4000);

          }
        }
      );
    }
  }

}
