import { Component, OnInit } from '@angular/core';
import { PreloaderService } from 'src/app/shared/preloader.service';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.css']
})
export class SimComponent implements OnInit {

  constructor(private preloaderService : PreloaderService) {
    this.preloaderService.showPreloader(true);
   }

  ngOnInit() {
    setTimeout(() => {
      this.preloaderService.showPreloader(false);
    }, 2000);
  }

}
