import { NgModule } from '@angular/core';
import { CountryAddressComponent } from './country-address/country-address.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProcessStepsComponent } from './process-steps/process-steps.component';

@NgModule({
  declarations: [
    CountryAddressComponent,
    ProcessStepsComponent,
  ],
  
  imports: [
    RouterModule,
    CommonModule
  ],

  exports: [
    CountryAddressComponent,
    ProcessStepsComponent
  ]
})
export class SharedVisaModuleModule { }
