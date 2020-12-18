import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { GermanyComponent } from './germany.component';



@NgModule({
  declarations: [ImportantPointsComponent, GermanyComponent],
  imports: [
    CommonModule
  ]
})
export class GermanyModule { }
