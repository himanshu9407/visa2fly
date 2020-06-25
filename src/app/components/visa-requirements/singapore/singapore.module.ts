import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SingaporeComponent } from './singapore.component';


const routes: Routes = [
  { path: "", component: SingaporeComponent },
  { path: ":purpose", redirectTo: "", pathMatch: 'full' }
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
    MatSelectModule,
    RouterModule.forChild(routes)
  ]
})

export class SingaporeModule {}
