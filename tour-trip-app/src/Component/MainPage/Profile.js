import React, { Component } from 'react'
import dummy from '../../images/dummy.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from '../../reducers/actions/authActions';
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
class Profile extends Component {
    state = {
        uid: null,
        URL: null,
        image: null,
        loading: false,
        success: false,
        open: false,
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
    handle = (e) => {
        console.log(e.target.files[0]);
        const { auth } = this.props;
        this.setState({ success: false })
        this.state.uid = auth.auth.uid
        if (e.target.files[0]) {
            this.state.image = e.target.files[0];
        }
    }
    handleUpload = () => {
        const { image } = this.state;
        if(image !== null) {
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
                    this.state.URL = url;
                    this.props.update(this.state);
                    this.setState({
                        success: true,
                        loading: false,
                    });
                })
            });
        }
        else{
            this.setState({ open: true });
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        const { fullScreen } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });
        const { loading, success} = this.state;
        const { auth, profile } = this.props;
        console.log(auth.auth);
        console.log(auth.profile);
        this.state.URL = auth.profile.image === null ? dummy : auth.profile.image;
        if (!auth.auth.uid) return (<Redirect to='/signin' />)
        return (
            <div className="container">
                <div className="card ">
                    <div className="card-panel">
                        <h4 className="center">User Profile</h4>
                        <div className="card horizontal">
                            <div className="card-image center hoverable" style={{ width: '300px', height: '300px', margin: '50px' }}>
                                <img src={this.state.URL} style={{ width: '250px', height: '200px' }} />
                                <input type="file" onChange={this.handle} />
                                <div className={classes.root}>
                                    <div className={classes.wrapper}>
                                        <Fab color="primary" className={buttonClassname} onClick={this.handleUpload}>
                                            {success ? <CheckIcon /> : <SaveIcon />}
                                        </Fab>
                                        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                                    </div>
                                </div>
                            </div>
                            <div className="card-content hoverable container">
                                <pre>User Id                :       {auth.auth.uid}</pre>
                                <pre>User First Name        :       {auth.profile.firstName}</pre>
                                <pre>User Last Name         :       {auth.profile.lastName}</pre>
                                <pre>User Email Id          :       {auth.auth.email}</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Upload Failed!!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please select any image to upload
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
        auth: state.firebase,
        profile: state.firestore,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        update: (data) => dispatch(update(data)),
    }
}
Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile)) 