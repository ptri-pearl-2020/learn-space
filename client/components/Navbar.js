import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ logout }) => (
  <div id="navbar">
    <Link to="/dashboard">
      <span>Home</span>
    </Link>
    <span className="horizontalSpacer" />
    <Link to="/">
      <span onClick={logout}>Log Out</span>
    </Link>
  </div>
);

export default connect(null, { logout })(Navbar);
