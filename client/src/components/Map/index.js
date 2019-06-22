import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  MarkerClusterer,
  Marker,
  InfoWindow,
} from "react-google-maps";
import "./style.css";

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markers: [],
  };

  getData = () => {
    var request = require("request");

    var options = {
      method: "GET",
      url: "http://localhost:3000/api/location/locations",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "accept-encoding": "gzip, deflate",
        Host: "localhost:3000",
        "Postman-Token":
          "4b5beafa-b5bc-4793-a566-b92fd9c80b3f,746e29c4-8563-4b1a-85cf-1be2f664c198",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "User-Agent": "PostmanRuntime/7.13.0",
      },
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
  };

  postData = (latitude, longitude, enteredDescription) => {
    var request = require("request");

    var options = {
      method: "POST",
      url: "http://localhost:3000/api/location/locations",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "content-length": "45",
        "accept-encoding": "gzip, deflate",
        Host: "localhost:3000",
        "Postman-Token":
          "30b42cd3-c9fa-4608-84f1-9172d36f289a,44a0bfed-13a2-44f9-a048-ea33f8ea7284",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "User-Agent": "PostmanRuntime/7.13.0",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        latitude: latitude,
        longitude: longitude,
        tag: enteredDescription,
      },
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      console.log("hey");

      console.log(body);
    });
  };

  onMarkerClick = (props, marker, e) => {
    const enteredDescription = prompt(
      "Enter the description for this pin",
    );
    console.log("enteredDescription");

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

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
    let longitude = event.latLng.lng();

    this.setState({
      markers: [
        {
          lat: latitude,
          lng: longitude,
        },
        ...this.state.markers,
      ],
    });
    this.postData(latitude, longitude);
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
          onClick={this.onMarkerClick}
        />
      );
    });

  render() {
    this.getData();
    this.postData();
    return (
      <GoogleMap
        onClick={this.onMapClicked}
        defaultZoom={12}
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
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "600px" }} />,
    mapElement: <div style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapContainer);
