import {Component} from 'react';
import React from 'react';
import {connect} from 'react-redux'
import { setResidencePenthousePath } from "../../redux/actions/slideActions";

class SlideResidencePenthouse extends Component {
    shouldComponentUpdate(){
        return false
    }
    setResidencePenthousePath = option => {
        this.props.setResidencePenthousePath(option);
        setTimeout(() => {
            this.nextSlide(true)
        })
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        return(
            <>
                <div onClick={() => this.setResidencePenthousePath('residence')} className="btn">{this.props.configuration.residences_button_text}</div>
                <div onClick={() => this.setResidencePenthousePath('penthouse')} className="btn">{this.props.configuration.penthouse_button_text}</div>
            </>
        )
    }
}

const mapStateToProps = () => {
    return { }
}

export default connect(
    mapStateToProps,
    { setResidencePenthousePath }
)(SlideResidencePenthouse)