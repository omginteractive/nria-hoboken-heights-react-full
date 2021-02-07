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
            background: "#fff",
        },
        amenities: [{
            title: "Luxury Pool<br />With Manhattan's<br />View",
            image: "images/amenities/Pool.png",
            description: "Pool Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },{
            title: "Fitness Center",
            image: "images/amenities/Fitness.png",
            description: "Fitness Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
        ,{
            title: "First Class Grills",
            image: "images/amenities/Grills.png",
            description: "Grills Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }],
        // slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'light'
    }]
    return SLIDES
  }

export default flypilotFetchWPRestAPI;