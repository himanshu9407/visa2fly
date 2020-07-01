import { NgModule } from '@angular/core';
import { ZambiaComponent } from './zambia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: "", component: ZambiaComponent },
  ]

@NgModule({
    declarations:[
        ZambiaComponent,
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

export class ZambiaModule {}