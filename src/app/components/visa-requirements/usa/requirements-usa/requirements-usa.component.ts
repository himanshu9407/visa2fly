import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { Subject } from "rxjs";
import { trigger, state, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-requirements-usa',
  templateUrl: './requirements-usa.component.html',
  styleUrls: ['./requirements-usa.component.css'],
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
export class RequirementsUsaComponent implements OnInit, AfterViewInit {
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
  showTouristFirst: boolean = true;
  showBusinessFirst: boolean = true;
  showTouristMobileFirst: boolean = true;
  showBusinessMobileFirst: boolean = true;
  showTransitFirst: boolean = true;
  showTransitMobileFirst: boolean = true;

  visaType: string;
  public selectedCountrytype = "USA";

  constructor() {}

  ngOnInit() {
    this.selectedPurpose.subscribe((res) => {
      this.visaType = res;
      // console.log(this.visaType);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.visaType = this.selectedVisaType;
    });
  }

  setActiveTourist(index: number, id: string) {
    this.selectedTourist = index;
    let touristBool = true;

    if (touristBool) {
      this.showTouristFirst = false;
      touristBool = false;
    }

    if ($("#tourist" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveTouristMobile(index: number, id: string) {
    this.selectedMobileTourist = index;
    let touristMobileBool = true;

    if (touristMobileBool) {
      this.showTouristMobileFirst = false;
      touristMobileBool = false;
    }

    if ($("#touristMobile" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }


  setActiveBusiness(index: number, id: string) {
    this.selectedBusiness = index;
    let businessBool = true;

    if (businessBool) {
      this.showBusinessFirst = false;
      businessBool = false;
    }

    if ($("#business" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveBusinessMobile(index: number, id: string) {
    this.selectedMobileBusiness = index;
    let businessMobileBool = true;

    if (businessMobileBool) {
      this.showBusinessMobileFirst = false;
      businessMobileBool = false;
    }

    if ($("#businessMobile" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveTransit(index: number, id: string) {
    this.selectedTransit = index;
    let transitBool = true;

    if (transitBool) {
      this.showTransitFirst = false;
      transitBool = false;
    }

    if ($("#transit" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveMobileTransit(index: number, id: string) {
    this.selectedMobileTransit = index;
    let transitMobileBool = true;

    if (transitMobileBool) {
      this.showTouristMobileFirst = false;
      transitMobileBool = false;
    }

    if ($("#transitMobile" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }


  changePurpose(event) {
    this.changedPurpose.emit(event);

    if (event.nextId == "Tourist") {
      this.selectedTourist = 1;
      this.selectedMobileTourist = 1;

      this.showTouristFirst = true;
      this.showTouristMobileFirst = true;
    } else if (event.nextId == "Business") {
      this.selectedBusiness = 1;
      this.selectedMobileBusiness = 1;

      this.showBusinessFirst = true;
      this.showBusinessMobileFirst = true;
    } else if (event.nextId == "Transit") {
      this.selectedTransit = 1;
      this.selectedMobileTransit = 1;

      this.showTransitFirst = true;
      this.showTransitMobileFirst = true;
    }
  }
}

