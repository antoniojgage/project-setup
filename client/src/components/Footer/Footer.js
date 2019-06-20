import React from "react";
import "./Footer.css";
// import Card from "react-bootstrap/Card";
import Nav from 'react-bootstrap/Nav';


function Footer() {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          LAMA
        </Nav.Link>
      </Nav.Item>
    </Nav>
  //   <Card className="text-center" id="footer">
  //     <Card.Header>LAMA APPLICATIONS INC</Card.Header>
  //     {/* <Card.Body>
  //   <Card.Title>footer</Card.Title>
  //   <Card.Text>
      
  //   </Card.Text>
  // </Card.Body> */}
  //   </Card>
  );
}

export default Footer;
