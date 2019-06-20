import React from "react"
import './Header.css'
import Jumbotron from 'react-bootstrap/Jumbotron'


function Header() {
    return (
        <Jumbotron fluid id='header'>
        
          <h1 className="text-center" > WHERE </h1>
          <p className="text-center">
            Drop a Pin. Find a Pin. We All Win.
          </p>
      
      </Jumbotron>
    )
}

export default Header