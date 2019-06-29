import React, { Component } from 'react';
import Header from './components/Header/Header';
import Map from './components/Map';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
const axios = require('axios');
export class App extends Component {
  state = {
    locations: [],
    selection: '',
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
    console.log('map was clicked at', latitude, longitude);

    let getData = await axios
      .post(`/api/location/locations`, {
        latitude: latitude,
        longitude: longitude,
      })
      .then(response => response.data)
      .catch(error => console.log(error));

    console.log(getData, ' = singleRecord');
    this.setState({
      locations: [...this.state.locations, getData],
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Map
          locations={this.state.locations}
          onMapClicked={this.onMapClicked}
        />
        <Search
          onSearchSelection={this.onSearchSelection}
          locations={this.state.locations}
        />
        <Footer />
      </div>
    );
  }
}
export default App;
