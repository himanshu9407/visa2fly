import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SwitzerlandComponent } from './switzerland.component';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsSwitzerlandComponent } from './important-points-switzerland/important-points-switzerland.component';
import { QuotationSwitzerlandComponent } from './quotation-switzerland/quotation-switzerland.component';
import { RequirementsSwitzerlandComponent } from './requirements-switzerland/requirements-switzerland.component';

const routes: Routes = [
  { path: "", component: SwitzerlandComponent },
]

@NgModule({
  declarations: [
    SwitzerlandComponent,
    FaqComponent,
    ImportantPointsSwitzerlandComponent,
    QuotationSwitzerlandComponent,
    RequirementsSwitzerlandComponent
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

export class SwitzerlandModule {}
