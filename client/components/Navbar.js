import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ logout }) => (
  <div id="navbar">
    <h1>learnSpace</h1>
    <ul>
      <li>
        <Link to="/dashboard">Home</Link>
      </li>
      <li onClick={logout}>
        <Link to="/">Log Out</Link>
      </li>
      <li>
        <Link to="/signup">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </div>
);

export default connect(null, { logout })(Navbar);
