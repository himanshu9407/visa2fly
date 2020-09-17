import { Component, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: "app-home-container",
  templateUrl: "./home-container.component.html",
  styleUrls: ["./home-container.component.css"],
})
export class HomeContainerComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private doc,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
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
}
