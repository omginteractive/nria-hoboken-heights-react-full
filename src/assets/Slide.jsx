import {Component} from 'react';
import animatedLogo from '../assets/images/Motion_logo.gif';
import downArrow from '../assets/images/downarrow.svg';
import leftArrowBlack from '../assets/images/leftArrowBlack.svg';

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
			styles: this.props.obj.styles,
            type: this.props.obj.slideTemplate,
            residencePenthouse: 'penthouse'
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
                    <SlideAmenitiesDetail isCurrent={isCurrent} idx={this.props.amenityDetailsSlideIdx} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'views' &&
                    <SlideViews configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'residencePenthouse' &&
                    <SlideResidencePenthouse />
                }
                {slideObj.slideTemplate === 'residencePenthouseFullscreen' &&
                    <SlideResidencePenthouseFullscreen  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseDetail' &&
                    <SlideResidencePenthouseDetail  configuration={slideObj}  />
                }
            </div>
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
    
    toggleImageExpansion(){
        const newImageState = !this.state.imageExpanded
        this.setState({
            imageExpanded: newImageState
        })
    }
    render(){
        let details_classes = 'residencePenthouseDetail'
        details_classes += this.state.imageExpanded ? ' expandImage' : ''

        return(
            <>
                <section className={details_classes}>
                    <div className='residencePenthouseDetail__details'>
                        <h2>Exclusive Luxury Penthouses</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <div className="residencePenthouseDetail__features_list">
                            <div className="headling">Features:</div>
                            <ul>
                                <li>Lorem Ipsum Lorem Ipsum</li>
                                <li>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</li>
                                <li>Lorem Ipsum Lorem Ipsum</li>
                                <li>Lorem Ipsum Lorem Ipsum Lorem</li>
                                <li>Lorem Ipsum</li>
                                <li>Lorem Ipsum Lorem Ipsum Lorem Ipsum</li>
                                <li>Lorem Ipsum Lorem</li>
                                <li>Lorem Ipsum Lorem Ipsum</li>
                            </ul>
                        </div>
                        <div className="residencePenthouseDetail__arrow_button_container">
                            <div className="leftArrowContainer">
                                <img alt='Left Arrow' className="leftArrow" src={leftArrowBlack}></img>
                            </div>
                            <div className="btn light">Inquire now</div>
                        </div>
                    </div>
                    <div className="residencePenthouseDetail__image_container">
                        <div onClick={this.toggleImageExpansion.bind(this)} className="residencePenthouseDetail__expand_toggler">
                            <div >+</div>
                        </div>
                        <img src={require('./'+'images/penthouse/penthouse.jpg').default} alt=""/>
                    </div>
                </section>
            </>
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

        let image1_classes = 'amenities_detail__image '
        image1_classes += this.state.image1IsNew ? 'new' : 'old'
        let image2_classes = 'amenities_detail__image '
        image2_classes += !this.state.image1IsNew ? 'new' : 'old'
        let amenities_detail_name_classes = 'amenities_detail__name'
        amenities_detail_name_classes += !this.state.amenityNameVisibility ? ' runFadeOutAnimation' : ' runFadeInAnimation'

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
                        <div className={descriptionClasses}>
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
        let image1_classes = 'views_section__image '
        image1_classes += this.state.image1IsNew ? 'new' : 'old'
        let image2_classes = 'views_section__image '
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
                            <input onMouseUp={this.handleMouseUp.bind(this)} onChange={this.handleTimeChange.bind(this)} type="range" min="0" max={this.props.configuration.views.length - 1} step="0.005" value={this.state.timeSliderValue}/>
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
    
    render(){
        return(
            <>
                <div className="btn">Residences</div>
                <div className="btn">Penthouses</div>
            </>
        )
    }
}

class SlideResidencePenthouseFullscreen extends Component {
    nextSlide(){
        this.props.methods.scrollToNextSlide()
    }
    render(){
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
                    </div>
                }
                <img className='residencePenthouseFullscreenImage' alt="" src={require('./'+'images/penthouse/penthouse.jpg').default} />
            </>
        )
    }
}
export default Slide;
