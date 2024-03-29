import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UAEComponent } from './uae.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaqComponent } from './faq/faq.component';
import { RequirementsUaeComponent } from './requirements-uae/requirements-uae.component';
import { QuotationUaeComponent } from './quotation-uae/quotation-uae.component';
import { ImportantPointsUaeComponent } from './important-points-uae/important-points-uae.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  { path: "", component: UAEComponent },
]

@NgModule({
  declarations: [UAEComponent, FaqComponent, RequirementsUaeComponent, QuotationUaeComponent, ImportantPointsUaeComponent, DescriptionComponent],
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
export class UAEModule { }
