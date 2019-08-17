import React, { Component } from 'react';
import Header from './components/Header/Header';
import Map from './components/Map';
// import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import CategoryBtn from './components/CategoryBtn/Category';
const axios = require('axios');
export class App extends Component {
  state = {
    locations: [],
    selection: '',
    filter: ""

  };

  async componentDidMount() {
    let getData = await axios
      .get(`/api/location/locations`)
      .then(response => response)
      .catch(error => console.log(error));
    this.setState({ locations: getData.data });
  }

  searchByTag = async tag => {
    let getData = await axios
      .get(`/api/location/tags`, {
        body: tag,
      })
      .then(response => response)
      .catch(error => console.log(error));
    console.log('get data = ', getData);

    this.setState({ locations: getData });
  };

  onSearchSelection = val => {
    this.setState({
      selection: val,
    });

    this.searchByTag(val);
  };

  onMapClicked = async event => {
    let latitude = event.latLng.lat();
    let longitude = event.latLng.lng();

    let getData = await axios
      .post(`/api/location/locations`, {
        latitude: latitude,
        longitude: longitude,
      })
      .then(response => response.data)
      .catch(error => console.log(error));

    this.setState({
      locations: [...this.state.locations, getData],
    });
    return {
      latitude,
      longitude,
      getData,
    };
  };

  handleShow = marker => {
    this.setState({ show: true, activeMarker: marker });
  };

  onMarkerClick = async event => {
    let latitude = event.latLng.lat();
    let longitude = event.latLng.lng();

    let getData = await axios
      .get(`/api/location/locations/${latitude}/${longitude}`)
      .then(response => response.data)
      .catch(error => console.log(error));
    console.log(`/api/location/locations/${latitude}/${longitude}`);
    this.setState({ latitude, longitude });
    this.setState({ activeMarker: getData });
    console.log(getData);

    this.handleShow(getData);
    return {
      latitude,
      longitude,
      getData,
    };
  };

  getSelectedCategory = category => {
    console.log(category);
    this.setState({ filter: category });
  };

  render() {
    return (
      <div>
        <Header />
        <Map
          locations={this.state.locations}
          onMapClicked={this.onMapClicked}
          onMarkerClick={this.onMarkerClick}
          filter={this.state.filter}
        />
        <CategoryBtn getSelectedCategory={this.getSelectedCategory} />
        {/* <Search
          onSearchSelection={this.onSearchSelection}
          locations={this.state.locations}
        /> */}
        <Modal />

        <Footer />
      </div>
    );
  }
}
export default App;
