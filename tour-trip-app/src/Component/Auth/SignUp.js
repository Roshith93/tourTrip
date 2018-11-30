import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../reducers/actions/authActions';
import dummy from '../../images/dummy.png'
import Avatar from '@material-ui/core/Avatar';


class SignUp extends Component {


    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        URL: null,
    }
    style = {
        maxWidth: '500px',
        margin: 'auto',
    }
    styles = {
        margin: 10,
        width: 80,
        height: 80,
        align: 'center',
        display: 'flex',
        margin:'auto'
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signUp(this.state);
    }
    handle = (e) => {
        console.log(e.target.files[0]);
        this.setState({ URL: e.target.files[0] });
        console.log(this.state.URL);
    }
    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="container">
                <div className=" card-panel">
                    <div className="card-panel hoverable center">
                        <Avatar className="center" style={this.styles} alt="Remy Sharp" src={this.state.URL === null ? dummy : URL.createObjectURL(this.state.URL)} />
                            <br/>
                            <input type="file" onChange={this.handle} />
                            <br/>
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
                        {authError !== null ? <p>{authError}</p> : <p></p>}
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