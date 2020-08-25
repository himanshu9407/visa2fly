import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-requirments',
  templateUrl: './requirments.component.html',
  styleUrls: ['./requirments.component.css'],
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
export class RequirmentsComponent implements OnInit, AfterViewInit {
  desktopJustify = "justified";
  desktopOrientation = "horizontal";

  @ViewChild("t") t;

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

  ngOnInit(): void {
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

  setActiveTransit(index: number, id: string) {
    this.selectedTransit = index;

    if ($("#transit" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveTransitMobile(index: number, id: string) {
    this.selectedMobileBusiness = index;

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
