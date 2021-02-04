import React from 'react';
// import flypilotFetchWPRestAPI from './flypilotFetchWPRestAPI.js';
import modules from './assets/modules';
import Slide from './assets/Slide';
import $ from 'jquery'
import _ from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        slidesViewed: [0],
        scrollDebouncer: null,
        transitiongState: 0, // 0 for false -1 for up 1 for down
        currIdx: 0,
        previousScrollVal: 0,
        peakScrollVal: 0,
        readyForScroll: 1,
        browser: '',
        operating_sys: '',
        isiPhone: '',
        touchState: 0,//0 for end, 1 for start, 2 for move
        touchDirection: null,
        touchStartCoordinate: {
            x: null,
            y: null
        },
        slideHasScrolled: null,
			

			
        slides: [{
            slideTemplate: 'home',
            styles: {
                background: "#000",
            },
            
        }, {
            slideTemplate: 'exteriorLightToggle',
            styles: {
                background: "#fff",
            },
            slideClasses: "fullWidthVideo",
            // video: './NIRMA_1_Exterior_High_Cinemagraphic.mp4',
            videoLoop: true,
            videoZoomEffect: true,
        }, {
            slideTemplate: 'fountainPen',
            styles: {
                background: "#fff",
            },
            slideClasses: "fullWidthVideo",
            videoLoop: true,
            videoZoomEffect: true,
        }]
    }

        this.watchForEventEnd = this.watchForEventEnd.bind(this);
		this.firstSlide = this.firstSlide.bind(this);
		this.lastSlide = this.lastSlide.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);


		this.throttleOnScroll = _.throttle(this.throttleOnScroll.bind(this), 100, {leading:true});
		// this.debounceOnScroll = _.throttle(this.debounceOnScroll.bind(this), 3500, {leading: true, trailing:true});


		this.musicMute = this.musicMute.bind(this);
		this.musicPlay = this.musicPlay.bind(this);
		this.musicToggle = this.musicToggle.bind(this);

	
		/*
		 * Browser wheel event inconsistencies
		 * 
		 * Chrome - outputs many consecutive events that start with deltaY of 1/-1 and can 
		 * go into the hundreds depending on how quickly you tried to scroll. 
		 * Even the smallest consistent scroll can output multiple events of deltaY = 1/-1
		 * A new deltaY event can be created every hundreth of a second. A single scroll can output
		 * hundreds of deltaY events.
		 * 
		 * Safari - usually only outputs a single wheel event whether the scroll is long and slow or big and quick
		 * The deltaY will be 1 or -1. In some cases when the scroll is very quick, deltaY events are created in a manner similar to Chrome
		 * 
		 * Firefox on Mac is similar to Chrome
		 * 
		 * Firefox on Windows is a mix of both Chrome's and Safari's style
		 * With small quick scrolls, only a single event is output
		 * With long slow scrolls, a new deltaY event is created about every second
		 * With quick big scrolls, many events are created from deltaY of 3 to about 30, 
		 * sometimes every few ms, but it doesnt create nearly as many events as Chrome. A single scroll can output
		 * dozens of deltaY events
		 *
		 * Opera scrolls in increments of 100. A normal scroll will execute 20-30 deltaY values of 100. 
		 * A hard scroll executes a strange output. An example would be:
		 * values of 100x6 200x1 100x6 300x1 100x10 all for a single scroll 
		 * 
		*/
		let browser;
		const user_agent = navigator.userAgent.toLowerCase();
		if (user_agent.indexOf('windows') != -1){
			this.state.operating_sys = 'windows';
		}
		else if(navigator.userAgent.indexOf('OPR') != -1 || navigator.userAgent.indexOf('Opera') != -1) {
			this.state.operating_sys = 'opera';
		}
		else if (user_agent.indexOf('android') != -1){
			this.state.operating_sys = 'android';
		}
		else if (user_agent.indexOf('macintosh') != -1){
			this.state.operating_sys = 'macintosh';
		}

		if (user_agent.indexOf('safari') != -1) {
			if (user_agent.indexOf('chrome') > -1) {
				browser= 'chrome';
			} else {
				browser ='safari';
			}
		}
		else if (user_agent.indexOf('firefox') != -1) {
			browser ='firefox';
		}
		this.state.browser= browser;

		this.mobileMenuElement = React.createRef()
		this.headerElement = React.createRef()

		this.state.isiPhone = navigator.platform== "iPhone"
    }

    componentDidMount() {
    	window.addEventListener('keydown', (event) => {
			if (!event.target.classList.contains('input')) {
				if (event.code === "ArrowUp") this.prevSlide()
				else if (event.code === "ArrowDown") this.nextSlide()
				else if (event.code === "ArrowLeft") this.prevSlide()
				else if (event.code === "ArrowRight") this.nextSlide()
			}
        });
		//See handleResizeOnAndroid() for details
		if(this.state.operating_sys === 'android') {
			this.timerHandle = null;
			window.addEventListener('resize', () => this.handleResizeOnAndroid())
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
	componentDidUpdate() {
		// const that = this;
		return;
		// this.refs.inner.addEventListener('transitionend', (evt) => {
		// 	that.setState({
		// 		transitiongState: 0,
		// 		currIdx: (this.state.currIdx + delta)
		// 	});
		// }, false);
	}
	// debounceOnScroll() {
	// 	//very long scrolls last 3.5 seconds, should be safe to zero out the scroll at that point
	// 	//this would create a more responsive experience since a deltaY of 1 would then trigger a slide
	
	// 	this.setState({previousScrollVal: 0});
	// }

	musicMute(evt) {
		this.setState({ isPlaying: false });
	}
	musicPlay(evt) {
		this.setState({ isPlaying: true });
	}
	musicToggle(){
		this.setState({ isPlaying: !this.state.isPlaying })
	}
	scrollSlide(deltaY){
        const isScrollingDown = deltaY > 0;
		if (isScrollingDown) {
			this.nextSlide();
		} else {
			this.prevSlide();
		}
	}


	/*
	 * This function is used because on Firefox Android the videos will not autoplay
	 * This function is executed at the end of every touch event and will continue to 
	 * execute each touch event until Firefox allows the user to play the video.
	 * Firefox will not allow the video to play until a tap event occurs - not a touchdrag.
	 */
	playVideos(){
		let self = this
		if(this.state.videosPlayed) return
		const allVideos = document.querySelectorAll('.background-video')
		allVideos.forEach(function(video){
			const playPromise = video.play()
			if (playPromise !== undefined) {
				playPromise.then(function() {
					self.setState({ videosPlayed: true })
				}).catch(function(error) {
				  console.log('play failed', error)
				});
			}
		})
		
		  
	}

	/*
	 * enableScroll()
	 * Some browsers have the smallest deltaY above 0 at 100 and will never go to 0. This is problematic because
	 * if a single deltaY of 100 is triggered, the first scroll will run, but then after a few moments if a second
	 * deltaY of 100 is triggered, we need a way to enable the scroll feature between the two events to make sure
	 * the second event triggers a scroll.
	 * This can run on browsers that don't have this issue without complication.
	 */
	enableScroll(){
		this.setState({
			readyForScroll: true,
			previousScrollVal: 0
		});
		this.scrollDebouncer = null
	}
	throttleOnScroll(deltaY) {
        if(this.scrollDebouncer != null) {
			clearTimeout(this.scrollDebouncer)
		}
		this.scrollDebouncer=setTimeout(this.enableScroll.bind(this),500);
		if (Math.abs(deltaY) >= 1 && this.state.readyForScroll) {
			if (Math.abs(deltaY) > Math.abs(this.state.previousScrollVal)) {
				this.scrollSlide(deltaY)
				this.setState({peakScrollVal: deltaY});
				this.setState({readyForScroll: null});
			}
		}
		else {
			if (Math.abs(this.state.peakScrollVal)/2 >= Math.abs(deltaY)) {
				this.setState({readyForScroll: true});
			}
			else if (Math.abs(deltaY) > Math.abs(this.state.peakScrollVal)) {
				this.setState({peakScrollVal: deltaY});
			}
		}

		this.setState({previousScrollVal: deltaY});
	}
	handleScrollEvent(evt) {
        // console.log(1)
		// const deltaY = evt.deltaY;
		// this.throttleOnScroll(deltaY);
		// this.debounceOnScroll(deltaY);
		return;
		// const isScrollingDown = deltaY > 0;
		// if (isScrollingDown) {
		// 	this.nextSlide();
		// } else {
		// 	this.prevSlide();
		// }
	}
	handleWheelEvent(evt) {
        const deltaY = evt.deltaY;
		// const browserWithSingleScrollEvent = this.state.browser == 'safari' || (this.state.browser == 'firefox' && this.state.operating_sys != 'macintosh');
		// if(browserWithSingleScrollEvent) {
		// 	this.scrollSlide(deltaY)
		// }
		// else {
		// 	this.throttleOnScroll(deltaY);
		// }
		this.throttleOnScroll(deltaY);
		// this.debounceOnScroll(deltaY);
		return;
		// const isScrollingDown = deltaY > 0;
		// if (isScrollingDown) {
		// 	this.nextSlide();
		// } else {
		// 	this.prevSlide();
		// }
	}
	watchForEventEnd(e) {
        //The onTransitionEnd event triggers many properties and not only for .slides_inner . We only want to run this function for the transform property
		const isSlidesInner = e.target.classList.contains('slides_inner');
		const isHome = e.target.classList.contains('slideTemplate-home');
		if(!isSlidesInner && !isHome) {
			return;
		}

		// const transitionProperty = e.propertyName
		// if(transitionProperty != 'transform') return;
		this.setState({transitiongState: 0});
	}
	isTransitioning() {
		return this.state.transitiongState !== 0 || this.state.touchState === 2;
	}
	addIdxToViewedSlides(idx) {
		if(this.state.slidesViewed.includes(idx)) return;

		let slidesViewedArray = this.state.slidesViewed.concat(idx);
		this.setState({ slidesViewed: slidesViewedArray })
	}

	//animationsStopped is used to prevent animation issues with the android keyboard appearing when dealing with form inputs
	animationsStopped() {
		const isStopped = document.body.classList.contains("resize-animation-stopper");
		return isStopped;
	}
	nextSlide() {
		const isFirefoxAndroid = this.state.browser === 'firefox' && this.state.operating_sys === 'android'
		const videosPlayed = this.state.videosPlayed
		if (this.isTransitioning() || this.animationsStopped() || (isFirefoxAndroid && !videosPlayed)) {
			return;
		}
		if(this.state.slides[this.state.currIdx].enableScrolling) {
			const scrollBottom = document.querySelector('.activeSlide').scrollHeight - document.querySelector('.activeSlide').offsetHeight - document.querySelector('.activeSlide').scrollTop;
			if(scrollBottom > 0) {//scrollBottom can be negative
				return;
			}
		}
		const newIdx = this.state.currIdx + 1;
		if (newIdx >= this.state.slides.length) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
		this.handleSlideChange(newIdx)
	}
	prevSlide() {
		if (this.isTransitioning() || this.animationsStopped()) {
			return;
		}
		const positionIsNotAtTopOfSlide = document.querySelector('.activeSlide').scrollTop !== 0;
		if(positionIsNotAtTopOfSlide) {
			return;
		}
		const newIdx = this.state.currIdx - 1;
		if (newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: -1,
			currIdx: newIdx
		});
		this.handleSlideChange(newIdx)
	}
	firstSlide() {
		const newIdx = 0;
		const alreadyOnFirstSlide = this.state.currIdx === newIdx;

		if (this.isTransitioning() || alreadyOnFirstSlide) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
		this.handleSlideChange(newIdx)
	}
	lastSlide() {
		const newIdx = this.state.slides.length - 1;
		const alreadyOnLastSlide = this.state.currIdx === newIdx;

		if (this.isTransitioning() || alreadyOnLastSlide) {
			return;
		}
		if (newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
		this.handleSlideChange(newIdx)
	}

	handleSlideChange(newIdx){
		this.addIdxToViewedSlides(newIdx);
		const isLastSlide = newIdx === this.state.slides.length -1
		// this.mobileMenuElement.current.closeMobileMenu()
		// const notOnLastSlide = this.state.currIdx != this.state.slides.length - 1
		// if(isLastSlide) this.headerElement.current.activatePhantomLogo()
		// else this.headerElement.current.deactivatePhantomLogo()
	}
	handleTouchStart(evt){
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const coordinateObj = {
			x: coordinateX,
			y: coordinateY
		}
		this.setState({
			touchState: 1,
			touchStartCoordinate: coordinateObj
		});
		
	}
	handleTouchMove(evt){
		if(this.state.touchState !== 1) return;
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const horizontalDirection = this.state.touchStartCoordinate.x > coordinateX ? 'right' : 'left';
		const verticalDirection = this.state.touchStartCoordinate.y > coordinateY ? 'down' : 'up';
		const horizontalDifference = Math.abs(this.state.touchStartCoordinate.x - coordinateX);
		const verticalDifference = Math.abs(this.state.touchStartCoordinate.y - coordinateY);
		
		let mainTouchDirection;
		if(verticalDifference > horizontalDifference) {
			mainTouchDirection = verticalDirection
		}
		else {
			mainTouchDirection = horizontalDirection
		}
		
		this.setState({
			touchState: 2,
			touchDirection: mainTouchDirection
		});
		if(mainTouchDirection === 'up') {
			
		}
		else if(mainTouchDirection === 'down') {
			this.nextSlide();
		}
		switch(mainTouchDirection) {
			case 'up':
				this.prevSlide();
				break;
			case 'down':
				this.nextSlide();
				break;
			case 'left':
				this.slideHorizontal('left');
				break;
			case 'right':
				this.slideHorizontal('right');
        break;
      default:
        break;
		}

	}
	handleTouchEnd(){
		this.playVideos()
		this.setState({
			touchState: 0
		});

		$("html, body").animate({ scrollTop: 0 })//possible fix to hide address bar on iPhone when body is > 100vh
	}
	slideHorizontal(direction){
		const key = this.state.currIdx;
		const mobileHorizontalVideoSlideEnabled = this.state.slides[key].mobileHorizontalVideoSlideEnabled;
		if(!mobileHorizontalVideoSlideEnabled) return

		const videoMobileStartPosition = this.state.slides[key].videoMobileStartPosition
		let newVideoMobileStartPosition
		
		if(direction === 'right') {
			if(videoMobileStartPosition === 'left') newVideoMobileStartPosition = 'center'
			else if(videoMobileStartPosition === 'center') newVideoMobileStartPosition = 'right'
			else return
		}
		else {
			if(videoMobileStartPosition === 'right') newVideoMobileStartPosition = 'center'
			else if(videoMobileStartPosition === 'center') newVideoMobileStartPosition = 'left'
			else return
		}

		const slidesStateCopy = this.state.slides
		slidesStateCopy[key].videoMobileStartPosition = newVideoMobileStartPosition
		this.setState({ slides: slidesStateCopy })
	}
	contactFormSubmitted(){
		this.setState({ formSubmitted: true })
	}
	contactFormCleared(){
		this.setState({ formSubmitted: null })
		$('#page').removeClass('formSubmitted')
		$('.contactPageWrapper .contactForm').outerHeight('auto')
		
	}

	createHubspotForm(){
		// let self = this
		// const recaptcha_branding = `<div class='recaptcha_branding'>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</div>`;
		// hbspt.forms.create({
		// 	portalId: "5163160",
		// 	formId: "4c41114a-2807-4884-b5e9-d6b49d56d217",
		// 	target: '#hubspotFormWrapper',
		// 	onFormSubmit: function($form) {
		// 		$('#page').addClass('formSubmitted')
		// 		const formHeight = $('.contactPageWrapper .contactForm').outerHeight()
		// 		$('.contactPageWrapper .contactForm').outerHeight(formHeight)
		// 	},
		// 	onFormReady: function(){
		// 		$("#hubspotFormWrapper .form-columns-0").append(recaptcha_branding);

		// 		$( ".hs-input" ).on('focusout', function() {
		// 			self.setState({ inputFocusOutEvent: true });
		// 		})
		// 	},
		// 	onFormSubmitted: function() {
		// 		self.createHubspotForm()
		// 	}
		// });
	}

	handleSlideScroll = (hasScrolled) => {
        this.setState({slideHasScrolled: hasScrolled});
	}
	
	privacyPolicyModalOpen(){
		this.setState({ privacyPolicyEnabled: true });
		setTimeout(() => this.setState({ privacyPolicyFadeType: "in" }), 0);

	}
	privacyPolicyModalRemove(){
		this.setState({ 
			privacyPolicyEnabled: false,
			privacyPolicyFadeType: null
		 });
	}
	privacyPolicyModalFadeOut(){
		this.setState({ privacyPolicyFadeType: 'out' });
	}
	privacyPolicyModalTransitionEnd = e => {
		if (e.propertyName !== "opacity" || this.state.privacyPolicyFadeType === "in") return;
	
		if (this.state.privacyPolicyFadeType === "out") {
			this.privacyPolicyModalRemove();
		}
	}
  render() {
    // let headerOptions = {
		// 	addCornerLogo: true,
		// 	addDarkCornerLogo: true,
		// 	fixedHeader: true
		// }
    const isFirefoxAndroid = this.state.browser === 'firefox' && this.state.operating_sys === 'android'

    const $slides = this.state.slides.map((slide, idx) =>
        <Slide isFirefoxAndroid={isFirefoxAndroid}
            showPrivacyPolicy={this.privacyPolicyModalOpen.bind(this)}
            horizontalSlide={this.slideHorizontal.bind(this)}
            onSlideScroll={this.handleSlideScroll}
            scrollToFirstSlide={this.firstSlide}
            createHubspotContactForm={this.createHubspotForm.bind(this)}
            formCleared={this.contactFormCleared.bind(this)}
            formSubmitted={this.contactFormSubmitted.bind(this)}
            currIdx={this.state.currIdx}
            slideViewed={this.state.slidesViewed.includes(idx)}
            goToNextSlide={this.nextSlide}
            scrollToLastSlide={this.lastSlide}
            key={idx}
            slideCount={idx}
            obj={slide}
            isCurrent={idx == this.state.currIdx}
            isPlaying={this.state.isPlaying}></Slide>
    )
    const isFirstOrSecondSlide = this.state.currIdx == 0 || this.state.currIdx == 1
    const innerStyle = isFirstOrSecondSlide ? {transform: 'translateY(0vh)'} : {transform: 'translateY(-' + ((this.state.currIdx-1) * 100) + 'vh)'}
        
    let slides_inner_classes = "slides_inner slide_idx_"+this.state.currIdx;
    let pageClasses = this.state.formSubmitted ? 'formSubmitted' : '';
    pageClasses += this.state.isiPhone ? ' iPhone' : '';
    pageClasses +=  isFirefoxAndroid ? ' firefoxAndroid' : '';
    let slidesWrapperClasses = "slides_wrapper";
		if(this.state.slideHasScrolled) slidesWrapperClasses += ' scrolled'
    return (
      <div id="page" className={pageClasses}>
            <div className={slidesWrapperClasses}
                onTouchStart={this.handleTouchStart.bind(this)}
                onTouchMove={this.handleTouchMove.bind(this)}
                onTouchEnd={this.handleTouchEnd.bind(this)}
                onWheel={this.handleWheelEvent.bind(this)}
                onScroll={this.handleScrollEvent.bind(this)}>
                <div className="fixed-headers">
                    <div className='fixed-header-inner'>
                        <div className='fixed-header-wrapper'>
                            <header className='fixed-header'>
                                <div className="hamburger">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                </div>
                                <div className="corner-logo-wrapper">
                                    <div className="text">HOBOKEN HEIGHTS<div className="separator"></div></div>
                                    <img className="corner-logo" src={require('./assets/images/logos/NIRMA_Logo_Symbol_Black.png').default} />
                                </div>
                                <div className="inquiry-link">INQUIRE NOW</div>
                            </header>
                        </div>
                        {/* <div className='fixed-header-wrapper'>
                            <header className='fixed-header'>
                                <div className="hamburger">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                </div>
                                <div className="corner-logo-wrapper">
                                    <div className="text">TEST HOBOKEN HEIGHTS<div className="separator"></div></div>
                                    <img className="corner-logo" src={require('./assets/images/logos/NIRMA_Logo_Symbol_Black.png').default} />
                                </div>
                                <div className="inquiry-link">INQUIRE NOW</div>
                            </header>
                        </div> */}
                    </div>
                </div>
                <div
                    className={slides_inner_classes}
                    style={innerStyle}
                    onTransitionEnd={e => this.watchForEventEnd(e)}>
                    {$slides}
                </div>
            </div>
        </div>
    )
  }
}

export default App;
