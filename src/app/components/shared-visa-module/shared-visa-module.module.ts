import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemovespacePipe } from '../requirements/removespace.pipe';
import { CountryAddressComponent } from './country-address/country-address.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CountryAddressComponent,
  ],
  
  imports: [
  ],

  exports: [
    CountryAddressComponent
  ]
})
export class SharedVisaModuleModule { }
