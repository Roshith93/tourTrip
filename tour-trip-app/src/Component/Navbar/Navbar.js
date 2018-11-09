import React, { Component } from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return(
      <nav className="nav-wrapper grey darken-3">
        <ul className="left">
          <li><Link to="/">TourTrip</Link></li>
          <li><Link to="/flight">Flights</Link></li>
          <li><Link to="/train">Trains</Link></li>
          <li><Link to="/hotel">Hotels</Link></li>
          <li><Link to="/bus">Buses</Link></li>
        </ul>
        <SignUp/>
        <SignIn />
      </nav>
    )
  }
}

export default Navbar
