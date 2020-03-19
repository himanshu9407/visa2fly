import { Component, OnInit } from '@angular/core';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { SimService } from './sim.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.css']
})
export class SimComponent implements OnInit {


  simCountries : Array<any> = [];

  simHomeForm : FormGroup;
  selectedSimCountry : string = "";
  title: string = "Visa2fly | Sim";

  constructor(private preloaderService : PreloaderService, private simService : SimService, private titleService: Title,
    private meta: Meta,
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

    this.titleService.setTitle(this.title);
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: ""
      },
      // { name: "author", content: "rsgitech" },
      // { name: "robots", content: "index, follow" }
    ]);
  }

  onSimCountrySelected () {
    // console.log(this.selectedSimCountry);
    this.selectedSimCountry = this.simHomeForm.get('simSelect').value;
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

  proceedToPlans(country: string) {
    localStorage.setItem("simSelectedCountry",country);
    this.router.navigate(['sim/simplans']);
  }
}
