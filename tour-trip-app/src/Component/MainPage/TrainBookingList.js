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

const TrainBookingList = ({ trainData, classes }) => {
    if(trainData === undefined || trainData.length === 0) return<div>No Data Found</div>
    return (
        <div className={classes.root}>
            <GridList cellHeight={550} className={classes.gridList}>
            {trainData.map((trainData, i) => {
                return (
            <div className="card horizontal hoverable" key={i}>
                <div className="card-content container">
                     <List>
                        <ListItem
                            primaryText="Date"
                            secondaryText={trainData.date}
                        />
                        <ListItem
                            primaryText="Source"
                            secondaryText={trainData.source}
                        />
                        <ListItem
                            primaryText="Departure Time"
                            secondaryText={trainData.departureTime}
                        />
                        <ListItem
                            primaryText="Duration"
                            secondaryText={trainData.duration}
                        />
                    </List>
                </div>

                <div className="card-content container">
                    <List>
                        <ListItem
                            primaryText="Train Number"
                            secondaryText={trainData.number}
                        />
                        <ListItem
                            primaryText="Destination"
                            secondaryText={trainData.destination}
                        />
                        <ListItem
                            primaryText="Arrival Time"
                            secondaryText={trainData.arrivalTime}
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
TrainBookingList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(TrainBookingList);