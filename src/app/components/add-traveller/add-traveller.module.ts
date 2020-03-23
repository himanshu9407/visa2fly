import { NgModule } from '@angular/core';
import { AddTravellerComponent } from './add-traveller.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationGuard } from 'src/app/shared/AuthenticationGuard.service';

const routes: Routes = [
  { path: "",component: AddTravellerComponent, pathMatch: "full",canActivate: [AuthenticationGuard] },
]

@NgModule({
  declarations: [
    AddTravellerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})


export class AddTravellerModule {}
