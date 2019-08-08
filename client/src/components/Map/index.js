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
    tag: '',
    renderMarkers: 0,
  };

  

  
  renderMarkers = (locations, onMarkerClick) =>
    locations.map((marker, i) => (
      <Marker
        key={i}
        position={{
          lat: parseFloat(marker.latitude),
          lng: parseFloat(marker.longitude),
        }}
        onClick={onMarkerClick}
      />
    ));

  handleSubmit = async () => {
    console.log('Handle submit executed');
    let getData = await axios
      .put(`/api/location/locations`, {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        tag: this.state.tag,
        category: this.state.category,
      })
      .then(response => response.data)
      .catch(error => console.log(error));

    console.log('Put Data method called', getData);
    this.setState({
      activeMarker: getData,
      showingInfoWindow: false,
      tag: '',
      show: false,
    });
  };

  handleClose = () => {
    console.log('Executing on Close');
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        tag: '',
      });
    }
    this.setState({ show: false, tag: '' });
  };



  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    console.log(event.target, name, value);
    // Updating the input's state
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log(this.props.onMarkerClick);
    let { locations, onMapClicked, onMarkerClick } = this.props;
    return (
      <GoogleMap
        onClick={onMapClicked}
        defaultZoom={12}
        defaultCenter={{ lat: 30.2672, lng: -97.7431 }}
      >
        {this.renderMarkers(locations, onMarkerClick)}
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
              {this.state.activeMarker.tag && (
                <p className="text-dark">
                  Current Tag: {this.state.activeMarker.tag}
                </p>
              )}
              {/* <input
                value={this.state.category}
                name="category"
                onChange={this.handleInputChange}
                type="radio"
                placeholder="Category"
              /> */}

              <br></br>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="parks"
                  checked={this.state.category === 'parks'}
                  onChange={this.handleInputChange}
                /> Park 
              </label>
              <br></br>
              

             
              <label>
                <input
                  type="radio"
                  name="category"
                  value="water"
                  checked={this.state.category === 'water'}
                  onChange={this.handleInputChange}
                /> Water
              </label>
            

              <li>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="large"
                    checked={this.state.category === 'large'}
                    onChange={this.handleInputChange}
                  />
                  Large
                </label>
              </li>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={this.handleSubmit}
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
