import React, { Component } from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return(
      <nav className="nav-wrapper grey darken-3">
        <SignIn />
        <SignUp/>
      </nav>
    )
  }
}

export default Navbar
