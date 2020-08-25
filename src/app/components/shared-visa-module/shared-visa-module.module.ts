import { NgModule } from '@angular/core';
import { CountryAddressComponent } from './country-address/country-address.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnlineProcessStepsComponent } from './online-process-steps/online-process-steps.component';
import { OfflineProcessStepsComponent } from './offline-process-steps/offline-process-steps.component';

@NgModule({
  declarations: [
    CountryAddressComponent,
    OnlineProcessStepsComponent,
    OfflineProcessStepsComponent,
  ],
  
  imports: [
    RouterModule,
    CommonModule
  ],

  exports: [
    CountryAddressComponent,
    OnlineProcessStepsComponent,
    OfflineProcessStepsComponent,
  ]
})
export class SharedVisaModuleModule { }
