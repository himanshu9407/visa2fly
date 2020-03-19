import { Component, OnInit } from "@angular/core";
import { OtherCountryService } from "src/app/shared/OtherCountry.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: "app-free-visa",
  templateUrl: "./free-visa.component.html",
  styleUrls: ["./free-visa.component.css"]
})
export class FreeVisaComponent implements OnInit {
  constructor(
    private otherCountryService: OtherCountryService,
    private preloaderService: PreloaderService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.preloaderService.showPreloader(true);
  }

  ngOnInit() {
    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 4000);

    this.titleService.setTitle("Visa2fly | Free Visa");
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      }
      // { name: "author", content: "rsgitech" },
      // { name: "robots", content: "index, follow" }
    ]);
  }

  proceedToHome(countryName: string) {
    // console.log(countryName);
    this.otherCountryService.validateCountry(countryName);
  }
}
