import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { trigger, state, style, transition, animate, group } from "@angular/animations";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"],
  animations: [
    trigger("slideInOut", [
      state(
        "in",

        style({
          "max-height": "0px",
          opacity: "0",
          visibility: "hidden",
        })
      ),
      state(
        "out",
        style({
          "max-height": "100%",
          opacity: "1",
          visibility: "visible",
        })
      ),
      transition("in => out", [
        group([
          animate(
            "1ms ease-in-out",
            style({
              visibility: "visible",
            })
          ),
          animate(
            "600ms ease-in-out",
            style({
              "max-height": "100%",
            })
          ),
          animate(
            "800ms ease-in-out",
            style({
              opacity: "1",
            })
          ),
        ]),
      ]),
      transition("out => in", [
        group([
          animate(
            "400ms ease-in-out",
            style({
              opacity: "0",
            })
          ),
          animate(
            "600ms ease-in-out",
            style({
              "max-height": "0px",
            })
          ),
          animate(
            "700ms ease-in-out",
            style({
              visibility: "hidden",
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class FaqComponent implements OnInit {
  loadText: string = "Load More";
  showFaqs: boolean = false;
  animationState = "in";
  @ViewChild("ElementRefName") element: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  loadData(event) {
    this.loadText = "Loading...";
    setTimeout(() => {
      this.showFaqs = !this.showFaqs;
      this.animationState = this.animationState === "out" ? "in" : "out";

      if (this.showFaqs) {
        this.loadText = "Show Less";
      } else {
        this.loadText = "Load More";
      }
    }, Math.floor(Math.random() * 1000));
  }
}
