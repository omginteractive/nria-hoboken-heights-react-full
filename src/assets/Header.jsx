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
    render(){
        const defaultTheme = 'dark'
        const theme = this.props.theme ? this.props.theme : defaultTheme

        let fixedHeaderClasses = 'fixed-header ' + theme
        return (
            <header className={fixedHeaderClasses}>
                {this.props.open && 
                    <img className="closeBtn" onClick={this.toggleMobileMenu.bind(this)} src={require('./' + this.lightCloseBtn).default} />
                }
                {!this.props.open && 
                    <div className="hamburger" onClick={this.toggleMobileMenu.bind(this)}>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                }

                <div className="corner-logo-wrapper">
                    <div className="text">HOBOKEN HEIGHTS<div className="separator"></div></div>
                    <div className="corner-logo-wrapper">
                        <img className="corner-logo light" src={require('./' + this.lightLogo).default} />
                        <img className="corner-logo dark" src={require('./' + this.darkLogo).default} />
                    </div>

                </div>
                <div className="inquiry-link">INQUIRE NOW</div>
            </header>
        )
    }
}

export default Header;
