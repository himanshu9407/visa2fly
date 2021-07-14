import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.css']
})
export class MobileFooterComponent implements OnInit {

  footerForAll: boolean = false;

  constructor(private router: Router,) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let url: string = event.url;
        let arr = url.split("/");

        arr[arr.length - 1] = arr[arr.length - 1].split("?")[0];

        if (
          arr[1] == "visa-requirement" ||
          arr[1] == "freeVisa" ||
          arr[1] == "visaOnArrival" ||
          arr[1] == "profile" ||
          arr[1] == "payment" ||
          arr[1] == "myBookings" ||
          arr[1] == "bookingDetail" ||
          arr[1] == "visa-requirements" ||
          arr[1] == "addTraveller" ||
          event.url == "/sim/checkout" ||
          // arr[1] == "slcontainer" ||
          arr[1] == "tnc" ||
          arr[1] == "privacyPolicy" ||
          arr[1] == "cookiePolicy" ||
          arr[1] == "cancellationPolicy" ||
          arr[1] == "404" ||
          arr[1] == "About-Us" ||
          arr[1] == "offers" ||
          arr[1] == "insurance" ||
          arr[1] == "australia-visa-online" ||
          arr[1] == "austria-visa-online" ||
          arr[1] == "antigua & barbuda-visa-online" ||
          arr[1] == "armenia-visa-online" ||
          arr[1] == "bahrain-visa-online" ||
          arr[1] == "bhutan-visa-online" ||
          arr[1] == "belgium-visa-online" ||
          arr[1] == "azerbaijan-visa-online" ||
          arr[1] == "brazil-visa-online" ||
          arr[1] == "ukraine-visa-online" ||
          arr[1] == "china-visa-online" ||
          arr[1] == "canada-visa-online" ||
          arr[1] == "cambodia-visa-online" ||
          arr[1] == "denmark-visa-online" ||
          arr[1] == "dubai-visa-online" ||
          arr[1] == "egypt-visa-online" ||
          arr[1] == "ethiopia-visa-online" ||
          arr[1] == "estonia-visa-online" ||
          arr[1] == "finland-visa-online" ||
          arr[1] == "france-visa-online" ||
          arr[1] == "georgia-visa-online" ||
          arr[1] == "germany-visa-online" ||
          arr[1] == "iraq-visa-online" ||
          arr[1] == "japan-visa-online" ||
          arr[1] == "kenya-visa-online" ||
          arr[1] == "malaysia-visa-online" ||
          arr[1] == "maldives-visa-online" ||
          arr[1] == "malta-visa-online" ||
          arr[1] == "new-zealand-visa-online" ||
          arr[1] == "south-africa-visa-online" ||
          arr[1] == "netherlands-visa-online" ||
          arr[1] == "russia-visa-online" ||
          arr[1] == "rwanda-visa-online" ||
          arr[1] == "singapore-visa-online" ||
          arr[1] == "spain-visa-online" ||
          arr[1] == "sri-lanka-visa-online" ||
          arr[1] == "swiss-visa-online" ||
          arr[1] == "taiwan-visa-online" ||
          arr[1] == "tajikistan-visa-online" ||
          arr[1] == "thailand-visa-online" ||
          arr[1] == "turkey-visa-online" ||
          arr[1] == "uae-visa-online" ||
          arr[1] == "uk-visa-online" ||
          arr[1] == "usa-visa-online" ||
          arr[1] == "uzbekistan-visa-online" ||
          arr[1] == "vietnam-visa-online" ||
          arr[1] == "zambia-visa-online"
        ) {
          this.footerForAll = true;
        } else if(arr[1] == "slcontainer") {
          this.footerForAll = false;
        } else {
          this.footerForAll = true;
        }
      }
    });
  }

  onClickBottomNavItem () {
  // console.log("hello");
  }

}
