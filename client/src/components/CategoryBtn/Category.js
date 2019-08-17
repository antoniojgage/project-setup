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
      <div className="buttons">
        <Button
          className="parks"
          as="input"
          type="submit"
          value="Parks"
          variant="success"
          onClick={ () => this.onCategory('parks')}
        />{" "}
        <Button
          className="water"
          as="input"
          type="submit"
          value="Water"
          variant="success"
          onClick={ () => this.onCategory('water')}
        />{" "}
        <Button
          className="hiketrail"
          as="input"
          type="submit"
          value="Hike and Trail"
          variant="success"
          onClick={ () => this.onCategory('hiketrail')}
        />
      </div>
    );
  }
}

export default Category;
