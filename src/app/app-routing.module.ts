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
    const routes: Routes = [
         {  path: '',component:HomeContainerComponent},
         {  path: 'home',component:HomeContainerComponent},

         {  path: 'slcontainer/:form', component : LoginSignupComponent},

         {  path: 'slcontainer/:form', component : LoginSignupComponent},
         {  path: 'mini',component:MiniCarouselComponent},
         {  path: 'hf',component:HomeFormComponent},
         {  path : '' , component : HomeContainerComponent},
         {  path : 'reg' , component : RequirementsComponent},
         {  path : 'addTraveller' , component : AddTravellerComponent,canActivate : [AuthenticationGuard]},
         {  path : 'freeVisa' , component : FreeVisaComponent},
         {  path : 'visaArrival' , component : VisaArrivalComponent},
         {  path : 'visa' ,  redirectTo: 'home'},
         {  path : 'sim' , component : SimComponent},
         {  path : 'insurance' , component : InsuranceComponent}

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
