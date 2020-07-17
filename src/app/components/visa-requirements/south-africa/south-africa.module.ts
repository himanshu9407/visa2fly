import { NgModule } from '@angular/core';
import { SouthAfricaComponent } from './south-africa.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
    { path: "", component: SouthAfricaComponent },
  ]

@NgModule({
    declarations: [
        SouthAfricaComponent
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
export class SouthAfricaModule {}