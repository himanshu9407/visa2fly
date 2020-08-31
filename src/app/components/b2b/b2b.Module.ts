import { NgModule } from '@angular/core';
import { B2bAddTrvComponent } from './b2b-add-trv/b2b-add-trv.component';
import { B2bHomeComponent } from './b2b-home/b2b-home.component';
import { B2bReqComponent } from './b2b-req/b2b-req.component';
import { B2bResponseComponent } from './b2b-response/b2b-response.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SomethingWrongComponent } from 'src/app/shared/components/something-wrong/something-wrong.component';
import { B2bRemovespacePipe } from './b2b-removespace.pipe';
import { SharedVisaModuleModule } from '../shared-visa-module/shared-visa-module.module';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: "full" } ,
  {path: "home", component: B2bHomeComponent, children : [
    { path: ":id", component: B2bHomeComponent } 
  ]},
  { path: "visa-requirement/:country/:purpose", component: B2bReqComponent},
  { path: "b2b-add-traveller", component: B2bAddTrvComponent},
  { path: "page-not-found", component: PageNotFoundComponent},
  {
    path: "something-went-wrong",
    component:  SomethingWrongComponent
  },
  { path: "**", redirectTo: "page-not-found", pathMatch: "prefix"}
]

@NgModule({
  declarations: [
    B2bAddTrvComponent,
    B2bHomeComponent,
    B2bReqComponent,
    B2bResponseComponent,
    PageNotFoundComponent,
    B2bRemovespacePipe,
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
export class B2BModule {}
