import React from 'react';
import { List, ListItem } from 'material-ui/List';
import GridList from '@material-ui/core/GridList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      maxWidth: 1400,
      minWidth: 800,
    },
    gridList: {
      maxWidth: 1300,
      padding: '25px'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  });

const BusBookingList = ({ busData, classes }) => {
    return (
        <div className={classes.root}>
            <GridList cellHeight={620} className={classes.gridList}>
            {busData.map((busData, i) => {
                return (
            <div className="card horizontal hoverable" key={i}>
                <div className="card-content container">

                    <List>
                        <ListItem
                            primaryText="Date"
                            secondaryText={busData.date}
                        />
                        <ListItem
                            primaryText="Source"
                            secondaryText={busData.source}
                        />
                        <ListItem
                            primaryText="Travelers Name"
                            secondaryText={busData.travelsName}
                        />
                        <ListItem
                            primaryText="Departure Time"
                            secondaryText={busData.departureTime}
                        />
                        <ListItem
                            primaryText="Duration"
                            secondaryText={busData.duration}
                        />
                        <ListItem
                            primaryText="Bus Type"
                            secondaryText={busData.busType}
                        />
                    </List>
                </div>

                <div className="card-content container">
                    <List>
                        <ListItem
                            primaryText="Service Id"
                            secondaryText={busData.serviceId}
                        />
                        <ListItem
                            primaryText="Destination"
                            secondaryText={busData.destination}
                        />
                        <ListItem
                            primaryText="Service Name"
                            secondaryText={busData.serviceName}
                        />
                        <ListItem
                            primaryText="Arrival Time"
                            secondaryText={busData.arrivalTime}
                        />
                        <ListItem
                            primaryText="Available Seat"
                            secondaryText={busData.seats}
                        />
                        <ListItem
                            primaryText="Total Fare"
                            initiallyOpen={false}
                            secondaryText={busData.fare * busData.value}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem
                                    key={1}
                                    primaryText="Total Passangers"
                                    secondaryText={busData.value}
                                    disabled={true}

                                />,
                                <ListItem
                                    key={2}
                                    primaryText="Fare"
                                    secondaryText={busData.fare}
                                    disabled={true}
                                />
                           ]}
                        />
                    </List>
                </div>
            </div>
            )
        })
        }
    </GridList>
  </div>
    )
}
BusBookingList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(BusBookingList);