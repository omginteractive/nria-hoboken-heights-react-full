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
        
        const propertyLink = isMobile ? 3 : 3
        const amenitiesLink = isMobile ? 5 : 5
        const viewLink = isMobile ? 7 : 7
        const residencePenthouseLink = isMobile ? 8 : 8
        const availabilityLink = isMobile ? this.props.availabilitySlideIndices.mobile : this.props.availabilitySlideIndices.desktop
        const foundersLink = isMobile ? this.props.foundersSlideIndices.mobile : this.props.foundersSlideIndices.desktop
        // const developmentTeamLink = isMobile ? 13 : 12
        const discoverLink = isMobile ? this.props.discoverSlideIndices.mobile : this.props.discoverSlideIndices.desktop
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
                        <div className='link' onClick={() => this.goToSlide(foundersLink)}><h2>Gold Founding Members</h2></div>
                        {/* <div className='link' onClick={() => this.goToSlide(developmentTeamLink)}><h2>Development Team Story</h2></div> */}
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
    const availabilitySlideIndices = state.slideData.availabilitySlideIndices
    const foundersSlideIndices = state.slideData.foundersSlideIndices
    const discoverSlideIndices = state.slideData.discoverSlideIndices
    return { isMobileDevice, menuOpen, menuIsTransitioning, availabilitySlideIndices, foundersSlideIndices, discoverSlideIndices}
  }
  export default connect(
    mapStateToProps,
    {toggleMenuState, toggleMenuAndTransition, endMenuTransition}
  )(MobileMenu);