import { Component, OnInit, Inject } from "@angular/core";
import { HomeFormService } from "../home-form/home-form.service";
import { ActivatedRoute } from "@angular/router";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "app-home-container",
  templateUrl: "./home-container.component.html",
  styleUrls: ["./home-container.component.css"],
})
export class HomeContainerComponent implements OnInit {
  constructor(
    private homeFormService: HomeFormService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private doc
  ) {}

  ngOnInit() {
    // console.log(this.route.url);

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      "https://visa2fly.com"
    );
  }
}
