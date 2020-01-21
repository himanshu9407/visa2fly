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
export class CanDeactivateGuard {}

// export class CanDeactivateGuard
// implements CanDeactivate<AddTravellerComponent> {
// constructor(private route: Router, private routerHistory: RouterHistory) {}
// showColorHeader: boolean = false;

// canDeactivate(
//   component: AddTravellerComponent,
//   currentRoute: ActivatedRouteSnapshot,
//   currentState: RouterStateSnapshot,
//   nextState: RouterStateSnapshot
// ):
//   | Observable<boolean | UrlTree>
//   | Promise<boolean | UrlTree>
//   | boolean
//   | UrlTree {
// if (component.canDeactivate()) {
// this.showColorHeader = true;
// this.routerHistory.clearRouteHistory();

// console.log(this.routerHistory.clearRouteHistory() + 'kjbhk');

// this.routerHistory.pushHistory("deactivate-addTraveller");

// console.log(this.routerHistory.pushHistory());
// return false;
// } else {
// this.showColorHeader = false;
// console.log("5");
// return true;
// }
// }
// }
