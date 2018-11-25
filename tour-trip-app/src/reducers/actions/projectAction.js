export const userBusData = (project) => {
  return (dispatch, getState, { getFirestore }) => {
    //   // make async call to database
    //   const firestore = getFirestore();
    //   firestore.collection('userBusData').add({
    //     ...project
    //   }).then(() => {
    dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    //   }).catch(err => {
    // dispatch({ type: 'CREATE_PROJECT_ERROR' , err});
    //   });
  }
  // return project
};

export const userFlightData = (project) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.collection('userFlightData').add({
      ...project
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err });
    });
  }
};

export const addBusData = (busData) => {
  console.log(busData)
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_BUS_DATA', busData });
  }
}

export const addFlightData = (flightData) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_FLIGHT_DATA', flightData });
  }
}

export const addTrainData = (trainData) => {
  return (dispatch) => {
    dispatch({ type: 'ADDING_TRAIN_DATA', trainData });
  }
}