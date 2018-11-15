import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class MainPage extends Component {
  componentDidMount() {

    console.log(this.props);
   
     let url = 'https://newsapi.org/v2/everything?q=travel&hl=en-IN&gl=IN&ceid=IN%3Aen&apiKey=dd9e85cfee714ace8811d8592515ce8f';
    axios.get(url)
        .then(response => {
          console.log(response)
        })
}
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