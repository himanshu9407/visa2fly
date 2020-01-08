import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-china',
  templateUrl: './china.component.html',
  styleUrls: ['./china.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(800)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(
        ":leave",
        animate(800, style({ opacity: 0, background: "green" }))
      )
    ])
  ]
})
export class ChinaComponent implements OnInit {
  @ViewChild("t", { static : false }) t;
  ngbTabTitleClass;

  selectedRequirement: boolean = false;

  public selectedVisaType = "Tourist";
  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  userControlDetail : any;
  public MyQuotation : Array<any> = [];
  public MyQuotation1 : Array<any> = [];
  public purposeChooseForm : FormGroup;
  public selectedPurpose = 'Tourist'; 
  businessArr : Array<any> =[];
  touristArr : Array<any> =[];
  transitArr : Array<any> =[];
  selectedBusiness: number = 1;
  selectedTransit: number = 1;
  selectedTourist: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
