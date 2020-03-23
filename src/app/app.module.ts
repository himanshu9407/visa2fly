import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { CarouselModule } from 'ngx-owl-carousel-o';
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
import { TermsandConditionsComponent } from './components/static/termsand-conditions/termsand-conditions.component';
import { CookiePolicyComponent } from './components/static/cookie-policy/cookie-policy.component';
import { PrivacyPolicyComponent } from './components/static/privacy-policy/privacy-policy.component';
import { CancellationsAndReturnComponent } from './components/static/cancellations-and-return/cancellations-and-return.component';
import { AboutUsComponent } from './components/static/about-us/about-us.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RemovewhitespacePipe } from './shared/removeWhiteSpace.pipe';
import { SomethingWrongComponent } from './shared/components/something-wrong/something-wrong.component';
import { WorldComponent } from './components/world/world.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    MobileFooterComponent,
    WorldComponent,
    AddPassengerDetailsComponent,
    DateComponent,
    ToastComponent,
    ChatboxComponent,
    InsuranceComponent,
    PreloaderComponent,
    TermsandConditionsComponent,
    CookiePolicyComponent,
    PrivacyPolicyComponent,
    CancellationsAndReturnComponent,
    AboutUsComponent,
    RemovewhitespacePipe,
    SomethingWrongComponent,
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
    NgbModule

    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
