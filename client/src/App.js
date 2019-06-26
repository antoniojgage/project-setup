import React, { Component } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";


export class App extends Component {
  state = {
    locations: []
  };

  componentDidMount = () => {
    var that = this;
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
      if (error) {
        throw new Error(error);
      }
      console.log(body);

      // SEE HERE - I AM SETTING THE STATE OF THE COMPONENT
      that.setState({ locations: body });
    });
  }

  render(){
    // SEE HERE - I AM GIVING THE STATE FOR THESE COMPONENTS TO NOW USE
    return (
      <div>
        <Header />
        <Map locations={this.state.locations} />
        <Search locations={this.state.locations} />
        <Footer />
      </div>
    );
  }  
}
export default App;
