import React, { Component } from 'react'
import image from '../../images/dummy.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Profile extends Component {
    render(){
    const { auth } = this.props;
    if(!auth.auth.uid) return(<Redirect to='/signin'/>)
    return(
        <div className="container">
            <div className="card ">
            <div className="card-panel">
                <h4 className="center">User Profile</h4>
                <div className="card horizontal">
                    <div className="card-image center hoverable" style={{ width: '300px', height: '250px', margin: '50px' }}>
                        <img src={image} style={{width: '250px', height: '200px'}}/>
                    </div>

                    <div className="card-content hoverable container">
                    <pre>User Id                :       {auth.auth.uid}</pre>
                    <pre>User First Name        :       {auth.profile.firstName}</pre>
                    <pre>User Last Name         :       {auth.profile.lastName}</pre>
                    <pre>User Email Id          :       {auth.auth.email}</pre>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
    }
}

const mapStateToProsp = ( state ) => {
    return{
        auth: state.firebase,
    }
}
export default connect(mapStateToProsp)(Profile)