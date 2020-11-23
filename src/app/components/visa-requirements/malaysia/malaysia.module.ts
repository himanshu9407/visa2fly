import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MalaysiaComponent } from './malaysia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirementMalaysiaComponent } from './requirement-malaysia/requirement-malaysia.component';
import { ImportantPointsMalaysiaComponent } from './important-points-malaysia/important-points-malaysia.component';
import { QuotationMalaysiaComponent } from './quotation-malaysia/quotation-malaysia.component';


const routes: Routes = [
  { path: "", component: MalaysiaComponent },
]

@NgModule({
  declarations: [
    MalaysiaComponent,
    FaqComponent,
    RequirementMalaysiaComponent,
    ImportantPointsMalaysiaComponent,
    QuotationMalaysiaComponent
  ],

  imports:[
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    SharedVisaModuleModule,
    
    RouterModule.forChild(routes)
  ]
})
export class MalaysiaModule {}
