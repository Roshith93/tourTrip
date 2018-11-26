import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class TrainBooking extends Component {
    render(){
        const { trainData, auth } = this.props;
        console.log(trainData); 
        if (!auth.uid) return (<Redirect to='/signin' />)
        return(
            <div>sadasdsadsa</div>
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