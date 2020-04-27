import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { RequirementsComponent } from './requirements.component';
import { RemovewhitespacePipe } from 'src/app/shared/removeWhiteSpace.pipe';

const routes: Routes = [
  { path: "", component: RequirementsComponent }
]

@NgModule({
  declarations: [
    RequirementsComponent,
    RemovewhitespacePipe
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
export class RequirementsModule {}
