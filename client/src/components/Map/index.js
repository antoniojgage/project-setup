import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  MarkerClusterer,
  Marker,
} from 'react-google-maps';

// import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import './style.css';
// import axios from 'axios';

// const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;

// const mapStyles = {
//   width: '100%',
//   height: '80%',
// };

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markers: [],
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onMapClicked = (event, location, map) => {
    let latitude = event.latLng.lat();
    let longtitude = event.latLng.lng();
    // console.log(latitude, longtitude);
    this.setState({
      markers: [
        { lat: latitude, lng: longtitude },
        ...this.state.markers,
      ],
    });
    // this.setState(prev => ({
    //   fields: {
    //     ...prev.fields,
    //     location,
    //   },
    // }));
    // map.panTo(location);
  };
  renderMarkers = () =>
    this.state.markers.map((marker, i) => {
      return (
        <Marker
          key={i}
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
        />
      );
    });

  render() {
    return (
      <GoogleMap
        onClick={this.onMapClicked}
        defaultZoom={8}
        defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
      >
        {this.renderMarkers()}
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GMAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapContainer);
