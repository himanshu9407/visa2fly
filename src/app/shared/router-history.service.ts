import { Injectable } from '@angular/core';

@Injectable({providedIn : "root"})
export class RouterHistory {

    public history = [];



    pushHistory (item :string) {
        this.history.push(item);
    }


    clearRouteHistory () {
        this.history = [];
    }
    getPrevRoute () {
        return this.history[this.history.length-1] || "home";
    }


}