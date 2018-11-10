import React, { Component } from 'react'
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { connect } from 'react-redux'
import { userBusData } from '../reducers/actions/projectAction'

const app_id = "c66591e4";
const api_key = "89d9830bfee0cb120f65ef19e5ed1fce";
const base_url = "https://developer.goibibo.com/";

const Busses = [];

class BusData extends Component {
    state = {
        loaded: false,
        selected: [-1],
        open: false,
        saved: -1
    }

    userData = {
        source: null,
        destination: null,
        travelsName: null,
        arrivalTime: null,
        departureTime: null,
        duration: null,
        busType: null,
        totalBaseFare: null,
        rating: null
    }
    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        if (selectedRows[0] !== undefined) {
            this.setState({
                selected: selectedRows,
                saved: selectedRows[0]
            });
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {

        console.log(this.props);
        const { data } = this.props;
        var api_search = base_url + 'api/bus/search/?app_id=' + app_id + '&app_key=' + api_key;
        let url = api_search + '&format=json&source=' + data.source + '&destination=' + data.destination +
            '&dateofdeparture=' + data.deptDate;
        axios.get(url)
            .then(response => {
                for (let i = 0; i < 15; i++) {
                    Busses.push(response.data.data.onwardflights[i]);

                }
                if (Busses[0] === undefined) {
                    this.setState({ open: true });
                }
                else
                    this.setState({ loaded: true })
            })
    }

    saveBuss = (e) => {
        
        e.preventDefault();
        let data = Busses[this.state.saved];
        this.userData.source = this.props.data.source;
        this.userData.destination = this.props.data.destination;
        this.userData.arrivalTime = data.ArrivalTime;
        this.userData.busType = data.BusType;
        this.userData.departureTime = data.DepartureTime;
        this.userData.duration = data.duration;
        this.userData.rating = data.rating;
        this.userData.totalBaseFare = data.fare.totalbasefare;
        this.userData.travelsName = data.TravelsName;
        this.props.userBusData(this.userData);
        // this.props.history.push('/');
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />]
        return (
            <div>
                <p>asdasd</p>
                {this.state.loaded ?
                    <div>
                        <Table onRowSelection={this.handleRowSelection}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Travelers Name</TableHeaderColumn>
                                    <TableHeaderColumn>Arrival Time</TableHeaderColumn>
                                    <TableHeaderColumn>Departure Time</TableHeaderColumn>
                                    <TableHeaderColumn>Duration</TableHeaderColumn>
                                    <TableHeaderColumn>Bus Type</TableHeaderColumn>
                                    <TableHeaderColumn>Total Fare</TableHeaderColumn>
                                    <TableHeaderColumn>Rating</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Busses && Busses.map((user, i) =>
                                    <TableRow key={i} selected={this.isSelected(i)}>
                                        <TableRowColumn>{user.TravelsName}</TableRowColumn>
                                        <TableRowColumn>{user.ArrivalTime}</TableRowColumn>
                                        <TableRowColumn>{user.DepartureTime}</TableRowColumn>
                                        <TableRowColumn>{user.duration}</TableRowColumn>
                                        <TableRowColumn>{user.BusType}</TableRowColumn>
                                        <TableRowColumn>{user.fare.totalbasefare}</TableRowColumn>
                                        <TableRowColumn>{user.rating}</TableRowColumn>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Book Flight" primary={true} onClick={this.saveBuss} />
                        <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            Discard draft?
                    </Dialog>
                    </div>
                    : <div> Still Loading...</div>}
            </div>
        )
    }
}
// Adds the argument to the global props

const mapDispatchToProps = dispatch => {
    return {
      userBusData: (project) => dispatch(userBusData(project))
    }
  }

export default  connect(null, mapDispatchToProps)(BusData);