import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-termsand-conditions',
  templateUrl: './termsand-conditions.component.html',
  styleUrls: ['./termsand-conditions.component.css']
})
export class TermsandConditionsComponent implements OnInit {
  title: string;

  constructor(  private titleService: Title,
    private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
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

}
