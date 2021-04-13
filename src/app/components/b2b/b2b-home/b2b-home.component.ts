import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { isPlatformBrowser } from "@angular/common";
import { HomeFormService } from '../../home-container/home-form/home-form.service';
import { visaFormData } from "src/app/interfaces/visa-form";

@Component({
  selector: "app-b2b-home",
  templateUrl: "./b2b-home.component.html",
  styleUrls: ["./b2b-home.component.css"]
})
export class B2bHomeComponent implements OnInit {
  b2bHomeForm: FormGroup;

  public selectedResideIn: string = "select";
  public selectedCountry: string = "Sri Lanka";
  public selectedPurpose: string = "select";

  public country: AbstractControl;
  public purpose: AbstractControl;
  public livesIn: AbstractControl;

  public homeFormData: any;

  purposeNotSelected: boolean = false;
  livesInNotSelected: boolean = false;
  id: string;
  isIdExist: boolean;
  countryList: string[];

  resideInArr: Array<string> = [];
  purposeArr: Array<string> = [];

  constructor(
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private toastr: ToastrService,
    private homeFormService: HomeFormService,
    private userFlow: UserFlowDetails,
    private preloaderService: PreloaderService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.id = this.route.snapshot.queryParamMap.get("id");
    this.userFlow.setB2BUserFlowDetails("id", this.id);

    if (this.id == "" || this.id == null || this.id == undefined) {
      this.isIdExist = false;
      this.toastr.warning("ID Is Missing. Kindly Go Back And Try Again");
    } else {
      this.isIdExist = true;
    }

    this.b2bHomeForm = new FormGroup({
      country: new FormControl("Sri Lanka"),
      purpose: new FormControl("select"),
      livingIn: new FormControl("select")
    });

    this.country = this.b2bHomeForm.get("country");
    this.purpose = this.b2bHomeForm.get("purpose");
    this.livesIn = this.b2bHomeForm.get("livingIn");

    this.homeFormService.homeFormData.subscribe((res: visaFormData) => {
      // console.log(res);
      this.homeFormData = res;
      this.countryList = this.homeFormData.countries;
      this.country.setValue(this.homeFormData.countries[0]);
      this.b2bHomeForm.get('country').setValue(this.homeFormData.countries[0]);
      this.sortPurposeArr(this.homeFormData.data[this.b2bHomeForm.get('country').value]['purpose'])
      this.resideInArr = this.homeFormData.data[this.b2bHomeForm.get('country').value]['residenceOf'];
    });

    this.homeFormService.countryInputModel.subscribe((res: string) => {
      // console.log(res);
      this.country.setValue(res);
      this.b2bHomeForm.get('country').setValue(res);
      this.countryChanged(res);
    });

    this.homeFormService.visaTypeInputModel.subscribe((res: string) => {
      this.purpose.setValue(res);
    });

    this.homeFormService.resideInInputModel.subscribe((res: string) => {
      this.livesIn.setValue(res);
    });
  }

  ngOnInit() {
    this.titleService.setTitle("Visa2fly | Home");
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      },
      // { name: "author", content: "rsgitech" },
      // { name: "robots", content: "index, follow" }
    ]);
  }

  countryChanged(event: string) {
    // console.log("country changed");
    let temoCountry = this.b2bHomeForm.get("country").value;
    this.b2bHomeForm.get("purpose").setValue("select");
    this.b2bHomeForm.get("livingIn").setValue("select");
    this.selectedPurpose = "select";
    this.selectedResideIn = "select";
    this.b2bHomeForm.get("country").setValue(temoCountry);
  }

  validatePurpose() {
    if (
      (this.purpose.dirty && this.purpose.value == "select") ||
      !this.purpose.touched ||
      this.purpose.pristine
    ) {
      this.purposeNotSelected = true;
      return false;
    } else {
      return true;
    }
  }

  validateLivingIn() {
    if (
      (this.livesIn.dirty && this.livesIn.value == "select") ||
      !this.livesIn.touched ||
      this.livesIn.pristine
    ) {
      this.livesInNotSelected = true;
      return false;
    } else {
      return true;
    }
  }

  validateForm() {
    // console.log("validate form method called");
    this.validatePurpose();
    this.validateLivingIn();
    if (
      this.validatePurpose() == false ||
      this.validateLivingIn() == false ||
      this.isIdExist == false
    ) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.purpose.valueChanges.subscribe(value => {
      if (value == "select") {
        this.purposeNotSelected = true;
      } else {
        this.purposeNotSelected = false;
      }
      // console.log(this.purpose);
    });

    this.livesIn.valueChanges.subscribe(value => {
      if (value == "select") {
        this.livesInNotSelected = true;
      } else {
        this.livesInNotSelected = false;
      }
    });

    if (this.id == "" || this.id == null || this.id == undefined) {
      this.toastr.warning("ID Is Missing. Kindly Go Back And Try Again");
    }

    if (this.validateForm()) {
      // this.userFlow.setUserFlowDetails("country", this.selectedCountry);
      // this.userFlow.setUserFlowDetails("purpose", this.selectedPurpose);
      // this.userFlow.setUserFlowDetails("livesIn", this.selectedResideIn);
      // console.log(this.userFlow.getUserFlowDetails())
      this.preloaderService.showPreloader(true);
      this.router.navigate([
        "b2b/visa-requirement/",
        this.selectedCountry,
        this.selectedPurpose
      ]);
    }
  }

  sortPurposeArr(purposeArr: Array<string>) {
    this.purposeArr = [];
    let purposeCustomArr: Array<{ purpose: string, order: number }> = []
    purposeArr.forEach(element => {
      if (element == "Tourist") {
        purposeCustomArr.push({
          purpose: "Tourist",
          order: 1
        })
      } else if (element == "Business") {
        purposeCustomArr.push({
          purpose: "Business",
          order: 2
        })
      } else if (element == "Transit") {
        purposeCustomArr.push({
          purpose: "Transit",
          order: 3
        })
      }
    });

    purposeCustomArr.sort(function (a, b) {
      return a.order - b.order || a.purpose.localeCompare(b.purpose);
    });

    purposeCustomArr.forEach(element => {
      this.purposeArr.push(element.purpose);
    })
  }
}
