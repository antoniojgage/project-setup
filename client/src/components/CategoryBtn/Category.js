import React, { Component } from 'react';
import './Category.css';
import Button from 'react-bootstrap/Button';

export class Category extends Component {
  onCategory = value => {
    // console.log(value);
    // getSelectedCategory() is located in App.js
    this.props.getSelectedCategory(value);
  };

  render() {
    return (
      <div>
        <Button
          as="input"
          type="button"
          value="Parks"
          onClick={ () => this.onCategory('parks')}
        />
        <Button
          as="input"
          type="submit"
          value="Water"
          onClick={ () => this.onCategory('water')}
        />
        <Button
          as="input"
          type="reset"
          value="Reset"
          onClick={ () => this.onCategory('reset')}
        />
      </div>
    );
  }
}

export default Category;
