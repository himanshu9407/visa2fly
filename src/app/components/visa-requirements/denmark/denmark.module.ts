import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenmarkComponent } from './denmark.component';
import { FaqComponent } from './faq/faq.component';
import { QuotationComponent } from './quotation/quotation.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
  { path: "", component: DenmarkComponent },
]

@NgModule({
  declarations: [DenmarkComponent, FaqComponent, QuotationComponent, ImportantPointsComponent, RequirementsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class DenmarkModule { }
