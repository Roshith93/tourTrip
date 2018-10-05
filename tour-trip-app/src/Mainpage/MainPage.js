import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import Flights from '../Mainpage/Flights'
import Hotels from '../Mainpage/Hotels'
import Trains from '../Mainpage/Trains'


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class MainPage extends Component {
  render(){
    return(
      <div>
        <div className="clauser">
          <h1> Sliding Work</h1>
        </div>

        <div>
          <Tabs>
             <Tab
               icon={<ActionFlightTakeoff />}
               label="Flights">
               <Flights/>
             </Tab>
             <Tab
               icon={<FontIcon className="material-icons">favorite</FontIcon>}
               label="Hotels"
             >
             <Hotels/>
             </Tab>
             <Tab
               icon={<MapsPersonPin />}
               label="Trains"
             >
             <Trains/>
             </Tab>
           </Tabs>
       </div>

     </div>
    )
  }

}

export default MainPage
