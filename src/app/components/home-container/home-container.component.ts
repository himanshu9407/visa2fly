import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { visaFormData } from "src/app/interfaces/visa-form";
import { HomeFormService } from "./home-form/home-form.service";

@Component({
  selector: "app-home-container",
  templateUrl: "./home-container.component.html",
  styleUrls: ["./home-container.component.css"],
})
export class HomeContainerComponent implements OnInit {
  homeFormData: visaFormData;
  resideInArr: Array<string> = [];
  purposeArr: Array<string> = [];
  homeForm: FormGroup;

  country: AbstractControl;
  purpose: AbstractControl;
  livesIn: AbstractControl;
  countryList: string[];

  constructor(
    @Inject(DOCUMENT) private doc,
    private titleService: Title,
    private meta: Meta,
    private homeFormService: HomeFormService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.homeFormService.getHomeFormDataFromServer();
  }

  ngOnInit() {
    this.homeForm = new FormGroup({
      country: new FormControl("Sri Lanka"),
      purpose: new FormControl(""),
      livingin: new FormControl(""),
    });

    this.country = this.homeForm.get("country");
    this.purpose = this.homeForm.get("purpose");
    this.livesIn = this.homeForm.get("livingin");

    this.homeFormService.homeFormData.subscribe((res: visaFormData) => {
      console.log(res);
      this.homeFormData = res;
      this.countryList = this.homeFormData.countries;
      this.country.setValue(this.homeFormData.countries[0]);
      this.homeForm.get('country').setValue(this.homeFormData.countries[0]);
      this.sortPurposeArr(this.homeFormData.data[this.homeForm.get('country').value]['purpose'])
      this.resideInArr = this.homeFormData.data[this.homeForm.get('country').value]['residenceOf'];
    });

    // console.log(this.route.url);

    this.titleService.setTitle("Visa Online | Apply Visa Online | Online Visa Application | Visa2fly");

    this.meta.updateTag({
      name: "keywords",
      content:
        "Visa Online - Apply for tourist visa online to top international destinations like Dubai, UK, US, Singapore, Schengen, etc. hassle-free with Visa2fly. Click here to know more!",
    });
    this.meta.updateTag({
      name: "description",
      content:
        "Apply Visa Online by filling your Online Visa Application at Visa2Fly. Experience hassle-free end to end visa assistance for Indian passport holders. Book Here",
    });

    // facebook and linkedin
    this.meta.updateTag({
      property: "og:title",
      content:
        "Visa Online | Apply Visa Online | Online Visa Application | Visa2fly",
    });
    this.meta.updateTag({ property: "type", content: "website" });
    this.meta.updateTag({
      property: "og:image",
      content: "https://static.visa2fly.com/carousel/peru-la-merced.jpg",
    });
    this.meta.updateTag({
      property: "og:url",
      content: "https://visa2fly.com/visa",
    });
    this.meta.updateTag({
      property: "og:image:alt",
      content: "Visa2Fly",
    });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Apply Visa Online by filling your Online Visa Application at Visa2Fly. Experience hassle-free end to end visa assistance for Indian passport holders. Book Here",
    });

    // twitter
    this.meta.updateTag({
      property: "twitter:card",
      content: "summary",
    });
    this.meta.updateTag({
      property: "twitter:title",
      content:
        "Visa Online | Apply Visa Online | Online Visa Application | Visa2fly",
    });
    this.meta.updateTag({
      property: "twitter:image",
      content: "https://static.visa2fly.com/carousel/peru-la-merced.jpg",
    });
    this.meta.updateTag({
      property: "twitter:image:alt",
      content: "Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:description",
      content:
        "Apply Visa Online by filling your Online Visa Application at Visa2Fly. Experience hassle-free end to end visa assistance for Indian passport holders. Book Here",
    });
    this.meta.updateTag({
      property: "twitter:site",
      content: "@visa2fly",
    });
    this.meta.updateTag({
      property: "twitter:creator",
      content: "@visa2fly",
    });


    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      "https://visa2fly.com/visa"
    );
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

  ngAfterViewInit(): void {
    console.log(screen.width);
    if (screen.width < 600) {
      if (isPlatformBrowser(this.platformId)) {
        let countryInput = document.getElementById('countryInput');
        let visaTypeInput = document.getElementById('visaTypeInput');
        let resideInInput = document.getElementById('resideInInput');

        let countryInput_homeform = document.getElementById('countryInput_homeform');
        let purposeInput_homeform = document.getElementById('purposeInput_homeform');
        let liveInInput_homeform = document.getElementById('liveInInput_homeform');

        let countryInputContainer = document.getElementById('countryInputContainer');
        let body = document.getElementById('body');
        let homeform_label = document.getElementById('homeform_label');

        countryInput.addEventListener('click', function () {
          countryInputContainer.classList.add('overlay');
          countryInput_homeform.classList.add('show_select');
          body.classList.add('noScroll');
          homeform_label.innerText = "Destination";
        });

        visaTypeInput.addEventListener('click', function () {
          countryInputContainer.classList.add('overlay');
          purposeInput_homeform.classList.add('show_select');
          body.classList.add('noScroll');
          homeform_label.innerText = "Visa Type";
        });

        resideInInput.addEventListener('click', function () {
          countryInputContainer.classList.add('overlay');
          liveInInput_homeform.classList.add('show_select');
          body.classList.add('noScroll');
          homeform_label.innerText = "Reside In";
        });
      }
    }
  }

  onBackButton() {
    let countryInputContainer = document.getElementById('countryInputContainer');
    let body = document.getElementById('body');

    let countryInput_homeform = document.getElementById('countryInput_homeform');
    let purposeInput_homeform = document.getElementById('purposeInput_homeform');
    let liveInInput_homeform = document.getElementById('liveInInput_homeform');

    countryInputContainer.classList.remove('overlay');
    body.classList.remove('noScroll');

    if (countryInput_homeform.classList.contains('show_select')) {
      countryInput_homeform.classList.remove('show_select');
    }

    if (purposeInput_homeform.classList.contains('show_select')) {
      purposeInput_homeform.classList.remove('show_select');
    }

    if (liveInInput_homeform.classList.contains('show_select')) {
      liveInInput_homeform.classList.remove('show_select');
    }
  }

  // @ViewChild('filterInput') filterInput: ElementRef;

  // focusInputField() {
  //   setTimeout(() => {
  //     this.filterInput.nativeElement.focus()
  //   }, 10)
  // }

  countryChanged(value: string) {
    console.log(value);

    if (value != '' && value != undefined && value != null) {
      this.homeFormService.countryInputModel.next(value);
      this.onBackButton();
    }

  }

  visaTypeChanged(value: string) {
    console.log(value);

    if (value != '' && value != undefined && value != null) {
      this.homeFormService.visaTypeInputModel.next(value);
      this.onBackButton();
    }
  }

  resideInChanged(value: string) {
    console.log(value);

    if (value != '' && value != undefined && value != null) {
      this.homeFormService.resideInInputModel.next(value);
      this.onBackButton();
    }
  }
}
