import { AustraliaComponent } from "./components/visa-requirements/australia/australia.component";
import { UnitedKingdomComponent } from "./components/visa-requirements/united-kingdom/united-kingdom.component";
import { FranceComponent } from "./components/visa-requirements/france/france.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequirementsComponent } from "./components/requirements/requirements.component";
import { HomeFormComponent } from "./components/home-form/home-form.component";
import { LoginSignupComponent } from "./components/login-signup/login-signup.component";
import { MiniCarouselComponent } from "./components/mini-carousel/mini-carousel.component";
import { HomeContainerComponent } from "./components/home-container/home-container.component";
import { AddTravellerComponent } from "./components/add-traveller/add-traveller.component";
import { SignupComponent } from "./components/login-signup/signup/signup.component";
import { FreeVisaComponent } from "./components/free-visa/free-visa.component";
import { VisaArrivalComponent } from "./components/visa-arrival/visa-arrival.component";
import { SimComponent } from "./components/sim/sim.component";
import { InsuranceComponent } from "./components/insurance/insurance.component";
import { AuthenticationGuard } from "./shared/AuthenticationGuard.service";
import { MyBookingsComponent } from "./components/my-bookings/my-bookings.component";
import { TermsandConditionsComponent } from "./components/static/termsand-conditions/termsand-conditions.component";
// import { CookiePolicyComponent } from "./components/static/cookie-policy/cookie-policy.component";
import { PrivacyPolicyComponent } from "./components/static/privacy-policy/privacy-policy.component";
import { CancellationsAndReturnComponent } from "./components/static/cancellations-and-return/cancellations-and-return.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { BookingDetailsComponent } from "./components/booking-details/booking-details.component";
import { SimplansComponent } from "./components/simplans/simplans.component";
import { SimcheckoutComponent } from "./components/simcheckout/simcheckout.component";
import { AboutUsComponent } from "./components/static/about-us/about-us.component";
import { ChinaComponent } from "./components/visa-requirements/china/china.component";
import { CanDeactivateGuard } from "./shared/can-deactivate.service";
import { SwitzerlandComponent } from "./components/visa-requirements/switzerland/switzerland.component";
import { CookiePolicyComponent } from './components/static/cookie-policy/cookie-policy.component';
import { EthiopianComponent } from './components/visa-requirements/ethiopian/ethiopian.component';
import { MalaysiaComponent } from './components/visa-requirements/malaysia/malaysia.component';
import { DubaiComponent } from './components/visa-requirements/dubai/dubai.component';
import { MaldivesComponent } from './components/visa-requirements/maldives/maldives.component';
import { SpainComponent } from './components/visa-requirements/spain/spain.component';

const routes: Routes = [
  { path: "", redirectTo: "visa", pathMatch: "full" },
  { path: "visa", component: HomeContainerComponent },
  { path: "tnc", component: TermsandConditionsComponent },
  { path: "cookiePolicy", component: CookiePolicyComponent },
  { path: "privacyPolicy", component: PrivacyPolicyComponent },
  { path: "cancellationPolicy", component: CancellationsAndReturnComponent },
  { path: "aboutUs", component: AboutUsComponent },
  { path: "bookingDetail", component: BookingDetailsComponent },

  { path: "slcontainer/:form", component: LoginSignupComponent },
  { path: "profile", component: ProfileComponent },
  {
    path: "requirement/:country/:variable/:purpose",
    component: RequirementsComponent
  },
  {
    path: "addTraveller",
    component: AddTravellerComponent,
    canActivate: [AuthenticationGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  { path: "freeVisa", component: FreeVisaComponent },
  { path: "visaOnArrival", component: VisaArrivalComponent },
  { path: "visaArrival", component: VisaArrivalComponent },
  { path: "sim", component: SimComponent },
  { path: "sim/simplans", component: SimplansComponent },
  { path: "sim/checkout", component: SimcheckoutComponent },
  { path: "insurance", component: InsuranceComponent },
  {
    path: "myBookings",
    component: MyBookingsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "visa-requirements/apply-for-UK-visa-online/:purpose",
    component: UnitedKingdomComponent
  },
  { path: "visa-requirements/apply-for-France-visa-online/:purpose", component: FranceComponent },
  {
    path: "visa-requirements/apply-for-China-visa-online/:purpose",
    component: ChinaComponent
  },
  {
    path: "visa-requirements/apply-for-Swiss-visa-online/:purpose",
    component: SwitzerlandComponent
  },
  {
    path: "visa-requirements/apply-for-Ethiopia-visa-online/:purpose",
    component: EthiopianComponent 
  },
  {
    path: "visa-requirements/apply-for-Malaysia-visa-online/:purpose",
    component: MalaysiaComponent 
  }, 
  {
    path: "visa-requirements/apply-for-Dubai-visa-online/:purpose",
    component: DubaiComponent
  },
{
    path: "visa-requirements/apply-for-Maldives-visa-online/:purpose",
    component:  MaldivesComponent
  },
  {
    path: "visa-requirements/apply-for-Spain-visa-online/:purpose",
    component:  SpainComponent
  },

  { path: "**", redirectTo: "visa", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
