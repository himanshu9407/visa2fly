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
  selector: 'app-requirements-spain',
  templateUrl: './requirements-spain.component.html',
  styleUrls: ['./requirements-spain.component.css'],
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
export class RequirementsSpainComponent implements OnInit {

  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  mobileOrientation = "vertical";

  @ViewChild("t") t;

  // @Input() t;
  @Input() selectedBusiness: number;
  @Input() selectedTransit: number;
  @Input() selectedTourist: number;
  @Input() selectedMobileTourist: number;
  @Input() selectedMobileBusiness: number;
  @Input() selectedMobileTransit: number;
  @Input() selectedVisaType: string;
  @Input() selectedPurpose: Subject<any>;

  @Output() changedPurpose = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.selectedPurpose.subscribe((res) => {
      this.t.select(res);
    })
  }

  ngAfterViewInit() {
    this.t.select(this.selectedVisaType);
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

  setActiveTransit(index: number) {
    this.selectedTransit = index;
  }

  changePurpose(event) {
    this.changedPurpose.emit(event);
  }

}
