import { Injectable } from '@angular/core';


@Injectable({
    providedIn:"root"
})
export class UserFlowDetails {


    public userObject : object = {};

    constructor (){ }


    setUserFlowDetails (name:string, value:string) {

        this.userObject[name] = value;


        localStorage.setItem("userFlowDetails",JSON.stringify(this.userObject))
        // console.log(this.userObject);
    }

    setUserFlowDetailsObject (name : string , value : object) {
        this.userObject[name] = value;
        localStorage.setItem("userFlowDetails", JSON.stringify(this.userObject));
    }

    setUserProfile(value:object) {
        // console.log(value);
        
        localStorage.setItem("profile", JSON.stringify(value));

    }

    getUserProfile() {
        return JSON.parse(localStorage.getItem("userDetails"));
    }
    getUserFlowDetails () {
        return JSON.parse(localStorage.getItem("userFlowDetails"));
    }


    getBaseURL () {
        return 'https://test.visa2fly.com/api/';
    }

}