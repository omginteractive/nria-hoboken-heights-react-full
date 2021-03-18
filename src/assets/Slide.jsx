import {Component} from 'react';
import React from 'react';
import animatedLogo from '../assets/images/Motion_logo.gif';
import downArrow from '../assets/images/downarrow.svg';
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
                    <SlideResidencePenthouse setResidencePenthousePath={this.setResidencePenthousePath.bind(this)} methods={slideMethods}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseFullscreen' &&
                    <SlideResidencePenthouseFullscreen mobileArrows={mobileArrows} residencePenthouse={this.props.residencePenthousePath}  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseDetail' &&
                    <SlideResidencePenthouseDetail mobileArrows={mobileArrows} methods={slideMethods} residencePenthouse={this.props.residencePenthousePath} configuration={slideObj}  />
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

        const locationListings = this.props.configuration.locationListings

        const toggleBarText = this.state.satelliteMapEnabled ? 'Location View' : 'Satellite View'
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
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
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
							<source src='/videos/NRIMA_SITE_VIDEO DISCOVER.mp4' type="video/mp4" />
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
							<source src='/videos/NRIMA_SITE_VIDEO DISCOVER Mobile.mp4' type="video/mp4" />
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
        const contactLogo = 'images/logos/NRLiving.png'
        const companyAddress = '1300 Manhattan Avenue Union City, NJ 07087'
        const companyName = 'Manhattan Avenue Capital 1300, LLC'
        const agentName = 'Richard Stabile'
        const agentCompany = ''
        const agentPhoneNumber = '201-400-7487'
        const rightsReserved = '© 2020 Hoboken Heights. All rights reserved.'
        const buttonText = 'Privacy Policy'
        return(
            <>
                <div className="contactPageWrapper">
                    {/* mobileVersion={this.props.mobileVersion} */}
                    <ContactForm activateSelect2State={this.activateSelect2State.bind(this)} select2Activated={this.state.select2Activated} createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} />
                    <div className="privacyPolicy not-mobile">
                        <div className="verticalLineContainer">
                            <div className="verticalLine" />
                        </div>
                        
                        <img className='logo' alt='logo' src={require('./'+contactLogo).default}  />
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
                            <div className="address">1300 Manhattan Avenue Union City, NJ 07087</div>
                            <div className="address">Manhattan Avenue Capital 1300, LLC</div><br />
                            <div className="address">Richard Stabile</div>
                            <div className="address">RE/MAX Real Estate Limited</div>
                            <a href='tel:2014007487'><div className="phone">201-400-7487</div></a><br />
                            <div className="copyright">© 2020 Hoboken Heights. All rights reserved.</div>
                            <a target="_blank" onClick={this.openPrivacyPolicyModal.bind(this)}>Privacy Policy</a>
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
				<div className='headline'>FOR INFORMATION PLEASE FILL THE FORM BELOW</div>
				<div className="hubspotFormWrapper" id='hubspotFormWrapper'>
				</div>
                <img className='mobile-only nriaLogo' src={require('./images/logos/NRLiving--White.png').default} />
			</form>
		);
	}
}

class SlideNeighborhoodCommunity extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false
    }
    render(){
        return(
            <>
                <section className="neighborhoodCommunity">
                    <div className="left">
                        <img className='startZoomedIn' alt="neighborhood" src={require('./images/neighborhood.png').default} />
                    </div>
                    <div className="right">
                        <div className="textGroup">
                            <h2>Hoboken Heights Neighborhood and Community</h2>
                            <p>People looking to buy homes in Hoboken or Jersey City often look up the hill and ask, “What’s up there?” </p>
                            <p>Union City is situated on top of the ridge of the lower Hudson Palisades, a line of steep cliffs along the west side of the lower Hudson River in Northeastern New Jersey. Hoboken Heights is a new gated community being built on a Palisade cliff, perfect for people looking for high quality housing while staying closely connected to Manhattan. </p>
                            <p>Every luxury condominium in Hoboken Heights will offer expansive views of the New York skyline and Hudson River. Breathtaking views! You’ll be close to Manhattan but with a view of the New York skyline that you can’t get in Manhattan. </p>
                            <p>Hoboken Heights is a short distance away from the western mouth of the Lincoln Tunnel, putting you closer to Times Square than anywhere you could live in Brooklyn. </p>
                            <p>Union City is compact in size, just 1.29 square miles, and has a population around 68,000, but features a good number of parks, including Firefighter’s Memorial Park on Palisade Avenue. It has a Walk Score of 96 and Transit Score of 80, making it easy to get around locally in addition to quick access to Manhattan.</p>
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
        const videoSrc = this.props.configuration.background_video_property.url
        return(
            <> 
                {
                    <div onWheel={() =>this.handleWheel()}     className="textSection">
                        <div className="motionSignature mobile-only">
                            <img src={require('./images/Motion_signature_animateonce.gif').default} alt="" />
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
            const img = new Image().src = require('./'+amenity.image).default
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
        
        const descriptionStyles = {
            // backgroundImage: 'url('+require('./images/amenities/blackgradient.png').default+')',
        }

        let image1_classes = 'amenities_gallery__image '
        image1_classes += this.state.image1IsNew ? 'new' : 'old'
        let image2_classes = 'amenities_gallery__image '
        image2_classes += !this.state.image1IsNew ? 'new' : 'old'
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
                    <img alt="" src={this.state.image1 && require('./'+this.state.image1).default} className={image1_classes}  />
                    <img alt="" src={this.state.image2 && require('./' + this.state.image2).default} className={image2_classes}  />
                    <div className={amenities_gallery__more_info_classes}>
                        
                        <div className="amenities_gallery__more_info__dots">
                            {this.props.configuration.amenities.map((amenity, i) => {
                                let dotClasses = 'dot'
                                dotClasses += i === this.state.currIdx ? ' active' : ''
                                return (<div key={i+'SlideAmenitiesGalleryDot'} onClick={() => this.activateAmenity(i)} className={dotClasses} />)
                            })}
                        </div>
                        <div className={descriptionGradientClasses} style={descriptionStyles}>
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
                                <p className='descriptionTextElement'>{this.state.description}</p>
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
                                    return (<img key={i+'viewsSectionTimeSliderImage'} alt={view.displayTime} src={view.image} className={imageClasses} onTransitionEnd={this.handleTransitionEnd.bind(this)} />)
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
                <div onClick={() => this.setResidencePenthousePath('residence')} className="btn">Residences</div>
                <div onClick={() => this.setResidencePenthousePath('penthouse')} className="btn">Penthouses</div>
            </>
        )
    }
}

class SlideResidencePenthouseFullscreen extends Component {
    constructor(props) {
        super(props)
        this.penthouseImage = 'images/penthouse/penthousebed.png'
        this.residenceImage = 'images/residence/residence.png'
    }
    shouldComponentUpdate(nextProps, nextState){
        const residencePenthouseChanged = nextProps.residencePenthouse !== this.props.residencePenthouse
        return residencePenthouseChanged
    }
    componentDidMount(){
        //preload images
        new Image().src = require('./'+this.penthouseImage).default
        new Image().src = require('./'+this.residenceImage).default
        
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        const fullscreenImage = this.props.residencePenthouse === 'penthouse' ? this.penthouseImage : this.residenceImage
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
                    </div>
                }
                <div className="fullscreenImageWrapper">
                    <img className='residencePenthouseFullscreenImage' alt="" src={require('./'+fullscreenImage).default} />
                </div>
                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
							{this.props.configuration.mobileContent.centerBottom.line1LeftArrowBouncing && this.props.mobileArrows.left_arrow_bouncing}
							<div dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
							{this.props.configuration.mobileContent.centerBottom.line1RightArrowBouncing && this.props.mobileArrows.right_arrow_bouncing}
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
        this.toggleExpansionMinus = 'images/toggleExpansion-.svg'
        this.toggleExpansionPlus = 'images/toggleExpansion+.svg'
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
        
        const images = isPenthouse ? this.props.configuration.penthouseDetailImages : this.props.configuration.residenceDetailImages
        const page_title = isPenthouse ? 'Exclusive Luxury Penthouses' : 'Our Residences'
        const page_description = isPenthouse ? 'The Penthouse condominium units at Hoboken Heights offer the most spectacular panoramic views of the Hudson River and New York City skyline. Whether you’re cooking in the kitchen with chef’s grade appliances, eating in the open dining area, or relaxing in the living room, that panoramic view will be all around you. Top-of-the-line finishes in our bedrooms and bathrooms will ensure your total comfort and ease. You’ll have plenty of options to design your living space to be perfect for you.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        const featuresArray = isPenthouse ? [
            'Panoramic views of the New York City skyline ',
            'Spacious open plan living ',
            '4 Bedrooms, 4.5 Bathrooms ',
            'High-end appliances ',
            'Two-car garage with private elevator ',
            'Expansive glass-enclosed terrace ',
            'Optional smart home technology',
            ] : 
            [
                'Residence Panoramic views of the New York City skyline ',
                'Spacious open plan living ',
                '4 Bedrooms, 4.5 Bathrooms ',
                'High-end appliances ',
                'Two-car garage with private elevator ',
                'Expansive glass-enclosed terrace ',
                'Optional smart home technology',
            ]
        let imageContainerClasses = 'residencePenthouseDetail__image_container '
        imageContainerClasses += this.props.configuration.imageContainerAdditionalClasses ? this.props.configuration.imageContainerAdditionalClasses : ''
        let residencePenthouseDetailsClasses = 'residencePenthouseDetail__details '
        residencePenthouseDetailsClasses += this.props.configuration.imageDetailsAdditionalClasses ? this.props.configuration.imageDetailsAdditionalClasses : ''
        let residencePenthouseDotsClasses = 'residencePenthouseDetail__dots '
        residencePenthouseDotsClasses += this.props.configuration.imageDotsAdditionalClasses ? this.props.configuration.imageDotsAdditionalClasses : ''

        return(
            <>
                <section className={details_classes}>
                    <div className={residencePenthouseDetailsClasses}>
                        <h2>{page_title}</h2>
                        <p>{page_description}</p>
                        <div className="residencePenthouseDetail__features_list">
                            <div className="heading">Features:</div>
                            <ul>
                                {featuresArray.map((feature, i) => {
                                    return (<li key={i+'residencePenthouseDetailFeature' + headerTheme}>{feature}</li>)
                                })}
                            </ul>
                        </div>
                        <div className="residencePenthouseDetail__arrow_button_container">
                            <div className="leftArrowContainer">
                                <img alt='Left Arrow' className="leftArrow" src={leftArrowBlack}></img>
                            </div>
                            <div onClick={this.props.methods.goToContactSlide.bind(this)} className="btn light">Floor Plans</div>
                        </div>
                    </div>
                    <div onWheel={this.handleWheelEvent.bind(this)} className={imageContainerClasses}>
                        <div onClick={this.toggleImageExpansion.bind(this)} className="residencePenthouseDetail__expand_toggler vertical_toggle_column">
                            {imageIsExpanded && 
                                <div><img src={require('./'+this.toggleExpansionMinus).default} alt="minus"/></div>
                            }
                            {!imageIsExpanded && 
                                <div><img src={require('./'+this.toggleExpansionPlus).default} alt="plus"/></div>
                            }
                        </div>
                        <div className="fullscreenImageWrapper">
                            {images.map((image, i) => {
                                let imgClasses = 'fullscreenImage'
                                imgClasses += i === this.state.currIdx ? ' active' : ''
                                imgClasses += i === this.state.prevIdx ? ' deactivating' : ''
                                return (
                                    <img key={i+'residencePenthouseDetailFullscreenImage'} onTransitionEnd={() => this.handleImageTransitionEnd(i)} className={imgClasses} src={require('./'+image).default} alt="Residence Penthouse"/>
                                )
                            })}
                        </div>
                    </div>
                    <div className={residencePenthouseDotsClasses}>
                        {images.map((image, i) => {
                            let dotClasses = 'dot'
                            dotClasses += i === this.state.currIdx ? ' active' : ''
                            return (<div key={i+'residencePenthouseDetailDot' + headerTheme} onClick={() => this.activateImage(i)} className={dotClasses} />)
                        })}
                    </div>
                </section>
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
        
        return(
            <section className='developmentTeam'>
                <div className='left '>
                    <div className={textGroupClasses}>
                        <h2 className='developmentTeam__page_title'>Development Team Story</h2>
                        <p className='developmentTeam__paragraph'>For more than a decade, National Realty Investment Advisors - NRIA has delivered and continues to build upon a history of exceptional performance as a vertically-integrated real estate investment, management and development firm. We have extensive experience with full-service construction and complete renovation of planned unit townhomes, single-family luxury residences, condominiums, multifamily, and mixed-use rental developments strategically located in many of the most dynamic urban markets across the East Coast. Our team’s collective depth of knowledge within these specific markets continues to yield compelling opportunities across the real estate investment risk spectrum.</p>
                        <div className="developmentTeam__headline">REAL ESTATE INVESTMENT COMPANY OVERVIEW</div>
                        <p className='developmentTeam__paragraph'>Founded in 2006, NRIA has grown to be one of the nation’s leading specialists in institutional-caliber private real estate investment management with over $1.25B AUM, focusing on luxury townhome, condominium and multifamily acquisition and development in many supply constrained, high barrier-to-entry markets along the east coast.</p>
                        <p className='developmentTeam__paragraph'>An evolving through-cycle management commitment to long-term growth through active market, property/project-type, and sector selection allows our diversified investment strategy to continually deliver high, low-volatile returns. As a result, not only has our liquidity profile as a real estate investment & development firm incrementally improved, it has laid a solid foundation for significant future growth.</p>
                    </div>
                    <div className={buttonGroupClasses}>
                        <div className="btn light">NRIA</div>
                        <div className="btn light">NR Living</div>
                        <div className="btn light">NRIA EB-5</div>
                    </div>
                </div>
                <div className={rightSideClasses}>
                    <h2 className='developmentTeam__page_title invisible'>Development Team Story</h2>
                    <div className="video">
                        <div style={{padding:'56.25% 0 0 0',position:'relative'}}><iframe title='Development Video' src="https://player.vimeo.com/video/459377741?color=ffffff&title=0&byline=0&portrait=0" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100%'}} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
                        {/* <img alt="video" src={require('./images/video_placeholder.png').default} /> */}
                    </div>
                    <div className="developmentTeam__copyright_logo_container">
                        <div className="copyright">&copy; National Realty Investment Advisors, LLC. All rights reserved</div>
                        <div className="nriaLogo">
                            <img alt="NRIA Logo" src={require('./images/logos/logo_NRIA.png').default} />
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
                    <img className="founderImage" src={require('./'+founderImage).default} alt=""/>
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
                                    <div className="benefit">{value}</div>
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