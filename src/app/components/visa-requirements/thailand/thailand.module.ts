import { NgModule } from '@angular/core';
import { ThailandComponent } from './thailand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirementThailandComponent } from './requirement-thailand/requirement-thailand.component';
import { ImportantPointsThailandComponent } from './important-points-thailand/important-points-thailand.component';
import { QuotationThailandComponent } from './quotation-thailand/quotation-thailand.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  { path: "", component: ThailandComponent },
]

@NgModule({
  declarations: [
    ThailandComponent,
    FaqComponent,
    RequirementThailandComponent,
    ImportantPointsThailandComponent,
    QuotationThailandComponent,
    DescriptionComponent
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
export class ThailandModule {}
