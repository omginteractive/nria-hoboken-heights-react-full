import { Component } from 'react';
class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          
        }
        this.darkLogo = 'images/logos/NIRMA_Logo_Symbol_Black.png'
        this.lightLogo = 'images/logos/NIRMA_Logo_Symbol_White.png'
        this.lightCloseBtn = 'images/mobile_menu_x.svg'
        
    }
    toggleMobileMenu(){
        const {toggleMobileMenu} = this.props;
		toggleMobileMenu();
    }

    slideToContact(){
        const {goToContactSlide} = this.props;
        goToContactSlide()
    }

    render(){
        const defaultTheme = 'dark'
        const theme = this.props.theme ? this.props.theme : defaultTheme
        const themeMobile = this.props.themeMobile ? this.props.themeMobile : ''

        let fixedHeaderClasses = 'fixed-header ' + theme + ' ' + themeMobile
        return (
            <header className={fixedHeaderClasses}>
                {this.props.open && 
                    <img alt='Close Button' className="closeBtn" onClick={this.toggleMobileMenu.bind(this)} src={require('./' + this.lightCloseBtn).default} />
                }
                {!this.props.open && 
                    <div className="hamburger" onClick={this.toggleMobileMenu.bind(this)}>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                }

                <div className="corner-logo-wrapper">
                    <div className="text">HOBOKEN HEIGHTS<div className="separator"></div></div>
                    <div className="corner-logo-images">
                        <img alt='Hoboken Heights Logo Light' className="corner-logo light" src={require('./' + this.lightLogo).default} />
                        <img alt='Hoboken Heights Logo Dark' className="corner-logo dark" src={require('./' + this.darkLogo).default} />
                    </div>

                </div>
                <div className="mobile-only contact light"><img src={require('./images/mobile_mail.svg').default} alt="" /></div>
                <div className="mobile-only contact dark"><img src={require('./images/mobile_mail_black.svg').default} alt="" /></div>
                <div onClick={this.slideToContact.bind(this)} className="inquiry-link">INQUIRE NOW</div>
            </header>
        )
    }
}

export default Header;
