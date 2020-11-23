import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FranceComponent } from './france.component';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { QuotationComponent } from './quotation/quotation.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { RequirementsComponent } from './requirements/requirements.component';

const routes: Routes = [
  { path: "", component: FranceComponent },
];

@NgModule({
  declarations: [
    FranceComponent,
    FaqComponent,
    QuotationComponent,
    ImportantPointsComponent,
    RequirementsComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class FranceModule {}
