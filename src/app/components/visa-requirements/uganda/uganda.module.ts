import { RequirementUgandaComponent } from './requirement-uganda/requirement-uganda.component';
import { QuotationUgandaComponent } from './quotation-uganda/quotation-uganda.component';
import { ImportantPointsUgandaComponent } from './important-points-uganda/important-points-uganda.component';
import { FaqUgandaComponent } from './faq-uganda/faq-uganda.component';
import { UgandaComponent } from './uganda.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
  { path: "", component: UgandaComponent },
]

@NgModule({
  declarations : [
    UgandaComponent,
    FaqUgandaComponent,
    ImportantPointsUgandaComponent,
    QuotationUgandaComponent,
    RequirementUgandaComponent
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

export class UgandaModule {}
