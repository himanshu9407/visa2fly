import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })  
export class LoginStatusService {

    public subject = new  Subject<any>();


    getData(): Observable <any> {
        return this.subject.asObservable();
    }


    setUserStatus (status : boolean) {
        this.subject.next(status);
    }

    
}