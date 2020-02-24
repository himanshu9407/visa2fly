import { Component, OnInit } from '@angular/core';
import { Title, Meta} from '@angular/platform-browser';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  title: string = 'Apply Visa Online';

  constructor(private titleService: Title,private meta: Meta) { }

  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.meta.addTags([
      { name: "keywords", content: "Apply Visa Online | Online Visa Application | Visa2fly" },
      {
        name: "description",
        content: "Apply Visa Online by filling your Online Visa Application at Visa2Fly. Experience hassle-free end to end visa assistance for Indian passport holders. Book Here"
      },
      // { name: "author", content: "rsgitech" },
      // { name: "robots", content: "index, follow" }
    ]);
  }


}
