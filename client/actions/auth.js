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

// Register User

// export const register = ({ name, email, password }) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ name, email, password });

//   try {
//     const res = await axios.post("/api/users", body, config);
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data,
//     });
//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => console.error(error.msg));
//     }

//     dispatch({
//       type: REGISTER_FAIL,
//     });
//   }
// };

// Login User

export const login = (email, password) => (dispatch) => {
  // this logic is just until it's ready on the backend
  if (
    email.toLowerCase() === data.email.toLowerCase() &&
    password.toLowerCase() === data.password.toLowerCase()
  ) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: data.jwt.token },
    });
    dispatch(loadUser());
  }

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  // const body = JSON.stringify({ email, password });

  //

  // try {
  //   const res = await axios.post("/api/auth", body, config);
  //   dispatch({
  //     type: LOGIN_SUCCESS,
  //     payload: res.data,
  //   });
  //   dispatch(loadUser());
  // } catch (err) {
  //   const errors = err.response.data.errors;
  //   if (errors) {
  //     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  //   }

  //   dispatch({
  //     type: LOGIN_FAIL,
  //   });
};
// };

// logout / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
