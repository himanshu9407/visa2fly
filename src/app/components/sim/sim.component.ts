import { Component, OnInit } from '@angular/core';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { SimService } from './sim.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.css']
})
export class SimComponent implements OnInit {


  simCountries : Array<any> = [];

  simHomeForm : FormGroup;
  selectedSimCountry : string = "";

  constructor(private preloaderService : PreloaderService, private simService : SimService,
    private router : Router) {
    this.preloaderService.showPreloader(true);
   }

  ngOnInit() {

    this.simHomeForm = new FormGroup({

      simSelect: new FormControl('',[Validators.required])
    }
    );
   

    this.simService.getSimcountries().subscribe(
      (data : any) => {
        if (data.code == "0") {
          // console.log(data);
          this.simCountries = data.data;
          setTimeout(() => {
            this.preloaderService.showPreloader(false);
          }, 2000);
      
        }
        else {
          setTimeout(() => {
            this.preloaderService.showPreloader(false);
          }, 2000);
      
        }
      }
    );
  }

  onSimCountrySelected () {
    this.selectedSimCountry = this.simHomeForm.get('simSelect').value;
   // console.log(this.selectedSimCountry);
    localStorage.setItem("simSelectedCountry",this.selectedSimCountry);
    this.router.navigate(['sim/simplans']);

    // this.simService.getSimPlans(this.selectedSimCountry).subscribe(
    //   (data : any) => {
    //     if (data.code == "0") {
    //       console.log(data);
    //     }
    //     else {

    //     }
    //   }
    // );


    
  } 

}
