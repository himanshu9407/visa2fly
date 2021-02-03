import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Component({
  selector: 'app-b2b-sim-mobile-nav',
  templateUrl: './b2b-sim-mobile-nav.component.html',
  styleUrls: ['./b2b-sim-mobile-nav.component.css']
})
export class B2bSimMobileNavComponent implements OnInit {

  constructor(private router: Router, private userFlow: UserFlowDetails) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    const ID = this.userFlow.getB2BUserFlowDetails().id;
    this.router.navigate(["b2b/home"], { queryParams: { id: ID } });
  }

}
