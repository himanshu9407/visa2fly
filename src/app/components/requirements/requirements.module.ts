import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RequirementsComponent } from './requirements.component';
import { RemovespacePipe } from './removespace.pipe';
import { SharedVisaModuleModule } from '../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
  { path: "", component: RequirementsComponent }
]

@NgModule({
  declarations: [
    RequirementsComponent,
    RemovespacePipe,
  ],
  
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedVisaModuleModule,
    NgbModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class RequirementsModule {}
