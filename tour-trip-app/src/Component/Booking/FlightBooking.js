import React, { Component } from 'react';
import images from '../../images/dummy.png'
import { Card, CardHeader } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

class FlightBooking extends Component {
    render(){
        return(
            <div className="row">
                <div className="col m10 s12">
                    <div className="card-panel">
                        <Card>
                            <CardHeader
                                title="UserName"
                                subtitle="Email"
                                avatar={images}
                            />
                        </Card>
                        <div className="card-panel">
                            <h4 className="center">Flight Details</h4>
                            <div className="card horizontal">
                                <div className="card-content">
                                    <List>
                                        <Subheader inset={true}>Folders</Subheader>
                                        <ListItem
                                            primaryText="Photos"
                                            secondaryText="Jan 9, 2014"
                                        />
                                        <ListItem
                                            primaryText="Recipes"
                                            secondaryText="Jan 17, 2014"
                                        />
                                        <ListItem
                                            primaryText="Work"
                                            secondaryText="Jan 28, 2014"
                                        />
                                    </List>
                                </div>
                            
                                <div className="card-content">
                                    <List>
                                        <Subheader inset={true}>Folders</Subheader>
                                        <ListItem
                                            primaryText="Photos"
                                            secondaryText="Jan 9, 2014"
                                        />
                                        <ListItem
                                            primaryText="Recipes"
                                            secondaryText="Jan 17, 2014"
                                        />
                                        <ListItem
                                            primaryText="Work"
                                            secondaryText="Jan 28, 2014"
                                        />
                                    </List>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default FlightBooking;