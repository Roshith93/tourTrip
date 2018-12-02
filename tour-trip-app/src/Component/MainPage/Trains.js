import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import TrainData from './../../Services/TrainData'
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const minDate1 = new Date();
const source = [
  <MenuItem value={'AI'} key={0}><em>Adipur</em></MenuItem>,
  <MenuItem value={'ANDI'} key={1}>Delhi</MenuItem>,
  <MenuItem value={'AGA'} key={2}>Agra</MenuItem>,
  <MenuItem value={'PTA'} key={3}>Patiala</MenuItem>,
];
const destination = [
  <MenuItem value={'AI'} key={0}><em>Adipur</em></MenuItem>,
  <MenuItem value={'ANDI'} key={1}>Delhi</MenuItem>,
  <MenuItem value={'AGA'} key={2}>Agra</MenuItem>,
  <MenuItem value={'PTA'} key={3}>Patiala</MenuItem>,
];

const trainClass = [
  <MenuItem value={'1A'} key={0}><em>First class Air-Conditioned </em></MenuItem>,
  <MenuItem value={'2A'} key={1}><em>AC 2-tier sleeper </em></MenuItem>,
  <MenuItem value={'FC'} key={2}><em>First class  </em></MenuItem>,
  <MenuItem value={'3A'} key={3}><em>AC 3 Tier </em></MenuItem>,
  <MenuItem value={'3E'} key={4}><em>AC 3 Tier Economy </em></MenuItem>,
  <MenuItem value={'CC'} key={5}><em>AC chair Car </em></MenuItem>,
  <MenuItem value={'SL'} key={6}><em>Sleeper Class </em></MenuItem>,
  <MenuItem value={'2S'} key={7}><em>Second Sitting </em></MenuItem>
];

const quota = [
  <MenuItem value={'GN'} key={0}><em>General Quota</em></MenuItem>,
  <MenuItem value={'LN'} key={1}><em>Ladies Quota</em></MenuItem>,
  <MenuItem value={'DF'} key={2}><em>Defence Quota</em></MenuItem>,
  <MenuItem value={'PH'} key={3}><em>Parliament house Quota</em></MenuItem>,
  <MenuItem value={'FT'} key={4}><em>Foreign Tourist Quota</em></MenuItem>,
  <MenuItem value={'DP'} key={5}><em>Duty Pass Quota</em></MenuItem>,
  <MenuItem value={'tq'} key={6}><em>Tatkal Quota</em></MenuItem>,
  <MenuItem value={'PT'} key={7}><em>Premium Tatkal Quota</em></MenuItem>,
  <MenuItem value={'GNRS'} key={8}><em>General Quota Road Side</em></MenuItem>,
  <MenuItem value={'Rc'} key={9}><em>Reservation Against Cancellation</em></MenuItem>,
  <MenuItem value={'LB'} key={10}><em>Lower Berth</em></MenuItem>,

];
let age = [];
for(let i = 0; i < 90; i++)
age.push(<MenuItem value={i} key={i}><em>{i}</em></MenuItem>,);
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

class Trains extends Component {
  state = {
    open: false,
    minDate: minDate1,
    showResults: false,
    flightData: [],
    load: false,
    source: '',
    dest: '',
    class: '',
    quota: '',
    age: '',
    deptDate: null,
  };
  style = {
    marginRight: '25px',
  }

  date = (event, date) => {
    this.setState({ load: false })
    this.setState({ deptDate: moment(date).format('DD-MM-YYYY') });
  }

  submit = () => {
    console.log(this.state);
    if (this.state.source === '' || this.state.dest === '' 
      || this.state.deptDate === null || this.state.source === this.state.dest) {
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
    this.setState({ load: false })
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
        <h5 className="center">Search Trains</h5>
        <form className={classes.root} autoComplete="off">
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="source-required">Source</InputLabel>
            <Select
              value={this.state.source}
              onChange={this.handleChange}
              name="source"
              inputProps={{
                id: 'source-required',
              }}
              className={classes.selectEmpty}
            >
              {source}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="destination-required">Destination</InputLabel>
            <Select
              value={this.state.dest}
              onChange={this.handleChange}
              name="dest"
              inputProps={{
                id: 'destination-required',
              }}
              className={classes.selectEmpty}
            >
              {destination}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <DatePicker hintText="Departure Date"
          minDate={this.state.minDate}
          onChange={this.date}
          style={{marginTop:'15px'}}
          mode="landscape" />
        </form>
        <RaisedButton label="Search Trains" primary={true} onClick={this.submit} /> 
        {this.state.load ? <TrainData data={this.state} /> : null}
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

    )
  }
}

Trains.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state.firestore);
  return {
    projects: state.firestore,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Trains));