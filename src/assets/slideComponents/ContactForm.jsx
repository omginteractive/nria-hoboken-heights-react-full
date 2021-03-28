import {Component} from 'react';
import React from 'react';
// import leftArrowBlack from '../assets/images/leftArrowBlack.svg';
import $ from 'jquery'
import {connect} from 'react-redux'
// import _ from "lodash";
import { select2Enable, select2Disable } from "../.././redux/actions/appActions";



class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
			// formSubmitted: '',
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	componentDidMount() {
		//This is a fix to detect changes on the select2
		$(this.refs.how_you_heard).on("change",  (e)=> {
			this.handleInputChange(e)
        })
        this.createHubspotForm()//this is used to create the form on load
	}
    componentDidUpdate(){
        if(!this.props.select2Activated) {
            this.activateSelect2FormElement()
        }
    }
    activateSelect2FormElement(){
        const select2Exists = $.fn.select2
        const select2Initialized = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').hasClass("select2-hidden-accessible")
        const hubspotFormExists = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').length
        if(!select2Initialized && select2Exists && hubspotFormExists) {
            $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
                placeholder: "How did you hear of us?*",
                width: 'resolve',
                minimumResultsForSearch: -1
            });
            const disabledOptionText = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217 option:disabled')[0].innerHTML
            $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
                placeholder: disabledOptionText,
                width: 'resolve',
                minimumResultsForSearch: -1
            })
            this.props.select2Enable()
        }
    }
	createHubspotForm(){
		let self = this
        let jQuery = $
        const recaptcha_branding = `<div class='recaptcha_branding'>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</div>`;
        if(window.hbspt) {

            /*
             * The mobile and desktop contact forms are on different slides. This is because the header theme of the
             * mobile contact form is light while the desktop is black. Because there are 2 contact slides we need
             * multiple contact forms and both forms need to be initialized.
             * The following create() functions will initialize both forms
             * 
             * For desktop using #hubspotFormWrapper and for mobile using #hubspotFormWrapperMobile
             * 
             * Any changes to create() may need to be done for both create() functions
             *
             */
            window.hbspt.forms.create({
                portalId: "5163160",
                formId: "4c41114a-2807-4884-b5e9-d6b49d56d217",
                target: '#hubspotFormWrapper',
                onFormSubmit: function($form) {
                    jQuery('#page').addClass('formSubmitted')
                    const formHeight = jQuery('.contactPageWrapper .contactForm').outerHeight()
                    jQuery('.contactPageWrapper .contactForm').outerHeight(formHeight)
                },
                onFormReady: function(){
                    jQuery("#hubspotFormWrapper .form-columns-0").append(recaptcha_branding);
    
                    jQuery( ".hs-input" ).on('focusout', function() {
                        self.setState({ inputFocusOutEvent: true });
                    })
                    self.activateSelect2FormElement()
                },
                onFormSubmitted: function() {
                    self.createHubspotForm()
                    self.activateSelect2FormElement()
                }
            })
        }
        else {
            setTimeout(function(){
                self.createHubspotForm()
            }, 5000)
            
        }
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});

		console.log('changed')
	}

	handleSubmit() {
		this.setState ({
			// formSubmitted: true,
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
		});
		const {formSubmitted} = this.props;
		formSubmitted();
	}
	resetForm(){
		// this.setState ({
		// 	formSubmitted: null
		// })
		const {formCleared} = this.props;
		formCleared();
	}

	scrollToTop(){
		const {scrollToFirstSlide} = this.props
		scrollToFirstSlide()
	}

    render(){
		let contactFormClasses = 'contactForm';
        return (
			<form className={contactFormClasses}>
				<div className="submittedFormOverlay">
					<div className="text">THANK YOU!</div>
					<div className="closeBtn" onClick={this.resetForm}>
						<img src={require('.././images/form_close_btn.svg').default} />
					</div>
				</div>
				<div className='headline'>{this.props.formHeading}</div>
				<div className="hubspotFormWrapper" id='hubspotFormWrapper'>
				</div>
                <img className='mobile-only nriaLogo' src={require('.././images/logos/NRLiving--White.png').default} alt="NRIA Logo" />
			</form>
		);
	}
}


const mapStateToProps = state => {
    const select2Activated = state.appData.select2Activated
    return { select2Activated }
  }

  export default connect(
    mapStateToProps,
    { select2Enable, select2Disable }
  )(ContactForm);