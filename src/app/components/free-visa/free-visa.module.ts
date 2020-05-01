import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FreeVisaComponent } from './free-visa.component';

const routes: Routes = [
  { path: "", component: FreeVisaComponent, pathMatch: "full"}
]

@NgModule({
  declarations: [
    FreeVisaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})

export class FreeVisaModule {}
