import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from'../../reducers/actions/authActions'
const SignIn = (props) => {
    return (
            <ul>
                <li><Link to="/flight">Flights</Link></li>
                <li><Link to="/train">Trains</Link></li>
                <li><Link to="/hotel">Hotels</Link></li>
                <li><Link to="/bus">Buses</Link></li>
                <li className="right"><a onClick={props.signOut}>Logout</a></li>
                <li className="right"><Link to='/' className="btn btn-floating pink lighten-1">
                {props.profile.initials}</Link></li>
            </ul>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
  }

export default connect(null,mapDispatchToProps)(SignIn)