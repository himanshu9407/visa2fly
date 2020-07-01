import { NgModule } from '@angular/core';
import { TajikistanComponent } from './tajikistan.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
    { path: "", component: TajikistanComponent },
    { path: ":purpose", redirectTo: "", pathMatch: 'full' }
  ]

@NgModule({
    declarations: [
        TajikistanComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbModule,
        MatSelectModule,
        RouterModule.forChild(routes)
    ]
})
export class TajikistanModule {}