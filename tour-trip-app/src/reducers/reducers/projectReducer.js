const initState = {
  busData: null,
  flightData: null,
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error ' + action.err.message);
      return state;
    case 'ADD_BUS_DATA':
      console.log('added bus data');
      return {
        ...state,
        busData: action.busData,
      }
    case 'ADD_FLIGHT_DATA':
      console.log('added flight data ');
      return {
        ...state,
        flightData: action.flightData,
      }
    default:
      return state;
  }
};

export default projectReducer; 