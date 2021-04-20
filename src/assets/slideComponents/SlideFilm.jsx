import {Component} from 'react';
import React from 'react';
import $ from 'jquery'
import {connect} from 'react-redux'
import { updateFilmSlideMouseMovement } from "../../redux/actions/slideActions";
import _ from "lodash";
// import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'

import fullscreen from '../fullscreen.js'

// import ReactPlayer from 'react-player'
import ReactPlayer from 'react-player/file'
import playButton from '../images/videoIcons/PLAY.svg';
import pauseButton from '../images/videoIcons/PAUSE.svg';
import soundOnButton from '../images/videoIcons/SOUND-ON.svg';
import soundOffButton from '../images/videoIcons/SOUND-OFF.svg';
import fullscreenButton from '../images/videoIcons/FULLSCREEN.svg';


class SlideFilm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soundOn: false,
            video: null,
            isPlaying: true
        }
        this.videoContainerRef = React.createRef()
        this.throttleMouseMove = _.throttle(this.handleMouseMove, 350);
        this.mouseMovementTimeout = null
    }
    componentDidMount(){
        if (document.addEventListener) {
            document.addEventListener('fullscreenchange', this.handleFullscreenChange, false);
            document.addEventListener('mozfullscreenchange', this.handleFullscreenChange, false);
            document.addEventListener('MSFullscreenChange', this.handleFullscreenChange, false);
            document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange, false);
        }
        
    }
    handleFullscreenChange() {
        if (document.webkitIsFullScreen || document.mozFullScreen || (document.msFullscreenElement !== null && typeof(document.msFullscreenElement) !== 'undefined')) {//document.msFullscreenElement !== null
            console.log('isFUllScreen')
        }
        else {
            console.log('NOTFUllScreen')
            // const videoRef = this.videoContainerRef.current
            // const videoElem = videoRef.wrapper.querySelectorAll(":scope > video")[0];
            // console.log('paused',videoElem.paused)
            // //check if playing and state is playing
        }
    }
    handleSeekBarClick(e){
            const offset = $(".custom-seekbar").offset();
            const left = (e.pageX - offset.left);
            const totalWidth = $(".custom-seekbar").width();
            const percentage = ( left / totalWidth );
            const timeToSeekTo = percentage * this.videoContainerRef.current.duration
            // this.videoContainerRef.current.seekTo(percentage)
            this.videoContainerRef.current.currentTime = timeToSeekTo
            // console.log(this.videoContainerRef.current.currentTime)
            // console.log(percentage * this.videoContainerRef.current.duration)
    }
    shouldComponentUpdate(nextProps, nextState){
        const soundStateChanged = this.state.soundOn !== nextState.soundOn
        const isPlayingStateChanged = this.state.isPlaying !== nextState.isPlaying
        const filmSlideMouseMovementDetected = this.props.filmSlideMouseMovementDetected !== nextProps.filmSlideMouseMovementDetected
        const arrivedAtOrLeftSlide = this.props.isCurrent !== nextProps.isCurrent
        return soundStateChanged || arrivedAtOrLeftSlide || filmSlideMouseMovementDetected || isPlayingStateChanged
    }
    componentDidUpdate(prevProps){
        const slideIsActive = this.props.isCurrent
        const slideJustChanged = this.props.isCurrent !== prevProps.isCurrent
        if(slideIsActive && slideJustChanged){
            this.playVideo()
            setTimeout(() => {//this makes simulates a mousemovement to reveal the video components and header
                this.handleMouseMove()
                }, 2000)
        }
        else if(!slideIsActive && slideJustChanged) {
            this.pauseVideo()
            
        }
    }
    playVideo(){
        const videoRef = this.videoContainerRef.current
        const videoElem = videoRef.wrapper.querySelectorAll(":scope > video")[0];
        videoElem.play()
        this.setState({
            isPlaying: true
        })
    }
    pauseVideo(){
        const videoRef = this.videoContainerRef.current
        const videoElem = videoRef.wrapper.querySelectorAll(":scope > video")[0];
        videoElem.pause()
        this.setState({
            isPlaying: false
        })
    }
    toggleVideoPlay(){
        const newIsPlayingState = !this.state.isPlaying
        if(newIsPlayingState) this.playVideo()
        else this.pauseVideo()
    }
    toggleSound(){
        const currentSoundState = this.state.soundOn
        const newSoundState = !this.state.soundOn

        if(currentSoundState){
            this.videoContainerRef.current.muted = true
        }
        else {
            this.videoContainerRef.current.muted = false
        }
        this.setState({
            soundOn: newSoundState
        })
    }
    updateSeekBar(progress){
        const percentage = progress.target.currentTime/progress.target.duration * 100;
        $(".custom-seekbar .progress").css("width", percentage+"%");
    }
    handleMouseMove(){
        this.props.updateFilmSlideMouseMovement(true)
        clearTimeout(this.mouseMovementTimeout)
        this.mouseMovementTimeout = setTimeout(() => {
            this.props.updateFilmSlideMouseMovement(false)
            }, 2000)
    }
    handleFullscreenVideo(){
        console.log('handleFullscreenVideo')
        const videoRef = this.videoContainerRef.current
        const videoElem = videoRef.wrapper.querySelectorAll(":scope > video")[0];
        fullscreen.request(videoElem)
        // const video = this.videoContainerRef.current
        // screenfull.request(videoElem)//used screenfull to handle crossbrowser full screen issues
        // screenfull.request(video.wrapper)//used screenfull to handle crossbrowser full screen issues
        //, {navigationUI: 'hide'} //used for hiding UI navigation
        this.setState({
            soundOn: true,
        })

    }

    render(){
        const right_arrow_styles = {
            backgroundImage: 'url('+this.props.configuration.swipe_arrow_right_1+')'
        }
        const left_arrow_styles = {
            backgroundImage: 'url('+this.props.configuration.swipe_arrow_left_1+')',
            backgroundPosition: 'right'
        }
        let seekbarClasses = 'custom-seekbar '
        seekbarClasses += this.props.filmSlideMouseMovementDetected ? 'visible' : 'hidden'
        const playPauseIcon = this.state.isPlaying ?  pauseButton : playButton
        const soundIcon = this.state.soundOn ? soundOffButton : soundOnButton
        const slideIsActive = this.props.isCurrent
        const videoIsPlaying = slideIsActive && this.state.isPlaying
        let videoIconsClasses = 'videoIcons '
        videoIconsClasses += this.props.filmSlideMouseMovementDetected ? 'visible' : 'hidden'
        return(
            <div className='filmSlideContent' onMouseMove={() => this.throttleMouseMove()}>
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
                <ReactPlayer
                    playsinline={true}
                    // url='https://vimeo.com/537572775'
                    url={this.props.configuration.background_video_film} 
                    ref={this.videoContainerRef}
                    playing={videoIsPlaying}
                    volume={1}
                    muted={!this.state.soundOn}
                    className='reactPlayer'
                    width='100vw'
                    height='100vh'
                    loop={true}
                    progressInterval={500}
                    // onProgress={(progress)=> this.updateSeekBar(progress)}
                    />
                    {/* <video
                        className='reactPlayer'
                        ref={this.videoContainerRef}
                        loop={true}
                        muted='muted'
                        autoPlay={true}
                        playsInline='playsInline'
                        preload="metadata"
                        onTimeUpdate={(progress)=> this.updateSeekBar(progress)}
							>
							<source src={this.props.configuration.background_video_film} type="video/mp4" />
							</video> */}
                {/* <div className="filmContainer">
                    <iframe src="https://player.vimeo.com/video/90509568"
                        title='0'
                        byline='0'
                        portrait='0'
                        playsinline='0'
                        autopause='0'
                        controls='0'
                        app_id='122963'
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen 
                        onMouseMove={() => this.throttleMouseMove()}
                        />
                </div> */}
                <div className={videoIconsClasses}>
                    <img className='icon' alt="Video Icon" onClick={()=>this.toggleVideoPlay()} src={playPauseIcon} />
                    <img className='icon' alt="Video Icon" onClick={()=>this.toggleSound()} src={soundIcon} />
                    <img className='icon mobile-only' alt="Video Icon" onClick={()=>this.handleFullscreenVideo()} src={fullscreenButton} />
                </div>
                <div className={seekbarClasses} onClick={(e) => this.handleSeekBarClick(e)}>
                    <span className='progress'></span>
                </div>
                
                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
                            <div className='left_arrow_bouncing' style={left_arrow_styles} onClick={() => this.props.slideHorizontal('left')}/>
							<div className='uppercase' dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
                            <div className='right_arrow_bouncing' style={right_arrow_styles} onClick={() => this.props.slideHorizontal('right')}/>
						</h1>
					</div>
				}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const filmSlideMouseMovementDetected = state.slideData.filmSlideMouseMovementDetected
    return { filmSlideMouseMovementDetected }
}

export default connect(
    mapStateToProps,
    { updateFilmSlideMouseMovement }
)(SlideFilm)