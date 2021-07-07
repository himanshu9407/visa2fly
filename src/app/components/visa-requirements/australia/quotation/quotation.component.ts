import { Component, OnInit, Input, Inject, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserFlowDetails } from 'src/app/shared/user-flow-details.service';
import { ToastrService } from 'ngx-toastr';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { LoginService } from 'src/app/components/login-signup/login/login.service';
import { PreloaderService } from 'src/app/shared/preloader.service';
import { RouterHistory } from 'src/app/shared/router-history.service';
import { RequirementsService } from 'src/app/components/requirements/requirements.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit, AfterContentInit {

  @Input() businessQuotes: any[];
  @Input() touristQuotes: any[];
  @Input() transitQuotes: any[];
  @Input() currentVisa: string;
  @Output() visaTypeVal = new EventEmitter<string>();

  constructor(
    private router: Router,
    private userFlow: UserFlowDetails,
    private toastr: ToastrService,
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private preloaderService: PreloaderService,
    private routerHistory: RouterHistory,
    private reqService: RequirementsService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    let initTabset: string;
    let initIndex: number;
    let initVal: string;
    if (this.currentVisa == 'Tourist') {
      initTabset = 'touristTab';
      initIndex = 0;
      initVal = 'Tourist';
    } else if (this.currentVisa == 'Business') {
      initTabset = 'businessTab';
      initIndex = 1;
      initVal = 'Business';
    } else if (this.currentVisa == 'Transit') {
      initTabset = 'transitTab';
      initIndex = 2;
      initVal = 'Transit';
    }
    this.onChangeTabset(initTabset, initIndex, initVal);
    console.log(this.currentVisa);
  }

  navigate(
    quoteId: string,
    purpose: string,
    category: string,
    minTravelDate: number,
    basePrice: number,
    serviceTax: number,
    stayPeriod: string,
    imageUpload: boolean,
  ) {
    this.preloaderService.showPreloader(true);

    this.userFlow.setUserFlowDetails("purpose", purpose);
    this.userFlow.setUserFlowDetails("quoteId", quoteId);
    this.userFlow.setUserFlowDetails("category", category);
    this.userFlow.setUserFlowDetails(
      "minTravelDate",
      JSON.stringify(minTravelDate)
    );
    this.userFlow.setUserFlowDetails("basePrice", JSON.stringify(basePrice));
    this.userFlow.setUserFlowDetails("serviceTax", JSON.stringify(serviceTax));
    this.userFlow.setUserFlowDetails("stayPeriod", stayPeriod);
    this.userFlow.setUserFlowDetails("imageUpload", JSON.stringify(imageUpload));

    let token = this.loginService.getAuthToken();
    if (token == null || token == undefined) {
      token = "";
    }
    this.loginStatus.verifyAuthToken(token).subscribe((data: any) => {
      if (data.code == "0") {
        this.reqService.verifyQuotation(quoteId).subscribe((data: any) => {
          if (data.code == "0") {
            this.routerHistory.pushHistory("visa-requirement");
            this.router.navigate(["addTraveller"]);
            this.preloaderService.showPreloader(false);
          } else {
            this.toastr.error("" + data.message);
            this.preloaderService.showPreloader(false);
          }
        });
      } else if (data.code == "301") {
        this.loginService.setAuthToken("");
        this.loginStatus.setUserStatus(false);
        this.loginStatus.setUserLoggedIn(false);
        this.preloaderService.showPreloader(false);
        this.userFlow.setCookie("profile", JSON.stringify({}));
        this.routerHistory.pushHistory("req-and-quote");
        this.router.navigate(["slcontainer/login"]);
        this.preloaderService.showPreloader(false);
      } else {
        this.routerHistory.pushHistory("req-and-quote");
        this.router.navigate(["slcontainer/login"]);
        this.preloaderService.showPreloader(false);
      }
    });
  }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "variableWidth": true,
    // "centerMode": true,
    // "infinite": true,
    // "centerPadding": '30px',
    "prevArrow": '<div class="slick-prev"> <img src="http://startupangelsnetwork.com/wp-content/uploads/2021/05/Group-110.png" alt="san m-prev"></div>',
    "nextArrow": '<div class="slick-next"><img src="http://startupangelsnetwork.com/wp-content/uploads/2021/05/Group-111.png" alt="san m-prev"></div>',
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          "slidesToShow": 3,
          "slidesToScroll": 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "arrows": false,
          "variableWidth": true,
          "centerMode": true,
        }
      }
    ],
  };

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  onChangeTabset(tabset: string, index: number, value: string) {
    $(".navigation-tab-item").removeClass("active");
    $("#" + tabset).addClass("active");

    this.visaTypeVal.emit(value);

    if (window.innerWidth > 600) {
      $(".navigation-tab-overlay").css({
        left: index * 160 + "px"
      });
    } else {
      $(".navigation-tab-overlay").css({
        left: index * 100 + "px"
      });
    }
  }

}
