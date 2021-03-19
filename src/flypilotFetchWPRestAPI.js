const flypilotFetchWPRestAPI = async (endpoint) => {
    const rest_response = await fetch(endpoint);
	const rest_data = await rest_response.json();
    console.log(rest_data)
    const result = rest_data.acf
    const penthouse_gallery = result.penthouse_gallery
    const residences_gallery = result.residences_gallery
    const amenitiesResults = {
        heading_amenities: result.heading_amenities,
        content_amenity_1: result.content_amenity_1,
        content_amenity_2: result.content_amenity_2,
        button_text_2: result.button_text_2,
        amenity_heading_1: result.amenity_heading_1,
        amenity_heading_2: result.amenity_heading_2,
        amenity_heading_3: result.amenity_heading_3,
        amenity_heading_4: result.amenity_heading_4,
        amenity_heading_5: result.amenity_heading_5,
        amenity_heading_6: result.amenity_heading_6,
        amenity_heading_7: result.amenity_heading_7,
        amenity_heading_8: result.amenity_heading_8,
    }

    const developmentTeamFields = {
        heading_team_story: result.heading_team_story,
        content_1_team_story: result.content_1_team_story,
        secondary_heading_team_story: result.secondary_heading_team_story,
        content_2_team_story: result.content_2_team_story,
        content_3_team_story: result.content_3_team_story,
        button_text_5: result.button_text_5,
        button_link_5: result.button_link_5.url,
        button_text_6: result.button_text_6,
        button_link_6: result.button_link_6.url,
        button_text_7: result.button_text_7,
        button_link_7: result.button_link_7.url,
        team_story_video: result.team_story_video,
        nria_logo: result.nria_logo.url,
        copyright_text: result.copyright_text,
    }
    const SLIDES = [{
        slideTemplate: 'home',
        styles: {
            background: "#000",
        },
        down_arrow_1: result.down_arrow_1.url,
        landing_center_logo: result.landing_center_logo,
        
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
                line1: result.swipe_text_mobile_1,
                line1RightArrowBouncing: true,
                line1LeftArrowBouncing: true,
                lineStyles: {
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff'
                },
            }
		},
        headerThemeMobile: 'lightMobile',
        exteriorTurnOnText: result.turn_on_text,
        exteriorTurnOffText: result.turn_off_text,
        background_video_no_light: result.background_video_no_light,
        background_image_light: result.background_image_light.url,
        background_image_light: result.background_image_light.url,
        swipe_arrow_left_1: result.swipe_arrow_left_1.url,
        swipe_arrow_right_1: result.swipe_arrow_right_1.url,
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
        headerThemeMobile: 'darkMobile',
        heading_property: result.heading_property,
        content_property_1: result.content_property_1,
        content_property_2: result.content_property_2,
        content_property_3: result.content_property_3,
        button_text_1: result.button_text_1,
        button_link_1: result.button_link_1,
        background_video_property: result.background_video_property.url,
        background_animated_property_image_mobile: result.background_animated_property_image_mobile.url,
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
                line1: result.swipe_text_mobile_2,
                line1RightArrowBouncing: true,
                line1LeftArrowBouncing: true,
                lineStyles: {
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff'
                },
            }
		},
        down_arrow_2: result.down_arrow_2.url,
        swipe_arrow_left_2: result.swipe_arrow_left_2.url,
        swipe_arrow_right_2: result.swipe_arrow_right_2.url,
    }, {
        slideTemplate: 'amenities',
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        enableScrolling: true,
        mobileOnly: true,
        amenitiesResults
        
    }, {
        slideTemplate: 'amenities',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
        desktopOnly: true,
        amenitiesResults
    }, {
        slideTemplate: 'amenitiesGallery',
        styles: {
            background: "#000",
        },
        headerTheme: 'light',
        accordion_open_button: result.accordion_open_button.url,
        accordion_close_button: result.accordion_close_button.url,
        amenities: [
            {
                title_line1: result.detail_heading_1_line_1,
                title_line2: result.detail_heading_1_line_2,
                title_line3: result.detail_heading_1_line_3,
                image: result.detail_background_1.url,
                description: result.detail_content_1
            },
            {
                title_line1: result.detail_heading_2_line_1,
                title_line2: result.detail_heading_2_line_2,
                title_line3: result.detail_heading_2_line_3,
                image: result.detail_background_2.url,
                description: result.detail_content_2
            },
            {
                title_line1: result.detail_heading_3_line_1,
                title_line2: result.detail_heading_3_line_2,
                title_line3: result.detail_heading_3_line_3,
                image: result.detail_background_3.url,
                description: result.detail_content_3
            },
            {
                title_line1: result.detail_heading_4_line_1,
                title_line2: result.detail_heading_4_line_2,
                title_line3: result.detail_heading_4_line_3,
                image: result.detail_background_4.url,
                description: result.detail_content_4
            },
            {
                title_line1: result.detail_heading_5_line_1,
                title_line2: result.detail_heading_5_line_2,
                title_line3: result.detail_heading_5_line_3,
                image: result.detail_background_5.url,
                description: result.detail_content_5
            },
            {
                title_line1: result.detail_heading_6_line_1,
                title_line2: result.detail_heading_6_line_2,
                title_line3: result.detail_heading_6_line_3,
                image: result.detail_background_6.url,
                description: result.detail_content_6
            },
            {
                title_line1: result.detail_heading_7_line_1,
                title_line2: result.detail_heading_7_line_2,
                title_line3: result.detail_heading_7_line_3,
                image: result.detail_background_7.url,
                description: result.detail_content_7
            },
            {
                title_line1: result.detail_heading_8_line_1,
                title_line2: result.detail_heading_8_line_2,
                title_line3: result.detail_heading_8_line_3,
                image: result.detail_background_8.url,
                description: result.detail_content_8
            },
        ],
    }, {
        slideTemplate: 'views',
        styles: {
            background: "#fff",
        },
        enableScrolling: true,
        // slideClasses: "fullWidthVideo",
        // videoLoop: true,
        // videoZoomEffect: true,
        headerTheme: 'dark',
        heading_the_view: result.heading_the_view,
        content_the_view: result.content_the_view,
        views: [
            {
                displayTime: result.time_1,
                ampm: result.time_1_ampm,
                image: result.timeline_gallery[0].url
            },
            {
                displayTime: result.time_2,
                ampm: result.time_2_ampm,
                image: result.timeline_gallery[1].url
            },
            {
                displayTime: result.time_3,
                ampm: result.time_3_ampm,
                image: result.timeline_gallery[2].url
            },
            {
                displayTime: result.time_4,
                ampm: result.time_4_ampm,
                image: result.timeline_gallery[3].url
            },
            {
                displayTime: result.time_5,
                ampm: result.time_5_ampm,
                image: result.timeline_gallery[4].url
            },
            {
                displayTime: result.time_6,
                ampm: result.time_6_ampm,
                image: result.timeline_gallery[5].url
            },
        ]
    },{
        slideTemplate: 'residencePenthouse',
        styles: {
            background: "#000",
        },
        headerTheme: 'light',
        residences_button_text: result.residences_button_text,
        penthouse_button_text: result.penthouse_button_text,
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
		},
        //Residence Fields
        background_image_residences: result.background_image_residences.url,
        down_arrow_3: result.down_arrow_3,
        swipe_text_mobile_3: result.swipe_text_mobile_3,
        swipe_arrow_left_3: result.swipe_arrow_left_3,
        swipe_arrow_right_3: result.swipe_arrow_right_3,
        //Penthouse fields
        background_image_penthouse: result.background_image_penthouse.url,
        down_arrow_4: result.down_arrow_4,
        swipe_text_mobile_4: result.swipe_text_mobile_4,
        swipe_arrow_left_4: result.swipe_arrow_left_4,
        swipe_arrow_right_4: result.swipe_arrow_right_4,
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
        penthouse_gallery: penthouse_gallery,
        residences_gallery: residences_gallery,

        //Residence
        heading_residences: result.heading_residences,
        features_heading_residences: result.features_heading_residences,
        content_1_residences: result.content_1_residences,
        residences_features: result.residences_features,
        button_text_3: result.button_text_3,
        button_link_3: result.button_link_3,
        left_arrow_1: result.left_arrow_1.url,
        residences_gallery_expand: result.residences_gallery_expand.url,
        residences_gallery_contract: result.residences_gallery_contract.url,

        //Penthouse
        heading_penthouse: result.heading_penthouse,
        features_heading_penthouse: result.features_heading_penthouse,
        content_1_penthouse: result.content_1_penthouse,
        penthouse_features: result.penthouse_features,
        button_text_4: result.button_text_4,
        button_link_4: result.button_link_4,
        left_arrow_2: result.left_arrow_2.url,
        penthouse_gallery_expand: result.penthouse_gallery_expand.url,
        penthouse_gallery_contract: result.penthouse_gallery_contract.url,
    }
    ,{
        slideTemplate: 'residencePenthouseDetail',//this is for mobile only because the original desktop slide with text and images needed separation
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        imageDetailsAdditionalClasses: 'not-mobile',
        mobileOnly: true,
        mobileHorizontalVideoSlideEnabled: true,
        videoMobileStartPosition: 'center',
        mobileHasDifferentContent: true,
        penthouse_gallery: penthouse_gallery,
        residences_gallery: residences_gallery,
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
        developmentTeamFields
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
        developmentTeamFields
    }
    ,{
        slideTemplate: 'founders',
        styles: {
            background: "#141517",
            // background: "linear-gradient(90deg, #141517 0%, #141517 95%, #181919 100%)",
        },

        enableScrolling: true,
        enableScrollingQuerySelector: '.slideTemplate-founders .founderSlideWrapper',
        headerTheme: 'light',
        founderImage: result.background_image_founders.url,
        founderHeadline: result.heading_founders,
        founderTagline: result.sub_text,
        founderBenefits: result.founding_privleges,
    },{
        slideTemplate: 'videoDiscover',
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        videoLoop: true,
        background_video_discover: result.background_video_discover.url,
        background_video_discover_mobile: result.background_video_discover_mobile.url,
        down_arrow_5: result.down_arrow_5.url,
    },{
        slideTemplate: 'neighborhoodCommunity',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
        heading_discover: result.heading_discover,
        content_discover: result.content_discover,
        left_image: result.left_image.url,
    },{
        slideTemplate: 'map',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        headerThemeMobile: 'lightMobile',
        map_satellite_view_text: result.map_satellite_view_text,
        map_location_view_text: result.map_location_view_text,
    //     locationListings: [
    //         {
    //             title: 'Lorem Ipsum',
    //             distance: '10 mins',
    //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    //         },
    //         {
    //             title: 'Lorem Ipsum 2',
    //             distance: '12 mins',
    //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    //         },
    //         {
    //             title: 'Lorem Ipsum',
    //             distance: '10 mins',
    //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    //         },
    //         {
    //             title: 'Lorem Ipsum 2',
    //             distance: '12 mins',
    //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    //         },
    //         {
    //             title: 'Lorem Ipsum',
    //             distance: '10 mins',
    //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    //         },
    //         {
    //             title: 'Lorem Ipsum 2',
    //             distance: '12 mins',
    //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    //         }
    // ]
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
        form_heading: result.form_heading,
        contact_logo: result.contact_logo.url,
        contact_address: result.contact_address,
        company: result.company,
        agent_name: result.agent_name,
        phone_number: result.phone_number,
        copyright_disclaimer: result.copyright_disclaimer,
        button_text_8: result.button_text_8,
        button_link_8: result.button_link_8,
    }]
    return SLIDES;
  return rest_data
}

export default flypilotFetchWPRestAPI;