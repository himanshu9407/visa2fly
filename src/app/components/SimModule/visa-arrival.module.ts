import { NgModule } from '@angular/core';
import { VisaArrivalComponent } from '../visa-arrival/visa-arrival.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: VisaArrivalComponent, pathMatch: "full"}
]

@NgModule({
  declarations: [
    VisaArrivalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class VisaArrivalModule {}
