import { B2bSimHomeComponent } from './b2b-sim-home/b2b-sim-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedVisaModuleModule } from '../shared-visa-module/shared-visa-module.module';
import { B2bSimSimcheckoutComponent } from './b2b-sim-simcheckout/b2b-sim-simcheckout.component';
import { B2bSimSimplansComponent } from './b2b-sim-simplans/b2b-sim-simplans.component';
import { SomethingWrongComponent } from 'src/app/shared/components/something-wrong/something-wrong.component';

const routes: Routes = [
  { path: "", component: B2bSimHomeComponent },
  { path: "plans", component: B2bSimSimplansComponent },
  { path: "application-form", component: B2bSimSimcheckoutComponent },
  {
    path: "something-went-wrong",
    component: SomethingWrongComponent
  },
  { path: "**", redirectTo: "page-not-found", pathMatch: "prefix" }
]

@NgModule({
  declarations: [B2bSimHomeComponent, B2bSimSimcheckoutComponent, B2bSimSimplansComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    SharedVisaModuleModule,

    RouterModule.forChild(routes)
  ]
})
export class B2bSimModule { }
