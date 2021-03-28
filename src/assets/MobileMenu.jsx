import { Component } from 'react';
import Header from './Header';
import {connect} from 'react-redux'
import { toggleMenuState, toggleMenuAndTransition, endMenuTransition } from "./../redux/actions/menuActions";
class MobileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
			isTransitioning: false
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const menuStatusChanged = nextProps.menuOpen !== this.props.menuOpen
        const transitioningStatusChanged = nextProps.menuIsTransitioning !== this.props.menuIsTransitioning
        return menuStatusChanged || transitioningStatusChanged
    }
    goToSlide(idx){
        this.setState({
            isTransitioning: true,
        })
        const {goToSlideIdx} = this.props;
        goToSlideIdx(idx)
        this.props.toggleMenuAndTransition()
    }
    
    goToContactSlide(){
        const {goToContactSlide} = this.props;
        goToContactSlide();
        this.props.toggleMenuAndTransition()
    }
    handleMenuTransitionEnd(e){
        const isMenuElement = e.target.classList.contains('mobile-menu')
        if(isMenuElement) {
            this.props.endMenuTransition()
        }
    }
    render(){
        const isMobile = this.props.isMobileDevice
        let mobileMenuClasses = 'mobile-menu'
        mobileMenuClasses += this.props.menuOpen ? ' open' : ' closed'
        mobileMenuClasses += this.props.menuIsTransitioning ? ' closing' : ''
        
        const propertyLink = isMobile ? 2 : 2
        const amenitiesLink = isMobile ? 4 : 4
        const viewLink = isMobile ? 6 : 6
        const residencePenthouseLink = isMobile ? 7 : 7
        const availabilityLink = isMobile ? 11 : 10
        const developmentTeamLink = isMobile ? 12 : 11
        const discoverLink = isMobile ? 16 : 14
        const contactFormSlideIdx = this.props.contactFormSlideIdx
		return(
            <div className={mobileMenuClasses} onTransitionEnd={this.handleMenuTransitionEnd.bind(this)}>
                <Header
                goToContactSlide={this.goToContactSlide.bind(this)}
                mobileMenuHeader={true}
                // open={true} 
                // toggleMobileMenu={this.toggleMobileMenu.bind(this)} 
                />
                <div className="mobileMenuLinks">
                    <div className="linksWrapper">
                        <div className='link' onClick={() => this.goToSlide(propertyLink)}><h2>Property</h2></div>
                        <div className='link' onClick={() => this.goToSlide(amenitiesLink)}><h2>Amenities</h2></div>
                        <div className='link' onClick={() => this.goToSlide(viewLink)}><h2>The View</h2></div>
                        <div className='link' onClick={() => this.goToSlide(residencePenthouseLink)}><h2>Residences & Penthouses</h2></div>
                        <div className='link' onClick={() => this.goToSlide(availabilityLink)}><h2>Availability</h2></div>
                        <div className='link' onClick={() => this.goToSlide(developmentTeamLink)}><h2>Development Team Story</h2></div>
                        <div className='link' onClick={() => this.goToSlide(discoverLink)}><h2>Discover</h2></div>
                        <div className='link' onClick={() => this.goToSlide(contactFormSlideIdx)}><h2>Contact</h2></div>
                    </div>
                </div>
                <div className="mobileMenuContact">
                    <div className="socialMedias">
                        <div className="socialMedia">
                            <a href='#' target="_blank">Facebook</a>
                        </div>
                        <span className='separator'>|</span>
                        <div className="socialMedia">
                            <a href='#' target="_blank">Instagram</a>
                        </div>
                    </div>
                    <div className="address">1300 Manhattan Avenue Union City, NJ 07087 <br className='line-break' /><span className="separator">|</span> Manhattan Avenue Capital 1300, LLC<br />Richard Stabile | RE/MAX Real Estate Limited | <span className='phoneNum'><a href='tel:2014007487'>201-400-7487</a></span></div>
                    <div className="copyright">&copy; 2020 Hoboken Heights. All rights reserved.</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const isMobileDevice = state.appData.isMobileDevice
    const menuOpen = state.menuData.menuOpen
    const menuIsTransitioning = state.menuData.menuIsTransitioning
    return { isMobileDevice, menuOpen, menuIsTransitioning}
  }
  export default connect(
    mapStateToProps,
    {toggleMenuState, toggleMenuAndTransition, endMenuTransition}
  )(MobileMenu);