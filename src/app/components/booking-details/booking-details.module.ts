import { NgModule } from '@angular/core';
import { BookingDetailsComponent } from './booking-details.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: BookingDetailsComponent }
]

@NgModule({
  declarations: [
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BookingDetailsModule {}
