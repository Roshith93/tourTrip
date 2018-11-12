import React, { Component } from 'react'
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { userFlightData } from '../reducers/actions/projectAction'
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const app_id = "c66591e4";
const api_key = "89d9830bfee0cb120f65ef19e5ed1fce";
const base_url = "https://developer.goibibo.com";

const flights = []
class ComponentData extends Component {

    state = {
        loaded: false,
        selected: [-1],
        open: false,
        saved: -1
    }
    userData = {
        airline: null,
        arrtime: null,
        deptime: null,
        duration: null,
        totalfare: null,
        id: null,
        source: null,
        destination: null
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
        var api_search = base_url + '/api/search/?app_id=' + app_id + '&app_key=' + api_key;
        let url = api_search + '&source=' + data.source + '&destination=' + data.dest +
            '&dateofdeparture=' + data.deptDate + '&adults=' + data.adult + '&children=' + data.child + '&counter=100'
        //  let url = 'https://developer.goibibo.com/api/search/?app_id=c66591e4&app_key=89d9830bfee0cb120f65ef19e5ed1fce&source=WAS&destination=DEL&dateofdeparture=20181108&adults=3&children=2&counter=100';
        axios.get(url)
            .then(response => {
                for (let i = 0; i < 12; i++) {
                    if(response.data.data.onwardflights[i].airline !== undefined)
                       flights.push(response.data.data.onwardflights[i]);
                }
                if (flights[0].airline === undefined) {
                    this.setState({ open: true });
                    console.log("No data");
                }
                else
                    this.setState({ loaded: true })
            })
    }

    saveFlight = (e) => {
        e.preventDefault();
        const data = flights[this.state.saved];
        this.userData.airline = data.airline;
        this.userData.arrtime = data.arrtime;
        this.userData.deptime = data.deptime;
        this.userData.duration = data.duration;
        this.userData.totalfare = data.fare.totalfare;
        this.userData.id = this.props.auth.uid;
        this.userData.source = this.props.data.source;
        this.userData.destination = this.props.data.dest;
        console.log(this.userData);
        this.props.userFlightData(this.userData);
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
                {this.state.loaded ?
                    <div>
                        <Table onRowSelection={this.handleRowSelection}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Airline Name</TableHeaderColumn>
                                    <TableHeaderColumn>Arrival Time</TableHeaderColumn>
                                    <TableHeaderColumn>Departure Time</TableHeaderColumn>
                                    <TableHeaderColumn>Flight Duration</TableHeaderColumn>
                                    <TableHeaderColumn>Total Fare</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {flights && flights.map((user, i) =>
                                    <TableRow key={i} selected={this.isSelected(i)}>
                                        <TableRowColumn>{user.airline}</TableRowColumn>
                                        <TableRowColumn>{user.arrtime}</TableRowColumn>
                                        <TableRowColumn>{user.deptime}</TableRowColumn>
                                        <TableRowColumn>{user.duration}</TableRowColumn>
                                        <TableRowColumn>{user.fare.totalfare}</TableRowColumn>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Book Flight" primary={true} onClick={this.saveFlight} />
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispachToProps  = dispach => {
    return {
        userFlightData: (data) => dispach(userFlightData(data))
    }
}
export default connect(mapStateToProps, mapDispachToProps)(ComponentData); 