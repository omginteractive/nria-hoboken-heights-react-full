import { Component } from 'react';
import {connect} from 'react-redux'
import { toggleMenuState } from "./../redux/actions/menuActions";
class Header extends Component {
    constructor(props) {
        super(props);
    
        this.darkLogo = 'images/logos/Logo-small-black.svg'
        this.lightLogo = 'images/logos/Logo-small-white.svg'
        this.lightCloseBtn = 'images/mobile_menu_x.svg'
        
    }
    shouldComponentUpdate(nextProps, nextState){
        const slideChanged = this.props.currSlideIdx !== nextProps.currSlideIdx
        // const themeChanged = this.props.currSlideIdx !== nextProps.currSlideIdx
        // const mobileThemeChanged = nextProps.themeMobile !== this.props.themeMobile
        //fixme - can change this to be more specific to test if theme has changed on desktop or mobile
        return slideChanged
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

    render(){
        const defaultTheme = 'dark'
        const deviceSlideIdx = this.props.isMobileDevice ? this.props.mobileKeys[this.props.currSlideIdx] : this.props.desktopKeys[this.props.currSlideIdx]
        const desktopThemeIsSet = this.props.slideData && this.props.slideData[deviceSlideIdx].headerTheme
        const desktopTheme = desktopThemeIsSet ? desktopThemeIsSet : defaultTheme
        const mobileThemeIsSet = this.props.slideData && this.props.slideData[deviceSlideIdx].headerThemeMobile
        const themeMobile = mobileThemeIsSet ? mobileThemeIsSet : ''

        let fixedHeaderClasses = 'fixed-header '
        fixedHeaderClasses += this.props.mobileMenuHeader ? 'light' : desktopTheme + ' ' + themeMobile
        // let fixedHeaderClasses = 'fixed-header ' + desktopTheme + ' ' + themeMobile
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
                <div onClick={this.slideToContact.bind(this)} className="mobile-only contact light"><img src={require('./images/mobile_mail.svg').default} alt="" /></div>
                <div onClick={this.slideToContact.bind(this)} className="mobile-only contact dark"><img src={require('./images/mobile_mail_black.svg').default} alt="" /></div>
                <div onClick={this.slideToContact.bind(this)} className="inquiry-link">INQUIRE NOW</div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    const isMobileDevice = state.appData.isMobileDevice
    const menuOpen = state.menuData.menuOpen
    const currSlideIdx = state.slideData.currSlideIdx
    const slideData = state.slideData.slides
    const desktopKeys = state.slideData.desktopKeys
    const mobileKeys = state.slideData.mobileKeys
    return { isMobileDevice, menuOpen, currSlideIdx, slideData, mobileKeys, desktopKeys}
  }
  export default connect(
    mapStateToProps,
    { toggleMenuState }
  )(Header)