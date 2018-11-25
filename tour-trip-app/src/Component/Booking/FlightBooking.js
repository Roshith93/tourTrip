import React, { Component } from 'react';
import images from '../../images/dummy.png'
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class FlightBooking extends Component {
    state = {
        open: false,
    };
    render() {
        const { flightData, userProfile } = this.props;
        if (!userProfile.auth.uid) return (<Redirect to='/signin' />)
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
                                            secondaryText={flightData.source}
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
                                            secondaryText={flightData.Destination}
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
                                            secondaryText={flightData.childbasefare + flightData.adultbasefare}
                                            primaryTogglesNestedList={true}
                                            nestedItems={[
                                                <ListItem
                                                    key={1}
                                                    primaryText="Total Passangers"
                                                    secondaryText={flightData.passangers}
                                                    disabled={true}

                                                />,
                                                <ListItem
                                                    key={2}
                                                    primaryText="Child Base Fare"
                                                    secondaryText={flightData.childbasefare}
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
                                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                </button>
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
export default connect(mapStateToProps)(FlightBooking);