

const flypilotFetchWPRestAPI = (self) => {
    const SLIDES = [
        {
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
            videoZoomEffect: true,
        }
    ]
    self.setState({ slides: SLIDES });
    console.log('RAN')
}

export default flypilotFetchWPRestAPI;