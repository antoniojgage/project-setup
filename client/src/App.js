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
      .get(`${process.env.REACT_APP_URL}/api/location/locations`)
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ locations: getData });
  }

  searchByTag = tag => {
    var that = this;
    var request = require('request');

    var options = {
      method: 'POST',
      url: `${process.env.REACT_APP_URL}/api/location/tags`,
      headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '45',
        'accept-encoding': 'gzip, deflate',
        Host: `${process.env.REACT_APP_URL}`,
        'Postman-Token':
          '30b42cd3-c9fa-4608-84f1-9172d36f289a,44a0bfed-13a2-44f9-a048-ea33f8ea7284',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.13.0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        tag: tag,
      },
    };

    request(options, function(error, response, body) {
      if (error) {
        throw new Error(error);
      }
      console.log('hey');

      that.setState({ locations: body });
    });
  };

  onSearchSelection = val => {
    this.setState({
      selection: val,
    });

    this.searchByTag(val);
  };

  newMarker = () => {
    console.log('new marker called');
    this.setState({ newMarker: this.state.marker + 1 });
  };

  render() {
    // SEE HERE - I AM GIVING THE STATE FOR THESE COMPONENTS TO NOW USE
    return (
      <div>
        <Header />
        <Map
          locations={this.state.locations}
          newMarker={this.newMarker}
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
