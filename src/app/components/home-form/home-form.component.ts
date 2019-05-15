import { Component, OnInit } from '@angular/core';

@Component({
selector: 'app-home-form',
templateUrl: './home-form.component.html',
styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {


    constructor() { }
  
    public show:boolean = false;
    public buttonName:any = 'Show';
  
    ngOnInit () {  }
  
    toggle() {
      this.show = !this.show;
    }
  }
  