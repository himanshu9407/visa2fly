import { NgModule } from '@angular/core';
import { CountryAddressComponent } from './country-address/country-address.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CountryAddressComponent,
    
  ],
  
  imports: [
    RouterModule,
    CommonModule
  ],

  exports: [
    CountryAddressComponent
  ]
})
export class SharedVisaModuleModule { }
