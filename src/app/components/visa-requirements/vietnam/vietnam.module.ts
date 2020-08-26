import { NgModule } from '@angular/core';
import { VietnamComponent } from './vietnam.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsVietnamComponent } from './important-points-vietnam/important-points-vietnam.component';
import { QuotationVietnamComponent } from './quotation-vietnam/quotation-vietnam.component';
import { RequirementVietnamComponent } from './requirement-vietnam/requirement-vietnam.component';

const routes: Routes = [
  { path: "", component: VietnamComponent },
]

@NgModule({
  declarations: [
    VietnamComponent,
    FaqComponent,
    ImportantPointsVietnamComponent,
    QuotationVietnamComponent,
    RequirementVietnamComponent
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

export class VietnamModule {}
