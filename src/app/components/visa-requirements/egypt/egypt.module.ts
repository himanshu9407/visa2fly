import { NgModule } from '@angular/core';
import { EgyptComponent } from './egypt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { QuotationComponent } from './quotation/quotation.component';
import { RequirementsComponent } from './requirements/requirements.component';

const routes: Routes = [
    { path: "", component: EgyptComponent },
  ]

@NgModule({
    declarations: [
        EgyptComponent,
        FaqComponent,
        ImportantPointsComponent,
        QuotationComponent,
        RequirementsComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        
        SharedVisaModuleModule,
        RouterModule.forChild(routes)
    ]
})
export class EgyptModule {}