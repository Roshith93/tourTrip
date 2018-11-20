const initState = {
  busData:null
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error ' + action.err.message);
      return state;
    case 'CREATE_PROJECT':
      console.log('created project ');
      return {
        ...state,
        busData : action.busData,
      }
    default:
      return state;
  }
};

export default projectReducer; 