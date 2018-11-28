import React from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Navbar = (props) => {
  const { auth, profile } = props;
  console.log(auth);
  const links = auth.uid ? <SignIn profile={profile} /> : <SignUp />;
  return (
    <nav className="nav-wrapper grey darken-3">
      <Link to="/" className="brand-logo left">TourGuide</Link>
      <div className="container">
        {links}
      </div>
    </nav>
  )
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)