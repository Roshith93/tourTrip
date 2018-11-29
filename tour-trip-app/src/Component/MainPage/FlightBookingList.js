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

const FlightBookingList = ({ flightData, classes }) => {
    return (
        <div className={classes.root}>
            <GridList cellHeight={550} className={classes.gridList}>
            {flightData.map((flightData, i) => {
                return (
            <div className="card horizontal hoverable">
                <div className="card-content container">

                    <List>
                        <ListItem
                            primaryText="Date"
                            secondaryText={flightData.date}
                        />
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
                            secondaryText={flightData.departureTime}
                        />
                        <ListItem
                            primaryText="Duration"
                            secondaryText={flightData.duration}
                        />
                        <ListItem
                            primaryText="Departure Terminal"
                            secondaryText={flightData.depTerminal}
                        />
                        <ListItem
                            primaryText="Split Duration"
                            secondaryText={flightData.splitDuration}
                        />
                    </List>
                </div>

                <div className="card-content container">
                    <List>
                        <ListItem
                            primaryText="Flight Code"
                            secondaryText={flightData.flightCode}
                        />
                        <ListItem
                            primaryText="Destination"
                            secondaryText={`${flightData.destination}(${flightData.destinationIATA})`}
                        />
                        <ListItem
                            primaryText="Arrival Time"
                            secondaryText={flightData.arrTime}
                        />
                        <ListItem
                            primaryText="Stops"
                            secondaryText={flightData.stops}
                        />
                        <ListItem
                            primaryText="Total Fare"
                            initiallyOpen={false}
                            secondaryText={flightData.childFare * flightData.children + flightData.adultFare * flightData.adult}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem
                                    key={1}
                                    primaryText="Total Passangers(Adult+Children)"
                                    secondaryText={`${flightData.children} + ${flightData.adult} = ${flightData.children + flightData.adult}`}
                                    disabled={true}

                                />,
                                <ListItem
                                    key={2}
                                    primaryText="Child Base Fare"
                                    secondaryText={flightData.childFare}
                                    disabled={true}
                                />,
                                <ListItem
                                    key={3}
                                    primaryText="Adult Base Fare"
                                    secondaryText={flightData.adultFare}
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
FlightBookingList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(FlightBookingList);