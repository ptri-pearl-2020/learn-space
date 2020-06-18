// App.js
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Navbar from "./Navbar";
import Question from "./Question";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import store from "../store";
import "../stylesheets/App.scss";
import { loadUser } from "../actions/auth.js";
import setAuthToken from "../utils/setAuthToken";
import axios from 'axios';

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/questions" component={Question} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
};

export default App;
