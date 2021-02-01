import { Component, OnInit } from "@angular/core";
import { from, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { TestimonialService } from "./testimonial.service";

@Component({
  selector: "app-testimonial",
  templateUrl: "./testimonial.component.html",
  styleUrls: ["./testimonial.component.css"],
})
export class TestimonialComponent implements OnInit {
  testimonialData: [];

  constructor(private testimonialService: TestimonialService) {}

  firstTestimonialArr = [];
  secondTestimonialArr = [];

  showTestimonialComponent: boolean = true;
  firstTestimonialArrExists: boolean = true;
  secondTestimonialArrExists: boolean = true;
  ngOnInit() {

    this.testimonialService.getTestimonials().subscribe(
      (res) => {
        if (!res) {
          // assign dummy res
        } else if (res.code == "0") {
          // console.log(res);
          this.testimonialData = res.data;
      // console.log(typeof this.testimonialData);

          this.firstTestimonialArr = this.testimonialData.slice(0, 3);
          this.secondTestimonialArr = this.testimonialData.slice(3, 6);

          if (this.secondTestimonialArr.length == 0) {
            this.secondTestimonialArrExists = false;
          }
          if (this.firstTestimonialArr.length == 0) {
            this.firstTestimonialArrExists = false;
          }

          if (
            !this.secondTestimonialArrExists &&
            !this.firstTestimonialArrExists
          ) {
            this.showTestimonialComponent = false;
          }
        } else {
          // dummy data assignment
        }
      },
      (error) => {}
    );
  }

  createStarArray(stars: any): any {
    let arr = Array.from(Array(stars)).map((x, i) => i);

    return arr;
  }
}
