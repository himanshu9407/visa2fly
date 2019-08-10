import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(private toastService : ToastService) { }

  public showToast : boolean = false ;


  public notificationMessage: string = "anu priya";
  ngOnInit() {
    this.toastService.getAlert().subscribe(
      (toastData : {message:string,duration:number}) => {
        console.log(toastData.message + "this is toast data")
        this.notificationMessage = toastData.message;
        this.showToast = true;

        setTimeout(() => {
          this.showToast = false;
        },toastData.duration)
      }
    );
  }

  dismissToast() {
    this.showToast = false;
  }

}
