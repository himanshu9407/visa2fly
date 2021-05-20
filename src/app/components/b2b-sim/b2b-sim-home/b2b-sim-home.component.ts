import { B2bSimService } from './b2b-sim.service';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-b2b-sim-home',
  templateUrl: './b2b-sim-home.component.html',
  styleUrls: ['./b2b-sim-home.component.css']
})
export class B2bSimHomeComponent implements OnInit {

  simCountries: Array<any> = [];

  simHomeForm: FormGroup;
  selectedSimCountry: string = "";
  title: string = "Visa2fly | Home";

  id: string;
  isIdExist: boolean;

  constructor(private preloaderService: PreloaderService,
    private simService: B2bSimService,
    private titleService: Title,
    private userFlow: UserFlowDetails,
    private meta: Meta,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object) {

    this.preloaderService.showPreloader(true);
    this.id = this.route.snapshot.queryParamMap.get("id");
    this.userFlow.setB2BSimUserFlowDetails("id", this.id);

    if (this.id == "" || this.id == null || this.id == undefined) {
      this.isIdExist = false;
      this.toastr.warning("ID Is Missing. Kindly Go Back And Try Again");
    } else {
      this.isIdExist = true;
    }
  }

  ngOnInit() {
    this.simHomeForm = new FormGroup({
      simSelect: new FormControl(null, [Validators.required]),
    });

    this.id = this.route.snapshot.queryParamMap.get("id");
    this.userFlow.setB2BSimUserFlowDetails("id", this.id);

    // console.log(this.id);
    this.simService.getSimcountries(this.id).subscribe((data: any) => {
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
    let body = document.getElementById('body');
    body.classList.remove('noScroll');

    this.selectedSimCountry = this.simHomeForm.get("simSelect").value;
    if (this.selectedSimCountry === "") {
      this.toastr.error("Please select a country.");
    } else {
      this.userFlow.setb2bSimCookie("simSelectedCountry", this.selectedSimCountry);
      this.router.navigate(["b2b/sim/plans"]);
    }
  }

  proceedToPlans(country: string) {
    // this.selectedSimCountry = this.simHomeForm.get("simSelect").value;
    this.userFlow.setb2bSimCookie("simSelectedCountry", country);
    this.router.navigate(["b2b/sim/plans"]);
  }

  @ViewChild('countryInput') countryInput: ElementRef;
  @ViewChild('countryInput_mobile') countryInput_mobile: ElementRef;

  focusInputField(fieldName: string) {
    setTimeout(() => {
      if (fieldName == 'country_mobile_sim') {
        this.countryInput_mobile.nativeElement.focus();
      } else if (fieldName == 'country') {
        this.countryInput.nativeElement.focus()
      }
    }, 10)
  }

  inputSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1 || item.toLocaleLowerCase().indexOf(term) > -1;
  }

  inputSearchMobileFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1 || item.toLocaleLowerCase().indexOf(term) > -1;
  }

  ngAfterViewInit(): void {
    // console.log(screen.width);
    // if (screen.width < 600) {
    if (isPlatformBrowser(this.platformId)) {
      let country_input_sim = document.getElementById('country_input_sim');
      let sim_home_heading = document.getElementById('sim_home_heading');

      let country_mobile_sim = document.getElementById('country_mobile_sim');

      let sim_input_container = document.getElementById('sim_input_container');
      let body = document.getElementById('body');
      let homeform_label = document.getElementById('homeform_label');

      country_input_sim.addEventListener('click', function () {
        sim_input_container.classList.add('overlay');
        country_mobile_sim.classList.add('show_select');
        sim_home_heading.classList.add('show_select');
        body.classList.add('noScroll');
        homeform_label.innerText = "Select Country";
      });
    }
    // }
  }

  onBackButton() {
    let sim_input_container = document.getElementById('sim_input_container');
    let body = document.getElementById('body');

    let country_mobile_sim = document.getElementById('country_mobile_sim');
    let sim_home_heading = document.getElementById('sim_home_heading');

    sim_input_container.classList.remove('overlay');
    body.classList.remove('noScroll');

    if (country_mobile_sim.classList.contains('show_select')) {
      country_mobile_sim.classList.remove('show_select');
      sim_home_heading.classList.remove('show_select');
    }
  }

}
