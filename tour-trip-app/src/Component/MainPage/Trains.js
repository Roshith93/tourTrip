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
import Chip from '@material-ui/core/Chip';


const minDate1 = new Date();
const source = [
  <MenuItem value={'AI'} key={0}><em>Adipur</em></MenuItem>,
  <MenuItem value={'ANDI'} key={1}>Delhi</MenuItem>,
  <MenuItem value={'AGA'} key={2}>Agra</MenuItem>,
  <MenuItem value={'PTA'} key={3}>Patiala</MenuItem>,
  <MenuItem value={'DEL'} key={4}>Delhi</MenuItem>,
];
const destination = [
  <MenuItem value={'AI'} key={0}><em>Adipur</em></MenuItem>,
  <MenuItem value={'ANDI'} key={1}>Delhi</MenuItem>,
  <MenuItem value={'AGA'} key={2}>Agra</MenuItem>,
  <MenuItem value={'PTA'} key={3}>Patiala</MenuItem>,
  <MenuItem value={'DEL'} key={4}>Delhi</MenuItem>,
];
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
    if (this.state.source === '' || this.state.dest === '' || this.state.deptDate === null || this.state.source === this.state.dest) {
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
      <div>
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
          mode="landscape" />
        </form>
        <br /><br />
       
        <br /><br />
        <RaisedButton label="Search Flight" primary={true} onClick={this.submit} />
        <Chip label="M" variant="outlined" />
 

        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Please fill all the fields correctlly
       </Dialog>
        {this.state.load ? <TrainData data={this.state} /> : null}

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
