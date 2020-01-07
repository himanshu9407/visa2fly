    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import {RequirementsComponent} from './components/requirements/requirements.component'
    import { HomeFormComponent } from './components/home-form/home-form.component';
    import { LoginSignupComponent } from './components/login-signup/login-signup.component';
    import { MiniCarouselComponent } from './components/mini-carousel/mini-carousel.component';
    import { HomeContainerComponent } from './components/home-container/home-container.component';
    import { AddTravellerComponent } from './components/add-traveller/add-traveller.component';
    import { SignupComponent } from './components/login-signup/signup/signup.component';
    import { FreeVisaComponent } from './components/free-visa/free-visa.component';
    import { VisaArrivalComponent } from './components/visa-arrival/visa-arrival.component';
    import { SimComponent } from './components/sim/sim.component';
    import { InsuranceComponent } from './components/insurance/insurance.component';
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
import { AboutUsComponent } from './components/static/about-us/about-us.component'
import { B2bHomeComponent } from './components/b2b/b2b-home/b2b-home.component';
import { B2bReqComponent } from './components/b2b/b2b-req/b2b-req.component';
import { B2bAddTrvComponent } from './components/b2b/b2b-add-trv/b2b-add-trv.component';
    
    const routes: Routes = [
         {  path: '', redirectTo : 'visa', pathMatch : "full"},
         {  path: 'visa', component: HomeContainerComponent},
         {  path: 'tnc',component:TermsandConditionsComponent},
         {  path: 'cookiePolicy',component:CookiePolicyComponent},
         {  path: 'privacyPolicy',component:PrivacyPolicyComponent},
         {  path: 'cancellationPolicy',component:CancellationsAndReturnComponent},
         {  path: 'aboutUs',component:AboutUsComponent},
         {  path: 'bookingDetail', component : BookingDetailsComponent},

         {  path: 'slcontainer/:form', component : LoginSignupComponent},
         {  path: 'profile', component : ProfileComponent},
         {  path : 'reg' , component : RequirementsComponent},
         {  path : 'addTraveller' , component : AddTravellerComponent,canActivate:[AuthenticationGuard]},
         {  path : 'freeVisa' , component : FreeVisaComponent},
         {  path : 'visOnArrival' , component : VisaArrivalComponent},
         {  path : 'visaArrival' , component : VisaArrivalComponent},
         {  path : 'sim' , component : SimComponent},
         {  path : 'sim/simplans' , component : SimplansComponent},
         {  path : 'sim/checkout' , component : SimcheckoutComponent},
         {  path : 'insurance' , component : InsuranceComponent},
         {  path : 'myBookings' , component : MyBookingsComponent,canActivate:[AuthenticationGuard]},
         {  path : 'b2b/home', component: B2bHomeComponent},
         {  path : 'b2b/visa-requirement/:country/:purpose', component: B2bReqComponent},
         {  path : 'b2b/visa-requirement/b2b-add-traveller', component: B2bAddTrvComponent}

        ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule {

    }
