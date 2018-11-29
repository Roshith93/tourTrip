import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card';
import images from '../../images/dummy.png'
import restaurant from '../../images/6.jpg'
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userBusData } from '../../reducers/actions/projectAction';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
    return <Slide style={{background: 'green'}} {...props} direction="left" />;
}

let URL = restaurant;
class BusBooking extends Component {      
    state = {
        value: 1,
        load: false,
        snackopen: false,
        Transition: null,
    }
    userData = {
        serviceId: '',
        source: '',
        destination: '',
        travelsName: '',
        serviceName: '',
        arrivalTime: '',
        departureTime: '',
        busType: '',
        seats: '',
        fare: '',
        Total: '',
        value: '',
        date: '',
        id: '',
    }
    increment = () => {
        let value = this.state.value;
        if (value < this.props.busData.seats)
            value = value + 1;
        this.setState({ value: value });
    }
    decrement = () => {
        let value = this.state.value;
        if (value > 1)
            value--;
        this.setState({ value: value-- });
    }
    handleClose = () => {
        this.setState({ snackopen: false,
            load: true });
    }

    handleSubmit = Transition => {
        const { busData, auth } = this.props;
        let date = new Date();
        this.userData.serviceId= busData.serviceId,
        this.userData.source= busData.source,
        this.userData.destination= busData.destination,
        this.userData.travelsName= busData.travelsName,
        this.userData.serviceName= busData.serviceName,
        this.userData.arrivalTime= busData.arrivalTime,
        this.userData.departureTime= busData.departureTime,
        this.userData.busType= busData.busType,
        this.userData.seats= busData.seats,
        this.userData.fare= busData.fare,
        this.userData.Total= busData.fare * this.state.value;
        this.userData.value = this.state.value;
        this.userData.date = moment(date).format('DD-MM-YYYY');
        this.userData.id = auth.uid;
        console.log(this.userData);
        this.props.userBusData(this.userData);
        this.setState({ snackopen: true, Transition });
    }
    render() {
        const { busData, userProfile, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        if(this.state.load) return (<Redirect to="/" />)
        if (busData.busImageURL !== undefined)
            URL = busData.busImageURL;
        return (
            <div className="row container" >
                <div className="col s12 m12">
                    <div className="card-panel ">
                        <div className="hoverable">
                            <Card>
                                <CardHeader
                                    title={userProfile.profile.firstName + " " + userProfile.profile.lastName}
                                    subtitle={userProfile.auth.email}
                                    avatar={images}
                                />
                            </Card>
                        </div>
                        <div className="card horizontal">
                            <div className="card-image hoverable" style={{ width: '300px', height: '350px', marginLeft: '50px', marginTop: '50px' }}>
                                <img src={URL} style={{ width: '300px', height: '350px' }} />
                            </div>
                            <div className="card-stacked">
                                <div className="card-content hoverable" style={{ marginLeft: '50px' }}>
                                    <pre><h5><b>Service Id :    {busData.serviceId}</b></h5></pre>
                                    <pre>Source             :       {busData.source}</pre>
                                    <pre>Destination        :       {busData.destination}</pre>
                                    <pre>travelsName        :       {busData.travelsName}</pre>
                                    <pre>serviceName        :       {busData.serviceName}</pre>
                                    <pre>arrivalTime        :       {busData.arrivalTime}</pre>
                                    <pre>departureTime      :       {busData.departureTime}</pre>
                                    <pre>busType            :       {busData.busType}</pre>
                                    <pre>seats              :       {busData.seats}</pre>
                                    <pre>Fare               :       {busData.fare}</pre>
                                    <pre>Total Passengers   :   <button className="btn" onClick={this.increment}>+</button> {this.state.value} <button className="btn" onClick={this.decrement}>-</button></pre>
                                    <pre>___________________________________________

                                    </pre>
                                    <pre>Total Fair         :       {busData.fare * this.state.value}   </pre>
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
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        busData: state.project.busData,
        userProfile: state.firebase,
        auth: state.firebase.auth
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        userBusData: (data) => dispatch(userBusData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BusBooking);