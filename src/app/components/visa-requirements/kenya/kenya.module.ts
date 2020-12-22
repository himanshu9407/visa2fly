import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KenyaComponent } from './kenya.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { FaqComponent } from './faq/faq.component';
import { QuotationComponent } from './quotation/quotation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
  { path: "", component: KenyaComponent },
]

@NgModule({
  declarations: [KenyaComponent, RequirementsComponent, ImportantPointsComponent, FaqComponent, QuotationComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class KenyaModule { }
