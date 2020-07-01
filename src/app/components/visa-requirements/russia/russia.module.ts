import { NgModule } from '@angular/core';
import { RussiaComponent } from './russia.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
    { path: "", component: RussiaComponent },
  ]

@NgModule({
    declarations: [
        RussiaComponent
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
export class RussiaModule {}