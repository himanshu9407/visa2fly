import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { VisaRequirementService } from '../visa-requirement.service';

@Injectable({
  providedIn: 'root'
})
export class AustraliaResolver implements Resolve<any> {
  public selectedCountry = "Australia";

  constructor(private requireQuotation: VisaRequirementService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.requireQuotation.getRequireQuotation(this.selectedCountry);
  }

}
