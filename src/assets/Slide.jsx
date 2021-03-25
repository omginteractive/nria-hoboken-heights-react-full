import {Component} from 'react';
import React from 'react';
import leftArrowBlack from '../assets/images/leftArrowBlack.svg';
import $ from 'jquery'
// import _ from "lodash";

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
			styles: this.props.obj.styles,
            obj: this.props.obj
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const mapHeightLockedPropsChanged = this.props.mapHeightLocked !== nextProps.mapHeightLocked
        const slideChanged = this.props.isCurrent !== nextProps.isCurrent
        const videoMobileStartPositionToggled = this.props.isCurrent && nextProps.obj.videoMobileStartPosition !== this.props.obj.videoMobileStartPosition
        
        return slideChanged || videoMobileStartPositionToggled || mapHeightLockedPropsChanged
    }
    handleTheScroll = e => {
        let element = e.target
		const scrolled = element.scrollTop > 0 ? true : false
        this.props.onSlideScroll(scrolled);
    }

    scrollToNextSlide(noRequireScroll = false) {
		const {goToNextSlide} = this.props;
        goToNextSlide(noRequireScroll);
    }
    goToContactSlide(){
        const {goToContactSlide} = this.props;
        goToContactSlide();
    }
    setAmenityOnGallerySlide(idx, nextSlide = true){
        const {setamenityGallerySlideIdx} = this.props;
        setamenityGallerySlideIdx(idx)

        if(nextSlide) this.scrollToNextSlide(true)
        
    }
    setResidencePenthousePath(option){
        const {setResidencePenthousePath} = this.props;
        setResidencePenthousePath(option)
        setTimeout(() => {
            this.scrollToNextSlide(true)
        })
        
    }
    createHubspotForm(){
		const {createHubspotContactForm} = this.props;
		createHubspotContactForm();
    }
    contactFormSubmitted(){
		const {formSubmitted} = this.props;
		formSubmitted();
	}

	contactFormCleared(){
		const {formCleared} = this.props;
		formCleared();
    }
    
    openPrivacyPolicyModal(){
		const {showPrivacyPolicy} = this.props
		showPrivacyPolicy()
    }
    
    delegateScroll(wheelAmt, elementToDelegateScroll, defaultScroll = false){
        const currentDetailsScrollDistance = elementToDelegateScroll.scrollTop
        elementToDelegateScroll.scrollTop = currentDetailsScrollDistance + wheelAmt
        if(defaultScroll){
            if(wheelAmt < 0) {
                elementToDelegateScroll.scrollTop = 0//scroll to top of slide to trigger prevSlide as scroll motion continues
            }
            else {
                const bottomScrollValue = elementToDelegateScroll.scrollHeight - elementToDelegateScroll.offsetHeight
                elementToDelegateScroll.scrollTop = bottomScrollValue
            }
        }
    }

    slideHorizontal(direction) {
		this.props.horizontalSlide(direction);
	}
    render(){
        const slideObj = this.props.obj;
        const slideMethods = {
            scrollToNextSlide: this.scrollToNextSlide.bind(this),
            goToContactSlide: this.goToContactSlide.bind(this),
            delegateScroll: this.delegateScroll.bind(this),
        }
		let slideClasses = "slide "
		// let videoClasses = 'background-video'
		// let centerTextClasses = 'center';
		// let centerBottomClasses = "centerBottom";

        const right_arrow_styles = {
            backgroundImage: 'url('+require('./images/right-arrow-bouncing.svg').default+')'
        }
        const left_arrow_styles = {
            backgroundImage: 'url('+require('./images/left-arrow-bouncing.svg').default+')',
            backgroundPosition: 'right'
        }
        const right_arrow_bouncing = <div className='right_arrow_bouncing' style={right_arrow_styles} onClick={() => this.slideHorizontal('right')}/>
		const left_arrow_bouncing = <div className='left_arrow_bouncing' style={left_arrow_styles} onClick={() => this.slideHorizontal('left')}/>
        const mobileArrows = {
            right_arrow_bouncing,
            left_arrow_bouncing
        }
		const isCurrent = this.props.isCurrent;

        slideClasses += slideObj.slideClasses !== undefined ? " " + slideObj.slideClasses : '';
		if(isCurrent) slideClasses += " runAnimations activeSlide";
		if(this.props.slideViewed) slideClasses += " runAnimationOnce";
		// if(slideObj.videoZoomEffect) videoClasses += ' videoZoomEffect'
		slideClasses += slideObj.videoMobileStartPosition ? ' mobile-video-position-' + slideObj.videoMobileStartPosition : ' mobile-video-position-center'
		slideClasses += slideObj.contactFormSlide ? ' contactFormSlide' : '';
		slideClasses += slideObj.enableScrolling ? ' enableScrolling' : '';
		slideClasses += ' slideTemplate-' + slideObj.slideTemplate;
        slideClasses += slideObj.mobileOnly === true ? ' mobile-only' : ''
        slideClasses += slideObj.desktopOnly === true ? ' desktop-only' : ''

        // if(slideObj.centerTextClasses) {
		// 	centerTextClasses += ' ' + slideObj.centerTextClasses;
		// }

		if(slideObj.mobileHasDifferentContent) {
			// centerTextClasses += ' not-mobile';
			// centerBottomClasses += ' not-mobile';
		}
		
		// let centerTextStyles;
		let slideStyles;
		if(window.innerWidth > 768){
			// centerTextStyles = slideObj.centerTextStyles
			slideStyles = this.state.styles
		}
		else {
			// centerTextStyles = slideObj.centerTextStylesMobile
			slideStyles = {...this.state.styles, ...slideObj.stylesMobile}
		}

        

		// let centerImageStyles;
		// if(window.innerWidth > 768){
		// 	centerImageStyles = slideObj.centerImageStyles
		// }
		// else {
		// 	centerImageStyles = slideObj.centerImageStylesMobile
		// }

		return(
            <div className={slideClasses} style={slideStyles} onScroll={this.handleTheScroll}>
                {slideObj.slideTemplate === 'home' && 
                    <SlideHome methods={slideMethods} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'exteriorLightToggle' && 
                    <SlideExteriorLightToggle slideHorizontal={this.slideHorizontal.bind(this)} mobileArrows={mobileArrows} methods={slideMethods}  configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'fountainPen' &&
                    <SlideFountainPen isCurrent={isCurrent} methods={slideMethods} configuration={slideObj} curridx={this.props.currIdx} />
                }
                {slideObj.slideTemplate === 'patio' &&
                    <SlidePatio mobileArrows={mobileArrows} methods={slideMethods} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'amenities' &&
                    <SlideAmenities methods={slideMethods} setAmenityOnGallerySlide={this.setAmenityOnGallerySlide.bind(this)} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'amenitiesGallery' &&
                    <SlideAmenitiesGallery setAmenityOnGallerySlide={this.setAmenityOnGallerySlide.bind(this)} isCurrent={isCurrent} idx={this.props.amenityGallerySlideIdx} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'views' &&
                    <SlideViews configuration={slideObj} isMobileDevice={this.props.isMobileDevice} />
                }
                {slideObj.slideTemplate === 'residencePenthouse' &&
                    <SlideResidencePenthouse configuration={slideObj} setResidencePenthousePath={this.setResidencePenthousePath.bind(this)} methods={slideMethods}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseFullscreen' &&
                    <SlideResidencePenthouseFullscreen mobileArrows={mobileArrows} residencePenthouse={this.props.residencePenthousePath}  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseDetail' &&
                    <SlideResidencePenthouseDetail mobileArrows={mobileArrows} methods={slideMethods} residencePenthouse={this.props.residencePenthousePath} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'availability' &&
                    <SlideAvailability  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'developmentTeam' &&
                    <SlideDevelopmentTeam  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'founders' &&
                    <SlideFounders  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'videoDiscover' &&
                    <SlideVideoDiscover  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'neighborhoodCommunity' &&
                    <SlideNeighborhoodCommunity  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'map' &&
                    <SlideMap mapHeightLocked={this.props.mapHeightLocked} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'contact' &&
                    <SlideContactForm createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} showPrivacyPolicy={this.openPrivacyPolicyModal.bind(this)}  configuration={slideObj}  />
                }
                {/* {slideObj.slideTemplate === 'contactMobile' &&
                    <SlideContactForm mobileVersion={true} createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} showPrivacyPolicy={this.openPrivacyPolicyModal.bind(this)}  configuration={slideObj}  />
                } */}
            </div>
        )
    }
}


class SlideMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            satelliteMapEnabled: false,
            enabledListing: null
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const mapChanged = this.state.satelliteMapEnabled !== nextState.satelliteMapEnabled
        const enabledListingChanged = this.state.enabledListing !== nextState.enabledListing
        const mapHeightLockedPropsChanged = this.props.mapHeightLocked !== nextProps.mapHeightLocked
        return mapChanged || enabledListingChanged || mapHeightLockedPropsChanged
    }
    toggleMap(){
        const newState = !this.state.satelliteMapEnabled
        this.setState({
            satelliteMapEnabled: newState
        })
    }
    toggleListing(idx){
        // const enabledListingsClone = [...this.state.enabledListings];
        // const index = enabledListingsClone.indexOf(idx)
        // if (index !== -1) {
        //     enabledListingsClone.splice(index, 1);
        //     this.setState({enabledListings: enabledListingsClone});
        // }
        // else {
        //     this.setState({
        //         enabledListings: this.state.enabledListings.concat(idx)
        //     })
        // }
        // const indexIsEnabled = this.state.enabledListing === idx
        // const newState = indexIsEnabled ? null : idx
        this.setState({
            enabledListing: idx
        })

    }
    render(){
        let mapSectionClasses = 'mapSection'
        mapSectionClasses += this.props.mapHeightLocked ? ' heightLocked' : ' heightNotLocked'

        let satelliteImageContainerClasses = 'satelliteImageContainer'
        satelliteImageContainerClasses += this.state.satelliteMapEnabled ? ' visible' : ''

        // const locationListings = this.props.configuration.locationListings
        const toggleBarText = this.state.satelliteMapEnabled ? this.props.configuration.map_location_view_text : this.props.configuration.map_satellite_view_text
        return(
            <>
                <section className={mapSectionClasses}>
                    <div className="mapBackground">
                        <img src={require('./images/map/map01.jpg').default} alt="" className='not-mobile map'/>
                        <img src={require('./images/map/map01_mobile.jpg').default} alt="" className='mobile-only map'/>
                        <div className={satelliteImageContainerClasses}>
                            <img src={require('./images/map/map02.jpg').default} alt="" className='not-mobile map'/>
                            <img src={require('./images/map/map02_mobile.jpg').default} alt="" className='mobile-only map'/>
                        </div>
                    </div>
                    <div className="mapMotionLogo">
                        <img src={require('./images/map/Motion_logo.gif').default} alt="" className="map not-mobile"/>
                        <img src={require('./images/map/Motion_logo_mobile_animateonce.gif').default} alt="" className="map mobile-only"/>
                    </div>
                    <div onClick={this.toggleMap.bind(this)} className="satelliteToggle vertical_toggle_column noSelect">
                        <div className="rotatedText noSelect">{toggleBarText}</div>
                    </div>
                    {/* <div className="mapSection__locationList">
                        {locationListings.map((amenity, idx) => {
                            const isActive = this.state.enabledListing === idx
                            const locationListingClasses =  isActive ? 'locationListing active' : 'locationListing'
                            const toggleSymbol = isActive ? '-' : '+'
                            return (
                            <div key={idx+'mapSectionLocationListing'} onClick={() => this.toggleListing(idx)}  className={locationListingClasses}>
                                <div className="titleDistanceWrapper">
                                    <div className="locationTitle">Lorem Ipsum</div>
                                    <div className="locationDistance">(10 mins)</div>
                                    <div className="toggleButton">{toggleSymbol}</div>
                                </div>
                                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </div>
                            )
                        })}
                    </div> */}
                </section>
            </>
        )
    }
}
class SlideVideoDiscover extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect startZoomedIn'

        let desktopVideoClasses = videoClasses + ' not-mobile'
        let mobileVideoClasses = videoClasses + ' mobile-only'

        let desktopVideoContainerClasses = videoContainerClasses + ' not-mobile'
        let mobilevideoContainerClasses = videoContainerClasses + ' mobile-only'
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={this.props.configuration.down_arrow_5}></img>
                    </div>
                }
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={desktopVideoContainerClasses}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${desktopVideoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
                            preload="metadata"
                            loop="true"
							>
							<source src='${this.props.configuration.background_video_discover}' type="video/mp4" />
							</video>`
						}}
                        />
				}
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={mobilevideoContainerClasses}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${mobileVideoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
                            preload="metadata"
                            loop="true"
							>
							<source src='${this.props.configuration.background_video_discover_mobile}' type="video/mp4" />
							</video>`
						}}
					/>
				}
            </>
        )
    }
}


class SlideContactForm extends Component {
    constructor(props) {
		super(props);
		this.state = {
			select2Activated: false,
		}
	}
    shouldComponentUpdate(nextProps, nextState){
        if(!this.state.select2Activated){
            return true //this will make sure we render the child component ContactForm to add select2
        }
        return false
    }
    activateSelect2State(){
        this.setState({
			select2Activated: true
		});
    }
    createHubspotForm(){
		const {createHubspotContactForm} = this.props;
		createHubspotContactForm();
    }
    contactFormCleared(){
		const {formCleared} = this.props;
		formCleared();
    }
    contactFormSubmitted(){
		const {formSubmitted} = this.props;
		formSubmitted();
    }
    openPrivacyPolicyModal(){
		const {showPrivacyPolicy} = this.props
		showPrivacyPolicy()
	}
    render(){
        const contactLogo = this.props.configuration.contact_logo
        const companyAddress = this.props.configuration.contact_address
        const companyName = this.props.configuration.company
        const agentName = this.props.configuration.agent_name
        const agentCompany = ''
        const agentPhoneNumber = this.props.configuration.phone_number
        const rightsReserved = this.props.configuration.copyright_disclaimer
        const buttonText = this.props.configuration.button_text_8
        const buttonLink = this.props.configuration.button_link_8
        return(
            <>
                <div className="contactPageWrapper">
                    {/* mobileVersion={this.props.mobileVersion} */}
                    <ContactForm formHeading={this.props.configuration.form_heading} activateSelect2State={this.activateSelect2State.bind(this)} select2Activated={this.state.select2Activated} createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} />
                    <div className="privacyPolicy not-mobile">
                        <div className="verticalLineContainer">
                            <div className="verticalLine" />
                        </div>
                        
                        <img className='logo' alt='logo' src={contactLogo}  />
                        <div className="contactInfo">
                            <div className="address">{companyAddress}</div>
                            <div className="address">{companyName}</div>
                            <div className="address">{agentName}</div>
                            <div className="address">{agentCompany}</div>
                            <div className="phone">{agentPhoneNumber}</div>
                            <div className="copyright">{rightsReserved}</div>
                            <a href='' target="_blank" onClick={this.openPrivacyPolicyModal.bind(this)} className="btn light">{buttonText}</a>
                        </div>
                    </div>
                    <div className="mobilePrivacyPolicy mobile-only">
                        <div className="contactInfo">
                            <div className="address">{companyAddress}</div>
                            <div className="address">{companyName}</div><br />
                            <div className="address">{agentName}</div>
                            <div className="address">{agentCompany}</div>
                            <a href='tel:2014007487'><div className="phone">{agentPhoneNumber}</div></a><br />
                            <div className="copyright">{rightsReserved}</div>
                            <a href='' target="_blank" onClick={this.openPrivacyPolicyModal.bind(this)}>{buttonText}</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
			// formSubmitted: '',
            select2Activated: false,
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	componentDidMount() {
		//This is a fix to detect changes on the select2
		$(this.refs.how_you_heard).on("change",  (e)=> {
			this.handleInputChange(e)
        })
        this.createHubspotForm()//this is used to create the form on load
	}
    componentDidUpdate(){
        if(!this.state.select2Activated) {

            const select2Exists = $.fn.select2
            const select2Initialized = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').hasClass("select2-hidden-accessible")
            const hubspotFormExists = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').length
            if(!select2Initialized && select2Exists && hubspotFormExists) {
                $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
                    placeholder: "How did you hear of us?*",
                    width: 'resolve',
                    minimumResultsForSearch: -1
                });
                const disabledOptionText = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217 option:disabled')[0].innerHTML
                $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
                    placeholder: disabledOptionText,
                    width: 'resolve',
                    minimumResultsForSearch: -1
                });
                this.setState({
                    select2Activated: true
                });
                this.handleSelect2Activation()
            }
        }
        
    }
    handleSelect2Activation(){
		const {activateSelect2State} = this.props;
		activateSelect2State();
    }
	createHubspotForm(){
		const {createHubspotContactForm} = this.props;
		createHubspotContactForm();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});

		console.log('changed')
	}

	handleSubmit() {
		this.setState ({
			// formSubmitted: true,
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
		});
		const {formSubmitted} = this.props;
		formSubmitted();
	}
	resetForm(){
		// this.setState ({
		// 	formSubmitted: null
		// })
		const {formCleared} = this.props;
		formCleared();
	}

	scrollToTop(){
		const {scrollToFirstSlide} = this.props
		scrollToFirstSlide()
	}

    render(){
		// let jQuery = $
		let contactFormClasses = 'contactForm';
		// if(this.state.formSubmitted){
		// 	contactFormClasses += ' submitted'
		// }
		// const select2Styles = {
		// 	width:"100%"
		// }
        
        return (
			<form className={contactFormClasses}>
				<div className="submittedFormOverlay">
					<div className="text">THANK YOU!</div>
					<div className="closeBtn" onClick={this.resetForm}>
						<img src={require('./images/form_close_btn.svg').default} />
					</div>
				</div>
				<div className='headline'>{this.props.formHeading}</div>
				<div className="hubspotFormWrapper" id='hubspotFormWrapper'>
				</div>
                <img className='mobile-only nriaLogo' src={require('./images/logos/NRLiving--White.png').default} alt="NRIA Logo" />
			</form>
		);
	}
}

class SlideNeighborhoodCommunity extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    render(){
        const heading_discover =  this.props.configuration.heading_discover
        const content_discover =  this.props.configuration.content_discover
        const left_image =  this.props.configuration.left_image
        return(
            <>
                <section className="neighborhoodCommunity">
                    <div className="left">
                        <img className='startZoomedIn' alt="neighborhood" src={left_image} />
                    </div>
                    <div className="right">
                        <div className="textGroup">
                            <h2>{heading_discover}</h2>
                            <div className="content_discover" dangerouslySetInnerHTML={{ __html: content_discover}} />
                        </div>
                        {/* <div className="button_container">
                            <div className="btn light">Lorem ipsum</div>
                            <div className="btn light">Lorem ipsum</div>
                        </div> */}
                    </div>
                </section>
            </>
        )
    }
}
class SlideHome extends Component {
    shouldComponentUpdate(){
        return false
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        return(
            <>
                <img className="animatedLogo" src={this.props.configuration.landing_center_logo.url} alt="" onClick={this.nextSlide.bind(this)} />
                <div className="downArrowContainer">
                    <img alt='Down Arrow' onClick={this.nextSlide.bind(this)} className="downArrow" src={this.props.configuration.down_arrow_1}></img>
                </div>
            </>
        )
    }
}

class SlideExteriorLightToggle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lightsOn: false,
            video: null
        }
        this.lightsOffVideo= this.props.configuration.background_video_no_light
    }
    shouldComponentUpdate(nextProps, nextState){
        const lightStateChanged = this.state.lightsOn !== nextState.lightsOn
        return lightStateChanged
    }
    toggleLights(){
        const newLightsState = !this.state.lightsOn
        this.setState({
            lightsOn: newLightsState
        })
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        videoContainerClasses += ' compact'
        // const videoContainerClassesLightsOn = videoContainerClasses + ' lightsOn'
        const videoContainerClassesLightsOff = videoContainerClasses + ' lightsOff'
        let videoClasses = 'background-video'
        let lightButtonText = this.state.lightsOn ? this.props.configuration.exteriorTurnOffText : this.props.configuration.exteriorTurnOnText
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffectRepeat startZoomedIn'
        
        let lightsMaskContainerClasses = this.state.lightsOn ? 'lightsMaskContainer on' : 'lightsMaskContainer off'

        const right_arrow_styles = {
            backgroundImage: 'url('+this.props.configuration.swipe_arrow_right_1+')'
        }
        const left_arrow_styles = {
            backgroundImage: 'url('+this.props.configuration.swipe_arrow_left_1+')',
            backgroundPosition: 'right'
        }
        return(
            <>
                <header className='fixed-header'>
                    <div className="hamburger">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="corner-logo-wrapper">
                        <div className="text">HOBOKEN HEIGHTS<div className="separator"></div></div>
                        <img alt="Hoboken Heights Logo" className="corner-logo" src={require('./images/logos/NIRMA_Logo_Symbol_Black.png').default} />
                    </div>
                    <div onClick={this.props.methods.goToContactSlide.bind(this)} className="inquiry-link">INQUIRE NOW</div>
                </header>
                <div onClick={this.toggleLights.bind(this)} className="toggleLights btn">{lightButtonText}</div>
                {
                    <div className={lightsMaskContainerClasses}>
                        <img className='lightsMask startZoomedIn videoZoomEffectRepeat' alt="" src={this.props.configuration.background_image_light} />
                    </div>
                }
                {
                        //Hide landingpage video on FFMobile because it will not autoplay
                        //Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={videoContainerClassesLightsOff}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src="${this.lightsOffVideo}" type="video/mp4" />
							</video>`
						}}
					/>
				}
                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
                            <div className='left_arrow_bouncing' style={left_arrow_styles} onClick={() => this.props.slideHorizontal('left')}/>
							<div className='uppercase' dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
                            <div className='right_arrow_bouncing' style={right_arrow_styles} onClick={() => this.props.slideHorizontal('right')}/>
						</h1>
					</div>
				}
            </>
        )
    }
}

class SlideFountainPen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newArrival: true,
        }
        // const 
        // this.throttleVideoParallax = _.throttle(parallaxVideo, 1);
        this.videoContainerRef = React.createRef()
    }
    shouldComponentUpdate(nextProps, nextState){
        const slidePresenceChanged = this.props.isCurrent !== nextProps.isCurrent
        return slidePresenceChanged
    }
    componentDidUpdate(){
        const isOnThisSlide = this.props.isCurrent
        const newArrival = this.state.newArrival
        if(isOnThisSlide && newArrival){
            this.replayVideo()
            this.setState({
                newArrival: false,
            })
        }
        else if(!isOnThisSlide && !newArrival){
            this.setState({
                newArrival: true,
            })
        }
    }
    lockingVideoPosition() {
        // const parentSelector = '.slideTemplate-fountainPen'
        // const textHeight = document.querySelector(parentSelector + ' .textSection').offsetHeight
        // const textHeightMarginTop = parseFloat(window.getComputedStyle(document.querySelector(parentSelector + ' .textSection')).marginTop)
        // const textTop = parseFloat(window.getComputedStyle(document.querySelector('.slideTemplate-fountainPen .textSection')).top)
        // const potentialHeight = textHeight + textHeightMarginTop + textTop
        // const videoHeight = document.querySelector(parentSelector + ' .background-video').clientHeight
        // const currentScrollDistance = document.querySelector(parentSelector).scrollTop;
        // const slideHeight = document.querySelector('.slideTemplate-fountainPen').offsetHeight
        // const scrolledPercent = currentScrollDistance/(potentialHeight - slideHeight)
        // const totalScrollDistance = potentialHeight - videoHeight
        // const videoTopPosition = scrolledPercent * totalScrollDistance
        // console.log(videoTopPosition)
        // // document.querySelector('.slideTemplate-fountainPen .videoContainer').style.top = videoTopPosition + 'px'
        // document.querySelector('.slideTemplate-fountainPen .videoContainer').style.transform = 'translateY('+videoTopPosition+'px)'
        // // window.getComputedStyle(document.querySelector('.slideTemplate-fountainPen .background-video')).top = scrolledPercent * totalScrollDistance
    }
    handleWheel(){
        this.lockingVideoPosition()
        // this.throttleVideoParallax()
    }
    replayVideo() {
        this.videoContainerRef.current.children[0].play()
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        // if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect'

        // let videoContainerClassesMobile = videoContainerClasses + ' mobile-only'
        // let videoContainerClassesDesktop = videoContainerClasses + ' not-mobile'
        let videoContainerClassesDesktop = videoContainerClasses
        // if(this.props.isCurrent) this.replayVideo()
        const videoSrc = this.props.configuration.background_video_property
        const mobileImgSrc = this.props.configuration.background_animated_property_image_mobile
        return(
            <> 
                {
                    <div onWheel={() =>this.handleWheel()}     className="textSection">
                        <div className="motionSignature mobile-only">
                            <img src={mobileImgSrc} alt="" />
                        </div>
                        <h2 dangerouslySetInnerHTML={{__html: this.props.configuration.heading_property}} />
                        <p dangerouslySetInnerHTML={{__html: this.props.configuration.content_property_1}} />
                        <p dangerouslySetInnerHTML={{__html: this.props.configuration.content_property_2}} />
                        <p dangerouslySetInnerHTML={{__html: this.props.configuration.content_property_3}} />
                        <div onClick={this.props.methods.goToContactSlide.bind(this)} className="btn dark">{this.props.configuration.button_text_1}</div>
                    </div>
                }
                
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
                        ref={this.videoContainerRef}
						className={videoContainerClassesDesktop}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src='${videoSrc}' type="video/mp4" />
							</video>`
						}}
					/>
                    
				}
            </>
        )
    }
}


class SlidePatio extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        const right_arrow_styles = {
            backgroundImage: 'url('+this.props.configuration.swipe_arrow_right_2+')'
        }
        const left_arrow_styles = {
            backgroundImage: 'url('+this.props.configuration.swipe_arrow_left_2+')',
            backgroundPosition: 'right'
        }
        
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffectRepeat startZoomedIn'
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={this.props.configuration.down_arrow_2}></img>
                    </div>
                }
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={videoContainerClasses}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src='/videos/NIRMA_2_Patio_High_Cinemagraphic.mp4' type="video/mp4" />
							</video>`
						}}
					/>
				}

                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
                            <div className='left_arrow_bouncing' style={left_arrow_styles} onClick={() => this.props.slideHorizontal('left')}/>
							<div className='uppercase' dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
                            <div className='right_arrow_bouncing' style={right_arrow_styles} onClick={() => this.props.slideHorizontal('right')}/>
						</h1>
					</div>
				}
                
            </>
        )
    }
}

class SlideAmenities extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    setAmenityDetail(idx){
        const {setAmenityOnGallerySlide} = this.props;
        setAmenityOnGallerySlide(idx);
    }
    handleWheelEvent = e => {
        const wheelAmt = e.deltaY
        const querySelector = '.amenities__details'
        const elementToDelegateScroll = document.querySelectorAll(querySelector)[0]
        this.props.methods.delegateScroll(wheelAmt, elementToDelegateScroll)
    }
    
    render(){
        const amenitiesListAdditionalClasses = this.props.configuration.amenitiesListAdditionalClasses
        const amenitiesDetailAdditionalClasses = this.props.configuration.amenitiesDetailAdditionalClasses
        let amenitiesListClasses = 'amenities__list ' 
        amenitiesListClasses += amenitiesListAdditionalClasses ? amenitiesListAdditionalClasses : ''
        let amenitiesDetailsClasses = 'amenities__details ' 
        amenitiesDetailsClasses += amenitiesDetailAdditionalClasses ? amenitiesDetailAdditionalClasses : ''
        return(
            <>
                <section className="amenities">
                    <div className="amenities__details_wrapper">
                        <div className={amenitiesDetailsClasses}>
                            <h2>{this.props.configuration.amenitiesResults.heading_amenities}</h2>
                            <p dangerouslySetInnerHTML={{ __html: this.props.configuration.amenitiesResults.content_amenity_1}} />
                            <p dangerouslySetInnerHTML={{ __html: this.props.configuration.amenitiesResults.content_amenity_2}} />
                            <div onClick={this.props.methods.goToContactSlide.bind(this)} className="btn dark">{this.props.configuration.amenitiesResults.button_text_2}</div>
                        </div>
                    </div>
                    <div onWheel={this.handleWheelEvent.bind(this)}  className={amenitiesListClasses}>
                        <ul>
                            <li onClick={() => this.setAmenityDetail(0)}>{this.props.configuration.amenitiesResults.amenity_heading_1}</li>
                            <li onClick={() => this.setAmenityDetail(1)}>{this.props.configuration.amenitiesResults.amenity_heading_2}</li>
                            <li onClick={() => this.setAmenityDetail(2)}>{this.props.configuration.amenitiesResults.amenity_heading_3}</li>
                            <li onClick={() => this.setAmenityDetail(3)}>{this.props.configuration.amenitiesResults.amenity_heading_4}</li>
                            <li onClick={() => this.setAmenityDetail(4)}>{this.props.configuration.amenitiesResults.amenity_heading_5}</li>
                            <li onClick={() => this.setAmenityDetail(5)}>{this.props.configuration.amenitiesResults.amenity_heading_6}</li>
                            <li onClick={() => this.setAmenityDetail(6)}>{this.props.configuration.amenitiesResults.amenity_heading_7}</li>
                            <li onClick={() => this.setAmenityDetail(7)}>{this.props.configuration.amenitiesResults.amenity_heading_8}</li>
                        </ul>
                    </div>
                </section>
            </>
        )
    }
}


class SlideAmenitiesGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descriptionVisible: false,
            image: null,
            image1IsNew: false,
            title_line1: ' ',//animation doesnt work without this
            rightArrowActive: false,
            leftArrowActive: false
        }
        
    }
    shouldComponentUpdate(nextProps, nextState){
        const amenityNameVisibilityChanged = this.state.amenityNameVisibility !== nextState.amenityNameVisibility
        const currIdxChanged = this.state.currIdx !== nextState.currIdx
        const descriptionChanged = this.state.description !== nextState.description
        const descriptionVisibleChanged = this.state.descriptionVisible !== nextState.descriptionVisible
        const image1Changed = this.state.image1 !== nextState.image1
        const image1IsNewChanged = this.state.image1IsNew !== nextState.image1IsNew
        const image2Changed = this.state.image2 !== nextState.image2
        const title_line1Changed = this.state.title_line1 !== nextState.title_line1
        const title_line2Changed = this.state.title_line2 !== nextState.title_line2
        const title_line3Changed = this.state.title_line3 !== nextState.title_line3
        const slidePresenceChanged = this.props.isCurrent !== nextProps.isCurrent
        const amenityChanged = amenityNameVisibilityChanged || currIdxChanged || descriptionChanged || descriptionVisibleChanged || image1Changed || image1IsNewChanged || image2Changed || title_line1Changed || title_line2Changed || title_line3Changed || slidePresenceChanged
        return amenityChanged
    }
    componentDidMount(){
        this.props.configuration.amenities.forEach((amenity) => {
            const img = new Image().src = amenity.image
        })
        this.setAmenityData(this.state.currIdx)
        this.setAmenityTitle()
    }
    componentDidUpdate(){
        const newIdxFromPropsHasChanged = this.props.isCurrent && this.state.lastPropsIdx !== this.props.idx
        if(newIdxFromPropsHasChanged) {
            this.setState({
                lastPropsIdx: this.props.idx,
            })
            this.setAmenityData(this.props.idx)
            // this.setAmenityTitle()//changed title too early when switching slides
        }
    }
    setAmenityData(newIdx){
        if(newIdx === this.state.currIdx) return

        //This is to fix horizontal touch event slides
        if(newIdx === -1) newIdx = this.props.configuration.amenities.length - 1
        else if(newIdx === this.props.configuration.amenities.length) newIdx = 0

        // const title_line1 = this.props.configuration.amenities[newIdx].title_line1
        // const title_line2 = this.props.configuration.amenities[newIdx].title_line2
        // const title_line3 = this.props.configuration.amenities[newIdx].title_line3
        // const description = this.props.configuration.amenities[newIdx].description
        const image = this.props.configuration.amenities[newIdx].image
        const image1IsNew = !this.state.image1IsNew
        this.setState({
            // description: description,
            currIdx: newIdx,
            image1IsNew: image1IsNew,
            amenityNameVisibility: false,
            descriptionVisible: false
        })
        if(image1IsNew){
            this.setState({
                image1: image,
            })
        }
        else {
            this.setState({
                image2: image,
            })
        }

        //Set newIdx on App component state
        const {setAmenityOnGallerySlide} = this.props;
        setAmenityOnGallerySlide(newIdx, false);
    }
    transitioningAmenityComplete = e => {
        if(e.animationName === 'fadeOut'){
            // console.log('faded Out')
            this.setAmenityTitle()
            this.setState({
                amenityNameVisibility: true
            })
        }
        else if(e.animationName === 'fadeInDriftUp') {
            // console.log('faded In drift up')
        }
    }
    setAmenityTitle(){
        const newIdx = this.state.currIdx
        if(typeof this.props.configuration.amenities[newIdx] == 'undefined') return
        const title_line1 = this.props.configuration.amenities[newIdx].title_line1
        const title_line2 = this.props.configuration.amenities[newIdx].title_line2
        const title_line3 = this.props.configuration.amenities[newIdx].title_line3
        const description = this.props.configuration.amenities[newIdx].description
        this.setState({
            title_line1: title_line1,
            title_line2: title_line2,
            title_line3: title_line3,
            description: description,
        });
    }
    toggleDetailDescription(){
        const newDescriptionState = !this.state.descriptionVisible
        this.setState({
            descriptionVisible: newDescriptionState
        })
    }
    changeAmenity(delta){
        const prevSlide = delta < 0
        let nextAmenity
        if(prevSlide){
            nextAmenity = this.state.currIdx === 0 ? this.props.configuration.amenities.length - 1 : this.state.currIdx - 1
        }
        else {
            nextAmenity = this.state.currIdx === this.props.configuration.amenities.length - 1 ? 0  : this.state.currIdx + 1
        }
        this.setAmenityData(nextAmenity)
    }
    animateRightArrowAndChangeAmenity(){
        this.setState({
            rightArrowActive: true
        })
        this.changeAmenity(1)
    }
    resetRightArrow(){
        this.setState({
            rightArrowActive: false
        })
    }
    animateLeftArrowAndChangeAmenity(){
        this.setState({
            leftArrowActive: true
        })
        this.changeAmenity(-1)
    }
    resetLeftArrow(){
        this.setState({
            leftArrowActive: false
        })
    }
    activateAmenity(dotIdx){
        this.setAmenityData(dotIdx)
    }
    render(){
        const toggleButtonSrc = this.state.descriptionVisible ? this.props.configuration.accordion_close_button : this.props.configuration.accordion_open_button
        
        const hasMoreInfoBtn = this.props.configuration.amenities[this.state.currIdx] && this.props.configuration.amenities[this.state.currIdx].moreInfoBtn
        
        let descriptionGradientClasses = 'amenities_gallery__description_gradient'
        descriptionGradientClasses += this.state.descriptionVisible ? ' visible' : ''
        
        let amenityNameAndDescriptionContainer = 'amenities_gallery__amenity_name_and_description_container'
        amenityNameAndDescriptionContainer += this.state.descriptionVisible ? ' visible' : ''
        
        
        let amenities_gallery_name_classes = 'amenities_gallery__name'
        amenities_gallery_name_classes += !this.state.amenityNameVisibility ? ' runFadeOutAnimation' : ' runFadeInAnimation'
        amenities_gallery_name_classes += this.state.descriptionVisible ? ' riseForDescription' : ''
        let amenities_gallery__more_info_classes = 'amenities_gallery__more_info'

        let rightArrowClasses = "amenities_gallery__arrow amenities_gallery__arrow--right"
        rightArrowClasses += this.state.rightArrowActive ? ' active' : ''
        
        let leftArrowClasses = "amenities_gallery__arrow amenities_gallery__arrow--left"
        leftArrowClasses += this.state.leftArrowActive ? ' active' : ''
        return (
            <>
                <section className="amenities_gallery">
                    <img onAnimationEnd={this.resetRightArrow.bind(this)} alt="Right Arrow" onClick={this.animateRightArrowAndChangeAmenity.bind(this)} className={rightArrowClasses} src={require('./images/amenities/rightArrow.svg').default} />
                    <img onAnimationEnd={this.resetLeftArrow.bind(this)} alt="Left Arrow" onClick={this.animateLeftArrowAndChangeAmenity.bind(this)} className={leftArrowClasses} src={require('./images/amenities/rightArrow.svg').default} />
                    {this.props.configuration.amenities.map((amenity, i) => {
                        let imageClasses = 'amenities_gallery__image'
                        imageClasses += i === this.state.currIdx ? ' active' : ''
                        return (<img key={i+'SlideAmenitiesGalleryImage'} alt="" src={amenity.image} className={imageClasses}  />)
                    })}
                        
                    <div className={amenities_gallery__more_info_classes}>
                        
                        <div className="amenities_gallery__more_info__dots">
                            {this.props.configuration.amenities.map((amenity, i) => {
                                let dotClasses = 'dot'
                                dotClasses += i === this.state.currIdx ? ' active' : ''
                                return (<div key={i+'SlideAmenitiesGalleryDot'} onClick={() => this.activateAmenity(i)} className={dotClasses} />)
                            })}
                        </div>
                        <div className={descriptionGradientClasses}>
                        </div>
                        <div className={amenityNameAndDescriptionContainer}>
                            <div className="amenities_gallery__amenity_name_and_description_wrapper">
                                <div className={amenities_gallery_name_classes}>
                                    <h3>
                                        {this.state.title_line1 && <span onAnimationEnd={this.transitioningAmenityComplete.bind(this)} >{this.state.title_line1}</span>}
                                        {this.state.title_line2 && <span>{this.state.title_line2}</span>}
                                        {this.state.title_line3 && <span>{this.state.title_line3}</span>}
                                        <img alt="" onClick={this.toggleDetailDescription.bind(this)} className="amenities_gallery__description_toggler" src={toggleButtonSrc} />
                                    </h3>
                                </div>
                                <p className='descriptionTextElement' dangerouslySetInnerHTML={{ __html: this.state.description}}></p>
                            </div>
                        </div>
                    </div>
                    {hasMoreInfoBtn && 
                        <div className="amenities_gallery__more_info_btn btn">More Info</div>
                    }
                </section>
            </>
        )
    }
}

class SlideViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSliderValue: 0,
            activeView: null,
            image: null,
            previousActiveKey: null
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const viewChanged = this.state.activeView !== nextState.activeView
        const sliderChanged = this.state.timeSliderValue !== nextState.timeSliderValue
        const isTransitioningChanged = this.state.isTransitioning !== nextState.isTransitioning
        const isMobileDeviceChanged = this.props.isMobileDevice !== nextProps.isMobileDevice

        return viewChanged || sliderChanged || isTransitioningChanged || isMobileDeviceChanged
    }
    componentDidMount(){
        // this.props.configuration.views.forEach((view) => {
        //     const img = new Image().src = require('./'+view.image).default
        // })
        this.setNewTime(0)
    }
    handleTimeChange(event){
        const rangeValue = event.target.value
        if(rangeValue === this.state.activeView ) return
        if(this.isInt(rangeValue)){
            //when the user is dragging thumb and ends up exactly on an int value, not a float. setting time here caused problems on desktop
            // this.setNewTime(rangeValue)
        }
        else {
            this.setState({
                timeSliderValue: rangeValue
            })
        }
    }
    handleMouseUp(event){
        const rangeValue = event.target.value
        let newTime
        if(!this.isInt(rangeValue)){
            newTime = Math.round(rangeValue)
        }
        else newTime = parseInt(rangeValue)
        this.setNewTime(newTime)
    }
    isInt(n) {
        return n % 1 === 0;
    }
    setNewTime(key){
        this.setState({
            timeSliderValue: key,
        })
        const previousKey = this.state.activeView
        if(key === previousKey) {
            console.log('same as previous')
            return
        }
        this.setState({
            activeView: key,
            previousActiveKey: previousKey,
            isTransitioning: true
        })
    }
    handleTransitionEnd  = e => {
        this.setState({
            isTransitioning: false,
            previousActiveKey: null
        })
    }
    render(){
        const mapped_images_classes = 'views_section__image startZoomedIn'
        const activeImageKey = this.state.activeView
        const isTransitioning = this.state.isTransitioning
        const views_section__bottom_classes = isTransitioning ? 'views_section__bottom isTransitioning' : 'views_section__bottom'
        const firefoxOrient = this.props.isMobileDevice ? 'vertical' : 'horizontal'
        return(
            <>
                <section className="views_section">
                    <div className="views_section__top">
                        <h2>{this.props.configuration.heading_the_view}</h2>
                        <p dangerouslySetInnerHTML={{ __html: this.props.configuration.content_the_view}}></p>
                    </div>
                    <div className={views_section__bottom_classes}>
                        {this.props.configuration.views &&
                            <>
                                {this.props.configuration.views.map((view, i) => {
                                    const isActiveImage = i === activeImageKey
                                    const isPreviouslyActiveImage = i === this.state.previousActiveKey
                                    let imageClasses = mapped_images_classes
                                    if(isActiveImage) imageClasses = mapped_images_classes + ' active'
                                    else if(isPreviouslyActiveImage) imageClasses = mapped_images_classes + ' previouslyActive'
                                    const imageClassesDesktop = imageClasses + ' not-mobile'
                                    const imageClassesMobile = imageClasses + ' mobile-only'
                                    return (<div key={i + 'viewsSectionTimeSliderImageWrapper'} className="views_section__timeSlider_image_wrapper">
                                        <img key={i+'viewsSectionTimeSliderImage'} alt={view.displayTime} src={view.image} className={imageClassesDesktop} onTransitionEnd={this.handleTransitionEnd.bind(this)} />
                                        <img key={i+'viewsSectionTimeSliderImageMobile'} alt={view.displayTime} src={view.imageMobile} className={imageClassesMobile} onTransitionEnd={this.handleTransitionEnd.bind(this)} />
                                    </div>)
                                })}       
                            </>
                        }
                        <div className="views_section__timeSlider">
                            <input onMouseUp={this.handleMouseUp.bind(this)} onTouchEnd={this.handleMouseUp.bind(this)} onChange={this.handleTimeChange.bind(this)} type="range" min="0" max={this.props.configuration.views.length - 1} step="0.005" value={this.state.timeSliderValue} orient={firefoxOrient}/>
                            <ul className="views_section__timeList">
                                {this.props.configuration.views.map((view, i) => {
                                    const listClasses = i === this.state.activeView ? 'active' : ''
                                    return (<li onClick={() => this.setNewTime(i)} className={listClasses} key={i+'viewsSectionTimeSliderTime'}>{view.displayTime} <span className='ampm'>{view.ampm}</span></li>)
                                })}
                            </ul>
                            <div className="visibleSliderLine"></div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

class SlideResidencePenthouse extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    setResidencePenthousePath = option => {
        const {setResidencePenthousePath} = this.props;
        setResidencePenthousePath(option);
    }
    render(){
        return(
            <>
                <div onClick={() => this.setResidencePenthousePath('residence')} className="btn">{this.props.configuration.residences_button_text}</div>
                <div onClick={() => this.setResidencePenthousePath('penthouse')} className="btn">{this.props.configuration.penthouse_button_text}</div>
            </>
        )
    }
}

class SlideResidencePenthouseFullscreen extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const residencePenthouseChanged = nextProps.residencePenthouse !== this.props.residencePenthouse
        return residencePenthouseChanged
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        const penthouseChosen = this.props.residencePenthouse === 'penthouse'
        let penthouseImageClasses = 'residencePenthouseFullscreenImage penthouse'
        let residenceImageClasses = 'residencePenthouseFullscreenImage residence'
        penthouseImageClasses += !penthouseChosen ? ' hidden' : ''
        residenceImageClasses += penthouseChosen ? ' hidden' : ''

        
        const residencePenthouseDownArrow = penthouseChosen ? this.props.configuration.down_arrow_3.url : this.props.configuration.down_arrow_4.url
        const residencePenthouseSwipeText = penthouseChosen ? this.props.configuration.swipe_text_mobile_3 : this.props.configuration.swipe_text_mobile_4
        const residencePenthouseSwipeArrowLeft = penthouseChosen ? this.props.configuration.swipe_arrow_left_3.url : this.props.configuration.swipe_arrow_left_4.url
        const residencePenthouseSwipeArrowRight = penthouseChosen ? this.props.configuration.swipe_arrow_right_3.url : this.props.configuration.swipe_arrow_right_4.url

        const right_arrow_styles = {
            backgroundImage: 'url('+residencePenthouseSwipeArrowRight+')'
        }
        const left_arrow_styles = {
            backgroundImage: 'url('+residencePenthouseSwipeArrowLeft+')',
            backgroundPosition: 'right'
        }
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={residencePenthouseDownArrow}></img>
                    </div>
                }
                <div className="fullscreenImageWrapper">
                    <img className={penthouseImageClasses} alt="" src={this.props.configuration.background_image_penthouse} />
                    <img className={residenceImageClasses} alt="" src={this.props.configuration.background_image_residences} />
                </div>
                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
                            <div className='left_arrow_bouncing' style={left_arrow_styles} onClick={() => this.props.slideHorizontal('left')}/>
							<div className='uppercase' dangerouslySetInnerHTML={{ __html: residencePenthouseSwipeText}} />
                            <div className='right_arrow_bouncing' style={right_arrow_styles} onClick={() => this.props.slideHorizontal('right')}/>
						</h1>
					</div>
				}
            </>
        )
    }
}

class SlideResidencePenthouseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageExpanded: false,
            currIdx: 0,
            prevIdx: null,
            isTransitioning: null,
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        const imageExpandedChanged = this.state.imageExpanded !== nextState.imageExpanded
        const currIdxChanged = nextState.currIdx !== this.state.currIdx
        const prevIdxChanged = nextState.prevIdx !== this.state.prevIdx
        const residencePenthouseChanged = nextProps.residencePenthouse !== this.props.residencePenthouse
        return imageExpandedChanged || currIdxChanged || residencePenthouseChanged || prevIdxChanged
    }
    handleWheelEvent = e => {
        const wheelAmt = e.deltaY
        const querySelector = '.residencePenthouseDetail__details'
        const elementToDelegateScroll = document.querySelectorAll(querySelector)[0]
        this.props.methods.delegateScroll(wheelAmt, elementToDelegateScroll, this.state.imageExpanded)
    }
    toggleImageExpansion(){
        const newImageState = !this.state.imageExpanded
        this.setState({
            imageExpanded: newImageState
        })
    }
    activateImage(idx){
        const isSameIdx = this.state.currIdx === idx
        const prevIdxNotYetDeactivated = this.state.prevIdx !== null
        if(this.state.isTransitioning || isSameIdx || prevIdxNotYetDeactivated) return false
        const prevIdx = this.state.currIdx
        this.setState({
            currIdx: idx,
            prevIdx: prevIdx,
            isTransitioning: true
        })
    }
    handleImageTransitionEnd(idx){
        this.setState({
            prevIdx: null,
            isTransitioning: false
        })
    }
    render(){
        const headerTheme = this.props.configuration.headerTheme//this is used to create unique keys between the two different components
        const imageIsExpanded = this.state.imageExpanded
        let details_classes = 'residencePenthouseDetail'
        details_classes += imageIsExpanded ? ' expandImage' : ''
        const isPenthouse = this.props.residencePenthouse === 'penthouse'
        
        const penthouse_gallery = this.props.configuration.penthouse_gallery
        const residences_gallery = this.props.configuration.residences_gallery
        const page_title = isPenthouse ? this.props.configuration.heading_penthouse : this.props.configuration.heading_residences
        const page_description = isPenthouse ? this.props.configuration.content_1_penthouse : this.props.configuration.content_1_residences
        const features_heading = isPenthouse ? this.props.configuration.features_heading_penthouse : this.props.configuration.features_heading_residences
        const features_list = isPenthouse ? this.props.configuration.penthouse_features : this.props.configuration.residences_features
        const button_text = isPenthouse ? this.props.configuration.button_text_4 : this.props.configuration.button_text_3
        const left_arrow = isPenthouse ? this.props.configuration.left_arrow_2 : this.props.configuration.left_arrow_1
        const toggleExpansionMinus = isPenthouse ? this.props.configuration.penthouse_gallery_contract : this.props.configuration.residences_gallery_contract
        const toggleExpansionPlus = isPenthouse ? this.props.configuration.penthouse_gallery_expand : this.props.configuration.residences_gallery_expand

        let imageContainerClasses = 'residencePenthouseDetail__image_container '
        imageContainerClasses += this.props.configuration.imageContainerAdditionalClasses ? this.props.configuration.imageContainerAdditionalClasses : ''
        let residencePenthouseDetailsClasses = 'residencePenthouseDetail__details '
        residencePenthouseDetailsClasses += this.props.configuration.imageDetailsAdditionalClasses ? this.props.configuration.imageDetailsAdditionalClasses : ''
        let residencePenthouseDotsClasses = 'residencePenthouseDetail__dots '
        residencePenthouseDotsClasses += this.props.configuration.imageDotsAdditionalClasses ? this.props.configuration.imageDotsAdditionalClasses : ''
        const penthouseDotsClasses = !isPenthouse ? residencePenthouseDotsClasses + ' hidden' : residencePenthouseDotsClasses
        const residenceDotsClasses = isPenthouse ? residencePenthouseDotsClasses + ' hidden' : residencePenthouseDotsClasses
        let penthouseFullscreenImageWrapperClasses = "fullscreenImageWrapper"
        let residenceFullscreenImageWrapperClasses = "fullscreenImageWrapper"
        penthouseFullscreenImageWrapperClasses += !isPenthouse ? ' hidden' : ''
        residenceFullscreenImageWrapperClasses += isPenthouse ? ' hidden' : ''
        return(
            <>
                <section className={details_classes}>
                    <div className={residencePenthouseDetailsClasses}>
                        <h2>{page_title}</h2>
                        <p dangerouslySetInnerHTML={{__html: page_description}} />
                        <div className="residencePenthouseDetail__features_list_heading_wrapper">
                            <div className="heading">{features_heading}</div>
                            <div className="residencePenthouseDetail__features_list_wrapper" dangerouslySetInnerHTML={{__html: features_list}} />
                        </div>
                        <div className="residencePenthouseDetail__arrow_button_container">
                            <div className="leftArrowContainer">
                                <img alt='Left Arrow' className="leftArrow" src={left_arrow}></img>
                            </div>
                            <div onClick={this.props.methods.goToContactSlide.bind(this)} className="btn light">{button_text}</div>
                        </div>
                    </div>
                    <div onWheel={this.handleWheelEvent.bind(this)} className={imageContainerClasses}>
                        <div onClick={this.toggleImageExpansion.bind(this)} className="residencePenthouseDetail__expand_toggler vertical_toggle_column">
                            {imageIsExpanded && 
                                <div><img src={toggleExpansionMinus} alt="minus"/></div>
                            }
                            {!imageIsExpanded && 
                                <div><img src={toggleExpansionPlus} alt="plus"/></div>
                            }
                        </div>
                        <div className={penthouseFullscreenImageWrapperClasses}>
                            {penthouse_gallery.map((image, i) => {
                                let imgClasses = 'fullscreenImage'
                                imgClasses += i === this.state.currIdx ? ' active' : ''
                                imgClasses += i === this.state.prevIdx ? ' deactivating' : ''
                                return (
                                    <img key={i+'penthouseDetailFullscreenImage'} onTransitionEnd={() => this.handleImageTransitionEnd(i)} className={imgClasses} src={image.url} alt="Residence Penthouse"/>
                                )
                            })}
                        </div>
                        <div className={residenceFullscreenImageWrapperClasses}>
                            {residences_gallery.map((image, i) => {
                                let imgClasses = 'fullscreenImage'
                                imgClasses += i === this.state.currIdx ? ' active' : ''
                                imgClasses += i === this.state.prevIdx ? ' deactivating' : ''
                                return (
                                    <img key={i+'residenceDetailFullscreenImage'} onTransitionEnd={() => this.handleImageTransitionEnd(i)} className={imgClasses} src={image.url} alt="Residence Penthouse"/>
                                )
                            })}
                        </div>
                    </div>
                    <div className={penthouseDotsClasses}>
                        {penthouse_gallery.map((image, i) => {
                            let dotClasses = 'dot'
                            dotClasses += i === this.state.currIdx ? ' active' : ''
                            return (<div key={i+'penthouseDetailDot' + headerTheme} onClick={() => this.activateImage(i)} className={dotClasses} />)
                        })}
                    </div>
                    <div className={residenceDotsClasses}>
                        {residences_gallery.map((image, i) => {
                            let dotClasses = 'dot'
                            dotClasses += i === this.state.currIdx ? ' active' : ''
                            return (<div key={i+'renthouseDetailDot' + headerTheme} onClick={() => this.activateImage(i)} className={dotClasses} />)
                        })}
                    </div>
                </section>
            </>
        )
    }
}




class SlideAvailability extends Component {
    constructor(props) {
		super(props);
		this.state = {
			select2Activated: false,
		}
	}
    shouldComponentUpdate(nextProps, nextState){
        // const select2ActivatedChanged = this.state.select2Activated != nextState.select2Activated
        const select2Exists = $.fn.select2
        const select2Activated = this.state.select2Activated
        
        return select2Exists && !select2Activated
    }
    componentDidUpdate(){
        if(!this.state.select2Activated) {

            const select2Exists = $.fn.select2
            const select2Initialized = $('#availabilityFloorPlansDropdown').hasClass("select2-hidden-accessible")
            // const hubspotFormExists = $('#availabilityFloorPlansDropdown').length
            if(!select2Initialized && select2Exists) {
                // $('#availabilityFloorPlansDropdown').select2({
                    // placeholder: "How did you hear of us?*",
                    // width: 'resolve',
                    // minimumResultsForSearch: -1
                    $('#availabilityFloorPlansDropdown').select2({
                        minimumResultsForSearch: -1
                    });
                    $('#availabilityCollectionDropdown').select2({
                        minimumResultsForSearch: -1
                    });
                // const disabledOptionText = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217 option:disabled')[0].innerHTML
                // $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
                //     placeholder: disabledOptionText,
                //     width: 'resolve',
                //     minimumResultsForSearch: -1
                // });
                this.setState({
                    select2Activated: true
                });
                // this.handleSelect2Activation()
            }
        }
        
    }
    render(){
        
        return(
            <>
                <section className='availability'>
                    <h2>{this.props.configuration.availabilityHeadline}</h2>
                    <p className="availabilityDescription" dangerouslySetInnerHTML={{ __html: this.props.configuration.availabilityText}} />
                    <div className="availabilityDropdownWrapper">
                        <div className="availabilityDropdownElement">
                            <div className="availabilityDropdownLabel">{this.props.configuration.availabilityFloorplansLabel}</div>
                            <select className="availabilityDropdown" id="availabilityFloorPlansDropdown">
                                {this.props.configuration.availabilityFloorplansOptions.map((option, i) => {
                                    return (<option key={i+'floorPlanOption'} value={option.choice}>{option.choice}</option>)
                                })}
                            </select>
                        </div>
                        <div className="availabilityDropdownElement">
                            <div className="availabilityDropdownLabel">{this.props.configuration.availabilityCollectionLabel}</div>
                            <div className="availabilityDropdown">
                                <select className="availabilityDropdown" id="availabilityCollectionDropdown">
                                    {this.props.configuration.availabilityCollectionOptions.map((option, i) => {
                                        return (<option key={i+'collectionOption'} value={option.choice}>{option.choice}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="availabilityApartmentContainer">
                        {this.props.configuration.apartment_result.map((apartment, i) => {
                            
                            return (
                                <div className="apartment" key={i + 'apartment'}>
                                    <div className="apartment__title">{apartment.title.rendered}</div>
                                    <div className="apartment__floorPlan">
                                        <img src={require('../assets/images/availabilityFloorPlanExample.png').default} className="apartment__floorPlanImage" alt="" />
                                        <img src={leftArrowBlack} className="magnifyingGlass" alt="Magnifying Glass" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <div className="availabilityModalPopup">
                    <header className='fixed-header'>
                        <div className="hamburger">
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                        <div className="corner-logo-wrapper">
                            <div className="text">HOBOKEN HEIGHTS<div className="separator"></div></div>
                            <img alt="Hoboken Heights Logo" className="corner-logo" src={require('./images/logos/NIRMA_Logo_Symbol_Black.png').default} />
                        </div>
                        <div className="inquiry-link">X</div>
                    </header>
                    <img src={require('../assets/images/availabilityFloorPlanExample.png').default} className="apartment__floorPlanImage" alt="" />
                </div>
            </>
        )
    }
}

class SlideDevelopmentTeam extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    render(){
        let textGroupClasses = 'textGroup '
        textGroupClasses += this.props.configuration.textGroupAdditionalClasses ? this.props.configuration.textGroupAdditionalClasses : ''
        let rightSideClasses = 'right '
        rightSideClasses += this.props.configuration.rightSideAdditionalClasses ? this.props.configuration.rightSideAdditionalClasses : ''
        let buttonGroupClasses = 'developmentTeam__button_group '
        buttonGroupClasses += this.props.configuration.buttonGroupAdditionalClasses ? this.props.configuration.buttonGroupAdditionalClasses : ''
        
        const heading_team_story = this.props.configuration.developmentTeamFields.heading_team_story
        const content_1_team_story = this.props.configuration.developmentTeamFields.content_1_team_story
        const secondary_heading_team_story = this.props.configuration.developmentTeamFields.secondary_heading_team_story
        const content_2_team_story = this.props.configuration.developmentTeamFields.content_2_team_story
        const content_3_team_story = this.props.configuration.developmentTeamFields.content_3_team_story
        const button_text_5 = this.props.configuration.developmentTeamFields.button_text_5
        const button_link_5 = this.props.configuration.developmentTeamFields.button_link_5
        const button_text_6 = this.props.configuration.developmentTeamFields.button_text_6
        const button_link_6 = this.props.configuration.developmentTeamFields.button_link_6
        const button_text_7 = this.props.configuration.developmentTeamFields.button_text_7
        const button_link_7 = this.props.configuration.developmentTeamFields.button_link_7
        const team_story_video = this.props.configuration.developmentTeamFields.team_story_video
        const nria_logo = this.props.configuration.developmentTeamFields.nria_logo
        const copyright_text = this.props.configuration.developmentTeamFields.copyright_text
        return(
            <section className='developmentTeam'>
                <div className='left'>
                    <div className={textGroupClasses}>
                        <h2 className='developmentTeam__page_title'>{heading_team_story}</h2>
                        <p className='developmentTeam__paragraph' dangerouslySetInnerHTML={{ __html: content_1_team_story}} />
                        <div className="developmentTeam__headline">{secondary_heading_team_story}</div>
                        <p className='developmentTeam__paragraph' dangerouslySetInnerHTML={{ __html: content_2_team_story}} />
                        <p className='developmentTeam__paragraph' dangerouslySetInnerHTML={{ __html: content_3_team_story}} />
                    </div>
                    <div className={buttonGroupClasses}>
                        <a href={button_link_5} target="_blank" className="btn light" rel="noreferrer">{button_text_5}</a>
                        <a href={button_link_6} target="_blank" className="btn light" rel="noreferrer">{button_text_6}</a>
                        <a href={button_link_7} target="_blank" className="btn light" rel="noreferrer">{button_text_7}</a>
                    </div>
                </div>
                <div className={rightSideClasses}>
                    <h2 className='developmentTeam__page_title invisible'>{heading_team_story}</h2>
                    <div className="video" style={{padding:'56.25% 0 0 0',position:'relative'}} dangerouslySetInnerHTML={{ __html: team_story_video}} />
                    {/* <div className="video" >
                        <div style={{padding:'56.25% 0 0 0',position:'relative'}}><iframe title='Development Video' src="https://player.vimeo.com/video/459377741?color=ffffff&title=0&byline=0&portrait=0" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100%'}} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
                    </div> */}
                    <div className="developmentTeam__copyright_logo_container">
                        <div className="copyright">{copyright_text}</div>
                        <div className="nriaLogo">
                            <img alt="NRIA Logo" src={nria_logo} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class SlideFounders extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    render(){
        const founderImage = this.props.configuration.founderImage
        const founderHeadline = this.props.configuration.founderHeadline
        const founderTagline = this.props.configuration.founderTagline
        const founderBenefits = this.props.configuration.founderBenefits
        return(
            <>
                <div className="founderSlideContainer">
                    <img className="founderImage" src={founderImage} alt=""/>
                    <div className="founderSlideWrapper">
                    {founderHeadline &&
                        <h2 className="founderHeadline">{founderHeadline}</h2>
                    }
                    {founderTagline &&
                        <p className="founderTagline">{founderTagline}</p>
                    }
                    {founderBenefits &&
                        <div className="founderBenefits">
                            {Object.entries(founderBenefits).map(([key, value]) => {
                                return(
                                <div key={key+'founderBenefit'} className="benefitPair">
                                    <div className="count">{parseInt(key)+1}</div>
                                    <div className="benefit">{value.items}</div>
                                </div>
                                )
                            })}
                        </div>
                    }
                    </div>
                </div>
            </>
        )
    }
}

export default Slide;