import { LoginService } from '../components/login-signup/login/login.service';
import { LoginStatusService } from './login-status.service';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';





  @Injectable({
    providedIn:"root"
})
export class AuthenticationGuard implements CanActivate {
    isAuthenticated :boolean = false;
    

    constructor (private loginService : LoginService, private loginStatus: LoginStatusService,
        private router : Router) {
        console.log("auth guard");
    }

    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) : any {
        return new Promise((resolve, reject)=> {  
        this.loginStatus.checkUserAuthentication().then(
            (data : any) => {
                if (data.code == "0") {
                    resolve (true);
                }
                else{
                    resolve(this.router.createUrlTree(['/slcontainer/login']));
                    // reject(false);
                }
            }
        )
        })
        .catch(err => {
            this.router.createUrlTree(['/slcontainer/login']);

            // resolve(false);
        });


     
    }



    


}