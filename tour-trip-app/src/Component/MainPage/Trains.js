import React, { Component } from 'react';

class Trains extends Component {
  render() {
    return (
      <div>
          Train Works!!
      </div>
    )
  }
}

export default Trains

// for hotels curl -v  -X GET "http://developer.goibibo.com/api/voyager/get_hotels_by_cityid/?app_id=c66591e4&app_key=89d9830bfee0cb120f65ef19e5ed1fce&city_id=6771549831164675055" 

//curl -v  -X GET "http://developer.goibibo.com/api/bus/search/?app_id=c66591e4&app_key=89d9830bfee0cb120f65ef19e5ed1fce&format=json&source=bangalore&destination=hyderabad&dateofdeparture=20181108"