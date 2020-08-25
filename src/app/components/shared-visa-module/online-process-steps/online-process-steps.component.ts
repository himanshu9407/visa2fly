import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-online-process-steps',
  templateUrl: './online-process-steps.component.html',
  styleUrls: ['./online-process-steps.component.css']
})
export class OnlineProcessStepsComponent implements OnInit {
@Input() country: string;

  constructor() { }

  ngOnInit(): void {
  }

}
