import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { signIn } from '../../reducers/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    state = {

        email: null,
        password: null
    }
    style = {
        maxWidth: '500px',
        margin: 'auto',
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signIn(this.state);
    }
    render() {
        const { authError, auth } = this.props;
        console.log(authError)
        if (auth.uid) return <Redirect to='/' /> 
        return (
            <div style={this.style}>
                <TextField
                    hintText="johndoe@abc.com"
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

const mapStateToProps = (state) => {
    console.log(state);
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
const mapDispachToProps = (dispatch) => {

    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispachToProps)(SignIn)