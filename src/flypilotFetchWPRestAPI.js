const flypilotFetchWPRestAPI = async (endpoint, apartmentsEndpoint) => {
    const acf_rest_response = await fetch(endpoint);
	const acf_rest_data = await acf_rest_response.json();
    const acf_result = acf_rest_data.acf
    console.log(acf_rest_data)
    const apartments_endpoint_rest_response = await fetch(apartmentsEndpoint);
	const apartment_result = await apartments_endpoint_rest_response.json();
console.log(apartment_result)
    const penthouse_gallery = acf_result.penthouse_gallery
    const residences_gallery = acf_result.residences_gallery
    const amenitiesResults = {
        heading_amenities: acf_result.heading_amenities,
        content_amenity_1: acf_result.content_amenity_1,
        content_amenity_2: acf_result.content_amenity_2,
        button_text_2: acf_result.button_text_2,
        amenity_heading_1: acf_result.amenity_heading_1,
        amenity_heading_2: acf_result.amenity_heading_2,
        amenity_heading_3: acf_result.amenity_heading_3,
        amenity_heading_4: acf_result.amenity_heading_4,
        amenity_heading_5: acf_result.amenity_heading_5,
        amenity_heading_6: acf_result.amenity_heading_6,
        amenity_heading_7: acf_result.amenity_heading_7,
        amenity_heading_8: acf_result.amenity_heading_8,
    }

    // const developmentTeamFields = {
    //     heading_team_story: acf_result.heading_team_story,
    //     content_1_team_story: acf_result.content_1_team_story,
    //     secondary_heading_team_story: acf_result.secondary_heading_team_story,
    //     content_2_team_story: acf_result.content_2_team_story,
    //     content_3_team_story: acf_result.content_3_team_story,
    //     button_text_5: acf_result.button_text_5,
    //     button_link_5: acf_result.button_link_5.url,
    //     button_text_6: acf_result.button_text_6,
    //     button_link_6: acf_result.button_link_6.url,
    //     button_text_7: acf_result.button_text_7,
    //     button_link_7: acf_result.button_link_7.url,
    //     team_story_video: acf_result.team_story_video,
    //     nria_logo: acf_result.nria_logo.url,
    //     copyright_text: acf_result.copyright_text,
    // }
    const SLIDES = [{
        slideTemplate: 'home',
        styles: {
            background: "#000",
        },
        down_arrow_1: acf_result.down_arrow_1.url,
        landing_center_logo: acf_result.landing_center_logo,
        
    },
    
    {
        
        slideTemplate: 'film',
        slideClasses: "fullWidthVideo",
        // video: './NIRMA_1_Exterior_High_Cinemagraphic.mp4',
        videoLoop: true,
        videoZoomEffect: true,
        videoMobileStartPosition: 'center',
        // mobileHorizontalVideoSlideEnabled: true,
        // mobileHasDifferentContent: true,
        // mobileContent: {
        //     centerBottom: {
        //         line1: acf_result.swipe_text_mobile_1,
        //         line1RightArrowBouncing: true,
        //         line1LeftArrowBouncing: true,
        //         lineStyles: {
        //             display: 'flex',
        //             alignItems: 'center',
        //             color: '#fff'
        //         },
        //     }
        // },
        headerTheme: 'light',
        headerThemeMobile: 'lightMobile',
        // filmSoundTurnOnText: "SOUND ON",
        // filmSoundTurnOffText: "SOUND OFF",
        background_video_film: acf_result.background_video_film,
        swipe_arrow_left_1: acf_result.swipe_arrow_left_1.url,
        swipe_arrow_right_1: acf_result.swipe_arrow_right_1.url,
    }
    ,{
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
                line1: acf_result.swipe_text_mobile_1,
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
        exteriorTurnOnText: acf_result.turn_on_text,
        exteriorTurnOffText: acf_result.turn_off_text,
        background_video_no_light: acf_result.background_video_no_light,
        background_image_light: acf_result.background_image_light.url,
        swipe_arrow_left_1: acf_result.swipe_arrow_left_1.url,
        swipe_arrow_right_1: acf_result.swipe_arrow_right_1.url,
    },{
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
        heading_property: acf_result.heading_property,
        content_property_1: acf_result.content_property_1,
        content_property_2: acf_result.content_property_2,
        content_property_3: acf_result.content_property_3,
        button_text_1: acf_result.button_text_1,
        button_link_1: acf_result.button_link_1,
        background_video_property: acf_result.background_video_property.url,
        background_animated_property_image_mobile: acf_result.background_animated_property_image_mobile.url,
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
                line1: acf_result.swipe_text_mobile_2,
                line1RightArrowBouncing: true,
                line1LeftArrowBouncing: true,
                lineStyles: {
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff'
                },
            }
		},
        down_arrow_2: acf_result.down_arrow_2.url,
        swipe_arrow_left_2: acf_result.swipe_arrow_left_2.url,
        swipe_arrow_right_2: acf_result.swipe_arrow_right_2.url,
    }, {
        slideTemplate: 'amenities',
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        headerThemeMobile: 'lightMobile',
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
        accordion_open_button: acf_result.accordion_open_button.url,
        accordion_close_button: acf_result.accordion_close_button.url,
        amenities: [
            {
                title_line1: acf_result.detail_heading_1_line_1,
                title_line2: acf_result.detail_heading_1_line_2,
                title_line3: acf_result.detail_heading_1_line_3,
                image: acf_result.detail_background_1.url,
                description: acf_result.detail_content_1
            },
            {
                title_line1: acf_result.detail_heading_2_line_1,
                title_line2: acf_result.detail_heading_2_line_2,
                title_line3: acf_result.detail_heading_2_line_3,
                image: acf_result.detail_background_2.url,
                description: acf_result.detail_content_2
            },
            {
                title_line1: acf_result.detail_heading_3_line_1,
                title_line2: acf_result.detail_heading_3_line_2,
                title_line3: acf_result.detail_heading_3_line_3,
                image: acf_result.detail_background_3.url,
                description: acf_result.detail_content_3
            },
            {
                title_line1: acf_result.detail_heading_4_line_1,
                title_line2: acf_result.detail_heading_4_line_2,
                title_line3: acf_result.detail_heading_4_line_3,
                image: acf_result.detail_background_4.url,
                description: acf_result.detail_content_4
            },
            {
                title_line1: acf_result.detail_heading_5_line_1,
                title_line2: acf_result.detail_heading_5_line_2,
                title_line3: acf_result.detail_heading_5_line_3,
                image: acf_result.detail_background_5.url,
                description: acf_result.detail_content_5
            },
            {
                title_line1: acf_result.detail_heading_6_line_1,
                title_line2: acf_result.detail_heading_6_line_2,
                title_line3: acf_result.detail_heading_6_line_3,
                image: acf_result.detail_background_6.url,
                description: acf_result.detail_content_6
            },
            {
                title_line1: acf_result.detail_heading_7_line_1,
                title_line2: acf_result.detail_heading_7_line_2,
                title_line3: acf_result.detail_heading_7_line_3,
                image: acf_result.detail_background_7.url,
                description: acf_result.detail_content_7
            },
            {
                title_line1: acf_result.detail_heading_8_line_1,
                title_line2: acf_result.detail_heading_8_line_2,
                title_line3: acf_result.detail_heading_8_line_3,
                image: acf_result.detail_background_8.url,
                description: acf_result.detail_content_8
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
        heading_the_view: acf_result.heading_the_view,
        content_the_view: acf_result.content_the_view,
        views: [
            {
                displayTime: acf_result.time_1,
                ampm: acf_result.time_1_ampm,
                image: acf_result.timeline_gallery[0].url,
                imageMobile: acf_result.timeline_gallery_mobile[0].url
            },
            {
                displayTime: acf_result.time_2,
                ampm: acf_result.time_2_ampm,
                image: acf_result.timeline_gallery[1].url,
                imageMobile: acf_result.timeline_gallery_mobile[1].url
            },
            {
                displayTime: acf_result.time_3,
                ampm: acf_result.time_3_ampm,
                image: acf_result.timeline_gallery[2].url,
                imageMobile: acf_result.timeline_gallery_mobile[2].url
            },
            {
                displayTime: acf_result.time_4,
                ampm: acf_result.time_4_ampm,
                image: acf_result.timeline_gallery[3].url,
                imageMobile: acf_result.timeline_gallery_mobile[3].url
            },
            {
                displayTime: acf_result.time_5,
                ampm: acf_result.time_5_ampm,
                image: acf_result.timeline_gallery[4].url,
                imageMobile: acf_result.timeline_gallery_mobile[4].url
            },
            {
                displayTime: acf_result.time_6,
                ampm: acf_result.time_6_ampm,
                image: acf_result.timeline_gallery[5].url,
                imageMobile: acf_result.timeline_gallery_mobile[5].url
            },
        ]
    },{
        slideTemplate: 'residencePenthouse',
        styles: {
            background: "#000",
        },
        headerTheme: 'light',
        residences_button_text: acf_result.residences_button_text,
        penthouse_button_text: acf_result.penthouse_button_text,
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
        background_image_residences: acf_result.background_image_residences.url,
        down_arrow_3: acf_result.down_arrow_3,
        swipe_text_mobile_3: acf_result.swipe_text_mobile_3,
        swipe_arrow_left_3: acf_result.swipe_arrow_left_3,
        swipe_arrow_right_3: acf_result.swipe_arrow_right_3,
        //Penthouse fields
        background_image_penthouse: acf_result.background_image_penthouse.url,
        down_arrow_4: acf_result.down_arrow_4,
        swipe_text_mobile_4: acf_result.swipe_text_mobile_4,
        swipe_arrow_left_4: acf_result.swipe_arrow_left_4,
        swipe_arrow_right_4: acf_result.swipe_arrow_right_4,
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
        heading_residences: acf_result.heading_residences,
        features_heading_residences: acf_result.features_heading_residences,
        content_1_residences: acf_result.content_1_residences,
        residences_features: acf_result.residences_features,
        button_text_3: acf_result.button_text_3,
        button_link_3: acf_result.button_link_3,
        left_arrow_1: acf_result.left_arrow_1.url,
        residences_gallery_expand: acf_result.residences_gallery_expand.url,
        residences_gallery_contract: acf_result.residences_gallery_contract.url,

        //Penthouse
        heading_penthouse: acf_result.heading_penthouse,
        features_heading_penthouse: acf_result.features_heading_penthouse,
        content_1_penthouse: acf_result.content_1_penthouse,
        penthouse_features: acf_result.penthouse_features,
        button_text_4: acf_result.button_text_4,
        button_link_4: acf_result.button_link_4,
        left_arrow_2: acf_result.left_arrow_2.url,
        penthouse_gallery_expand: acf_result.penthouse_gallery_expand.url,
        penthouse_gallery_contract: acf_result.penthouse_gallery_contract.url,
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
        slideTemplate: 'availability',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
        availabilityHeadline: acf_result.heading_availability,
        availabilityText: acf_result.content_availability,
        availabilityFloorplansLabel: acf_result.drop_down_1_label,
        availabilityFloorplansOptions: acf_result.drop_down_1,
        availabilityCollectionLabel: acf_result.drop_down_2_label,
        availabilityCollectionOptions: acf_result.drop_down_2,
        availability_detail_apartment_name: acf_result.availability_detail_apartment_name,
        availability_detail_apartment_address_line_1: acf_result.availability_detail_apartment_address_line_1,
        availability_detail_apartment_address_line_2: acf_result.availability_detail_apartment_address_line_2,
        apartment_result
    }
    // ,{
    //     slideTemplate: 'developmentTeam',
    //     styles: {
    //         background: "#fff",
    //     },
    //     headerTheme: 'dark',
    //     enableScrolling: true,
    //     rightSideAdditionalClasses: 'not-mobile',
    //     buttonGroupAdditionalClasses: 'not-mobile',
    //     developmentTeamFields
    // }
    // ,{
    //     slideTemplate: 'developmentTeam',
    //     styles: {
    //         background: "#fff",
    //     },
    //     headerTheme: 'dark',
    //     enableScrolling: true,
    //     textGroupAdditionalClasses: 'not-mobile',
    //     mobileOnly: true,
    //     developmentTeamFields
    // }
    ,{
        slideTemplate: 'founders',
        styles: {
            background: "#141517",
            // background: "linear-gradient(90deg, #141517 0%, #141517 95%, #181919 100%)",
        },

        enableScrolling: true,
        enableScrollingQuerySelector: '.slideTemplate-founders .founderSlideWrapper',
        headerTheme: 'light',
        founderImage: acf_result.background_image_founders.url,
        founderHeadline: acf_result.heading_founders,
        founderTagline: acf_result.sub_text,
        founderBenefits: acf_result.founding_privleges,
    },{
        slideTemplate: 'videoDiscover',
        styles: {
            background: "#fff",
        },
        headerTheme: 'light',
        videoLoop: true,
        background_video_discover: acf_result.background_video_discover.url,
        background_video_discover_mobile: acf_result.background_video_discover_mobile.url,
        down_arrow_5: acf_result.down_arrow_5.url,
    },{
        slideTemplate: 'neighborhoodCommunity',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        enableScrolling: true,
        heading_discover: acf_result.heading_discover,
        content_discover: acf_result.content_discover,
        left_image: acf_result.left_image.url,
    },{
        slideTemplate: 'map',
        styles: {
            background: "#fff",
        },
        headerTheme: 'dark',
        maps_api_key: acf_result.maps_api_key,
        headerThemeMobile: 'lightMobile',
        map_satellite_view_text: acf_result.map_satellite_view_text,
        map_location_view_text: acf_result.map_location_view_text,
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
        form_heading: acf_result.form_heading,
        contact_logo: acf_result.contact_logo.url,
        contact_address: acf_result.contact_address,
        company: acf_result.company,
        agent_name: acf_result.agent_name,
        phone_number: acf_result.phone_number,
        copyright_disclaimer: acf_result.copyright_disclaimer,
        button_text_8: acf_result.button_text_8,
        button_link_8: acf_result.button_link_8,
    }]
    return SLIDES;
}

export default flypilotFetchWPRestAPI;