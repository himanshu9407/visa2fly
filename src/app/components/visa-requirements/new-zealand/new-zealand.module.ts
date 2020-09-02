import { NgModule } from '@angular/core';
import { NewZealandComponent } from './new-zealand.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsNewzealandComponent } from './important-points-newzealand/important-points-newzealand.component';
import { QuotationNewzealandComponent } from './quotation-newzealand/quotation-newzealand.component';
import { RequirementNewzealandComponent } from './requirement-newzealand/requirement-newzealand.component';


const routes: Routes = [
    { path: "", component: NewZealandComponent },
  ]

@NgModule({
    declarations: [
        NewZealandComponent,
        FaqComponent,
        ImportantPointsNewzealandComponent,
        QuotationNewzealandComponent,
        RequirementNewzealandComponent
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
export class NewZealandModule {}