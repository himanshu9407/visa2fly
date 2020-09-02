import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaldivesComponent } from './maldives.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';
import { RequirementMaldivesComponent } from './requirement-maldives/requirement-maldives.component';
import { ImportantPointsMaldivesComponent } from './important-points-maldives/important-points-maldives.component';

const routes: Routes = [
  { path: "", component: MaldivesComponent },
]

@NgModule({
  declarations: [
    MaldivesComponent,
    FaqComponent,
    RequirementMaldivesComponent,
    ImportantPointsMaldivesComponent,
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

export class MaldivesModule {}
