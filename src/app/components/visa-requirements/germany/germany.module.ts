import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { GermanyComponent } from './germany.component';
import { QuotationComponent } from './quotation/quotation.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  { path: "", component: GermanyComponent },
]

@NgModule({
  declarations: [
    ImportantPointsComponent,
    GermanyComponent,
    QuotationComponent,
    RequirementsComponent,
    FaqComponent,
    DescriptionComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class GermanyModule { }
