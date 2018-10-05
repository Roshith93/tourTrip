import React, { Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Hotels extends Component {
  render() {
    const {flightData} = this.props;
    return(
      <div>
        <div>{this.props.flightData}</div>
        

     </div>
    )
  }
}

export default Hotels
