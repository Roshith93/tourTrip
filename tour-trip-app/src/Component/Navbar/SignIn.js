import React from 'react';
import { Link } from 'react-router-dom'

const SignIn = () => {
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
                <li><Link to='/'>Logout</Link></li>
                <li><Link to='/' className="btn btn-floating pink lighten-1">NN</Link></li>
            </ul>

        </div>

    )
}

export default SignIn