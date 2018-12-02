import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { signIn } from '../../reducers/actions/authActions'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const styles = theme => ({
    root: {
        alignitem: 'center',
        display: 'flex',

    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
        align: 'center',
        display: 'flex',
        margin: 'auto'
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class SignIn extends Component {
    state = {
        open: false,
        email: null,
        password: null,
        loading: false,
        success: false,
    }
    style = {
        maxWidth: '500px',
        margin: 'auto',
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    changeLoad = () => {
        const { authError } = this.props;
        if (authError !== null) {
            this.setState({ loading: false });
        }
    }
    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState({
                success: false,
                loading: true,
            });
        }
    };
    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.state);
        if (this.state.firstName === null || this.state.lastName === null || this.state.email === null ||
            this.state.password === null) {
            this.handleClickOpen();
        }
        else {
            this.setState({
                success: false,
                loading: true,
            });
            this.props.signIn(this.state);
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false, open1: false });
    };
    render() {
        const { authError, auth } = this.props;
        const { loading, success } = this.state;
        const { classes } = this.props;
        const { fullScreen } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="container">
                <div className="card-panel">
                    <div className="card-panel hoverable center" onMouseOver={this.changeLoad}>
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
                        <div calssName={classes.root}>
                            <div className={classes.wrapper}>
                                <Button
                                    style={{ align: 'center', display: 'flex', margin: 'auto' }}
                                    variant="contained"
                                    color="primary"
                                    className={buttonClassname}
                                    disabled={loading}
                                    onClick={this.submit}
                                >
                                    Sign In
                            </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </div>
                       
                        <br /><br />
                        {authError !== null ? <p>{authError}</p> : <p></p>}
                    </div>
                </div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">User SignIn Error!!!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill all the feilds correctly.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
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
SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispachToProps)(withStyles(styles)(SignIn)) 