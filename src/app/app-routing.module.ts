import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
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
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
    const routes: Routes = [
         {  path: '',component: HomecomponentComponent},
         {  path: 'login',component:LoginSignupComponent},
         {  path: 'mini',component:MiniCarouselComponent},
         {  path: 'hf',component:HomeFormComponent},
        
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
    export class AppRoutingModule { }