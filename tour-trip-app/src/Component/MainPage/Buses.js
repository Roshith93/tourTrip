import React, { Component } from 'react'
import { BusCityName } from '../../IATACodes/BusCityName';
import AutoComplete from 'material-ui/AutoComplete';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import BusData from '../../Services/BusData'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const Stations = [];
const minDate1 = new Date();

var Bus = Object.keys(BusCityName).map(function (key) {
  return (
    Stations.push(BusCityName[key])
  )
});
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
class Buses extends Component {
  state = {
    sourceIndex: null,
    minDate: minDate1,
    open: false,
    load: false,
  }
  style = {
    marginLeft: '30px',
    marginRight: '30px'
  }
  userData = {
    deptDate: null,
    source: null,
    destination: null,
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeSource = (e) => {
    this.userData.source = e.toLowerCase();
    this.setState({load : false});
  }

  handleChangeDestination = (e) => {
    this.userData.destination = e.toLowerCase();
    this.setState({load : false});
  }

  date = (event, date) => {
    this.userData.deptDate = moment(date).format('YYYYMMDD');
    this.setState({load : false});
  }

  submit = () => {
    if (this.userData.source === null || this.userData.destination === null || this.userData.deptDate === null) {
      this.setState({ open: true })
    }
    else {
      this.setState({ load: true })
    }
  }
  render() {
    const { auth, classes } = this.props;
    console.log(this.props)
    if (!auth.uid) return <Redirect to='/signin' /> 
    const actions = [
      <FlatButton
        label="Discard"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className="container">
        <div className="card-panel">
        <h5 className="center">Search Buses</h5>
        <form className={classes.root} autoComplete="off">
          <AutoComplete
            floatingLabelText="Source"
            filter={AutoComplete.fuzzyFilter}
            dataSource={Stations}
            maxSearchResults={5}
            onNewRequest={this.handleChangeSource}
          />
          <AutoComplete
            style={this.style}
            floatingLabelText="Destination"
            filter={AutoComplete.fuzzyFilter}
            dataSource={Stations}
            maxSearchResults={5}
            onNewRequest={this.handleChangeDestination}
          />
          <DatePicker hintText="Departure Date"
            minDate={this.state.minDate}
            onChange={this.date}
            style={{marginTop: '24px'}}
            mode="landscape" />
            <br/>
            
             </form>
            <br/>
            <RaisedButton  label="Search Bus" primary={true} onClick={this.submit} />
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Please fill all the fields
          </Dialog>
          {this.state.load ? <BusData data={this.userData} /> : null}
         
        </div>
        </div>
    )
  }
}
Buses.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  console.log(state.firestore);
 return {
   projects: state.firestore,
   auth: state.firebase.auth
 }
}

export default connect(mapStateToProps)(withStyles(styles)(Buses));


