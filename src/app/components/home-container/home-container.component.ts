import { Component, OnInit } from '@angular/core';
import { HomeFormService } from '../home-form/home-form.service';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  constructor(private homeFormService : HomeFormService) { }

  ngOnInit() {

  }

}
