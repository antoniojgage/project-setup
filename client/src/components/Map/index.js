import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import './style.css';
import { Modal, Button } from 'react-bootstrap';
const axios = require('axios');
export class MapContainer extends Component {
  // shouldn't set markers like this but fuck it for now
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markers: [],
    show: false,
    tag: '',
    renderMarkers: 0,
  };

  componentDidMount() {
    // console.log('locations = ', this.props.locations);
    // let locations = this.props.locations;
    // // let locations = JSON.parse(this.props.locations);
    // this.setState({ markers: locations });
  }
  postData = async (latitude, longitude, tag, markers) => {
    let getData = await axios
      .get(`${process.env.REACT_APP_URL}/api/location/locations`, {
        latitude: latitude,
        longitude: longitude,
        tag: tag,
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      markers: [...this.state.markers, getData],
      renderMarkers: this.state.renderMarkers + 1,
    });
    console.log(this.state.markers);
  };

  putData = async () => {
    let getData = await axios
      .get(`${process.env.REACT_APP_URL}/api/location/locations`, {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        tag: this.state.tag,
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      markers: [...this.state.markers, getData],
      renderMarkers: this.state.renderMarkers + 1,
    });
    console.log(this.state.markers);
    this.props.newMarker();
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
    console.log('map was clicked', latitude, longitude);
    this.props.newMarker();
    this.postData(latitude, longitude);
  };

  renderMarkers = locations => {
    console.log(locations);
    return locations.map((marker, i) => (
      <Marker
        key={i}
        position={{
          lat: parseFloat(marker.latitude),
          lng: parseFloat(marker.longitude),
        }}
        onClick={this.onMarkerClick}
      />
    ));
  };

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
    let { locations } = this.props;
    console.log(this.props);
    return (
      <GoogleMap
        onClick={this.onMapClicked}
        defaultZoom={12}
        defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
      >
        {this.renderMarkers(locations)}
        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header>
            <Modal.Title>Add a tag</Modal.Title>
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
