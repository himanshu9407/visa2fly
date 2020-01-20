import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeFormComponent } from './components/home-form/home-form.component';
import { HomeStepComponent } from './components/home-step/home-step.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { LoginComponent } from './components/login-signup/login/login.component';
import { SignupComponent } from './components/login-signup/signup/signup.component';
import { MiniCarouselComponent } from './components/mini-carousel/mini-carousel.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { HomeContainerComponent } from './components/home-container/home-container.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { MobileFooterComponent } from './components/mobile-footer/mobile-footer.component';
import { AddPassengerDetailsComponent } from './add-passenger-details/add-passenger-details.component';
import { AddTravellerComponent } from './components/add-traveller/add-traveller.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { DateComponent } from './components/date/date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestInterceptor } from './shared/request.interceptor';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { FreeVisaComponent } from './components/free-visa/free-visa.component';
import { VisaArrivalComponent } from './components/visa-arrival/visa-arrival.component';
import { SimComponent } from './components/sim/sim.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { PreloaderComponent } from './shared/preloader/preloader.component';

import { AuthenticationGuard } from './shared/AuthenticationGuard.service';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { TermsandConditionsComponent } from './components/static/termsand-conditions/termsand-conditions.component';
import { CookiePolicyComponent } from './components/static/cookie-policy/cookie-policy.component';
import { PrivacyPolicyComponent } from './components/static/privacy-policy/privacy-policy.component';
import { CancellationsAndReturnComponent } from './components/static/cancellations-and-return/cancellations-and-return.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { SimplansComponent } from './components/simplans/simplans.component';
import { SimcheckoutComponent } from './components/simcheckout/simcheckout.component';
import { AboutUsComponent } from './components/static/about-us/about-us.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AustraliaComponent } from './components/visa-requirements/australia/australia.component';
import { UnitedKingdomComponent } from './components/visa-requirements/united-kingdom/united-kingdom.component';
import { FranceComponent } from './components/visa-requirements/france/france.component';
import { ChinaComponent } from './components/visa-requirements/china/china.component';
import { SwitzerlandComponent } from './components/visa-requirements/switzerland/switzerland.component';


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
    MyBookingsComponent,
    TermsandConditionsComponent,
    CookiePolicyComponent,
    PrivacyPolicyComponent,
    CancellationsAndReturnComponent,
    ProfileComponent,
    BookingDetailsComponent,
    SimplansComponent,
    SimcheckoutComponent,
    AboutUsComponent,
    AustraliaComponent,
    UnitedKingdomComponent,
    FranceComponent,
    ChinaComponent,
    SwitzerlandComponent
  ],
  imports: [
    BrowserModule,
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
    ServiceWorkerModule.register('safety-worker.js', { enabled: environment.production }),


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi:true}],
  bootstrap: [AppComponent] 
})
export class AppModule { }


