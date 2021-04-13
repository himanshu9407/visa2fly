import { HomeFormResolver } from './home-form/home-form-resolver.service';
import { NgModule } from '@angular/core';
import { HomeContainerComponent } from './home-container.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { MiniCarouselComponent } from './mini-carousel/mini-carousel.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { HomeFormComponent } from './home-form/home-form.component';
import { WorldComponent } from './world/world.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { HomeStepComponent } from './home-step/home-step.component';
import { SiteBriefComponent } from './site-brief/site-brief.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { OfferBannerComponent } from './offer-banner/offer-banner.component';

const routes: Routes = [
  { path: "", component: HomeContainerComponent, resolve: { homeFormData: HomeFormResolver } }
]


@NgModule({
  declarations: [
    HomeContainerComponent,
    CarouselComponent,
    MiniCarouselComponent,
    WhyChooseUsComponent,
    HomeFormComponent,
    WorldComponent,
    TestimonialComponent,
    HomeStepComponent,
    SiteBriefComponent,
    OfferBannerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    AutocompleteLibModule,
    RouterModule.forChild(routes)
  ]
})

export class HomeContainerModule { }
