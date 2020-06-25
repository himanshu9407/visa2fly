import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SwitzerlandComponent } from './switzerland.component';

const routes: Routes = [
  { path: "", component: SwitzerlandComponent },
  { path: ":purpose", redirectTo: "", pathMatch: 'full' }
]

@NgModule({
  declarations: [
    SwitzerlandComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ]
})

export class SwitzerlandModule {}
