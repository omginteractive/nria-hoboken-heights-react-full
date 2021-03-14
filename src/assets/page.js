const flypilotFetchWPRestAPI = async () => {
    const penthouseDetailImages = [
        'images/penthouse/penthouse.jpg',
        'images/residence/residence.png',
        'images/penthouse/penthouse.jpg',
        'images/penthouse/penthousebed.png',
        
    ]
    const residenceDetailImages = [
        'images/residence/residence.png',
        'images/penthouse/penthousebed.png',
        'images/residence/residence.png',
        'images/penthouse/penthouse.jpg',
    ]
    const SLIDES = [{
        slideTemplate: 'home',
        styles: {
            background: "#000",
        },
        
    },
    {
        slideTemplate: 'exteriorLightToggle',
        slideClasses: "fullWidthVideo",
        // video: './NIRMA_1_Exterior_High_Cinemagraphic.mp4',
        videoLoop: true,
        videoZoomEffect: true,
        videoMobileStartPosition: 'center',
        mobileHorizontalVideoSlideEnabled: true,
        mobileHasDifferentContent: true,
		mobileContent: {
			centerBottom: {
                line1: "SWIPE ",
                line1RightArrowBouncing: true,
                line1LeftArrowBouncing: true,
                lineStyles: {
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff'
                },
            }
		},
        headerThemeMobile: 'lightMobile'
    }, {
        slideTemplate: 'fountainPen',
        styles: {
            background: "#fff",
        },
        slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'light-inquiry',
        enableScrolling: true,
        enableScrollingQuerySelector: '.slideTemplate-fountainPen .textSection',
        headerThemeMobile: 'darkMobile'
    }, {
        slideTemplate: 'patio',
        slideClasses: "fullWidthVideo",
        videoLoop: true,
        videoZoomEffect: true,
        headerTheme: 'light',
        videoMobileStartPosition: 'center',
        mobileHorizontalVideoSlideEnabled: true,
        mobileHasDifferentContent: true,
		mobileContent: {
			centerBottom: {
                line1: "SWIPE ",
                line1RightArrowBouncing: true,
                line1LeftArrowBouncing: true,
                lineStyles: {
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff'
                },
            }
		}
    }, {
        slideTemplate: 'amenities',
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        enableScrolling: true,
        // enableScrollingQuerySelector: '.amenities__details',
        mobileOnly: true,
        // amenitiesListAdditionalClasses: 'not-mobile',
    }, {
    //     slideTemplate: 'amenities',
    //     styles: {
    //         background: "#fff",
    //     },
    //     enableScrolling: true,
    //     enableScrollingQuerySelector: '.amenities__list',
    //     mobileOnly: true,
    //     headerTheme: 'dark',
    //     amenitiesDetailAdditionalClasses: 'not-mobile',
    // }, {
        slideTemplate: 'amenities',
        styles: {
            background: "#fff",
        },
        // slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'dark',
        enableScrolling: true,
        // enableScrollingQuerySelector: '.slideTemplate-amenities.desktop-only .amenities__details',
        desktopOnly: true,
        
    }, {
        slideTemplate: 'amenitiesDetail',
        styles: {
            background: "#000",
        },
        // slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'light',
        amenities: [
            {
                title_line1: "GO OUT FOR DRINKS WITH ",
                title_line2: "FRIENDS WITHOUT LEAVING ",
                title_line3: "THE BUILDING",
                image: "images/amenities/Pool.png",
                description: "You could meet up with your friends at a bar in Manhattan or you could make them Manhattan’s or their favorite cocktails in an exquisite bar and lounge inside your condominium complex. Serveyour guests with style from a full-sized bar. Relax with drinks and socialize in the lounge area, which, of course, includes a large screen television."
            },
            {
                title_line1: "PLAYROOM: FUN FOR ",
                title_line2: "THE KIDS, RELIEF FOR ",
                title_line3: "THE PARENTS",
                image: "images/amenities/Pool.png",
                description: "Need something fun to do with the kids? Check out the exciting Children’s Lounge that features a climbing wall, monkey bars, and plenty of space for having fun. There’s a TV for cartoons, a library of children’s books and table space for doing crafts. Your kids will love this safe, brightly colored, fun-themed space designed just for them."
            },
            {
                title_line1: "BOARDROOM-LIKE ",
                title_line2: "SPACE FOR PRIVATE",
                title_line3: "MEETINGS",
                image: "images/amenities/Pool.png",
                description: "When you need to meet with members of your team from work or volunteer organization, you can take advantage of the beautifully appointed meeting room. The boardroom table easily accommodates five, ten or up to twenty people. There’s room for making presentations or showing video on a large screen TV. The room is well-lit and very professional so you can focus on closing the deal."
            },
            {
                title_line1: "MAKE EXERCISE ",
                title_line2: "CONVENIENT WITH ",
                title_line3: "A GYM AT HOME",
                image: "images/amenities/Fitness.png",
                description: "Why drive to a gym only to see other patrons in the mirror? We’veset up exercise bikes and treadmills that look out floor-to-ceiling windows giving you a wide view of the Hudson River and Manhattan skyline. Get an intense cardio workout on our elliptical machines or head into the weight room for some serious weight training."
            },
            {
                title_line1: "GRILLED DINNERS ON THE ",
                title_line2: "DECK WITH A VIEW THAT FEW  ",
                title_line3: "RESTAURANTS CAN RIVAL",
                image: "images/amenities/Grills.png",
                description: "You’re not going to miss out on the backyard BBQ experience. We’ve included top-of-the-line grills on a spacious outdoor deck. Grill your food and enjoy dining outdoors with a spectacular view of the New York City skyline. And unlike the backyard, you won’t ever have to worry about mowing the grass. Just cook, relax, and enjoy.",
            },
            {
                title_line1: "MINI THEATER FOR  ",
                title_line2: "MAXIMUM VIEWING ",
                title_line3: "PLEASURE",
                image: "images/amenities/Grills.png",
                description: "When you want to watch a great movie, we’ll save you all the hassles of going out to a theater and meeting up as a group by giving you access to our movie screening room. Up to twelve guests can relax in comfortable leather chairs and enjoy watching a new movie together on the big screen.",
            },
            {
                title_line1: "ENJOY THE OUTDOORS ON ",
                title_line2: "THE PATIO (WITHOUT THE  ",
                title_line3: "BACKYARD RESPONSIBILITIES)",
                image: "images/amenities/Grills.png",
                description: "Around our indoor swimming pool where the water is always just the right temperature, we have a spacious walk-out sundeck where you can get some fresh air, hang out and enjoy some company, or just sit and relax in chaise lounge sofas and chairs. Enjoy reading a book in the sunlight or sitting around the fire pit at night.",
            },
            {
                title_line1: "Luxury Pool",
                title_line2: "With Manhattan's",
                title_line3: "View",
                image: "images/amenities/Pool.png",
                description: "You have never gone swimming in a more beautiful indoor pool with such a stunning view of the Manhattan skyline. This relaxing oasis will melt your stress away. Exercise in the pool or take it easy in the soothing, hot whirlpool. Feel free to sit back and relax in the lounge chairs situated around the pool."
            },
        ],
    }, {
        slideTemplate: 'views',
        styles: {
            background: "#fff",
        },
        // slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'dark',
        views: [
            {
                displayTime: '6:00',
                ampm: 'AM',
                image: "images/view/01.jpg"
            },
            {
                displayTime: '8:00',
                ampm: 'AM',
                image: "images/view/02.jpg"
            },
            {
                displayTime: '11:00',
                ampm: 'AM',
                image: "images/view/03.jpg"
            },
            {
                displayTime: '6:00',
                ampm: 'PM',
                image: "images/view/04.jpg"
            },
            {
                displayTime: '8:00',
                ampm: 'PM',
                image: "images/view/05.jpg"
            },
            {
                displayTime: '11:00',
                ampm: 'PM',
                image: "images/view/06.jpg"
            },
        ]
    },{
        slideTemplate: 'residencePenthouse',
        styles: {
            background: "#000",
        },
        headerTheme: 'light'
    },{
        slideTemplate: 'residencePenthouseFullscreen',
        styles: {
            background: "#000",
        },
        headerTheme: 'light',
        videoMobileStartPosition: 'center',
        mobileHorizontalVideoSlideEnabled: true,
        mobileHasDifferentContent: true,
		mobileContent: {
			centerBottom: {
                line1: "SWIPE ",
                line1RightArrowBouncing: true,
                line1LeftArrowBouncing: true,
                lineStyles: {
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff'
                },
            }
		}
    },{
        slideTemplate: 'residencePenthouseDetail',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
        enableScrollingQuerySelector: '.residencePenthouseDetail__details',
        imageContainerAdditionalClasses: 'not-mobile',
        imageDotsAdditionalClasses: 'not-mobile',
        penthouseDetailImages: penthouseDetailImages,
        residenceDetailImages: residenceDetailImages,
    }
    ,{
        slideTemplate: 'residencePenthouseDetail',
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        // enableScrolling: true,
        // enableScrollingQuerySelector: '.residencePenthouseDetail__details',
        imageDetailsAdditionalClasses: 'not-mobile',
        mobileOnly: true,
        mobileHorizontalVideoSlideEnabled: true,
        videoMobileStartPosition: 'center',
        mobileHasDifferentContent: true,
        penthouseDetailImages: penthouseDetailImages,
        residenceDetailImages: residenceDetailImages,
    }
    ,{
        slideTemplate: 'developmentTeam',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
        rightSideAdditionalClasses: 'not-mobile',
        buttonGroupAdditionalClasses: 'not-mobile',

    }
    ,{
        slideTemplate: 'developmentTeam',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
        textGroupAdditionalClasses: 'not-mobile',
        mobileOnly: true,
    }
    ,{
        slideTemplate: 'founders',
        styles: {
            background: "rgb(21, 22, 23)",
        },
        enableScrolling: true,
        enableScrollingQuerySelector: '.slideTemplate-founders .founderSlideWrapper',
        headerTheme: 'light',
        founderImage: 'images/foundersClub.png',
        founderHeadline: 'Gold Founding Members',
        founderTagline: '1st 10 Contracts',
        founderBenefits: [
            "$300,000 Seller's Concession (Penthouses)",
            "$150,000 Seller's Concession (Standard Units)",
            "Seller Contribution - 6 Months of HOA Fees",
            "Preselection Of Interior Designs",
            "Bronze Plaque Noting Gold Founder On The Building",
            "Selection Of Premium Parking Spaces - 3 Spots Penthouse / 2 Spots Standard",
            "Complimentary Pool Badges/Key Fob - Duration Of Ownership/Transferable with Unit",
            "Complimentary Golf Club Access - Duration Of Ownership/Transferable with Unit"
        ],
    },{
        slideTemplate: 'videoDiscover',
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        videoLoop: true,
    },{
        slideTemplate: 'neighborhoodCommunity',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
    },{
        slideTemplate: 'map',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        desktopOnly: true,
        locationListings: [
            {
                title: 'Lorem Ipsum',
                distance: '10 mins',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                title: 'Lorem Ipsum 2',
                distance: '12 mins',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                title: 'Lorem Ipsum',
                distance: '10 mins',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                title: 'Lorem Ipsum 2',
                distance: '12 mins',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                title: 'Lorem Ipsum',
                distance: '10 mins',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                title: 'Lorem Ipsum 2',
                distance: '12 mins',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
    ]
    },
    {
        slideTemplate: 'map',
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        locationListings: [],
        mobileOnly: true,
    },{
    //     slideTemplate: 'contact',
    //     styles: {
    //         background: "#fff",
    //     },
    //     headerTheme: 'dark',
    //     enableScrolling: true,
    //     // desktopOnly: true,
    // },{
        slideTemplate: 'contact',
        styles: {
            background: "#fff",
        },
        // headerTheme: 'light',
        headerTheme: 'dark',
        headerThemeMobile: 'lightMobile',
        enableScrolling: true,
        // mobileOnly: true,
    }]
    return SLIDES
  }

export default flypilotFetchWPRestAPI;