import React, { Component } from 'react'
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { userFlightData } from '../reducers/actions/projectAction'
import { connect } from 'react-redux';
import FlightDataTable from './FlightDataTable'
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
   
    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        const { data } = this.props;
        var api_search = base_url + '/api/search/?app_id=' + app_id + '&app_key=' + api_key;
        let url = api_search + '&source=' + data.source + '&destination=' + data.dest +
            '&dateofdeparture=' + data.deptDate + '&adults=' + data.adult + '&children=' + data.child + '&counter=100'
        //  let url = 'https://developer.goibibo.com/api/search/?app_id=c66591e4&app_key=89d9830bfee0cb120f65ef19e5ed1fce&source=WAS&destination=DEL&dateofdeparture=20181108&adults=3&children=2&counter=100';
        axios.get(url)
            .then(response => {
                for (let i = 0; i < 20; i++) {
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
                    <FlightDataTable flight={flights} userData={this.props.data}/>
                       
                    : <div> Still Loading...</div>}
                     <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            Discard draft?
                    </Dialog>
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