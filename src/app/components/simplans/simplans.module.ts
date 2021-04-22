import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { SimplansComponent } from './simplans.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: SimplansComponent, pathMatch: "full" },

]

@NgModule({
  declarations: [
    SimplansComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ]
})

export class SimplansModule { }
