import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  MarkerClusterer,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import './style.css';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

export class MapContainer extends Component {

  // shouldn't set markers like this but fuck it for now
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markers: JSON.parse(this.props.locations),
    show: false,
    tag: '',
  };

  postData = (latitude, longitude, tag, markers) => {
    var request = require('request');

    var options = {
      method: 'POST',
      url: 'http://localhost:3000/api/location/locations',
      headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '45',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:3000',
        'Postman-Token':
          '30b42cd3-c9fa-4608-84f1-9172d36f289a,44a0bfed-13a2-44f9-a048-ea33f8ea7284',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.13.0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        latitude: latitude,
        longitude: longitude,
        tag: tag,
      },
    };

    request(options, (error, response, body) => {
      if (error) {
        throw new Error(error);
      }

      this.setState({ markers: [...this.state.markers, body] });
    });
  };

  putData = () => {
    var request = require('request');

    var options = {
      method: 'PUT',
      url: 'http://localhost:3000/api/location/locations',
      headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '11',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:3000',
        'Postman-Token':
          '032c3c6c-91a1-4718-81cf-e98449d1647a,4ede4ae6-d272-477c-93d2-7fea8b744d47',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.15.0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      form: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        tag: this.state.tag,
      },
    };

    request(options, function(error, response, body) {
      if (error) {
        throw new Error(error);
      }

      console.log(body);
    });
  };

  onMarkerClick = (props, marker, e) => {
    console.log('this is on Map/index.js: ' + props);
    // console.log('props = ', props);
    let latitude = props.latLng.lat();
    let longitude = props.latLng.lng();
    this.handleShow();
    this.setState({
      latitude: latitude,
      longitude: longitude,
    });
    //show an input or modal wherever on the page, we can make it pretty later
    // from that input console log what the user typed here.
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

    // this.setState({
    //   markers: [
    //     {
    //       lat: latitude,
    //       lng: longitude, 
    //     },
    //     ...this.state.markers,
    //   ],
    // });
    this.postData(latitude, longitude);
  };

  renderMarkers = () =>
    this.state.markers.map((marker, i) => {
      return (
        <Marker
          key={i}
          position={{
            lat: parseFloat(marker.latitude),
            lng: parseFloat(marker.longitude),
          }}
          onClick={this.onMarkerClick}
        />
      );
    });

  handleClose = () => {
    this.setState({ show: false });
    console.log(this.state.tag);
    this.putData(this.state.tag);
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value,
    });
  };

  render() {
    // this.getData();
    // this.postData();
    return (
      <GoogleMap
        onClick={this.onMapClicked}
        defaultZoom={12}
        defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
      >
        {this.renderMarkers()}

        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                value={this.state.tag}
                name="tag"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Tag"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={this.handleClose}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GMAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '600px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapContainer);
