import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from 'src/app/home-service.service';
import{testimonialsData} from '../../interfaces/testimonials';
import { TestimonialService } from './testimonial.service';
import { TestimonialModel } from './testimonial.model';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  
  testimonialData : [];
  
  constructor(private testimonialService : TestimonialService) { }
  
  firstTestimonialArr = [];
  secondTestimonialArr = [];
  ngOnInit() { 
  this.testimonialService.getTestimonials().subscribe(

    (data) => {
      
      if(!data) {
        // assign dummy data
      }

      else if (data.code == "0") {
        console.log(data.data);
        this.testimonialData = data.data ;
        this.firstTestimonialArr = this.testimonialData.slice(0,3);
        this.secondTestimonialArr = this.testimonialData.slice(3,6);

        console.log(this.firstTestimonialArr);
        console.log(this.secondTestimonialArr);

      }

      else {
        // dummy data assignment
      }
    
    },
    (error) => {

    }
  );
  }


  createStarArray (stars :any) :any {
    // let arr = [];
    // for (let index = 0; index < stars; index++) {
      
    //   console.log(stars);
    //   arr.push(index);
    //   console.log(arr);
    //   return arr;
    // }
    let arr = Array.from(Array(stars)).map((x, i) => i )
    console.log(arr);

    return arr;
  }
}
