import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: "app-world",
  templateUrl: "./world.component.html",
  styleUrls: ["./world.component.css"],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateX(360deg)'
      })),
      state('inactive', style({
        transform: 'rotateX(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])  
  ]
})
export class WorldComponent implements OnInit {
  exploreWorld: string = "simpleRotate";
  generatePosition: number;
  flip: string = 'inactive';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  randomPosition() {
    this.generatePosition = Math.floor(Math.random() * 1600);
    return this.generatePosition + 'px';
  }

  findPlace() {
    console.log("find you destination");
    setTimeout(() => {
      this.exploreWorld = "reachYourDestination";
      this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    }, 1000);
    this.exploreWorld = "findingDestination";
  }
}
