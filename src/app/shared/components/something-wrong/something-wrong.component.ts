import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFlowDetails } from '../../user-flow-details.service';

@Component({
  selector: 'app-something-wrong',
  templateUrl: './something-wrong.component.html',
  styleUrls: ['./something-wrong.component.css']
})
export class SomethingWrongComponent implements OnInit {

  constructor(private router: Router, private userFlow: UserFlowDetails) { }

  ngOnInit() {
  }

  goHome() {
    const ID = this.userFlow.getB2BUserFlowDetails().id;
    this.router.navigate(["b2b/home"], { queryParams: { id: ID } });
  }

}
