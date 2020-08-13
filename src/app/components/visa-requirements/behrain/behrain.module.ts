import { NgModule } from '@angular/core';
import { BehrainComponent } from './behrain.component';
import { FaqComponent } from './faq/faq.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
    { path: "", component: BehrainComponent },
  ]

@NgModule({
    declarations: [
        BehrainComponent,
        FaqComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        MatSelectModule,
        SharedVisaModuleModule,
        RouterModule.forChild(routes)
      ]
})
export class BehrainModule {}