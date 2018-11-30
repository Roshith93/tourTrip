import React, { Component } from 'react'
import dummy from '../../images/dummy.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from '../../reducers/actions/authActions';

class Profile extends Component {
    state = {
        uid: null,
        URL: null,
    }
    handle = (e) => {
        console.log(e.target.files[0]);
        const { auth } = this.props;

        this.state.uid = auth.auth.uid
       
        let a = '';
        a = e.target.files[0];
        
        this.state.URL = a.toString();
        console.log(this.state);
        this.props.update(this.state);

    }

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
                        <img src={this.state.URL === null ? dummy : URL.createObjectURL(this.state.URL)}  style={{width: '250px', height: '200px'}}/>
                    </div>

                    <div className="card-content hoverable container">
                    <pre>User Id                :       {auth.auth.uid}</pre>
                    <pre>User First Name        :       {auth.profile.firstName}</pre>
                    <pre>User Last Name         :       {auth.profile.lastName}</pre>
                    <pre>User Email Id          :       {auth.auth.email}</pre>
                    </div>
                </div>
            </div>
            <input type="file" onChange={this.handle} />
            </div>
        </div>
    )
    }
}

const mapStateToProps = ( state ) => {
    return{
        auth: state.firebase,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        update: (data) => dispatch(update(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)