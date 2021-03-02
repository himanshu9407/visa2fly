import { NgModule } from '@angular/core';
import { FaqComponent } from './faq/faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AfghanistanComponent } from './afghanistan.component';
import { RequirementAfghanistanComponent } from './requirement-afghanistan/requirement-afghanistan.component';
import { ImportantPointsAfghanistanComponent } from './important-points-afghanistan/important-points-afghanistan.component';
import { QuotationAfghanistanComponent } from './quotation-afghanistan/quotation-afghanistan.component';

const routes: Routes = [
    { path: "", component: AfghanistanComponent },
  ]

@NgModule({
    declarations : [
        AfghanistanComponent,
        FaqComponent,
        RequirementAfghanistanComponent,
        ImportantPointsAfghanistanComponent,
        QuotationAfghanistanComponent
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
export class AfghanistanModule {}