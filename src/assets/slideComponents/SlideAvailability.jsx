import {Component} from 'react';
import React from 'react';
import magnifyingGlass from '../images/magnifyingGlass.svg';
import $ from 'jquery'
import {connect} from 'react-redux'
// import _ from "lodash";
import { activateAvailabilityPlan } from "../../redux/actions/appActions";



class SlideAvailability extends Component {
    constructor(props) {
		super(props);
		this.state = {
			availabilitySelect2Activated: false,
		}
	}
    shouldComponentUpdate(nextProps, nextState){
        const select2Exists = $.fn.select2
        const availabilitySelect2Activated = this.state.availabilitySelect2Activated
        const availabilitySelect2NeedsActivation = select2Exists && !availabilitySelect2Activated
        const activeAvailabilityPlanChanged = this.props.activeAvailabilityPlan !== nextProps.activeAvailabilityPlan
        return availabilitySelect2NeedsActivation || activeAvailabilityPlanChanged
    }
    componentDidUpdate(){
        if(!this.state.availabilitySelect2Activated) {
            const select2Exists = $.fn.select2
            const select2Initialized = $('#availabilityFloorPlansDropdown').hasClass("select2-hidden-accessible")
            if(!select2Initialized && select2Exists) {
                $('#availabilityFloorPlansDropdown').select2({
                    minimumResultsForSearch: -1
                });
                $('#availabilityCollectionDropdown').select2({
                    minimumResultsForSearch: -1
                });
                
                this.setState({
                    availabilitySelect2Activated: true
                });
            }
        }
    }
    activateAvailabilityPlan(i){
        this.props.activateAvailabilityPlan(i)
    }
    render(){
        const activeAvailabilityPlan = this.props.activeAvailabilityPlan
        const hasActiveFloorPlan = activeAvailabilityPlan !== null
        
        let availabilityClasses = 'availability'
        availabilityClasses += hasActiveFloorPlan ? ' hidden' : ''
        let availabilityModalClasses = 'availabilityModalPopup'
        availabilityModalClasses += hasActiveFloorPlan ? '' : ' hidden'
        return(
            <>
                <section className={availabilityClasses}>
                    <h2>{this.props.configuration.availabilityHeadline}</h2>
                    <p className="availabilityDescription" dangerouslySetInnerHTML={{ __html: this.props.configuration.availabilityText}} />
                    <div className="availabilityDropdownWrapper">
                        <div className="availabilityDropdownElement">
                            <div className="availabilityDropdownLabel">{this.props.configuration.availabilityFloorplansLabel}</div>
                            <select className="availabilityDropdown" id="availabilityFloorPlansDropdown">
                                {this.props.configuration.availabilityFloorplansOptions.map((option, i) => {
                                    return (<option key={i+'floorPlanOption'} value={option.choice}>{option.choice}</option>)
                                })}
                            </select>
                        </div>
                        <div className="availabilityDropdownElement">
                            <div className="availabilityDropdownLabel">{this.props.configuration.availabilityCollectionLabel}</div>
                            <div className="availabilityDropdown">
                                <select className="availabilityDropdown" id="availabilityCollectionDropdown">
                                    {this.props.configuration.availabilityCollectionOptions.map((option, i) => {
                                        return (<option key={i+'collectionOption'} value={option.choice}>{option.choice}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="availabilityApartmentContainer">
                        {this.props.configuration.apartment_result.map((apartment, i) => {
                            
                            return (
                                <div className="apartment" key={i + 'apartment'}>
                                    <div className="apartment__title">{apartment.title.rendered}</div>
                                    <div className="apartment__floorPlan">
                                        <img src={require('../images/availabilityFloorPlanExample.png').default} className="apartment__floorPlanImage" alt="" />
                                        <div className="magnifyingGlassWrapper" onClick={() => this.activateAvailabilityPlan(i)}>
                                            <img src={magnifyingGlass} className="magnifyingGlass" alt="Magnifying Glass" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <div className={availabilityModalClasses}>
                    <img src={require('../images/availabilityFloorPlanExample.png').default} className="apartment__floorPlanImage" alt="" />
                </div>
            </>
        )
    }
}


const mapStateToProps = state => {
    const activeAvailabilityPlan = state.appData.activeAvailabilityPlan
    return { activeAvailabilityPlan }
  }

  export default connect(
    mapStateToProps,
    { activateAvailabilityPlan }
  )(SlideAvailability);