import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { MaltaComponent } from './malta.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { QuotationComponent } from './quotation/quotation.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
  { path: "", component: MaltaComponent },
]

@NgModule({
  declarations: [FaqComponent, MaltaComponent, ImportantPointsComponent, QuotationComponent, RequirementsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    SharedVisaModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class MaltaModule { }
