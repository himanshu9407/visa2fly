import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HomeFormService } from './home-form.service';

@Injectable({
  providedIn: 'root'
})
export class HomeFormResolver implements Resolve<any>  {

  constructor(private homeFormService: HomeFormService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("Fuck you");
    this.homeFormService.getHomeFormDataFromServer();
  }
}
