import { NgModule } from '@angular/core';
import { HomeContainerComponent } from './home-container.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { HomeFormComponent } from '../home-form/home-form.component';
import { MiniCarouselComponent } from '../mini-carousel/mini-carousel.component';
import { WhyChooseUsComponent } from '../why-choose-us/why-choose-us.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeStepComponent } from '../home-step/home-step.component';
import { WorldComponent } from '../world/world.component';
import { RemovewhitespacesPipe } from 'src/app/shared/removewhitespaces.pipe';

const routes: Routes = [
  { path: "", component: HomeContainerComponent, pathMatch: "full" }
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
    RemovewhitespacesPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})

export class HomeContainerModule {}
