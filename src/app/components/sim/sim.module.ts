import { NgModule } from '@angular/core';
import { SimComponent } from './sim.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  { path: "", component: SimComponent, pathMatch: "full" },

]

@NgModule({
  declarations: [
    SimComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SimModule {}
