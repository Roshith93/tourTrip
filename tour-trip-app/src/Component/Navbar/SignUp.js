import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
    return (
        <ul className="right">
            <li><Link to='/'>Logout</Link></li>
            <li><Link to='/' className="btn btn-floating pink lighten-1">NN</Link></li>
        </ul>
    )
}

export default SignUp;