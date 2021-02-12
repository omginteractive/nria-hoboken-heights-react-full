import {Component} from 'react';
import animatedLogo from '../assets/images/Motion_logo.gif';
import downArrow from '../assets/images/downarrow.svg';
import leftArrowBlack from '../assets/images/leftArrowBlack.svg';
import $ from 'jquery'

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
			styles: this.props.obj.styles,
            type: this.props.obj.slideTemplate,
        }
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
    setAmenityOnDetailsSlide(idx){
        const {setAmenityDetailsSlideIdx} = this.props;
        setAmenityDetailsSlideIdx(idx)
        this.scrollToNextSlide(true)
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
    
    render(){
        const slideObj = this.props.obj;
        const slideMethods = {
            scrollToNextSlide: this.scrollToNextSlide.bind(this),
        }
		let slideClasses = "slide "
		let videoClasses = 'background-video'
		let centerTextClasses = 'center';
		let centerBottomClasses = "centerBottom";

		const isCurrent = this.props.isCurrent;

        slideClasses += slideObj.slideClasses !== undefined ? " " + slideObj.slideClasses : '';
		if(isCurrent) slideClasses += " runAnimations activeSlide";
		if(this.props.slideViewed) slideClasses += " runAnimationOnce";
		if(slideObj.videoZoomEffect) videoClasses += ' videoZoomEffect'
		slideClasses += slideObj.videoMobileStartPosition ? ' mobile-video-position-' + slideObj.videoMobileStartPosition : ' mobile-video-position-left'
		slideClasses += slideObj.contactFormSlide ? ' contactFormSlide' : '';
		slideClasses += slideObj.enableScrolling ? ' enableScrolling' : '';
		slideClasses += ' slideTemplate-' + slideObj.slideTemplate;
        
        if(slideObj.centerTextClasses) {
			centerTextClasses += ' ' + slideObj.centerTextClasses;
		}

		if(slideObj.mobileHasDifferentContent) {
			centerTextClasses += ' not-mobile';
			centerBottomClasses += ' not-mobile';
		}
		
		let centerTextStyles;
		let slideStyles;
		if(window.innerWidth > 768){
			centerTextStyles = slideObj.centerTextStyles
			slideStyles = this.state.styles
		}
		else {
			centerTextStyles = slideObj.centerTextStylesMobile
			slideStyles = {...this.state.styles, ...slideObj.stylesMobile}
		}

		let centerImageStyles;
		if(window.innerWidth > 768){
			centerImageStyles = slideObj.centerImageStyles
		}
		else {
			centerImageStyles = slideObj.centerImageStylesMobile
		}

		return(
            <div className={slideClasses} style={slideStyles} onScroll={this.handleTheScroll}>
                {slideObj.slideTemplate === 'home' && 
                    <SlideHome methods={slideMethods} />
                }
                {slideObj.slideTemplate === 'exteriorLightToggle' && 
                    <SlideExteriorLightToggle configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'fountainPen' &&
                    <SlideFountainPen configuration={slideObj} slideCount={this.props.slideCount} curridx={this.props.currIdx} />
                }
                {slideObj.slideTemplate === 'patio' &&
                    <SlidePatio methods={slideMethods} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'amenities' &&
                    <SlideAmenities setAmenityOnDetailsSlide={this.setAmenityOnDetailsSlide.bind(this)} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'amenitiesDetail' &&
                    <SlideAmenitiesDetail isCurrent={isCurrent} idx={this.props.amenityDetailsSlideIdx} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'views' &&
                    <SlideViews configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'residencePenthouse' &&
                    <SlideResidencePenthouse setResidencePenthousePath={this.setResidencePenthousePath.bind(this)} methods={slideMethods}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseFullscreen' &&
                    <SlideResidencePenthouseFullscreen residencePenthouse={this.props.residencePenthousePath}  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseDetail' &&
                    <SlideResidencePenthouseDetail residencePenthouse={this.props.residencePenthousePath} configuration={slideObj}  />
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
            </div>
        )
    }
}


class SlideMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            satelliteMapEnabled: false,
            enabledListings: []
        }
    }
    toggleMap(){
        const newState = !this.state.satelliteMapEnabled
        this.setState({
            satelliteMapEnabled: newState
        })
    }
    toggleListing(idx){
        const enabledListingsClone = [...this.state.enabledListings];
        const index = enabledListingsClone.indexOf(idx)
        if (index !== -1) {
            enabledListingsClone.splice(index, 1);
            this.setState({enabledListings: enabledListingsClone});
        }
        else {
            this.setState({
                enabledListings: this.state.enabledListings.concat(idx)
            })
        }
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
                        <img src={require('./images/map/map01.jpg').default} alt="" className='map'/>
                        <div className={satelliteImageContainerClasses}>
                            <img src={require('./images/map/map02.jpg').default} alt="" className='map'/>
                        </div>
                    </div>
                    <div className="mapMotionLogo">
                        <img src={require('./images/map/Motion_logo.gif').default} alt="" className="map"/>
                    </div>
                    <div onClick={this.toggleMap.bind(this)} className="satelliteToggle vertical_toggle_column">
                        <div className="rotatedText">{toggleBarText}</div>
                    </div>
                    <div className="mapSection__locationList">
                        {locationListings.map((amenity, idx) => {
                            const isActive = this.state.enabledListings.indexOf(idx) !== -1
                            const locationListingClasses =  isActive ? 'locationListing active' : 'locationListing'
                            const toggleSymbol = isActive ? '-' : '+'
                            return (
                            <div key={idx} onClick={() => this.toggleListing(idx)}  className={locationListingClasses}>
                                <div className="titleDistanceWrapper">
                                    <div className="locationTitle">Lorem Ipsum</div>
                                    <div className="locationDistance">(10 mins)</div>
                                    <div className="toggleButton">{toggleSymbol}</div>
                                </div>
                                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </div>
                            )
                        })}
                    </div>
                </section>
            </>
        )
    }
}
class SlideVideoDiscover extends Component {
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect startZoomedIn'
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
                            loop="true"
							>
							<source src='/videos/NRIMA_SITE_VIDEO DISCOVER.mp4' type="video/mp4" />
							</video>`
						}}
					/>
				}
            </>
        )
    }
}


class SlideContactForm extends Component {
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
        const contactLogo = 'images/NRLiving.png'
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
                    <ContactForm createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} />
                    <div className="privacyPolicy not-mobile">
                        <div className="verticalLineContainer">
                            <div className="verticalLine" />
                        </div>
                        
                        <img className='logo' src={require('./'+contactLogo).default}  />
                        <div className="contactInfo">
                            <div className="address">{companyAddress}</div>
                            <div className="address">{companyName}</div>
                            <div className="address">{agentName}</div>
                            <div className="address">{agentCompany}</div>
                            <div className="phone">{agentPhoneNumber}</div>
                            <div className="copyright">{rightsReserved}</div>
                            <a target="_blank" onClick={this.openPrivacyPolicyModal.bind(this)} className="btn light">{buttonText}</a>
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

    render() {
		let jQuery = $
		let contactFormClasses = 'contactForm';
		// if(this.state.formSubmitted){
		// 	contactFormClasses += ' submitted'
		// }
		const select2Styles = {
			width:"100%"
		}
        const select2Exists = jQuery.fn.select2
        const select2Initialized = jQuery('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').hasClass("select2-hidden-accessible")
		if(!select2Initialized && select2Exists) {
            jQuery('.how_you_heard').select2({
				placeholder: "How did you hear of us?*",
				width: 'resolve',
				minimumResultsForSearch: -1
			});
			const hubspotFormExists = jQuery('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').length
			if(hubspotFormExists) {
                const disabledOptionText = jQuery('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217 option:disabled')[0].innerHTML
				jQuery('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
					placeholder: disabledOptionText,
					width: 'resolve',
					minimumResultsForSearch: -1
				});
			}
		}
		return (
			<form className={contactFormClasses}>
				<div className="submittedFormOverlay">
					<div className="text">THANK YOU!</div>
					<div className="closeBtn" onClick={this.resetForm}>
						<img src={require('./images/form_close_btn.svg').default} />
					</div>
				</div>
				<div className='headline'>FOR INFORMATION PLEASE FILL THE FORM BELOW</div>
				<div className="hubspotFormWrapper" id="hubspotFormWrapper">

				</div>
				{/* <div className="two-input-group">
					<div className="form-control">
						<label className="label">First Name*</label>
						<input className="input"
							name="first_name"
							type="text"
							value={this.state.first_name}
							onChange={this.handleInputChange}
							placeholder="First Name*" />
					</div>
					<div className="form-control">
						<label className="label">Last Name*</label>
						<input className="input"
							name="last_name"
							type="text"
							value={this.state.last_name}
							onChange={this.handleInputChange}
							placeholder="Last Name*" />
					</div>
				</div>
				<div className="form-control">
					<label className="label">E-mail*</label>
					<input className="input"
						name="email"
						type="text"
						value={this.state.email}
						onChange={this.handleInputChange}
						placeholder="E-mail*" />
				</div>
				<div className="form-control">
					<label className="label">Mobile Phone Number*</label>
					<input className="input"
						name="mobilephone"
						type="text"
						value={this.state.mobilephone}
						onChange={this.handleInputChange}
						placeholder="Mobile Phone Number*" />
				</div>
				<div className="form-control">
					<label className="label">How did you hear of us?*</label>
					<select style={select2Styles}
						className='how_you_heard'
						value={this.state.how_you_heard}
						name="how_you_heard"
						onChange={this.handleInputChange}
						ref='how_you_heard'
						>

						<option className='emptyOption'></option>
						<option value="Google">Google</option>
						<option value="Friend">Friend</option>
						<option value="Newspaper">Newspaper</option>
					</select>
				</div>
				<div className="form-control">
					<label className="label">How may we help you?*</label>
					<textarea className="input textarea" 
						name="how_can_we_help"
						type="text"
						value={this.state.how_can_we_help}
						onChange={this.handleInputChange}
						placeholder="How may we help you?*" />
				</div>
				<div className="fine-print">NOTE: By filling out this contact form, I give you my permission to contact me via email, cell phone, or text until I opt out of any such communications.</div>
				<div className="rightArrowContainer">
					<img className='rightArrow not-mobile' src='/assets/images/rightarrow.svg' onClick={this.handleSubmit} />
					<img className='logo mobile-only' src='/assets/images/NRIA_Logo--White.png' />
					<div className="mobileRightArrowContainer mobile-only" onClick={this.handleSubmit}>
						<div className="text gotham-medium">SEND</div>
						<img className='rightArrow' src='/assets/images/mobileSubmitArrow.svg' />
					</div>
					
				</div> */}
			</form>
		);
	}
}

class SlideNeighborhoodCommunity extends Component {
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="button_container">
                            <div className="btn light">Lorem ipsum</div>
                            <div className="btn light">Lorem ipsum</div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
class SlideHome extends Component {
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        return(
            <>
                <img className="animatedLogo" src={animatedLogo} alt=""/>
                <div className="downArrowContainer">
                    <img alt='Down Arrow' onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
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
        this.lightsOffVideo= '/videos/NIRMA_1_Exterior_High_OFF_Cinemagraphic.mp4'
        this.lightsOnVideo= '/videos/NIRMA_1_Exterior_High_Cinemagraphic.mp4'
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
        let videoClasses = 'background-video'
        let lightButtonText = this.state.lightsOn ? 'Turn Off' : 'Turn On'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect startZoomedIn'
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
                    <div className="inquiry-link">INQUIRE NOW</div>
                </header>
                <div onClick={this.toggleLights.bind(this)} className="toggleLights btn">{lightButtonText}</div>
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
							<source src="${this.lightsOnVideo}" type="video/mp4" />
							</video>`
						}}
					/>
				}
                {!this.state.lightsOn &&
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
							<source src="${this.lightsOffVideo}" type="video/mp4" />
							</video>`
						}}
					/>
				}
            </>
        )
    }
}

class SlideFountainPen extends Component {
    render(){
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        // if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect'
        return(
            <> 
                {
                    <div className="textSection">
                        <h2>4 State-of-the-art Buildings<br />55 Residences | 9 Penthouses</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <div className="btn dark">Inquire now</div>
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
							<source src='/videos/Motion_signature.mp4' type="video/mp4" />
							</video>`
						}}
					/>
				}
            </>
        )
    }
}


class SlidePatio extends Component {
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect startZoomedIn'
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
            </>
        )
    }
}

class SlideAmenities extends Component {
    setAmenityDetail(idx){
        const {setAmenityOnDetailsSlide} = this.props;
        setAmenityOnDetailsSlide(idx);
    }
    render(){
        return(
            <>
                <section className="amenities">
                    <div className="amenities__details">
                        <h2>Luxury Skyline Front Amenities & Services</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <div className="btn dark">Inquire now</div>
                    </div>
                    <div className="amenities__list">
                        <ul>
                            <li onClick={() => this.setAmenityDetail(0)}>Bar</li>
                            <li onClick={() => this.setAmenityDetail(1)}>Children</li>
                            <li onClick={() => this.setAmenityDetail(2)}>Corridor</li>
                            <li onClick={() => this.setAmenityDetail(1)}>Gym</li>
                            <li onClick={() => this.setAmenityDetail(2)}>Grills</li>
                            <li onClick={() => this.setAmenityDetail(0)}>Movie</li>
                            <li onClick={() => this.setAmenityDetail(1)}>Patio</li>
                            <li onClick={() => this.setAmenityDetail(0)}>Pool</li>
                        </ul>
                    </div>
                </section>
            </>
        )
    }
}


class SlideAmenitiesDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descriptionVisible: false,
            image: null,
            image1IsNew: false,
            title_line1: ' '//animation doesnt work without this
        }
        this.defaultArrowDistanceFromEdge = "40px"
        this.clickedArrowDistanceFromEdge = "25px"
        this.state.rightArrowStyles= {
            right: this.defaultArrowDistanceFromEdge
        }
        this.state.leftArrowStyles= {
            left: this.defaultArrowDistanceFromEdge
        }
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
            this.setAmenityTitle()
        }
    }
    setAmenityData(newIdx){
        if(newIdx === this.state.currIdx) return

        const title_line1 = this.props.configuration.amenities[newIdx].title_line1
        const title_line2 = this.props.configuration.amenities[newIdx].title_line2
        const title_line3 = this.props.configuration.amenities[newIdx].title_line3
        const description = this.props.configuration.amenities[newIdx].description
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
    }
    transitioningAmenityComplete= e => {
        if(e.animationName == 'fadeOut'){
            this.setAmenityTitle()
            this.setState({
                amenityNameVisibility: true
            })
        }
        else if(e.animationName == 'fadeInDriftUp') {
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
    animateRightArrow(){
        this.setState({
            rightArrowStyles: {
                right: this.clickedArrowDistanceFromEdge
            }
        })
        this.changeAmenity(1)
    }
    resetRightArrow(){
        this.setState({
            rightArrowStyles: {
                right: this.defaultArrowDistanceFromEdge
            }
        })
    }
    animateLeftArrow(){
        this.setState({
            leftArrowStyles: {
                left: this.clickedArrowDistanceFromEdge
            }
        })
        this.changeAmenity(-1)
    }
    resetLeftArrow(){
        this.setState({
            leftArrowStyles: {
                left: this.defaultArrowDistanceFromEdge
            }
        })
    }
    activateAmenity(dotIdx){
        this.setAmenityData(dotIdx)
    }
    render(){
        const toggleButtonSrc = this.state.descriptionVisible ? 'images/amenities/Button-.svg' : 'images/amenities/Button+.svg'
        const hasMoreInfoBtn = this.props.configuration.amenities[this.state.currIdx] && this.props.configuration.amenities[this.state.currIdx].moreInfoBtn
        let descriptionClasses = 'amenities_detail__description'
        descriptionClasses += this.state.descriptionVisible ? ' visible' : ''
        const descriptionStyles = {
            backgroundImage: 'url('+require('./images/amenities/blackgradient.png').default+')',
        }

        let image1_classes = 'amenities_detail__image '
        image1_classes += this.state.image1IsNew ? 'new' : 'old'
        let image2_classes = 'amenities_detail__image '
        image2_classes += !this.state.image1IsNew ? 'new' : 'old'
        let amenities_detail_name_classes = 'amenities_detail__name'
        amenities_detail_name_classes += !this.state.amenityNameVisibility ? ' runFadeOutAnimation' : ' runFadeInAnimation'
        amenities_detail_name_classes += this.state.descriptionVisible ? ' riseForDescription' : ''
        let amenities_detail__more_info_classes = 'amenities_detail__more_info'
        
        return (
            <>
                <section className="amenities_detail">
                    <img onTransitionEnd={this.resetRightArrow.bind(this)} alt="Right Arrow" onClick={this.animateRightArrow.bind(this)} style={this.state.rightArrowStyles} className="amenities_detail__arrow amenities_detail__arrow--right" src={require('./images/amenities/rightArrow.svg').default} />
                    <img onTransitionEnd={this.resetLeftArrow.bind(this)} alt="Left Arrow" onClick={this.animateLeftArrow.bind(this)} style={this.state.leftArrowStyles} className="amenities_detail__arrow amenities_detail__arrow--left" src={require('./images/amenities/rightArrow.svg').default} />
                    <img alt="" src={this.state.image1 && require('./'+this.state.image1).default} className={image1_classes}  />
                    <img alt="" src={this.state.image2 && require('./' + this.state.image2).default} className={image2_classes}  />
                    <div className={amenities_detail__more_info_classes}>
                        <div className={amenities_detail_name_classes}>
                            <h3>
                                {this.state.title_line1 && <span onAnimationEnd={this.transitioningAmenityComplete.bind(this)} >{this.state.title_line1}</span>}
                                {this.state.title_line2 && <span>{this.state.title_line2}</span>}
                                {this.state.title_line3 && <span>{this.state.title_line3}</span>}
                                <img alt="" onClick={this.toggleDetailDescription.bind(this)} className="amenities_detail__description_toggler" src={require('./'+toggleButtonSrc).default} />
                            </h3>
                        </div>
                        <div className="amenities_detail__more_info__dots">
                            {this.props.configuration.amenities.map((amenity, i) => {
                                let dotClasses = 'dot'
                                dotClasses += i === this.state.currIdx ? ' active' : ''
                                return (<div key={i} onClick={() => this.activateAmenity(i)} className={dotClasses} />)
                            })}
                        </div>
                        <div className={descriptionClasses} style={descriptionStyles}>
                            <div className="text">
                                <p>{this.state.description}</p>
                            </div>
                        </div>
                    </div>
                    {hasMoreInfoBtn && 
                        <div className="amenities_detail__more_info_btn btn">More Info</div>
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
        }
        
    }
    componentDidMount(){
        this.props.configuration.views.forEach((view) => {
            const img = new Image().src = require('./'+view.image).default
        })
        this.setNewTime(0)
    }
    handleTimeChange(event){
        const rangeValue = event.target.value
        
        if(this.isInt(rangeValue)){
            //when the user is dragging thumb and ends up exactly on an int value, not a float
            this.setNewTime(rangeValue)
        }
        else {
            this.setState({
                timeSliderValue: rangeValue
            })
        }
    }
    handleMouseUp(event){
        const rangeValue = event.target.value
        if(!this.isInt(rangeValue)){
            const closestInt = Math.round(rangeValue);
            this.setNewTime(closestInt)
        }
    }
    isInt(n) {
        return n % 1 === 0;
    }
    setNewTime(key){
        this.setState({
            timeSliderValue: key,
        })
        if(key == this.state.activeView) return
        const image1IsNew = !this.state.image1IsNew
        this.setState({
            activeView: key,
            image1IsNew: image1IsNew,
        })
        const image = this.props.configuration.views[key].image
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
    }

    render(){
        let image1_classes = 'views_section__image startZoomedIn '
        image1_classes += this.state.image1IsNew ? 'new' : 'old'
        let image2_classes = 'views_section__image startZoomedIn '
        image2_classes += !this.state.image1IsNew ? 'new' : 'old'
        
        return(
            <>
                <section className="views_section">
                    <div className="views_section__top">
                        <h2>Signature Views 24/7</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="views_section__bottom">
                        {this.props.configuration.views &&
                            <>
                                <img alt="" src={this.state.image1 && require('./'+this.state.image1).default} className={image1_classes}  />
                                <img alt="" src={this.state.image2 && require('./' + this.state.image2).default} className={image2_classes}  />
                            </>
                        }
                        <div className="views_section__timeSlider">
                            <input onMouseUp={this.handleMouseUp.bind(this)} onTouchEnd={this.handleMouseUp.bind(this)} onChange={this.handleTimeChange.bind(this)} type="range" min="0" max={this.props.configuration.views.length - 1} step="0.005" value={this.state.timeSliderValue}/>
                            <ul className="views_section__timeList">
                                {this.props.configuration.views.map((view, i) => {
                                    const listClasses = i == this.state.activeView ? 'active' : ''
                                    return (<li className={listClasses} key={i}>{view.displayTime} {view.ampm}</li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

class SlideResidencePenthouse extends Component {
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
    componentDidMount(){
        //preload images
        new Image().src = require('./'+'images/penthouse/penthousebed.png').default
        new Image().src = require('./'+'images/residence/residence.png').default
        
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        const fullscreenImage = this.props.residencePenthouse == 'penthouse' ? 'images/penthouse/penthousebed.png' : 'images/residence/residence.png'
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
                    </div>
                }
                <img className='residencePenthouseFullscreenImage' alt="" src={require('./'+fullscreenImage).default} />
            </>
        )
    }
}

class SlideResidencePenthouseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageExpanded: false
        }
    }
    handleWheelEvent = e => {
        const wheelAmt = e.deltaY
        const currentDetailsScrollDistance = document.querySelectorAll('.residencePenthouseDetail__details')[0].scrollTop
        document.querySelectorAll('.residencePenthouseDetail__details')[0].scrollTop = currentDetailsScrollDistance + wheelAmt
            
        if(this.state.imageExpanded){
            const querySelector = '.residencePenthouseDetail__details'
            if(wheelAmt < 0) {
                document.querySelector(querySelector).scrollTop = 0//scroll to top of slide to trigger prevSlide as scroll motion continues
            }
            else {
                const bottomScrollValue = document.querySelector(querySelector).scrollHeight - document.querySelector(querySelector).offsetHeight
                document.querySelector(querySelector).scrollTop = bottomScrollValue
            }
        }
    }
    toggleImageExpansion(){
        const newImageState = !this.state.imageExpanded
        this.setState({
            imageExpanded: newImageState
        })
    }
    render(){
        let details_classes = 'residencePenthouseDetail'
        details_classes += this.state.imageExpanded ? ' expandImage' : ''
        const isPenthouse = this.props.residencePenthouse === 'penthouse'
        
        const image = isPenthouse ? 'images/penthouse/penthouse.jpg' : 'images/residence/residence.png'
        const page_title = isPenthouse ? 'Exclusive Luxury Penthouses' : 'Our Residences'
        const page_description = isPenthouse ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        const featuresArray = isPenthouse ? [
            'Lorem Ipsum Lorem Ipsum',
            'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
            'Lorem Ipsum Lorem Ipsum',
            'Lorem Ipsum Lorem Ipsum Lorem',
            'Lorem Ipsum',
            'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
            'Lorem Ipsum Lorem',
            'Lorem Ipsum Lorem Ipsum',
            ] : 
            [
                'Residence Ipsum Lorem Ipsum',
                'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                'Lorem Ipsum Lorem Ipsum',
                'Lorem Ipsum Lorem Ipsum Lorem',
                'Lorem Ipsum',
                'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                'Lorem Ipsum Lorem',
                'Lorem Ipsum Lorem Ipsum',
                ]
        return(
            <>
                <section className={details_classes}>
                    <div className='residencePenthouseDetail__details'>
                        <h2>{page_title}</h2>
                        <p>{page_description}</p>
                        <div className="residencePenthouseDetail__features_list">
                            <div className="heading">Features:</div>
                            <ul>
                                {featuresArray.map((feature, i) => {
                                    return (<li key={i}>{feature}</li>)
                                })}
                            </ul>
                        </div>
                        <div className="residencePenthouseDetail__arrow_button_container">
                            <div className="leftArrowContainer">
                                <img alt='Left Arrow' className="leftArrow" src={leftArrowBlack}></img>
                            </div>
                            <div className="btn light">Inquire now</div>
                        </div>
                    </div>
                    <div onWheel={this.handleWheelEvent.bind(this)} className="residencePenthouseDetail__image_container">
                        <div onClick={this.toggleImageExpansion.bind(this)} className="residencePenthouseDetail__expand_toggler vertical_toggle_column">
                            <div><img src={require('./'+'images/expand+.svg').default} alt=""/></div>
                        </div>
                        <img src={require('./'+image).default} alt=""/>
                    </div>
                </section>
            </>
        )
    }
}


class SlideFounders extends Component {

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
                                <div key={key} className="benefitPair">
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

class SlideDevelopmentTeam extends Component {
    render(){
        return(
            <section className='developmentTeam'>
                <div className="left">
                    <div className="textGroup">
                        <h2 className='developmentTeam__page_title'>Development Team Story</h2>
                        <p className='developmentTeam__paragraph'>For more than a decade, National Realty Investment Advisors - NRIA has delivered and continues to build upon a history of exceptional performance as a vertically-integrated real estate investment, management and development firm. We have extensive experience with full-service construction and complete renovation of planned unit townhomes, single-family luxury residences, condominiums, multifamily, and mixed-use rental developments strategically located in many of the most dynamic urban markets across the East Coast. Our team's collective depth of knowledge within these specific markets continues to yield compelling opportunities across the real estate investment risk spectrum.</p>
                        <div className="developmentTeam__headline">Real estate investment company overview</div>
                        <p className='developmentTeam__paragraph'>Founded in 2006, NRIA has grown to be one of the nation's leading specialists in institutional-caliber private real estate investment management with over $1.25B AUM, focusing on luxury townhome, condominium and multifamily acquisition and development in many supply constrained, high barrier-to-entry markets along the east coast.</p>
                        <p className='developmentTeam__paragraph'>An evolving through-cycle management commitment to long-term growth through active market, property/project-type, and sector selection allows our diversified investment strategy to continually deliver high, low-volatile returns. As a result, not only has our liquidity profile as a real estate investment & development firm incrementally improved, it has laid a solid function for significatnt future growth.</p>
                    </div>
                    <div className="developmentTeam__button_group">
                        <div className="btn light">NRIA</div>
                        <div className="btn light">NR Living</div>
                        <div className="btn light">NRIA EB-5</div>
                    </div>
                </div>
                <div className="right">
                <h2 className='developmentTeam__page_title invisible'>Development Team Story</h2>
                    <div className="video">
                        <img alt="video" src={require('./images/video_placeholder.png').default} />
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

export default Slide;