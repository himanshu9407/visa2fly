import { Component } from '@angular/core';
import { HomeServiceService } from './home-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'visa-App';
  users$: Object;
  constructor(private myservice: HomeServiceService) {}


ngOnInit() {
  this.myservice.getUsers().subscribe(
    data => this.users$ = data 
  );
}

}