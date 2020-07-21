import { NgModule } from '@angular/core';
import { EgyptComponent } from './egypt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: "", component: EgyptComponent },
  ]

@NgModule({
    declarations: [
        EgyptComponent
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
export class EgyptModule {}