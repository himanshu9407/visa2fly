import { NgModule } from '@angular/core';
import { TurkeyComponent } from './turkey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirementsTurkeyComponent } from './requirements-turkey/requirements-turkey.component';
import { ImportantPointsTurkeyComponent } from './important-points-turkey/important-points-turkey.component';
import { QuotationTurkeyComponent } from './quotation-turkey/quotation-turkey.component';

const routes: Routes = [
  { path: "", component: TurkeyComponent },
]

@NgModule({
  declarations: [
    TurkeyComponent,
    FaqComponent,
    RequirementsTurkeyComponent,
    ImportantPointsTurkeyComponent,
    QuotationTurkeyComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    MatSelectModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})

export class TurkeyModule {}
