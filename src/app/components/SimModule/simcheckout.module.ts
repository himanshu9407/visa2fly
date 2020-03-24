import { NgModule } from '@angular/core';
import { SimcheckoutComponent } from '../simcheckout/simcheckout.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: SimcheckoutComponent, pathMatch: "full" }
]

@NgModule({
  declarations: [
    SimcheckoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})

export class SimCheckoutModule {}
