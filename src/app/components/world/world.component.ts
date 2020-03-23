import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";

@Component({
  selector: "app-world",
  templateUrl: "./world.component.html",
  styleUrls: ["./world.component.css"],
  animations: [
    trigger("flipState", [
      state(
        "active",
        style({
          transform: "rotateX(360deg)"
        })
      ),
      state(
        "inactive",
        style({
          transform: "rotateX(0)"
        })
      ),
      transition("active => inactive", animate("500ms ease-out")),
      transition("inactive => active", animate("500ms ease-in"))
    ])
  ]
})
export class WorldComponent implements OnInit {
  exploreWorld: string = "simpleRotate";
  generatePosition: number;
  generateLeftPosition: number;
  generateTopPosition: number;

  flip: string = "inactive";

  destinationTitle1: string;
  destinationContent1: string;

  destinationTitle2: string;
  destinationContent2: string;

  destinationTitle3: string;
  destinationContent3: string;

  destinationTitle4: string;
  destinationContent4: string;

  destinationCountry: string;

  worldChart: any;

  destinationQuery: Array<any> = [
    {
      destinationCountry: "Iceland",
      top1366: 164,
      left1366: 665,
      position1366: 1436,

      top786: 278,
      left786: 634,
      position786: 1200,

      top360: 278,
      left360: 634,
      position360: 1200,

      top414: 278,
      left414: 634,
      position414: 956,

      top375: 44,
      left375: 157,
      position375: 1284,

      top320: 278,
      left320: 634,
      position320: 1200,

      top393: 278,
      left393: 634,
      position393: 1200,

      top1440: 222,
      left1440: 699,
      position1440: 629,

      destinationInfo: [
        {
          title1: "Geothermal Pools",
          content1:
            "Iceland’s modern-day fix to a relaxing afternoon at the steam bath - the geothermally heated pools! These pools have been naturally heated for centuries; a major source of water heating throughout the country. Coupled with their scenic, icy, mountain-clad location, the pools are sure to excite! For more water-themed adventures, make sure to check out Iceland’s mud pools, hot springs, glaciers and geysers and waterfalls while you’re here too."
        },
        {
          title2: "It’s a Festival Year-Round!",
          content2:
            "Where there’s a good enough reason to get together, the folks of Iceland shall congregate! This country loves its festivities: with all kinds of music, art, literature, and film festivals - kids festivals, among others - happening all through the year, you will never get bored here. Reykjavik’s art festival is a must-attend, but don’t worry if you miss it - there’s plenty where that came from!"
        },
        {
          title3: "Ice Climbing",
          content3:
            "One of the best places to view this beautiful natural phenomenon is right here in Iceland, between the months of September to April. Since the country is a hotspot for experiencing this amazing natural miracle, excursion leaders here are highly experienced. You might have to “hunt” them down with your leader, which makes it all the more entertaining, and rewarding when you finally see them!"
        },
        {
          title4: "Whale Watching",
          content4:
            "Considering Iceland is so close to the North Pole, its waters are just cold enough to host a diverse population of impressive whales - among other mammals. During the summers, these coasts are feeding grounds for the majestic creatures, and you can witness them in their natural habitat while they’re at it! It’s cruelty-free, and a popular tourist activity that we reckon is worth it."
        }
      ]
    },
    {
      destinationCountry: "Vietnam",
      top1366: 282,
      left1366: 610,
      position1366: 1212,

      top786: 278,
      left786: 634,
      position786: 1200,

      top360: 278,
      left360: 634,
      position360: 1200,

      top414: 278,
      left414: 634,
      position414: 811,

      top375: 136,
      left375: 165,
      position375: 1200,

      top320: 278,
      left320: 634,
      position320: 1200,

      top393: 278,
      left393: 634,
      position393: 1200,

      top1440: 346,
      left1440: 655,
      position1440: 1212,

      destinationInfo: [
        {
          title1: "Hang Son Doong",
          content1:
            "The World’s largest cave lies right here in Vietnam! Place your adventurous heart on you sleeve, because options to stay the night and camp here exist as well. It lies in a national park, so there’s more flora for you to explore on the outside – there’s even a river running through this 3-million-year-old cave!"
        },
        {
          title2: "Da Lat",
          content2:
            "One of the more famous holiday destinations, this part of the central highlands hosts the Elephant and Pongour falls, Valley of Love, and Da Lat flower gardens. Its colourful sunsets and well-preserved French villas surround you with a vintage glow that’s perfect for Instagram- worthy pictures and a rejuvenating time!"
        },
        {
          title3: "Ha Giang",
          content3:
            "One of the most beautiful places to visit in Vietnam, Han Giang is home to many vivid rice terraces and shades of green you never thought existed. Visit here before it becomes a bustling tourist spot! If you are really a fan of nature, you could check out the impressive Ban Gioc waterfall as well, and trust us, you won’t be disappointed."
        },
        {
          title4: "Ho Chi Minh, Hanoi and Danang",
          content4:
            "If you come to Vietnam for a bustling city experience, these three cities are the place for you. They have everything from quaint single-story buildings to bustling nightlife, with a peppering of Vietnamese culture and heritage at every glance! There are small tourist spots close to each city that one could consider must-sees, like the Marble Mountains that are 7km away from Danang – in case you wanted to tick anything off your bucket list while you’re here."
        }
      ]
    },
    {
      destinationCountry: "Singapore",
      top1366: 320,
      left1366: 624,
      position1366: 1247,

      top786: 278,
      left786: 634,
      position786: 1200,

      top360: 278,
      left360: 634,
      position360: 1200,

      top414: 278,
      left414: 634,
      position414: 818,

      top375: 143,
      left375: 155,
      position375: 1200,

      top320: 278,
      left320: 634,
      position320: 1200,

      top393: 278,
      left393: 634,
      position393: 1200,
  
      top1440: 370,
      left1440: 668,
      position1440: 1247,

      destinationInfo: [
        {
          title1: "Water Sports Galore",
          content1:
            "Considering the country is surrounded by water, why settle for a mundane dip in the ocean? Singapore’s Sports Hub gives you access to all 35 hectares of the Kallang basin instead! Scroll through their selections - from doughnut boats to kayaks - to find the boat of your choice, and get ready to splash around!"
        },
        {
          title2: "Kiztopia",
          content2:
            "Ever heard of an 18-zone playground with an obstacle course,ninja warrior setup and claw games? Well, Singapore’s here to show you how it’s done. Kiztopia is their newest launch, and is mainly targeted at, surprise, the kids - but adults are equally entertained. A fun family bonding experience where you fall and laugh, instead of cry - the soft mats make sure of it!"
        },
        {
          title3: "HD Stargazing",
          content3:
            "Woodlands Galaxy Community Club is where the otherworldly experiences take place - it may not be on the tourism list, but it works well for a peaceful date night or a calm evening spent alone - with volunteers to assist at every hiccup. An industry-grade telescope that lets you see real constellations in HD, and it’s open to the public for just a dollar? A real snatch, if you ask us. For more extraterrestrial experiences, make sure to check out the ArtScience Museum’s exhibits as well!"
        },
        {
          title4: "Jewel Changi Airport",
          content4:
            "Fancy seeing a rain vortex 40 metres above you? Or maybe you would like to stroll around it (and through a ‘forest valley’) instead? You can do all that, and more - there are even sky nets for you and your family to bounce away on! Hedge mazes, mirror mazes… It seems Singapore’s airport is, in itself, a mini-tourist spot."
        }
      ]
    },
    {
      destinationCountry: "New Zealand",
      top1366: 443,
      left1366: 653,
      position1366: 1200,

      top786: 278,
      left786: 634,
      position786: 1200,
      
      top360: 278,
      left360: 634,
      position360: 1200,

      top414: 278,
      left414: 634,
      position414: 794,

      top375: 199,
      left375: 145,
      position375: 1143,

      top320: 278,
      left320: 634,
      position320: 1200,

      top393: 278,
      left393: 634,
      position393: 1200,

      top1440: 511,
      left1440: 684,
      position1440: 1200,
      
      destinationInfo: [
        {
          title1: "Adventure Sport Galore!",
          content1:
            "Ever dreamed of being able to bungee jump, sky-dive, water-raft, zip-line, do some canyoning AND rappelling all in one trip?? Well, New Zealand is the place for you. It’s known for its amazing quality and range of adventure sports - all you need to do is get that plane ticket (hint: we can help you with visas too ;) ) and take that first step!"
        },
        {
          title2: "Experience the Māori way of life",
          content2:
            "The Māori culture is the aboriginal culture of the people of New Zealand. Discover their traditions, indulge in their intricate arts and language, and maybe get a Tā Moko (traditional tattoo) while you’re there - there are even experienced tour guides to make sure you enjoy your meetings with these welcoming folk!"
        },
        {
          title3: "Wai-o-Tapu, Rotorua",
          content3:
            "Bubbling mud pools, cool champagne pools… And a traditional Hangi feast after? Fondly called “Thermal Wonderland”, this area has many hot springs to explore and try out - it’s on the southern foot of the Okataina Volcano Centre, so you know geothermal is the way to go!"
        },
        {
          title4: "Wildlife Wonderland",
          content4:
            "New Zealand hosts such a diverse variety of flora and fauna that it’s hard to miss! This country hosts some very unique species, too - endangered Yellow-Eyed Penguins, rare Hooker Sea-Lions, the elegant Albatross and the grandiose Fur Seal. You may not be able to come into contact with these beauties anywhere else, so make sure you get a glimpse before you leave."
        }
      ]
    },
    {
      destinationCountry: "Taiwan",
      top1366: 278,
      left1366: 634,
      position1366: 1200,

      top786: 278,
      left786: 634,
      position786: 1200,

      top360: 234,
      left360: 634,
      position360: 1200,

      top414: 278,
      left414: 634,
      position414: 808,

      top375: 132,
      left375: 184,
      position375: 1200,

      top320: 278,
      left320: 634,
      position320: 1200,

      top393: 278,
      left393: 634,
      position393: 1200,

      top1440: 342,
      left1440: 678,
      position1440: 1200,


      destinationInfo: [
        {
          title1: "The Landscape",
          content1:
            "Taiwan’s landscape changes dramatically throughout the country - for its limited size, Taiwan boasts centralised summits and peaks, lagoons, hot springs, cliffs, valleys, and even pristine Kenting coasts to the south. Greenery is something you will be surrounded by at every corner, and as much as there is, we still couldn’t get enough!"
        },
        {
          title2: "Rainbow Village",
          content2:
            "This artsy village is situated in Taichung, a central area in Taiwan. What’s so special about it? Art not only lies inside its buildings, but lines the walls and streets too! The Huang Yung Fu Huang, local Chinese artists, took to the task - making this city a dreamland for anyone looking for a happy-go-lucky, yet tranquil touch to their lives."
        },
        {
          title3: "Ha Giang",
          content3:
            "Every night market in taiwan boasts a different specialty - which is why all of them are so unique, and set apart from each other! Whether it’s mango shaved ice, or scallion pancakes - vegetarian or non-veg, these markets have something in store for all. We hear their stinky tofu is a delicacy: the stinkier it is, the worse for your nose - but the better it tastes!"
        },
        {
          title4: "Dragon Boat and Lantern Festivals",
          content4:
            "Taiwan hosts a number of local festivals, including these two. Around Jan/Feb, thousands of lanterns are released into the air near Pingxi: a picturesque sight of flickering lights illuminating the air. In June, the locals participate in (dragon) boat races across their rivers, and even though you’re not riding in one, the adrenaline in the air is palpable! The Matsu Pilgrimage festival, and the International Balloon Fiesta are also high on the festival list, in case you would like to check more out!"
        }
      ]
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  findPlace() {
    console.log("find you destination");
    setTimeout(() => {
      this.exploreWorld = "reachYourDestination";
      this.flip = this.flip == "inactive" ? "active" : "inactive";
    }, 1000);
    this.exploreWorld = "findingDestination";
    this.worldChart = this.destinationQuery[
      Math.floor(Math.random() * this.destinationQuery.length)
    ];
    this.destinationTitle1 = this.worldChart.destinationInfo[0].title1;
    this.destinationContent1 = this.worldChart.destinationInfo[0].content1;

    this.destinationTitle2 = this.worldChart.destinationInfo[1].title2;
    this.destinationContent2 = this.worldChart.destinationInfo[1].content2;

    this.destinationTitle3 = this.worldChart.destinationInfo[2].title3;
    this.destinationContent3 = this.worldChart.destinationInfo[2].content3;

    this.destinationTitle4 = this.worldChart.destinationInfo[3].title4;
    this.destinationContent4 = this.worldChart.destinationInfo[3].content4;

    this.destinationCountry = this.worldChart.destinationCountry;

    console.log(this.worldChart);
  }

  randomPosition() {
    if (window.innerWidth == 1366) {
      this.generatePosition = this.worldChart.position1366;
    } else if (window.innerWidth == 360) {
      this.generatePosition = this.worldChart.position360;
    } else if (window.innerWidth == 768) {
      this.generatePosition = this.worldChart.position768;
    } else if (window.innerWidth == 414) {
      this.generatePosition = this.worldChart.position414;
    } else if (window.innerWidth == 320) {
      this.generatePosition = this.worldChart.position320;
    } else if (window.innerWidth == 375) {
      this.generatePosition = this.worldChart.position375;
    } else if (window.innerWidth == 393) {
      this.generatePosition = this.worldChart.position393;
    } else if (window.innerWidth == 1440) {
      this.generatePosition = this.worldChart.position1440;
    }
    console.log(this.generatePosition);
    return this.generatePosition + "px";
  }

  randomLeftPosition() {
    if (window.innerWidth == 1366) {
      this.generateLeftPosition = this.worldChart.left1366;
    } else if (window.innerWidth == 360) {
      this.generateLeftPosition = this.worldChart.left360;
    } else if (window.innerWidth == 768) {
      this.generateLeftPosition = this.worldChart.left768;
    } else if (window.innerWidth == 414) {
      this.generateLeftPosition = this.worldChart.left414;
    } else if (window.innerWidth == 320) {
      this.generateLeftPosition = this.worldChart.left320;
    } else if (window.innerWidth == 375) {
      this.generateLeftPosition = this.worldChart.left375;
    } else if (window.innerWidth == 393) {
      this.generateLeftPosition = this.worldChart.left393;
    } else if (window.innerWidth == 1440) {
      this.generateLeftPosition = this.worldChart.left1440;
    }
    console.log(this.generateLeftPosition);
    return this.generateLeftPosition + "px";
  }

  randomTopPosition() {
    if (window.innerWidth == 1366) {
      this.generateTopPosition = this.worldChart.top1366;
    } else if (window.innerWidth == 360) {
      this.generateTopPosition = this.worldChart.top360;
    } else if (window.innerWidth == 768) {
      this.generateTopPosition = this.worldChart.top768;
    } else if (window.innerWidth == 414) {
      this.generateTopPosition = this.worldChart.top414;
    } else if (window.innerWidth == 320) {
      this.generateTopPosition = this.worldChart.top320;
    } else if (window.innerWidth == 375) {
      this.generateTopPosition = this.worldChart.top375;
    } else if (window.innerWidth == 393) {
      this.generateTopPosition = this.worldChart.top393;
    } else if (window.innerWidth == 1440) {
      this.generateTopPosition = this.worldChart.top1440;
    }
    console.log(this.generateTopPosition);
    return this.generateTopPosition + "px";
  }
}
