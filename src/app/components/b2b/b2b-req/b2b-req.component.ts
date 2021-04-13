import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from "@angular/animations";
import { ToastService } from "src/app/shared/toast.service";
import { RequirementsService } from "../../requirements/requirements.service";
import { RouterHistory } from "src/app/shared/router-history.service";
import { LoginService } from "../../login-signup/login/login.service";
import { UserFlowDetails } from "src/app/shared/user-flow-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginStatusService } from "src/app/shared/login-status.service";
import { PreloaderService } from "src/app/shared/preloader.service";
import { B2bReqService } from "./b2b-req.service";
import { ToastrService } from "ngx-toastr";
import { HomeServiceService } from "src/app/home-service.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-b2b-req",
  templateUrl: "./b2b-req.component.html",
  styleUrls: ["./b2b-req.component.css"],
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
export class B2bReqComponent implements OnInit {
  userControlDetail: any;
  selectedVisaType: any;

  public userFlowDetails: any;
  public requirementsData: any;

  businessArr: Array<any> = [];
  touristArr: Array<any> = [];
  transitArr: Array<any> = [];

  public onlinestatus: boolean = false;

  MyQuotation: Array<any> = [];
  public imageCatogory: Array<any> = [];
  public imageCatogoryBusinessTemp: Array<any> = [];
  public imageCatogoryTouristTemp: Array<any> = [];
  public imageCatogoryTransitTemp: Array<any> = [];
  public imageCatogoryTemp: Array<any> = [];
  public imageUpload1: Array<any> = [];

  Quotation: Array<any> = [];
  public purposeApi: Array<any> = [];
  public purposeApiNew: Array<any> = [];

  MyQuotation1: any;
  importantInfo: any;

  public faqs: Array<any> = [];
  public dataSource: Array<{
    id: string;
    dataToggle: string;
    dataToggleHash: string;
  }> = [];

  public mainArr: Array<any> = [[]];
  public mobileMainArr: Array<any> = [[]];

  public selectedPurposeType: any;
  public selectedCountrytype: any;

  public selectedDataArr: Array<any> = [this.mainArr[0][0]];
  public mobileSelectedDataArr: Array<any> = [this.mobileMainArr[0][0]];

  public showRequirementsDetailArr = [true];
  public mobileShowRequirementsDetailArr = [true];

  purposeChooseForm: FormGroup;

  desktopJustify = "justified";
  desktopOrientation = "horizontal";
  selectedItem: string;
  id: any;
  countryDesc: string;
  makeUrl: string;

  constructor(
    private router: Router,
    private myservice: HomeServiceService,
    private reqService: B2bReqService,
    private userFlow: UserFlowDetails,
    private routerHistory: RouterHistory,
    private toastr: ToastrService,
    private titleService: Title,
    private meta: Meta,
    private loginStatus: LoginStatusService,
    private loginService: LoginService,
    private preloaderService: PreloaderService,
    private activateRoute: ActivatedRoute
  ) {
    this.preloaderService.showPreloader(true);
    this.activateRoute.params.subscribe((params: any) => {
      this.selectedPurposeType = params.purpose;
      this.selectedCountrytype = params.country;
    });

    switch (this.selectedCountrytype) {
      case "Armenia":
        this.countryDesc =
          "Armenia, situated in the Mountainous Caucasus region between Asia and Europe, was once part of the Soviet Republic. Now, its lakes, monasteries and religious sites encompass its history as one of the earliest Christian civilizations. Famous places to visit include the Greco Roman Temple of Garni, Etchmiadzin Cathedral, Cascade Complex and the Khor Virap Monastery.";
        break;

      case "Australia":
        this.countryDesc =
          "Australia makes up a large part of the geographic region Oceania. Its current architecture encompasses the collaboration between indigenous culture and urban landscape. Tourists often visit the magnificent Uluru and the natural wonder that is the Great Barrier Reef - as well as the modern masterpiece that is the Sydney Opera House and the bustling Bondi beach.";
        break;

      case "Austria":
        this.countryDesc =
          "Austria lies in the southern part of Central Europe. It is famous for its affinity towards winter sports, as well as talent for fine handcrafted items such as jewellery, ceramic and glassware. Magnificent cathedrals are also a star attraction here - as well as its title as the birthplace of Western Classical music . Austria is home to many famous people, including Mozart, Strauss, Hitler, Freud, Arnold Schwarzenegger and Gregor Mendel.";
        break;

      case "Azerbaijan":
        this.countryDesc =
          "Azerbaijan is situated between the Caspian Sea and the Caucasus mountain range. Its rich history is what draws people here: many Medieval (especially 12th Century) artefacts, monuments and cultural significance lie in its midst. Another interesting natural experience to note is the perpetually burning fire that is Yanar Dag - that never extinguishes, and runs on natural gas seepage in the ground.";
        break;

      case "Bahrain":
        this.countryDesc =
          "The Kingdom of Bahrain is situated in the Middle East, and it is an island nation comprising 40 natural islands and 51 artificial ones. Come here to experience the beauty and culture of the bazaars and souqs of Manama, as well as even a floating city!";
        break;

      case "Belgium":
        this.countryDesc =
          "Belgium is part of Western Europe. It is the home to the headquarters of the European Union, and is a stronghold for many medieval and renaissance-dated architecture - including full towns, museums, galleries,churches and castles (moats and all!). The architecture itself is part of the artistic experience. Areas to explore include its capital, Brussels, as well as Antwerp and Ardennes.";
        break;

      case "Cambodia":
        this.countryDesc =
          "Cambodia is a part of South-East Asia, whose capital is Phnom Penh. Its landscape is vast and varied, comprising deltas, plains, mountains and even a coastline. It is also the home of Angkor Wat, a famous stone temple complex. While visiting, make sure to visit the ancient ruins of majestic temples such as Bayon Temple, Prasat Beng Mealea and Ta Prohm Temple. Palaces and scuba diving are also high on the to-do list!";
        break;

      case "Canada":
        this.countryDesc =
          "The World’s second-largest by total area - Canada - is part of North America and is the home of maple syrup, ice hockey and freezing climate. It is a conglomeration of French architecture (which can be seen in Quebec and Montreal) and lively metropolitan cityscape (such as that seen in Toronto and Vancouver). Most of its population lie in the Southern parts of the country, while the North is home to the snowy, icy forest Taiga - the World’s largest biome.";
        break;

      case "China":
        this.countryDesc =
          "The People’s Republic of China lies in East Asia, below Russia and Mongolia, and above India and Myanmar on the geographical map. Many dynasties worth of remnants can be seen in the extensive and intricately designed palaces, temples and winding gardens here. These offer a contrast to the bustling city life that is seen in Beijing (its capital), Shanghai, Guangzhou and Suzhou.";
        break;

      case "Czech Republic":
        this.countryDesc =
          "The Czech Republic is landlocked between Austria, Germany, Poland and Slovakia. It is part of both the Schengen area and the European Union, and is famous for its many castles (it has the most in Europe!) and gardenscape. Some of the most famous relics include Prague Castle, Zamek Lednice, Hluboka Nad Vltavou Castle and Cesky Krumlov Castle. One of the oldest astronomical clocks lies in Prague’s Old Town, with the design of apostles chiming every hour.";
        break;

      case "Denmark":
        this.countryDesc =
          "Denmark is a Scandinavian country comprising 406 islands - 70 of which are inhabited. It is famous for its arts and design connoisseurs, who have come up with the likes of Bang & Olufsen, Royal Copenhagen porcelain and even the Sydney Opera House. People who come here generally visit Copenhagen (its capital), the cobblestoned alleyways of Odense (home of Hans Christian Andersen), Aarhus and Aalborg.";
        break;

      case "Dubai":
        this.countryDesc =
          "Dubai is a lively emirate that is part of the UAE (United Arab Emirates), and is known for its larger-than-life approach towards shopping, architecture and nightlife. The Burj Khalifa, The Dubai Mall, Ski Dubai, Wild Wadi Waterpark,Palm Jumeirah, Madinat Jumeirah and Dubai Gold Souk are some much-visited attractions. It is a Gulf city, and has a generally hot climate.";
        break;

      case "Estonia":
        this.countryDesc =
          "The Republic of Estonia lies on the eastern coast of the Baltic sea, with Russia and Latvia being connected by land. Its prized landscape spans across rugged mountains and cliff-beaches, lush forests and splendid lakes. It is home to two Unesco World Heritage Sites (in the Old Town of Tallinn - also its capital - and the Struve Geodetic Arc).";
        break;

      case "Ethiopia":
        this.countryDesc =
          "Ethiopia lies in the Horn of Africa, and is surrounded by Eritrea, Djibouti, Somalia and Sudan. Its capital Addis Ababa is a well-transited destination, as it has good connectivity to the rest of Africa. The country is home to archaeological findings dating back more than 3 million years, so the vast history is what you can immerse yourself in here. Lalibela, Gondar and Aksum are good places to visit whilst here.";
        break;

      case "Finland":
        this.countryDesc =
          "Finland lies in Northern Europe, surrounded by Russia, Norway and Sweden. It is famous for its untouched nature, as well as the much-coveted Northern Lights. You can check out its Midnight Sunrise, have a good ski session, tour the artistic streets of Helsinki, or visit the 18th century sea fortress Suomenlinna.";
        break;

      case "France":
        this.countryDesc =
          "France, in Western Europe, encompasses medieval cities, alpine villages and Mediterranean beaches. Paris, its capital, is famed for its fashion houses, classical art museums including the Louvre and monuments like the Eiffel Tower. The country is also renowned for its wines and sophisticated cuisine.";
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

      case "Japan":
        this.countryDesc =
          "Japan lies to the right of North and South Korea, as a set of islands - with its mountains, farms and seascape alike. Its capital, Tokyo, is a bustling hub of digital ideas, technical advancements and artistic flair. Moving further through the country will lead you towards its rich spiritual culture of Shinto shrines, delicate traditions of tea ceremonies and intricate Ikebana, as well as deep-rooted poetry, haiku and calligraphy.";
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

      case "Malaysia":
        this.countryDesc =
          "Malaysia comprises of a set of islands around South East Asia, mostly populated in the Malay Peninsula and Borneo. The Chinese, Indian, Malay and European influences make this a truly global country, with fusions and traditional influences alike. Scenic island locations like Langkawi mixed with urban masterpieces such as the Petronas Tower and Bukit Bintang are what you need to look out for.";
        break;

      case "Malta":
        this.countryDesc =
          "An archipelago in the midst of the Mediterranean, Malta is a country known for its historical value. With a succession of colonizations by the Romans, Moors, Knights of Saint John, French and British, the sights here are a conglomeration of what is current and what has been. Its capital is Valletta, and Ħal Saflieni Hypogeum is one of the most visited spots - dating back to 4000 B. C.!";
        break;

      case "Myanmar":
        this.countryDesc =
          "Myanmar is situated to the right of India - and is considered part of South-East Asia. The country has a heavy Buddhist influence, which seeps into daily life, rituals and even tourist destinations. It has a large expanse of untouched greenery, and is famous for its sand paintings, gems and much more.";
        break;

      case "Netherlands":
        this.countryDesc =
          "Netherlands lies on the edge of the North Sea, in Northwestern Europe. It is a country with an affinity for cycling, as you can pretty much access the whole nation by bike. Classical arts and modern design intersect here, with cities like Amsterdam, Rotterdam, The Hague and Utrecht being the conduits for this flow. Make sure to get back a pair of handmade wooden shoes, Delft Blue earthenware or something from the Cheese markets as a souvenir!";
        break;

      case "New Zealand":
        this.countryDesc =
          "New Zealand lies next to Australia on the World Map, in the midst of the Pacific Ocean. It has two main islands - the North and the South, both of which are populated by many animals, plants and not-so-many humans alike. There are 600 other islands apart from these. It is famous for its indigenous Maori culture, which tourists can also experience - along with their love for Rugby, and scenic views.";
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

      case "Singapore":
        this.countryDesc =
          "Singapore lies below Malaysia on the global map, and is a small island nation. But don't be fooled by its size - it has a highly developed economy, with well above average standards of living. Its airport - Changi - is also the best in the World! Apart from a worthwhile visit to the airport, other places of interest include Marina Bay Sands, Sentosa, the Merlion and Universal Studios.";
        break;

      case "Slovakia":
        this.countryDesc =
          "Slovakia is situated in Central Europe, with beautiful snowy mountains where you can enjoy hiking and budget skiing. Other things to do here include a visit to one of their 180 castles, close to 6000 caves and 425 chateaux - huge numbers for a small country! Bratislava is its capital city, with Kosice being one of the most visited as well. ";
        break;

      case "Slovenia":
        this.countryDesc =
          "Slovenia, with its capital Ljubljana, is a country situated in Central Europe. Large, towering mountains capped with snow with lakes at their foot is what you can expect to see here. Hot springs that feed the glacial Lake Bled are a sight to see, as well as the baroque architecture in Ljubljana, Piran and Istria. The country is also home to beaches, as it lies in the crook of the Adriatic Sea. ";
        break;

      case "South Africa":
        this.countryDesc =
          "South Africa is located as its name suggests - at the Southern tip of Africa. It is home to varied landscapes, including the ever-famous safari grounds that are National Parks, rolling waves with beaches at Plettenberg Bay, steep rocky cliffs at the Cape of Good Hope, and winelands near Paarl and Stellenbosch. A visit to the cities of Cape Town (the capital) and Johannesburg are also a good idea. ";
        break;

      case "Spain":
        this.countryDesc =
          "Spain is located in Western Europe, with Portugal to the right and France to the left of it. Spanish football culture, siestas and fiestas, and Roman Catholic architecture are what makes Spain tick. Madrid and Barcelona have two of the most famous pro football teams named after them, and are big on parties, beach life and good food.";
        break;

      case "Sri Lanka":
        this.countryDesc =
          "Sri Lanka is an island nation situated below India, in the midst of the Indian Ocean. It has a long history with India, and is slightly more than an hour’s flight journey away. The people are well-known for their hospitality and Buddhist culture - and the places to visit are many historically and religiously significant wonders. These include Sigiriya Fortress, Yala National Park and Adam’s Peak.";
        break;

      case "Sweden":
        this.countryDesc =
          "Sweden is a Scandinavian country lying in the northern part of Europe. It is well-known for its knack for avante-garde design producing stylish yet functional pieces - famous brands that originated here include IKEA, Spotify and Volvo. Alfred Nobel is a native of this country, and so are the evergreen pop sensation ABBA. The country’s natural landscape is also one to see; ice hotels, Northern Lights and Fika (the cultural practice) are some examples.";
        break;

      case "Switzerland":
        this.countryDesc =
          "Switzerland is familiar in many minds for identical reasons - rich, creamy chocolate and vanilla white snowpeaks. A ski paradise, The Alps snake through this country and many foreigners flock to enjoy it: Zermatt is one such ski resort that is reputed for the same. Zurich - its capital - and Geneva - the headquarters of the United Nations - are both wonderful cities to get lost in.";
        break;

      case "Thailand":
        this.countryDesc =
          "Part of South-East Asia, Thailand had the highest international tourist receipts in the 2018 World Tourism Rankings list. And for good reason - welcoming, kind-natured locals and a country full of various types of beaches and nightlife is what Thailand is about. Places to surely visit include Bangkok, Chiang Mai, Phuket and Similan Islands. Go snorkelling, be entranced by golden temples and go crazy in their night markets!";
        break;

      case "Turkey":
        this.countryDesc =
          "Turkey is a transcontinental country. Most of it is located in Asia, whilst a small part of it lies in South-Eastern Europe. Its capital is Ankara, however, Istanbul is its most famous city. The country is best known for its mouth-watering delicacies (i.e. lip-smacking kebabs and Turkish Delights) as well as beautiful handmade carpets, rugs and other handlooms.";
        break;

      case "UAE":
        this.countryDesc =
          "The United Arab Emirates is located in Western Asia, and comprises 7 emirates. These include two of their most famous; Dubai and Abu Dhabi. It is known worldwide for its larger-than-life approach to architecture and entertainment, with the likes of Burj Khalifa and the Emirates Palace embodying this spirit. Take a camel ride and safari across the desert, or enjoy yourself at one of the many -Worlds (Ferrari World, Water World and IMG Worlds to name a few).";
        break;

      case "USA":
        this.countryDesc =
          "The United States of America is a 50-state nation that stetches across North America. The islands of Hawaii and ice-cold North tip Alaska also come under the USA territory. Terrain, destinations - and even time zones - vary across the states, as it is such a huge country. Disneyland, Hollywood, New York, San Francisco and Las Vegas are some pupular urban tourist destinations - while Utah, the Grand Canyon, Yellowstone and Yosemite National Parks are some natural wonders. ";
        break;

      case "Uganda":
        this.countryDesc =
          "Uganda is situated in East Africa, and is home to the Crested Crane - among other unique species present here, it is also the bird on their flag. The country's diverse, expansive landscape includes many national parks (filled with shrubs, lakes, a 43-m waterfall, and various species of wide animals) and even a snow-capped mountain (Rwenzori)! ";
        break;

      case "UK":
        this.countryDesc =
          "Contrary to popular belief, the United Kingdom is a set of countries - England, Scotland, Wales and Northern Ireland all come under this bracket. The capital, London, is part of England. The London Eye, Stonehenge and Buckingham Palace are some notable sights to explore, as well as the sprawling streets of Edinburgh, Cardiff, Belfast and Manchester.";
        break;

      case "Uzbekistan":
        this.countryDesc =
          "Uzbekistan is part of Central Asia. the Silk Road (an ancient trade route between the Mediterranean and China) passes through here, so there is much to offer in terms of historical value. No more a part of the Soviet union, Uzbekistan is famous for its many picturesque mosques, madrasas and mausoleums.";
        break;

      case "Vietnam":
        this.countryDesc =
          "Vietnam is a South-East Asian country that is known worldwide for its rice-based dishes (including Pho and much of its other street food), the Vietnamese War, and the many shades of green that colour its rolling hills and rice paddies.  The country's capital - Hanoi - and the ancient city (+UNESCO World Heritage Site) Hoi An are must-sees when arriving here.";
        break;

      case "Zambia":
        this.countryDesc =
          "Zambia is a landlocked country in southern Africa. The country is at one with the earth, which can be seen in their Valley of the Leopard, Victoria Falls and numerous nature reserves and parks. Their indigenous people, called Zambezi, are equally entrancing: to spend a day in their midst is worthwhile if you are travelling this far.";
        break;

      default:
        this.countryDesc = "";
        break;
    }

    this.makeUrl = 'https://static.visa2fly.com/country/v2/' + this.selectedCountrytype + '.jpg';

    let tempPurpose = this.selectedPurposeType;
    this.id = this.userFlow.getB2BUserFlowDetails().id;

    this.purposeChooseForm = new FormGroup({
      purposeSelected: new FormControl(tempPurpose),
    });
    this.reqService
      .getRequirementsData(this.selectedCountrytype)
      .then((data: any) => {
        if (data.code == "0") {
          this.requirementsData = data;
          this.Quotation = data.data.displayQuotes;
          this.Quotation.forEach((element) => {
            this.purposeApi.push(element.purpose);
            if (element.purpose == "Tourist") {
              this.touristArr.push(element);
              this.userFlow.setB2BUserFlowDetails(
                "imageUpload",
                element.imageUpload
              );
            } else if (element.purpose == "Business") {
              this.businessArr.push(element);
              this.userFlow.setB2BUserFlowDetails(
                "imageUpload",
                element.imageUpload
              );
            } else {
              this.transitArr.push(element);
              this.userFlow.setB2BUserFlowDetails(
                "imageUpload",
                element.imageUpload
              );
            }
          });

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
            const ID = this.userFlow.getB2BUserFlowDetails().id;
            this.router.navigate(["b2b/home"], { queryParams: { id: ID } });
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

          // if (this.onlinestatus) {
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

          console.log(this.imageCatogoryTemp);

          let temp1 = JSON.parse(this.userFlow.getCookie("userFlowDetails"));
          this.userFlow.setB2BUserFlowDetails(
            "onlineCountry",
            JSON.stringify(data.data.onlineCategory)
          );
          this.imageUpload1 = this.imageCatogoryTemp;
          // }

          this.userFlow.setB2BUserFlowDetails(
            "markup",
            JSON.stringify(data.data.markup)
          );

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
            const ID = this.userFlow.getB2BUserFlowDetails().id;
            this.router.navigate(["b2b/home"], { queryParams: { id: ID } });
          }, 2000);
          this.toastr.error("Country Not Found");
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
    imageUpload: Boolean
  ) {
    this.preloaderService.showPreloader(true);

    this.userFlow.setB2BUserFlowDetails("country", this.selectedCountrytype);
    this.userFlow.setB2BUserFlowDetails(
      "purpose",
      this.purposeChooseForm.get("purposeSelected").value
    );
    this.userFlow.setB2BUserFlowDetails("quoteId", quoteId);
    this.userFlow.setB2BUserFlowDetails("category", category);
    this.userFlow.setB2BUserFlowDetails(
      "minTravelDate",
      JSON.stringify(minTravelDate)
    );

    this.userFlow.setB2BUserFlowDetails("basePrice", JSON.stringify(basePrice));
    this.userFlow.setB2BUserFlowDetails(
      "serviceTax",
      JSON.stringify(serviceTax)
    );
    this.userFlow.setB2BUserFlowDetails("stayPeriod", stayPeriod);
    this.userFlow.setB2BUserFlowDetails(
      "imageUpload",
      JSON.stringify(imageUpload)
    );
    this.userFlow.setB2BUserFlowDetails(
      "imageUploads",
      JSON.stringify(this.imageUpload1)
    );

    this.reqService.verifyQuotation(quoteId).subscribe((data: any) => {
      if (data.code == "0") {
        this.router.navigate(["b2b/b2b-add-traveller"]);
      } else {
        this.preloaderService.showPreloader(false);
        this.toastr.error("" + data.message);
      }
    });
  }

  onClickRequrements(i, j, item) {
    if (
      this.showRequirementsDetailArr[i] == true &&
      this.selectedDataArr[i].fieldName == this.mainArr[i][j].fieldName
    ) {
      this.showRequirementsDetailArr[i] = false;
    } else if (
      this.selectedDataArr[i].fieldName == this.mainArr[i][j].fieldName &&
      this.showRequirementsDetailArr[i] == false
    ) {
      this.showRequirementsDetailArr[i] = true;
    } else {
      this.showRequirementsDetailArr[i] = true;
    }

    this.selectedDataArr[i] = this.mainArr[i][j];
  }

  purposeChanged() {
    var purpose = this.purposeChooseForm.get("purposeSelected").value;
    var country = this.selectedCountrytype;
    window.history.replaceState(
      "",
      "",
      "visa-requirement/" + country + "/" + purpose
    );
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

  onClickRequrementsMobile(i, j, item) {
    if (
      this.mobileShowRequirementsDetailArr[i] == true &&
      this.mobileSelectedDataArr[i].fieldName ==
      this.mobileMainArr[i][j].fieldName
    ) {
      this.mobileShowRequirementsDetailArr[i] = false;
    } else if (
      this.mobileSelectedDataArr[i].fieldName ==
      this.mobileMainArr[i][j].fieldName
    ) {
      this.mobileShowRequirementsDetailArr[i] = true;
    } else {
      this.mobileShowRequirementsDetailArr[i] = true;
    }

    this.mobileSelectedDataArr[i] = this.mobileMainArr[i][j];
  }

  ngOnInit() {
    this.titleService.setTitle(
      "Apply For " + this.selectedCountrytype + " Visa Online"
    );
    this.meta.addTags([
      { name: "keywords", content: "" },
      {
        name: "description",
        content: "",
      },
    ]);
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
