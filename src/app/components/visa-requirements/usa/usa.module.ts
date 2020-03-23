import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { USAComponent } from './usa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: "", component: USAComponent, pathMatch: "full" },
]

@NgModule({
  declarations: [
    USAComponent
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

export class USAModule {}
