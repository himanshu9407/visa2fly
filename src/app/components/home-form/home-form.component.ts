import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
selector: 'app-home-form',
templateUrl: './home-form.component.html',
styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {


  constructor(private router: Router) { }
  
    public show:boolean = false;
    public buttonName:any = 'Show';
  
    ngOnInit () {  }
  
    toggle() {
      this.show = !this.show;
    }

    navigate() {
      this.router.navigate(['reg']);
}
  }
  