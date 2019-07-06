    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import {RequirementsComponent} from './components/requirements/requirements.component'
    import { HomeFormComponent } from './components/home-form/home-form.component';
    import { LoginSignupComponent } from './components/login-signup/login-signup.component';
    import { MiniCarouselComponent } from './components/mini-carousel/mini-carousel.component';
    import { HomeContainerComponent } from './components/home-container/home-container.component';
    import { AddTravellerComponent } from './components/add-traveller/add-traveller.component';
    const routes: Routes = [
         {  path: 'home',component:HomeContainerComponent},
         {  path: 'login',component:LoginSignupComponent},
         {  path: 'mini',component:MiniCarouselComponent},
         {  path: 'hf',component:HomeFormComponent},
         {  path : '' , component : HomeContainerComponent},
         {  path : 'reg' , component : RequirementsComponent},
         {  path : 'addTraveller' , component : AddTravellerComponent}
        ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { 
        
    }