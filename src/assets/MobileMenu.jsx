import { Component } from 'react';
import Header from './Header';

class MobileMenu extends Component {
    goToSlide(idx){
        const {goToSlideIdx} = this.props;
        goToSlideIdx(idx)
        this.toggleMobileMenu()
    }
    toggleMobileMenu(){
        const {toggleMobileMenu} = this.props;
        toggleMobileMenu();
    }
    goToContactSlide(){
        const {goToContactSlide} = this.props;
        goToContactSlide();
        this.toggleMobileMenu();
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.open != this.props.open
    }
    render(){
        // const isOpen = this.props.open
        const isMobile = this.props.isMobileDevice
        let mobileMenuClasses = 'mobile-menu'
        mobileMenuClasses += this.props.open ? ' open' : ''

        const contactFormSlideIdx = this.props.contactFormSlideIdx
        const viewLink = isMobile ? 6 : 6
        const residencePenthouseLink = isMobile ? 7 : 7
        const developmentTeamLink = isMobile ? 11 : 10
        const discoverLink = isMobile ? 15 : 13
		return(
            <div className={mobileMenuClasses}>
                <Header goToContactSlide={this.goToContactSlide.bind(this)}  theme='light' open={true} toggleMobileMenu={this.toggleMobileMenu.bind(this)} />
                <div className="mobileMenuLinks">
                    <div className="linksWrapper">
                        <div className='link' onClick={() => this.goToSlide(2)}><h2>Property</h2></div>
                        <div className='link' onClick={() => this.goToSlide(4)}><h2>Amenities</h2></div>
                        <div className='link' onClick={() => this.goToSlide(viewLink)}><h2>The View</h2></div>
                        <div className='link' onClick={() => this.goToSlide(residencePenthouseLink)}><h2>Residences & Penthouses</h2></div>
                        <div className='link' onClick={() => this.goToSlide(contactFormSlideIdx)}><h2>Availability</h2></div>
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

export default MobileMenu;
