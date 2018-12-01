import React, { Component } from 'react'
import dummy from '../../images/dummy.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from '../../reducers/actions/authActions';
import { storage } from '../../config/fbConfig'
class Profile extends Component {
    state = {
        uid: null,
        URL: null,
        image: null,
    }
    handle = (e) => {
        console.log(e.target.files[0]);
        const { auth } = this.props;

        this.state.uid = auth.auth.uid
        if(e.target.files[0])
        {
            this.state.image = e.target.files[0];

        }
    }
    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);    
        uploadTask.on('state_changed', 
        (snapshot) => {

        }
        , (error => {
            console.log(error)
        }), () => {
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({URL : url});
                this.props.update(this.state);
            })
        });
    }

    render(){
    const { auth } = this.props;
    this.state.URL = auth.profile.image === null ? dummy : auth.profile.image;
    if(!auth.auth.uid) return(<Redirect to='/signin'/>)
    return(
        <div className="container">
            <div className="card ">
            <div className="card-panel">
                <h4 className="center">User Profile</h4>
                <div className="card horizontal">
                    <div className="card-image center hoverable" style={{ width: '300px', height: '250px', margin: '50px' }}>
                        <img src={this.state.URL}  style={{width: '250px', height: '200px'}}/>
                        <input type="file" style={{width: '60px'}}onChange={this.handle} />
                        <button onClick={this.handleUpload}>Upload</button>
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