import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { USAComponent } from './usa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirementsUsaComponent } from './requirements-usa/requirements-usa.component';
import { ImportantPointsUsaComponent } from './important-points-usa/important-points-usa.component';
import { QuotationUsaComponent } from './quotation-usa/quotation-usa.component';

const routes: Routes = [
  { path: "", component: USAComponent },
]

@NgModule({
  declarations: [
    USAComponent,
    FaqComponent,
    RequirementsUsaComponent,
    ImportantPointsUsaComponent,
    QuotationUsaComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    SharedVisaModuleModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ]
})

export class USAModule {}
