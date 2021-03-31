import { B2bSimService } from './b2b-sim.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';

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
    private route: ActivatedRoute,) {
    this.preloaderService.showPreloader(true);
    this.id = this.route.snapshot.queryParamMap.get("id");
    this.userFlow.setB2BSimUserFlowDetails("id", this.id);

    // console.log(this.id);

    if (this.id == "" || this.id == null || this.id == undefined) {
      this.isIdExist = false;
      this.toastr.warning("ID Is Missing. Kindly Go Back And Try Again");
    } else {
      this.isIdExist = true;
    }

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
  }

  ngOnInit() {
    this.simHomeForm = new FormGroup({
      simSelect: new FormControl("", [Validators.required]),
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
    if (this.selectedSimCountry === "") {
      this.toastr.error("Please select a country.");
    } else {
      this.userFlow.setb2bSimCookie("simSelectedCountry", this.selectedSimCountry);
      this.router.navigate(["b2b/sim/plans"]);
    }
  }

  proceedToPlans(country: string) {
    this.selectedSimCountry = this.simHomeForm.get("simSelect").value;
    this.userFlow.setb2bSimCookie("simSelectedCountry", country);
    this.router.navigate(["b2b/sim/plans"]);
  }

}
