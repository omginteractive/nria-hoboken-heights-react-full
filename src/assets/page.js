const flypilotFetchWPRestAPI = async () => {
    const SLIDES = [{
        slideTemplate: 'home',
        styles: {
            background: "#000",
        },
        
    }, {
        slideTemplate: 'exteriorLightToggle',
        styles: {
            background: "#fff",
        },
        slideClasses: "fullWidthVideo",
        // video: './NIRMA_1_Exterior_High_Cinemagraphic.mp4',
        videoLoop: true,
        videoZoomEffect: true
    }, {
        slideTemplate: 'fountainPen',
        styles: {
            background: "#fff",
        },
        slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'light-inquiry'
    }, {
        slideTemplate: 'patio',
        styles: {
            background: "#fff",
        },
        slideClasses: "fullWidthVideo",
        videoLoop: true,
        videoZoomEffect: true,
        headerTheme: 'light'
    }, {
        slideTemplate: 'amenities',
        styles: {
            background: "#fff",
        },
        // slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'dark'
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
        headerTheme: 'light'
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
    }]
    return SLIDES
  }

export default flypilotFetchWPRestAPI;