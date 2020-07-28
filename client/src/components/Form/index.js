import React, { Component } from 'react';
import './style.css';

class Form extends Component {
  // Setting the component's initial state
  state = {
    firstName: '',
    lastName: '',
  };

  callMyBackEnd = (event) => {
    var axios = require('axios');
    var data = JSON.stringify({
      routeName: 'bluemarvel',
      name: 'Blue Marvel',
      role: 'Just Awesome',
      age: 200,
      forcePoints: 1200,
    });

    var config = {
      method: 'get',
      url: '/api/burger/burgers',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({
          firstName: '',
          lastName: '',
          myData: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    // const { name, value } = event.target;
    const name = event.target.name;
    const value = event.target.value;
    // Updating the input's state
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    this.callMyBackEnd();
    // Commenting this out
    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    // alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
    // this.setState({
    //   firstName: '',
    //   lastName: '',
    // });
  };

  // Lifecycle methods
  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <p>
          Hello {this.state.firstName} {this.state.lastName}
        </p>
        Your Favorite Burger is:{' '}
        {this.state.myData ? this.state.myData[0].burger_name : null}
        <form className="form">
          <input
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="First Name"
          />
          <input
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Last Name"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
