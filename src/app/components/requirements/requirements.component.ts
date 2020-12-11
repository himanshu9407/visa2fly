import { element } from "protractor";
import {
  Component,
  OnInit,
  ɵConsole,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeServiceService } from "../../home-service.service";
import { requirementData } from "../../interfaces/requirement";
import { RequirementsService } from "./requirements.service";
import { RequirementsModel } from "./requirements.model";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { LoginService } from "../login-signup/login/login.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import {
  animate,
  style,
  transition,
  trigger,
  state,
} from "@angular/animations";
import { FormGroup, FormControl } from "@angular/forms";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import * as $ from "jquery";
import { Meta, Title } from "@angular/platform-browser";
@Component({
  selector: "app-requirements",
  templateUrl: "./requirements.component.html",
  styleUrls: ["./requirements.component.css"],
  animations: [
    trigger("simpleFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(800)]),
      transition(
        ":leave",
        animate(800, style({ opacity: 0, background: "green" }))
      ),
    ]),
  ],
})
export class RequirementsComponent implements OnInit {
  public regData: requirementData;
  public fieldName: string;

  public onlinestatus: boolean = false;

  public requirementsData: any;
  public userFlowDetails: any;

  desktopJustify = "justified";
  desktopOrientation = "horizontal";

  public faqs: Array<any> = [];
  public dataSource: Array<{
    id: string;
    dataToggle: string;
    dataToggleHash: string;
  }> = [];

  public requiredSource: Array<{ id: string }> = [];

  public mainArr: Array<any> = [[]];
  public mobileMainArr: Array<any> = [[]];

  public selectedDataArr: Array<any> = [this.mainArr[0][0]];
  public mobileSelectedDataArr: Array<any> = [this.mobileMainArr[0][0]];

  public showRequirementsDetailArr = [true];
  public mobileShowRequirementsDetailArr = [true];
  public purposeApiNew: Array<any> = [];
  public purposeApi: Array<any> = [];
  public quotes = [];
  public selectedPurposeType: any;
  public selectedCountrytype: any;
  public importantInfo: Array<any> = [];

  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];
  MyQuotation: Array<any> = [];
  Quotation: Array<any> = [];

  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public imageUpload1: Array<any> = [];

  purposeChooseForm: FormGroup;
  country: any;
  selectedVariable: any;
  selectedItem: string;

  public countryDesc: string;
  makeUrl: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private myservice: HomeServiceService,
    private reqService: RequirementsService,
    private userFlow: UserFlowDetails,
    private routerHistory: RouterHistory,
    private toastr: ToastrService,
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private preloaderService: PreloaderService,
    private activateRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc
  ) {
    this.preloaderService.showPreloader(true);

    this.activateRoute.params.subscribe((params: any) => {
      this.selectedPurposeType = params.purpose;
      this.selectedCountrytype = params.country;
      this.selectedVariable = params.variable;

      switch (this.selectedCountrytype) {
        case "Armenia":
          this.router.navigate(["/visa", "armenia-visa-online"]);
          break;
        case "Australia":
          this.router.navigate(["/visa", "australia-visa-online"]);
          break;
        case "Austria":
          this.router.navigate(["/visa", "austria-visa-online"]);
          break;
        case "Antigua & Barbuda":
          this.router.navigate(["/visa", "antigua & barbuda-visa-online"]);
          break;
        case "Azerbaijan":
          this.router.navigate(["/visa", "azerbaijan-visa-online"]);
          break;
        // case "Brazil":
        //   this.router.navigate(["/visa", "brazil-visa-online"]);
        //   break;
        case "Canada":
          this.router.navigate(["/visa", "canada-visa-online"]);
          break;
        case "Bahrain":
          this.router.navigate(["/visa", "bahrain-visa-online"]);
          break;
        case "Belgium":
          this.router.navigate(["/visa", "belgium-visa-online"]);
          break;
        case "Bhutan":
          this.router.navigate(["/visa", "bhutan-visa-online"]);
          break;
        case "China":
          this.router.navigate(["/visa", "china-visa-online"]);
          break;
        case "Cambodia":
          this.router.navigate(["/visa", "Cambodia-visa-online"]);
          break;
        case "Dubai":
          this.router.navigate(["/visa", "dubai-visa-online"]);
          break;
        case "Denmark":
          this.router.navigate(["/visa", "denmark-visa-online"]);
          break;
        case "Egypt":
          this.router.navigate(["/visa", "egypt-visa-online"]);
          break;
        case "Estonia":
          this.router.navigate(["/visa", "estonia-visa-online"]);
          break;
        case "Ethiopia":
          this.router.navigate(["/visa", "ethiopia-visa-online"]);
          break;
        case "Finland":
          this.router.navigate(["/visa", "finland-visa-online"]);
          break;
        case "France":
          this.router.navigate(["/visa", "france-visa-online"]);
          break;
        case "Georgia":
          this.router.navigate(["/visa", "georgia-visa-online"]);
          break;
        case "Japan":
          this.router.navigate(["/visa", "japan-visa-online"]);
          break;
        case "Malaysia":
          this.router.navigate(["/visa", "malaysia-visa-online"]);
          break;
        case "Maldives":
          this.router.navigate(["/visa", "maldives-visa-online"]);
          break;
        case "New Zealand":
          this.router.navigate(["/visa", "new-zealand-visa-online"]);
          break;
        case "South Africa":
          this.router.navigate(["/visa", "south-africa-visa-online"]);
          break;
        case "Netherlands":
          this.router.navigate(["/visa", "netherlands-visa-online"]);
          break;
        // case "Russia":
        //   this.router.navigate(["/visa", "russia-visa-online"]);
        //   break;
        // case "Rwanda":
        //   this.router.navigate(["/visa", "rwanda-visa-online"]);
        //   break;
        case "Singapore":
          this.router.navigate(["/visa", "singapore-visa-online"]);
          break;
        case "Spain":
          this.router.navigate(["/visa", "spain-visa-online"]);
          break;
        case "Sri-Lanka":
          this.router.navigate(["/visa", "sri-lanka-visa-online"]);
          break;
        case "Swiss":
          this.router.navigate(["/visa", "swiss-visa-online"]);
          break;
        case "Taiwan":
          this.router.navigate(["/visa", "taiwan-visa-online"]);
          break;
        // case "Tajikistan":
        //   this.router.navigate(["/visa", "tajikistan-visa-online"]);
        //   break;
        case "Thailand":
          this.router.navigate(["/visa", "thailand-visa-online"]);
          break;
        case "Turkey":
          this.router.navigate(["/visa", "turkey-visa-online"]);
          break;
        case "Ukraine":
          this.router.navigate(["/visa", "ukraine-visa-online"]);
          break;
        case "UAE":
          this.router.navigate(["/visa", "uae-visa-online"]);
          break;
        case "UK":
          this.router.navigate(["/visa", "uk-visa-online"]);
          break;
        case "USA":
          this.router.navigate(["/visa", "usa-visa-online"]);
          break;
        case "Uzbekistan":
          this.router.navigate(["/visa", "uzbekistan-visa-online"]);
          break;
        case "Vietnam":
          this.router.navigate(["/visa", "vietnam-visa-online"]);
          break;
        case "Zambia":
          this.router.navigate(["/visa", "zambia-visa-online"]);
          break;
      }

      if (params["purpose"]) {
        this.router.navigate([
          "visa-requirements/",
          this.selectedCountrytype,
          this.selectedVariable,
        ]);
      }

      if (this.userFlow.getCookie("selectedVisaPurpose")) {
        this.selectedPurposeType = this.userFlow.getCookie(
          "selectedVisaPurpose"
        );
      } else {
        this.selectedPurposeType = "Tourist";
      }

      switch (this.selectedCountrytype) {
        case "Austria":
          this.countryDesc =
            "Austria lies in the southern part of Central Europe. It is famous for its affinity towards winter sports, as well as talent for fine handcrafted items such as jewellery, ceramic and glassware. Magnificent cathedrals are also a star attraction here - as well as its title as the birthplace of Western Classical music . Austria is home to many famous people, including Mozart, Strauss, Hitler, Freud, Arnold Schwarzenegger and Gregor Mendel.";
          break;

        case "Belgium":
          this.countryDesc =
            "Belgium is part of Western Europe. It is the home to the headquarters of the European Union, and is a stronghold for many medieval and renaissance-dated architecture - including full towns, museums, galleries,churches and castles (moats and all!). The architecture itself is part of the artistic experience. Areas to explore include its capital, Brussels, as well as Antwerp and Ardennes.";
          break;

        case "Canada":
          this.countryDesc =
            "The World’s second-largest by total area - Canada - is part of North America and is the home of maple syrup, ice hockey and freezing climate. It is a conglomeration of French architecture (which can be seen in Quebec and Montreal) and lively metropolitan cityscape (such as that seen in Toronto and Vancouver). Most of its population lie in the Southern parts of the country, while the North is home to the snowy, icy forest Taiga - the World’s largest biome.";
          break;

        case "Czech Republic":
          this.countryDesc =
            "The Czech Republic is landlocked between Austria, Germany, Poland and Slovakia. It is part of both the Schengen area and the European Union, and is famous for its many castles (it has the most in Europe!) and gardenscape. Some of the most famous relics include Prague Castle, Zamek Lednice, Hluboka Nad Vltavou Castle and Cesky Krumlov Castle. One of the oldest astronomical clocks lies in Prague’s Old Town, with the design of apostles chiming every hour.";
          break;

        case "Denmark":
          this.countryDesc =
            "Denmark is a Scandinavian country comprising 406 islands - 70 of which are inhabited. It is famous for its arts and design connoisseurs, who have come up with the likes of Bang & Olufsen, Royal Copenhagen porcelain and even the Sydney Opera House. People who come here generally visit Copenhagen (its capital), the cobblestoned alleyways of Odense (home of Hans Christian Andersen), Aarhus and Aalborg.";
          break;

        case "Estonia":
          this.countryDesc =
            "The Republic of Estonia lies on the eastern coast of the Baltic sea, with Russia and Latvia being connected by land. Its prized landscape spans across rugged mountains and cliff-beaches, lush forests and splendid lakes. It is home to two Unesco World Heritage Sites (in the Old Town of Tallinn - also its capital - and the Struve Geodetic Arc).";
          break;

        case "Finland":
          this.countryDesc =
            "Finland lies in Northern Europe, surrounded by Russia, Norway and Sweden. It is famous for its untouched nature, as well as the much-coveted Northern Lights. You can check out its Midnight Sunrise, have a good ski session, tour the artistic streets of Helsinki, or visit the 18th century sea fortress Suomenlinna.";
          break;

        case "Georgia":
          this.countryDesc =
            "Georgia is a small country that intersects Europe and Asia. Its mountainous terrain is home to monasteries, cathedrals, and even a glacier. It is famous for Vardzia, a 12th-century cave monastery, and the age-old wine-growing region Kakheti. Its capital Tbilisi houses cobblestoned streets and the Narikala fortress, while Batumi lies at the port of the Black Sea, and is home to botanical gardens and an Alphabetic Tower.";
          break;

        case "Germany":
          this.countryDesc =
            "Many know of Germany’s knack for design and engineering. It is a Western European country that has natural beauty as well, in the form of rivers, forests, mountain ranges and the North Sea by its side. Its bread, beer and music festival culture is one to not miss whilst travelling; make sure to pass through Berlin, Munich, Frankfurt and Hamburg while you're here. ";
          break;

        case "Greece":
          this.countryDesc =
            "Often called the cradle of Western Civilization, Greece is a country that is revered in ancient lore. It has cerulean blue beaches dotted with vanilla white settlements in Mykonos and Santorini. Not to mention the wealth of the Greek Empire that inhabited it, which manifest in the form of archaeological paradises that are Athens and Corfu.";
          break;

        case "Hong Kong":
          this.countryDesc =
            "Hong Kong is a special administrative region that is part of the People’s Republic of China. It is an autonomous Chinese territory, and is famous for its beautiful nightlife, skyscrapers and shopping. Things to do here include a visit to Hong Kong Disneyland, experience a Victoria Harbour nighttime light show, stroll around a night market, and climb the hill to visit Tian Tan Buddha.";
          break;

        case "Hungary":
          this.countryDesc =
            "Hungary lies in Central Europe, and is part of both the European Union, and Schengen Area. Its skyline is a mixture of neoclassical and medieval architecture - places to visit include Budapest (its capital), Lake Balaton and Szentendre. Thermal and mineral spas are also popular, as part of the Turkish and Roman influence.";
          break;

        case "Iceland":
          this.countryDesc =
            "Iceland is a Nordic region that has a lot to offer in terms of natural beauty. Barring the obvious (but always awe-striking!) Northern Lights, the country’s laval fields, geysers, volcanoes and hot springs offer an interesting experience. For this reason, it is known as the “Land of Fire and Ice”. Fun fact - the country is also the most sparsely populated one in the whole of Europe.";
          break;

        case "Italy":
          this.countryDesc =
            "Ah, Italy. The land of pizzas, wine, flowing Venice canals, Milan fashion, Florentine art and The Pope. This boot-shaped country has much to offer in almost any field you think of, which is what makes it such a great tourist destination. Places to surely visit include Rome, Venice, Florence, Milan and the Vatican city.";
          break;

        case "Kenya":
          this.countryDesc =
            "Kenya is situated in East Africa - and is famous for its classic Savannah safaris. Kenyan wildlife is coveted, and its landscape facilitates this: The Great Rift Valley, lakelands, mountain highlands, and of course, the savannah all add to its charm as a country that has been allowed to flourish in its natural state.";
          break;

        case "Kyrgyzstan":
          this.countryDesc =
            "Kyrgyzstan, also known as Kirghizia, is a nation of mountains - having around 88 major ranges. And there’s so much to do here - stay a night in a traditional Yurt while waking up to crisp mountain air, or visit Issyk Kul and Tash Rabat. You can even white-water raft, or bathe in hot springs here: embrace all that the mountains can offer.";
          break;

        case "Latvia":
          this.countryDesc =
            "Latvia lies on the Baltic Sea, with far-reaching beaches and expansive, dense forests. Its capital, Riga, is famous for its wooden art , art nouveau and architecture. Local crafts and artefacts are on display in an open-air museum, the medieval St. Peter’s Church and the Latvian city Jūrmala are all great places to begin your journey through the country.";
          break;

        case "Liechtenstein":
          this.countryDesc =
            "Liechtenstein is a country in the midst of Austria and Switzerland. Its many private banks and modern, contemporary art galleries call tourists from all over the World. Its capital, Vaduz, is home to around 5000 people - a small yet inviting bunch. Rolling hills, quaint houses and a castle in the midst of a mountainous range are what make this a classic European landscape.";
          break;

        case "Lithuania":
          this.countryDesc =
            "Lithuania, with its capital Vilnius, lies on the edge of the Baltic Sea. There is much to do here, including experiencing Karaite culture in Trakai Island, visiting Kaunas Castle, and touring Klaipeda on foot - Drama Theatre, castles and all! Of course, the capital Vilnius also has its own set of happenings that include its Old Town and cobblestoned streets full of baroque architecture.";
          break;

        case "Luxembourg":
          this.countryDesc =
            "Luxembourg is a Western European country that is famous for its award-winning wines, among other things. It is the richest country in the European Union and is a safe place to stay and live. It has quite a small land mass, covered in mostly rural forests, rocky gorges and river valleys. Make sure to visit the medieval Old Town whilst here - a UNESCO World Heritage Site.";
          break;

        case "Malta":
          this.countryDesc =
            "An archipelago in the midst of the Mediterranean, Malta is a country known for its historical value. With a succession of colonizations by the Romans, Moors, Knights of Saint John, French and British, the sights here are a conglomeration of what is current and what has been. Its capital is Valletta, and Ħal Saflieni Hypogeum is one of the most visited spots - dating back to 4000 B. C.!";
          break;

        case "Norway":
          this.countryDesc =
            "Norway is a Scandinavian country that is part of the Schengen Area. The fjords, coastline and skyscraping rock formations are what make Norway a natural paradise. Its strong and ancient Viking culture makes its way into daily life as well, with fishing and hiking being popular activities. Skiing is also high on the to-do list here.";
          break;

        case "Oman":
          this.countryDesc =
            "The sultanate of Oman is located in-between UAE and Yemen, off the coast of the Arabian Sea. The sea food and sea breeze are what call people here - Muscat (its capital) and the surrounding areas offer much in terms of Arabic culture, and souks are the place to be. The Hajar mountains are regularly trekked, to enjoy a desert sunrise on cool days.";
          break;

        case "Poland":
          this.countryDesc =
            "Poland shares a coast of the Baltic Sea, and is located in central Europe. Polish people are known for their hospitality, straightforwardness and cuisine - expect a myriad potato dish coming your way! It has a modern democracy, and some of the best ski slopes to let your winter sport adrenaline out. Cities to visit include Krakow, Warsaw, Gdansk and Wroclaw.";
          break;

        case "Portugal":
          this.countryDesc =
            "Portugal is located next to Spain on the Atlantic Ocean, in Southern Europe. Portugal and India have a long-dated relationship, and many come to its coasts to enjoy the beach life and charismatic food culture. It is also one of Europe’s oldest countries, and is home to the World’s oldest bookshop - open since 1732!";
          break;

        case "Qatar":
          this.countryDesc =
            "Qatar is an Arab country comprising of vast desert life and shoreline beaches. Its architecture is a mix of both modern and ancient, with olden-day Islamic influences used to create futuristic skyscrapers. Examples of these include the Doha Corniche, Museum of Islamic Art, Katara Cultural Village and Aspire Park. It has a generally hot climate, with little rainfall - and is also known to be a country with one of the highest human developent rates. ";
          break;

        case "Slovakia":
          this.countryDesc =
            "Slovakia is situated in Central Europe, with beautiful snowy mountains where you can enjoy hiking and budget skiing. Other things to do here include a visit to one of their 180 castles, close to 6000 caves and 425 chateaux - huge numbers for a small country! Bratislava is its capital city, with Kosice being one of the most visited as well. ";
          break;

        case "Slovenia":
          this.countryDesc =
            "Slovenia, with its capital Ljubljana, is a country situated in Central Europe. Large, towering mountains capped with snow with lakes at their foot is what you can expect to see here. Hot springs that feed the glacial Lake Bled are a sight to see, as well as the baroque architecture in Ljubljana, Piran and Istria. The country is also home to beaches, as it lies in the crook of the Adriatic Sea. ";
          break;

        case "Sweden":
          this.countryDesc =
            "Sweden is a Scandinavian country lying in the northern part of Europe. It is well-known for its knack for avante-garde design producing stylish yet functional pieces - famous brands that originated here include IKEA, Spotify and Volvo. Alfred Nobel is a native of this country, and so are the evergreen pop sensation ABBA. The country’s natural landscape is also one to see; ice hotels, Northern Lights and Fika (the cultural practice) are some examples.";
          break;

        case "Uganda":
          this.countryDesc =
            "Uganda is situated in East Africa, and is home to the Crested Crane - among other unique species present here, it is also the bird on their flag. The country's diverse, expansive landscape includes many national parks (filled with shrubs, lakes, a 43-m waterfall, and various species of wide animals) and even a snow-capped mountain (Rwenzori)! ";
          break;

        default:
          this.countryDesc = "";
          break;
      }
    });

    this.makeUrl = 'https://static.visa2fly.com/country/v2/' + this.selectedCountrytype + '.jpg';

    this.activateRoute.params.subscribe((params: any) => { });
    let tempPurpose = this.selectedPurposeType;
    this.purposeChooseForm = new FormGroup({
      purposeSelected: new FormControl(tempPurpose),
    });
    //Api Call
    this.reqService
      .getRequirementsData(this.selectedCountrytype)
      .then((data: any) => {
        // console.log(data);

        if (isPlatformBrowser(this.platformId)) {
          if (data.code == "0") {
            this.requirementsData = data;
            this.Quotation = data.data.displayQuotes;
            this.Quotation.forEach((element) => {
              this.purposeApi.push(element.purpose);
              if (element.purpose == "Tourist") {
                this.touristArr.push(element);
              } else if (element.purpose == "Business") {
                this.businessArr.push(element);
              } else {
                this.transitArr.push(element);
              }
            });

            //Fetch Value From quotation and remove dublicate
            for (var value of this.purposeApi) {
              if (this.purposeApiNew.indexOf(value) === -1) {
                this.purposeApiNew.push(value);
              }
            }

            setTimeout(() => {
              this.preloaderService.showPreloader(false);
            }, 500);

            let purposeMain = this.selectedPurposeType;
            let purposeUrl =
              purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
            var newImageCatogoryPurpose = purposeMain.toUpperCase();
            if (purposeUrl == "Business") {
              this.MyQuotation = this.businessArr;
            } else if (purposeUrl == "Tourist") {
              this.MyQuotation = this.touristArr;
            } else if (purposeUrl == "Transit") {
              this.MyQuotation = this.transitArr;
            } else {
              this.router.navigate(["visa/"]);
            }
            this.importantInfo = data.data.importantInfo;
            this.onlinestatus = data.data.onlineCategory;
            let tempFaqs = data.data.faqs;

            for (let key in tempFaqs) {
              let tempFaqObj = { title: key, content: tempFaqs[key] };
              this.faqs.push(tempFaqObj);
            }

            this.faqs.forEach((element, index) => {
              let temp = { id: "", dataToggle: "", dataToggleHash: "" };
              temp.id = "Traveller " + index;
              temp.dataToggle = "toogle" + index;
              temp.dataToggleHash = "#toogle" + index;
              this.dataSource.push(temp);
            });

            this.imageCatogory.push(data.data.imageUploadInfo);

            this.imageCatogoryBusinessTemp = this.imageCatogory[0]["BUSINESS"];
            this.imageCatogoryTouristTemp = this.imageCatogory[0]["TOURIST"];
            this.imageCatogoryTransitTemp = this.imageCatogory[0]["TRANSIT"];

            if (purposeUrl == "Business") {
              this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
            } else if (purposeUrl == "Tourist") {
              this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
            } else {
              this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
            }

            this.userFlow.setUserFlowDetails(
              "onlineCountry",
              JSON.stringify(data.data.onlineCategory)
            );
            this.imageUpload1 = this.imageCatogoryTemp;

            let temp = [];
            let i,
              j,
              temparray,
              chunk = 3;

            this.mainArr = [];

            for (i = 0, j = data.data.fieldDetails.length; i < j; i += chunk) {
              temparray = data.data.fieldDetails.slice(i, i + chunk);
              this.mainArr.push(temparray);
            }

            let i1,
              j1,
              temparray1,
              chunk1 = 1;

            this.mobileMainArr = [];

            for (
              i1 = 0, j1 = data.data.fieldDetails.length;
              i1 < j1;
              i1 += chunk1
            ) {
              temparray1 = data.data.fieldDetails.slice(i1, i1 + chunk1);
              this.mobileMainArr.push(temparray1);
            }

            this.showRequirementsDetailArr = [];
            this.selectedDataArr = [];
            for (let k = 0; k < this.mainArr.length; k++) {
              this.selectedDataArr.push(this.mainArr[k][0]);
              if (k == 0) {
                this.showRequirementsDetailArr.push(true);
              } else {
                this.showRequirementsDetailArr.push(false);
              }
            }
            this.mobileShowRequirementsDetailArr = [];
            this.mobileSelectedDataArr = [];

            for (let k = 0; k < this.mobileMainArr.length; k++) {
              this.mobileSelectedDataArr.push(this.mobileMainArr[k][0]);

              if (k == 0) {
                this.mobileShowRequirementsDetailArr.push(true);
              } else {
                this.mobileShowRequirementsDetailArr.push(false);
              }
            }

            let lastArr = this.mainArr[this.mainArr.length - 1];

            let falseObject = {
              content: "",
              display: "",
              fieldName: ""
            }

            if (lastArr.length == 2) {
              lastArr.push(falseObject);
            }
          } else {
            setTimeout(() => {
              this.preloaderService.showPreloader(false);
              this.router.navigate(["/"]);
            }, 2000);
            this.toastr.error("Country Not Found");
          }
        }
      });
  }

  navigate(
    quoteId: string,
    category: string,
    minTravelDate: number,
    basePrice: number,
    serviceTax: number,
    stayPeriod: string,
    imageUpload: boolean
  ) {
    this.preloaderService.showPreloader(true);

    this.userFlow.setUserFlowDetails("country", this.selectedCountrytype);
    this.userFlow.setUserFlowDetails(
      "purpose",
      this.purposeChooseForm.get("purposeSelected").value
    );
    this.userFlow.setUserFlowDetails("quoteId", quoteId);
    this.userFlow.setUserFlowDetails("category", category);
    this.userFlow.setUserFlowDetails(
      "minTravelDate",
      JSON.stringify(minTravelDate)
    );

    this.userFlow.setUserFlowDetails("basePrice", JSON.stringify(basePrice));
    this.userFlow.setUserFlowDetails("serviceTax", JSON.stringify(serviceTax));
    this.userFlow.setUserFlowDetails("stayPeriod", stayPeriod);
    this.userFlow.setUserFlowDetails(
      "imageUpload",
      JSON.stringify(imageUpload)
    );
    this.userFlow.setUserFlowDetails(
      "imageUploads",
      JSON.stringify(this.imageUpload1)
    );

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

  // onClickRequrements(i, j, item) {
  //   if (
  //     this.showRequirementsDetailArr[i] == true &&
  //     this.selectedDataArr[i].fieldName == this.mainArr[i][j].fieldName
  //   ) {
  //     this.showRequirementsDetailArr[i] = false;
  //   } else if (
  //     this.selectedDataArr[i].fieldName == this.mainArr[i][j].fieldName &&
  //     this.showRequirementsDetailArr[i] == false
  //   ) {
  //     this.showRequirementsDetailArr[i] = true;
  //   } else {
  //     this.showRequirementsDetailArr[i] = true;
  //   }

  //   this.selectedDataArr[i] = this.mainArr[i][j];
  // }

  // onClickRequrementsMobile(i, j, item) {
  //   if (
  //     this.mobileShowRequirementsDetailArr[i] == true &&
  //     this.mobileSelectedDataArr[i].fieldName ==
  //       this.mobileMainArr[i][j].fieldName
  //   ) {
  //     this.mobileShowRequirementsDetailArr[i] = false;
  //   } else if (
  //     this.mobileSelectedDataArr[i].fieldName ==
  //     this.mobileMainArr[i][j].fieldName
  //   ) {
  //     this.mobileShowRequirementsDetailArr[i] = true;
  //   } else {
  //     this.mobileShowRequirementsDetailArr[i] = true;
  //   }

  //   this.mobileSelectedDataArr[i] = this.mobileMainArr[i][j];
  // }

  purposeChanged() {
    var purpose = this.purposeChooseForm.get("purposeSelected").value;
    var country = this.selectedCountrytype;
    var variable = this.selectedVariable;
    this.userFlow.setCookie("selectedVisaPurpose", purpose);
    if (purpose == "Tourist") {
      this.MyQuotation = this.touristArr;
      this.imageUpload1 = this.imageCatogoryTouristTemp;
    } else if (purpose == "Business") {
      this.MyQuotation = this.businessArr;
      this.imageUpload1 = this.imageCatogoryBusinessTemp;
    } else {
      this.MyQuotation = this.transitArr;
      this.imageUpload1 = this.imageCatogoryTransitTemp;
    }
  }

  ngOnInit() {
    this.titleService.setTitle(
      `${this.selectedCountrytype} Visa | Apply For ${this.selectedCountrytype} Visa Online for Indians- Visa2Fly`
    );

    this.titleService.setTitle(
      `${this.selectedCountrytype} Visa | Apply For ${this.selectedCountrytype} Visa Online for Indians- Visa2Fly`
    );

    this.meta.updateTag({
      name: "keywords",
      content:
        "Visa Online - Apply for tourist visa online to top international destinations like Dubai, UK, US, Singapore, Schengen, etc. hassle-free with Visa2fly. Click here to know more!",
    });
    this.meta.updateTag({
      name: "description",
      content:
        "Apply Visa Online by filling your Online Visa Application at Visa2Fly. Experience hassle-free end to end visa assistance for Indian passport holders. Book Here",
    });

    // facebook and linkedin
    this.meta.updateTag({
      property: "og:title",
      content: `${this.selectedCountrytype} Visa | Apply For ${this.selectedCountrytype} Visa Online for Indians- Visa2Fly`,
    });
    this.meta.updateTag({ property: "type", content: "website" });
    this.meta.updateTag({
      property: "og:image",
      content: `https://static.visa2fly.com/carousel/${this.selectedCountrytype}.jpg`,
    });
    this.meta.updateTag({
      property: "og:url",
      content: `https://visa2fly.com/visa-requirements/${this.selectedCountrytype}/apply-for-${this.selectedCountrytype}-visa-online`,
    });
    this.meta.updateTag({
      property: "og:image:alt",
      content: `${this.selectedCountrytype} Visa - Visa2Fly`,
    });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Apply Visa Online by filling your Online Visa Application at Visa2Fly. Experience hassle-free end to end visa assistance for Indian passport holders. Book Here",
    });

    // twitter
    this.meta.updateTag({
      property: "twitter:card",
      content: "summary",
    });
    this.meta.updateTag({
      property: "twitter:title",
      content: `${this.selectedCountrytype} Visa | Apply For ${this.selectedCountrytype} Visa Online for Indians- Visa2Fly`,
    });
    this.meta.updateTag({
      property: "twitter:image",
      content: `https://static.visa2fly.com/carousel/${this.selectedCountrytype}.jpg`,
    });
    this.meta.updateTag({
      property: "twitter:image:alt",
      content: "Visa2Fly",
    });
    this.meta.updateTag({
      property: "twitter:description",
      content:
        "Apply Visa Online by filling your Online Visa Application at Visa2Fly. Experience hassle-free end to end visa assistance for Indian passport holders. Book Here",
    });
    this.meta.updateTag({
      property: "twitter:site",
      content: "@visa2fly",
    });
    this.meta.updateTag({
      property: "twitter:creator",
      content: "@visa2fly",
    });

    let link: HTMLLinkElement = this.doc.createElement("link");
    link.setAttribute("rel", "canonical");
    this.doc.head.appendChild(link);
    link.setAttribute(
      "href",
      `https://visa2fly.com/visa-requirements/${this.selectedCountrytype}/apply-for-${this.selectedCountrytype}-visa-online/`
    );
  }

  setActiveItem(index: string, id: string) {
    this.selectedItem = index;

    if ($("#requiredSource" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }

  setActiveItemMobile(index: string, id: string) {
    this.selectedItem = index;

    if ($("#requiredSourceMobile" + index).hasClass("show")) {
      $("#" + id).removeClass("showDiv");
    } else {
      $("#" + id).addClass("showDiv");
    }
  }
}
