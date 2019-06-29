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
      .then(response => response)
      .catch(error => console.log(error));
    this.setState({ locations: getData.data });
  }

  searchByTag = async tag => {
    let getData = await axios
      .get(`${process.env.REACT_APP_URL}/api/location/tags`, {
        body: tag,
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log('get data = ', getData);

    this.setState({ locations: getData });
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
