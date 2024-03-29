import { NgModule } from '@angular/core';
import { SouthAfricaComponent } from './south-africa.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { ImportantPointsSouthafricaComponent } from './important-points-southafrica/important-points-southafrica.component';
import { RequirementSouthafricaComponent } from './requirement-southafrica/requirement-southafrica.component';
import { QuotationSouthafricaComponent } from './quotation-southafrica/quotation-southafrica.component';

const routes: Routes = [
    { path: "", component: SouthAfricaComponent },
  ]

@NgModule({
    declarations: [
        SouthAfricaComponent,
        FaqComponent,
        ImportantPointsSouthafricaComponent,
        RequirementSouthafricaComponent,
        QuotationSouthafricaComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        
        SharedVisaModuleModule,
        RouterModule.forChild(routes)
    ]
})
export class SouthAfricaModule {}