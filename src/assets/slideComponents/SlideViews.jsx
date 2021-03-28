import {Component} from 'react';
import React from 'react';
// import leftArrowBlack from '../assets/images/leftArrowBlack.svg';
import $ from 'jquery'
import {connect} from 'react-redux'
// import _ from "lodash";



class SlideViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSliderValue: 0,
            activeView: null,
            image: null,
            previousActiveKey: null
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const viewChanged = this.state.activeView !== nextState.activeView
        const sliderChanged = this.state.timeSliderValue !== nextState.timeSliderValue
        const isTransitioningChanged = this.state.isTransitioning !== nextState.isTransitioning
        const isMobileDeviceChanged = this.props.isMobileDevice !== nextProps.isMobileDevice

        return viewChanged || sliderChanged || isTransitioningChanged || isMobileDeviceChanged
    }
    componentDidMount(){
        // this.props.configuration.views.forEach((view) => {
        //     const img = new Image().src = require('./'+view.image).default
        // })
        this.setNewTime(0)
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
    handleMouseUp(event){
        const rangeValue = event.target.value
        let newTime
        if(!this.isInt(rangeValue)){
            newTime = Math.round(rangeValue)
        }
        else newTime = parseInt(rangeValue)
        this.setNewTime(newTime)
    }
    isInt(n) {
        return n % 1 === 0;
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
    handleTransitionEnd  = e => {
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
                                        <img key={i+'viewsSectionTimeSliderImage'} alt={view.displayTime} src={view.image} className={imageClassesDesktop} onTransitionEnd={this.handleTransitionEnd.bind(this)} />
                                        <img key={i+'viewsSectionTimeSliderImageMobile'} alt={view.displayTime} src={view.imageMobile} className={imageClassesMobile} onTransitionEnd={this.handleTransitionEnd.bind(this)} />
                                    </div>)
                                })}       
                            </>
                        }
                        <div className="views_section__timeSlider">
                            <input onMouseUp={this.handleMouseUp.bind(this)} onTouchEnd={this.handleMouseUp.bind(this)} onChange={this.handleTimeChange.bind(this)} type="range" min="0" max={this.props.configuration.views.length - 1} step="0.005" value={this.state.timeSliderValue} orient={firefoxOrient}/>
                            <ul className="views_section__timeList">
                                {this.props.configuration.views.map((view, i) => {
                                    const listClasses = i === this.state.activeView ? 'active' : ''
                                    return (<li onClick={() => this.setNewTime(i)} className={listClasses} key={i+'viewsSectionTimeSliderTime'}>{view.displayTime} <span className='ampm'>{view.ampm}</span></li>)
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