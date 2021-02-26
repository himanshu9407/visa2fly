import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  loadText: string = "Load More";
  showFaqs: boolean = false;
  animationState = "in";
  constructor() {}

  ngOnInit(): void {}

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
