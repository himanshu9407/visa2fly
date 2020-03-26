import { NgModule } from '@angular/core';
import { B2bAddTrvComponent } from './b2b-add-trv/b2b-add-trv.component';
import { B2bHomeComponent } from './b2b-home/b2b-home.component';
import { B2bReqComponent } from './b2b-req/b2b-req.component';
import { B2bResponseComponent } from './b2b-response/b2b-response.component';
import { Routes, RouterModule } from '@angular/router';
import { B2bHeaderComponent } from './b2b-header/b2b-header.component';
import { B2bFooterComponent } from './b2b-footer/b2b-footer.component';
import { B2bMobileNavComponent } from './b2b-mobile-nav/b2b-mobile-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: "", component: B2bHomeComponent, children : [
    { path: "b2b/home/:id", component: B2bHomeComponent }
  ] },
  { path: "", component: B2bReqComponent},
  { path: "", component: B2bAddTrvComponent},

]

@NgModule({
  declarations: [
    B2bAddTrvComponent,
    B2bHomeComponent,
    B2bReqComponent,
    // B2bHeaderComponent,
    B2bResponseComponent,
    // B2bFooterComponent,
    // B2bMobileNavComponent,
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
export class B2BModule {}
