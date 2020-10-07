import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingStatusComponent } from './booking-status.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: BookingStatusComponent, pathMatch: "full" }
]

@NgModule({
  declarations: [BookingStatusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BookingStatusModule { }