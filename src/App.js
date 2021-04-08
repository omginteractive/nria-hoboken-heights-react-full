import React from 'react';
import flypilotFetchWPRestAPI from './flypilotFetchWPRestAPI.js';
// import modules from './assets/modules';
import Slide from './assets/Slide';
import MobileMenu from './assets/MobileMenu';
import Header from './assets/Header';
import $ from 'jquery'
import _ from "lodash";
import {connect} from 'react-redux'
import { findDeviceSlideIdx, changeSlideIdx, updateSlideData, updateDesktopKeys, updateMobileKeys, updateSlideTransitioningState, updateSlideTouchState, updateSlidesViewed } from "./redux/actions/slideActions";
import { changeIsMobileDevice } from "./redux/actions/appActions";

window.jQuery = $


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        scrollDebouncer: null,
        previousScrollVal: 0,
        peakScrollVal: 0,
        readyForScroll: 1,
        browser: '',
        operating_sys: '',
        isiPhone: '',
        touchDirection: null,
        touchStartCoordinate: {
            x: null,
            y: null
        },
        slideHasScrolled: null,

        slides: null,
        // mobileMenuOpen: false,
        amenityGallerySlideIdx: 0, //default to first amenity for details page
        mapHeightLocked: null,
        visibleSlideHeight: '100vh',//used for calculating percent difference between innerHeight and outerHeight on mobile browsers with bottom browser bars
    }

        this.watchForEventEnd = this.watchForEventEnd.bind(this);
		this.firstSlide = this.firstSlide.bind(this);
		this.lastSlide = this.lastSlide.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);


		this.throttleOnScroll = _.throttle(this.throttleOnScroll.bind(this), 100, {leading:true});
		// this.debounceOnScroll = _.throttle(this.debounceOnScroll.bind(this), 3500, {leading: true, trailing:true});


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
		if (user_agent.indexOf('windows') !== -1){
			this.state.operating_sys = 'windows';
		}
		else if(navigator.userAgent.indexOf('OPR') !== -1 || navigator.userAgent.indexOf('Opera') !== -1) {
			this.state.operating_sys = 'opera';
		}
		else if (user_agent.indexOf('android') !== -1){
			this.state.operating_sys = 'android';
		}
		else if (user_agent.indexOf('macintosh') !== -1){
			this.state.operating_sys = 'macintosh';
		}

		if (user_agent.indexOf('safari') !== -1) {
			if (user_agent.indexOf('chrome') > -1) {
				browser= 'chrome';
			} else {
				browser ='safari';
			}
		}
		else if (user_agent.indexOf('firefox') !== -1) {
			browser ='firefox';
		}
		this.state.browser= browser;

		this.mobileMenuElement = React.createRef()
		this.headerElement = React.createRef()

		this.state.isiPhone = navigator.platform === "iPhone"

        /* The following are set to be used by handleResize to make sure the map marker appears at the correct scale */
        this.mapImageWidthPx = 1635//represents the actual pixel width of the large map images used for desktop
        this.mapImageHeightPx = 935//represents the actual pixel height of the large map images used for desktop
        this.originalMapImageCenterToMarkerDistance = 350//On original map image, this is the px distance from the location marker to the center of the entire image
        this.originalMapImageCenterToMarkerRatio = this.originalMapImageCenterToMarkerDistance/this.mapImageWidthPx//This is needed to find out the center to marker distance on the map image when the image is scaled up
        this.animatedLogoMarkerToTransformOriginCenter = 370//On animated logo image, this is the distance from the map marker to the center of where the transform-origin occurs. We are using  transform-origin: center $mapLogoDesktopTransformOriginX; so the center of where the transform: scale is occuring is a position $mapLogoDesktopTransformOriginX from the left side of the logo image
        this.mapImageSizeRatio = this.mapImageWidthPx/this.mapImageHeightPx

        //same vars but mobile
        this.mapMobileImageWidthPx = 1635//represents the actual pixel width of the large map images used for mobile
        this.mapMobileImageHeightPx = 935//represents the actual pixel height of the large map images used for mobile
        this.mapMobileOriginalMapImageCenterToMarkerDistance = 350//On original map image, this is the px distance from the location marker to the center of the entire image
        this.mapMobileOriginalMapImageCenterToMarkerRatio = this.mapMobileOriginalMapImageCenterToMarkerDistance/this.mapMobileImageWidthPx//This is needed to find out the center to marker distance on the map image when the image is scaled up
        this.mapMobileanimatedLogoMarkerToTransformOriginCenter = 231//On animated logo image, this is the distance from the map marker to the center of where the transform-origin occurs. We are using  transform-origin: center $mapLogoDesktopTransformOriginX; so the center of where the transform: scale is occuring is a position $mapLogoDesktopTransformOriginX from the left side of the logo image
        this.mapMobileImageSizeRatio = this.mapMobileImageWidthPx/this.mapMobileImageHeightPx
    }
    componentDidMount() {
        const endpoint = 'https://nriahh.wpengine.com/wp-json/acf/v3/pages/275'
        const apartmentsEndpoint = 'https://nriahh.wpengine.com/wp-json/wp/v2/apartments'

        flypilotFetchWPRestAPI(endpoint, apartmentsEndpoint).then((result)=> {
            // this.setState({
            //   slides: result
            // }, ()=> this.createResponsiveIndices());
            this.props.updateSlideData(result, this.createResponsiveIndices(result))
            this.handleResize()
        })
        const hubspotscript = document.createElement("script");
        hubspotscript.src = "https://js.hsforms.net/forms/v2.js";
        hubspotscript.async = true;
        hubspotscript.onload = () => console.log('onload hubspot');
        document.body.appendChild(hubspotscript);
        
        const select2script = document.createElement("script");
        select2script.src = "https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js";
        select2script.async = true;
        select2script.onload = () => console.log('onload select2');
        document.body.appendChild(select2script);
        
    	window.addEventListener('keydown', (event) => {
			if (!event.target.classList.contains('input')) {
                let needScroll = false
                const keyboardCommand = event.code
				if (keyboardCommand === "ArrowUp") needScroll = this.prevSlide()
				else if (keyboardCommand === "ArrowDown") needScroll = this.nextSlide()
				else if (keyboardCommand === "ArrowLeft") needScroll = this.prevSlide()
				else if (keyboardCommand === "ArrowRight") needScroll = this.nextSlide()

                if(needScroll === 'needScroll') {
                    const scrollDistance = 20
                    const deviceSlideIdx = this.props.findDeviceSlideIdx(this.props.currSlideIdx)
                    const elementToScroll = this.props.slideData[deviceSlideIdx].enableScrollingQuerySelector ? this.props.slideData[deviceSlideIdx].enableScrollingQuerySelector : '.slide.activeSlide'
                    if(keyboardCommand === "ArrowDown" || keyboardCommand === "ArrowRight") {
                        const originalScroll = document.querySelectorAll(elementToScroll)[0].scrollTop
                        document.querySelectorAll(elementToScroll)[0].scrollTop = originalScroll + scrollDistance
                    }
                    else if(keyboardCommand === "ArrowUp" || keyboardCommand === "ArrowLeft"){
                        const originalScroll = document.querySelectorAll(elementToScroll)[0].scrollTop
                        document.querySelectorAll(elementToScroll)[0].scrollTop = originalScroll - scrollDistance
                    }
                }
			}
        });
		//See handleResizeOnAndroid() for details
		if(this.state.operating_sys === 'android') {
			this.timerHandle = null;
			window.addEventListener('resize', () => this.handleResizeOnAndroid())
        }
        window.addEventListener('resize', () => this.handleResize())
	}
    shouldComponentUpdate(nextProps, nextState){
        const curridx = this.props.findDeviceSlideIdx(this.props.currSlideIdx)
        const slidesNotLoaded = this.props.slideData === null
        let videoMobileStartPositionChanged = false
        if(typeof(curridx) !== 'undefined'){
            const currentSlide = !slidesNotLoaded ? this.props.slideData : false
            videoMobileStartPositionChanged = !slidesNotLoaded && currentSlide && currentSlide[curridx].videoMobileStartPosition !== nextProps.slideData[curridx].videoMobileStartPosition
        }
        const desktopKeysNotLoaded = this.props.desktopKeys.length === 0
        const mobileKeysNotLoaded = this.props.mobileKeys.length === 0
        const currIdxChanged = this.props.currSlideIdx !== nextState.currSlideIdx
        const menuToggled = this.props.menuOpen !== nextProps.menuOpen
        const mapHeightLockedSettingChanged = this.state.mapHeightLocked !== nextState.mapHeightLocked
        const formSubmittedChanged = this.props.formSubmitted !== nextProps.formSubmitted
        const needsToRender = slidesNotLoaded || desktopKeysNotLoaded || mobileKeysNotLoaded || currIdxChanged || menuToggled || mapHeightLockedSettingChanged || videoMobileStartPositionChanged || formSubmittedChanged
        return needsToRender
    }
    handleResize(){
        this.calculateMapAspectLockRatio()
        const isMobileState = window.innerWidth < 769
        const previousState = this.props.isMobileDevice
        if(previousState !== isMobileState) this.props.changeIsMobileDevice(isMobileState)

        const innerHeight = window.innerHeight//if there are issues with this, may need to use document.documentElement.clientHeight || 0, window.innerHeight || 0)

        document.documentElement.style.setProperty('--vh', `${innerHeight/100}px`)
        document.documentElement.style.setProperty('--mapScale', `${this.calculateMapImageMarkerScale(isMobileState)}`)
        const homeSlide = document.querySelector('.slideTemplate-home')
        const hundredVhInPx = homeSlide.clientHeight
        const mobileVhCalculation = innerHeight/hundredVhInPx * 100
        const visibleSlideHeight = isMobileState ? mobileVhCalculation : '100'//default to 100vh if not mobile
        this.setState({ visibleSlideHeight: visibleSlideHeight });
    }
    calculateMapImageMarkerScale(isMobileState){
        if(!document.querySelector('.mapBackground')) {
            setTimeout(function(){
                this.calculateMapImageMarkerScale(isMobileState)
            }, 1000)
            console.log('.mapBackground not found, retrying...')
            return
        }
        const mapElementWidth = document.querySelector('.mapBackground').clientWidth
        const mapElementHeight = document.querySelector('.mapBackground').clientHeight
        const mapElementSizeRatio = mapElementWidth/mapElementHeight

        let satelliteLogoScale
        if(isMobileState){
            if(mapElementSizeRatio < this.mapMobileImageSizeRatio){
                const imageWidthToScale = mapElementHeight * this.mapMobileImageSizeRatio //If the map image height occupies the full height of the element, this will check to see what the full width of the map image would be if it were not constrained
                const distanceFromCenterToMarkerToScale = imageWidthToScale * this.mapMobileOriginalMapImageCenterToMarkerRatio//This calculates the distance from the center to the marker on the map image taking into consideration the scaled up version of the map
                const scaleMultiplierOfOriginalToNewCenterToMarkerDistances = distanceFromCenterToMarkerToScale/this.mapMobileanimatedLogoMarkerToTransformOriginCenter
                satelliteLogoScale = scaleMultiplierOfOriginalToNewCenterToMarkerDistances
            }
            else {
                //mapElementWidth will not need to be modified since the width of the image is completely visible and the height is only partially showing
                const distanceFromCenterToMarkerToScale = mapElementWidth * this.originalMapImageCenterToMarkerRatio//This calculates the distance from the center to the marker on the map image taking into consideration the scaled up version of the map
                const scaleMultiplierOfOriginalToNewCenterToMarkerDistances = distanceFromCenterToMarkerToScale/this.animatedLogoMarkerToTransformOriginCenter
                satelliteLogoScale = scaleMultiplierOfOriginalToNewCenterToMarkerDistances
            }
            satelliteLogoScale = satelliteLogoScale*0.5
        }
        else {
            if(mapElementSizeRatio < this.mapImageSizeRatio){
                const imageWidthToScale = mapElementHeight * this.mapImageSizeRatio //If the map image height occupies the full height of the element, this will check to see what the full width of the map image would be if it were not constrained
                const distanceFromCenterToMarkerToScale = imageWidthToScale * this.originalMapImageCenterToMarkerRatio//This calculates the distance from the center to the marker on the map image taking into consideration the scaled up version of the map
                const scaleMultiplierOfOriginalToNewCenterToMarkerDistances = distanceFromCenterToMarkerToScale/this.animatedLogoMarkerToTransformOriginCenter
                satelliteLogoScale = scaleMultiplierOfOriginalToNewCenterToMarkerDistances
            }
            else {
                //mapElementWidth will not need to be modified since the width of the image is completely visible and the height is only partially showing
                const distanceFromCenterToMarkerToScale = mapElementWidth * this.originalMapImageCenterToMarkerRatio//This calculates the distance from the center to the marker on the map image taking into consideration the scaled up version of the map
                const scaleMultiplierOfOriginalToNewCenterToMarkerDistances = distanceFromCenterToMarkerToScale/this.animatedLogoMarkerToTransformOriginCenter
                satelliteLogoScale = scaleMultiplierOfOriginalToNewCenterToMarkerDistances
            }
        }
        return satelliteLogoScale
    }
    calculateMapAspectLockRatio(){
        const maximumLockRatio = 2
        const sideMarginsVWPercent = 0.063
        const headerVHPercent = 0.128
        const mapWidth = document.documentElement.clientWidth - document.documentElement.clientWidth*sideMarginsVWPercent*2
        const mapHeight = document.documentElement.clientHeight - document.documentElement.clientHeight*headerVHPercent
        // console.log(mapWidth/mapHeight)
        const mapHeightLocked = mapWidth/mapHeight < maximumLockRatio || this.props.isMobileDevice
        
        this.setState({ mapHeightLocked: mapHeightLocked })
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
	componentDidUpdate(prevProps) {
        // console.log(prevProps.slideData)
        // if(prevProps.slideData !== this.props.slideData){ 
        //     console.log(this.props.slideData)
        //  }
        
	// 	// const that = this;
	// 	return;
	// 	// this.refs.inner.addEventListener('transitionend', (evt) => {
	// 	// 	that.setState({
	// 	// 		transitiongState: 0,
	// 	// 		currIdx: (this.props.currSlideIdx + delta)
	// 	// 	});
	// 	// }, false);
	// }
	// debounceOnScroll() {
	// 	//very long scrolls last 3.5 seconds, should be safe to zero out the scroll at that point
	// 	//this would create a more responsive experience since a deltaY of 1 would then trigger a slide
	
	// 	this.setState({previousScrollVal: 0});
	}

    // toggleMobileMenu(){
    //     this.props.toggleMenuState()
	// }
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
		if(this.state.videosPlayed) return
		let self = this
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
        const scrollDebouncerExists = this.scrollDebouncer !== null
        if(scrollDebouncerExists) {
			clearTimeout(this.scrollDebouncer)
		}
		this.scrollDebouncer = setTimeout(this.enableScroll.bind(this),500)
        const scrollDistanceIsPastThreshold = Math.abs(deltaY) >= 1
		if (scrollDistanceIsPastThreshold && this.state.readyForScroll) {
            const scrollDistanceIsLargerThanPrevious = Math.abs(deltaY) > Math.abs(this.state.previousScrollVal)
			if (scrollDistanceIsLargerThanPrevious) {
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
    watchForTransitionStart(e){
        console.log(e)
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
		
        this.props.updateSlideTransitioningState(0)
	}
	isTransitioning() {
		return this.props.slideTransitioningState !== 0 || this.props.slideTouchState === 2;
	}
	addIdxToViewedSlides(idx) {
        const realSlideIdx = this.props.findDeviceSlideIdx(idx)
		if(this.props.slidesViewed.includes(realSlideIdx)) return;
		this.props.updateSlidesViewed(realSlideIdx)
	}

	//animationsStopped is used to prevent animation issues with the android keyboard appearing when dealing with form inputs
	animationsStopped() {
		const isStopped = document.body.classList.contains("resize-animation-stopper");
		return isStopped;
    }
    goToContactSlide(){
        const contactIdx = this.getFinalIdxOfDevice()
        if(this.props.currSlideIdx === contactIdx) return
        this.props.updateSlideTransitioningState(1)
        this.handleSlideChange(contactIdx)
    }
    goToSlide(idx){
        if(this.props.currSlideIdx === idx) return
        this.props.updateSlideTransitioningState(1)
        this.handleSlideChange(idx)
    }
    createResponsiveIndices(slides){
        //This is run immediately the slides state is set
        //The state it creates is used by findDeviceSlideIdx()
        const desktopKeys = slides.map((slide, i) => {
            if(!slide.mobileOnly) return i
            return null
        }).filter(function(key){
            if(Number.isInteger(key)) return true
            return false
        })
        this.props.updateDesktopKeys(desktopKeys)
        
        const mobileKeys = slides.map((slide, i) => {
            if(!slide.desktopOnly) return i
            return null
        }).filter(function(key){
            if(Number.isInteger(key)) return true
            return false
        })
        this.props.updateMobileKeys(mobileKeys)
    }
    // findDeviceSlideIdx(idx){
    //     /* 
    //      * Because the mobile and desktop version have some slides that are unique to each environment,
    //      * We need a way to find the index of the environment which we are on
    //      */
    //     const isMobile = this.props.isMobileDevice
    //     if(isMobile) return this.props.mobileKeys[idx]
    //     return this.props.desktopKeys[idx]
    // }
    nextSlide(noRequireScroll = false) {
        const deviceSlideIdx = this.props.findDeviceSlideIdx(this.props.currSlideIdx)
        const querySelector = typeof this.props.slideData[deviceSlideIdx].enableScrollingQuerySelector === 'undefined' ? '.activeSlide' : this.props.slideData[deviceSlideIdx].enableScrollingQuerySelector
        // const isFirefoxAndroid = this.state.browser === 'firefox' && this.state.operating_sys === 'android'
		// const videosPlayed = this.state.videosPlayed//prevent Firefox on Android from moving to next slide because videos don't autoplay without any user interaction
        if (this.isTransitioning() || this.animationsStopped()) { //|| (isFirefoxAndroid && !videosPlayed)
			return
		}
        if(this.props.slideData[deviceSlideIdx].enableScrolling && !noRequireScroll) {
            const scrollBottom = document.querySelector(querySelector).scrollHeight - document.querySelector(querySelector).offsetHeight - document.querySelector(querySelector).scrollTop
            if(scrollBottom > 1) {//scrollBottom can be negative. It also sometimes needs to scroll because 1 is the lowest value as in .amenities__details
                // document.querySelector(querySelector).scrollTop = document.querySelector(querySelector).scrollTop + 200
                // console.log(scrollBottom, querySelector)
                return 'needScroll'
			}
		}
        //All of the above is used to prevent a slide change if necessary

		const newIdx = this.props.currSlideIdx + 1;
        const thisSlideDeviceIdx = this.props.findDeviceSlideIdx(this.props.currSlideIdx)
        let finalIdxOfDevice
        if(this.props.isMobileDevice){
            finalIdxOfDevice = this.props.mobileKeys[this.props.mobileKeys.length - 1]
        }
        else {
            finalIdxOfDevice = this.props.desktopKeys[this.props.desktopKeys.length - 1]
        }
        
        const thisSlideIsFinalSlide = thisSlideDeviceIdx === finalIdxOfDevice
		if (thisSlideIsFinalSlide) {
			return
		}
		this.props.updateSlideTransitioningState(1)
		this.handleSlideChange(newIdx)
	}
	prevSlide() {
		if (this.isTransitioning() || this.animationsStopped()) {
			return
        }
        const deviceSlideIdx = this.props.findDeviceSlideIdx(this.props.currSlideIdx)
        const querySelector = typeof this.props.slideData[deviceSlideIdx].enableScrollingQuerySelector === 'undefined' ? '.activeSlide' : this.props.slideData[deviceSlideIdx].enableScrollingQuerySelector
		const positionIsNotAtTopOfSlide = document.querySelector(querySelector).scrollTop !== 0;
		if(positionIsNotAtTopOfSlide) {
			return 'needScroll'
		}
		const newIdx = this.props.currSlideIdx - 1;
		if (newIdx < 0) {
			return
		}
		this.props.updateSlideTransitioningState(-1)
		this.handleSlideChange(newIdx)
	}
	firstSlide() {
		const newIdx = 0;
		const alreadyOnFirstSlide = this.props.currSlideIdx === newIdx;

		if (this.isTransitioning() || alreadyOnFirstSlide) {
			return;
		}
		this.props.updateSlideTransitioningState(1)
		this.handleSlideChange(newIdx)
	}
	lastSlide() {
		const newIdx = this.props.slideData.length - 1;
		const alreadyOnLastSlide = this.props.currSlideIdx === newIdx;

		if (this.isTransitioning() || alreadyOnLastSlide) {
			return;
		}
		if (newIdx < 0) {
			return;
		}
		this.props.updateSlideTransitioningState(1)
		this.handleSlideChange(newIdx)
	}

	handleSlideChange(newIdx){
        this.props.changeSlideIdx(newIdx)
        this.addIdxToViewedSlides(newIdx);
		// const isLastSlide = newIdx === this.props.slideData.length -1
		// this.mobileMenuElement.current.closeMobileMenu()
		// const notOnLastSlide = this.props.currSlideIdx != this.props.slideData.length - 1
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
			touchStartCoordinate: coordinateObj
		});
        this.props.updateSlideTouchState(1)
		
	}
	handleTouchMove(evt){
		if(this.props.slideTouchState !== 1) return;
        const touchDragThreshold = 20 //smaller values will allow smaller touchdrag events to trigger a slide event. 8 seems to be close to the lowest end and 60 seems to be too large
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const horizontalDirection = this.state.touchStartCoordinate.x > coordinateX ? 'right' : 'left';
		const verticalDirection = this.state.touchStartCoordinate.y > coordinateY ? 'down' : 'up';
		const horizontalDifference = Math.abs(this.state.touchStartCoordinate.x - coordinateX);
		const verticalDifference = Math.abs(this.state.touchStartCoordinate.y - coordinateY);
        const largestDifference = Math.max(horizontalDifference, verticalDifference)
        if(largestDifference < touchDragThreshold) return
		let mainTouchDirection;
		if(verticalDifference > horizontalDifference) {
			mainTouchDirection = verticalDirection
		}
		else {
			mainTouchDirection = horizontalDirection
		}
		
		this.setState({
			touchDirection: mainTouchDirection
		})
        this.props.updateSlideTouchState(2)
		// if(mainTouchDirection === 'up') {
			
		// }
		// else if(mainTouchDirection === 'down') {
		// 	this.nextSlide();
		// }
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
        this.props.updateSlideTouchState(0)
		$("html, body").animate({ scrollTop: 0 })//possible fix to hide address bar on iPhone when body is > 100vh
	}
	slideHorizontal(direction){
        const key = this.props.findDeviceSlideIdx(this.props.currSlideIdx)
        const mobileHorizontalVideoSlideEnabled = this.props.slideData[key].mobileHorizontalVideoSlideEnabled

        const isAmenitiesDetailSlide = this.props.slideData[key].slideTemplate === 'amenitiesDetail'
        if(!mobileHorizontalVideoSlideEnabled && !isAmenitiesDetailSlide) return

        if(mobileHorizontalVideoSlideEnabled) {
            const videoMobileStartPosition = this.props.slideData[key].videoMobileStartPosition
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
    
            let slides = [ ...this.props.slideData ];
            slides[key] = {...slides[key], videoMobileStartPosition: newVideoMobileStartPosition};
            // this.setState({ slides });
            this.props.updateSlideData(slides)
        }
        else if(isAmenitiesDetailSlide){
            const currAmenitiesDetailIdx = this.state.amenityGallerySlideIdx
            if(direction === 'right') {
                this.setAmenityOnGallerySlide(currAmenitiesDetailIdx + 1)
            }
            else {
                this.setAmenityOnGallerySlide(currAmenitiesDetailIdx - 1)
            }
        }
	}

	handleSlideScroll = (hasScrolled) => {
        this.setState({slideHasScrolled: hasScrolled});
	}
	
	// privacyPolicyModalOpen(){
	// 	this.setState({ privacyPolicyEnabled: true });
	// 	setTimeout(() => this.setState({ privacyPolicyFadeType: "in" }), 0);

	// }
	// privacyPolicyModalRemove(){
	// 	this.setState({ 
	// 		privacyPolicyEnabled: false,
	// 		privacyPolicyFadeType: null
	// 	 });
	// }
	// privacyPolicyModalFadeOut(){
	// 	this.setState({ privacyPolicyFadeType: 'out' });
	// }
	// privacyPolicyModalTransitionEnd = e => {
	// 	if (e.propertyName !== "opacity" || this.state.privacyPolicyFadeType === "in") return;
	
	// 	if (this.state.privacyPolicyFadeType === "out") {
	// 		this.privacyPolicyModalRemove();
	// 	}
    // }
    setAmenityOnGallerySlide(idx){
        this.setState({
			amenityGallerySlideIdx: idx
		 });
    }
    getFinalIdxOfDevice(){
        let finalIdxOfDevice
        if(this.props.isMobileDevice){
            finalIdxOfDevice = this.props.mobileKeys.length -1
        }
        else {
            finalIdxOfDevice = this.props.desktopKeys.length -1
        }
        return finalIdxOfDevice
    }
    render() {
        // if(this.props.desktopKeys.length !== 0) {

            // console.log(this.props.currSlideIdx, this.props.findDeviceSlideIdx(this.props.currSlideIdx))
        // }
        const deviceSlideIdx = this.props.findDeviceSlideIdx(this.props.currSlideIdx)
        // const hasHeaderTheme = this.props.slideData && this.props.slideData[deviceSlideIdx] && this.props.slideData[deviceSlideIdx].headerTheme
        // const hasHeaderThemeMobile = this.props.slideData && this.props.slideData[deviceSlideIdx] && this.props.slideData[deviceSlideIdx].headerThemeMobile

        // const headerTheme = hasHeaderTheme ? this.props.slideData[deviceSlideIdx].headerTheme : 'dark'
        // const headerThemeMobile = hasHeaderThemeMobile ? this.props.slideData[deviceSlideIdx].headerThemeMobile : ''
        
        const isFirefoxAndroid = this.state.browser === 'firefox' && this.state.operating_sys === 'android'
        const $slides = this.props.slideData == null ? null : this.props.slideData.map((slide, idx) =>
            <Slide
                // showPrivacyPolicy={this.privacyPolicyModalOpen.bind(this)}
                horizontalSlide={this.slideHorizontal.bind(this)}
                onSlideScroll={this.handleSlideScroll}
                scrollToFirstSlide={this.firstSlide}
                goToNextSlide={this.nextSlide}
                // scrollToLastSlide={this.lastSlide}
                key={idx}
                idx={idx}
                // slideCount={idx}
                // obj={slide}
                isCurrent={idx === deviceSlideIdx}
                setamenityGallerySlideIdx={this.setAmenityOnGallerySlide.bind(this)}
                amenityGallerySlideIdx={this.state.amenityGallerySlideIdx}
                mapHeightLocked={this.state.mapHeightLocked}
                goToContactSlide={this.goToContactSlide.bind(this)}
                ></Slide>
        )

        const isFirstOrSecondSlide = this.props.currSlideIdx === 0 || this.props.currSlideIdx === 1
        const innerStyle = isFirstOrSecondSlide ? {transform: 'translateY(0vh)'} : {transform: 'translateY(-' + ((this.props.currSlideIdx-1) * this.state.visibleSlideHeight) + 'vh)'}
            
        let slides_inner_classes = "slides_inner slide_idx_"+this.props.currSlideIdx;
        let pageClasses = this.props.formSubmitted ? 'formSubmitted' : '';
        pageClasses += this.state.isiPhone ? ' iPhone' : '';
        pageClasses +=  isFirefoxAndroid ? ' firefoxAndroid' : '';
        pageClasses +=  ' ' + this.state.operating_sys;
        pageClasses +=  ' ' + this.state.browser;
        let slidesWrapperClasses = "slides_wrapper";
        if(this.state.slideHasScrolled) slidesWrapperClasses += ' scrolled'

        // const thisSlideDeviceIdx = this.props.findDeviceSlideIdx(this.props.currSlideIdx)
        const finalIdxOfDevice = this.getFinalIdxOfDevice()
        return (
            <div id="page" className={pageClasses}>
                <MobileMenu
                    contactFormSlideIdx={finalIdxOfDevice}
                    goToContactSlide={this.goToContactSlide.bind(this)}
                    // open={this.props.menuOpen}
                    // toggleMobileMenu={this.toggleMobileMenu.bind(this)}
                    goToSlideIdx={this.goToSlide.bind(this)}
                    // isMobileDevice={this.props.isMobileDevice} 
                    />
                <div className={slidesWrapperClasses}
                    onTouchStart={this.handleTouchStart.bind(this)}
                    onTouchMove={this.handleTouchMove.bind(this)}
                    onTouchEnd={this.handleTouchEnd.bind(this)}
                    onWheel={this.handleWheelEvent.bind(this)}
                    onScroll={this.handleScrollEvent.bind(this)}>
                    <div className="fixed-headers">
                        <div className='fixed-header-inner'>
                            <div className='fixed-header-wrapper'>
                                <Header
                                    goToSlide={this.goToSlide.bind(this)}
                                    goToContactSlide={this.goToContactSlide.bind(this)}
                                    // toggleMobileMenu={this.toggleMobileMenu.bind(this)}
                                    // theme={headerTheme}
                                    // themeMobile={headerThemeMobile}
                                    />
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
                            <div className='contactSlideWhiteHeader'></div>
                        {this.props.slideData !== null && $slides}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const currSlideIdx = state.slideData.currSlideIdx
    const slideData = state.slideData.slides
    const desktopKeys = state.slideData.desktopKeys
    const mobileKeys = state.slideData.mobileKeys
    const slideTransitioningState = state.slideData.slideTransitioningState
    const slideTouchState = state.slideData.slideTouchState
    const slidesViewed = state.slideData.slidesViewed
    const isMobileDevice = state.appData.isMobileDevice
    const formSubmitted = state.appData.formSubmitted
    const menuOpen = state.menuData.menuOpen
    return { currSlideIdx, slideData, slideTransitioningState, slideTouchState, slidesViewed, desktopKeys, mobileKeys, isMobileDevice, menuOpen, formSubmitted }
  }

  export default connect(
    mapStateToProps,
    { findDeviceSlideIdx, changeSlideIdx, updateSlideData, updateSlideTransitioningState, updateSlideTouchState, updateDesktopKeys, updateMobileKeys, changeIsMobileDevice, updateSlidesViewed }
  )(App);