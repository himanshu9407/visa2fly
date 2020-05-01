import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import {
  trigger,
  state,
  transition,
  animate,
  style,
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
          transform: "rotateX(360deg)",
        })
      ),
      state(
        "inactive",
        style({
          transform: "rotateX(0)",
        })
      ),
      transition("active => inactive", animate("500ms ease-out")),
      transition("inactive => active", animate("500ms ease-in")),
    ]),
    trigger("flipWorld", [
      state(
        "active",
        style({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        })
      ),
      state(
        "inactive",
        style({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        })
      ),
      transition("active => inactive", animate("1000ms ease-out")),
      transition("inactive => active", animate("1000ms ease-in")),
    ]),
  ],
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

  index: number = 0;

  destinationQuery: Array<any> = [
    // Iceland
    {
      destinationCountry: "Iceland",
      destinationInfo: [
        {
          title1: "Geothermal Pools",
          image1: "Geothermal-Pools",
          content1:
            "Iceland’s modern-day fix to a relaxing afternoon at the steam bath - the geothermally heated pools! These pools have been naturally heated for centuries; a major source of water heating throughout the country. Coupled with their scenic, icy, mountain-clad location, the pools are sure to excite! For more water-themed adventures, make sure to check out Iceland’s mud pools, hot springs, glaciers and geysers and waterfalls while you’re here too.",
        },
        {
          title2: "It’s a Festival Year-Round!",
          image2: "Its-a-Festival-Year-Round",
          content2:
            "Where there’s a good enough reason to get together, the folks of Iceland shall congregate! This country loves its festivities: with all kinds of music, art, literature, and film festivals - kids festivals, among others - happening all through the year, you will never get bored here. Reykjavik’s art festival is a must-attend, but don’t worry if you miss it - there’s plenty where that came from!",
        },
        {
          title3: "Ice Climbing",
          image3: "Ice-Climbing",
          content3:
            "One of the best places to view this beautiful natural phenomenon is right here in Iceland, between the months of September to April. Since the country is a hotspot for experiencing this amazing natural miracle, excursion leaders here are highly experienced. You might have to “hunt” them down with your leader, which makes it all the more entertaining, and rewarding when you finally see them!",
        },
        {
          title4: "Whale Watching",
          image4: "Whale-Watching",
          content4:
            "Considering Iceland is so close to the North Pole, its waters are just cold enough to host a diverse population of impressive whales - among other mammals. During the summers, these coasts are feeding grounds for the majestic creatures, and you can witness them in their natural habitat while they’re at it! It’s cruelty-free, and a popular tourist activity that we reckon is worth it.",
        },
      ],
    },

    // Vietnam
    {
      destinationCountry: "Vietnam",
      destinationInfo: [
        {
          title1: "Hang Son Doong",
          image1: "Hang-Son-Doong",
          content1:
            "The World’s largest cave lies right here in Vietnam! Place your adventurous heart on you sleeve, because options to stay the night and camp here exist as well. It lies in a national park, so there’s more flora for you to explore on the outside – there’s even a river running through this 3-million-year-old cave!",
        },
        {
          title2: "Da Lat",
          image2: "Da-Lat",
          content2:
            "One of the more famous holiday destinations, this part of the central highlands hosts the Elephant and Pongour falls, Valley of Love, and Da Lat flower gardens. Its colourful sunsets and well-preserved French villas surround you with a vintage glow that’s perfect for Instagram- worthy pictures and a rejuvenating time!",
        },
        {
          title3: "Ha Giang",
          image3: "Ha-Giang",
          content3:
            "One of the most beautiful places to visit in Vietnam, Han Giang is home to many vivid rice terraces and shades of green you never thought existed. Visit here before it becomes a bustling tourist spot! If you are really a fan of nature, you could check out the impressive Ban Gioc waterfall as well, and trust us, you won’t be disappointed.",
        },
        {
          title4: "Ho Chi Minh, Hanoi and Danang",
          image4: "Ho-Chi-Minh-Hanoi-and-Danang",
          content4:
            "If you come to Vietnam for a bustling city experience, these three cities are the place for you. They have everything from quaint single-story buildings to bustling nightlife, with a peppering of Vietnamese culture and heritage at every glance! There are small tourist spots close to each city that one could consider must-sees, like the Marble Mountains that are 7km away from Danang – in case you wanted to tick anything off your bucket list while you’re here.",
        },
      ],
    },

    // Singapore
    {
      destinationCountry: "Singapore",
      destinationInfo: [
        {
          title1: "Water Sports Galore",
          image1: "Water-Sports-Galore",
          content1:
            "Considering the country is surrounded by water, why settle for a mundane dip in the ocean? Singapore’s Sports Hub gives you access to all 35 hectares of the Kallang basin instead! Scroll through their selections - from doughnut boats to kayaks - to find the boat of your choice, and get ready to splash around!",
        },
        {
          title2: "Kiztopia",
          image2: "Kiztopia",
          content2:
            "Ever heard of an 18-zone playground with an obstacle course,ninja warrior setup and claw games? Well, Singapore’s here to show you how it’s done. Kiztopia is their newest launch, and is mainly targeted at, surprise, the kids - but adults are equally entertained. A fun family bonding experience where you fall and laugh, instead of cry - the soft mats make sure of it!",
        },
        {
          title3: "HD Stargazing",
          image3: "HD-Stargazing",
          content3:
            "Woodlands Galaxy Community Club is where the otherworldly experiences take place - it may not be on the tourism list, but it works well for a peaceful date night or a calm evening spent alone - with volunteers to assist at every hiccup. An industry-grade telescope that lets you see real constellations in HD, and it’s open to the public for just a dollar? A real snatch, if you ask us. For more extraterrestrial experiences, make sure to check out the ArtScience Museum’s exhibits as well!",
        },
        {
          title4: "Jewel Changi Airport",
          image4: "Jewel-Changi-Airport",
          content4:
            "Fancy seeing a rain vortex 40 metres above you? Or maybe you would like to stroll around it (and through a ‘forest valley’) instead? You can do all that, and more - there are even sky nets for you and your family to bounce away on! Hedge mazes, mirror mazes… It seems Singapore’s airport is, in itself, a mini-tourist spot.",
        },
      ],
    },

    // New Zealand
    {
      destinationCountry: "New Zealand",
      destinationInfo: [
        {
          title1: "Adventure Sport Galore!",
          image1: "Adventure-Sport-Galore",
          content1:
            "Ever dreamed of being able to bungee jump, sky-dive, water-raft, zip-line, do some canyoning AND rappelling all in one trip?? Well, New Zealand is the place for you. It’s known for its amazing quality and range of adventure sports - all you need to do is get that plane ticket (hint: we can help you with visas too ;) ) and take that first step!",
        },
        {
          title2: "Experience the Māori way of life",
          image2: "Experience-the-Māori-way-of-life",
          content2:
            "The Māori culture is the aboriginal culture of the people of New Zealand. Discover their traditions, indulge in their intricate arts and language, and maybe get a Tā Moko (traditional tattoo) while you’re there - there are even experienced tour guides to make sure you enjoy your meetings with these welcoming folk!",
        },
        {
          title3: "Wai-o-Tapu, Rotorua",
          image3: "Wai-o-Tapu-Rotorua",
          content3:
            "Bubbling mud pools, cool champagne pools… And a traditional Hangi feast after? Fondly called “Thermal Wonderland”, this area has many hot springs to explore and try out - it’s on the southern foot of the Okataina Volcano Centre, so you know geothermal is the way to go!",
        },
        {
          title4: "Wildlife Wonderland",
          image4: "Wildlife-Wonderland",
          content4:
            "New Zealand hosts such a diverse variety of flora and fauna that it’s hard to miss! This country hosts some very unique species, too - endangered Yellow-Eyed Penguins, rare Hooker Sea-Lions, the elegant Albatross and the grandiose Fur Seal. You may not be able to come into contact with these beauties anywhere else, so make sure you get a glimpse before you leave.",
        },
      ],
    },

    // Taiwan
    {
      destinationCountry: "Taiwan",
      destinationInfo: [
        {
          title1: "The Landscape",
          image1: "The-Landscape",
          content1:
            "Taiwan’s landscape changes dramatically throughout the country - for its limited size, Taiwan boasts centralised summits and peaks, lagoons, hot springs, cliffs, valleys, and even pristine Kenting coasts to the south. Greenery is something you will be surrounded by at every corner, and as much as there is, we still couldn’t get enough!",
        },
        {
          title2: "Rainbow Village",
          image2: "Rainbow-Village",
          content2:
            "This artsy village is situated in Taichung, a central area in Taiwan. What’s so special about it? Art not only lies inside its buildings, but lines the walls and streets too! The Huang Yung Fu Huang, local Chinese artists, took to the task - making this city a dreamland for anyone looking for a happy-go-lucky, yet tranquil touch to their lives.",
        },
        {
          title3: "Ha Giang",
          image3: "Ha-Giang",
          content3:
            "Every night market in taiwan boasts a different specialty - which is why all of them are so unique, and set apart from each other! Whether it’s mango shaved ice, or scallion pancakes - vegetarian or non-veg, these markets have something in store for all. We hear their stinky tofu is a delicacy: the stinkier it is, the worse for your nose - but the better it tastes!",
        },
        {
          title4: "Dragon Boat and Lantern Festivals",
          image4: "Dragon-Boat-and-Lantern-Festivals",
          content4:
            "Taiwan hosts a number of local festivals, including these two. Around Jan/Feb, thousands of lanterns are released into the air near Pingxi: a picturesque sight of flickering lights illuminating the air. In June, the locals participate in (dragon) boat races across their rivers, and even though you’re not riding in one, the adrenaline in the air is palpable! The Matsu Pilgrimage festival, and the International Balloon Fiesta are also high on the festival list, in case you would like to check more out!",
        },
      ],
    },

    // Sweden
    {
      destinationCountry: "Sweden",
      destinationInfo: [
        {
          title1: "Midsommar and Saint Lucia",
          image1: "Midsommar-and-Saint-Lucia",
          content1:
            "You can see the whole country in wreaths, candles, and beautiful white gowns on Saint Lucia’s day - not to mention the amazing traditional ginger biscuits, baked goods and lussekatter (saffron bread). Midsummer’s day is celebrated by rising and dancing around a maypole: with song, food, colourful clothes and greenery everywhere. It is really a sight to behold!",
        },
        {
          title2: "The Ice Hotel",
          image2: "The-Ice-Hotel",
          content2:
            "In Kiruna, Sweden, you will find one of the most peculiar hotels in the world. With a genius design, the Ice Hotel is shaped like an igloo from the outside, whilst its interiors are all made of - you guessed it - ice. We don’t know how they managed it, but what we do know is that it really is a once-in-a-lifetime experience to stay here for a night, so pack your bags and get on that flight!",
        },
        {
          title3: "Lapland and Kalmar",
          image3: "Lapland-and-Kalmar",
          content3:
            "Ever wanted to live out your Frozen (or Frozen 2!) dreams? Well, with a thick, velvety layer of snow on virtually everything here, this calm,pristine white landscape is just the place for those dreams! If you want more of the Rennaisance-y feel of Frozen’s village, Kalmar is filled to the brim with just that - it’s really no wonder the movie was Swedish, what with all the vintage beauty there is here.",
        },
        {
          title4: "Gothenburg",
          image4: "Gothenburg",
          content4:
            "This is Sweden’s second-largest city, and is a paradox in itself. The interior holds promise of a wild nightlife and bustling streets, while the exterior is full of lush, calming natural landscape and nature. It really does give you your money’s worth, and then some!",
        },
      ],
    },

    // Canada
    {
      destinationCountry: "Canada",
      destinationInfo: [
        {
          title1: "Allure of Nature",
          image1: "Allure-of-Nature",
          content1:
            "Canada is a pretty large country, and to give them due credit, they really keep their nature a priority. From Grizzly Bear sanctuaries in British Columbia, to Alberta’s dark, starry skies, to the culturally rich and beautifully remote Haida Gwaii region, Canada really has a lot to explore!",
        },
        {
          title2: "National Parks Galore",
          image2: "National-Parks-Galore",
          content2:
            "As we’ve stated before, Canada really prioritizes their nature - to the extent that they have 45 national parks! Not one, or two, but over 45 places to hike, relax and take in all of the beautiful wilderness - this really is an opportunity you can’t pass up!",
        },
        {
          title3: "The Arctic Experience",
          image3: "The-Arctic-Experience",
          content3:
            "Canada is said to be one of the best places to whale-watch, with the perfect cold climate for whales to inhabit - 22 different species of them, to be precise. You can even spot polar bears and belugas here - a true Arctic experience!",
        },
        {
          title4: "One of The World’s Friendliest Countries",
          image4: "One-of-The-Worlds-Friendliest-Countries",
          content4:
            "Canada is ranked one of the World’s friendliest countries, meaning that your stay here is guaranteed to be a pleasant one! Many travellers rate their friendliness, cleanliness and open-mindedness quite highly, which is a plus for anyone planning to tour the nation.",
        },
      ],
    },

    // Italy
    {
      destinationCountry: "Italy",
      destinationInfo: [
        {
          title1: "Amazing Architecture",
          image1: "Amazing-Architecture",
          content1:
            "Italy is home to many of the continent’s most famous architectural wonders, some of which include the Colosseum, the Leaning Tower of Pisa, the Pantheon and St. Mark’s Basilica. It’s no surprise that these majestic monuments all lie here in the heart of Italy, considering Da Vinci, Michelangelo and Caravaggio all hailed from here!",
        },
        {
          title2: "Vatican City",
          image2: "Vatican-City",
          content2:
            "Considered the world’s smallest country (but informally still referred to as part of Italy), Vatican City is home to both The Pope, as well as some of the globe’s most priceless pieces of artwork. Consider it the opportunity of a lifetime to visit here!",
        },
        {
          title3: "Capri",
          image3: "Capri",
          content3:
            "A conglomeration of intense blue waters and high, jagged cliffs - the Isle of Capri is a picturesque meeting of the two. It is also teeming with green pines and tropical plants, with a good view assured from almost everywhere on this island. They host walking tours, as well as open several gardens and villas to tourists, so what are you waiting for?",
        },
        {
          title4: "Tuscany",
          image4: "Tuscany",
          content4:
            "Tuscany, with its capital in Florence city, hosts a number of interesting experiences. From being wined and dined in its many vineyards, to exploring its rich Renaissance history and culture, guaranteed that this vibrant landscape will leave you satisfied!",
        },
      ],
    },

    // Germany
    {
      destinationCountry: "Germany",
      destinationInfo: [
        {
          title1: "Knights And Castles",
          image1: "Knights-And-Castles",
          content1:
            "Ever thought of living out your fairy-tale dreams? Well, Germany’s the place for you! The country’s rich history involves not just knights and castles, but lore of love, war and might. There are so many Medieval old towns to check out while you’re here, and many offer exciting interactive experiences (coupled with a lot of cool stories!) to keep you entertained.",
        },
        {
          title2: "Travel to the Stone Age and Back",
          image2: "Travel-to-the-Stone-Age-and-Back",
          content2:
            "Germany’s museums have a culture of their own - Berlin’s Museum Island (a UNESCO World Heritage Site), the Alexandrowka Museum, and the Berlin Wall Memorial are some of the must- sees while you’re here: they give you a wonderful first glance into the depths of Germany’s evolution!",
        },
        {
          title3: "Opera Houses or EDM",
          image3: "Opera-Houses-or-EDM",
          content3:
            "Whatever your taste in music is, Germany has it all! It’s been famous for its western classical music, with famous composers like Beethoven, Bach and Handel being from here, and a variety of opera houses still very much in function. Apart from the classics, we hear that their music festivals - Time Warp DE, Hurricane Festival, and World Club Dome, to name a few - are one of the best rave scenes in the world.",
        },
        {
          title4: "Miniature Wonderland, Hamburg",
          image4: "Miniature-Wonderland-Hamburg",
          content4:
            "This is the biggest model railway in the world - and while that may seem like not such a big deal, you’ve got to experience it to believe it! Spanning 2,300 square metres, this attraction takes you through many different countries, while you sit back and enjoy the world’s view - literally!",
        },
      ],
    },

    // South Korea
    {
      destinationCountry: "South Korea",
      destinationInfo: [
        {
          title1: "One of The Biggest Economies in the World",
          image1: "One-of-The-Biggest-Economies-in-the-World",
          content1:
            "Korea has been expanding at a rapid rate, especially in its economic growth. Why is this a reason to visit? Because this economy rapidly churns out amazing new technology, fashion, beauty products, nightlife… Anything able to be bought internationally, really: Shopaholics, ahoy!",
        },
        {
          title2: "Jeju",
          image2: "Jeju",
          content2:
            "The capital of Jejudo, Jeju is home to interesting beaches, intense volcanic planes and amazing underground caves. Halla Mountain and “Sunrise Peak” are also notably famous - and why not? With its beautiful landscape, how can Jeju’s sunrise be anything less than spectacular?",
        },
        {
          title3: "Hallyu - The K-Wave!",
          image3: "Hallyu-The-K-Wave",
          content3:
            "The world has been increasingly jumping on the K-wave (Korean wave) as the days go by - from Korean dramas, films (Proof: “Parasite” even won an Oscar!) and music (K-Pop!), this country churns out hits by the dozen. Walking through the streets of Seoul is paradise for anyone who’s even remotely interested in this fandom!",
        },
        {
          title4: "Skincare Wonderland",
          image4: "Skincare-Wonderland",
          content4:
            "Korean beauty standards have been infamous for being highly perfectionist. And why not? With a booming self-care industry to facilitate their 13-step skincare routines and flawless, blemish- free faces, we’d want to try them out too!",
        },
      ],
    },

    // Philippines
    {
      destinationCountry: "Philippines",
      destinationInfo: [
        {
          title1: "Palawan",
          image1: "Palawan",
          content1:
            "Many people agree that if you only have time to visit one place whilst here, it would be Palawan. Why? Beautiful blue beaches and a cove at Puerto Princesa’s underground river will make you feel like your life is a movie scene!",
        },
        {
          title2: "Cebu",
          image2: "Cebu",
          content2:
            "Nicknamed the “Queen City of The South”, Cebu is full of rich old-time Mexican culture fused with Filipino essence - which can be observed at Basilica Minore de Santo Niño, and the city’s Sinulog Festival. It’s also extremely easy to travel around, and quite accessible too!",
        },
        {
          title3: "Boracay",
          image3: "Boracay",
          content3:
            "Whether or not you’ve heard of other Filipino attractions, you must have heard about Boracay’s intense party scene. It’s famous White Beach is lined with many resorts, bars, restaurants - and even a shopping mall, to get back spectacular souvenirs: Apart from the amazing memories, of course!",
        },
        {
          title4: "Beaches, and Witches!",
          image4: "Beaches-and-Witches",
          content4:
            "Siquijor is an island known for its 200-year-old coral churches and occult history - but apart from this, they boast vivid waterfalls and serene lagoons as well. One can engage in some white sand swimming and snorkelling without having to worry about massive crowds - and maybe even brew a love potion when you’re done!",
        },
      ],
    },

    // Brazil
    {
      destinationCountry: "Brazil",
      destinationInfo: [
        {
          title1: "Rio De Janeiro",
          image1: "Rio-De-Janeiro",
          content1:
            "Surrounded by towering mountains, but encompassed by vibrant beaches and coasts as well… This city earns the title of Cidade Maravilhosa, or ‘The Marvelous City’. Crazy-amazing Latino beats and energy is what this city - and its festivals and nightlife - runs on! You may even want to try their hang gliding and rock climbing whilst here, you definitely won’t be disappointed.",
        },
        {
          title2: "Fernando de Noronha",
          image2: "Fernando-de-Noronha",
          content2:
            "An archipelago of 21 islands of the northeast coast, this relatively less-populated (only 3500 people in total) and “hidden” tourist attraction will give you all the time to connect to nature, and make sure you’re one with all the sea turtles you snorkel with!",
        },
        {
          title3: "Swimming in Sand Dunes!",
          image3: "Swimming-in-Sand-Dunes",
          content3:
            "We didn’t think these words went together either - but apparently the folks at LençóisMaranhenses National Park disagree! During the wet season, sand dunes here are turned into lagoons by the heavy rains. Include the Brazilian heaty climate, and you’ve got yourself into one of the weirdest natural attractions in the world.",
        },
        {
          title4: "Salvador",
          image4: "Salvador",
          content4:
            "A fusion of Afro-Brazilian culture, this city is home to picturesque multi-coloured buildings that host impressive Capoeira martial artists , cobblestone alleys where Olodum drummers play their beats, and an active - not to mention one-of-a kind - festival scene!",
        },
      ],
    },

    // Peru
    {
      destinationCountry: "Peru",
      destinationInfo: [
        {
          title1: "Lima",
          image1: "Lima",
          content1:
            "Lima is a multifaceted city, and stands up to its title as “The City of The Kings”. This capital city is home to the country’s rich indigenous history - present in its impressive museums. Miraflores, a neighbourhood here, is also arguably the best place to witness the country’s beautiful sunset -amidst its Spanish-inspired flora and coastal view.",
        },
        {
          title2: "The Rainbow Mountain",
          image2: "The-Rainbow-Mountain",
          content2:
            "Originally known as Vinicunca, this mountain is located in the heart of the famous Andes range. It is 5,200 metres above sea level, and all of it is covered in rich, earthy tones of reds, browns and yellows, and other shades of turquoise, lavender and gold - these colours created through mineral sediments are what set it apart from pretty much any mountain you’ve ever seen!",
        },
        {
          title3: "Machu Picchu",
          image3: "Machu-Picchu",
          content3:
            "One of the main reasons why people visit Peru, Machu Picchu is so famous that you need to book your tickets in advance to your trip to gain entry - they use these tickets to regulate the number of visitors, so that your experience remains free of overcrowding and doesn’t disappoint. Book early, so that you experience its true beauty and serenity firsthand - and maybe spot some llamas on the way, too!",
        },
        {
          title4: "The Amazon Rainforest",
          image4: "The-Amazon-Rainforest",
          content4:
            "Does this place even need an introduction? The Amazon rainforest is so vast and untouched that you would need canoes to navigate its many waterways, whilst interacting with probably the largest variety of flora and fauna - unfiltered, and up-close!",
        },
      ],
    },

    // India
    {
      destinationCountry: "India",
      destinationInfo: [
        {
          title1: "Snow, Sea, Land, and Mountains",
          image1: "Snow-Sea-Land-and-Mountains",
          content1:
            "India’s rich landscape goes past just a single plane - from Goa beaches and Kerala backwater in the South, to Kashmiri snow and Himalayan mountains in the North. Deserts and rivers in the same country: India is one nation you’ll need to visit at least a few times to explore all that they have to offer!",
        },
        {
          title2: "Rich, Intense Culture",
          image2: "Rich-Intense-Culture",
          content2:
            "Just like everything else about India, each part of the country boasts a different, unique set of traditions, language, ideals, and folklore - all unified by their vibrant festivals and close-knit community. India’s culture extends into its architecture, with more famous wonders such as the Taj Mahal, as well as other equally dazzling UNESCO World Heritage Sites across the country.",
        },
        // The Mysore Palace, Sanchi Stupa, Qutub Minar, the Golden and Lotus Temples (among the few thousand other architectural wonders that are India’s religious monuments), Hawa Mahal and Victoria Terminus are some of the nation’s most famous historical masterpieces.
        {
          title3: "Bollywood, Kollywood And Other Kinds Of Woods",
          image3: "Bollywood-Kollywood-And-Other-Kinds-Of-Woods",
          content3:
            "One can hardly ignore the impact that Indian cinema has on its population. From posters bigger than buildings to garlands and celebration - Indian actors are elevated to an almost god-like stature in the minds of some. To really get a glimpse of the country’s movie madness, you’ll have to come here yourself!",
        },
        {
          title4: "Food = Love",
          image4: "Food-Love",
          content4:
            "We’ve all heard of the extravagance that is an Indian wedding, and the generosity that is an Indian mother in the kitchen. Well, food is something this country holds dear to the heart - and although cuisines vary dramatically across the country, one thing holds constant: the love that you taste when you close your eyes and savour our dishes.",
        },
      ],
    },

    // UAE
    {
      destinationCountry: "UAE",
      destinationInfo: [
        {
          title1: "Bigger Is Better",
          image1: "Bigger-Is-Better",
          content1:
            "The tallest structure in the world - the Burj Khalifa. The largest suspended aquarium in the world. The largest man-made marina in the world. And, the largest shopping centre in the world by area: These are just some of the laurels that UAE holds in terms of size - it’s safe to say that here, bigger is definitely better!",
        },
        {
          title2: "Wadi Wurrayah",
          image2: "Wadi-Wurrayah",
          content2:
            "UAE’s single natural waterfall exists here, in the heart of the Hatta natural rock pool. You’ll have to travel through a desert to get here, and they’re less than an hour outside Dubai. This means less travel time and more time to spend enjoying your day!",
        },
        {
          title3: "Shopping Bliss",
          image3: "Shopping-Bliss",
          content3:
            "Dubai and UAE are known for their love for all things luxe, and all things shopping. This is the centre for luxury brands, top merchandise, and insane quality. Here, it’s not quality over quantity - because you’ll always be able to find both!",
        },
        {
          title4: "Burj Khalifa",
          image4: "Burj-Khalifa",
          content4:
            "Dubai’s most famous attraction, it is a man-made skyscraper like no other. A luxury hotel, corporate suites, restaurant and residences, along with At The Top, the building’s observation deck - which isn’t just a few windows, but a transparent floor that lets you see more than 100 stories under. All of this, topped with a beautiful fountain and park around it!",
        },
      ],
    },

    // Mauritius
    {
      destinationCountry: "Mauritius",
      destinationInfo: [
        {
          title1: "Grand Bassin",
          image1: "Grand-Bassin",
          content1:
            "An extinct volcano-turned-lake, this serene spot is suspended almost 1800 feet above sea level. It is a sacred place for the Hindus of the country, who believe the holy waters from India’s Ganges River are what fill this lake. Regardless of your religion, the Bassin is a picturesque location that welcomes all.",
        },
        {
          title2: "National Parks and Gardens",
          image2: "National-Parks-and-Gardens",
          content2:
            "Black River Gorges National Park makes your misty, green-filled, mountainous dreams a reality. And La Vanille Crocodile Park is not home to just majestic crocs, but beautiful butterflies, giant turtles, and some species of bats as well. Even Mauritius’ Pamplemousses Botanical Garden covers a whole 60 acres, with Amazon-like flora at every turn - so why wouldn’t you visit, again?",
        },
        {
          title3: "Beach Bonanza",
          image3: "Beach-Bonanza",
          content3:
            "What is a trip to Mauritius without visiting their incredible beaches? Flic en Flac is what the locals recommend, and it’s even a bus ride's journey from Port Louis. Other island beauties include Le Souffleur, Ile aux Cerfs, and Le Morne.",
        },
        {
          title4: "Port Louis",
          image4: "Port-Louis",
          content4:
            "Port Louis is Mauritius’ bustling capital. Visit their city center, with a beautiful port (of course), vibrant restaurants, and plenty of shopping opportunities to get souvenirs. The city is also home to the classy Champ de Mars racecourse - a perfect blend of city and countryside!",
        },
      ],
    },

    // Greece
    {
      destinationCountry: "Greece",
      destinationInfo: [
        {
          title1: "Breathtaking Beaches",
          image1: "Breathtaking-Beaches",
          content1:
            "Pristine white cliffs overlooking a turquoise tranquil that is the ocean… Greece’s beaches fit this description perfectly! Islands such as Corfu, Santorini, and Mykonos truly blend the vibrant blues of both the seas and architecture to create a scenic view. Others such as Zakynthos and Nafplio combine this beauty with a beat; giving you nightlife that you’re hard-pressed to find elsewhere.",
        },
        {
          title2: "Travel Back In Time",
          image2: "Travel-Back-In-Time",
          content2:
            "Greek Mythology has held an important status both inside history classes, and outside as well. If we had to name a few must-sees, they would probably be Athens, Mycenae, Olympia, Delphi, Meteora, Rhodes, and Knossos. Yep, Greece is full of history!",
        },
        {
          title3: "Chios",
          image3: "Chios",
          content3:
            "Chios is the definition of underrated. Although it might not be as famous, it hosts medieval villages, beautiful beaches, and delicious food - all while staying in some of their most off-beat hotels and hostels! It’s tiny, but it packs a punch!",
        },
        {
          title4: "Halkidiki",
          image4: "Halkidiki",
          content4:
            "One of Greece’s best-kept secrets, this northern peninsula is home to some of the most interesting blends of luxury and history! Golden sand, blue beaches, and bustling restaurants meet stoic monasteries and calm spirituality here.",
        },
      ],
    },

    // Japan
    {
      destinationCountry: "Japan",
      destinationInfo: [
        {
          title1: "The Weirdest Themed cafés",
          image1: "The-Weirdest-Themed-cafés",
          content1:
            "The Japanese seem to embrace their quirky side wherever they are, and in doing so, have created some of the coolest (and weirdest!) experiences ever. Maid cafés, robot cafés (with real robots serving you), vampire cafés, fantasy dining cafés, anime and kawaii monster cafés… The list never ends!",
        },
        {
          title2: "The Cat Islands",
          image2: "The-Cat-Islands",
          content2:
            "The Island of Tashirojima sees the population of cats outnumber that of humans - and the people here are totally for it! Locals believe cats are said to represent luck and good fortune - and even have a cat shrine in the middle of the island! Apparently, Aoshima island also shares the same principles - so do drop by before you leave here!",
        },
        {
          title3: "Wisteria Tunnel",
          image3: "Wisteria-Tunnel",
          content3:
            "At the Kawachi Fuji Gardens, one is sure to be enthralled by all the amazing flora that exist. Especially under this Wisteria Tunnel, where you’ll feel like you should’ve brought a ballgown and a white steed to accompany you instead! Pro tip: make sure you visit between April-May, so that the garden is in full bloom!",
        },
        {
          title4: "Tokyo - The City of Opportunity",
          image4: "Tokyo-The-City-of-Opportunity",
          content4:
            "This city is truly the heart (and capital!) of Japan. Akihabara (the BEST place for otakus!) and Hello Kitty Land, the Imperial Palace, Tokyo’s landscape gardens, museums, and shrines… Amazing. Harajuku and Shibuya are popular hangout spots too, and encompass the energy of Tokyo’s youth. Truly must-sees, these attractions will make you fall in love with Japan all over again!",
        },
      ],
    },

    // Spain
    {
      destinationCountry: "Spain",
      destinationInfo: [
        {
          title1: "The Tomatina Festival",
          image1: "The-Tomatina-Festival",
          content1:
            "Every last Wednesday of August, the city of Buñol, in Valencia, celebrates what is known as the La Tomatina. Here, hordes of tomatoes are hurled around - tomato fights, tomato slides… Tomato everything! It truly is a one-of-a-kind bonding experience… Between you and the tomato!",
        },
        {
          title2: "Beautiful Barcelona",
          image2: "Beautiful-Barcelona",
          content2:
            "Barcelona is home to some of the World’s most amazing architecture - cue the Basilica of Sagrada Familia (Featured in the Cheetah Girls movie!), Casa Batllo and the Gothic Quarters. These monuments don’t just make you exclaim - they transport you to a completely different era!",
        },
        {
          title3: "Wine Wonderland",
          image3: "Wine-Wonderland",
          content3:
            "Spain has dedicated more than 1 million hectares to its wine vineyards. This means that you’re guaranteed both a relaxing time, and some quality booze while you’re at it! Pro tip - go for the red wines, as these are the most famous worldwide!",
        },
        {
          title4: "Football Frenzy",
          image4: "Football-Frenzy",
          content4:
            "Whether you call it football or soccer, this country runs on the sport - FC Barcelona, Real Madrid, Atletico Madrid and upto 30 more (incredible) teams. One reason to visit Spain would be to just revel in their football craziness - and if you’re a fanatic, you’ll go even crazier here!",
        },
      ],
    },

    // South Africa
    {
      destinationCountry: "South Africa",
      destinationInfo: [
        {
          title1: "Cape Town",
          image1: "Cape-Town",
          content1:
            "Cape Town is the second most populated city in South Africa and arguably its most visited tourist spot. For good reason, too - it’s the heart of South Africa’s culture and history, surrounded by beautiful green landscape and crisp beaches.",
        },
        {
          title2: "Motorbikes, Hikes and Safaris",
          image2: "Motorbikes-Hikes-and-Safaris",
          content2:
            "There’s no right way to tour South Africa’s countryside - but we can tell you of three that’d be rivals for first place! Motorbike tours, as well as hiking expeditions are conducted regularly - along with their World-Famous Safari tours as well!",
        },
        {
          title3: "The Big Hole",
          image3: "The-Big-Hole",
          content3:
            "As you might know, South Africa is the World’s largest diamond excavator, and this hole’s size and depth is proof of that. The visible hole is more than 175 metres deep, with the water inside covering its actual depth - you’ve got to see it to believe it!",
        },
        {
          title4: "Boulder Beach and Penguins",
          image4: "Boulder-Beach-and-Penguins",
          content4:
            "This beach is surrounded by - you guessed it - gigantic boulders. They are also home to some waddles of penguins - you can see, play and hang out with them sometimes, too!",
        },
      ],
    },

    // Australia
    {
      destinationCountry: "Australia",
      destinationInfo: [
        {
          title1: "Aboriginal Australia",
          image1: "Aboriginal-Australia",
          content1:
            "The Aboriginal world of Australia has so many interesting aspects of culture, festivals, and food to offer. Here, meeting and spending time with people who are part of a culture that’s over 50,000 years old is a reality!",
        },
        {
          title2: "The Great Barrier Reef",
          image2: "The-Great-Barrier-Reef",
          content2:
            "The largest coral reef system in the world, the Great Barrier Reef is a marvel of natural beauty. A conglomeration of diverse marine life, interesting underwater experiences, and lifelong memories, this reef is truly worth it.",
        },
        {
          title3: "Kangaroo Island",
          image3: "Kangaroo-Island",
          content3:
            "Kangaroo Island contains all you need for a memorable trip to Australia - insane rock formations, some of the country’s best hotels, eclectic food adventures, and native wildlife all exist here. Kangaroos, koalas and sea lions (which are abundant on the beach!) can be sighted too, something you can’t see anywhere else in the world!",
        },
        {
          title4: "The Australian Alps",
          image4: "The-Australian-Alps",
          content4:
            "We didn’t think of associating ‘Australia’ with ‘snow’ either. Skiing and snow activities in the winter, and mountain biking trails in the summer - there are interesting things to do at any time of the year here!",
        },
      ],
    },

    // Hong Kong
    {
      destinationCountry: "Hong Kong",
      destinationInfo: [
        {
          title1: "The Peak",
          image1: "The-Peak",
          content1:
            "This is Hong Kong’s peak in terms of landscape, but also the place for the country’s elite. Its cool air and insane view are what bring people here - oh, and Madame Tussauds is just around the corner, in case you were interested!",
        },
        {
          title2: "Hong Kong Disneyland",
          image2: "Hong-Kong-Disneyland",
          content2:
            "Why come to this Disneyland over all the others? Well, for starters, the lines are unreasonably short - meaning that you can sometimes go through rides without even waiting for 5 minutes! Special attractions, amazing Asian food, and a cute MRT (with Mickey Mouse-shaped windows!) that takes you there: both you and your child are guaranteed a good time!",
        },
        {
          title3: "Market Mania",
          image3: "Market-Mania",
          content3:
            "Hong Kong is famous for its different kinds of markets - all very reasonably priced, but all unique. Some markets are very good at making very close duplicates of luxury products, others are night markets that specialise in interesting gastronomic adventures - which means you can personalise your trip depending on your interests!",
        },
        {
          title4: "Lantau Island",
          image4: "Lantau-Island",
          content4:
            "Hong Kong has strong roots in Buddhist culture, and here at Lantau Island, you can feel just that. The calm and the curiosity are both piqued: Temples, beaches and even shopping malls make sure of it!",
        },
      ],
    },

    // Mozambique
    {
      destinationCountry: "Mozambique",
      destinationInfo: [
        {
          title1: "Watching Whale Sharks",
          image1: "Watching-Whale-Sharks",
          content1:
            "Dreams of travelling the world and seeing all the diverse wildlife in every country? Well, in Mozambique you can do just that! They have whale shark excursions, where you can watch these beauties without disturbing them - with an experienced local guide, too.",
        },
        {
          title2: "Gorongosa National Park",
          image2: "Gorongosa-National-Park",
          content2:
            "Both flora and fauna are in abundance at this park - the locals strive to protect and nurture their sanctuary. They have many different species, including impalas and waterbucks, sable antelope, warthogs, hippos and crocodiles. They also have over 300 species of bird, meaning Lion King is now more than a movie - it’s a reality!",
        },
        {
          title3: "Astounding Archipelago",
          image3: "Astounding-Archipelago",
          content3:
            "Beautiful coral beaches, sandy coves and underwater treasures - Mozambique has it all. If you come here, make sure you check out the much-lauded marine and shore life!",
        },
        {
          title4: "Maputo",
          image4: "Maputo",
          content4:
            "Mozambique’s capital - both in general and culturally - is home to an array of lively roadside cafes and rich museums. The place is like a time-warp, taking you back to the era of cobblestoned alleyways and historical architecture.",
        },
      ],
    },

    // Malaysia
    {
      destinationCountry: "Malaysia",
      destinationInfo: [
        {
          title1: "You Want It, You Got It",
          image1: "You-Want-It-You-Got-It",
          content1:
            "Malaysia has it all - Batu Caves (an Indian temple inside the famous cave), Gunung Tahan (one of the most famous and challenging mountains to climb), Langkawi and Sarawak (islands full of rich marine life and shoreside activities) and Kuala Lumpur (home to the Petronas Towers and Sunway Pyramid).",
        },
        {
          title2: "Firefly Fantasy",
          image2: "Firefly-Fantasy",
          content2:
            "During the calm, subdued evenings at Kuala Selangor, one can spot thousands of pretty fireflies around the lakeside’s majestic mangrove trees. You can even book tours to get closer to these beauties, or watch them light up the sky from afar!",
        },
        {
          title3: "Melaka",
          image3: "Melaka",
          content3:
            "A quaint, culturally rich city in the heart of Malaysia, Melaka (or ‘Malacca’) is home to so much more than the country’s amazing history. Its museums, cultural monuments and deep past contrast their newer attractions, like The Huskitory (dog fanatics alert!) and their Upside-Down House Galleries.",
        },
        {
          title4: "Nightlife at Bukit Bintang",
          image4: "Nightlife-at-Bukit-Bintang",
          content4:
            "With Bukit Bintang on your list, you’re sure to enjoy nights in Malaysia. Bright lights, clubs and bars, interesting new restaurants (even one inside an airplane!) and underground party scenes - Bukit bintang is here to satisfy your cravings for a night full of fun!",
        },
      ],
    },

    // Netherlands
    {
      destinationCountry: "Netherlands",
      destinationInfo: [
        {
          title1: "Amsterdam",
          image1: "Amsterdam",
          content1:
            "A marriage between rustic canals and cosmopolitan architecture, this city has been host to movies like Ocean’s Twelve and The Fault In Our Stars. For good reason, too - Amsterdam’s nightlife, museums, shopping districts and coffee shops are truly picturesque, and the city has a reputation for being extremely eclectic, too!",
        },
        {
          title2: "The Hague",
          image2: "The-Hague",
          content2:
            "One of the most important places in the global political landscape, the Hague is known as “the International City of Peace and Justice”. Here, you may find over 30 theatres and 45 museums - not to mention the (literal) thousands of shops - and even 2 of Netherlands’ scenic beaches! This is truly an energetic community.",
        },
        {
          title3: "Going Green",
          image3: "Going-Green",
          content3:
            "The Dutch are known for their progressive approach to sustainability, and you can see it virtually everywhere you go. The city of Amsterdam is completely bike-friendly, and veganism is a lifestyle for a lot of the people here. Bars and restaurants even home-grow most of their produce, so you don’t have to worry about whether your food is organic or not - you can rest assured knowing it’ll taste sinful!",
        },
        {
          title4: "Van Gogh Museum",
          image4: "Van-Gogh-Museum",
          content4:
            "Ever heard of Vincent Van Gogh? Or, more accurately, what a legend he was in the art world? Well, this museum - located in the heart of Amsterdam - portrays just that. They have the largest collection of Van Gogh’s legendary works in the world - enough reason for the museum to have more than 2.1 visitors yearly! If you want to figure out what the hype is all about, we suggest you head on over there to be amazed.",
        },
      ],
    },

    // Croatia
    {
      destinationCountry: "Croatia",
      destinationInfo: [
        {
          title1: "Michelin Gastronomy",
          image1: "Michelin-Gastronomy",
          content1:
            "Don’t be fooled by Croatia’s size - it hosts a total of seven restaurants with Michelin stars (the highest honour in the culinary world), and its vineyards, wine and cheese tastings will make you feel like staying here forever. The people here really have a knack for luxury, and you can taste it in their food as well.",
        },
        {
          title2: "Nautical Paradise",
          image2: "Nautical-Paradise",
          content2:
            "Being an island has its benefits - but Croatia takes these to a whole different level. A wonderland of yachts, sailors, diving and night sailing, this country will always amaze you with its seascape!",
        },
        {
          title3: "Luxe Living",
          image3: "Luxe-Living",
          content3:
            "Croatia captures your heart before you even get to the activities - its living quarters are known for their luxury element, from traditional palaces (converted into lodging) to high-rise hotels. You’ll be captivated into feeling like royalty, before you even begin your Croatioan journey!",
        },
        {
          title4: "A Heart of Adventure",
          image4: "A-Heart-of-Adventure",
          content4:
            "Croatia is surrounded by beautifully kept beaches, which don’t just provide an amazing view - they host a variety of adventure sports, from paragliding and sailing to deep-sea diving. Their adventure extends to the land as well, with many interesting hiking, cycling and fishing trains to explore!",
        },
      ],
    },
  ];

  destinationImage1: any;
  destinationImage2: any;
  destinationImage3: any;
  destinationImage4: any;
  showHeading: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  findPlace() {
    setTimeout(() => {
      this.exploreWorld = "reachYourDestination";
      this.flip = this.flip == "inactive" ? "active" : "inactive";
      this.showHeading = true;
    }, 1000);
    this.exploreWorld = "findingDestination";
    this.showHeading = false;

    if (this.index <= this.destinationQuery.length) {
      this.worldChart = this.destinationQuery[this.index];
      this.index = this.index + 1;
    }
    if (this.index >= this.destinationQuery.length) {
      this.index = 0;
    }

    this.destinationTitle1 = this.worldChart.destinationInfo[0].title1;
    this.destinationContent1 = this.worldChart.destinationInfo[0].content1;
    this.destinationImage1 = this.worldChart.destinationInfo[0].image1;

    this.destinationTitle2 = this.worldChart.destinationInfo[1].title2;
    this.destinationContent2 = this.worldChart.destinationInfo[1].content2;
    this.destinationImage2 = this.worldChart.destinationInfo[1].image2;

    this.destinationTitle3 = this.worldChart.destinationInfo[2].title3;
    this.destinationContent3 = this.worldChart.destinationInfo[2].content3;
    this.destinationImage3 = this.worldChart.destinationInfo[2].image3;

    this.destinationTitle4 = this.worldChart.destinationInfo[3].title4;
    this.destinationContent4 = this.worldChart.destinationInfo[3].content4;
    this.destinationImage4 = this.worldChart.destinationInfo[3].image4;

    this.destinationCountry = this.worldChart.destinationCountry;
  }
}
