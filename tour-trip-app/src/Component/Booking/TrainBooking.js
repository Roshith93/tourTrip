import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userTrainData } from '../../reducers/actions/projectAction';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
    return <Slide style={{background: 'green'}} {...props} direction="left" />;
}
class TrainBooking extends Component {
    state = {
        open: false,
        load: false,
        snackopen: false,
        Transition: null,
    };
    userData = {
        number: '',
        travelsName: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        available: '',
        id: '',
        date: '',
    }
    handleClose = () => {
        this.setState({ snackopen: false,
            load: true });
    }
    handleSubmit = Transition => () => {
        const { trainData, auth } = this.props;
        let date = new Date();
        this.userData.number = trainData.number;
        this.userData.travelsName = trainData.travelsName;
        this.userData.destination = trainData.destination;
        this.userData.source = trainData.source;
        this.userData.departureTime = trainData.departureTime;
        this.userData.arrivalTime = trainData.arrivalTime;
        this.userData.duration = trainData.duration;
        // this.userData.available = trainData.available;
        this.userData.date = moment(date).format('DD-MM-YYYY');
        this.userData.id = auth.uid;
        console.log(this.userData);
        this.props.userTrainData(this.userData);
        this.setState({ snackopen: true, Transition });
    }
    render(){
        const { trainData, auth } = this.props;
        console.log(trainData); 
        if (!auth.uid) return (<Redirect to='/signin' />)
        return(
            <div className="container">
                <div className="card-panel ">
                    <h4>Selected Train's Data</h4>
                    <div className="card-panel hoverable">
                        <pre>Train Number           :           {trainData.number}</pre>
                        <pre>Travelers Name         :           {trainData.travelsName}</pre>
                        <pre>Source Station         :           {trainData.source}</pre>
                        <pre>Destinaion Station     :           {trainData.destination}</pre>
                        <pre>Departure Time         :           {trainData.departureTime}</pre>
                        <pre>Arrival Time           :           {trainData.arrivalTime}</pre>
                        <pre>Total Duration         :           {trainData.duration}</pre>
                        <pre>Availabe Days          :           {trainData.available}</pre>
                    </div>
                    <div className="center">
                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit(TransitionLeft)}>Submit
                            <i className="material-icons right">send</i>
                        </button>
                        <Snackbar
                            open={this.state.snackopen}
                            onClose={this.handleClose}
                            style={{backgroundColor: 'green'}}
                            TransitionComponent={this.state.Transition}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Flights added successfully</span>}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trainData: state.project.trainData,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userTrainData: (data) => dispatch(userTrainData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrainBooking);