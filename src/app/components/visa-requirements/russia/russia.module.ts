import { NgModule } from '@angular/core';
import { RussiaComponent } from './russia.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsRussiaComponent } from './important-points-russia/important-points-russia.component';
import { QuotationRussiaComponent } from './quotation-russia/quotation-russia.component';
import { RequirementRussiaComponent } from './requirement-russia/requirement-russia.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
    { path: "", component: RussiaComponent },
  ]

@NgModule({
    declarations: [
        RussiaComponent,
        FaqComponent,
        ImportantPointsRussiaComponent,
        QuotationRussiaComponent,
        RequirementRussiaComponent,
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
export class RussiaModule {}