import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../reducers/actions/authActions';
import dummy from '../../images/dummy.png'
import Avatar from '@material-ui/core/Avatar';
import { storage } from '../../config/fbConfig'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
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

class SignUp extends Component {
    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        URL: null,
        image: null,
        loading: false,
        success: false,
        loading1: false,
        success1: false,
        open: false,
        open1: false,
    }
    style = {
        maxWidth: '500px',
        margin: 'auto',
    }
    styles = {
        margin: 10,
        width: 100,
        height: 100,
        align: 'center',
        display: 'flex',
        margin: 'auto'
    }
    changeLoad = () => {
        const { authError } = this.props;
        if(authError !== null)
        this.setState({ loading1: false });
    }
    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState({
                success: false,
                loading: true,
            });
        }
    };
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if (this.state.firstName === null || this.state.lastName === null || this.state.email === null ||
            this.state.password === null) {
            this.handleClickOpen();
        }
        else {
            this.setState({
                success1: false,
                loading1: true,
            });
            this.props.signUp(this.state);
        }
    }
    handle = (e) => {
        this.setState({ image: e.target.files[0] });
        this.setState({ success: false })
        console.log(this.state);
    }
    handleClick = () => {
        const { image } = this.state;
        if(image !== null){
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                this.setState({
                    success: false,
                    loading: true,
                });
            }
            , (error => {
                console.log(error)
            }), () => {

                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ URL: url });
                    this.setState({
                        success: true,
                        loading: false,
                    });
                })
            });
        }
        else{
            this.setState({ open1: true });   
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
        const { loading, success, loading1, success1 } = this.state;
        const { classes } = this.props;
        const { fullScreen } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });
        console.log(authError);
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="container">
                <div className=" card-panel">
                    <div className="card-panel hoverable center" onMouseOver={this.changeLoad}>
                        <Avatar className="center" style={this.styles} alt="Remy Sharp" src={this.state.URL === null ? dummy : this.state.URL} />
                        <br />
                        <input type="file" onChange={this.handle} style={{ width: '60' }} />
                        <div className={classes.root}>
                            <div className={classes.wrapper}>
                                <Fab color="primary" className={buttonClassname} onClick={this.handleClick}>
                                    {success ? <CheckIcon /> : <SaveIcon />}
                                </Fab>
                                {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                            </div>
                        </div>
                        <br />
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
                        <div calssName={classes.root}>
                            <div className={classes.wrapper}>
                                <Button
                                    style={{ align: 'center', display: 'flex', margin: 'auto' }}
                                    variant="contained"
                                    color="primary"
                                    className={buttonClassname}
                                    disabled={loading1}
                                    onClick={this.submit}
                                >
                                    Sign Up
                            </Button>
                                {loading1 && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </div>
                        {authError !== null ? <p>{authError}</p> : <p></p>}
                    </div>
                </div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">User SignUp Error!!!</DialogTitle>
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
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open1}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Upload Faild!!!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please select any image!!!
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

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispachToProps)(withStyles(styles)(SignUp)) 