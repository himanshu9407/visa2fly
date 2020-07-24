import { NgModule } from '@angular/core';
import { ArmeniaComponent } from './armenia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
    { path: "", component: ArmeniaComponent },
  ]

@NgModule({
    declarations: [
        ArmeniaComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbModule,
        MatSelectModule,
        SharedVisaModuleModule,
        RouterModule.forChild(routes)
    ]
})
export class ArmeniaModule {}