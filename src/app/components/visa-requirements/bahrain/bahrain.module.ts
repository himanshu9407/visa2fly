import { NgModule } from '@angular/core';
import { BahrainComponent } from './bahrain.component';
import { FaqComponent } from './faq/faq.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { QuotationComponent } from './quotation/quotation.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
    { path: "", component: BahrainComponent },
  ]

@NgModule({
    declarations: [
        BahrainComponent,
        FaqComponent,
        ImportantPointsComponent,
        QuotationComponent,
        RequirementsComponent,
        DescriptionComponent,
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
export class BahrainModule {}