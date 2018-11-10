import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class MainPage extends Component {
  render(){
    return(
        <div className="clauser">
          <h1> Sliding Work</h1>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
   console.log(state.firestore.ordered.userBusData);
  return {
    projects: state.firestore
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'userBusData' }
  ])
)(MainPage)