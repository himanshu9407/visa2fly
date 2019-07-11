import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

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
import { DateComponent } from './components/date/date.component';

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
    DateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2FlatpickrModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


