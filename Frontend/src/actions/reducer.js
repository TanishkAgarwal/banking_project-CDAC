// reducer.js
import { LOGOUT } from './actionTypes'; // Import the action type
const initialState = {
  // Your initial state
  isSignin: false,
  // ...
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isSignin: false, // Set the signin state to false
        // ... any other state updates related to logout
      };
    // ... other cases
    default:
      return state;
  }
};
export default reducer;