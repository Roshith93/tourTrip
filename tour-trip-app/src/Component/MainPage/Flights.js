import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import ComponentData from './../../Services/ComponenetData'

const items = [
  <MenuItem key={1} value={1} label="Toronto" primaryText="YYZ" />,
  <MenuItem key={2} value={2} label="Tokyo" primaryText="HND" />,
  <MenuItem key={3} value={3} label="Washington, D.C." primaryText="WAS" />,
  <MenuItem key={4} value={4} label="Dubai" primaryText="DXB" />,
  <MenuItem key={5} value={5} label="Delhi" primaryText="DEL" />,
];
const items1 = [
  <MenuItem key={1} value={1} label="Toronto" primaryText="YYZ" />,
  <MenuItem key={2} value={2} label="Tokyo" primaryText="HND" />,
  <MenuItem key={3} value={3} label="Washington, D.C." primaryText="WAS" />,
  <MenuItem key={4} value={4} label="Dubai" primaryText="DXB" />,
  <MenuItem key={5} value={5} label="Delhi" primaryText="DEL" />,
];
const adults = [];
const child = [];
const minDate1 = new Date();

for (let i = 0; i < 50; i++) {
  adults.push(<MenuItem value={i} key={i} primaryText={i} />);
  child.push(<MenuItem value={i} key={i} primaryText={i} />);
}
class Flights extends Component {
  state = {
    sourceIndex: null,
    destIndex: 'asd',
    adultIndex: null,
    childIndex: null,
    open: false,
    selected: [-1],
    minDate: minDate1,
    showResults: false,
    flightData: [],
    load: false
  };
  style = {
    marginRight: '25px',
  }
  tableHide = {
    display: 'none',
  }
  userData = {
    source: null,
    dest: null,
    adult: null,
    child: null,
    deptDate: null,
    load: false
  }

  handleChangeForSource = (event, index, value) => {
    this.setState({ sourceIndex: value });
    this.userData.source = event.target.innerHTML;
  }
  handleChangeForDest = (event, index, value) => {
    this.userData.dest = event.target.innerHTML;
    this.setState({ destIndex: value });
  }
  fillAdults = (event, index, value) => {
    this.userData.adult = event.target.innerHTML;
    this.setState({ adultIndex: value });
  };
  fillChilderens = (event, index, value) => {
    this.userData.child = event.target.innerHTML;
    this.setState({ childIndex: value });
  };
  date = (event, date) => {
    this.userData.deptDate = moment(date).format('YYYYMMDD');
  }


  submit = () => {
    if (this.userData.source === null || this.userData.dest === null || this.userData.adult === null ||
      this.userData.child === null || this.userData.deptDate === null) {
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
  render() {
    const { sourceIndex } = this.state;
    const { destIndex } = this.state;
    const { adultIndex } = this.state;
    const { childIndex } = this.state;
    const night = sourceIndex === destIndex && sourceIndex !== null;
    const actions = [
      <FlatButton
        label="Discard"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
        <SelectField
          floatingLabelText="Source"
          value={sourceIndex}
          hintText="From"
          style={this.style}
          onChange={this.handleChangeForSource}
        >
          {items}
        </SelectField>
        <SelectField
          floatingLabelText="Destination"
          hintText="To"
          value={destIndex}
          style={this.style}
          onChange={this.handleChangeForDest}
          errorText={night && 'Source and destination should be different'}
          errorStyle={{ color: 'orange' }}
        >
          {items1}
        </SelectField>
        <SelectField
          floatingLabelText="Adults"
          value={adultIndex}
          hintText="2"
          style={this.style}
          onChange={this.fillAdults}
          maxHeight={200}
        >
          {adults}
        </SelectField>
        <SelectField
          floatingLabelText="Childerns"
          value={childIndex}
          hintText="1"
          style={this.style}
          onChange={this.fillChilderens}
          maxHeight={200}
        >
          {adults}
        </SelectField>
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
          Please fill all the fields
       </Dialog>
        {this.state.load ? <ComponentData data={this.userData} /> : null}
      </div>

    );
  }
}

export default Flights
