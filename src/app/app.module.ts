import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';

import { MatSelectModule } from "@angular/material/select";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MobileNavComponent } from "./components/mobile-nav/mobile-nav.component";
import { MobileFooterComponent } from "./components/mobile-footer/mobile-footer.component";
import { AddPassengerDetailsComponent } from "./add-passenger-details/add-passenger-details.component";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { CarouselModule } from "ngx-owl-carousel-o";
// import { ServiceWorkerModule } from '@angular/service-worker';
import { DateComponent } from "./components/date/date.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RequestInterceptor } from "./shared/request.interceptor";
import { ToastComponent } from "./shared/components/toast/toast.component";
import { ChatboxComponent } from "./chatbox/chatbox.component";
import { InsuranceComponent } from "./components/insurance/insurance.component";
import { PreloaderComponent } from "./shared/preloader/preloader.component";
import { AuthenticationGuard } from './shared/AuthenticationGuard.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SomethingWrongComponent } from './shared/components/something-wrong/something-wrong.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { B2BModule } from './components/b2b/b2b.module';
import { B2bHeaderComponent } from './components/b2b/b2b-header/b2b-header.component';
import { B2bFooterComponent } from './components/b2b/b2b-footer/b2b-footer.component';
import { B2bMobileNavComponent } from './components/b2b/b2b-mobile-nav/b2b-mobile-nav.component';
import { HomeContainerModule } from './components/home-container/home-container.module';
import { MalaysiaModule } from './components/visa-requirements/malaysia/malaysia.module';
import { AddTravellerModule } from './components/add-traveller/add-traveller.module';
import { LoginSignupModule } from './components/login-signup/login-signup.module';
import { MyBookingsModule } from './components/my-bookings/mybookings.module';
import { ProfileModule } from './components/profile/profile.module';
import { RequirementsModule } from './components/requirements/requirements.module';
import { FreeVisaModule } from './components/free-visa/free-visa.module';
import { SimModule } from './components/sim/sim.module';
import { SimCheckoutModule } from './components/simcheckout/simcheckout.module';
import { SimplansModule } from './components/simplans/simplans.module';
import { VisaArrivalModule } from './components/visa-arrival/visa-arrival.module';
import { AboutUsModule } from './components/static/about-us/about-us.module';
import { CancellationsAndReturnModule } from './components/static/cancellations-and-return/cancellations-and-return.module';
import { CookiePolicyModule } from './components/static/cookie-policy/cookie-policy.module';
import { PrivacyPolicyModule } from './components/static/privacy-policy/privacy-policy.module';
import { TermsandConditionsModule } from './components/static/termsand-conditions/termsand-conditions.module';
import { VisaRequirementModule } from './components/visa-requirements/visa-requirement.module';
import { BookingDetailsModule } from './components/booking-details/booking-details.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    MobileFooterComponent,
    AddPassengerDetailsComponent,
    DateComponent,
    ToastComponent,
    ChatboxComponent,
    InsuranceComponent,
    PreloaderComponent,
    SomethingWrongComponent,
    B2bHeaderComponent,
    B2bFooterComponent,
    B2bMobileNavComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(), // ToastrModule added
    Ng2FlatpickrModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbModule,
    HomeContainerModule,
    B2BModule,
    AddTravellerModule,
    LoginSignupModule,
    MyBookingsModule,
    ProfileModule,
    RequirementsModule,
    FreeVisaModule,
    SimModule,
    SimCheckoutModule,
    SimplansModule,
    VisaArrivalModule,
    AboutUsModule,
    CancellationsAndReturnModule,
    CookiePolicyModule,
    PrivacyPolicyModule,
    TermsandConditionsModule,
    VisaRequirementModule,
    BookingDetailsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
