import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-process-steps',
  templateUrl: './process-steps.component.html',
  styleUrls: ['./process-steps.component.css']
})
export class ProcessStepsComponent implements OnInit {
@Input() country: string;

  constructor() { }

  ngOnInit(): void {
  }

}
