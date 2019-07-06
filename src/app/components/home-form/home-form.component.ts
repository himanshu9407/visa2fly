import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
selector: 'app-home-form',
templateUrl: './home-form.component.html',
styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent  {


  constructor(private router: Router,private httpClient: HttpClient) { }
  
    public show:boolean = false;
  
    ngOnInit () { let obs = this.httpClient.get('http://staging.visa2fly.com:8080/visa2fly-Backend-0.0.1-SNAPSHOT/info/landing');
    obs.subscribe(() => console.log(obs)); }
  
    toggle() {
      this.show = !this.show;
    }

    navigate() {
      this.router.navigate(['reg']);
}
  }
  