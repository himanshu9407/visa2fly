import { Component, OnInit, Inject } from "@angular/core";
import { HomeFormService } from "../home-form/home-form.service";
import { ActivatedRoute } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: "app-home-container",
  templateUrl: "./home-container.component.html",
  styleUrls: ["./home-container.component.css"],
})
export class HomeContainerComponent implements OnInit {
  constructor(
    private homeFormService: HomeFormService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private doc,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    // console.log(this.route.url);

    this.titleService.setTitle("Visa Online | Apply Visa Online | Online Visa Application | Visa2fly");
    this.meta.addTags([
      { name: "keywords", content: "Visa Online - Apply for tourist visa online to top international destinations like Dubai, UK, US, Singapore, Schengen, etc. hassle-free with Visa2fly. Click here to know more!" },
      {
        name: "description",
        content: "Apply Visa Online by filling your Online Visa Application at Visa2Fly. Experience hassle-free end to end visa assistance for Indian passport holders. Book Here"
      },
      // { name: "author", content: "rsgitech" },
      // { name: "robots", content: "index, follow" }
    ]);

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      "https://visa2fly.com"
    );
  }
}
