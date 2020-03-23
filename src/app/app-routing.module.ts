import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { InsuranceComponent } from "./components/insurance/insurance.component";
import { AuthenticationGuard } from "./shared/AuthenticationGuard.service";
import { TermsandConditionsComponent } from "./components/static/termsand-conditions/termsand-conditions.component";
// import { CookiePolicyComponent } from "./components/static/cookie-policy/cookie-policy.component";
import { CookiePolicyComponent } from "./components/static/cookie-policy/cookie-policy.component";
import { PrivacyPolicyComponent } from "./components/static/privacy-policy/privacy-policy.component";
import { CancellationsAndReturnComponent } from "./components/static/cancellations-and-return/cancellations-and-return.component";
import { AboutUsComponent } from "./components/static/about-us/about-us.component";
import { SomethingWrongComponent } from './shared/components/something-wrong/something-wrong.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [



  { path: "", redirectTo: "visa", pathMatch: "full" },
  { path: "tnc", component: TermsandConditionsComponent },
  { path: "cookiePolicy", component: CookiePolicyComponent },
  { path: "privacyPolicy", component: PrivacyPolicyComponent },
  { path: "cancellationPolicy", component: CancellationsAndReturnComponent },
  { path: "aboutUs", component: AboutUsComponent },


  // Addtraveller Page
  { path: "addTraveller", loadChildren: () =>
   import("./components/add-traveller/add-traveller.module").then (m => m.AddTravellerModule)},

  // Requirement Page
  { path: "reg", loadChildren: () =>
   import("./components/requirements/requirements.module").then (m => m.RequirementsModule)},

  // Profile Page
  { path: "profile", loadChildren: () =>
   import("./components/profile/profile.module").then (m => m.ProfileModule)},
  // MyBooking Page
   { path: "myBookings", loadChildren: () =>
   import("./components/my-bookings/mybookings.module").then (m => m.MyBookingsModule)},

   // BookingDetails page
   { path: "bookingDetail", loadChildren: () =>
   import("./components/my-bookings/mybookings.module").then (m => m.MyBookingsModule)},

   // Requirement Page
   { path: "visa-requirements/:country/:variable/:purpose", loadChildren: () =>
   import("./components/requirements/requirements.module").then (m => m.RequirementsModule)},

   // Uk Page
   { path: "visa-requirements/apply-for-UK-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/united-kingdom/united-kingdom.module").then (m => m.UnitedKingdomModule)},

   // USA Page
   { path: "visa-requirements/apply-for-USA-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/usa/usa.module").then (m => m.USAModule)},

   // Netherland Page
   { path: "visa-requirements/apply-for-Netherlands-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/netherlands/netherlands.module").then (m => m.NetherlandsModule)},

   // Australia Page
   { path: "visa-requirements/apply-for-Australia-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/australia/australia.module").then (m => m.AustraliaModule)},

   // France Page
   { path: "visa-requirements/apply-for-France-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/france/France.module").then (m => m.FranceModule)},

   // China Page
    { path: "visa-requirements/apply-for-China-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/china/china.module").then (m => m.ChinaModule)},

   // Switzerland Page
   { path: "visa-requirements/apply-for-Swiss-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/switzerland/switzerland.module").then (m => m.SwitzerlandModule)},

   // Ethopia Page
   { path: "visa-requirements/apply-for-Ethiopia-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/ethiopian/ethopian.module").then (m => m.EthopianModule)},

   // Malaysia Page
    { path: "visa-requirements/apply-for-Malaysia-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/malaysia/malaysia.module").then (m => m.MalaysiaModule)},

   // Thailand Page
   { path: "visa-requirements/apply-for-Thailand-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/thailand/thailand.module").then (m => m.ThailandModule)},

   // Vietnam Page
   { path: "visa-requirements/apply-for-Vietnam-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/vietnam/vietnam.module").then (m => m.VietnamModule)},

   // Dubai Page
    { path: "visa-requirements/apply-for-Dubai-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/dubai/dubai.module").then (m => m.DubaiModule)},

   // Maldives Page
   { path: "visa-requirements/apply-for-Maldives-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/maldives/maldives.module").then (m => m.MaldivesModule)},

   // Spain Page
   { path: "visa-requirements/apply-for-Spain-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/spain/spain.module").then (m => m.SpainModule)},

   // Singapore Page
    { path: "visa-requirements/apply-for-Singapore-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/singapore/singapore.module").then (m => m.SingaporeModule)},

   // Sri-Lanka Page
   { path: "visa-requirements/apply-for-Sri-Lanka-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/sri-lanka/sri-lanka.module").then (m => m.SrilankaModule)},

   // Camboida Page
   { path: "visa-requirements/apply-for-Cambodia-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/combodia/combodia.module").then (m => m.CombodiaModule)},

   // Turkey Page
    { path: "visa-requirements/apply-for-Turkey-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/turkey/turkey.module").then (m => m.TurkeyModule)},

   // Azerbaijan Page
   { path: "visa-requirements/apply-for-Azerbaijan-visa-online/:purpose", loadChildren: () =>
   import("./components/visa-requirements/azerbaijan/azerbaijan.module").then (m => m.AzerbaijanModule)},

   // HomeContainer Page
   { path: "visa", loadChildren: () =>
   import("./components/home-container/home-container.module").then (m => m.HomeContainerModule)},

   // LoginSignUp Page
   { path: "slcontainer/:form", loadChildren: () =>
   import("./components/login-signup/login-signup.module").then (m => m.LoginSignupModule)},


   // Sim Page
   { path: "sim", loadChildren: () =>
   import("./components/SimModule/sim.module").then (m => m.SimModule)},

   // Sim Plans Page
   { path: "sim/simplans", loadChildren: () =>
   import("./components/SimModule/sim.module").then (m => m.SimModule)},

   // Sim Checkout Page
   { path: "sim/checkout", loadChildren: () =>
   import("./components/SimModule/sim.module").then (m => m.SimModule)},

  // Visa Arrival Page
  { path: "visOnArrival", loadChildren: () =>
  import("./components/SimModule/visa-arrival.module").then (m => m.VisaArrivalModule)},

  // Free Visa Page
  { path: "freeVisa", loadChildren: () =>
  import("./components/SimModule/free-visa.module").then (m => m.FreeVisaModule)},

  // B2b Home Page
  { path: "b2b/home", loadChildren: () =>
  import("./components/b2b/b2b.Module").then (m => m.B2BModule)},


  { path: "insurance", component: InsuranceComponent },

  // { path: "b2b", redirectTo: "b2b/home", pathMatch: "prefix" },
  // { path: "b2b/home", component: B2bHomeComponent, children : [
  //   { path: "b2b/home/:id", component: B2bHomeComponent }
  // ] },
  //B2b Requirement page
  { path: "b2b/visa-requirement/:country/:purpose", loadChildren: () =>
  import("./components/b2b/b2b.Module").then (m => m.B2BModule)},


  //B2b Add Traveller page
  { path: "b2b/b2b-add-traveller", loadChildren: () =>
  import("./components/b2b/b2b.Module").then (m => m.B2BModule)},

  // {
  //   path: "b2b/visa-requirement/:country/:purpose",
  //   component: B2bReqComponent
  // },
  // {
  //   path: "b2b/b2b-add-traveller",
  //   component: B2bAddTrvComponent
  // },





  { path: "insurance", component: InsuranceComponent },
  {
    path: "b2b/something-went-wrong",
    component:  SomethingWrongComponent
  },
  {
    path: "page-not-found",
    component: PageNotFoundComponent
  },
  { path: "**", redirectTo: "page-not-found", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled", preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
