import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-requirement-russia',
  templateUrl: './requirement-russia.component.html',
  styleUrls: ['./requirement-russia.component.css'],
  animations: [
    trigger("simpleFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(800)]),
      transition(
        ":leave",
        animate(800, style({ opacity: 0, background: "green" }))
      ),
    ]),
  ],
})
export class RequirementRussiaComponent implements OnInit {

  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  mobileOrientation = "vertical";

  @ViewChild("t") t;

  // @Input() t;
  @Input() selectedBusiness: number;
  @Input() selectedTransit: number;
  @Input() selectedTourist: number;
  public selectedCountrytype="Russia";
  @Input() selectedMobileTourist: number;
  @Input() selectedMobileBusiness: number;
  @Input() selectedMobileTransit: number;
  @Input() selectedVisaType: string;
  @Input() selectedPurpose: Subject<any>;

  @Output() changedPurpose = new EventEmitter();
  visaType: string

  constructor() { }

  ngOnInit() {
    this.selectedPurpose.subscribe((res) => {
      this.visaType = res;
      // console.log(this.visaType);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.visaType = this.selectedVisaType;
    })
  }


  setActiveTourist(index: number, id: string) {
    this.selectedTourist = index;

    if ($("#tourist" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveTouristMobile(index: number, id: string) {
    this.selectedMobileTourist = index;

    if ($("#touristMobile" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveBusiness(index: number, id: string) {
    this.selectedBusiness = index;

    if ($("#business" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveBusinessMobile(index: number, id: string) {
    this.selectedMobileBusiness = index;

    if ($("#businessMobile" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveTransit(index: number, id: string) {
    this.selectedTransit = index;

    if ($("#transit" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }


  setActiveMobileTransit(index: number, id: string) {
    this.selectedMobileTransit = index;

    if ($("#transitMobile" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }
  changePurpose(event) {
    this.changedPurpose.emit(event);
  }

}
