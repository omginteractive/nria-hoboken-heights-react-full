import {Component} from 'react';
import React from 'react';
import {connect} from 'react-redux'
// import _ from "lodash";
import locationMapDesktop from '../images/map/map01.jpg'
import satelliteMapDesktop from '../images/map/map02.jpg'
import locationMapMobile from '../images/map/map01_mobile.jpg'
import satelliteMapMobile from '../images/map/map02_mobile.jpg'


class SlideMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            satelliteMapEnabled: false,
            enabledListing: null
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const mapChanged = this.state.satelliteMapEnabled !== nextState.satelliteMapEnabled
        const enabledListingChanged = this.state.enabledListing !== nextState.enabledListing
        const mapHeightLockedPropsChanged = this.props.mapHeightLocked !== nextProps.mapHeightLocked
        return mapChanged || enabledListingChanged || mapHeightLockedPropsChanged
    }
    toggleMap(){
        const newState = !this.state.satelliteMapEnabled
        this.setState({
            satelliteMapEnabled: newState
        })
    }
    toggleListing(idx){
        // const enabledListingsClone = [...this.state.enabledListings];
        // const index = enabledListingsClone.indexOf(idx)
        // if (index !== -1) {
        //     enabledListingsClone.splice(index, 1);
        //     this.setState({enabledListings: enabledListingsClone});
        // }
        // else {
        //     this.setState({
        //         enabledListings: this.state.enabledListings.concat(idx)
        //     })
        // }
        // const indexIsEnabled = this.state.enabledListing === idx
        // const newState = indexIsEnabled ? null : idx
        this.setState({
            enabledListing: idx
        })

    }
    render(){
        let mapSectionClasses = 'mapSection'
        mapSectionClasses += this.props.mapHeightLocked ? ' heightLocked' : ' heightNotLocked'

        let satelliteImageContainerClasses = 'satelliteImageContainer'
        satelliteImageContainerClasses += this.state.satelliteMapEnabled ? ' visible' : ''

        // const locationListings = this.props.configuration.locationListings
        const toggleBarText = this.state.satelliteMapEnabled ? this.props.configuration.map_location_view_text : this.props.configuration.map_satellite_view_text

        const locationMap = this.props.isMobileDevice ? locationMapDesktop : locationMapMobile
        const satelliteMap = this.props.isMobileDevice ? satelliteMapDesktop : satelliteMapMobile
        return(
            <>
                <section className={mapSectionClasses}>
                    <div className="mapBackground">
                        <img src={locationMap} alt="" className=' map'/>
                        {/* <img src={require('./images/map/map01_mobile.jpg').default} alt="" className='mobile-only map'/> */}
                        <div className={satelliteImageContainerClasses}>
                            <img src={satelliteMap} alt="" className=' map'/>
                            <iframe
                                width="600"
                                height="450"
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCR9Nsnljn6pkBZPEy5hIudkQDENQrJqh4
                                    &q=1300+Manhattan+Ave,Union+City,+NJ+07087">
                                </iframe>
                            {/* <img src={require('./images/map/map02_mobile.jpg').default} alt="" className='mobile-only map'/> */}
                        </div>
                    </div>
                    <img src={require('../images/map/Motion_logo.gif').default} alt="" className="mapLogo not-mobile"/>
                    {/* <img src={require('./images/map/Motion_logo_mobile_animateonce.gif').default} alt="" className="mapLogo mobile-only"/> */}
                    <div className="mapLogoContainer mobile-only">
                        <div className="logoWrapper">
                            <img alt='Hoboken Heights Logo Light' className="logoImage" src={require('../images/logos/Logo-small-white.svg').default} />
                            <div className="companyName">Hoboken Heights</div>
                            <div className="companyAddress">Manhattan Avenue, 1300</div>
                        </div>
                        <div className="mapMarker"></div>
                    </div>
                    <div className="mapMotionLogo">
                    </div>
                    <div onClick={this.toggleMap.bind(this)} className="satelliteToggle vertical_toggle_column noSelect">
                        <div className="rotatedText noSelect">{toggleBarText}</div>
                    </div>
                    {/* <div className="mapSection__locationList">
                        {locationListings.map((amenity, idx) => {
                            const isActive = this.state.enabledListing === idx
                            const locationListingClasses =  isActive ? 'locationListing active' : 'locationListing'
                            const toggleSymbol = isActive ? '-' : '+'
                            return (
                            <div key={idx+'mapSectionLocationListing'} onClick={() => this.toggleListing(idx)}  className={locationListingClasses}>
                                <div className="titleDistanceWrapper">
                                    <div className="locationTitle">Lorem Ipsum</div>
                                    <div className="locationDistance">(10 mins)</div>
                                    <div className="toggleButton">{toggleSymbol}</div>
                                </div>
                                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </div>
                            )
                        })}
                    </div> */}
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
  )(SlideMap);