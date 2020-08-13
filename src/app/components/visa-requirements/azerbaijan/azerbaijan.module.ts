import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { AzerbaijanComponent } from './azerbaijan.component';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  { path: "", component: AzerbaijanComponent },
]

@NgModule({
  declarations: [
    AzerbaijanComponent,
    FaqComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedVisaModuleModule,
    NgbModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class AzerbaijanModule {}
