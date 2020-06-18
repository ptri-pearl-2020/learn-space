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
export const loadUser = () => (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  // DELETE after backend is finished

  if (localStorage.getItem("token") === data.jwt.token) {
    dispatch({
      type: USER_LOADED,
      payload: {
        ...data.name_info,
        courses: data.dashboard.courses,
        score: data.dashboard.score,
      },
    });
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
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

export const register = (email, password, firstName, lastName ) => async(dispatch) => {
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

    }
  catch(err){
    // login fail
  	console.error(err)
  }
}

export const login =  (email, password) => async (dispatch) => {
  // make a post request using the email and password to the /login route
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password});

  try {
    const res = await axios.post("http://localhost:3000/login", body, config);
    console.log(res.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    }
  catch(err){
    // login fail
  	console.error(err)
  }
};


// logout / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
