import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CORRECT_ANSWER,
  WRONG_ANSWER,
} from "../constants/actionTypes";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      console.log("In USER_LOADED switch statement", new Date().toUTCString());
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log(`Woohoo! ${type}`);
      // now that we get the token from the backend, save it to localStorage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case CORRECT_ANSWER:
      const userData = { ...state.user };
      userData.score++;
      return { ...state, user: userData };

    case WRONG_ANSWER:
      return state;

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return initialState;

    default:
      return state;
  }
}
