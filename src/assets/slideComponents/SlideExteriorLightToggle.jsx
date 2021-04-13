import {Component} from 'react';
import React from 'react';
import {connect} from 'react-redux'

class SlideExteriorLightToggle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lightsOn: false,
            video: null
        }
        this.lightsOffVideo= this.props.configuration.background_video_no_light
    }
    shouldComponentUpdate(nextProps, nextState){
        const isMobileDeviceChanged = this.props.isMobileDevice !== nextProps.isMobileDevice //to make lights on
        const lightStateChanged = this.state.lightsOn !== nextState.lightsOn
        return lightStateChanged || isMobileDeviceChanged
    }
    toggleLights(){
        const newLightsState = !this.state.lightsOn
        this.setState({
            lightsOn: newLightsState
        })
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        videoContainerClasses += ' compact'
        // const videoContainerClassesLightsOn = videoContainerClasses + ' lightsOn'
        const videoContainerClassesLightsOff = videoContainerClasses + ' lightsOff'
        let videoClasses = 'background-video'
        let lightButtonText = this.state.lightsOn ? this.props.configuration.exteriorTurnOffText : this.props.configuration.exteriorTurnOnText
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffectRepeat startZoomedIn'
        
        let lightsMaskContainerClasses = this.state.lightsOn || this.props.isMobileDevice ? 'lightsMaskContainer on' : 'lightsMaskContainer off'

        const right_arrow_styles = {
            backgroundImage: 'url('+this.props.configuration.swipe_arrow_right_1+')'
        }
        const left_arrow_styles = {
            backgroundImage: 'url('+this.props.configuration.swipe_arrow_left_1+')',
            backgroundPosition: 'right'
        }
        return(
            <>
                <header className='fixed-header'>
                    <div className="hamburger">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="corner-logo-wrapper">
                        <div className="text">HOBOKEN HEIGHTS<div className="separator"></div></div>
                        <img alt="Hoboken Heights Logo" className="corner-logo" src={require('../images/logos/NIRMA_Logo_Symbol_Black.png').default} />
                    </div>
                    <div onClick={this.props.methods.goToContactSlide.bind(this)} className="inquiry-link">INQUIRE NOW</div>
                </header>
                <div onClick={this.toggleLights.bind(this)} className="toggleLights btn">{lightButtonText}</div>
                {
                    <div className={lightsMaskContainerClasses}>
                        <img className='lightsMask startZoomedIn videoZoomEffectRepeat' alt="" src={this.props.configuration.background_image_light} />
                    </div>
                }
                {
                        //Hide landingpage video on FFMobile because it will not autoplay
                        //Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={videoContainerClassesLightsOff}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src="${this.lightsOffVideo}" type="video/mp4" />
							</video>`
						}}
					/>
				}
                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
                            <div className='left_arrow_bouncing' style={left_arrow_styles} onClick={() => this.props.slideHorizontal('left')}/>
							<div className='uppercase' dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
                            <div className='right_arrow_bouncing' style={right_arrow_styles} onClick={() => this.props.slideHorizontal('right')}/>
						</h1>
					</div>
				}
            </>
        )
    }
}

const mapStateToProps = state => {
    const isMobileDevice = state.appData.isMobileDevice
    return { isMobileDevice }
}

export default connect(
    mapStateToProps,
    {  }
)(SlideExteriorLightToggle)