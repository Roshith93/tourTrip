import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from'../../reducers/actions/authActions'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SignIn extends Component {
    state = {
        anchorEl: null,
        profile: null,
        account: null
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleProfile = () => {
        this.setState({ anchorEl: null });
        
      };
      handleAccount = () => {
        this.setState({ anchorEl: null });
      };
    render() {
        const { anchorEl } = this.state;
        return (
                <ul>
                    <li><Link to="/flight">Flights</Link></li>
                    <li><Link to="/train">Trains</Link></li>
                    <li><Link to="/hotel">Hotels</Link></li>
                    <li><Link to="/bus">Buses</Link></li>
                    <li className="right">
                        <button  aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick} 
                            className="btn btn-floating pink lighten-1">
                            { this.props.profile.initials }</button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                                >
                                <MenuItem onClick={this.handleAccount}><Link to="/profile">Profile</Link></MenuItem>
                                <MenuItem onClick={this.handleAccount}>My account</MenuItem>
                                <MenuItem onClick={ this.props.signOut  }>Logout</MenuItem>
                            </Menu>    
                    </li>
                </ul>


        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
  }

export default connect(null,mapDispatchToProps)(SignIn)