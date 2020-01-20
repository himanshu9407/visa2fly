import { Injectable, Component } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
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
  constructor(private route: Router) {}
  showColorHeader: boolean = true;

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
      this.showColorHeader = true;
      // console.log(this.showColorHeader);
      return false;
    } else {
      this.showColorHeader = false;
      // console.log("5");
      return true;
    }
  }
}
