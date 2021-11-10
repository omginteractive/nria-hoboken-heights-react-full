import { Component } from 'react'
import React from 'react'
import magnifyingGlass from '../images/magnifyingGlass.svg'
import ImageZoom from './ImageZoom'
import $ from 'jquery'
import { connect } from 'react-redux'
// import _ from "lodash";
import {
  setActiveAvailabilityPlan,
  displayAvailabilityPlanModal,
} from '../../redux/actions/slideActions'

class SlideAvailability extends Component {
  constructor(props) {
    super(props)
    this.state = {
      availabilitySelect2Activated: false,
      availableFloorplans: [],
      selectedFilter: {
        bedrooms: '',
        apartment_type: '',
      },
    }
  }

  updateFilter() {
    const { bedrooms, apartment_type } = this.state.selectedFilter
    const availableFloorplans = this.props.configuration.apartment_result

    const filteredFloorplans = availableFloorplans.filter(
      (floorplan) =>
        (!bedrooms || floorplan.acf.bedrooms === bedrooms) &&
        (!apartment_type || floorplan.acf.apartment_type === apartment_type)
    )

    this.setState({
      availableFloorplans: filteredFloorplans,
    })
  }

  componentDidMount() {
    this.updateFilter()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedFilter !== prevState.selectedFilter) {
      this.updateFilter()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const select2Exists = $.fn.select2
    const availabilitySelect2Activated = this.state.availabilitySelect2Activated
    const availabilitySelect2NeedsActivation =
      select2Exists && !availabilitySelect2Activated
    const availabilityModalToggled =
      this.props.availabilityPlanModalEnabled !==
      nextProps.availabilityPlanModalEnabled
    return availabilitySelect2NeedsActivation || availabilityModalToggled
  }

  setActiveAvailabilityPlan(i) {
    this.props.setActiveAvailabilityPlan(i)
    this.props.displayAvailabilityPlanModal()
    // $('.slideTemplate-availability').animate({ scrollTop: 0 }, 'fast') //scroll up to top in case user scrolled down
  }

  handleChange(v) {
    this.setState({ selectedFilter: { ...this.state.selectedFilter, ...v } })
  }

  render() {
    const availabilityPlanModalEnabled = this.props.availabilityPlanModalEnabled
    const { availableFloorplans } = this.state

    let availabilityClasses = 'availability'
    availabilityClasses += availabilityPlanModalEnabled ? ' hidden' : ''
    let availabilityModalClasses = 'availabilityModalPopup'
    availabilityModalClasses += availabilityPlanModalEnabled ? '' : ' hidden'
    const fullFloorplan =
      this.props.configuration.apartment_result[
        this.props.activeAvailabilityPlan
      ]?.acf?.floorplan_full.url

    return (
      <>
        <section className={availabilityClasses}>
          {this.props.availabilityPlanModalEnabled}
          <h2>{this.props.configuration.availabilityHeadline}</h2>
          <p
            className="availabilityDescription"
            dangerouslySetInnerHTML={{
              __html: this.props.configuration.availabilityText,
            }}
          />
          <div className="availabilityDropdownWrapper">
            <div className="availabilityDropdownElement">
              <div className="availabilityDropdownLabel">
                {this.props.configuration.availabilityFloorplansLabel}
              </div>
              <div className="availabilityDropdownSelect">
                <select
                  onChange={(v) =>
                    this.handleChange({ bedrooms: v.target.value })
                  }
                  className="availabilityDropdown"
                  id="availabilityFloorPlansDropdown"
                >
                  <option value="">All</option>
                  {this.props.configuration.availabilityFloorplansOptions.map(
                    (option, i) => {
                      return (
                        <option
                          key={i + 'floorPlanOption'}
                          value={option.choice}
                        >
                          {option.choice}
                        </option>
                      )
                    }
                  )}
                </select>
                <span className="availabilityDropdownArrow">
                  <b />
                </span>
              </div>
            </div>
            <div className="availabilityDropdownElement">
              <div className="availabilityDropdownLabel">
                {this.props.configuration.availabilityCollectionLabel}
              </div>
              <div className="availabilityDropdown">
                <div className="availabilityDropdownSelect">
                  <select
                    onChange={(v) =>
                      this.handleChange({ apartment_type: v.target.value })
                    }
                    className="availabilityDropdown"
                    id="availabilityCollectionDropdown"
                  >
                    <option value="">All</option>
                    {this.props.configuration.availabilityCollectionOptions.map(
                      (option, i) => {
                        return (
                          <option
                            key={i + 'collectionOption'}
                            value={option.choice}
                          >
                            {option.choice}
                          </option>
                        )
                      }
                    )}
                  </select>
                  <span className="availabilityDropdownArrow">
                    <b />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`availabilityApartmentContainer ${
              availableFloorplans.length <= 2 ? 'fix' : ''
            }`}
          >
            {availableFloorplans.map((apartment, i) => {
              return (
                <div
                  className="apartment"
                  key={i + 'apartment'}
                  onClick={() => this.setActiveAvailabilityPlan(i)}
                >
                  <div className="apartment__title">
                    {apartment.title.rendered}
                  </div>
                  <div className="apartment__floorPlan">
                    <img
                      src={
                        this.props.configuration.apartment_result[i].acf
                          .floorplan.url
                      }
                      className="apartment__floorPlanImage"
                      alt=""
                    />
                    <div
                      className="magnifyingGlassWrapper"
                      onClick={() => this.setActiveAvailabilityPlan(i)}
                    >
                      <img
                        src={magnifyingGlass}
                        className="magnifyingGlass"
                        alt="Magnifying Glass"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        <div className={availabilityModalClasses}>
          <>
            {!!fullFloorplan && <ImageZoom image={fullFloorplan} />}
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

const mapStateToProps = (state) => {
  const activeAvailabilityPlan = state.slideData.activeAvailabilityPlan
  const availabilityPlanModalEnabled =
    state.slideData.availabilityPlanModalEnabled
  return { activeAvailabilityPlan, availabilityPlanModalEnabled }
}

export default connect(mapStateToProps, {
  setActiveAvailabilityPlan,
  displayAvailabilityPlanModal,
})(SlideAvailability)
