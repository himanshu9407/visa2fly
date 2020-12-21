import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IraqComponent } from './iraq.component';
import { ImportantPointsComponent } from './important-points/important-points.component';
import { QuotationComponent } from './quotation/quotation.component';



@NgModule({
  declarations: [IraqComponent, ImportantPointsComponent, QuotationComponent],
  imports: [
    CommonModule
  ]
})
export class IraqModule { }
