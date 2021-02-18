const flypilotFetchWPRestAPI = async () => {
    const SLIDES = [{
        slideTemplate: 'home',
        styles: {
            background: "#000",
        },
        
    }, {
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
        videoMobileStartPosition: 'center',
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
    }, {
        slideTemplate: 'amenities',
        styles: {
            background: "#fff",
        },
        // slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'dark',
        enableScrolling: true,
        enableScrollingQuerySelector: '.amenities__details',
    }, {
        slideTemplate: 'amenitiesDetail',
        styles: {
            background: "#000",
        },
        amenities: [{
            title_line1: "Luxury Pool",
            title_line2: "With Manhattan's",
            title_line3: "View",
            image: "images/amenities/Pool.png",
            description: "Pool Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },{
            title_line1: "Fitness Center",
            image: "images/amenities/Fitness.png",
            description: "Fitness Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
        ,{
            title_line1: "First Class Grills",
            image: "images/amenities/Grills.png",
            description: "Grills Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            moreInfoBtn: true
        }],
        // slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'light',
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
        headerTheme: 'light'
    },{
        slideTemplate: 'residencePenthouseDetail',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
        enableScrollingQuerySelector: '.residencePenthouseDetail__details',
    }
    ,{
        slideTemplate: 'developmentTeam',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
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
    },{
        slideTemplate: 'contact',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
    }]
    return SLIDES
  }

export default flypilotFetchWPRestAPI;