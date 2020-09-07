import { NgModule } from '@angular/core';
import { TajikistanComponent } from './tajikistan.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { QuotationTajikistanComponent } from './quotation-tajikistan/quotation-tajikistan.component';
import { RequirementTajikistanComponent } from './requirement-tajikistan/requirement-tajikistan.component';

const routes: Routes = [
    { path: "", component: TajikistanComponent },
  ]

@NgModule({
    declarations: [
        TajikistanComponent,
        FaqComponent,
        ImportantPointsComponent,
        QuotationTajikistanComponent,
        RequirementTajikistanComponent
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
export class TajikistanModule {}