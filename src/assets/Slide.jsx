import {Component} from 'react';
import React from 'react';
import $ from 'jquery'
import {connect} from 'react-redux'

import SlideExteriorLightToggle from './slideComponents/SlideExteriorLightToggle';
import SlideFilm from './slideComponents/SlideFilm';
import SlideMap from './slideComponents/SlideMap';
import SlideViews from './slideComponents/SlideViews';
import SlideAvailability from './slideComponents/SlideAvailability';
import SlideResidencePenthouse from './slideComponents/SlideResidencePenthouse';
import SlideResidencePenthouseFullscreen from './slideComponents/SlideResidencePenthouseFullscreen';
import SlideResidencePenthouseDetail from './slideComponents/SlideResidencePenthouseDetail';
import ContactForm from './slideComponents/ContactForm';

import { findDeviceSlideIdx} from ".././redux/actions/slideActions";
import { googleMapsEnable} from "../redux/actions/appActions";

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
			styles: this.props.slideData[this.props.idx].styles,
            obj: this.props.slideData[this.props.idx]
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        const mapHeightLockedPropsChanged = this.props.mapHeightLocked !== nextProps.mapHeightLocked
        const slideChanged = this.props.isCurrent !== nextProps.isCurrent
        const videoMobileStartPositionToggled = this.props.isCurrent && nextProps.slideData[this.props.idx].videoMobileStartPosition !== this.props.slideData[this.props.idx].videoMobileStartPosition
        const googleMapsNotLoaded = !this.props.googleMapsLoaded && (!this.props.googleMapsLoaded !== nextProps.googleMapsLoaded)
        return slideChanged || videoMobileStartPositionToggled || mapHeightLockedPropsChanged || googleMapsNotLoaded
    }
    componentDidUpdate(){
        if(!this.props.googleMapsLoaded && typeof(window.google) !== 'undefined'){
            this.props.googleMapsEnable()
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
    goToContactSlide(){
        const {goToContactSlide} = this.props;
        goToContactSlide();
    }
    setAmenityOnGallerySlide(idx, nextSlide = true){
        const {setamenityGallerySlideIdx} = this.props;
        setamenityGallerySlideIdx(idx)

        if(nextSlide) this.scrollToNextSlide(true)
        
    }
    
    // openPrivacyPolicyModal(){
	// 	const {showPrivacyPolicy} = this.props
	// 	showPrivacyPolicy()
    // }
    
    /*
     * delegateScroll is used to take a wheel event that occurs on one an element and
     * cause a scroll event on a different element.
     * 
     * forceSlideChange will simply cause the scrollTop value to either be the minimum or 
     * maximum which will cause the slide to change since there will be no place left to scroll.
     * This is used when a slide may not need to use the scroll feature depending on the state.
     *
     */
    delegateScroll(wheelAmt, elementToDelegateScroll, forceSlideChange = false){
        const currentDetailsScrollDistance = elementToDelegateScroll.scrollTop
        elementToDelegateScroll.scrollTop = currentDetailsScrollDistance + wheelAmt
        if(forceSlideChange){
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
        const slideObj = this.props.slideData[this.props.idx]
        const slideMethods = {
            scrollToNextSlide: this.scrollToNextSlide.bind(this),
            goToContactSlide: this.goToContactSlide.bind(this),
            delegateScroll: this.delegateScroll.bind(this),
        }
		let slideClasses = "slide "
		
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
		const isCurrent = this.props.isCurrent
        slideClasses += slideObj.slideClasses !== undefined ? " " + slideObj.slideClasses : '';
		if(isCurrent) slideClasses += " activeSlide";
		if(this.props.slidesViewed.includes(this.props.idx)) slideClasses += " runAnimationOnce";
		slideClasses += slideObj.videoMobileStartPosition ? ' mobile-video-position-' + slideObj.videoMobileStartPosition : ' mobile-video-position-center'
		slideClasses += slideObj.contactFormSlide ? ' contactFormSlide' : '';
		slideClasses += slideObj.enableScrolling ? ' enableScrolling' : '';
		slideClasses += ' slideTemplate-' + slideObj.slideTemplate;
        slideClasses += slideObj.mobileOnly === true ? ' mobile-only' : ''
        slideClasses += slideObj.desktopOnly === true ? ' desktop-only' : ''

        let slideStyles;
		if(this.props.isMobileDevice){
            slideStyles = {...this.state.styles, ...slideObj.stylesMobile}
		}
		else {
            slideStyles = this.state.styles
		}

		return(
            <div className={slideClasses} style={slideStyles} onScroll={this.handleTheScroll}>
                {slideObj.slideTemplate === 'home' &&
                    <SlideHome methods={slideMethods} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'film' &&
                    <SlideFilm isCurrent={isCurrent} slideHorizontal={this.slideHorizontal.bind(this)} mobileArrows={mobileArrows} methods={slideMethods}  configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'exteriorLightToggle' &&
                    <SlideExteriorLightToggle slideHorizontal={this.slideHorizontal.bind(this)} mobileArrows={mobileArrows} methods={slideMethods}  configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'fountainPen' &&
                    <SlideFountainPen isCurrent={isCurrent} methods={slideMethods} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'patio' &&
                    <SlidePatio mobileArrows={mobileArrows} methods={slideMethods} configuration={slideObj} slideHorizontal={this.slideHorizontal.bind(this)} />
                }
                {slideObj.slideTemplate === 'amenities' &&
                    <SlideAmenities methods={slideMethods} setAmenityOnGallerySlide={this.setAmenityOnGallerySlide.bind(this)} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'amenitiesGallery' &&
                    <SlideAmenitiesGallery setAmenityOnGallerySlide={this.setAmenityOnGallerySlide.bind(this)} isCurrent={isCurrent} idx={this.props.amenityGallerySlideIdx} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'views' &&
                    <SlideViews isCurrent={isCurrent} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'residencePenthouse' &&
                    <SlideResidencePenthouse
                        configuration={slideObj}
                        // setResidencePenthousePath={this.setResidencePenthousePath.bind(this)}
                        methods={slideMethods}
                        />
                }
                {slideObj.slideTemplate === 'residencePenthouseFullscreen' &&
                    <SlideResidencePenthouseFullscreen slideHorizontal={this.slideHorizontal.bind(this)} mobileArrows={mobileArrows} residencePenthouse={this.props.residencePenthousePath}  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseDetail' &&
                    <SlideResidencePenthouseDetail
                        mobileArrows={mobileArrows}
                        methods={slideMethods}
                        // residencePenthouse={this.props.residencePenthousePath}
                        configuration={slideObj}
                        />
                }
                {slideObj.slideTemplate === 'availability' &&
                    <SlideAvailability  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'developmentTeam' &&
                    <SlideDevelopmentTeam isCurrent={isCurrent} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'founders' &&
                    <SlideFounders methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'videoDiscover' &&
                    <SlideVideoDiscover  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'neighborhoodCommunity' &&
                    <SlideNeighborhoodCommunity isCurrent={isCurrent} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'map' &&
                    <SlideMap mapHeightLocked={this.props.mapHeightLocked} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'contact' &&
                    <SlideContactForm
                        // showPrivacyPolicy={this.openPrivacyPolicyModal.bind(this)}
                        configuration={slideObj}
                        />
                }
            </div>
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
    shouldComponentUpdate(nextProps, nextState){
        if(!this.props.select2Activated){
            return true //this will make sure we render the child component ContactForm to add select2
        }
        return false
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
        // const buttonLink = this.props.configuration.button_link_8
        return(
            <>
                <div className="contactPageWrapper">
                    <ContactForm
                        formHeading={this.props.configuration.form_heading}
                        />
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

class SlideNeighborhoodCommunity extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const arrivedAtOrExitedSlide = this.props.isCurrent !== nextProps.isCurrent
        return arrivedAtOrExitedSlide
    }
    componentDidUpdate(prevProps){
        const slideIsActive = this.props.isCurrent
        const slideJustChanged = this.props.isCurrent !== prevProps.isCurrent
        if(slideIsActive && slideJustChanged){
            $(".slideTemplate-neighborhoodCommunity").animate({ scrollTop: 0 }, "fast")//scroll up to top in case user scrolled down
        }
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
        const currAmenitiesIdxChanged = this.state.currAmenityIdx !== nextState.currAmenityIdx
        const descriptionChanged = this.state.description !== nextState.description
        const descriptionVisibleChanged = this.state.descriptionVisible !== nextState.descriptionVisible
        const image1Changed = this.state.image1 !== nextState.image1
        const image1IsNewChanged = this.state.image1IsNew !== nextState.image1IsNew
        const image2Changed = this.state.image2 !== nextState.image2
        const title_line1Changed = this.state.title_line1 !== nextState.title_line1
        const title_line2Changed = this.state.title_line2 !== nextState.title_line2
        const title_line3Changed = this.state.title_line3 !== nextState.title_line3
        const slidePresenceChanged = this.props.isCurrent !== nextProps.isCurrent
        const amenityChanged = amenityNameVisibilityChanged || currAmenitiesIdxChanged || descriptionChanged || descriptionVisibleChanged || image1Changed || image1IsNewChanged || image2Changed || title_line1Changed || title_line2Changed || title_line3Changed || slidePresenceChanged
        return amenityChanged
    }
    componentDidMount(){
        this.props.configuration.amenities.forEach((amenity) => {
            const img = new Image().src = amenity.image
        })
        this.setAmenityData(this.state.currAmenityIdx)
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
        if(newIdx === this.state.currAmenityIdx) return

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
            currAmenityIdx: newIdx,
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
        const newIdx = this.state.currAmenityIdx
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
            nextAmenity = this.state.currAmenityIdx === 0 ? this.props.configuration.amenities.length - 1 : this.state.currAmenityIdx - 1
        }
        else {
            nextAmenity = this.state.currAmenityIdx === this.props.configuration.amenities.length - 1 ? 0  : this.state.currAmenityIdx + 1
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
        
        const hasMoreInfoBtn = this.props.configuration.amenities[this.state.currAmenityIdx] && this.props.configuration.amenities[this.state.currAmenityIdx].moreInfoBtn
        
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
                        imageClasses += i === this.state.currAmenityIdx ? ' active' : ''
                        return (<img key={i+'SlideAmenitiesGalleryImage'} alt="" src={amenity.image} className={imageClasses}  />)
                    })}
                        
                    <div className={amenities_gallery__more_info_classes}>
                        
                        <div className="amenities_gallery__more_info__dots">
                            {this.props.configuration.amenities.map((amenity, i) => {
                                let dotClasses = 'dot'
                                dotClasses += i === this.state.currAmenityIdx ? ' active' : ''
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


class SlideDevelopmentTeam extends Component {
    
    shouldComponentUpdate(nextProps, nextState){
        const arrivedAtOrExitedSlide = this.props.isCurrent !== nextProps.isCurrent
        return arrivedAtOrExitedSlide
    }
    componentDidUpdate(prevProps){
        const slideIsActive = this.props.isCurrent
        const slideJustChanged = this.props.isCurrent !== prevProps.isCurrent
        if(slideIsActive && slideJustChanged){
            $(".slideTemplate-developmentTeam").animate({ scrollTop: 0 }, "fast")//scroll up to top in case user scrolled down
        }
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
    handleWheelEvent = e => {
        const wheelAmt = e.deltaY
        const querySelector = '.founderSlideWrapper'
        const elementToDelegateScroll = document.querySelectorAll(querySelector)[0]
        this.props.methods.delegateScroll(wheelAmt, elementToDelegateScroll)
    }
    render(){
        const founderImage = this.props.configuration.founderImage
        const founderHeadline = this.props.configuration.founderHeadline
        const founderTagline = this.props.configuration.founderTagline
        const founderBenefits = this.props.configuration.founderBenefits
        return(
            <>
                <div className="founderSlideContainer" onWheel={this.handleWheelEvent.bind(this)}>
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

const mapStateToProps = state => {
    // const currSlideIdx = state.slideData.currSlideIdx
    const slidesViewed = state.slideData.slidesViewed
    const isMobileDevice = state.appData.isMobileDevice
    const googleMapsLoaded = state.appData.googleMapsLoaded
    const select2Activated = state.appData.select2Activated
    const slideData = state.slideData.slides
    return { slideData, isMobileDevice, googleMapsLoaded, select2Activated, slidesViewed }
  }
  export default connect(
    mapStateToProps,
    {findDeviceSlideIdx, googleMapsEnable}
  )(Slide)