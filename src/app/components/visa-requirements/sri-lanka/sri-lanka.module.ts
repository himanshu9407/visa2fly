import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SriLankaComponent } from './sri-lanka.component';

const routes: Routes = [
  { path: "", component: SriLankaComponent },
  { path: ":purpose", redirectTo: "", pathMatch: 'full' }
]

@NgModule({
  declarations: [
    SriLankaComponent
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

export class SrilankaModule {}
