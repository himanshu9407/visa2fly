import { NgModule } from '@angular/core';
import { SimComponent } from '../sim/sim.component';
import { SimplansComponent } from '../simplans/simplans.component';
import { SimcheckoutComponent } from '../simcheckout/simcheckout.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: SimComponent, pathMatch: "full" },
  { path: "", component: SimplansComponent, pathMatch: "full" },
  { path: "", component: SimcheckoutComponent, pathMatch: "full" }
]

@NgModule({
  declarations: [
    SimComponent,
    SimplansComponent,
    SimcheckoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SimModule {}
