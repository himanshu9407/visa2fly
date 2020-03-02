import { Component, OnInit, Inject, PLATFORM_ID, ElementRef } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-world",
  templateUrl: "./world.component.html",
  styleUrls: ["./world.component.css"]
})
export class WorldComponent implements OnInit {
  exploreWorld: string = "simpleRotate";
  generatePosition: number;

  constructor( @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  findPlace() {
    console.log("find you destination");
    setTimeout(() => {
      this.exploreWorld = "reachYourDestination";
    }, 1000);
    this.exploreWorld = "findingDestination";

    this.generatePosition = Math.floor(Math.random() * 1600);
// console.log(element);




    console.log(this.generatePosition);


  }
}
