import { NgModule } from '@angular/core';
import { AntiguaComponent } from './antigua.component';
import { FaqComponent } from './faq/faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequirementAntiguaComponent } from './requirement-antigua/requirement-antigua.component';
import { ImportantPointsAntiguaComponent } from './important-points-antigua/important-points-antigua.component';
import { QuotationAntiguaComponent } from './quotation-antigua/quotation-antigua.component';

const routes: Routes = [
    { path: "", component: AntiguaComponent },
  ]

@NgModule({
    declarations : [
        AntiguaComponent,
        FaqComponent,
        RequirementAntiguaComponent,
        ImportantPointsAntiguaComponent,
        QuotationAntiguaComponent
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
export class AntiguaModule {}