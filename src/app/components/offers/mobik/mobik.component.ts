import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-mobik',
  templateUrl: './mobik.component.html',
  styleUrls: ['./mobik.component.css']
})
export class MobikComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle("Visa2fly | Offers");
    this.meta.addTags([
      { name: "keywords", content: "Visa2fly Offers" },
      {
        name: "description",
        content: "Get Flat ₹ 250 Cashback from MobiKwik",
      },
    ]);
  }

}
