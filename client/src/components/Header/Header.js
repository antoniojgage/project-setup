import React from "react";
import "./Header.css";
import Jumbotron from "react-bootstrap/Jumbotron";

function Header() {
  return (
    <Jumbotron fluid id="header">
      <h1 className="text-center"> Green</h1>
      <h4 className="text-center"> ATX </h4>

      <p className="text-center">
        Drop a pin or find a pin.
      </p>
    </Jumbotron>
  );
}

export default Header;
