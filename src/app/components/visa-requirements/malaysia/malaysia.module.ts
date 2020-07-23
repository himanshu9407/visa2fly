import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MalaysiaComponent } from './malaysia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';


const routes: Routes = [
  { path: "", component: MalaysiaComponent },
]

@NgModule({
  declarations: [
    MalaysiaComponent
  ],

  imports:[
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
export class MalaysiaModule {}
