import { NgModule } from '@angular/core';
import { UkraineComponent } from './ukraine.component';
import { FaqComponent } from './faq/faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

import { RouterModule, Routes } from '@angular/router';
import { QuotationUkraineComponent } from './quotation-ukraine/quotation-ukraine.component';
import { RequirementUkraineComponent } from './requirement-ukraine/requirement-ukraine.component';
import { ImportantPointsUkraineComponent } from './important-points-ukraine/important-points-ukraine.component';

const routes: Routes = [
    { path: "", component: UkraineComponent },
    // { path: ":purpose", redirectTo: "", pathMatch: 'full' }
  ]

@NgModule({
    declarations: [
        UkraineComponent,
        FaqComponent,
        QuotationUkraineComponent,
        RequirementUkraineComponent,
        ImportantPointsUkraineComponent
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
export class UkraineModule {}