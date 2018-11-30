import React, { Component } from 'react';
import images from '../../images/dummy.png'
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userFlightData } from '../../reducers/actions/projectAction';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
    return <Slide style={{background: 'green'}} {...props} direction="left" />;
}

class FlightBooking extends Component {
    state = {
        open: false,
        load: false,
        snackopen: false,
        Transition: null,
    };
    userData = {
        source: '',
        sourceIATA: '',
        destination: '',
        destinationIATA: '',
        airline: '',
        departureTime: '',
        duration: '',
        depTerminal: '',
        splitDuration: '',
        flightCode: '',
        arrTime: '',
        stops: '',
        children: '',
        adult: '',
        childFare: '',
        adultFare: '',
        date: '',
        id: '',
    }
    handleClose = () => {
    this.setState({ snackopen: false,
        load: true });
    }

    handleSubmit = Transition => () => {
        const { flightData, userProfile } = this.props;
        let date = new Date();
        this.userData.source = flightData.source;
        this.userData.sourceIATA = flightData.sourceIATA;
        this.userData.destination = flightData.Destination;
        this.userData.destinationIATA = flightData.destinationIATA;
        this.userData.airline = flightData.airline;
        this.userData.departureTime = flightData.deptime;
        this.userData.duration = flightData.duration;
        this.userData.depTerminal = flightData.depterminal;
        this.userData.splitDuration = flightData.splitduration;
        this.userData.flightCode = flightData.flightcode;
        this.userData.arrTime = flightData.arrtime;
        this.userData.stops = flightData.stops;
        this.userData.children = flightData.children;
        this.userData.adult = flightData.adult;
        this.userData.childFare = flightData.childbasefare;
        this.userData.adultFare = flightData.adultbasefare;
        this.userData.date = moment(date).format('DD-MM-YYYY');
        this.userData.id = userProfile.auth.uid;
        console.log(this.userData);
        this.props.userFlightData(this.userData);
        this.setState({ snackopen: true, Transition });
    }
    render() {
        const { flightData, userProfile } = this.props;
        if (!userProfile.auth.uid) return (<Redirect to='/signin' />)
        if(this.state.load) return(<Redirect to='/' />);
        console.log(flightData);
        return (
            <div className="container">
                <div className=" col m10 s12">
                    <div className="card-panel">
                        <div className="hoverable">
                            <Card>
                                <CardHeader
                                    title={userProfile.profile.firstName + " " + userProfile.profile.lastName}
                                    subtitle={userProfile.auth.email}
                                    avatar={images}
                                />
                            </Card>
                        </div>
                        <div className="card-panel">
                            <h4 className="center">Flight Details</h4>
                            <div className="card horizontal hoverable">
                                <div className="card-content container">
                                    <List>
                                        <ListItem
                                            primaryText="Source"
                                            secondaryText={`${flightData.source}(${flightData.sourceIATA})`}
                                        />
                                        <ListItem
                                            primaryText="Airline"
                                            secondaryText={flightData.airline}
                                        />
                                        <ListItem
                                            primaryText="Departure Time"
                                            secondaryText={flightData.deptime}
                                        />
                                        <ListItem
                                            primaryText="Duration"
                                            secondaryText={flightData.duration}
                                        />
                                        <ListItem
                                            primaryText="Departure Terminal"
                                            secondaryText={flightData.depterminal}
                                        />
                                        <ListItem
                                            primaryText="Split Duration"
                                            secondaryText={flightData.splitduration}
                                        />
                                    </List>
                                </div>

                                <div className="card-content container">
                                    <List>
                                        <ListItem
                                            primaryText="Destination"
                                            secondaryText={`${flightData.Destination}(${flightData.destinationIATA})`}
                                        />
                                        <ListItem
                                            primaryText="Flight Code"
                                            secondaryText={flightData.flightcode}
                                        />
                                        <ListItem
                                            primaryText="Arrival Time"
                                            secondaryText={flightData.arrtime}
                                        />
                                        <ListItem
                                            primaryText="Stops"
                                            secondaryText={flightData.stops}
                                        />
                                        <ListItem
                                            primaryText="Total Fare"
                                            initiallyOpen={false}
                                            secondaryText={flightData.childbasefare * flightData.children + flightData.adultbasefare * flightData.adult}
                                            primaryTogglesNestedList={true}
                                            nestedItems={[
                                                <ListItem
                                                    key={1}
                                                    primaryText="Total Passangers(Children+Adult)"
                                                    secondaryText={`${flightData.children} + ${flightData.adult} = ${flightData.passangers}`}
                                                    disabled={true}

                                                />,
                                                <ListItem
                                                    key={2}
                                                    primaryText="Child Base Fare"
                                                    secondaryText={flightData.childbasefare}
                                                    disabled={true}
                                                />,
                                                <ListItem
                                                    key={3}
                                                    primaryText="Adult Base Fare"
                                                    secondaryText={flightData.adultbasefare}
                                                    disabled={true}
                                                />
                                            ]}
                                        />
                                    </List>
                                </div>
                            </div>
                            <div className="center">
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
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        flightData: state.project.flightData,
        userProfile: state.firebase,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userFlightData: (data) => dispatch(userFlightData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlightBooking);