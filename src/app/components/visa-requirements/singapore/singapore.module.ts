import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SingaporeComponent } from './singapore.component';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';


const routes: Routes = [
  { path: "", component: SingaporeComponent },
]

@NgModule({
  declarations: [
    SingaporeComponent
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

export class SingaporeModule {}
