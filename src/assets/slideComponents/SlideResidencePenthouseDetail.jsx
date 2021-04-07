import {Component} from 'react';
import React from 'react';
import {connect} from 'react-redux'

class SlideResidencePenthouseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageExpanded: false,
            currImageIdx: 0,
            prevIdx: null,
            isTransitioning: null,
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        const imageExpandedChanged = this.state.imageExpanded !== nextState.imageExpanded
        const currImageIdxChanged = nextState.currImageIdx !== this.state.currImageIdx
        const prevImageIdxChanged = nextState.prevIdx !== this.state.prevIdx
        const residencePenthousePathChanged = nextProps.residencePenthousePath !== this.props.residencePenthousePath
        return imageExpandedChanged || currImageIdxChanged || residencePenthousePathChanged || prevImageIdxChanged
    }
    handleWheelEvent = e => {
        const wheelAmt = e.deltaY
        const querySelector = '.residencePenthouseDetail__details'
        const elementToDelegateScroll = document.querySelectorAll(querySelector)[0]
        this.props.methods.delegateScroll(wheelAmt, elementToDelegateScroll, this.state.imageExpanded)
    }
    toggleImageExpansion(){
        const newImageState = !this.state.imageExpanded
        this.setState({
            imageExpanded: newImageState
        })
    }
    activateImage(idx){
        const isSameIdx = this.state.currImageIdx === idx
        const prevIdxNotYetDeactivated = this.state.prevIdx !== null
        if(this.state.isTransitioning || isSameIdx || prevIdxNotYetDeactivated) return false
        const prevIdx = this.state.currImageIdx
        this.setState({
            currImageIdx: idx,
            prevIdx: prevIdx,
            isTransitioning: true
        })
    }
    handleImageTransitionEnd(idx){
        this.setState({
            prevIdx: null,
            isTransitioning: false
        })
    }
    render(){
        const isPenthouse = this.props.residencePenthousePath === 'penthouse'
        const penthouse_gallery = this.props.configuration.penthouse_gallery
        const residences_gallery = this.props.configuration.residences_gallery
        const page_title = isPenthouse ? this.props.configuration.heading_penthouse : this.props.configuration.heading_residences
        const page_description = isPenthouse ? this.props.configuration.content_1_penthouse : this.props.configuration.content_1_residences
        const features_heading = isPenthouse ? this.props.configuration.features_heading_penthouse : this.props.configuration.features_heading_residences
        const features_list = isPenthouse ? this.props.configuration.penthouse_features : this.props.configuration.residences_features
        const button_text = isPenthouse ? this.props.configuration.button_text_4 : this.props.configuration.button_text_3
        const left_arrow = isPenthouse ? this.props.configuration.left_arrow_2 : this.props.configuration.left_arrow_1
        const toggleExpansionMinus = isPenthouse ? this.props.configuration.penthouse_gallery_contract : this.props.configuration.residences_gallery_contract
        const toggleExpansionPlus = isPenthouse ? this.props.configuration.penthouse_gallery_expand : this.props.configuration.residences_gallery_expand
        const imageIsExpanded = this.state.imageExpanded
        let details_classes = 'residencePenthouseDetail'
        details_classes += imageIsExpanded ? ' expandImage' : ''

        let imageContainerClasses = 'residencePenthouseDetail__image_container '
        imageContainerClasses += this.props.configuration.imageContainerAdditionalClasses ? this.props.configuration.imageContainerAdditionalClasses : ''
        let residencePenthouseDetailsClasses = 'residencePenthouseDetail__details '
        residencePenthouseDetailsClasses += this.props.configuration.imageDetailsAdditionalClasses ? this.props.configuration.imageDetailsAdditionalClasses : ''
        let residencePenthouseDotsClasses = 'residencePenthouseDetail__dots '
        residencePenthouseDotsClasses += this.props.configuration.imageDotsAdditionalClasses ? this.props.configuration.imageDotsAdditionalClasses : ''
        const penthouseDotsClasses = !isPenthouse ? residencePenthouseDotsClasses + ' hidden' : residencePenthouseDotsClasses
        const residenceDotsClasses = isPenthouse ? residencePenthouseDotsClasses + ' hidden' : residencePenthouseDotsClasses
        let penthouseFullscreenImageWrapperClasses = "fullscreenImageWrapper"
        penthouseFullscreenImageWrapperClasses += !isPenthouse ? ' hidden' : ''
        let residenceFullscreenImageWrapperClasses = "fullscreenImageWrapper"
        residenceFullscreenImageWrapperClasses += isPenthouse ? ' hidden' : ''
        return(
            <>
                <section className={details_classes}>
                    <div className={residencePenthouseDetailsClasses}>
                        <h2>{page_title}</h2>
                        <p dangerouslySetInnerHTML={{__html: page_description}} />
                        <div className="residencePenthouseDetail__features_list_heading_wrapper">
                            <div className="heading">{features_heading}</div>
                            <div className="residencePenthouseDetail__features_list_wrapper" dangerouslySetInnerHTML={{__html: features_list}} />
                        </div>
                        <div className="residencePenthouseDetail__arrow_button_container">
                            <div className="leftArrowContainer">
                                <img alt='Left Arrow' className="leftArrow" src={left_arrow}></img>
                            </div>
                            <div onClick={this.props.methods.goToContactSlide.bind(this)} className="btn light">{button_text}</div>
                        </div>
                    </div>
                    <div onWheel={this.handleWheelEvent.bind(this)} className={imageContainerClasses}>
                        <div onClick={this.toggleImageExpansion.bind(this)} className="residencePenthouseDetail__expand_toggler vertical_toggle_column">
                            {imageIsExpanded && 
                                <div><img src={toggleExpansionMinus} alt="minus"/></div>
                            }
                            {!imageIsExpanded && 
                                <div><img src={toggleExpansionPlus} alt="plus"/></div>
                            }
                        </div>
                        <div className={penthouseFullscreenImageWrapperClasses}>
                            {penthouse_gallery.map((image, i) => {
                                let imgClasses = 'fullscreenImage'
                                imgClasses += i === this.state.currImageIdx ? ' active' : ''
                                imgClasses += i === this.state.prevIdx ? ' deactivating' : ''
                                return (
                                    <img key={i+'penthouseDetailFullscreenImage'} onTransitionEnd={() => this.handleImageTransitionEnd(i)} className={imgClasses} src={image.url} alt="Penthouse Image"/>
                                )
                            })}
                        </div>
                        <div className={residenceFullscreenImageWrapperClasses}>
                            {residences_gallery.map((image, i) => {
                                let imgClasses = 'fullscreenImage'
                                imgClasses += i === this.state.currImageIdx ? ' active' : ''
                                imgClasses += i === this.state.prevIdx ? ' deactivating' : ''
                                return (
                                    <img key={i+'residenceDetailFullscreenImage'} onTransitionEnd={() => this.handleImageTransitionEnd(i)} className={imgClasses} src={image.url} alt="Residence Image"/>
                                )
                            })}
                        </div>
                    </div>
                    <div className={penthouseDotsClasses}>
                        {penthouse_gallery.map((image, i) => {
                            let dotClasses = 'dot'
                            dotClasses += i === this.state.currImageIdx ? ' active' : ''
                            return (<div key={i+'penthouseDetailDot'} onClick={() => this.activateImage(i)} className={dotClasses} />)
                        })}
                    </div>
                    <div className={residenceDotsClasses}>
                        {residences_gallery.map((image, i) => {
                            let dotClasses = 'dot'
                            dotClasses += i === this.state.currImageIdx ? ' active' : ''
                            return (<div key={i+'residenceDetailDot'} onClick={() => this.activateImage(i)} className={dotClasses} />)
                        })}
                    </div>
                </section>
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
)(SlideResidencePenthouseDetail)