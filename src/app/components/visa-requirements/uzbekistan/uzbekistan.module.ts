import { NgModule } from '@angular/core';
import { UzbekistanComponent } from './uzbekistan.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
    { path: "", component: UzbekistanComponent },
  ]

@NgModule({
    declarations: [
        UzbekistanComponent
    ],
    imports : [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbModule,
        MatSelectModule,
        RouterModule.forChild(routes)
    ]
})
export class UzbekistanModule {}