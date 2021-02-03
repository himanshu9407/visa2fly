import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor( private router: Router,
    private userFlow: UserFlowDetails) { }

  ngOnInit(): void {
  }

  goToHome() {
    const ID = this.userFlow.getB2BUserFlowDetails().id;
    this.router.navigate(['b2bsim/home'], {queryParams: { id: ID }});
  }

}
