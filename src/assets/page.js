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
    }]
    return SLIDES
  }

export default flypilotFetchWPRestAPI;