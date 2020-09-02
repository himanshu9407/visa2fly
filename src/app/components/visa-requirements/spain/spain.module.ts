import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SpainComponent } from './spain.component';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsSpainComponent } from './important-points-spain/important-points-spain.component';
import { QuotationSpainComponent } from './quotation-spain/quotation-spain.component';
import { RequirementsSpainComponent } from './requirements-spain/requirements-spain.component';

const routes: Routes = [
  { path: "", component: SpainComponent },
]

@NgModule({
  declarations: [
    SpainComponent,
    FaqComponent,
    ImportantPointsSpainComponent,
    QuotationSpainComponent,
    RequirementsSpainComponent
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

export class SpainModule {}
