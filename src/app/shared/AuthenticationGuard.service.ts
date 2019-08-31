import { LoginService } from '../components/login-signup/login/login.service';
import { LoginStatusService } from './login-status.service';
import { Injectable } from '@angular/core';
import { CanActivate ,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';


@Injectable({
    providedIn:"root"
})
export class AuthenticationGuard implements CanActivate {
    isAuthenticated :boolean = false;

    constructor (private loginService : LoginService, private loginStatus: LoginStatusService) {
        
        let token = this.loginService.getAuthToken();
        this.loginStatus.verifyAuthToken(token).subscribe(
            (data:any) => {
                if (data.code == "0") {
                    this.isAuthenticated = true;
                }
            }
        );
    }   

    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        console.log(this.isAuthenticated)

        if (this.isAuthenticated) {
            console.log("go forward");
        }
        else {
            console.log("not allowd");
        }
        return this.isAuthenticated;
    }



    


}