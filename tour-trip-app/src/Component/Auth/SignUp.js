import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
class SignUp extends Component {
    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null
    }
    style = {
        maxWidth: '500px',
        margin:'auto', 
    }
    handleChange = (e) => {
        this.setState({ [e.target.id ]: e.target.value });
    }
    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
    return (
        <div style={this.style}>
            <TextField
                hintText="John"
                floatingLabelText="First Name"
                onChange={this.handleChange}
                id="firstName"
            /><br />
            <TextField
                hintText="Joe"
                floatingLabelText="Last Name"
                onChange={this.handleChange}
                id="lastName"
            /><br />
            <TextField
                hintText="johnjoe@abc.com"
                floatingLabelText="Email"
                onChange={this.handleChange}
                id="email"
            /><br />
            <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                onChange={this.handleChange}
                id="password"
            /><br />

            <RaisedButton label="Submit" primary={true} onClick={this.submit} />
            
        </div>
    )
    }
}

export default SignUp 