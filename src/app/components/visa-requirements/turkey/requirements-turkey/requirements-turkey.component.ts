import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import { Subject } from "rxjs";
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-requirements-turkey",
  templateUrl: "./requirements-turkey.component.html",
  styleUrls: ["./requirements-turkey.component.css"],
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
export class RequirementsTurkeyComponent implements OnInit, AfterViewInit {
  desktopJustify = "justified";
  desktopOrientation = "horizontal";

  selectedBusiness: number = 1;
  selectedTransit: number = 1;
  selectedMandatory: number = 1;

  selectedMobileMandatory: number = 1;
  selectedMobileBusiness: number = 1;
  selectedMobileTransit: number = 1;

  @Input() selectedVisaType: string;
  @Input() selectedPurpose: Subject<any>;

  @Output() changedPurpose = new EventEmitter();
  showMandatoryFirst: boolean = true;
  showBusinessFirst: boolean = true;
  showTransitFirst: boolean = true;

  showTouristMobileFirst: boolean = true;
  showBusinessMobileFirst: boolean = true;
  showTransitMobileFirst: boolean = true;
  visaType: string;
  public selectedCountrytype = "Turkey";

  constructor() {}

  ngOnInit(): void {
    this.selectedPurpose.subscribe((res) => {
      this.visaType = res;
      console.log(this.visaType);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.visaType = this.selectedVisaType;
    })
  }

  setActiveMandatory(index: number, id: string) {
    this.selectedMandatory = index;
    let mandatoryBool = true;

    if (mandatoryBool) {
      this.showMandatoryFirst = false;
      mandatoryBool = false;
    }

    if ($("#mandatory" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveMandatoryMobile(index: number, id: string) {
    this.selectedMobileMandatory = index;
    let mandatoryMobileBool = true;

    if (mandatoryMobileBool) {
      this.showTouristMobileFirst = false;
      mandatoryMobileBool = false;
    }

    if ($("#mandatoryMobile" + index).hasClass("show")) {
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

  setActiveTransitMobile(index: number, id: string) {
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
      this.selectedMandatory = 1;
      this.selectedMobileMandatory = 1;

      this.showMandatoryFirst = true;
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
