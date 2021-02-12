import { Component } from 'react';
import Header from './Header';

class MobileMenu extends Component {
    constructor(props) {
        super(props);
    
    }
    goToSlide(idx){
        const {goToSlideIdx} = this.props;
        goToSlideIdx(idx)
        this.toggleMobileMenu()
    }
    toggleMobileMenu(){
        const {toggleMobileMenu} = this.props;
        toggleMobileMenu();
    }
    
    render(){
        const isOpen = this.props.open
        let mobileMenuClasses = 'mobile-menu'
        mobileMenuClasses += this.props.open ? ' open' : ''
		return(
            <div className={mobileMenuClasses}>
                <Header theme='light' open={true} toggleMobileMenu={this.toggleMobileMenu.bind(this)} />
                <div className="mobileMenuLinks">
                    <a onClick={() => this.goToSlide(2)} href="#"><h2>Property</h2></a>
                    <a onClick={() => this.goToSlide(4)} href="#"><h2>Amenities</h2></a>
                    <a onClick={() => this.goToSlide(6)} href="#"><h2>The View</h2></a>
                    <a onClick={() => this.goToSlide(8)} href="#"><h2>Residences & Penthouses</h2></a>
                    <a onClick={() => this.goToSlide(13)} href="#"><h2>Availability</h2></a>
                    <a onClick={() => this.goToSlide(10)} href="#"><h2>Development Team Story</h2></a>
                    <a onClick={() => this.goToSlide(12)} href="#"><h2>Discover</h2></a>
                    <a onClick={() => this.goToSlide(15)} href="#"><h2>Contact</h2></a>
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
                    <div className="address">1300 Manhattan Avenue Union City, NJ 07087 | Manhattan Avenue Capital 1300, LLC<br />Richard Stabile | RE/MAX Real Estate Limited | <span className='phoneNum'><a href='tel:2014007487'>201-400-7487</a></span></div>
                    <div className="copyright">&copy; 2020 Hoboken Heights. All rights reserved.</div>
                </div>
            </div>
        )
    }
}

export default MobileMenu;
