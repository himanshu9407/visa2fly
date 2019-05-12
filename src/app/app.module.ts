import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    RequirementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
