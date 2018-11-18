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
import { connect } from 'react-redux'
import { StateName } from '../../IATACodes/FlightData'
const adults = [];
const child = [];
const minDate1 = new Date();
const source = [
  <MenuItem value={'YYZ'} key={0}><em>Toronto</em></MenuItem>,
  <MenuItem value={'HND'} key={1}>Tokyo</MenuItem>,
  <MenuItem value={'WAS'} key={2}>Washington, D.C.</MenuItem>,
  <MenuItem value={'DXB'} key={3}>Dubai</MenuItem>,
  <MenuItem value={'DEL'} key={4}>Delhi</MenuItem>,
];
const destination = [
  <MenuItem value={'YYZ'} key={0}>Toronto</MenuItem>,
  <MenuItem value={'HND'} key={1}>Tokyo</MenuItem>,
  <MenuItem value={'WAS'} key={2}>Washington, D.C.</MenuItem>,
  <MenuItem value={'DXB'} key={3}>Dubai</MenuItem>,
  <MenuItem value={'DEL'} key={4}>Delhi</MenuItem>,
];
// const destination=[];
// destination.push(StateName.map((data, i) => {
//   return(
//   <MenuItem value={data} key={i}><em>{data}</em></MenuItem>)
// }))
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
    source: '',
    dest: '',
    adult: '',
    child: '',
    deptDate: '',
  };
  style = {
    marginRight: '25px',
  }

  date = (event, date) => {
    this.setState({ deptDate: moment(date).format('YYYYMMDD') });
  }

  submit = () => {
    if (this.state.source === null || this.state.dest === null || this.state.adult === null ||
      this.state.child === null || this.state.deptDate === null || this.state.source === this.state.dest) {
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
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="Adults-required">Adults</InputLabel>
            <Select
              value={this.state.adult}
              onChange={this.handleChange}
              name="adult"
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
        </form>
        <br /><br />
        <DatePicker hintText="Departure Date"
          minDate={this.state.minDate}
          onChange={this.date}
          mode="landscape" />
        <br /><br />
        <RaisedButton label="Search Flight" primary={true} onClick={this.submit} />

        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Please fill all the fields correctlly
       </Dialog>
        {this.state.load ? <ComponentData data={this.state} /> : null}

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
