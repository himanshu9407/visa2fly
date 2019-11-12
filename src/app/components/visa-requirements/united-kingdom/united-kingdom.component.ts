import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-united-kingdom',
  templateUrl: './united-kingdom.component.html',
  styleUrls: ['./united-kingdom.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(800)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(800, style({ opacity: 0, background: 'green' })))
    ])
  ]
})

export class UnitedKingdomComponent implements OnInit {
  @ViewChild('t',{static:true}) t;

  selectedVisaType = "tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";

  constructor(private activeRoute: ActivatedRoute, private router : Router) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(( params : any) => {
      console.log(params);
      this.selectedVisaType = params.visatype;
      console.log(this.selectedVisaType);
      setTimeout(() => {
        
        this.t.select(this.selectedVisaType);
      }, 100);

    });
  }
  // ngAfterViewInit() {
  //   this.t.select(this.selectedVisaType);
  // }
  navigateTo (visatype : any) {
    // window.location
    window.history.replaceState("", "", "/visa/united-kingdom/"+visatype.nextId);
    // console.log("url changed");

  }


}

