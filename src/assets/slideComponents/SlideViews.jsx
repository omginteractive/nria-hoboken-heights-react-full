import {Component} from 'react';
import React from 'react';
import {connect} from 'react-redux'
// import _ from "lodash";



class SlideViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSliderValue: 0,
            activeView: null,
            image: null,
            previousActiveKey: null,
            viewsSlideshowIsActive: false,
            viewsSlideshowPaused: false
        }
    }
    componentDidMount(){
        this.setNewTime(0)
    }
    shouldComponentUpdate(nextProps, nextState){
        const viewChanged = this.state.activeView !== nextState.activeView
        const sliderChanged = this.state.timeSliderValue !== nextState.timeSliderValue
        const isTransitioningChanged = this.state.isTransitioning !== nextState.isTransitioning
        const isMobileDeviceChanged = this.props.isMobileDevice !== nextProps.isMobileDevice
        const arrivedAtOrExitedSlide = this.props.isCurrent !== nextProps.isCurrent
        return viewChanged || sliderChanged || isTransitioningChanged || isMobileDeviceChanged || arrivedAtOrExitedSlide
    }
    componentDidUpdate(){
        const slideIsActive = this.props.isCurrent
        if(slideIsActive){
            const viewsSlideshowIsNotActive = !this.state.viewsSlideshowIsActive
            const viewsSlideshowNotPaused = !this.state.viewsSlideshowPaused
            if(viewsSlideshowIsNotActive && viewsSlideshowNotPaused) {
                this.startViewsSlideshow()
            }
        }
        else if(!slideIsActive) {
            this.stopViewsSlideshow()
        }
    }
    startViewsSlideshow(){
        this.setState({
            viewsSlideshowIsActive: true
        })
        this.slideshow = setInterval(() => this.changeToNextView(), 5000)
    }
    stopViewsSlideshow(){
        clearInterval(this.slideshow)
        this.setState({
            viewsSlideshowIsActive: false,
            viewsSlideshowPaused: false
        })
    }
    changeToNextView(){
        const slideValueIncremented = this.state.timeSliderValue + 1
        const needToRestartSlideshow = slideValueIncremented == this.props.configuration.views.length
        const nextSlideValue = needToRestartSlideshow ? 0 : slideValueIncremented
        this.setNewTime(nextSlideValue)
    }
    handleTimeChange(event){
        const rangeValue = event.target.value
        if(rangeValue === this.state.activeView ) return
        if(this.isInt(rangeValue)){
            //when the user is dragging thumb and ends up exactly on an int value, not a float. setting time here caused problems on desktop
            // this.setNewTime(rangeValue)
        }
        else {
            this.setState({
                timeSliderValue: rangeValue
            })
        }
    }
    handleClickEventOnRange(event){
        const rangeValue = event.target.value
        let newTime
        if(!this.isInt(rangeValue)){
            newTime = Math.round(rangeValue)
        }
        else newTime = parseInt(rangeValue)
        this.setNewTime(newTime)
        this.setState({
            viewsSlideshowPaused: true
        }, this.stopViewsSlideshow())
    }
    isInt(n) {
        return n % 1 === 0;
    }
    handleTimeClick(key){
        this.setState({
            viewsSlideshowPaused: true
        }, this.stopViewsSlideshow())
        this.setNewTime(key)
    }
    setNewTime(key){
        this.setState({
            timeSliderValue: key,
        })
        const previousKey = this.state.activeView
        if(key === previousKey) {
            console.log('same as previous')
            return
        }
        this.setState({
            activeView: key,
            previousActiveKey: previousKey,
            isTransitioning: true
        })
    }
    handleSlideChangeTransitionEnd  = e => {
        this.setState({
            isTransitioning: false,
            previousActiveKey: null
        })
    }
    render(){
        const mapped_images_classes = 'views_section__image startZoomedIn'
        const activeImageKey = this.state.activeView
        const isTransitioning = this.state.isTransitioning
        const views_section__bottom_classes = isTransitioning ? 'views_section__bottom isTransitioning' : 'views_section__bottom'
        const firefoxOrient = this.props.isMobileDevice ? 'vertical' : 'horizontal'
        return(
            <>
                <section className="views_section">
                    <div className="views_section__top">
                        <h2>{this.props.configuration.heading_the_view}</h2>
                        <p dangerouslySetInnerHTML={{ __html: this.props.configuration.content_the_view}}></p>
                    </div>
                    <div className={views_section__bottom_classes}>
                        {this.props.configuration.views &&
                            <>
                                {this.props.configuration.views.map((view, i) => {
                                    const isActiveImage = i === activeImageKey
                                    const isPreviouslyActiveImage = i === this.state.previousActiveKey
                                    let imageClasses = mapped_images_classes
                                    if(isActiveImage) imageClasses = mapped_images_classes + ' active'
                                    else if(isPreviouslyActiveImage) imageClasses = mapped_images_classes + ' previouslyActive'
                                    const imageClassesDesktop = imageClasses + ' not-mobile'
                                    const imageClassesMobile = imageClasses + ' mobile-only'
                                    return (<div key={i + 'viewsSectionTimeSliderImageWrapper'} className="views_section__timeSlider_image_wrapper">
                                        <img key={i+'viewsSectionTimeSliderImage'} alt={view.displayTime} src={view.image} className={imageClassesDesktop} onTransitionEnd={this.handleSlideChangeTransitionEnd.bind(this)} />
                                        <img key={i+'viewsSectionTimeSliderImageMobile'} alt={view.displayTime} src={view.imageMobile} className={imageClassesMobile} onTransitionEnd={this.handleSlideChangeTransitionEnd.bind(this)} />
                                    </div>)
                                })}       
                            </>
                        }
                        <div className="views_section__timeSlider">
                            <input onMouseUp={this.handleClickEventOnRange.bind(this)} onTouchEnd={this.handleClickEventOnRange.bind(this)} onChange={this.handleTimeChange.bind(this)} type="range" min="0" max={this.props.configuration.views.length - 1} step="0.005" value={this.state.timeSliderValue} orient={firefoxOrient}/>
                            <ul className="views_section__timeList">
                                {this.props.configuration.views.map((view, i) => {
                                    const listClasses = i === this.state.activeView ? 'active' : ''
                                    return (<li onClick={() => this.handleTimeClick(i)} className={listClasses} key={i+'viewsSectionTimeSliderTime'}>{view.displayTime} <span className='ampm'>{view.ampm}</span></li>)
                                })}
                            </ul>
                            <div className="visibleSliderLine"></div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}


// export default Slide;
const mapStateToProps = state => {
    const isMobileDevice = state.appData.isMobileDevice
    return { isMobileDevice }
  }

  export default connect(
    mapStateToProps
  )(SlideViews);