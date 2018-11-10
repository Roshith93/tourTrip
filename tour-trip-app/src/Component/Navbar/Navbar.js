import React, { Component } from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth } = props;
  console.log(auth);
  return (
    <nav className="nav-wrapper grey darken-3">
      <SignIn />
      <SignUp />
    </nav>
  )
}


const mapStateToProps = (state) => {
 // console.log(state);
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar)