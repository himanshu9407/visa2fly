import { Injectable, Component } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { RouterHistory } from "src/app/shared/router-history.service";
import { AddTravellerComponent } from "../components/add-traveller/add-traveller.component";
import { Observable } from "rxjs";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: "root"
})
export class CanDeactivateGuard
  implements CanDeactivate<AddTravellerComponent> {
    showTransparentHeader: boolean = false;
  constructor(private route: Router) {}

  canDeactivate(
    component: AddTravellerComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.canDeactivate()) {
      if (!true) {
        return this.showTransparentHeader = true;
      }
    } else {
      // console.log("5");
      return true;
    }
  }
}
