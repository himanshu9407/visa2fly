import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

@Component({
  selector: 'app-b2b-sim-header',
  templateUrl: './b2b-sim-header.component.html',
  styleUrls: ['./b2b-sim-header.component.css']
})
export class B2bSimHeaderComponent implements OnInit {

  showTransparentNavbar: boolean = true;

  constructor(private router: Router, private userFlow: UserFlowDetails) { }

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     let url: string = event.url;
    //     let arr = url.split("/");

    //     if (
    //       arr[2] == "simcheckout"
    //     ) {
    //       this.showTransparentNavbar = false;
    //     } else {
    //       this.showTransparentNavbar = true;
    //     }
    //   }
    // });
  }

  navigateToHome() {
    const ID = this.userFlow.getB2BUserFlowDetails().id;
    this.router.navigate(["b2bSim/home"], { queryParams: { id: ID } });
  }

}
