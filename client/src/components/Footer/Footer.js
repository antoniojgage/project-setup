import React from "react";
import './Footer.css'
import Card from 'react-bootstrap/Card'


function Footer() {
    return(
<Card className="text-center" id='footer'>
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
  </Card.Body>
  <Card.Footer className="text-muted">2 days ago</Card.Footer>
</Card>
    );
  }


  
  export default Footer
