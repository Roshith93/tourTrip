import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Hotels from '../Mainpage/Hotels';
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn,
// } from 'material-ui/Table';

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
const flights = [];
const minDate1 = new Date();
const app_id = "c66591e4";
const api_key = "89d9830bfee0cb120f65ef19e5ed1fce";
const base_url = "https://developer.goibibo.com";
const flightData=" ";
for (let i = 0; i < 50; i++ ) {
  adults.push(<MenuItem value={i} key={i} primaryText={i} />);
  child.push(<MenuItem value={i} key={i} primaryText={i} />);
}
class Flights extends Component {
  state = {
     valuee: null,
     value:null,
     adult: null,
     child:null,
     open: false,
     selected: [-1],
     minDate:minDate1,
     showResults: false,
   };
   style = {
     marginRight : '25px',
   }
   tableHide = {
     display : 'none',
   }
   userData = {
     source:null,
     dest:null,
     adult:null,
     child:null,
     deptDate:null
   }

   isSelected = (index) => {
   return this.state.selected.indexOf(index) !== -1;
   };

   handleRowSelection = (selectedRows) => {
     this.setState({
     selected: selectedRows,
    });
  };
   handleChangeForSource = (event, index, value) => {
     this.setState({value : value});
     this.userData.source = event.target.innerHTML;
   }
    handleChangeForDest = (event, index, value) =>{
     this.userData.dest = event.target.innerHTML;
     this.setState({valuee : value});
   }
    fillAdults = (event, index, value) => {
     this.userData.adult = event.target.innerHTML;
     this.setState({adult : value});
    };
    fillChilderens = (event, index, value) => {
      this.userData.child = event.target.innerHTML;
      this.setState({child : value});
    };
    date = (event, date) => {
      this.userData.deptDate = moment(date).format('YYYYMMDD');
    }

    fetchFun(){
        this.tableHide.display = 'block';
        console.log(this.tableHide.display);
      var api_search = base_url + '/api/search/?app_id=' + app_id + '&app_key=' + api_key;
      let url = api_search + '&source=' + this.userData.source + '&destination=' + this.userData.dest +
      '&dateofdeparture=' + this.userData.deptDate + '&adults=' + this.userData.adult + '&children=' + this.userData.child + '&counter=100'
      axios.get(url)
      .then(response => {
        for(let i = 0; i < 12; i++)
        {
          flights[i] = response.data.data.onwardflights[i];

        }
        flights.map((data, i) => console.log(i));
        this.flightData= "ABc";
        console.log(this.flightData);
        this.setState({showResults: true});
      })
    }
    submit = () => {
      if(this.userData.source === null || this.userData.dest === null || this.userData.adult === null||
         this.userData.child === null || this.userData.deptDate === null){
        this.setState({open: true});
      }
      else{
        this.fetchFun();
      }

    }
    handleClose = () => {
    this.setState({open: false});
    };

    moment = (d) => {
      console.log(d);
    }
   render() {
     const {value} = this.state;
     const {valuee} = this.state;
     const {adult} = this.state;
     const {child} = this.state;
     const night = value === valuee && value !== null;
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
           value={value}
           hintText="From"
           style={this.style}
           onChange={this.handleChangeForSource}
           >
           {items}
         </SelectField>
         <SelectField
           floatingLabelText="Destination"
           hintText="To"
           value={valuee}
           style={this.style}
           onChange={this.handleChangeForDest}
           errorText={night && 'Source and destination should be different'}
           errorStyle={{color: 'orange'}}
         >
           {items1}
         </SelectField>
         <SelectField
            floatingLabelText="Adults"
            value={adult}
            hintText="2"
            style={this.style}
            onChange={this.fillAdults}
            maxHeight={200}
          >
            {adults}
        </SelectField>
        <SelectField
           floatingLabelText="Childerns"
           value={child}
           hintText="1"
           style={this.style}
           onChange={this.fillChilderens}
           maxHeight={200}
         >
           {adults}
       </SelectField>
       <DatePicker hintText="Departure Date"
       minDate={this.state.minDate}
       onChange={this.date}
       mode="landscape" />
       <RaisedButton label="Search Flight" primary={true} onClick={this.submit}/>

       <Dialog
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}
       >
         Please fill all the fields
       </Dialog>
       { this.state.showResults ? <Hotels data={flightData}/> : null }


</div>
     //   <Table  onRowSelection={this.handleRowSelection}>
     //   <TableHeader>
     //     <TableRow>
     //       <TableHeaderColumn>ID</TableHeaderColumn>
     //       <TableHeaderColumn>Name</TableHeaderColumn>
     //       <TableHeaderColumn>Status</TableHeaderColumn>
     //     </TableRow>
     //   </TableHeader>
     //   <TableBody>
     //     {
     //       flights.map((data, i) =>
     //       <TableRow selected={this.isSelected(i)}>
     //       <TableRowColumn>{data.airline}</TableRowColumn>
     //       <TableRowColumn>{data.airline}</TableRowColumn>
     //       <TableRowColumn>{data.airline}</TableRowColumn>
     //       </TableRow>
     //      )
     //     }
     //   </TableBody>
     // </Table>



     );
   }
}

export default Flights
