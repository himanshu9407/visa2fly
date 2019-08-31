import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn : "root"
})
export class PreloaderService {
    constructor () {}
    public subject = new Subject<any>();

    getAlert(): Observable<any> {  
        return this.subject.asObservable();  
    } 
    showPreloader (showPreloader : boolean) {
        // console.log(showPreloader);
        let show = showPreloader;
        this.subject.next(show);
    }
    clear() {  
        this.subject.next();  
    }

}