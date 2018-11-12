import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class MainPage extends Component {
  render(){
    const { auth } = this.props;
    console.log(this.props)
    if (!auth.uid) return <Redirect to='/signin' /> 
    return(
        <div className="clauser">
          <h1> MainPage Works!!!</h1>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
   console.log(state.firestore);
  return {
    projects: state.firestore,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    'userBusData', 'userFlightData'
  ])
)(MainPage)