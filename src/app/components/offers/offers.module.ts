import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MobikComponent } from './mobik/mobik.component';

const routes: Routes = [
  { path: "", component: MobikComponent }
]

@NgModule({
  declarations: [MobikComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OffersModule { }
