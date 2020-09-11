import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from "@angular/animations";
import { Event } from 'jquery';

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
  @ViewChild('ElementRefName') element: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  loadData(event) {
    this.loadText = "Loading...";
    setTimeout(() => {
      this.showFaqs = !this.showFaqs;
      this.animationState = this.animationState === "out" ? "in" : "out";

      // var rect = this.element.nativeElement.getBoundingClientRect(),
      // scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      // scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // console.log(rect.top + scrollTop, rect.left + scrollLeft);

      // let top = 0;
      // let mobileTop = 0;

      if (this.showFaqs) {
        this.loadText = "Show Less";
        // top = 2535;
        // mobileTop = 3770;
      } else {
        this.loadText = "Load More";
        // top = 3008;
        // mobileTop = 4220;
      }

      // if (window.innerWidth < 600) {
      //   window.scrollTo({
      //     top: mobileTop,
      //     left: 0,
      //     behavior: "smooth",
      //   });
      // } else {
      //   window.scrollTo({
      //     top: top,
      //     left: 0,
      //     behavior: "smooth",
      //   });
      // }
    }, Math.floor(Math.random() * 1000));
  }
}

