import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  // { path: "", redirectTo: "/", pathMatch: "full" },

  // HomeContainer Page
  {
    path: "",
    loadChildren: () =>
      import("./components/home-container/home-container.module").then(
        (m) => m.HomeContainerModule
      ),
    data: { preload: true },
  },

  // About Us Page
  {
    path: "about-us",
    loadChildren: () =>
      import("./components/static/about-us/about-us.module").then(
        (m) => m.AboutUsModule
      ),
    data: { preload: true },
  },

  // Cancellation Page
  {
    path: "cancellation-policy",
    loadChildren: () =>
      import(
        "./components/static/cancellations-and-return/cancellations-and-return.module"
      ).then((m) => m.CancellationsAndReturnModule),
    data: { preload: true },
  },

  // Cookie Policy Page
  {
    path: "cookie-policy",
    loadChildren: () =>
      import("./components/static/cookie-policy/cookie-policy.module").then(
        (m) => m.CookiePolicyModule
      ),
    data: { preload: true },
  },

  // Privacy Policy
  {
    path: "privacy-policy",
    loadChildren: () =>
      import("./components/static/privacy-policy/privacy-policy.module").then(
        (m) => m.PrivacyPolicyModule
      ),
    data: { preload: true },
  },

  // Terms And condition  Page
  {
    path: "terms&conditions",
    loadChildren: () =>
      import(
        "./components/static/termsand-conditions/termsand-conditions.module"
      ).then((m) => m.TermsandConditionsModule),
    data: { preload: true },
  },

  // Offers Page
  {
    path: "offers",
    loadChildren: () =>
      import(
        "./components/offers/offers.module"
      ).then((m) => m.OffersModule),
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

  // success and failure booking page
  {
    path: "payment/handle",
    loadChildren: () =>
      import("./components/booking-status/booking-status.module").then(
        (m) => m.BookingStatusModule
      ),
    data: { preload: true },
  },

  // :orderId/:checksum/:amount/:bank/:bankid/:cardId/:cardScheme/:cardToken/:cardhashid/:doRedirect/:paymentMethod/:paymentMode/:responseCode/:responseDescription/:productDescription/:product1Description/:product2Description/:product3Description/:product4Description/:pgTransId/:pgTransTime

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
    path: "uk-visa-online",
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
    path: "usa-visa-online",
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
    path: "netherlands-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/netherlands/netherlands.module"
      ).then((m) => m.NetherlandsModule),
    data: { preload: true },
  },

  // Japan Page
  {
    path: "japan-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/japan/japan.module").then(
        (m) => m.JapanModule
      ),
    data: { preload: true },
  },

  // New-Zealand Page
  {
    path: "new-zealand-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/new-zealand/new-zealand.module"
      ).then((m) => m.NewZealandModule),
    data: { preload: true },
  },

  // Armenia Page
  {
    path: "armenia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/armenia/armenia.module").then(
        (m) => m.ArmeniaModule
      ),
    data: { preload: true },
  },

  // South Africa Page
  {
    path: "south-africa-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/south-africa/south-africa.module"
      ).then((m) => m.SouthAfricaModule),
    data: { preload: true },
  },

  // Rwanda Page
  {
    path: "rwanda-visa-online",
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
    path: "australia-visa-online",
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
    path: "france-visa-online",
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
    path: "china-visa-online",
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
    path: "swiss-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/switzerland/switzerland.module"
      ).then((m) => m.SwitzerlandModule),
    data: { preload: true },
  },

  // Eygpt Page
  {
    path: "egypt-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/egypt/egypt.module").then(
        (m) => m.EgyptModule
      ),
    data: { preload: true },
  },

  // Antigua & Barbuda Page
  {
    path: "antigua & barbuda-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/antigua/antigua.module").then(
        (m) => m.AntiguaModule
      ),
    data: { preload: true },
  },

  // Ukraine Page
  {
    path: "egypt-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/ukraine/ukraine.module").then(
        (m) => m.UkraineModule
      ),
    data: { preload: true },
  },

  // Taiwan Page
  {
    path: "taiwan-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/taiwan/taiwan.module").then(
        (m) => m.TaiwanModule
      ),
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
    path: "ethiopia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/ethiopian/ethopian.module").then(
        (m) => m.EthopianModule
      ),
    data: { preload: true },
  },

  // finland
  {
    path: "finland-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/finland/finland.module").then(
        (m) => m.FinlandModule
      ),
    data: { preload: true },
  },

  // belgium
  {
    path: "belgium-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/belgium/belgium.module").then(
        (m) => m.BelgiumModule
      ),
    data: { preload: true },
  },

  // austria
  {
    path: "austria-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/austria/austria.module").then(
        (m) => m.AustriaModule
      ),
    data: { preload: true },
  },

  // canada
  {
    path: "canada-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/canada/canada.module").then(
        (m) => m.CanadaModule
      ),
    data: { preload: true },
  },

  // bhutan
  {
    path: "bhutan-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/bhutan/bhutan.module").then(
        (m) => m.BhutanModule
      ),
    data: { preload: true },
  },

  // estonia
  {
    path: "estonia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/estonia/estonia.module").then(
        (m) => m.EstoniaModule
      ),
    data: { preload: true },
  },

  // georgia
  {
    path: "georgia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/georgia/georgia.module").then(
        (m) => m.GeorgiaModule
      ),
    data: { preload: true },
  },


  // germany
  {
    path: "germany-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/germany/germany.module").then(
        (m) => m.GermanyModule
      ),
    data: { preload: true },
  },


  // iraq
  {
    path: "iraq-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/iraq/iraq.module").then(
        (m) => m.IraqModule
      ),
    data: { preload: true },
  },

  // kenya
  {
    path: "kenya-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/kenya/kenya.module").then(
        (m) => m.KenyaModule
      ),
    data: { preload: true },
  },

  // malta
  {
    path: "malta-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/malta/malta.module").then(
        (m) => m.MaltaModule
      ),
    data: { preload: true },
  },

  // denmark
  {
    path: "denmark-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/denmark/denmark.module").then(
        (m) => m.DenmarkModule
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
    path: "malaysia-visa-online",
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
    path: "thailand-visa-online",
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
    path: "vietnam-visa-online",
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
    path: "dubai-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/dubai/dubai.module").then(
        (m) => m.DubaiModule
      ),
    data: { preload: true },
  },

  // UAE Page
  {
    path: "uae-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/uae/uae.module").then(
        (m) => m.UAEModule
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
    path: "maldives-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/maldives/maldives.module").then(
        (m) => m.MaldivesModule
      ),
    data: { preload: true },
  },

  // Bahrain Page
  {
    path: "visa-requirements/apply-for-Bahrain-visa-online/:purpose",
    loadChildren: () =>
      import("./components/visa-requirements/bahrain/bahrain.module").then(
        (m) => m.BahrainModule
      ),
    data: { preload: true },
  },

  {
    path: "bahrain-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/bahrain/bahrain.module").then(
        (m) => m.BahrainModule
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
    path: "spain-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/spain/spain.module").then(
        (m) => m.SpainModule
      ),
    data: { preload: true },
  },

  // Singapore Page
  {
    path: "singapore-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/singapore/singapore.module").then(
        (m) => m.SingaporeModule
      ),
    data: { preload: true },
  },

  {
    path: "visa-requirements/apply-for-Singapore-visa-online/:purpose",
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
    path: "sri-lanka-visa-online",
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
    path: "cambodia-visa-online",
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
    path: "turkey-visa-online",
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
    path: "azerbaijan-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/azerbaijan/azerbaijan.module"
      ).then((m) => m.AzerbaijanModule),
    data: { preload: true },
  },

  // Zambia Page
  {
    path: "zambia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/zambia/zambia.module").then(
        (m) => m.ZambiaModule
      ),
    data: { preload: true },
  },

  // Brazil Page
  {
    path: "brazil-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/brazil/brazil.module").then(
        (m) => m.BrazilModule
      ),
    data: { preload: true },
  },

  // Uzbekistan Page
  {
    path: "uzbekistan-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/uzbekistan/uzbekistan.module"
      ).then((m) => m.UzbekistanModule),
    data: { preload: true },
  },

  // Russia Page
  {
    path: "russia-visa-online",
    loadChildren: () =>
      import("./components/visa-requirements/russia/russia.module").then(
        (m) => m.RussiaModule
      ),
    data: { preload: true },
  },

  // Tajikistan Page
  {
    path: "tajikistan-visa-online",
    loadChildren: () =>
      import(
        "./components/visa-requirements/tajikistan/tajikistan.module"
      ).then((m) => m.TajikistanModule),
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

  // Sim Checkout Page
  {
    path: "sim/checkout",
    loadChildren: () =>
      import("./components/simcheckout/simcheckout.module").then(
        (m) => m.SimCheckoutModule
      ),
    data: { preload: true },
  },

  // Sim Plans Page
  {
    path: "sim/:simCountry",
    loadChildren: () =>
      import("./components/simplans/simplans.module").then(
        (m) => m.SimplansModule
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

  // B2b Sim Home Page
  {
    path: "b2b/sim",
    loadChildren: () =>
      import("./components/b2b-sim/b2b-sim.module").then((m) => m.B2bSimModule),
    data: { preload: true },
  },

  // B2b Home Page
  {
    path: "b2b",
    loadChildren: () =>
      import("./components/b2b/b2b.module").then((m) => m.B2BModule),
    data: { preload: true },
  },



  // insurance
  {
    path: "insurance",
    loadChildren: () =>
      import("./components/insurance/insurance.module").then((m) => m.InsuranceModule),
    data: { preload: true },
  },

  // 404
  {
    path: "404",
    component: PageNotFoundComponent,
  },

  // Requirement Page
  {
    path: "visa-requirements/:country/:variable",
    loadChildren: () =>
      import("./components/requirements/requirements.module").then(
        (m) => m.RequirementsModule
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

  { path: "**", redirectTo: "404", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      onSameUrlNavigation: "reload",
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
