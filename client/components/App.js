// App.js
import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "../stylesheets/App.scss";

const App = () => (
  <>
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <h1>Hello Team Pearl!</h1>
    </Router>
  </>
);

export default App;
