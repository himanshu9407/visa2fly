import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IraqComponent } from './iraq.component';
import { ImportantPointsComponent } from './important-points/important-points.component';



@NgModule({
  declarations: [IraqComponent, ImportantPointsComponent],
  imports: [
    CommonModule
  ]
})
export class IraqModule { }
