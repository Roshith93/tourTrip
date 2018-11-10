import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
    return (
        <ul className="right">
             <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/signin">SignIn</Link></li>
        </ul>
    )
}

export default SignUp;