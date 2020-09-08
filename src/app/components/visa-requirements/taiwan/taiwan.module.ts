import { NgModule } from '@angular/core';
import { TaiwanComponent } from './taiwan.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirementTaiwanComponent } from './requirement-taiwan/requirement-taiwan.component';
import { ImportantPointsTaiwanComponent } from './important-points-taiwan/important-points-taiwan.component';
import { QuotationTaiwanComponent } from './quotation-taiwan/quotation-taiwan.component';

const routes: Routes = [
    { path: "", component: TaiwanComponent },
]

@NgModule({
    declarations: [
        TaiwanComponent,
        FaqComponent,
        RequirementTaiwanComponent,
        ImportantPointsTaiwanComponent,
        QuotationTaiwanComponent
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
export class TaiwanModule {}