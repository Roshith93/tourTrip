import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import ComponentData from './../../Services/ComponenetData'
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { FlightStationName, code } from '../../IATACodes/FlightData';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux'

const adults = [];
const child = [];
const minDate1 = new Date();
const Stations = [];
var Bus = Object.keys(FlightStationName).map(function (key) {
  return (
    Stations.push(FlightStationName[key])
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
for (let i = 0; i < 20; i++) {
  adults.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
  child.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
}
class Flights extends Component {
  state = {
    open: false,
    minDate: minDate1,
    showResults: false,
    flightData: [],
    load: false,
    sourceIATA: '',
    destinationIATA: '',
    source: '',
    dest: '',
    adult: '',
    child: '',
    deptDate: null,
  };
  style = {
    marginRight: '25px',
  }
  handleChangeSource = (e) => {
    let sourceIATACode = code[Stations.indexOf(e)];
    let upper = e.toUpperCase();
    this.setState({ 
      sourceIATA: sourceIATACode,
      source: upper,
      load : false
    })
  }

  handleChangeDestination = (e) => {
    let destinationIATACode = code[Stations.indexOf(e)];
    let upper = e.toUpperCase();
    this.setState({ 
      destinationIATA: destinationIATACode,
      dest: upper,
      load : false
    })
  }
  date = (event, date) => {
    this.setState({ deptDate: moment(date).format('YYYYMMDD') });
  }

  submit = () => {
    if (this.state.source === '' || this.state.dest === '' || this.state.adult === '' ||
      this.state.child === '' || this.state.deptDate === null || this.state.source === this.state.dest) {
      this.setState({ open: true });
    }
    else {

      this.setState({ load: true })
    }
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  moment = (d) => {
    console.log(d);
  }
  handleChange = event => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { auth } = this.props;
    console.log(this.props)
    if (!auth.uid) return <Redirect to='/signin' />
    const { classes } = this.props;
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
        <h5 className="center">Search Flights</h5>
        <form className={classes.root} autoComplete="off">
        <FormControl required className={classes.formControl}>
          <AutoComplete
            floatingLabelText="Source*"
            filter={AutoComplete.fuzzyFilter}
            dataSource={Stations}
            maxSearchResults={5}
            onNewRequest={this.handleChangeSource}
          />
           <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
          <AutoComplete
            style={this.style}
            floatingLabelText="Destination*"
            filter={AutoComplete.fuzzyFilter}
            dataSource={Stations}
            maxSearchResults={5}
            onNewRequest={this.handleChangeDestination}
          />
           <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="Adults-required">Adults</InputLabel>
            <Select
              value={this.state.adult}
              onChange={this.handleChange}
              name="adult"
              style={{marginTop:'30px'}}
              inputProps={{
                id: 'adult-required',
              }}
              className={classes.selectEmpty}
            >
              {adults}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="Children-required">Childrens</InputLabel>
            <Select
              value={this.state.child}
              onChange={this.handleChange}
              name="child"
              inputProps={{
                id: 'children-required',
              }}
              className={classes.selectEmpty}
            >
              {child}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <DatePicker hintText="Departure Date"
          minDate={this.state.minDate}
          style={{marginTop:'15px'}}
          onChange={this.date}
          mode="landscape" />
          <br/>
          
        </form>
        <RaisedButton label="Search Flight" primary={true} onClick={this.submit} />
        {this.state.load ? <ComponentData data={this.state} /> : null}
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Please fill all the fields correctlly
       </Dialog>
       
      </div>

    );
  }
}

Flights.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state.firestore);
  return {
    projects: state.firestore,
    auth: state.firebase.auth
  }
}


export default connect(mapStateToProps)(withStyles(styles)(Flights));
