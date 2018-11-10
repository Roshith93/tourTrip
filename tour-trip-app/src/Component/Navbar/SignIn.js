import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from'../../reducers/actions/authActions'
const SignIn = (props) => {
    return (
        <div>
            <ul className="left">
                <li><Link to="/">TourTrip</Link></li>
                <li><Link to="/flight">Flights</Link></li>
                <li><Link to="/train">Trains</Link></li>
                <li><Link to="/hotel">Hotels</Link></li>
                <li><Link to="/bus">Buses</Link></li>
            </ul>
            <ul className="right">
                <li><a onClick={props.signOut}>Logout</a></li>
                <li><Link to='/' className="btn btn-floating pink lighten-1">NN</Link></li>
            </ul>

        </div>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
  }

export default connect(null, mapDispatchToProps)(SignIn)