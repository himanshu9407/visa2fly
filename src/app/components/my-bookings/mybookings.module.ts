import { NgModule } from '@angular/core';
import { MyBookingsComponent } from './my-bookings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationGuard } from 'src/app/shared/AuthenticationGuard.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: "", component: MyBookingsComponent, pathMatch: "full", canActivate: [AuthenticationGuard] }
]



@NgModule({
  declarations: [
    MyBookingsComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]

})
export class MyBookingsModule {}
