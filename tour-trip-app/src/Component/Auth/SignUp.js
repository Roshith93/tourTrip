import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../reducers/actions/authActions';
 
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
        this.props.signUp(this.state);
    }
    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' /> 
    return (
        <div className="container">
            <div className=" card-panel">
                <div className="card-panel hoverable center">
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

                    <RaisedButton label="Sign Up" primary={true} onClick={this.submit} />
                    { authError !== null ? <p>{ authError }</p>:<p></p>}
                </div>
            </div>
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispachToProps = dispach => {
    return {
        signUp: (creds) => dispach(signUp(creds))
    }
}
export default connect(mapStateToProps, mapDispachToProps)(SignUp) 