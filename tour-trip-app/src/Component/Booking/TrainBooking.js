import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

var available = [];
class TrainBooking extends Component {
    // availableDays = () => {
    //     console.log("asdad");
    //     const { trainData } = this.props;
    //     for(let j = 0; j < 7; j++)
    //     if(trainData.days[j].runs === 'Y')
    //         available.push(<Chip label={trainData.days[j].code} key={j} variant="outlined" />)
        
    //     console.log(available) 
    // }
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
                        <pre>Train Name             :           {trainData.travelsName}</pre>
                        <pre>Source Station         :           {trainData.source}</pre>
                        <pre>Destinaion Station     :           {trainData.destination}</pre>
                        <pre>Departure Time         :           {trainData.departureTime}</pre>
                        <pre>Arrival Time           :           {trainData.arrivalTime}</pre>
                        <pre>Total Duration         :           {trainData.duration}</pre>
                        <pre>Availabe Days          :           {trainData.available}</pre>
                    </div>
                    <div className="center">
                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
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
export default connect(mapStateToProps)(TrainBooking);