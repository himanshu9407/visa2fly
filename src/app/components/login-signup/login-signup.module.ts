import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginSignupComponent } from './login-signup.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OtpFormComponent } from './otp-form/otp-form.component';

const routes: Routes = [
  { path: "", component: LoginSignupComponent, pathMatch: "full" }
]

@NgModule({
  declarations: [
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    OtpFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})

export class LoginSignupModule {}
