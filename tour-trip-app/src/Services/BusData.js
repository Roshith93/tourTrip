import React, { Component } from 'react'
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import BusDataTable from './BusDataTable';
import { connect } from 'react-redux'
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
        window.location.reload();
    };
    componentDidMount() {
        const { data } = this.props;
        var api_search = base_url + 'api/bus/search/?app_id=' + app_id + '&app_key=' + api_key;
        let url = api_search + '&format=json&source=' + data.source + '&destination=' + data.destination +
            '&dateofdeparture=' + data.deptDate;
        axios.get(url)
            .then(response => {
                for (let i = 0; i < 15; i++) {
                    if (response.data.data.onwardflights[i] !== undefined)
                        Busses.push(response.data.data.onwardflights[i]);

                }
                console.log(Busses);
                if (Busses[0] === undefined) {
                    this.setState({ open: true });
                   
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
                    <div>
                        <BusDataTable bus={Busses} />
                    </div>
                    : <div className="center">Still Loading...</div>}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    No Bus on this route
                    </Dialog>
            </div>
        )
    }
}
// Adds the argument to the global props
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(BusData);
