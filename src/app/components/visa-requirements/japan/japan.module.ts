import { NgModule } from '@angular/core';
import { JapanComponent } from './japan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SharedVisaModuleModule } from '../../shared-visa-module/shared-visa-module.module';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
    { path: "", component: JapanComponent },
    { path: ":purpose", redirectTo: "", pathMatch: 'full' }
  ]

@NgModule({
    declarations: [
        JapanComponent,
        FaqComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbModule,
        SharedVisaModuleModule,
        MatSelectModule,
        RouterModule.forChild(routes)
    ]
})
export class JapanModule {}