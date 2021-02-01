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
    handleLangChange = e => {
        let element = e.target
		const scrolled = element.scrollTop > 0 ? true : false
        this.props.onSlideScroll(scrolled);
    }
    render(){
        const slideObj = this.props.obj;

		let slideClasses = "slide "
		let videoClasses = 'background-video'
		let landing_page_sound_player_classes = 'landing_page_sound_player';
		let centerTextClasses = 'center';
		let centerBottomClasses = "centerBottom";

		const isCurrent = this.props.isCurrent;
		const headerOptions = {
			addCornerLogo: slideObj.addCornerLogo,
			addDarkCornerLogo: slideObj.addDarkCornerLogo,
			animateCornerLogoOnStart: slideObj.animateCornerLogoOnStart,
			cornerLogoHideOnLastSlide: slideObj.cornerLogoHideOnLastSlide,
			cornerLogofadeIn: slideObj.cornerLogofadeIn
		};
		
		slideClasses += slideObj.slideClasses != undefined ? " " + slideObj.slideClasses : '';
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

		let right_arrow_bouncing = <div className='right_arrow_bouncing' onClick={() => this.slideHorizontal('right')}/>
		let left_arrow_bouncing = <div className='left_arrow_bouncing' onClick={() => this.slideHorizontal('left')}/>
        
        
        return(
            <div className={slideClasses} style={slideStyles} onScroll={this.handleLangChange}>
                {slideObj.slideTemplate == 'home' && 
                    <SlideHome />
                }
                {slideObj.slideTemplate == 'exteriorLightToggle' && 
                    <SlideExteriorLightToggle />
                }
            </div>
        )
    }
}

class SlideHome extends Component {
    render(){
        return(
            <>
                <img className="animatedLogo" src={animatedLogo} alt=""/>
                <div className="downArrowContainer">
                    <img className="downArrow" src={downArrow}></img>
                </div>
            </>
        )
    }
}
class SlideExteriorLightToggle extends Component {
    render(){
        return(
            <>
                <img className="animatedLogo" src={animatedLogo} alt=""/>
                <div className="downArrowContainer">
                    <img className="downArrow" src={downArrow}></img>
                </div>
            </>
        )
    }
}

export default Slide;
