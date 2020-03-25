import { NgModule } from '@angular/core';
import { CancellationsAndReturnComponent } from './cancellations-and-return.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: CancellationsAndReturnComponent, pathMatch: "full" }
]

@NgModule({
  declarations:[
    CancellationsAndReturnComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CancellationsAndReturnModule {}
