import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MatSelectModule } from "@angular/material/select";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { HomeFormComponent } from "./components/home-form/home-form.component";
import { HomeStepComponent } from "./components/home-step/home-step.component";
import { LoginSignupComponent } from "./components/login-signup/login-signup.component";
import { LoginComponent } from "./components/login-signup/login/login.component";
import { SignupComponent } from "./components/login-signup/signup/signup.component";
import { MiniCarouselComponent } from "./components/mini-carousel/mini-carousel.component";
import { TestimonialComponent } from "./components/testimonial/testimonial.component";
import { RequirementsComponent } from "./components/requirements/requirements.component";
import { HomeContainerComponent } from "./components/home-container/home-container.component";
import { WhyChooseUsComponent } from "./components/why-choose-us/why-choose-us.component";
import { MobileNavComponent } from "./components/mobile-nav/mobile-nav.component";
import { MobileFooterComponent } from "./components/mobile-footer/mobile-footer.component";
import { AddPassengerDetailsComponent } from "./add-passenger-details/add-passenger-details.component";
import { AddTravellerComponent } from "./components/add-traveller/add-traveller.component";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { CarouselModule } from "ngx-owl-carousel-o";
// import { ServiceWorkerModule } from '@angular/service-worker';

import { DateComponent } from "./components/date/date.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RequestInterceptor } from "./shared/request.interceptor";
import { ToastComponent } from "./shared/components/toast/toast.component";
import { ChatboxComponent } from "./chatbox/chatbox.component";
import { FreeVisaComponent } from "./components/free-visa/free-visa.component";
import { VisaArrivalComponent } from "./components/visa-arrival/visa-arrival.component";
import { SimComponent } from "./components/sim/sim.component";
import { InsuranceComponent } from "./components/insurance/insurance.component";
import { PreloaderComponent } from "./shared/preloader/preloader.component";

import { AustraliaComponent } from "./components/visa-requirements/australia/australia.component";
import { UnitedKingdomComponent } from "./components/visa-requirements/united-kingdom/united-kingdom.component";
import { FranceComponent } from "./components/visa-requirements/france/france.component";
import { ChinaComponent } from "./components/visa-requirements/china/china.component";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SwitzerlandComponent } from './components/visa-requirements/switzerland/switzerland.component';
import { EthiopianComponent } from './components/visa-requirements/ethiopian/ethiopian.component';
import { DubaiComponent } from './components/visa-requirements/dubai/dubai.component';
import { MalaysiaComponent } from './components/visa-requirements/malaysia/malaysia.component';
import { MaldivesComponent } from './components/visa-requirements/maldives/maldives.component';
import { SpainComponent } from './components/visa-requirements/spain/spain.component';
import { SingaporeComponent } from './components/visa-requirements/singapore/singapore.component';
import { SriLankaComponent } from './components/visa-requirements/sri-lanka/sri-lanka.component';
import { AuthenticationGuard } from './shared/AuthenticationGuard.service';

import { TermsandConditionsComponent } from './components/static/termsand-conditions/termsand-conditions.component';
import { CookiePolicyComponent } from './components/static/cookie-policy/cookie-policy.component';
import { PrivacyPolicyComponent } from './components/static/privacy-policy/privacy-policy.component';
import { CancellationsAndReturnComponent } from './components/static/cancellations-and-return/cancellations-and-return.component';

import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { SimplansComponent } from './components/simplans/simplans.component';
import { SimcheckoutComponent } from './components/simcheckout/simcheckout.component';
import { AboutUsComponent } from './components/static/about-us/about-us.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { B2bHomeComponent } from './components/b2b/b2b-home/b2b-home.component';
import { B2bReqComponent } from './components/b2b/b2b-req/b2b-req.component';
import { B2bHeaderComponent } from './components/b2b/b2b-header/b2b-header.component';
import { B2bAddTrvComponent } from './components/b2b/b2b-add-trv/b2b-add-trv.component'
import { CombodiaComponent } from './components/visa-requirements/combodia/combodia.component';
import { TurkeyComponent } from './components/visa-requirements/turkey/turkey.component';
import { AzerbaijanComponent } from './components/visa-requirements/azerbaijan/azerbaijan.component';
import { RemovewhitespacePipe } from './shared/removeWhiteSpace.pipe';
import { B2bResponseComponent } from './components/b2b/b2b-response/b2b-response.component';
import { B2bFooterComponent } from './components/b2b/b2b-footer/b2b-footer.component';
import { SomethingWrongComponent } from './shared/components/something-wrong/something-wrong.component';
import { B2bMobileNavComponent} from './components/b2b/b2b-mobile-nav/b2b-mobile-nav.component';
import { ThailandComponent } from './components/visa-requirements/thailand/thailand.component';
import { VietnamComponent } from './components/visa-requirements/vietnam/vietnam.component';
import { WorldComponent } from './components/world/world.component';
import { USAComponent } from './components/visa-requirements/usa/usa.component';
import { NetherlandsComponent } from './components/visa-requirements/netherlands/netherlands.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    HomeFormComponent,
    HomeStepComponent,
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    MiniCarouselComponent,
    TestimonialComponent,
    RequirementsComponent,
    HomeContainerComponent,
    WhyChooseUsComponent,
    MobileNavComponent,
    MobileFooterComponent,
    WorldComponent,

    AddPassengerDetailsComponent,
    AddTravellerComponent,
    DateComponent,
    ToastComponent,
    ChatboxComponent,
    FreeVisaComponent,
    VisaArrivalComponent,
    SimComponent,
    InsuranceComponent,
    PreloaderComponent,

    TermsandConditionsComponent,
    CookiePolicyComponent,
    PrivacyPolicyComponent,
    CancellationsAndReturnComponent,

    BookingDetailsComponent,
    SimplansComponent,
    SimcheckoutComponent,
    AboutUsComponent,

    AustraliaComponent,
    UnitedKingdomComponent,
    FranceComponent,
    ChinaComponent,
    SwitzerlandComponent,
    EthiopianComponent,
    DubaiComponent,
    MalaysiaComponent,
    MaldivesComponent,
    SpainComponent,
    SingaporeComponent,
    SriLankaComponent,
    CombodiaComponent,
    TurkeyComponent,
    AzerbaijanComponent,
    RemovewhitespacePipe,

    B2bHomeComponent,
    B2bReqComponent,
    B2bHeaderComponent,
    B2bAddTrvComponent,
    B2bResponseComponent,
    B2bFooterComponent,
    B2bMobileNavComponent,
    SomethingWrongComponent,
    ThailandComponent,
    VietnamComponent,
    USAComponent,
    NetherlandsComponent,
    PageNotFoundComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2FlatpickrModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbModule,


    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
