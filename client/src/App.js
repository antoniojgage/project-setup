import React, { Component } from 'react';
import Header from './components/Header/Header';
import Map from './components/Map';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';

export class App extends Component {
  state = {
    locations: [],
    selection: '',
  };

  componentDidMount = () => {
    var that = this;
    var request = require('request');

    var options = {
      method: 'GET',

      url: `${process.env.URL}/api/location/locations`,
      headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'accept-encoding': 'gzip, deflate',

        Host: `${process.env.URL}`,
        'Postman-Token':
          '4b5beafa-b5bc-4793-a566-b92fd9c80b3f,746e29c4-8563-4b1a-85cf-1be2f664c198',
        'Cache-Control': 'no-cache',

        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.13.0',
      },
    };

    request(options, function(error, response, body) {
      if (error) {
        throw new Error(error);
      }
      // console.log(body);

      // SEE HERE - I AM SETTING THE STATE OF THE COMPONENT
      that.setState({ locations: body });
    });
  };

  searchByTag = tag => {
    var that = this;
    var request = require('request');

    var options = {
      method: 'POST',

      url: `${process.env.URL}/api/location/tags`,
      headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '45',
        'accept-encoding': 'gzip, deflate',
        Host: `${process.env.URL}`,
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

  render() {
    // SEE HERE - I AM GIVING THE STATE FOR THESE COMPONENTS TO NOW USE
    return (
      <div>
        <Header />
        <Map locations={this.state.locations} />
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
