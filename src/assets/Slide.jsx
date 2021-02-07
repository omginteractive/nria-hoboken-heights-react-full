import {Component} from 'react';
import animatedLogo from '../assets/images/Motion_logo.gif';
import downArrow from '../assets/images/downarrow.svg';

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

    scrollToNextSlide() {
		const {goToNextSlide} = this.props;
        goToNextSlide();
    }
    setAmenityOnDetailsSlide(idx){
        const {setAmenityDetailsSlideIdx} = this.props;
        setAmenityDetailsSlideIdx(idx)
        this.scrollToNextSlide()
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
                    <SlideAmenitiesDetail idx={this.props.amenityDetailsSlideIdx} configuration={slideObj} />
                }
            </div>
        )
    }
}

class SlideHome extends Component {
    nextSlide(){
        this.props.methods.scrollToNextSlide()
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
    nextSlide(){
        this.props.methods.scrollToNextSlide()
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
            currIdx: this.props.idx,
            image: null,
            image1IsNew: false,
        }
    }
    componentDidMount(){
        this.props.configuration.amenities.forEach((amenity) => {
            const img = new Image().src = require('./'+amenity.image).default
        })
        this.setAmenityData(this.state.currIdx)
    }
    componentDidUpdate(){
        if(this.state.lastPropsIdx !== this.props.idx) {
            this.setState({
                //this was necessary to have something to compare props.idx changes to
                lastPropsIdx: this.props.idx
            })
            this.setAmenityData(this.props.idx)
        }
    }
    setAmenityData(newIdx){
        const title = this.props.configuration.amenities[newIdx].title
        const description = this.props.configuration.amenities[newIdx].description
        const image = this.props.configuration.amenities[newIdx].image
        const image1IsNew = !this.state.image1IsNew
        this.setState({
            title: title,
            description: description,
            currIdx: newIdx,
            image1IsNew: image1IsNew
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
    toggleDetailDescription(){
        const newDescriptionState = !this.state.descriptionVisible
        this.setState({
            descriptionVisible: newDescriptionState
        })
    }
    nextAmenity(){
        const nextIdx = this.state.currIdx === this.props.configuration.amenities.length - 1 ? 0  : this.state.currIdx + 1
        this.setAmenityData(nextIdx)
    }
    prevAmenity(){
        const prevIdx = this.state.currIdx === 0 ? this.props.configuration.amenities.length - 1 : this.state.currIdx - 1
        this.setAmenityData(prevIdx)
    }
    render(){
        const toggleButtonSrc = this.state.descriptionVisible ? 'images/amenities/Button-.svg' : 'images/amenities/Button+.svg'
        let descriptionClasses = 'amenities_detail__description'
        descriptionClasses += this.state.descriptionVisible ? ' visible' : ''

        let image1_classes = 'amenities_detail__image '
        image1_classes += this.state.image1IsNew ? 'new' : 'old'
        let image2_classes = 'amenities_detail__image '
        image2_classes += !this.state.image1IsNew ? 'new' : 'old'
        return (
            <>
                <section className="amenities_detail">
                    <img alt="Right Arrow" onClick={this.nextAmenity.bind(this)} className="amenities_detail__arrow amenities_detail__arrow--right" src={require('./images/amenities/rightArrow.svg').default} />
                    <img alt="Left Arrow" onClick={this.prevAmenity.bind(this)} className="amenities_detail__arrow amenities_detail__arrow--left" src={require('./images/amenities/rightArrow.svg').default} />
                    <img alt="" src={this.state.image1 && require('./'+this.state.image1).default} className={image1_classes}  />
                    <img alt="" src={this.state.image2 && require('./' + this.state.image2).default} className={image2_classes}  />
                    <div className="amenities_detail__more_info">
                        <div className="amenities_detail__name">
                            <h3>
                                <span dangerouslySetInnerHTML={{
							    __html: `${this.state.title}`
						        }} /><img alt="" onClick={this.toggleDetailDescription.bind(this)} className="amenities_detail__description_toggler" src={require('./'+toggleButtonSrc).default} />
                            </h3>
                        </div>
                        <div className={descriptionClasses}>
                            <div className="text">
                                <p>{this.state.description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Slide;
