import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-something-wrong',
  templateUrl: './something-wrong.component.html',
  styleUrls: ['./something-wrong.component.css']
})
export class SomethingWrongComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['b2b/home']);
  }

}
