import {Component} from 'react';
import React from 'react';
import {connect} from 'react-redux'

class SlideResidencePenthouseFullscreen extends Component {
    shouldComponentUpdate(nextProps, nextState){
        const residencePenthouseChanged = nextProps.residencePenthousePath !== this.props.residencePenthousePath
        return residencePenthouseChanged
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        const isPenthousePath = this.props.residencePenthousePath === 'penthouse'
        let penthouseImageClasses = 'residencePenthouseFullscreenImage penthouse'
        let residenceImageClasses = 'residencePenthouseFullscreenImage residence'
        penthouseImageClasses += !isPenthousePath ? ' hidden' : ''
        residenceImageClasses += isPenthousePath ? ' hidden' : ''
        
        const residencePenthouseDownArrow = isPenthousePath ? this.props.configuration.down_arrow_3.url : this.props.configuration.down_arrow_4.url
        const residencePenthouseSwipeText = isPenthousePath ? this.props.configuration.swipe_text_mobile_3 : this.props.configuration.swipe_text_mobile_4
        const residencePenthouseSwipeArrowLeft = isPenthousePath ? this.props.configuration.swipe_arrow_left_3.url : this.props.configuration.swipe_arrow_left_4.url
        const residencePenthouseSwipeArrowRight = isPenthousePath ? this.props.configuration.swipe_arrow_right_3.url : this.props.configuration.swipe_arrow_right_4.url

        const right_arrow_styles = {
            backgroundImage: 'url('+residencePenthouseSwipeArrowRight+')'
        }
        const left_arrow_styles = {
            backgroundImage: 'url('+residencePenthouseSwipeArrowLeft+')',
            backgroundPosition: 'right'
        }
        return(
            <>
                <div className="downArrowContainer">
                    <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={residencePenthouseDownArrow}></img>
                </div>
                <div className="fullscreenImageWrapper">
                    <img className={penthouseImageClasses} alt="" src={this.props.configuration.background_image_penthouse} />
                    <img className={residenceImageClasses} alt="" src={this.props.configuration.background_image_residences} />
                </div>
                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
                            <div className='left_arrow_bouncing' style={left_arrow_styles} onClick={() => this.props.slideHorizontal('left')}/>
							<div className='uppercase' dangerouslySetInnerHTML={{ __html: residencePenthouseSwipeText}} />
                            <div className='right_arrow_bouncing' style={right_arrow_styles} onClick={() => this.props.slideHorizontal('right')}/>
						</h1>
					</div>
				}
            </>
        )
    }
}

const mapStateToProps = state => {
    const residencePenthousePath = state.slideData.residencePenthousePath
    return { residencePenthousePath }
}

export default connect(
    mapStateToProps
)(SlideResidencePenthouseFullscreen)