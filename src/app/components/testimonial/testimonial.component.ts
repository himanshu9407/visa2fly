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

  showTestimonialComponent : boolean = true;
  firstTestimonialArrExists :boolean = true;
  secondTestimonialArrExists :boolean = true;
  ngOnInit() { 
  this.testimonialService.getTestimonials().subscribe(

    (data) => {
      
      if(!data) {
        // assign dummy data
      }

      else if (data.code == "0") {
        // console.log(data.data);
        this.testimonialData = data.data ;
        this.firstTestimonialArr = this.testimonialData.slice(0,3);
        this.secondTestimonialArr = this.testimonialData.slice(3,6);


        if (this.secondTestimonialArr.length == 0) {
          this.secondTestimonialArrExists = false;
        }
        if (this.firstTestimonialArr.length == 0) {
          this.firstTestimonialArrExists = false;
        }

        if (!this.secondTestimonialArrExists && !this.firstTestimonialArrExists) {
          this.showTestimonialComponent = false;
        }

       


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
  
    let arr = Array.from(Array(stars)).map((x, i) => i )

    return arr;
  }
}
