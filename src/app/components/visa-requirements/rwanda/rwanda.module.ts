import { NgModule } from '@angular/core';
import { RwandaComponent } from './rwanda.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsRwandaComponent } from './important-points-rwanda/important-points-rwanda.component';
import { QuotationRwandaComponent } from './quotation-rwanda/quotation-rwanda.component';
import { RequirementRwandaComponent } from './requirement-rwanda/requirement-rwanda.component';

const routes: Routes = [
    { path: "", component: RwandaComponent },
    { path: ":purpose", redirectTo: "", pathMatch: 'full' }
  ]

@NgModule({
    declarations: [
        RwandaComponent,
        FaqComponent,
        ImportantPointsRwandaComponent,
        QuotationRwandaComponent,
        RequirementRwandaComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbModule,
        SharedVisaModuleModule,
        MatSelectModule,
        RouterModule.forChild(routes)
    ]
})
export class RwandaModule {}