import { NgModule } from '@angular/core';
import { UzbekistanComponent } from './uzbekistan.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirementsUzbekistanComponent } from './requirements-uzbekistan/requirements-uzbekistan.component';
import { ImportantPointsUzbekistanComponent } from './important-points-uzbekistan/important-points-uzbekistan.component';
import { QuotationUzbekistanComponent } from './quotation-uzbekistan/quotation-uzbekistan.component';

const routes: Routes = [
    { path: "", component: UzbekistanComponent },
  ]

@NgModule({
    declarations: [
        UzbekistanComponent,
        FaqComponent,
        RequirementsUzbekistanComponent,
        ImportantPointsUzbekistanComponent,
        QuotationUzbekistanComponent
    ],
    imports : [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbModule,
        SharedVisaModuleModule,
        
        RouterModule.forChild(routes)
    ]
})
export class UzbekistanModule {}