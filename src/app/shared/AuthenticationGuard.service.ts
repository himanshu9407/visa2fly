import { LoginService } from '../components/login-signup/login/login.service';
import { LoginStatusService } from './login-status.service';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { PreloaderService } from './preloader.service';





  @Injectable({
    providedIn:"root"
})
export class AuthenticationGuard implements CanActivate {
    isAuthenticated :boolean = false;



    

    constructor (private loginService : LoginService, private loginStatus: LoginStatusService,
        private router : Router, private preloaderService : PreloaderService) {
        console.log("auth guard");
    }

    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) : any {
        this.preloaderService.showPreloader(true);
        return new Promise((resolve, reject)=> {  
        this.loginStatus.checkUserAuthentication().then(
            (data : any) => {
                if (data.code == "0") {

                    resolve (true);
                    setTimeout(() => {
                        this.preloaderService.showPreloader(false);
                    }, 1000);
                }
                else{
                    resolve(this.router.createUrlTree(['/slcontainer/login']));
                    setTimeout(() => {
                        this.preloaderService.showPreloader(false);
                    }, 1000);
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