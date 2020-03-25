import { NgModule } from '@angular/core';
import { TermsandConditionsComponent } from './termsand-conditions.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: TermsandConditionsComponent, pathMatch: "full" },
]

@NgModule({
  declarations: [
    TermsandConditionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})

export class TermsandConditionsModule {}
