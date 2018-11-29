import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import FlightBookingList from './FlightBookingList';
import BusBookingList from './BusBookingList';
import TrainBookingList from './TrainBookingList';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

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


class MyAccount extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { auth, userData } = this.props;
    let allbusdata = userData.userBusData;
    let busdata = allbusdata && allbusdata.filter(function(data) {
      return data.id === auth.uid
    })

    let allflightdata = userData.userFlightData;
    let flightdata = allflightdata && allflightdata.filter(function(data) {
      return data.id === auth.uid
    })
    
    let alltraindata = userData.userTrainData;
    let traindata = alltraindata && alltraindata.filter(function(data) {
      return data.id === auth.uid
    })
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className={classes.root}>
        <Paper>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Bus" />
            <Tab label="Flight" />
            <Tab label="Train" />
          </Tabs>
        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <BusBookingList busData={busdata} />
          </TabContainer>

          <TabContainer dir={theme.direction}>
              <FlightBookingList flightData={flightdata}/>
          </TabContainer>
          <TabContainer dir={theme.direction}>
              <TrainBookingList trainData={traindata}/>
          </TabContainer>
        </SwipeableViews>

      </div>
    )
  }
}
MyAccount.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    userData: state.firestore.ordered,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    'userBusData', 'userFlightData', 'userTrainData'
  ])
)(withStyles(styles, { withTheme: true })(MyAccount));

