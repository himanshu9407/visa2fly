import { Observable, Observer, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })  
export class ToastService {


    // public showToast : boolean= false;
    // public message : string ="";

    public subject = new Subject<any>();

    getAlert(): Observable<any> {  
        return this.subject.asObservable();  
    } 


    showNotification (msg : string, duration: number) {
        let toastData = {message: msg, duration: duration};
        // console.log(toastData)
        this.subject.next(toastData);
    }
    clear() {  
        this.subject.next();  
    }
 

    
}