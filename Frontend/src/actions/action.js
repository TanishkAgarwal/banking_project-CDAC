// actions.js
import { LOGOUT } from './actionTypes'; // Make sure you have an action type defined for logout

// Action creator for logout
export const logoutAction = () => {
  return {
    type: LOGOUT, // Use your logout action type here
  };
};
