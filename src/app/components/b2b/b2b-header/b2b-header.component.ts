import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";

@Component({
  selector: "app-b2b-header",
  templateUrl: "./b2b-header.component.html",
  styleUrls: ["./b2b-header.component.css"]
})
export class B2bHeaderComponent implements OnInit {
  constructor(private router: Router, private userFlow: UserFlowDetails) {}

  ngOnInit() {}

  navigateToHome() {
    const ID = this.userFlow.getB2BUserFlowDetails().id;
    this.router.navigate(["b2b/home"], { queryParams: { id: ID } });
  }
}
