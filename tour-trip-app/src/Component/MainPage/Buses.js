import React, { Component } from 'react'
import { BusCityName } from '../../IATACodes/BusCityName';
import AutoComplete from 'material-ui/AutoComplete';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import BusData from '../../Services/BusData'
const Stations = [];
const minDate1 = new Date();

var Bus = Object.keys(BusCityName).map(function (key) {
  return (
    Stations.push(BusCityName[key])
  )
});
class Buses extends Component {
  state = {
    sourceIndex: null,
    minDate: minDate1,
    open: false,
    load: false,
  }
  style = {
    margin: '30px'
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
  }

  handleChangeDestination = (e) => {
    this.userData.destination = e.toLowerCase();
  }

  date = (event, date) => {
    this.userData.deptDate = moment(date).format('YYYYMMDD');
  }

  submit = () => {
    if (this.userData.source === null || this.userData.destination === null || this.userData.deptDate === null) {
      console.log(this.userData)
      this.setState({ open: true })
    }
    else {
      this.setState({ load: true })
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Discard"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
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
          mode="landscape" />
        <RaisedButton label="Search Bus" primary={true} onClick={this.submit} />
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
    )
  }
}

export default Buses


