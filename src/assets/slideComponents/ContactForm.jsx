import {Component} from 'react';
import React from 'react';
// import leftArrowBlack from '../assets/images/leftArrowBlack.svg';
import $ from 'jquery'
import {connect} from 'react-redux'
// import _ from "lodash";
import { select2Enable, select2Disable, contactFormSubmitted, contactFormReset } from "../.././redux/actions/appActions";



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

        //See handleResizeOnAndroid() for details
        if(this.props.operatingSys === 'android') {
            this.timerHandle = null;
            window.addEventListener('resize', () => this.handleResizeOnAndroid())
            
            const form = document.getElementById('contactForm')
            form.addEventListener('focusout', () => this.handleResizeOnAndroid())
        }
	}
    componentDidUpdate(){
        if(!this.props.select2Activated) {
            this.activateSelect2FormElement()
        }
    }

    /*
	 * handleResizeOnAndroid() is used due to android soft keyboards changing the 
	 * viewport height which causes the page to suddenly shift.
	 * 
	 * The resize event is sometimes triggered twice from a single focusOut
	 * event from the .input element. The resizeTime should be large enough to
	 * last long enough for the second event to occur before the timeout is cleared.
	 * 
	 * The animation stopper will run if a text input is active because it is 
	 * is the reason a keyboard would appear
	 * 
	 * It will also run if a text input has recently had an event of focusout because
	 * we dont want to have animations as the keyboard hides itself
	 */

	handleResizeOnAndroid(){
		const resizeTime = 1500; 
		const inputIsActive = $(document.activeElement).hasClass('hs-input');
		if(inputIsActive || this.state.inputFocusOutEvent) {
			this.setState({ inputFocusOutEvent: false });
			document.body.classList.add("resize-animation-stopper");
			clearTimeout(this.timerHandle);
			this.timerHandle = setTimeout(() => {
				document.body.classList.remove("resize-animation-stopper");
			}, resizeTime);
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
            window.hbspt.forms.create({
                portalId: "5163160",
                formId: "4c41114a-2807-4884-b5e9-d6b49d56d217",
                target: '#hubspotFormWrapper',
                onFormSubmit: function($form) {
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
                    self.handleFormSubmission()
                }
            })
        }
        else {
            setTimeout(function(){
                self.createHubspotForm()
            }, 5000)
            
        }
	}
    handleFormSubmission(){
        this.createHubspotForm()
        this.activateSelect2FormElement()
        this.props.contactFormSubmitted()
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
        $('.contactPageWrapper .contactForm').outerHeight('auto')
        this.props.contactFormReset()
	}

	scrollToTop(){
		const {scrollToFirstSlide} = this.props
		scrollToFirstSlide()
	}

    render(){
		let contactFormClasses = 'contactForm';
        return (
			<form className={contactFormClasses} id='contactForm'>
				<div className="submittedFormOverlay">
					<div className="text">THANK YOU!</div>
					<div 
                        className="closeBtn" 
                        onClick={this.resetForm}
                        >
						<img src={require('.././images/form_close_btn.svg').default} />
					</div>
				</div>
				<div className='headline'>{this.props.formHeading}</div>
				<div className="hubspotFormWrapper" id='hubspotFormWrapper'>
				</div>
                <img className='mobile-only nriaLogo' src={require('.././images/logos/NRLiving--White.png').default} alt="NRIA Logo" />
			</form>
		)
	}
}


const mapStateToProps = state => {
    const select2Activated = state.appData.select2Activated
    const operatingSys = state.appData.operatingSys
    return { select2Activated, operatingSys }
  }

  export default connect(
    mapStateToProps,
    { select2Enable, select2Disable, contactFormSubmitted, contactFormReset }
  )(ContactForm);