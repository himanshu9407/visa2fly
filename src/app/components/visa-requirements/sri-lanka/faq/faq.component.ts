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
})
export class FaqComponent implements OnInit {
  loadText: string = "Load More";
  showFaqs: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  loadData(event) {
    this.loadText = "Loading...";
    setTimeout(() => {
      this.showFaqs = !this.showFaqs;

      if (this.showFaqs) {
        this.loadText = "Show Less";
      } else {
        this.loadText = "Load More";
      }
    }, Math.floor(Math.random() * 1000));
  }
}
