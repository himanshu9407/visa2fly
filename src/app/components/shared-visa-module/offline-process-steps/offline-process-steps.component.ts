import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offline-process-steps',
  templateUrl: './offline-process-steps.component.html',
  styleUrls: ['./offline-process-steps.component.css']
})
export class OfflineProcessStepsComponent implements OnInit {
  @Input() country: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
