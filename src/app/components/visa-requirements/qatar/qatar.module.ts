import { RequirmentsQatarComponent } from './requirments-qatar/requirments-qatar.component';
import { QuotationQatarComponent } from './quotation-qatar/quotation-qatar.component';
import { ImportantPointsQatarComponent } from './important-points-qatar/important-points-qatar.component';
import { QatarComponent } from './qatar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqQatarComponent } from './faq-qatar/faq-qatar.component';


const routes: Routes = [
    { path: "", component: QatarComponent },
  ]

@NgModule({
    declarations: [
        QatarComponent,
        FaqQatarComponent,
        ImportantPointsQatarComponent,
        QuotationQatarComponent,
        RequirmentsQatarComponent
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
export class QatarModule {}
