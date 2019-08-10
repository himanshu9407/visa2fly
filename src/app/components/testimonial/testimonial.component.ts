import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from 'src/app/home-service.service';
import{testimonialsData} from '../../interfaces/testimonials';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  private testimonials: testimonialsData;
  constructor(private myservice: HomeServiceService) { }

  ngOnInit() { 
    // this.myservice.get_testimonials().subscribe((res : testimonialsData)=>{
    //   this.testimonials = res;
    //   console.log(this.testimonials);
    // });
  }
}
