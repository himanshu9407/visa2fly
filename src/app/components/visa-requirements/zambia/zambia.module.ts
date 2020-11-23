import { NgModule } from '@angular/core';
import { ZambiaComponent } from './zambia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsZambiaComponent } from './important-points-zambia/important-points-zambia.component';
import { QuotationZambiaComponent } from './quotation-zambia/quotation-zambia.component';
import { RequirementsZambiaComponent } from './requirements-zambia/requirements-zambia.component';

const routes: Routes = [
    { path: "", component: ZambiaComponent },
  ]

@NgModule({
    declarations:[
        ZambiaComponent,
        FaqComponent,
        ImportantPointsZambiaComponent,
        QuotationZambiaComponent,
        RequirementsZambiaComponent,
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

export class ZambiaModule {}