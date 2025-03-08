import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

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


// Redux persist configuration
const persistConfig = {
  keyPrefix: "party-",
  key: "utils",
  storage
};

export default persistReducer(persistConfig, utilsReducer);