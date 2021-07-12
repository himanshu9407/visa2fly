import { Component, OnInit } from "@angular/core";
import { from, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { TestimonialArr, TestimonialModel } from "./testimonial.model";
import { TestimonialService } from "./testimonial.service";

@Component({
  selector: "app-testimonial",
  templateUrl: "./testimonial.component.html",
  styleUrls: ["./testimonial.component.css"],
})
export class TestimonialComponent implements OnInit {
  testimonialArr: Array<TestimonialArr>;

  constructor(private testimonialService: TestimonialService) { }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "variableWidth": true,
    "centerMode": true,
    "infinite": true,
    "dots": true,
    "centerPadding": '30px',
    "arrows": false,
    // "prevArrow": '<div class="slick-prev"> <img src="http://startupangelsnetwork.com/wp-content/uploads/2021/05/Group-110.png" alt="san m-prev"></div>',
    // "nextArrow": '<div class="slick-next"><img src="http://startupangelsnetwork.com/wp-content/uploads/2021/05/Group-111.png" alt="san m-prev"></div>',
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          "slidesToShow": 3,
          "slidesToScroll": 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "arrows": false,
          "variableWidth": true,
          "centerMode": true,
        }
      }
    ],
  };

  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }

  ngOnInit() {

    this.testimonialService.getTestimonials().subscribe(
      (res: TestimonialModel) => {
        if (!res) {
        } else if (res.code == "0") {
          this.testimonialArr = res.data;
        }
      },
      (error) => { }
    );
  }

  createStarArray(stars: any): any {
    let arr = Array.from(Array(stars)).map((x, i) => i);
    return arr;
  }
}
