import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card';
import images from '../../images/dummy.png'
import restaurant from '../../images/6.jpg'
import { connect } from 'react-redux';

let URL = restaurant;
class BusBooking extends Component {
    state = {
        value: 1,
    }
    increment = () => {
        let value = this.state.value;
        if (value < 3)
            value = value + 1;
        console.log(this.state);
        this.setState({ value: value });
    }
    decrement = () => {
        let value = this.state.value;
        if (value > 1)
            value--;
        this.setState({ value: value-- });
    }
    render() {
        const { busData, userProfile } = this.props;
        if(busData.busImageURL !== undefined)
        URL = busData.busImageURL;
        console.log(busData)
        return (
            <div className="row container" >
                <div className="col s12 m12">
                    <div className="card-panel ">
                        <Card>
                            <CardHeader
                                title={userProfile.profile.firstName + " " + userProfile.profile.lastName}
                                subtitle={userProfile.auth.email}
                                avatar={images}
                            />
                        </Card>
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
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                    </button>
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
    }
}
export default connect(mapStateToProps)(BusBooking);