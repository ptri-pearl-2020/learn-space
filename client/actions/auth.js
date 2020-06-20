/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import axios from "axios";
import data from "../data/data"; //delete after backend is set up
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../constants/actionTypes";
import setAuthToken from "../utils/setAuthToken";

/**
 * 

  try {
    const res = await axios.post("http://localhost:3000/login", body, config);
    console.log(res.data);
    }
  catch(err){
  	console.error(err)
  }
}

tryPost();

 * 
 */

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"));
    setAuthToken(localStorage.getItem("token"));
  }

  // make an axios request to get the courses and score
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // send a post request to signup
    console.log("Before async GET to /dashboard", new Date().toUTCString());
    const res = await axios.get("http://localhost:3000/dashboard", config);
    console.log("After async GET to /dashboard", new Date().toUTCString());
    dispatch({
      type: USER_LOADED,
      payload: { ...res.data },
    });
    console.log("After dispatching USER_LOADED", new Date().toUTCString());
  } catch (err) {
    // login fail
    console.error(err);
  }
};

/**
 * 
 * email: "",
    password: "",
    firstName: "",
    lastName: "",
 * 
 */

export const register = (email, password, firstName, lastName) => async (
  dispatch
) => {
  // set the headers to explain content type

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // send body with all fields
  const body = JSON.stringify({ email, password, firstName, lastName });

  console.log(`Sending this body! `, body);

  try {
    // send a post request to signup
    const res = await axios.post("http://localhost:3000/signup", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    console.log("After dispatching REGISTER_SUCCESS", new Date().toUTCString());

    // call the loadUser()
    dispatch(loadUser());
  } catch (err) {
    // login fail
    console.error(err);
  }
};

export const login = (email, password) => async (dispatch) => {
  // make a post request using the email and password to the /login route
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("http://localhost:3000/login", body, config);

    console.log("LOGIN_SUCCESS", new Date().toUTCString());
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // call the loadUser()
    dispatch(loadUser());
  } catch (err) {
    // login fail
    console.error(err);
  }
};

// logout / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
