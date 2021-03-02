import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AustriaComponent } from './austria.component';
import { QuotationComponent } from './quotation/quotation.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirementsComponent } from './requirements/requirements.component';

const routes: Routes = [
  { path: "", component: AustriaComponent }
]

@NgModule({
  declarations: [AustriaComponent, QuotationComponent, ImportantPointsComponent, FaqComponent, RequirementsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class AustriaModule { }
