import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { InsuranceComponent } from "./components/insurance/insurance.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "visa", pathMatch: "full" },

  // About Us Page
  {
    path: "aboutUs",
    loadChildren: () =>
      import("./components/static/about-us/about-us.module").then(
        (m) => m.AboutUsModule
      ),
    data: { preload: true },
  },

  // Cancellation Page
  {
    path: "cancellationPolicy",
    loadChildren: () =>
      import(
        "./components/static/cancellations-and-return/cancellations-and-return.module"
      ).then((m) => m.CancellationsAndReturnModule),
    data: { preload: true },
  },

  // Cookie Policy Page
  {
    path: "cookiePolicy",
    loadChildren: () =>
      import("./components/static/cookie-policy/cookie-policy.module").then(
        (m) => m.CookiePolicyModule
      ),
    data: { preload: true },
  },

  // Privacy Policy
  {
    path: "privacyPolicy",
    loadChildren: () =>
      import("./components/static/privacy-policy/privacy-policy.module").then(
        (m) => m.PrivacyPolicyModule
      ),
    data: { preload: true },
  },

  // Terms And condition  Page
  {
    path: "tnc",
    loadChildren: () =>
      import(
        "./components/static/termsand-conditions/termsand-conditions.module"
      ).then((m) => m.TermsandConditionsModule),
    data: { preload: true },
  },

  // Addtraveller Page
  {
    path: "addTraveller",
    loadChildren: () =>
      import("./components/add-traveller/add-traveller.module").then(
        (m) => m.AddTravellerModule
      ),
    data: { preload: true },
  },

  // Requirement Page
  {
    path: "reg",
    loadChildren: () =>
      import("./components/requirements/requirements.module").then(
        (m) => m.RequirementsModule
      ),
    data: { preload: true },
  },

  // Profile Page
  {
    path: "profile",
    loadChildren: () =>
      import("./components/profile/profile.module").then(
        (m) => m.ProfileModule
      ),
    data: { preload: true },
  },

  // MyBooking Page
  {
    path: "myBookings",
    loadChildren: () =>
      import("./components/my-bookings/mybookings.module").then(
        (m) => m.MyBookingsModule
      ),
    data: { preload: true },
  },

  // BookingDetails page
  {
    path: "bookingDetail",
    loadChildren: () =>
      import("./components/booking-details/booking-details.module").then(
        (m) => m.BookingDetailsModule
      ),
    data: { preload: true },
  },

  // Requirement Page
  {
    path: "visa-requirements/:country/:variable/:purpose",
    loadChildren: () =>
      import("./components/requirements/requirements.module").then(
        (m) => m.RequirementsModule
      ),
    data: { preload: true },
  },

  // Uk Page
  {
    path: "visa-requirements/apply-for-UK-visa-online/:purpose",
    loadChildren: () =>
      import(
        "./components/visa-requirements/united-kingdom/united-kingdom.module"
      ).then((m) => m.UnitedKingdomModule),
    data: { preload: true },
  },

  {
    path: "visa/uk-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/united-kingdom/united-kingdom.module"
      ).then((m) => m.UnitedKingdomModule),
    data: { preload: true },
  },

  // USA Page
  {
    path: "visa-requirements/apply-for-USA-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/usa/usa.module").then(
        (m) => m.USAModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/usa-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/usa/usa.module").then(
        (m) => m.USAModule
      ),
  },

  // Netherland Page
  {
    path: "visa-requirements/apply-for-Netherlands-visa-online/:purpose",
    loadChildren: () =>
      import(
        "./components/visa-requirements/netherlands/netherlands.module"
      ).then((m) => m.NetherlandsModule),
    data: { preload: true },
  },

  {
    path: "visa/netherlands-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/netherlands/netherlands.module"
      ).then((m) => m.NetherlandsModule),
    data: { preload: true },
  },

  // Japan Page
  {
    path: "visa/japan-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/japan/japan.module").then(
        (m) => m.JapanModule
      ),
    data: { preload: true },
  },

  // Rwanda Page
  {
    path: "visa/rwanda-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/rwanda/rwanda.module").then(
        (m) => m.RwandaModule
      ),
    data: { preload: true },
  },

  // Australia Page
  {
    path: "visa-requirements/apply-for-Australia-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/australia/australia.module").then(
        (m) => m.AustraliaModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/australia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/australia/australia.module").then(
        (m) => m.AustraliaModule
      ),
    data: { preload: true },
  },

  // France Page
  {
    path: "visa-requirements/apply-for-France-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/france/france.module").then(
        (m) => m.FranceModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/france-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/france/france.module").then(
        (m) => m.FranceModule
      ),
    data: { preload: true },
  },

  // China Page
  {
    path: "visa-requirements/apply-for-China-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/china/china.module").then(
        (m) => m.ChinaModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/china-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/china/china.module").then(
        (m) => m.ChinaModule
      ),
    data: { preload: true },
  },

  // Switzerland Page
  {
    path: "visa-requirements/apply-for-Swiss-visa-online/:purpose",
    loadChildren: () =>
      import(
        "./components/visa-requirements/switzerland/switzerland.module"
      ).then((m) => m.SwitzerlandModule),
    data: { preload: true },
  },

  {
    path: "visa/swiss-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/switzerland/switzerland.module"
      ).then((m) => m.SwitzerlandModule),
    data: { preload: true },
  },

  // Ethopia Page
  {
    path: "visa-requirements/apply-for-Ethiopia-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/ethiopian/ethopian.module").then(
        (m) => m.EthopianModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/ethiopia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/ethiopian/ethopian.module").then(
        (m) => m.EthopianModule
      ),
    data: { preload: true },
  },

  // Malaysia Page
  {
    path: "visa-requirements/apply-for-Malaysia-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/malaysia/malaysia.module").then(
        (m) => m.MalaysiaModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/malaysia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/malaysia/malaysia.module").then(
        (m) => m.MalaysiaModule
      ),
    data: { preload: true },
  },

  // Thailand Page
  {
    path: "visa-requirements/apply-for-Thailand-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/thailand/thailand.module").then(
        (m) => m.ThailandModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/thailand-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/thailand/thailand.module").then(
        (m) => m.ThailandModule
      ),
    data: { preload: true },
  },

  // Vietnam Page
  {
    path: "visa-requirements/apply-for-Vietnam-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/vietnam/vietnam.module").then(
        (m) => m.VietnamModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/vietnam-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/vietnam/vietnam.module").then(
        (m) => m.VietnamModule
      ),
    data: { preload: true },
  },

  // Dubai Page
  {
    path: "visa-requirements/apply-for-Dubai-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/dubai/dubai.module").then(
        (m) => m.DubaiModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/dubai-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/dubai/dubai.module").then(
        (m) => m.DubaiModule
      ),
    data: { preload: true },
  },

  // Maldives Page
  {
    path: "visa-requirements/apply-for-Maldives-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/maldives/maldives.module").then(
        (m) => m.MaldivesModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/maldives-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/maldives/maldives.module").then(
        (m) => m.MaldivesModule
      ),
    data: { preload: true },
  },

  // Spain Page
  {
    path: "visa-requirements/apply-for-Spain-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/spain/spain.module").then(
        (m) => m.SpainModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/spain-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/spain/spain.module").then(
        (m) => m.SpainModule
      ),
    data: { preload: true },
  },

  // Singapore Page
  {
    path: "visa-requirements/apply-for-Singapore-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/singapore/singapore.module").then(
        (m) => m.SingaporeModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/singapore-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/singapore/singapore.module").then(
        (m) => m.SingaporeModule
      ),
    data: { preload: true },
  },

  // Sri-Lanka Page
  {
    path: "visa-requirements/apply-for-Sri-Lanka-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/sri-lanka/sri-lanka.module").then(
        (m) => m.SrilankaModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/sri-lanka-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/sri-lanka/sri-lanka.module").then(
        (m) => m.SrilankaModule
      ),
    data: { preload: true },
  },

  // Camboida Page
  {
    path: "visa-requirements/apply-for-Cambodia-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/combodia/combodia.module").then(
        (m) => m.CombodiaModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/cambodia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/combodia/combodia.module").then(
        (m) => m.CombodiaModule
      ),
    data: { preload: true },
  },

  // Turkey Page
  {
    path: "visa-requirements/apply-for-Turkey-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/turkey/turkey.module").then(
        (m) => m.TurkeyModule
      ),
    data: { preload: true },
  },

  {
    path: "visa/turkey-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/turkey/turkey.module").then(
        (m) => m.TurkeyModule
      ),
    data: { preload: true },
  },

  // Azerbaijan Page
  {
    path: "visa-requirements/apply-for-Azerbaijan-visa-online/:purpose",
    loadChildren: () =>
      import(
        "./components/visa-requirements/azerbaijan/azerbaijan.module"
      ).then((m) => m.AzerbaijanModule),
    data: { preload: true },
  },

  {
    path: "visa/azerbaijan-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/azerbaijan/azerbaijan.module"
      ).then((m) => m.AzerbaijanModule),
    data: { preload: true },
  },

  // Zambia Page
  {
    path: "visa/zambia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/zambia/zambia.module").then(
        (m) => m.ZambiaModule
      ),
    data: { preload: true },
  },

  // Brazil Page
  {
    path: "visa/brazil-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/brazil/brazil.module").then(
        (m) => m.BrazilModule
      ),
    data: { preload: true },
  },

  // Uzbekistan Page
  {
    path: "visa/uzbekistan-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/uzbekistan/uzbekistan.module"
      ).then((m) => m.UzbekistanModule),
    data: { preload: true },
  },

  // Russia Page
  {
    path: "visa/russia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/russia/russia.module").then(
        (m) => m.RussiaModule
      ),
    data: { preload: true },
  },

  // Tajikistan Page
  {
    path: "visa/tajikistan-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/tajikistan/tajikistan.module"
      ).then((m) => m.TajikistanModule),
    data: { preload: true },
  },

  // HomeContainer Page
  {
    path: "visa",
    loadChildren: () =>
      import("./components/home-container/home-container.module").then(
        (m) => m.HomeContainerModule
      ),
    data: { preload: true },
  },

  // LoginSignUp Page
  {
    path: "slcontainer/:form",
    loadChildren: () =>
      import("./components/login-signup/login-signup.module").then(
        (m) => m.LoginSignupModule
      ),
    data: { preload: true },
  },

  // Sim Page
  {
    path: "sim",
    loadChildren: () =>
      import("./components/sim/sim.module").then((m) => m.SimModule),
    data: { preload: true },
  },

  // Sim Plans Page
  {
    path: "sim/simplans",
    loadChildren: () =>
      import("./components/simplans/simplans.module").then(
        (m) => m.SimplansModule
      ),
    data: { preload: true },
  },

  // Sim Checkout Page
  {
    path: "sim/checkout",
    loadChildren: () =>
      import("./components/simcheckout/simcheckout.module").then(
        (m) => m.SimCheckoutModule
      ),
    data: { preload: true },
  },

  // Visa Arrival Page
  {
    path: "visaOnArrival",
    loadChildren: () =>
      import("./components/visa-arrival/visa-arrival.module").then(
        (m) => m.VisaArrivalModule
      ),
    data: { preload: true },
  },

  // Free Visa Page
  {
    path: "freeVisa",
    loadChildren: () =>
      import("./components/free-visa/free-visa.module").then(
        (m) => m.FreeVisaModule
      ),
    data: { preload: true },
  },

  // B2b Home Page
  {
    path: "b2b",
    loadChildren: () =>
      import("./components/b2b/b2b.module").then((m) => m.B2BModule),
    data: { preload: true },
  },

  { path: "insurance", component: InsuranceComponent },
  {
    path: "page-not-found",
    component: PageNotFoundComponent,
  },
  { path: "**", redirectTo: "page-not-found", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      onSameUrlNavigation: "reload",
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
