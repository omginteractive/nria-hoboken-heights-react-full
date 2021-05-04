import { Component } from 'react';
import {connect} from 'react-redux'
import { toggleMenuState } from "../redux/actions/menuActions";
import { hideAvailabilityPlanModal } from "../redux/actions/slideActions";
import $ from 'jquery'
class Header extends Component {
    constructor(props) {
        super(props);
    
        this.darkLogo = 'images/logos/Logo-small-black.svg'
        this.lightLogo = 'images/logos/Logo-small-white.svg'
        this.lightCloseBtn = 'images/mobile_menu_x.svg'
    }
    shouldComponentUpdate(nextProps, nextState){
        const filmSlideMouseMovementDetectedChanged = this.props.filmSlideMouseMovementDetected !== nextProps.filmSlideMouseMovementDetected
        const slideChanged = this.props.currSlideIdx !== nextProps.currSlideIdx
        const menuOpenChanged = this.props.menuOpen !== nextProps.menuOpen
        const availabilityModalToggled = this.props.availabilityPlanModalEnabled !== nextProps.availabilityPlanModalEnabled

        const availabilityModalEnabled = this.props.availabilityPlanModalEnabled
        if(availabilityModalEnabled && slideChanged) this.hideAvailabilityPlanModal(false)//closes availabilityModal on slidechange
        // const themeChanged = this.props.currSlideIdx !== nextProps.currSlideIdx
        // const mobileThemeChanged = nextProps.themeMobile !== this.props.themeMobile
        //fixme - can change this to be more specific to test if theme has changed on desktop or mobile
        return menuOpenChanged || slideChanged || availabilityModalToggled || filmSlideMouseMovementDetectedChanged
    }

    slideToContact(){
        const {goToContactSlide} = this.props;
        goToContactSlide()
    }

    handleHeaderLogoClick(){
        //This should change location to second homepage slide directly if not on homepage
        const {goToSlide} = this.props;
        if(goToSlide) {//This checks to see if function exists. It will exist for the normal fixed header but not for the mobile header
            goToSlide(1)
        }
    }
    hideAvailabilityPlanModal(animateScroll = true){
        this.props.hideAvailabilityPlanModal()
        if(animateScroll){
            //don't animate the scroll when switching slides.
            //Otherwise moving to the next slide causes a scroll of availability slide when moving to nextSlide
            $(".slideTemplate-availability").animate({ scrollTop: 0 }, "fast")//scroll up to top in case user scrolled down
        }
    }
    render(){
        const defaultTheme = 'dark'
        const deviceSlideIdx = this.props.isMobileDevice ? this.props.mobileKeys[this.props.currSlideIdx] : this.props.desktopKeys[this.props.currSlideIdx]
        const desktopThemeIsSet = this.props.slideData && this.props.slideData[deviceSlideIdx].headerTheme
        const desktopTheme = desktopThemeIsSet ? desktopThemeIsSet : defaultTheme
        const mobileThemeIsSet = this.props.slideData && this.props.slideData[deviceSlideIdx].headerThemeMobile
        const themeMobile = mobileThemeIsSet ? mobileThemeIsSet : ''
        const availabilityModalEnabled = this.props.availabilityPlanModalEnabled
        const isFilmSlideAndNoMouseMovement = this.props.currSlideIdx === 1 && !this.props.filmSlideMouseMovementDetected
        let fixedHeaderClasses = 'fixed-header '
        fixedHeaderClasses += this.props.mobileMenuHeader ? 'light' : desktopTheme + ' ' + themeMobile
        fixedHeaderClasses += this.props.formSubmitted ? ' hiddenMobile' : ''
        fixedHeaderClasses += isFilmSlideAndNoMouseMovement ? ' hiddenDesktop' : ''

        // let fixedHeaderClasses = 'fixed-header ' + desktopTheme + ' ' + themeMobile
        let inquiryLinkClasses = 'inquiry-link'
        inquiryLinkClasses += !availabilityModalEnabled || this.props.mobileMenuHeader ? ' enabled' : ' hidden'
        let availabilityCloseButtonClasses = 'closeBtn availabilityCloseBtn'
        availabilityCloseButtonClasses += availabilityModalEnabled && !this.props.mobileMenuHeader ? ' enabled' : ' hidden'
        let mobileContactButtonClasses = 'mobile-only contact'
        mobileContactButtonClasses += !availabilityModalEnabled && !this.props.mobileMenuHeader ? ' enabled' : ' hidden'
        const mobileContactButtonClassesLight = mobileContactButtonClasses + ' light'
        const mobileContactButtonClassesDark = mobileContactButtonClasses + ' dark'
        return (
            <header className={fixedHeaderClasses}>
                {this.props.menuOpen && 
                    <img alt='Close Button' className="closeBtn" onClick={this.props.toggleMenuState.bind(this)} src={require('./' + this.lightCloseBtn).default} />
                }
                {!this.props.menuOpen && 
                    <div className="hamburger" onClick={this.props.toggleMenuState.bind(this)}>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                }

                <div className="corner-logo-wrapper">
                    <div className="text" onClick={this.handleHeaderLogoClick.bind(this)}>HOBOKEN HEIGHTS<div className="separator"></div></div>
                    <div className="corner-logo-images">
                        <img alt='Hoboken Heights Logo Light' className="corner-logo light" src={require('./' + this.lightLogo).default} onClick={this.handleHeaderLogoClick.bind(this)} />
                        <img alt='Hoboken Heights Logo Dark' className="corner-logo dark" src={require('./' + this.darkLogo).default} onClick={this.handleHeaderLogoClick.bind(this)} />
                    </div>

                </div>
                <div onClick={this.slideToContact.bind(this)} className={mobileContactButtonClassesLight}><img src={require('./images/mobile_mail.svg').default} alt="" /></div>
                <div onClick={this.slideToContact.bind(this)} className={mobileContactButtonClassesDark}><img src={require('./images/mobile_mail_black.svg').default} alt="" /></div>
                <img className={availabilityCloseButtonClasses} onClick={this.hideAvailabilityPlanModal.bind(this)} src={require('./images/availability_menu_x.svg').default} alt="" />
                <div onClick={this.slideToContact.bind(this)} className={inquiryLinkClasses}>INQUIRE NOW</div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    const availabilityPlanModalEnabled = state.slideData.availabilityPlanModalEnabled
    const isMobileDevice = state.appData.isMobileDevice
    const formSubmitted = state.appData.formSubmitted
    const menuOpen = state.menuData.menuOpen
    const currSlideIdx = state.slideData.currSlideIdx
    const slideData = state.slideData.slides
    const desktopKeys = state.slideData.desktopKeys
    const mobileKeys = state.slideData.mobileKeys
    const filmSlideMouseMovementDetected = state.slideData.filmSlideMouseMovementDetected
    return { formSubmitted, availabilityPlanModalEnabled, isMobileDevice, menuOpen, currSlideIdx, slideData, mobileKeys, desktopKeys, filmSlideMouseMovementDetected}
  }
  export default connect(
    mapStateToProps,
    { toggleMenuState, hideAvailabilityPlanModal }
  )(Header)