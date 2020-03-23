import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaldivesComponent } from './maldives.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: "", component: MaldivesComponent, pathMatch: "full" },
]

@NgModule({
  declarations: [
    MaldivesComponent,
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

export class MaldivesModule {}
