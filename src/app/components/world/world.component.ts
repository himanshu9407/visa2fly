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
    ]),
    trigger("flipWorld", [
      state(
        "active",
        style({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        })
      ),
      state(
        "inactive",
        style({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        })
      ),
      transition("active => inactive", animate("1000ms ease-out")),
      transition("inactive => active", animate("1000ms ease-in"))
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

    // Iceland
    {
      destinationCountry: "Iceland",
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

    // Vietnam
    {
      destinationCountry: "Vietnam",
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

    // Singapore
    {
      destinationCountry: "Singapore",
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

    // New Zealand
    {
      destinationCountry: "New Zealand",
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

    // Taiwan
    {
      destinationCountry: "Taiwan",
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
    },

    // Sweden
    {
      destinationCountry: "Sweden",
      destinationInfo: [
        {
          title1: "Midsommar and Saint Lucia",
          content1:
            "You can see the whole country in wreaths, candles, and beautiful white gowns on Saint Lucia’s day - not to mention the amazing traditional ginger biscuits, baked goods and lussekatter (saffron bread). Midsummer’s day is celebrated by rising and dancing around a maypole: with song, food, colourful clothes and greenery everywhere. It is really a sight to behold!"
        },
        {
          title2: "The Ice Hotel",
          content2:
            "In Kiruna, Sweden, you will find one of the most peculiar hotels in the world. With a genius design, the Ice Hotel is shaped like an igloo from the outside, whilst its interiors are all made of - you guessed it - ice. We don’t know how they managed it, but what we do know is that it really is a once-in-a-lifetime experience to stay here for a night, so pack your bags and get on that flight!"
        },
        {
          title3: "Lapland and Kalmar",
          content3:
            "Ever wanted to live out your Frozen (or Frozen 2!) dreams? Well, with a thick, velvety layer of snow on virtually everything here, this calm,pristine white landscape is just the place for those dreams! If you want more of the Rennaisance-y feel of Frozen’s village, Kalmar is filled to the brim with just that - it’s really no wonder the movie was Swedish, what with all the vintage beauty there is here."
        },
        {
          title4: "Gothenburg",
          content4:
            "This is Sweden’s second-largest city, and is a paradox in itself. The interior holds promise of a wild nightlife and bustling streets, while the exterior is full of lush, calming natural landscape and nature. It really does give you your money’s worth, and then some!"
        }
      ]
    },

    // Canada
    {
      destinationCountry: "Canada",
      destinationInfo: [
        {
          title1: "Allure of Nature",
          content1:
            "Canada is a pretty large country, and to give them due credit, they really keep their nature a priority. From Grizzly Bear sanctuaries in British Columbia, to Alberta’s dark, starry skies, to the culturally rich and beautifully remote Haida Gwaii region, Canada really has a lot to explore!"
        },
        {
          title2: "National Parks Galore",
          content2:
            "As we’ve stated before, Canada really prioritizes their nature - to the extent that they have 45 national parks! Not one, or two, but over 45 places to hike, relax and take in all of the beautiful wilderness - this really is an opportunity you can’t pass up!"
        },
        {
          title3: "The Arctic Experience",
          content3:
            "Canada is said to be one of the best places to whale-watch, with the perfect cold climate for whales to inhabit - 22 different species of them, to be precise. You can even spot polar bears and belugas here - a true Arctic experience!"
        },
        {
          title4: "One of The World’s Friendliest Countries",
          content4:
            "Canada is ranked one of the World’s friendliest countries, meaning that your stay here is guaranteed to be a pleasant one! Many travellers rate their friendliness, cleanliness and open-mindedness quite highly, which is a plus for anyone planning to tour the nation."
        }
      ]
    },

    // Italy
    {
      destinationCountry: "Italy",
      destinationInfo: [
        {
          title1: "Amazing Architecture",
          content1:
            "Italy is home to many of the continent’s most famous architectural wonders, some of which include the Colosseum, the Leaning Tower of Pisa, the Pantheon and St. Mark’s Basilica. It’s no surprise that these majestic monuments all lie here in the heart of Italy, considering Da Vinci, Michelangelo and Caravaggio all hailed from here!"
        },
        {
          title2: "Vatican City",
          content2:
            "Considered the world’s smallest country (but informally still referred to as part of Italy), Vatican City is home to both The Pope, as well as some of the globe’s most priceless pieces of artwork. Consider it the opportunity of a lifetime to visit here!"
        },
        {
          title3: "Capri",
          content3:
            "A conglomeration of intense blue waters and high, jagged cliffs - the Isle of Capri is a picturesque meeting of the two. It is also teeming with green pines and tropical plants, with a good view assured from almost everywhere on this island. They host walking tours, as well as open several gardens and villas to tourists, so what are you waiting for?"
        },
        {
          title4: "Tuscany",
          content4:
            "Tuscany, with its capital in Florence city, hosts a number of interesting experiences. From being wined and dined in its many vineyards, to exploring its rich Renaissance history and culture, guaranteed that this vibrant landscape will leave you satisfied!"
        }
      ]
    },

    // Germany
    {
      destinationCountry: "Germany",
      destinationInfo: [
        {
          title1: "Knights And Castles",
          content1:
            "Ever thought of living out your fairy-tale dreams? Well, Germany’s the place for you! The country’s rich history involves not just knights and castles, but lore of love, war and might. There are so many Medieval old towns to check out while you’re here, and many offer exciting interactive experiences (coupled with a lot of cool stories!) to keep you entertained."
        },
        {
          title2: "Travel to the Stone Age and Back",
          content2:
            "Germany’s museums have a culture of their own - Berlin’s Museum Island (a UNESCO World Heritage Site), the Alexandrowka Museum, and the Berlin Wall Memorial are some of the must- sees while you’re here: they give you a wonderful first glance into the depths of Germany’s evolution!"
        },
        {
          title3: "Opera Houses or EDM",
          content3:
            "Whatever your taste in music is, Germany has it all! It’s been famous for its western classical music, with famous composers like Beethoven, Bach and Handel being from here, and a variety of opera houses still very much in function. Apart from the classics, we hear that their music festivals - Time Warp DE, Hurricane Festival, and World Club Dome, to name a few - are one of the best rave scenes in the world."
        },
        {
          title4: "Miniature Wonderland, Hamburg",
          content4:
            "This is the biggest model railway in the world - and while that may seem like not such a big deal, you’ve got to experience it to believe it! Spanning 2,300 square metres, this attraction takes you through many different countries, while you sit back and enjoy the world’s view - literally!"
        }
      ]
    },

    // South Korea
    {
      destinationCountry: "South Korea",
      destinationInfo: [
        {
          title1: "One of The Biggest Economies in the World",
          content1:
            "Korea has been expanding at a rapid rate, especially in its economic growth. Why is this a reason to visit? Because this economy rapidly churns out amazing new technology, fashion, beauty products, nightlife… Anything able to be bought internationally, really: Shopaholics, ahoy!"
        },
        {
          title2: "Jeju",
          content2:
            "The capital of Jejudo, Jeju is home to interesting beaches, intense volcanic planes and amazing underground caves. Halla Mountain and “Sunrise Peak” are also notably famous - and why not? With its beautiful landscape, how can Jeju’s sunrise be anything less than spectacular?"
        },
        {
          title3: "Hallyu: The K-Wave!",
          content3:
            "The world has been increasingly jumping on the K-wave (Korean wave) as the days go by - from Korean dramas, films (Proof: “Parasite” even won an Oscar!) and music (K-Pop!), this country churns out hits by the dozen. Walking through the streets of Seoul is paradise for anyone who’s even remotely interested in this fandom!"
        },
        {
          title4: "Skincare Wonderland",
          content4:
            "Korean beauty standards have been infamous for being highly perfectionist. And why not? With a booming self-care industry to facilitate their 13-step skincare routines and flawless, blemish- free faces, we’d want to try them out too!"
        }
      ]
    },

    // Philippines
    {
      destinationCountry: "Philippines",
      destinationInfo: [
        {
          title1: "Palawan",
          content1:
            "Many people agree that if you only have time to visit one place whilst here, it would be Palawan. Why? Beautiful blue beaches and a cove at Puerto Princesa’s underground river will make you feel like your life is a movie scene!"
        },
        {
          title2: "Cebu",
          content2:
            "Nicknamed the “Queen City of The South”, Cebu is full of rich old-time Mexican culture fused with Filipino essence - which can be observed at Basilica Minore de Santo Niño, and the city’s Sinulog Festival. It’s also extremely easy to travel around, and quite accessible too!"
        },
        {
          title3: "Boracay",
          content3:
            "Whether or not you’ve heard of other Filipino attractions, you must have heard about Boracay’s intense party scene. It’s famous White Beach is lined with many resorts, bars, restaurants - and even a shopping mall, to get back spectacular souvenirs: Apart from the amazing memories, of course!"
        },
        {
          title4: "Beaches, and Witches!",
          content4:
            "Siquijor is an island known for its 200-year-old coral churches and occult history - but apart from this, they boast vivid waterfalls and serene lagoons as well. One can engage in some white sand swimming and snorkelling without having to worry about massive crowds - and maybe even brew a love potion when you’re done!"
        }
      ]
    },

    // Brazil
    {
      destinationCountry: "Brazil",
      destinationInfo: [
        {
          title1: "Rio De Janeiro",
          content1:
            "Surrounded by towering mountains, but encompassed by vibrant beaches and coasts as well… This city earns the title of Cidade Maravilhosa, or ‘The Marvelous City’. Crazy-amazing Latino beats and energy is what this city - and its festivals and nightlife - runs on! You may even want to try their hang gliding and rock climbing whilst here, you definitely won’t be disappointed."
        },
        {
          title2: "Fernando de Noronha",
          content2:
            "An archipelago of 21 islands of the northeast coast, this relatively less-populated (only 3500 people in total) and “hidden” tourist attraction will give you all the time to connect to nature, and make sure you’re one with all the sea turtles you snorkel with!"
        },
        {
          title3: "Swimming in Sand Dunes!",
          content3:
            "We didn’t think these words went together either - but apparently the folks at LençóisMaranhenses National Park disagree! During the wet season, sand dunes here are turned into lagoons by the heavy rains. Include the Brazilian heaty climate, and you’ve got yourself into one of the weirdest natural attractions in the world."
        },
        {
          title4: "Salvador",
          content4:
            "A fusion of Afro-Brazilian culture, this city is home to picturesque multi-coloured buildings that host impressive Capoeira martial artists , cobblestone alleys where Olodum drummers play their beats, and an active - not to mention one-of-a kind - festival scene!"
        }
      ]
    },

    // Peru
    {
      destinationCountry: "Peru",
      destinationInfo: [
        {
          title1: "Lima",
          content1:
            "Lima is a multifaceted city, and stands up to its title as “The City of The Kings”. This capital city is home to the country’s rich indigenous history - present in its impressive museums. Miraflores, a neighbourhood here, is also arguably the best place to witness the country’s beautiful sunset -amidst its Spanish-inspired flora and coastal view."
        },
        {
          title2: "The Rainbow Mountain",
          content2:
            "Originally known as Vinicunca, this mountain is located in the heart of the famous Andes range. It is 5,200 metres above sea level, and all of it is covered in rich, earthy tones of reds, browns and yellows, and other shades of turquoise, lavender and gold - these colours created through mineral sediments are what set it apart from pretty much any mountain you’ve ever seen!"
        },
        {
          title3: "Machu Picchu",
          content3:
            "One of the main reasons why people visit Peru, Machu Picchu is so famous that you need to book your tickets in advance to your trip to gain entry - they use these tickets to regulate the number of visitors, so that your experience remains free of overcrowding and doesn’t disappoint. Book early, so that you experience its true beauty and serenity firsthand - and maybe spot some llamas on the way, too!"
        },
        {
          title4: "The Amazon Rainforest",
          content4:
            "Does this place even need an introduction? The Amazon rainforest is so vast and untouched that you would need canoes to navigate its many waterways, whilst interacting with probably the largest variety of flora and fauna - unfiltered, and up-close!"
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
}
