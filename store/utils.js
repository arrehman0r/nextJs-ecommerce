// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING'
};

// Initial state
const initialState = {
  loading: false
};

// Reducer
function utilsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
}

// Action creators
export const  setLoading = (status) => ({ type: actionTypes.SET_LOADING, payload: status })

export default utilsReducer;