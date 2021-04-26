import {Component} from 'react';
import React from 'react';
import {connect} from 'react-redux'
// import _ from "lodash";
// import locationMapDesktop from '../images/map/map01.jpg'
// import satelliteMapDesktop from '../images/map/map02.jpg'
// import locationMapMobile from '../images/map/map01_mobile.jpg'
// import satelliteMapMobile from '../images/map/map02_mobile.jpg'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import desktopMapLogo from '../images/map/Motion_logo--last-frame.png'


class SlideMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            satelliteMapEnabled: false,
            enabledListing: null,
            googleMapsLoaded: false
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const mapChanged = this.state.satelliteMapEnabled !== nextState.satelliteMapEnabled
        const enabledListingChanged = this.state.enabledListing !== nextState.enabledListing
        const mapHeightLockedPropsChanged = this.props.mapHeightLocked !== nextProps.mapHeightLocked
        const googleMapsNotLoaded = !this.state.googleMapsLoaded
        const googleMapsStateChanged = this.state.googleMapsLoaded !== nextState.googleMapsLoaded
        return mapChanged || enabledListingChanged || mapHeightLockedPropsChanged || googleMapsNotLoaded || googleMapsStateChanged
    }
    componentDidUpdate(){
        if(!this.state.googleMapsLoaded && typeof(window.google) !== 'undefined'){
            this.setState({
                googleMapsLoaded: true
            })
        }
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

        // const locationMap = this.props.isMobileDevice ? locationMapDesktop : locationMapMobile
        // const satelliteMap = this.props.isMobileDevice ? satelliteMapDesktop : satelliteMapMobile
        
        const containerStyle = {
            width: '100%',
            height: '100%'
        }
          
        const center = {
            lat: 40.759370,
            lng: -74.033470
        }
        const options = this.state.googleMapsLoaded ? {
                icon: {
                    url: desktopMapLogo,
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(22, 40),
                    scaledSize: new window.google.maps.Size(347, 100)
                }
            } : {}
        const customMapStyles = [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
        ]
        const mapZoomLevel = 14
        const markerPosition = {
            lat: 40.759370,
            lng: -74.033470
        }
        const googleMapsApiKey = "AIzaSyBU2eqkanbV49ozX8-5EU9CSHhusjgXZsI"
        return(
            <>
                <section className={mapSectionClasses}>
                    <div className="mapBackground">
                        {/* <img src={locationMap} alt="" className=' map'/> */}
                        <div className="map">
                            <LoadScript
                                googleMapsApiKey={googleMapsApiKey}
                            >
                                <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={mapZoomLevel}
                                options={
                                    {
                                        disableDefaultUI: true,
                                        styles: customMapStyles,
                                        scrollwheel: false
                                    }
                                }
                                >
                                <Marker
                                    position={markerPosition}
                                    options={options}
                                    />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                        {/* <img src={require('./images/map/map01_mobile.jpg').default} alt="" className='mobile-only map'/> */}
                        <div className={satelliteImageContainerClasses}>
                            {/* <img src={satelliteMap} alt="" className=' map'/> */}
                            <div id="map--satellite" className='map--satellite'>
                                <LoadScript
                                    googleMapsApiKey={googleMapsApiKey}
                                >
                                    <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={mapZoomLevel}
                                    options={
                                        {
                                            mapTypeId: 'satellite',
                                            disableDefaultUI: true,
                                            scrollwheel: false
                                        }
                                    }
                                    >
                                    <Marker
                                        position={markerPosition}
                                        options={options}
                                        />
                                    </GoogleMap>
                                </LoadScript>

                            </div>
                            {/* <iframe
                                // loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBU2eqkanbV49ozX8-5EU9CSHhusjgXZsI
                                    &q=1300+Manhattan+Ave,Union+City,+NJ+07087&center=40.759370,-74.033470">
                                </iframe> */}
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