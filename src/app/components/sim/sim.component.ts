import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PreloaderService } from "src/app/shared/preloader.service";
import { SimService } from "./sim.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sim",
  templateUrl: "./sim.component.html",
  styleUrls: ["./sim.component.css"],
})
export class SimComponent implements OnInit {
  simCountries: Array<any> = [];

  simHomeForm: FormGroup;
  selectedSimCountry: string = "";
  title: string = "Visa2fly | Sim";

  constructor(
    private preloaderService: PreloaderService,
    private simService: SimService,
    private titleService: Title,
    private userFlow: UserFlowDetails,
    private meta: Meta,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.preloaderService.showPreloader(true);
  }

  ngOnInit() {
    this.simHomeForm = new FormGroup({
      simSelect: new FormControl(null, [Validators.required]),
    });

    this.simService.getSimcountries().subscribe((data: any) => {
      if (data.code == "0") {
        // console.log(data);
        this.simCountries = data.data;
        setTimeout(() => {
          this.preloaderService.showPreloader(false);
        }, 2000);
      } else {
        setTimeout(() => {
          this.preloaderService.showPreloader(false);
        }, 2000);
      }
    });

    this.titleService.setTitle(this.title);
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: "",
      },
    ]);
  }

  onSimCountrySelected() {
    this.selectedSimCountry = this.simHomeForm.get("simSelect").value;
    if (this.selectedSimCountry === "" || this.selectedSimCountry === null || this.selectedSimCountry === undefined) {
      this.toastr.error("Please select a country.");
    } else {
      this.userFlow.setCookie("simSelectedCountry", this.selectedSimCountry);
      this.router.navigate(["sim/simplans"]);
    }
  }

  proceedToPlans(country: string) {
    this.userFlow.setCookie("simSelectedCountry", country);
    this.router.navigate(["sim/simplans"]);
  }

  @ViewChild('countryInput') countryInput: ElementRef;

  focusInputField() {
    setTimeout(() => {
      this.countryInput.nativeElement.focus()
    }, 10)
  }

  inputSearchFn(term: string, item: any) {
    console.log(term);
    console.log(item);
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1 || item.toLocaleLowerCase().indexOf(term) > -1;
  }

}
