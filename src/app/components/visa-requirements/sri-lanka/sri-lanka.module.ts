import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { SriLankaComponent } from './sri-lanka.component';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirmentSrilankaComponent } from './requirment-srilanka/requirment-srilanka.component';
import { ImportantPointsSrilankaComponent } from './important-points-srilanka/important-points-srilanka.component';
import { QuotationSrilankaComponent } from './quotation-srilanka/quotation-srilanka.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  { path: "", component: SriLankaComponent },
]

@NgModule({
  declarations: [
    SriLankaComponent,
    FaqComponent,
    RequirmentSrilankaComponent,
    ImportantPointsSrilankaComponent,
    QuotationSrilankaComponent,
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

export class SrilankaModule {}
