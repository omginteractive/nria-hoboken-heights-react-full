import {Component} from 'react';
import React from 'react';
import magnifyingGlass from '../images/magnifyingGlass.svg';
import ImageZoom from './ImageZoom';
import $ from 'jquery'
import {connect} from 'react-redux'
// import _ from "lodash";
import { setActiveAvailabilityPlan, displayAvailabilityPlanModal } from "../../redux/actions/slideActions";



class SlideAvailability extends Component {
    constructor(props) {
		super(props);
		this.state = {
			availabilitySelect2Activated: false,
		}
	}
    componentDidMount(){
        if(!this.state.availabilitySelect2Activated) {
            this.activateSelect2()
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const select2Exists = $.fn.select2
        const availabilitySelect2Activated = this.state.availabilitySelect2Activated
        const availabilitySelect2NeedsActivation = select2Exists && !availabilitySelect2Activated
        const availabilityModalToggled = this.props.availabilityPlanModalEnabled !== nextProps.availabilityPlanModalEnabled
        return availabilitySelect2NeedsActivation || availabilityModalToggled
    }
    activateSelect2(){
        const select2Exists = $.fn.select2
        const select2Initialized = $('#availabilityFloorPlansDropdown').hasClass("select2-hidden-accessible")
        if(!select2Initialized && select2Exists) {
            $('#availabilityFloorPlansDropdown').select2({
                minimumResultsForSearch: -1
            })
            $('#availabilityCollectionDropdown').select2({
                minimumResultsForSearch: -1
            })
            
            this.setState({
                availabilitySelect2Activated: true
            })
        }
        else if(!select2Exists) {
            setTimeout(()=>this.activateSelect2(), 5000)//wait and retry if select2 not loaded yet
        }
    }
    setActiveAvailabilityPlan(i){
        this.props.setActiveAvailabilityPlan(i)
        this.props.displayAvailabilityPlanModal()
        $(".slideTemplate-availability").animate({ scrollTop: 0 }, "fast")//scroll up to top in case user scrolled down
    }
    render(){
        const availabilityPlanModalEnabled = this.props.availabilityPlanModalEnabled
        
        let availabilityClasses = 'availability'
        availabilityClasses += availabilityPlanModalEnabled ? ' hidden' : ''
        let availabilityModalClasses = 'availabilityModalPopup'
        availabilityModalClasses += availabilityPlanModalEnabled ? '' : ' hidden'
        const fullFloorplan = this.props.configuration.apartment_result[this.props.activeAvailabilityPlan]?.acf?.floorplan_full.url

        return(
            <>
                <section className={availabilityClasses}>{this.props.availabilityPlanModalEnabled}
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
                            console.log(apartment)
                            return (
                                <div className="apartment" key={i + 'apartment'}>
                                    <div className="apartment__title">{apartment.title.rendered}</div>
                                    <div className="apartment__floorPlan">
                                        <img src={this.props.configuration.apartment_result[i].acf.floorplan.url} className="apartment__floorPlanImage" alt="" />
                                        <div className="magnifyingGlassWrapper" onClick={() => this.setActiveAvailabilityPlan(i)}>
                                            <img src={magnifyingGlass} className="magnifyingGlass" alt="Magnifying Glass" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <div className={availabilityModalClasses}>
                    <>
                        <ImageZoom  image={fullFloorplan} />
                        {/* <div className="availability_detail_apartment_name">{this.props.configuration.availability_detail_apartment_name}</div>
                        <div className="availability_detail_apartment_address availability_detail_apartment_address_line_1">{this.props.configuration.availability_detail_apartment_address_line_1}</div>
                        <div className="availability_detail_apartment_address availability_detail_apartment_address_line_2">{this.props.configuration.availability_detail_apartment_address_line_2}</div>
                        <div className="title">{this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].title.rendered}</div>
                        <div className="apartment_type">{this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.apartment_type}</div>
                        <div className="bedrooms">{this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.bedrooms}</div>
                        <div className="bathrooms">{this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.bathrooms}</div>
                        <div className="extras" dangerouslySetInnerHTML={{ __html: this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.extras}} />
                        <div className="interior_sf">INTERIOR: {this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.interior_sf}</div>
                        <div className="terrace_sf">TERRACE: {this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.terrace_sf}</div>
                        <div className="total_sf">TOTAL: {this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.total_sf}</div>
                        <div className="percentage_ownership">PERCENTAGE OWNERSHIP: {this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.percentage_ownership}</div>
                        <div className="level">{this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.level}</div>
                        <img src={this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.building_image.url} className="apartment__buildingImage" alt="" />
                        <div className="building">{this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.building}</div>
                        <img src={this.props.configuration.apartment_result[this.props.activeAvailabilityPlan].acf.floorplan.url} className="apartment__floorPlanImage" alt="" /> */}
                    </>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    const activeAvailabilityPlan = state.slideData.activeAvailabilityPlan
    const availabilityPlanModalEnabled = state.slideData.availabilityPlanModalEnabled
    return { activeAvailabilityPlan, availabilityPlanModalEnabled }
}

export default connect(
    mapStateToProps,
    { setActiveAvailabilityPlan, displayAvailabilityPlanModal }
)(SlideAvailability)