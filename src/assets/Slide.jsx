import { Component } from 'react';
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
                    <img onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
                </div>
            </>
        )
    }
}
class SlideExteriorLightToggle extends Component {
    render(){
        let videoContainerClasses = 'videoContainer'
        videoContainerClasses += ' compact'
        let videoClasses = 'background-video'
        
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect startZoomedIn'
        return(
            <>
                <header class='fixed-header'>
                    <div class="hamburger">
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                    <div class="corner-logo-wrapper">
                        <div class="text">HOBOKEN HEIGHTS<div class="separator"></div></div>
                        <img class="corner-logo" src={require('./images/logos/NIRMA_Logo_Symbol_Black.png').default} />
                    </div>
                    <div className="inquiry-link">INQUIRE NOW</div>
                </header>
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
							<source src='/videos/NIRMA_1_Exterior_High_OFF_Cinemagraphic.mp4' type="video/mp4" />
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
        videoContainerClasses += ' compact'
        let videoClasses = 'background-video'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect'
        return(
            <>
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
							<source src='/videos/NIRMA_1_Exterior_High_OFF_Cinemagraphic.mp4' type="video/mp4" />
							</video>`
						}}
					/>
				}
            </>
        )
    }
}

export default Slide;
