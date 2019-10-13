import { Component, OnInit } from '@angular/core';
import { HomeFormService } from '../home-form/home-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  constructor(private homeFormService : HomeFormService, private route : ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.route.url);
  }

}
