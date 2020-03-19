import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-cancellations-and-return',
  templateUrl: './cancellations-and-return.component.html',
  styleUrls: ['./cancellations-and-return.component.css']
})
export class CancellationsAndReturnComponent implements OnInit {
  title: string;

  constructor(  private titleService: Title,
    private meta: Meta,) { }

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
