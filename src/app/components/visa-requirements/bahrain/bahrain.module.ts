import { NgModule } from '@angular/core';
import { BahrainComponent } from './bahrain.component';
import { FaqComponent } from './faq/faq.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { QuotationComponent } from './quotation/quotation.component';
import { RequirementsComponent } from './requirements/requirements.component';

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
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        MatSelectModule,
        SharedVisaModuleModule,
        RouterModule.forChild(routes)
      ]
})
export class BahrainModule {}