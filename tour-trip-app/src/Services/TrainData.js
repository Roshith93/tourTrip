import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import  TrainDataTable from './TrainDataTable';
const base_url = "https://api.railwayapi.com";
const key = "pxx781kxnd";
let trains =[];
class TrainData extends Component {
    state = {
        loaded: false,
        open: false,
    }
    componentDidMount(){
        const { data } = this.props;
        var api_search = base_url + '/v2/between/source/' + data.source + '/dest/' + data.dest +
                        '/date/' + data.deptDate + '/apikey/' + key + '/';
        axios.get(api_search)
        .then(response => {
            console.log(response)
            if(response.data.response_code == 200){
                for (let i = 0; i < response.data.trains.length; i++) {
                        trains.push(response.data.trains[i]);
                }
                console.table(trains);
                this.setState({ loaded: true })
            } 
            else
                this.setState({ loaded: false })
        })
    }
    componentWillUnmount(){}
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />]
        return( 
            <div>
                {this.state.loaded ?
                    <TrainDataTable train={trains} userData={this.props.data}/>
                    : <div> Still Loading...</div>}
                    <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            Error occured
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

export default connect(mapStateToProps)(TrainData);